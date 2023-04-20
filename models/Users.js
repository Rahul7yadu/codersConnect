const mongoose = require('mongoose')
const UserSchema =new mongoose.Schema({
name:{
    required:true,
    type:String,
},
email:{required:true, type:String,unique:true},
password:{required:true, type:String},
avatar:{required:false, type:String},
date:{required:true, type:Date}
})


module.exports = User = mongoose.model('user',UserSchema) 