const express=require("express")
const signup=express.Router()
const fs=require("fs")
const model=require("./mongo.js")
const path=require('path');
signup.use(async(req,res,next)=>{
    const{Name,Email,Password}=req.body
    try{
        const exists=await model.findOne({Email})
        if(exists){
            res.status(401).json({message:"Email exists"})
        }else{
            next()
        }
        }catch(e){
            console.log("signup mongo error=",e)
        }
})
signup.post("/",(req,res)=>{
    const{Name,Email,Password}=req.body
    console.log(Name)
    console.log(Email)
    console.log(Password)
    
    
const filepath = path.resolve(__dirname, "protected.json");


  
    try{
        model.insertMany({Name:Name,Email:Email,Password:Password})
        console.log("inserted")
        res.status(200).json({message:"Registered"})
        
        try{
            let datas=[]
            const fileContent = fs.readFileSync(filepath, "utf-8");
            if (fileContent) {
                datas = JSON.parse(fileContent);
                console.log("datas=",datas)
            }
            datas.push({ Name, Email, Password });
            fs.writeFileSync(filepath,JSON.stringify(datas,null,2),"utf-8")
            const data=fs.readFileSync(filepath,"utf-8")
            console.log("data inserted",datas)
        }catch(e){
            console.log("unable to insert=",e)
        }
       
    }catch(e){
        console.log("Errro at insertation=",e)
    }

})

module.exports=signup