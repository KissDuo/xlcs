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
    var obj = { city: '',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKgNuRNozic1xl1wVzN2JAoPdbEEicI5VNzRM3cFJjK9Wdwia75icib2StKTCdTj2oICWgbIKUsG9yAjEQ/132',
        code: '021G5bht1vWt4e07Noht1wxAht1G5bhX',
        country: 'St.Kitts and Nevis',
        gender: 1,
        language: 'zh_CN',
        nickName: ' W\'s-Superman',
        province: ''
    }
    for(var i=0;i<Object.keys(obj).length;i++){
        arr.push(obj[Object.keys(obj)[i]]);
    }
    return arr;
};

module.exports = Util;