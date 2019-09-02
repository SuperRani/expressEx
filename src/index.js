const express = require("express");
const app = express();
let users = [];
let user = "null";

app.use(express.json());    //  
app.use(express.urlencoded({extended:true}));

app.listen(3000);

// app.get("/", (req, res) => {
//     let a= 10;
//     let b = 20;
//     let c = a+b;
//     req.send(c);
//     res.send("hello dsdsad")
// });

app.get("/users", (req, res) => {
  res.send("user get" + user.name);
});

app.get("/users/:id", (req,res)=> {
    if(user.id == req.params){
        
        res.send("user " + user.name+ "get");
    }
    res.send("user "+ user.name + " get");
});

app.post("/users", (req,res)=> {
    user = req.body;
    res.send("user add"+ user.name + " post");
});
app.put("/users/:id", (req,res)=> {
    res.send("user "+ req.params.id + " put");
    res.send(user.name);
});
app.delete("/users/:id", (req,res)=> {
    res.send("user "+ req.params.id + " delete");
});









