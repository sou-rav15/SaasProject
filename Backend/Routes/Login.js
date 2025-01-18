const express= require("express");
const router= express.Router();

const jwt=require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { loginValidation } = require("../middleware/middleware");
const User = require("../models/UserSchema");
router.get('/',async(req,res)=>{
    // const plan= await User.find();
    res.send("login");
});

router.post('/',
loginValidation,
    async(req,res)=>{
        try {
            const{email, password} =req.body;
            // console.log(email==="");
            // console.log(userName==="");
            // console.log(email===""&&userName==="");
           
    let user={};
    if(email===""){
        
        return res.status(403).json({message:'email is required',success:false});
    }
    // if(email===""){
    //      user=  await User.findOne({email})
    
    // }
    else{
         user=  await User.findOne({email})
    }
    if(!user){
        return res.status(403)
        .json({message:'email not found',success:false});
    
    }
    console.log("email found");
    console.log(password);
    const ispassword=await bcrypt.compare(password,user.password);
    if(!ispassword){
        return res.status(403).json({message:'invalid details',sucess:false});//err-> password is wrong
    
    }
    const jwtoken= jwt.sign(
        {
            email:user.email, username:user.userName,id:user._id
        },
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
    )
    
     res.status(200).json({
        message:'login successfully',
        success:true,
        jwtoken,email,name:user.name,username:user.username,userId:user._id
     })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"INTERNAL SERVER ERROR",succes:true}
        )    
        };
    }
)
module.exports=router;