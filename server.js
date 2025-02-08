const express=require("express")
const app=express()
const cors=require("cors")
const model=require("./mongo.js")
app.use(cors())
app.use(express.json())
const port=2000;
const signup=require("./signup.js")
const login = require("./login.js")
const Pro=require("./protected.js")
app.use("/Signup",signup)
app.use("/Login",login)
app.use("/Protected",Pro)









app.get("/",(req,res)=>{
    res.send("<h1>Hello world</h1>")
    model.insertOne({Name:"Thoufiq"}).then(()=>console.log("inserted")).catch((e)=>console.log(e))
    
})

app.listen(port,()=>{
    console.log(`app is worhing on ${port}`)
})