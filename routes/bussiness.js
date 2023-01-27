const express = require("express");
const router = express.Router();
const bussiness = require("../model/bussiness")
const bodyParser= require("body-parser") 
const isLoggedIn = require("../middleware/middleware");
const warehouse = require("../model/warehouse");
const product = require("../model/product");


    router.post("/bussiness",isLoggedIn, async (req,res)=>{
           try{ 
            const ware = await bussiness.findOne({email:req.body.email})
                 res.send({msg:ware.ownedware})    

           }
           catch{
            res.send("error").status(400);
           }
    })
    router.post("/adware",isLoggedIn, async (req,res)=>{
        try{ 
            let ware = await bussiness.findOne({email:req.body.email})
            const detail ={ 
                wareId:req.body.wareId,
                Country:req.body.Country
            }
            ware=ware.ownedware.push(detail)

             await bussiness.updateOne({email:req.body.email},{ownedware:ware})
             const dlt=
             {  wareId:req.body.wareId,
                capacity:Number(req.body.capacity),
                Country:req.body.Country,
                freeSpace:Number(req.body.freeSpace)
             }
             await warehouse.save({dlt})     
             const product = await product.find({Country:req.body.Country})
            res.send(product);

           }
           catch{
            res.send("error").status(400);
           }
}) 


    module.exports=router;
