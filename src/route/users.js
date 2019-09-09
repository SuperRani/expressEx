const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("node_example", "root", "1234",{ hotst: "localhost", dialect: "mysql"});
const check_sequlize_auth = async() =>{
    try{
        await sequelize.authenticate();
        console.log("연결  성공");

    }catch(err){
        console.log("연결 실패", err);
    }
};
check_sequlize_auth();

const User = sequelize.define("user",{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address:{
        type : Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force:true}) .then(() => {
    return User.create({
        name: "홍길동",
        address: "seoul"
    });
}).then( () => {
    return User.create({
        name: "김철수",
        address: "anyang"
    });
});


let users = [{
    id: 1,
    name: "홍길동"
},{
    id: 2,
    name: "강철수"
}];;

router.get("/", async(req,res)=> {
    let result = await User.findAll({
        attributes: ["name"]
    });
    res.send(result);
});
router.get("/address/:address", async(req,res)=> {
    let result = await User.findAll({
        where:{
            address: req.params.address
        }
        
    });
    res.send(result);
});

router.get("/:id", async(req,res)=>{
    let result = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    res.send(result);
});

router.post("/", async(req, res)=> {
    let result = false;
    try{
        await User.create({ id: req.body.id, name: req.body.name, address: req.body.address });
        result = true;
    }catch(err){
        console.error(err);
    }
    res.send(result);

});




// //get
// router.get("/", (req, res) => {
//     let msg = "유저가 존재하지 않습니다. ";
//     if(users.length>0){
//         msg =users.length + "명의 유저가 존재합니다.";
//     }
   
//   res.send({msg,result:users});
// });

// router.get("/:id", (req,res)=> {
//     if(users && user.id == req.params.id){
//         res.send("user " + users.name+ "get");
//     }else{
//         res.send("error")     
//     }
// });

// router.post("/", (req,res)=> {
//     const check_user = _.find(users, ["id", req.params.id]);
//     let msg = req.body.id+" 아이디를 가진 유저가 이미 존재합니다.";
//     let success = false;
//     if(!check_user){
//         users.push(req.body);
//         msg = req.body.name+" 유저가 추가되었습니다.";
//         success = true;
//     }
//     res.send({msg, success})
// });



router.put("/:id", async(req, res)=> {
    // let msg = req.params.id + "아이디를 가진 유저가 존재하지 않습니다.";
    let result = await User.update(
        {
            name: req.body.name,
            address: req.body.addres
        },{
            where:{
                id: req.params.id
            }

        }
           
        );
        res.send(result);
});


// router.get("/:id", async(req,res)=>{
//     let result = await User.findOne({
//         where: {
//             id: req.params.id
//         }
//     });
//     res.send(result);
// });

// router.put("/:id", (req,res)=> {
//     let check_user = _.find(users, ["id", parseInt(req.params.id)]);
//     let msg = req.params.id + "아이디를 가진 유저가 존재하지 않습니다.";
//     if(check_user){
//         users = users.map(entry => {
//             if(entry.id === parseInt(req.params.id)){
//                 entry.name = req.body.name;
//             }
//             return entry;
       
//         });
//         msg = "성공적으로 수정 됨";     
//     }
//     res.send({msg});
// });

router.delete("/:id", (req,res)=> {
    let check_user = _.find(users, ["id", parseInt(req.params.id)]);
    let msg = req.params.id + "아이디를 가진 유저가 존재하지 않습니다.";
    if(check_user){
        msg = "성공적으로 삭제 됨";     
        users = _.reject(users, ["id", parseInt(req.params.id)]);       
    }
    res.send({msg});
});

module.exports = router;

