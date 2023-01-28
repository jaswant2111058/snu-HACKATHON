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
                data.push(produc[i].Category)
            }
            var a= [];
            a=data;
let unique = a.filter((item, i, ar) => ar.indexOf(item) === i);
//console.log(unique);
        res.send(unique);
    })

    module.exports=router;
