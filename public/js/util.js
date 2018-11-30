var Util = {};

//获取时间
Util.getDate = function getDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    var str = year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second;
    return str;
};

//通过req的hearers来获取客户端ip
Util.getIp = function(req) {
    var ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0];
    }
    return ip;
};

//对象转数组
Util.objToArray = function(obj){
    var arr = [];
    for(var i=0;i<Object.keys(obj).length;i++){
        if(Object.keys(obj)[i] != "code"){
            arr.push(obj[Object.keys(obj)[i]]);
        }
    }
    return arr;
};

module.exports = Util;