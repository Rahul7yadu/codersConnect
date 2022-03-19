const express = require('express');
const request = require('request');
const config = require('config')
const routes = express.Router()
const auth = require('../middleware/auth')
const {check,validationResult} = require('express-validator')
const Profile = require('../models/Profile')
routes.get('/me',auth,async (req, res) => {

let userProfile = await Profile.findOne({user:req.user.id}).populate('user',["name",'avatar'])
if(!userProfile){
  return  res.json({error:"no profile for the user"})
}
res.send("your profile")

})

routes.post('/me',[auth,
    [check('skills','skills should not be empty').not().notEmpty(),
    check('status','status should not be empty').not().notEmpty()]],
    async (req,res)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.json({message:error.message})
        }
        try{

             console.log("inside")
            


            const {
                location,
                company,
                website,
                skills,
                youtube,
                instagram,
                linkedin,
                facebook,
                twitter,
                bio,
                githubusername,
                status
               
                
                
              } = req.body;
              const profileFields = {}
              profileFields.user = req.user.id
              profileFields.skills = skills.split(',').map((e)=>e.trim())
              profileFields.status = status
            console.log(profileFields.user)
              if(company) profileFields.company = company
              if(website) profileFields.website = website
               profileFields.status = status
              if(location) profileFields.location = location
              if(bio) profileFields.bio = bio
              if(githubusername) profileFields.githubusername = githubusername
              

              
              
              profileFields.social = {}
              if(instagram) profileFields.social.instagram = instagram 
              if(youtube) profileFields.social.youtube = youtube 
              if(linkedin) profileFields.social.linkedin = linkedin 
              if(facebook) profileFields.social.facebook = facebook 
              if(twitter) profileFields.social.twitter = twitter
             
              let profile = await Profile.findOne({user:req.user.id})
              if(profile){
                 profile =  await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
                 return res.json(profile)
              }
             profile = new  Profile(profileFields)
             await profile.save()
             return res.json({profile})


        }catch(err){
            console.error(err)
            res.send('server error')
        }
     
})

routes.get('/',async (req, res)=>{
    try {
       let profile =  await Profile.find().populate('user',['name','avatar'])
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.send('server error')
    }
})

routes.get('/user/:user_id',async (req, res)=>{
try {
    const profile = await Profile.find({user:req.params.user_id})
    if(profile.length<1) res.json({message:"there is no profile for this user"})
    res.json(profile)

} catch (error) {
    if(error.kind === 'ObjectId') return res.json({message:"user not found"})
    res.send('server error')
}
})

// deletes profile of user
routes.delete('/me',auth,async (req,res)=>{
     await Profile.findOneAndRemove({user:req.user.id})
    res.json({message:"profile deleted successfully"})
})


// for creating experience
routes.put('/experience',[auth,
check('title','title is required').not().isEmpty(),
check('company','company is required').not().isEmpty(),
check('from','from is required').not().isEmpty()],
async (req, res)=>{
const errors = validationResult(req)
if(!errors.isEmpty()){
    res.json({errors:errors.array()})
}
try{
    const {title,company,from,to,current,location,description}  = req.body

    const newExperience = {title,company,from,to,current,location,description}
     
    let profile = await Profile.findOne({user:req.user.id})
    
    profile.experience.unshift(newExperience)
    await profile.save(profile)
    res.json(profile)

}catch(err){
console.log(err)
res.send('server error')
}
})

// deleting experience
routes.delete('/experience/:exp_id',auth,async (req,res)=>{
   let profile =  await Profile.findOne({user:req.user.id})
  
   let index = profile.experience.findIndex((e)=>e.id == req.params.exp_id) 
   console.log(index)
   if(index!=-1){

       profile.experience.splice(index,1)
       profile = await profile.save()
      return res.json(profile)
   }
   res.json({message: 'experience id not found'})

})
// creating new education
routes.put('/education',auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','degree  is required').not().isEmpty(),
    check('from','from is required').not().isEmpty(),
    check('fieldofstudy','fieldofstudy is required').not().isEmpty(),
    ],
    async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({errors:errors.array()})
    }
    try{
        const {school,degree,from,to,current,fieldofstudy,description}  = req.body
    
        const newExperience = {school,degree,from,to,current,fieldofstudy,description}
         
        let profile = await Profile.findOne({user:req.user.id})
        
        profile.education.unshift(newExperience)
        profile = await profile.save(profile)
        res.json(profile)
    
    }catch(err){
    console.log(err)
    res.send('server error')
    }
    })
    // deleting education
    routes.delete('/education/:edu_id',auth,async (req,res)=>{
        let profile =  await Profile.findOne({user:req.user.id})
       
        let index = profile.education.findIndex((e)=>e.id == req.params.edu_id) 
        console.log(index)
        if(index!=-1){
     
            profile.education.splice(index,1)
            profile = await profile.save()
            return res.json(profile)
        }
        res.json({message: 'experience id not found'})
     }
    )
    // getting github repo data with name
    routes.get('/github/:username',(req, res)=>{

        try {
            const option = {
                uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc
                &client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
                method: 'GET',
                headers: {'user-agent':'node.js'}
            }
            request(option, (error,response,body)=>{
                if(error) throw new Error(error)
                if(response.statusCode!==200){
                    res.status(404).json({message:'no github data found'})
                }
                res.json(JSON.parse(body))
            }) 
        } catch (error) {
            console.error(error)
            res.send('server error')
        }
        

    })
    
module.exports = routes
