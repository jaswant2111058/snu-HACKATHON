const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT||5000;
//require('./auth');
const cors = require("cors")
require("./connection/conn")
app.set("view engine",'ejs');
const path = require("path");
const cookie = require("cookie-parser");
app.use(cookie()); 
const static1 = path.join(__dirname,"/views")
app.use(express.static(static1));
app.set("view engine", "ejs");
const login =  require("./routes/login")
//const google =  require("./routes/google")
const main =  require("./routes/waremanage")
app.use(cors())


app.use("/",login);
//app.use("/",google);
app.use("/",main);


app.listen(port,()=>console.log("server is up....."));
