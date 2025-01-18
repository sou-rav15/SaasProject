const express= require("express");
const app= express();
const dotenv = require('dotenv');
const bodyparser=require('body-parser');
const cors= require('cors')
const connectDB = require("./Database/db");

const Register= require('./Routes/Registration.js');
const Login= require('./Routes/Login.js');
const Payment= require('./Routes/Checkout.js');
const plans= require('./Routes/PlanRoutes.js')
dotenv.config();
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

const PORT= process.env.PORT||8000;
connectDB();
//Routes
app.use('/Register',Register);
app.use('/Login',Login);
app.use('/checkout-payment',Payment);
app.use('/create-plan',plans);

app.listen(PORT,()=>{
    console.log(`listening at PORT ${PORT}`);
});

