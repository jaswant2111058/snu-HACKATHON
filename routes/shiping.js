const express = require("express");
const router = express.Router();
const bussiness = require("../model/bussiness")
const bodyParser= require("body-parser") 
const isLoggedIn = require("../middleware/middleware");
const warehouse = require("../model/warehouse");
const product = require("../model/product");
//const { find } = require("../model/warehouse");





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
        let produc = ["02_meat_and_edible_meat_offal",
            "03_fish_crustaceans_molluscs_aquatic_invertebrates_ne",
            "04_dairy_products_eggs_honey_edible_animal_product_nes",
            "05_products_of_animal_origin_nes",
            "06_live_trees_plants_bulbs_roots_cut_flowers_etc",
            "07_edible_vegetables_and_certain_roots_and_tubers",
            "08_edible_fruit_nuts_peel_of_citrus_fruit_melons",
            "09_coffee_tea_mate_and_spices",
            "10_cereals",
            "11_milling_products_malt_starches_inulin_wheat_glute",
            "12_oil_seed_oleagic_fruits_grain_seed_fruit_etc_ne"
            ]
       
        res.send(produc);

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
      
        const commo = req.body.Commodity
        let produc = await warehouse.find({})

        
       // console.log(resultObject)

        res.send(produc.length)
     function search(produc,com)
         {   
            let array =[]

            for(let i=0;i<produc.length;i++) 
            {
            const resultObject = search(com, produc[i].storedProduct);
                    if(resultObject)
                    {
                        array.push(resultObject);
                    }
            }
            return array;
        
        
    } 
     const found = search(produc,commo);
     res.send(found);
   
})

router.post("/shipmentbussine/searches", async (req,res)=>{
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
