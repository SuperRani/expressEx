const express = require("express");
const router = express.Router();


router.get("/", (req,res) =>{
    res.send("get all");

});
router.get("/:id", (req,res) =>{
    res.send("get id");

});
router.post("/", (req,res) =>{
    res.send("post");

});
router.put("/:id", (req,res) =>{
    res.send("put");

});
router.delete("/:id", (req,res) =>{
    res.send("delete");

});

module.exports = router;