var express = require('express');
var router = express.Router();
var request = require('request');
var Util = require('../public/js/util.js');
var mysql = require("mysql");
var dbConfig = require("../database/DBConfig");
var pool = mysql.createPool(dbConfig.mysql );

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**/
router.post('/insertUser', function(req, res, next) {
    var code = req.body.code || "",
        code2SessionUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=wx94108cc16a47be51&secret=6d11bb7e8e65b2453a43c2b8a394e533&js_code="+code+"&grant_type=authorization_code";

    request(code2SessionUrl, function (error, response, body) {//通过code获取openid
        if (!error && response.statusCode == 200) {
            console.log("----访问接口---- IP:"+Util.getIp(req));
            //通过openid查询数据库
            pool.getConnection(function(err,connection) {
                var sql = "select * from user where openId = " + JSON.parse(body).openid;     
                connection.query(sql, function (err, result) {
                    try{
                        if(result.length > 0){
                            console.log("用户已存在");
                            res.json({
                                status_code : "1",
                                msg:"用户已存在"
                            });
                        }else{
                            console.log("用户新增成功");
                            res.json({
                                status_code : "1",
                                msg:"用户新增成功"
                            })
                        }
                    }catch (e) {
                        res.json({
                            status_code:"-200",
                            msg:"操作失败"
                        });
                    }
                    //释放链接
                    connection.release();
                });
            });
        }
    });
});

module.exports = router;
