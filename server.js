const express= require("express");
const app=express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.json({message:"todo api run"})

})
app.listen(3000,()=>{
    console.log("server on port 3000");
    
})