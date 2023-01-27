const express = require("express");
const router = express.Router();
const product = require("../model/product")
const bodyParser= require("body-parser") 
const isLoggedIn = require("../middleware/middleware");
const warehouse = require("../model/warehouse");


    router.get("/waredetail", async (req,res)=>{
        let produc = await product.find({})
        var data=[];
            for(let i=0;i<produc.length;i++)
            {
                data.push(produc[i].Commodity)
            }
        res.send(data);
    })

    module.exports=router;
