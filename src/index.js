const express = require("express");
const app = express();
let users = [];
let user = null;

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
    if(user){
        res.send("user" + user.name+ "get");
    }else{
        res.send("유저가 x");
    }
  res.send("user get" + user.name);
});

app.get("/users/:id", (req,res)=> {
    if(user && user.id == req.params.id){
        
        res.send("user " + user.name+ "get");
    }else{
        res.send("user "+ req.params.id+ " 가 존재 하지 않음");

    }
    
});

app.post("/users", (req,res)=> {
    user = req.body;
    res.send("user add"+ user.name + " post");
});


app.put("/users/:id", (req,res)=> {
    if(user && user.id == req.params.id){
        user.name = req.body.name;
        res.send(""+user.name);
    }else{
        res.send("user id" + req.params.id + "존재하지 않음");
    }
});
app.delete("/users/:id", (req,res)=> {
    if(user && user.id == req.params.id){
        user = null;
        res.send("user id" + req.params.id + "삭제");
    }else{
        res.send("user id" + req.params.id + "존재하지 않음");
    }
    
});









