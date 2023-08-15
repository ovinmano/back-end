const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
    },
    colour:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    },
    offers:{
        type:String,
        required:true
    },
    ram:{
        type:String,
        required:true
    },
    userId:{
        type:String,
    },
    userName:{
        type:String,
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("Product", productSchema);

