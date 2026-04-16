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
    res.json({ status: 'OK!' })
})

// Login route
app.post('/login', (req, res) => {
    res.json({ message: 'Login endpoint' })
})

// Register route
app.post('/register', (req, res) => {
    res.json({ message: 'Register endpoint' })
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
    res.status(201).json(todo);
});

// PUT update todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    
    todo.text = req.body.text || todo.text;
    todo.done = req.body.done !== undefined ? req.body.done : todo.done;
    
    res.json(todo);
});

// DELETE todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoExists = todos.find(t => t.id === id);
    
    if (!todoExists) {
        return res.status(404).json({ error: "Todo not found" });
    }
    
    todos = todos.filter(t => t.id !== id);
    res.json({ message: "Todo deleted successfully" });
});

app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));