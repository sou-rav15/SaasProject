const mongoose= require("mongoose");
const PaymentSchema = new mongoose.Schema({
    user:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Plan',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currenct:{
        type:String,
        default:'inr'
    },
    status:{type:String,
        enum:['pending', 'completed'],
        default:'pending'
    }
},{timestamps:true});
const Payment= mongoose.model('Payment', PaymentSchema);
module.exports=Payment;