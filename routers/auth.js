const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


const {check,validationResult} = require('express-validator')
const routes = express.Router()

routes.post('/',[

check('email','email is not valid').isEmail(),
check('password','password is not valid').exists()],async (req, res) => {
    const error = validationResult(req)
    
    if(!error.isEmpty()){
     return   res.status(400).json({message:error.array()})
    }
    const {email,password} = req.body
try{
    const user =  await User.findOne({email})
    const isMatch = await bcrypt.compare(password,user.password)
if(!isMatch){
    return res.json({message:"invalid credentials"}).status(400)
}
     //creating jsonWebToken for the user and giving it back 
     const payload =  {
        user:{id:user.id}
}
    jwt.sign(payload,process.env.jwtSecret,{expiresIn:36000},(err,token)=>{
        if(err) throw err
        res.json({token})

    })
}catch(err){
    res.status(401).send({error:['invalid credentials']})

}
 

})
module.exports = routes
