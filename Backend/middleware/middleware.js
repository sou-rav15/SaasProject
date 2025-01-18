const Joi =require('joi');

const signupValidation=(req,res, next)=>{
    const  schema=Joi.object({
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        // age:Joi.number().required(),
        userName:Joi.string().min(6).max(20).required(),
        // gender:Joi.string().min(3).max(10),
        password:Joi.string().min(4).max(100).required(),
    })
    // console.log("data here ",req.body)
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json(({message:"Bad request",error}))

    }
    next();
}

//login validation

const loginValidation=(req,res, next)=>{
    const  schema=Joi.object({
      
        email:Joi.string().email(),
        password:Joi.string().min(4).max(100).required(),
        // username:Joi.string().min(6).max(20)
    })
    console.log("data here ",req.body)
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json(({message:"Bad request",error}))

    }
    next();
}
module.exports={
    signupValidation,
    loginValidation
}