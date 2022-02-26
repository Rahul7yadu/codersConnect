const express = require('express');
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const routes = express.Router()
const User = require('../models/Users')
const {check,validationResult} = require('express-validator')

routes.post('/',[
    check('name','name is not valid').not().notEmpty(),
    check('email','email is not valid').isEmail(),
    check('password','password is not valid').isLength({min:6})
],async (req, res) => {
    // validating user data
    const error = validationResult(req)
    if(!error.isEmpty()){
        res.status(400).json({message:error.array()})
    }

    const {name,email,password} = req.body
    try{
        // checking if  user already exist in database
        let user = await User.findOne({email})
     
        if(user){
        res.status(400).json({error:[{message:"user already exist"}]})
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

    // encrypting the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)
        await user.save()
        res.send("user registered!")
}catch(err){
    console.log(err)
    res.status(500).send("server Error")
}
    
    
    

   
    })
module.exports = routes
