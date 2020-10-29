const express=require('express')
const app=express()
const PORT=3000


app.get("/",(req,res)=>{
    res.send("ready to go")
})


app.listen(PORT,(req,res)=>{

    console.log(`Server is listening...${PORT}`)
})