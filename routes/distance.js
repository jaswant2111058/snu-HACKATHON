const express = require("express");
const router = express.Router();
const bussiness = require("../model/bussiness")
const bodyParser= require("body-parser") 
const isLoggedIn = require("../middleware/middleware");
const product = require("../model/counrty");


    router.get("/distance", async (req,res)=>{
           try{ 
           const con= req.body.country
            const ware = await product.findOne({COUN:"IND"})
                res.send({distance:ware})    
           }
           catch{
            res.send("error").status(400);
           }
    })
    router.post("/check",isLoggedIn, async (req,res)=>{
        try{ 
            let ware = await bussiness.findOne({email:req.body.email})
            const detail ={ 
                wareId:req.body.wareId,
                location:req.body.location
            }
            ware=ware.ownedware.push(detail)

             await bussiness.updateOne({email:req.body.email},{ownedware:ware})
                 res.send({msg:ware.ownedware})   

           }
           catch{
            res.send("error").status(400);
           }
}) 


    module.exports=router;
