const express = require("express");
const router = express.Router();
const bussiness = require("../model/bussiness")
const bodyParser= require("body-parser") 
const isLoggedIn = require("../middleware/middleware");
const warehouse = require("../model/warehouse");
const product = require("../model/product");


    router.post("/bussiness", async (req,res)=>{
           try{ 
            const ware = await bussiness.findOne({email:req.body.email})
                 res.send({msg:ware.ownedware})    

           }
           catch{
            res.send("error").status(400);
           }
    })
    router.post("/adware", async (req,res)=>{
        try{ 
            let ware = await bussiness.findOne({email:req.body.email})
        
             const dlt=
             {  wareId:req.body.wareId,
                Capacity:Number(req.body.Capacity),
                Country:req.body.Country,
                freeSpace:Number(req.body.freeSpace)
             }
             const usr = new warehouse(dlt)
             await usr.save()     
                const detail ={ 
                wareId:req.body.wareId,
                Country:req.body.Country
            }
            ware=ware.ownedware.concat(detail)

             await bussiness.updateOne({wareId:req.body.email},{ownedware:ware})
             
             const product = req.body.product
            let warecam = await warehouse.findOne({wareId:req.body.wareId})
            
            warecam = warecam.storedProduct.concat(product);
                await warehouse.updateOne({wareId:req.body.wareId},{storedProduct:warecam})
                let main = await warehouse.find({})
             res.send(main) 
       }
           catch{
            res.send("error").status(400);
           }
}) 
    module.exports=router;
