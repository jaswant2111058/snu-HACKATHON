const express = require("express");
const router = express.Router();
const bussiness = require("../model/bussiness")
const bodyParser= require("body-parser") 
const isLoggedIn = require("../middleware/middleware");
const warehouse = require("../model/warehouse");
const product = require("../model/product");
//const warehouse = require("../model/warehouse");
const Razorpay=require("razorpay");
var instance = new Razorpay({
  key_id: "rzp_test_lIAffka8ZIqfaU",
  key_secret: "lIhTEeoU53SwaQIlITg8qT2y",
});


router.get('/create/orderId',  async (req, res) => {
  
    let options = {
      amount: Number(req.body.ammount)||2000,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11"
    };
    instance.orders.create(options, async function(err, order) {
      console.log(order);
      res.send({orderId:order.id})
     
    });

})


router.post("/api/payment/verify" ,async (req,res)=>{

    
    let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
   
     var crypto = require("crypto");
     var expectedSignature = crypto.createHmac('sha256',process.env.KEY_SECRET)
                                     .update(body.toString())
                                     .digest('hex');
                                     console.log("sig received " ,req.body.razorpay_signature);
                                     console.log("sig generated " ,expectedSignature);
     var response = {"signatureIsValid":"false"}
     if(expectedSignature === req.body.razorpay_signature)
     {
        console.log("yes")
     }
  
        else 
       { 
       res.send("payment is not veryfied");
  }
         
     });
     module.exports=router;