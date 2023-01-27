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
    desc: String,
      img : {
          data: Buffer,
          contentType: String
      },
      user_detail:{
        type:Array,
      },
      otp:
      {
        type:Number,
        timeseries: {
            timeField: "timestamp",
            metaField: "metadata",
            granularity: "seconds"
         },
         expireAfterSeconds: 30,
        }
        
  });
  

  module.exports =  mongoose.model("commonLogin", userSchema); 