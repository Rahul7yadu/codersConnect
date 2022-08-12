const express = require('express');
const routes = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/Users')
const Post = require('../models/Posts')
const Profile = require('../models/Profile')
const {check,validationResult} = require('express-validator')

routes.post('/',auth,[check('text','text is required').not().isEmpty()],async (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
      return  res.status(400).json({message: error.array()})
    }
    const user = await User.findById(req.user.id).select('-password')

    try {
        const newPost={
            text: req.body.text,
            user:req.user.id,
            name:user.name,
            avatar:user.avatar
    
        }
        let posts = new Post(newPost)
        posts = await posts.save()
        res.json(posts)
        
    } catch (error) {
        console.error(error)
        res.status(500).send('server error')
        
    }
    
    
    

    
})
routes.get('/',auth,async (req,res)=>{
    try {
        
        const post =   await Post.find()

        res.json(post)
        
    } catch (error) {
        
        res.status(500).send('server error')
    }
  
  

})

routes.get('/:post_id',auth,async (req,res)=>{
    console.log(req.params.post_id)
    try {
        
        const post =   await Post.findById(req.params.post_id)
        // if(post.user.toString()!=req.user.id){
        //   return  res.json({message:'user not authenticated'})
        // }
        res.json(post)
        
    } catch (error) {
        if(error.kind === 'ObjectId') return res.json(error.message)
        
        res.status(500).send('server error')
    }
  
    
  

})


routes.delete('/:post_id',auth,async (req,res)=>{
    try {
        
        const post =   await Post.findByIdAndRemove(req.params.post_id)
        if(post.user.toString()!=req.user.id){
          return  res.json({message:'user not authenticated'})
        }
        res.json(post)
        
    } catch (error) {
        if(error.kind === 'ObjectId') res.json({msg:'post not found'})
        
        res.status(500).send('server error')
    }
  })

  routes.put('/like/:id',auth,async(req,res)=>{


    try {
        console.log(req.params.id)
       const post =  await Post.findById(req.params.id)
       if(post == null) {
           return res.json({msg:"nothing found in db"})
       }
      if(post.likes.filter(like=>like.user.toString()==req.user.id).length!=0){
          return res.json(post.likes)
      }
      
        post.likes.push({user:req.user.id})
        await post.save()
        res.json(post.likes)
    } catch (error) {
        
        res.send(error.message)
    }
  })

  routes.put('/unlike/:id',auth,async(req,res)=>{

    try {
        const post =  await Post.findById(req.params.id)
       if(post == null) {
           return res.json({msg:"nothing found in db"})
       }

   if( post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
       return res.json(post.likes)
   }  
    post.likes = post.likes.filter(like=>like.user.toString()!==req.user.id)
    await post.save()
        res.json(post.likes)
    } catch (error) {
        console.error(error)
        res.send('server error')
    }
  })

  routes.put('/comment/:id',auth,[check('text','text is required').not().isEmpty()],async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json({msg:errors.array()})
    }
    try {
        const {text} = req.body
        const user = await User.findById(req.user.id)
       const newComment = {
        text,user:user._id,name:user.name,avatar:user.avatar
       }
      const post = await Post.findById(req.params.id)
      post.comments.unshift(newComment)
      await post.save()
      res.json(post.comments)
        
        
    } catch (error) {
        
        res.send('server error')
    }
  })

  routes.put('/uncomment/:post_id/:comment_id',auth,async(req,res)=>{

    try {
        const post =  await Post.findById(req.params.post_id)
       if(post == null) {
           return res.json({msg:"nothing found in db"})
       }
       if(post.comments.length===0){
           return res.json({msg:"no comments on this post"})
       }
       const comment = post.comments.find(comment => comment._id.to.String() === req.params.comment_id)
       if(!comment){
           return res.json({msg:"no comment found with this id"})
       }
       post.comments = post.comments.filter(comment => comment._id.toString()!==req.params.comment_id)
    
        await post.save()
        res.json(post.comments)
    } catch (error) {
        console.error(error)
        res.send('server error')
    }
  })

module.exports = routes