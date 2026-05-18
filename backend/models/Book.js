const mongoose = require('mongoose');

const bookSchema =new mongoose.Schema(

{
image:{
    type:String,
  
},
price:{type:Number,
    required:true,
   
},
description:{
    type:String,
    required:true
}
,
title: {
    type: String,
          
  },
   author:      { type: String, required: true },
}, 
{ timestamps: true })
 




module.exports = mongoose.model('Book', bookSchema);