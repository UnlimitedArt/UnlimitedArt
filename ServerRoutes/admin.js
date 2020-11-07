const express = require('express');
const Admin = require("../Data-Base/Admin/admin");
var router = express.Router();


router.post('/Login',(req,res)=>{ 
console.log(req.body)
  })

// router.post("/banaccount", async (req, res) => {
//   console.log(req.body)
//   banaccount(req.body.Email,req.body.date,req.body.reason,res)
// });

module.exports=router