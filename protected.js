const express=require("express")
const Pro=express.Router()
require("dotenv").config()
const jwt=require("jsonwebtoken")
const path=require('path');
const fs=require("fs")

Pro.use((req,res,next)=>{
   
        const token = req.cookies.token;
        console.log("token=",token)
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
    }

   
)
Pro.get("/",(req,res)=>{
    try{
        const filepath = path.resolve(__dirname, "protected.json");
        const matter=fs.readFileSync(filepath,"utf-8")
    if(matter){
        res.status(200).json(matter)
    }
    }catch(e){
        res.status(500).json({message:"No data found",e})
    }
    
})
Pro.get("/fetchcookie",(req,res)=>{
    try{
        const token=req.cookies.token
        console.log("retrived=",token)
        if(token){
            res.status(200).json({message:token})
        }else{
            res.status(400).json({message:"cookie not found!"})
        }
    }catch(e){console.log(e)}
})
const model=require("./mongo.js")
module.exports=Pro