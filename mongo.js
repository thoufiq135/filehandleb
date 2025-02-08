const mongoos=require("mongoose")
require("dotenv").config()
const uri=process.env.MONGU
mongoos.connect(uri).then(()=>console.log("Connected to mongo db")).catch((err)=>console.log("mongo error=",err))
const schema=new mongoos.Schema({
    Name:String,
    Email:String,
    Password:String
})
const model=mongoos.model("data",schema)
module.exports=model