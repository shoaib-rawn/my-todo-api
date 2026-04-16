const express = require("express");
const app = express();
app.use(express.json());
require('dotenv').config();
app.get("/", (req, res) => {
    res.json({ message: "todo api run" });
});

let todos = [];
let nextid = 1;
// GET single todo by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id)
  if (!todo) return res.status(404).json({ error: 'Not found' })
  res.json(todo)
})
app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})
// GET all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST create todo
app.post('/todos', (req, res) => {
    const todo = { 
        id: nextid++, 
        text: req.body.text, 
        done: false 
    };
    todos.push(todo);
    res.status(201).json(todo);  // ✅ Fixed: comma to dot
});

// PUT update todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);  // ✅ Convert to number
    const todo = todos.find(t => t.id === id);  // ✅ Use ===
    
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    
    // ✅ Update the todo
    todo.text = req.body.text || todo.text;
    todo.done = req.body.done !== undefined ? req.body.done : todo.done;
    
    res.json(todo);
});

// DELETE todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);  // ✅ Convert to number
    const todoExists = todos.find(t => t.id === id);
    
    if (!todoExists) {
        return res.status(404).json({ error: "Todo not found" });
    }
    
    todos = todos.filter(t => t.id !== id);  // ✅ Fixed: filter correctly
    res.json({ message: "Todo deleted successfully" });  // ✅ Fixed typo
});
app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));