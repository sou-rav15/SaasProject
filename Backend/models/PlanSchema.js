const mongoose= require("mongoose");
const PlanSchema=  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    userLimit:{
        type:Number,
        required:true
    },
    duration:{type:String,
        required:true
    }
},{timestamps:true});

const Plan= mongoose.model('Plan',PlanSchema);
module.exports=Plan;