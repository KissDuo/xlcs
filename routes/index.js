var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var url = "mongodb://127.0.0.1:27017/db";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    MongoClient.connect(url,{useNewUrlParser:true}, function (err, db) {
        if (err) throw err;
        console.log('数据库已创建');
        var dbase = db.db("xlcs");
        // dbase.createCollection('site', function (err, res) {
        //     if (err) throw err;
        //     console.log("创建集合!");
        //     db.close();
        // });

        var myobj =  {
            nickName: " W's-Superman",
            gender: 1,
            language: "zh_CN",
            city: "",
            province: "",
        };
    });
});

router.get('/insertUser', function(req, res, next) {
    var userInfo = req.query.user_info || "",
        code2SessionUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=wx94108cc16a47be51&secret=6d11bb7e8e65b2453a43c2b8a394e533&js_code=001Du0lQ0bVBT92hJnjQ0NEZkQ0Du0l8&grant_type=authorization_code";

    request(code2SessionUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var openId = JSON.parse(body).openid,
                sessionKey = JSON.parse(body).session_key;

            MongoClient.connect(url,{useNewUrlParser:true}, function (err, db) {
                if (err) throw err;
                var dbase = db.db("xlcs");
                dbase.collection("user").find({"openid":openId}).toArray(function (err, result) { // 返回集合中所有数据
                    if (err) throw err;
                    console.log(userInfo);
                    console.log(result);
                    if(result.length > 0){//用户授权过
                        console.log("用户已存在");
                    }else{//用户没授权过
                        var myobj =  {
                            nickName: " W's-Superman",
                            gender: 1,
                            language: "zh_CN",
                            city: "",
                            province: "",
                            openid : "oBE9K5OsMRelzssSsc3WArO_4Yag"
                        };
                        dbase.collection("user").insertOne(myobj, function(err, res) {
                            if (err) throw err;
                            console.log("插入的文档数量为: " + res.insertedCount);
                            db.close();
                        });
                    }
                    db.close();
                });
            });
            console.log(body);
            console.log(openId);
            console.log(JSON.parse(body).openid);
        }
    });

    res.render('index', { title: 'Express' });
});

module.exports = router;
