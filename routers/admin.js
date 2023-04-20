const express = require('express')
const Users = require('../models/Users')
const Posts = require('../models/Posts')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const Profile = require('../models/Profile')

const Routes = express.Router()

Routes.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(email=='rahulyadu17@gmail.com' && password == '654321'){
         jwt.sign({email},process.env.jwtSecret,{expiresIn:'1h'},(err,token)=>{
            if (err) throw err
             res.json({token})
        })
    }else{
        res.status(400).json({msg:'invalid credentials'})
        return;
    }

})

Routes.get('/',auth,async (req,res)=>{
    const users = await Users.find()
    res.json(users)
})

Routes.delete('/user/:id',auth,async(req,res)=>{
    await Profile.findOneAndRemove({user:req.params.id})
await Users.findOneAndRemove({_id:req.params.id})
res.json({msg:"user deleted"})
})
Routes.get('/posts',auth,async(req,res)=>{
    const posts = await Posts.find()
    res.json(posts)
})

Routes.delete('/posts/:id',auth,async(req,res)=>{
    await Posts.findOneAndRemove({_id:req.params.id})
    res.json({'msg':'post deleted'})
})
module.exports =Routes