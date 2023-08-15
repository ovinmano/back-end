const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://manoj:kumar@cluster0.ih09tiq.mongodb.net/usersform";

mongoose.connect(mongoURL , { useNewUrlParser:true , useUnifiedTopology:true });

const connection = mongoose.connection

connection.on("error", ()=>{
    console.log("Mongo DB connection failed");
})
connection.on("connected" , ()=>{
    console.log("mongo DB connection Successfull !");
})

module.exports = mongoose;