const express = require('express');
const auth  = require('../middleware/auth')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonWebToken')
const routes = express.Router()
const User = require('../models/Users')
const config = require('config')

const {check,validationResult} = require('express-validator')
const Profile = require('../models/Profile')
routes.get('/',auth,async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        res.json(error) 
    }
   
})
routes.post('/',[
    check('name','name is not valid').not().notEmpty(),
    check('email','email is not valid').isEmail(),
    check('password','password is not valid').isLength({min:6})
],async (req, res) => {
    // validating user data error.array()
    const error = validationResult(req)
    if(!error.isEmpty()){
        
     return   res.status(400).json({message:error})
    }
    const {name,email,password} = req.body
    try{
        // checking if  user already exist in database
        let user = await User.findOne({email})
     
        if(user){
        res.status(200).json({error:[{message:"user already exist"}]})
        return
        }

        // creating gravatar for user 
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })

    // create new instance of user for database
     user = await User({name,email,password,avatar,date:new Date()})

    // encrypting the password and saving user in database
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)
        await user.save()

     //creating jsonWebToken for the user and giving it back 
        const payload =  {
            user:{id:user.id}
    }
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000},(err,token)=>{
            if(err) throw err
            res.json({token})

        })
}catch(err){
    
    res.status(500).send("server Error")
}
})

routes.delete('/me',auth, async (req, res)=>{
await Profile.findOneAndRemove({user:req.user.id})
await User.findOneAndRemove({_id:req.user.id})
res.json({message:"user deleted successfully"})
})
    
    
    

   
module.exports = routes
