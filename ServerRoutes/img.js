const express = require('express')
var router = express.Router();
const Img=require("../Data-Base/img/route")

router.post('/', function(req, res, next) {
    console.log(req.body)
Img.index(req,res) 
      });

module.exports=router