const express = require("express");
const router = express.Router();
const bussiness = require("../model/bussiness")
const bodyParser= require("body-parser") 
const isLoggedIn = require("../middleware/middleware");
const warehouse = require("../model/warehouse");
const product = require("../model/product");
const { find } = require("../model/warehouse");


    router.post("/shipmentbussiness",isLoggedIn, async (req,res)=>{
           try{  
            const ware = await bussiness.findOne({email:req.body.email})
            const totalware = await warehouse.find({})
            let array=[];
            for(let i=0;totalware.length;i++)
            {
                let detail={
                    wareId:totalware[i].wareId,
                    Country:totalware[i].Country
                }
                array.push(detail);
            }
                res.send({own:ware.ownedware,totalware:array})   

           } 
           catch{
            res.send("error").status(400);
           }
    })
    router.post("/shipmentfromto",isLoggedIn, async (req,res)=>{
        try{ 
            
           const wareIdfrom = req.body.wareIdfrom
           const wareIdto = req.body.wareIdto
           let locfrom = await warehouse.findOne({wareId:wareIdfrom})
           locfrom=locfrom.Country
           let locto = await warehouse.findOne({wareId:wareIdto})
           locto=locto.Country
        const product  = req.body.product;
        var Volume =0;
        for(let i=0;product.length;i++)
        {
            Volume=Number(Volume)+(product[i].Volume)
        }

        res.send({CountryFrom:locfrom,Country:locto,Volume:Volume})



             await bussiness.updateOne({email:req.body.email},{ownedware:ware})
             const dlt=
             {  wareId:req.body.wareId,
                capacity:Number(req.body.capacity),
                Country:req.body.Country,
                freeSpace:Number(req.body.freeSpace)
             }
             await warehouse.save({dlt})     
            // const product = await product.find({Country:req.body.Country})
            res.send(product);
           }
           catch{
            res.send("error").status(400);
           }
}) 


    module.exports=router;
