const express = require('express')
const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const Routes = express.Router()

Routes.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(email=='rahulyadu17@gmail.com' && password == '654321'){
         jwt.sign({email},process.env.jwtSecret,{expiresIn:'1h'},(err,token)=>{
            if (err) throw err
             res.json({token})
        })
    }else{
        res.json({msg:'invalid credentials'}).status(301)
        return;
    }

})

Routes.get('/',auth,async (req,res)=>{
    const users = await Users.find()
    res.json(users)
})

module.exports =Routes