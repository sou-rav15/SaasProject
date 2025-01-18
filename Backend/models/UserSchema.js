const mongoose = require("mongoose");
const UserSchema= new mongoose.Schema({
    name:{type:String, required:true},
    userName:{type:String, required:true, unique:true},
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String, required:true
    },
    role:{type:String, enum:['SuperAdmin', 'Admin', 'User'], default:'User'},
    plan:{type:mongoose.Schema.Types.ObjectId,
        ref:'Plan'
    }
},{timestamps:true})


const User=mongoose.model('User',UserSchema)
 
module.exports= User;