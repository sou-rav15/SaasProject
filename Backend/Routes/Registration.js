const express= require('express');
const app= express();
const User = require('../models/UserSchema.js');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { signupValidation } = require('../middleware/middleware');
app.use(express.json());
router.get('/',async(req,res)=>{
    // const plan= await User.find();
    res.json("register");
});

router.post('/', signupValidation,async(req,res)=>{
    const {name, email, userName, password,}=req.body;
    // console.log("data->",req.body);
    try {
        console.log(req.body);
        
        
        const Email=  await User.findOne({email});
        const UserName= await User.findOne({userName});
        if(Email)
        {
    return res.status(409)
    .json({message:'user is already exist, Try to login',success:false,userName});
        }
        if(UserName)
        {
    return res.status(409)
    .json({message:'user is already exist, you can login',success:false,UserName});
        }
        const user= new User({name, userName, password, email});
        user.password=await bcrypt.hash(password,10);
        console.log('user->',user);
        await user.save();
       
        res.status(201).json({
            message: 'User created successfully',
            success: true,
            user,
          });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({message:"INTERNAL SERVER ERROR",succes:false}
        )    
    }
});
module.exports=router;