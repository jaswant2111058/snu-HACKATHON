const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    wareId:{
        type:String,
    },

    capacity:{
        type:Number,
    },
    Country:{
        type:String,
    },
    freeSpace:
    {
        type:Number
    },
    storedProduct : {
          type:Array
      },   
  });
  

  module.exports =  mongoose.model("warehouse", userSchema); 