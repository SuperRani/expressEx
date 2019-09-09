const express = require("express");
const _ = require("lodash");
const app = express();
const user_router = require("./route/users");

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use("/users", user_router);

app.listen(3000);




