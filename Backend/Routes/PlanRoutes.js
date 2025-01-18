const express= require('express');
const Plan = require('../models/PlanSchema');
const checkRole = require('../middleware/CheckRoles');
const router=express.Router();


router.get('/', async(req,res)=>{
    const plan= await Plan.find();
    res.json(plan);
});

router.post('/', async(req,res)=>{
    const {name, price, duration, userLimit}=req.body;
    // console.log(req.body);
    
    try {
        const plan= new Plan({name, price, duration, userLimit});
        await plan.save();
        console.log(plan)
        res.status(201).json({plan, success:true});
    } catch (error) {
        res.status(500).json({message:"Failed to create plan",succes:true}
        )    
    }
})
router.put('/:id', async(req, res)=>{
    const {id}= req.params;
    const {name, price, duration, userLimit}=req.body;
    try {
        const updatedPlan =await Plan.findByIdAndUpdate(id,{name, price, duration, userLimit}, {new:true})
        res.status(200).json(updatedPlan);
    } catch (error) {
        res.status(500).json({error:'Failed to update plan'});
    }
})
module.exports=router;