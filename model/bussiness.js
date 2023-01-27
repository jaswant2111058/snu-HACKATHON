const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },

    password:{
        type:String,
    },
    email:{
        type:String,
        unique:[true,"email already exist"]
    },
    email_status:
    
    {
        type:Boolean
    }, 
    ownedware : {
          type:Array
      },
  });
  

  module.exports =  mongoose.model("busseness", userSchema); 