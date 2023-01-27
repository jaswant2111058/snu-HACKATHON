const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Country:{
        type:String,
    },

    Commodity:{
        type:String,
    },
    Flow:{
        type:String,
    },
    Category:
    {
        type:String
    },
    Volume : {
          type:Number
      },   
  });
  

  module.exports =  mongoose.model("onlytest", userSchema); 