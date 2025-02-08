const express=require("express")
const login=express.Router()
require("dotenv").config()
const model=require("./mongo.js")
const jwt=require("jsonwebtoken")
module.exports=login
login.use(async (req,res,next)=>{
    const {Email,Password}=req.body
    try{
        const exists=await model.findOne({Email})
        if(!exists){
            res.status(401).json({Message:"invalid email or password"})
        }else{
            if(!exists.Password || exists.Password !== Password){
                res.status(401).json({Message:"invalid email or password"})
            }else{
                next()
            }
        }
    }catch(e){
        console.log("fetch error=",e)
    }
})
login.post("/",(req,res)=>{
    const {Email,Password}=req.body
    const payload={
        Email,
        Password
    }
    const key=process.env.sercret_key
    try{
        const token=jwt.sign(payload,key)
        console.log(token)
        res.status(200).json(token)
    }catch(e){
        console.log("error at token",e)
    }
})