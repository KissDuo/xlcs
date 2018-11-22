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
}

module.exports = Util;