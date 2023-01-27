const express = require("express");
const router = express.Router();
const bussiness = require("../model/bussiness")
const bodyParser= require("body-parser") 
const isLoggedIn = require("../middleware/middleware");
const warehouse = require("../model/warehouse");


    router.post("/addingproduct",isLoggedIn, async (req,res)=>{
           try{ 
            const product = req.body.product
            let ware = await warehouse.findOne({email:req.body.wareId})
            
            ware.storedProduct.push(product);
                await warehouse.updateOne({wareId:req.body.wareId},{storedProduct:ware})   

           }
           catch{
            res.send("error").status(400);
           }
    })
    



    module.exports=router;
