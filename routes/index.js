var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/db";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    MongoClient.connect(url,{useNewUrlParser:true}, function (err, db) {
        if (err) throw err;
        console.log('数据库已创建');
        var dbase = db.db("cc");
        // dbase.createCollection('site', function (err, res) {
        //     if (err) throw err;
        //     console.log("创建集合!");
        //     db.close();
        // });

        // var myobj =  [
        //     { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        //     { name: 'Google', url: 'https://www.google.com', type: 'en'},
        //     { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
        // ];
        // dbase.collection("site").insertMany(myobj, function(err, res) {
        //     if (err) throw err;
        //     console.log("插入的文档数量为: " + res.insertedCount);
        //     db.close();
        // });
        //
        // dbase.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        //     if (err) throw err;
        //     console.log(result);
        //     db.close();
        // });

    });
});

module.exports = router;
