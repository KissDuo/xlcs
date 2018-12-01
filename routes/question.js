var express = require('express');
var router = express.Router();
var Util = require('../public/js/util.js');
var mysql = require("mysql");
var dbConfig = require("../database/DBConfig");
var pool = mysql.createPool(dbConfig.mysql );

/*获取问题列表*/
router.get('/getList', function(req, res, next) {
    pool.getConnection(function(err,connection) {
        var sql_get_question = "select * from question";
        connection.query(sql_get_question, function (err, result) {
            try{
                if(result && result.length > 0){
                    var data = [];
                    for(var i=0;i<result.length;i++){//将数据库中 '字符串数组'->'数组'
                        result[i].result = eval(result[i].result);
                        result[i].pages = eval(result[i].pages);
                        data.push(result[i]);
                    }
                    var res_json = {
                        status_code : 1,
                        msg : "查询成功",
                        result : data
                    };
                    console.log("查询问题列表成功");
                    res.json(res_json);
                }else{
                    console.log("查询问题失败");
                    res.json({
                        status_code : "1",
                        msg:"找不到问题"
                    });
                }
            }catch (e) {
                console.log(e);
                res.json({
                    status_code:"-200",
                    msg:"查询失败"
                });
            }
            //释放链接
            connection.release();
        });
    });
});

/*获取问题详情*/
router.get('/getInfo', function(req, res, next) {
    var qid = req.query.qid || "";
    pool.getConnection(function(err,connection) {
        var sql_get_question = "select * from question where qid = '" + qid + "'";
        connection.query(sql_get_question, function (err, result) {
            try{
                if(result && result.length > 0){
                    var data = result[0];
                    data.result = eval(data.result);
                    data.pages = eval(data.pages);
                    var res_json = {
                        status_code : 1,
                        msg : "查询成功",
                        result : data
                    };
                    console.log("查询问题qid:"+qid+"成功");
                    res.json(res_json);
                }else{
                    console.log("查询问题qid:"+qid+"不存在");
                    res.json({
                        status_code : "1",
                        msg:"问题不存在"
                    });
                }
            }catch (e) {
                console.log(e);
                res.json({
                    status_code:"-200",
                    msg:"查询失败"
                });
            }
            //释放链接
            connection.release();
        });
    });
});


module.exports = router;
