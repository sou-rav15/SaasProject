const express= require('express');
const Plan = require('../models/PlanSchema');
const checkRole = require('../middleware/CheckRoles');
const router=express.Router();

const stripe= require('stripe')(`${process.env.SECRET_KEY}`);

// Create payment intent endpoint
router.get('/',(req, res)=>{
    res.send("payment")
})
router.post('/', async (req, res) => {
  const  product  = req.body.cart||req.body.amount;
  console.log('product->',product, req.body);
  const lineItems =product.map((product)=>({
    price_data:{
        currency:"inr",
        product_data:{
            name:product.name
        },
        unit_amount:product.price*100,
    },
    quantity:product.userCount
  }));

  const session =await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:"http://localhost:5173/success",
    cancel_url:"http://localhost:5173/cancel",
  
    
  })
 console.log('session->',session.id)
res.json({id:session.id})
  
});
module.exports=router;
// Start server

