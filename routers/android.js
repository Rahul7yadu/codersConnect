const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const routes = express.Router()
const User = require('../models/Users')
const config = require('config');
function doNothing(){


}

routes.get('/getuser/:email',async (req,res)=>{
    const email = req.params.email;
    console.log(req.params)
    const user =await User.find({email:email})

    res.json({user})
})

module.exports= routes