var express = require('express');
var router = express.Router();
var Util = require('../public/js/util.js');
var mysql = require("mysql");
var dbConfig = require("../database/DBConfig");
var pool = mysql.createPool(dbConfig.mysql );

/*后台首页*/
router.get('/', function(req, res, next) {

});


module.exports = router;
