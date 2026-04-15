const express= require("express");
const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message:"todo api run"})

})
let  todos=[];
let nextid=1;
app.get('/todos',(req,res)=>{
    res.json(todos)
})
app.post('/todos',(req,res)=>{
    const todo ={id:nextid++,text:req.body.text, done:false}
    todos.push(todo)
    res,status(201).json(todo)
})
app.put('/todos/:id',(req,res)=>{
    const todo=todos.find(t=>t.id==req.params.id)
    if(!todo) return res.status(404).json({error:"not found"})
        res.json(todo)
})
app.delete('/todos/:id',(req,res)=>{
    todos=todos.filter(t=>t.id )
    res.json({mrssage:"deleted"})
})
app.listen(3000,()=>{
    console.log("server on port 3000");

})