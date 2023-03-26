const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const routes = express.Router()
const User = require('../models/Users')
const config = require('config');
function doNothing(){


}

routes.get('/getuser/:name',async (req,res)=>{
    const email = req.params.name;
    console.log(req.params)
    const user =await User.find({email:email})

    res.json({user})
})

routes.post('/login',async (req, res) => {
    
    const {email,password} = req.body
try{
    const user =  await User.findOne({email})
    const isMatch = await bcrypt.compare(password,user.password)
if(!isMatch){
    return res.status(400).json({message:"invalid credentials"})
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
module.exports= routes