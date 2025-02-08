const express=require("express")
const Pro=express.Router()
require("dotenv").config()
const jwt=require("jsonwebtoken")
const fs=require("fs")
Pro.use((req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        console.log("came token=",token)
        try{
            key=process.env.sercret_key
            const data=jwt.verify(token,key)
            if(!data){
                res.status(401).json({message:"Invalid user"})
            }else{
                next()
            }
        }catch(e){console.log(e)}
    }else{
        console.log("Error")
    }
})
Pro.get("/",(req,res)=>{
    try{
        const matter=fs.readFileSync("./protected.json","utf-8")
    if(matter){
        res.status(200).json(matter)
    }
    }catch(e){
        res.status(500).json({message:"No data found",e})
    }
    
})
const model=require("./mongo.js")
module.exports=Pro