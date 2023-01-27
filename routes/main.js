const express = require("express");
const router = express.Router();
const schema = require("../model/model")
const bodyParser= require("body-parser") 
const isLoggedIn = require("../middleware/middleware")


    router.post("/check",isLoggedIn,(req,res)=>{
                res.send(req.email);
    })
    router.get("/check",isLoggedIn,(req,res)=>{
        res.send(req.email);
})


    module.exports=router;
