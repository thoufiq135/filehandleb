const express=require("express")
const app=express()
const cors=require("cors")
const model=require("./mongo.js")
const cookieparser=require("cookie-parser")
app.use(cookieparser())
app.use(cors({
    origin: "https://filehandlef-final1.vercel.app", 
    credentials: true,
}));
app.use(express.json())
const port=2000;
const signup=require("./signup.js")
const login = require("./login.js")
const Pro=require("./protected.js")

app.use("/Signup",signup)
app.use("/Login",login)
app.use("/Protected",Pro)
app.get("/",(req,res)=>{
    res.cookie("message","Thisismyfirstcookie",{httpOnly:true,secure:true,sameSite:"none"}).send("<h1>Hello World</h1>")
   
    
})

app.listen(port,()=>{
    console.log(`app is worhing on ${port}`)
})