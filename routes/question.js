var express = require('express');
var router = express.Router();
var Util = require('../public/js/util.js');
var mysql = require("mysql");
var dbConfig = require("../database/DBConfig");
var pool = mysql.createPool(dbConfig.mysql );

/*获取问题列表*/
router.get('/getInfo', function(req, res, next) {
    var qid = req.query.qid || "";
    pool.getConnection(function(err,connection) {
        var sql_get_question = "select * from question where qid = '" + qid + "'";
        connection.query(sql_get_question, function (err, result) {
            try{
                if(result && result.length > 0){
                    var res_json = {
                        status_code : 1,
                        msg : "查询成功",
                        data : result[0]
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
