var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var Util = require('../public/js/util.js');

var url = "mongodb://127.0.0.1:27017/db";

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' });
    // MongoClient.connect(url,{useNewUrlParser:true}, function (err, db) {
    //     if (err) throw err;
    //     console.log('数据库已创建');
    //     var dbase = db.db("xlcs");
    // });
});

router.post('/insertUser', function(req, res, next) {
    var userInfo = req.body || {},
        code = req.body.code || "",
        code2SessionUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=wx94108cc16a47be51&secret=6d11bb7e8e65b2453a43c2b8a394e533&js_code="+code+"&grant_type=authorization_code";

    request(code2SessionUrl, function (error, response, body) {//通过code获取openid
        if (!error && response.statusCode == 200) {
            var openId = JSON.parse(body).openid;
                // sessionKey = JSON.parse(body).session_key;
            //通过openid查询数据库
            MongoClient.connect(url,{useNewUrlParser:true}, function (err, db) {
                if (err) throw err;
                var dbase = db.db("xlcs");
                //查询用户
                dbase.collection("user").find({"openid":openId}).toArray(function (err, result) { // 返回集合中所有数据
                    if (err) throw err;
                    if(result.length > 0){//用户授权过
                        console.log("用户已存在");
                        res.send({
                            status : 1,
                            msg : "用户已存在"
                        });
                    }else{//用户没授权过
                        console.log("用户不存在");
                        userInfo.registerDate = Util.getDate();//用户注册时间
                        userInfo.openid = openId;//用户openid
                        dbase.collection("user").insertOne(userInfo, function(err, res) {
                            if (err) throw err;
                            console.log("插入的文档数量为: " + res.insertedCount);
                        });
                        res.send({
                            status : 1,
                            msg : "用户不存在，已成功添加"
                        });
                    }
                    db.close();
                });
            });
        }
    });
});

module.exports = router;
