const express = require("express");
const router = express.Router();
const bussiness = require("../model/bussiness")
const bodyParser= require("body-parser") 
const isLoggedIn = require("../middleware/middleware");
const warehouse = require("../model/warehouse");
const product = require("../model/product");
const { find } = require("../model/warehouse");





    router.post("/shipmentbussiness", async (req,res)=>{
           try{  
            const ware = await product.find({})
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

router.post("/shipmentuser/category", async (req,res)=>{
    try{  
        let produc = await product.find({})
        var data=[];
            for(let i=0;i<produc.length;i++)
            {
                data.push(produc[i].Category)
            }
            var a= [];
            a=data;
let unique = a.filter((item, i, ar) => ar.indexOf(item) === i);
//console.log(unique);
        res.send(unique);

    } 
    catch{
     res.send("error").status(400);
    }
})

router.post("/shipmentuser/comodity",async (req,res)=>{
    try{  
        let produc = await product.find({Category:req.body.Category})
        var data=[];
            for(let i=0;i<produc.length;i++)
            {
                data.push(produc[i].Commodity)
            }
            var a= [];
            a=data;
let unique = a.filter((item, i, ar) => ar.indexOf(item) === i);
//console.log(unique);
        res.send(unique);

    } 
    catch{
     res.send("error").status(400);
    }
})
router.post("/shipmentuser/search",async (req,res)=>{
    try{  
        const comodity = req.body.Commodity
        let produc = await warehouse.find({})
        
         function search(produc,comodity)
         {   
            let array =[]

            for(let i=0;i<produc.length;i++) 
            {
                for(let j=0;i<produc.storedProduct.length;j++)
                {
                    if(comodity==produc[i].storedProduct[j].Commodity)
                    {
                           array.push(produc[i])
                            
                    }
                    else if(i==produc.length-1&&j==produc.storedProduct.length-1)
                    {
                        return array;
                    }

                }
            }
        }
        const found = search(produc,comodity);
        res.send(found);
    } 
    catch{
     res.send("error").status(400);
    }
})

router.post("/shipmentbussine/search", async (req,res)=>{
    try{ 
       const waredetail = req.body.waredetail 
       const wareIdfrom = waredetail.Country
       const wareIdto = waredetail.Cunloc
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

    }
     catch{

        res.send("error").status(400);

       }
}) 







    module.exports=router;
