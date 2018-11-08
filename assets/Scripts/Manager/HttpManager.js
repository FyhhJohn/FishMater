const HTTP_SERVER = "";

cc.Class({
    name: 'HttpManager',

    properties: {},

    send: function (route, data, cbSuccess, cbFail) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = 15000;
        xhr.open('post', HTTP_SERVER + route);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            let res = JSON.parse(xhr.responseText);
            cc.log(res);
            if (!res.success) {
                if (cbFail) {
                    cbFail(res.code, res.data, res.msg);
                }
                return;
            }
            if (cbSuccess) {
                cbSuccess(res.data);
            }
        };
        xhr.ontimeout = function () {
            cc.log('网络连接超时');
        };
        xhr.onerror = function () {
            cc.log('网络连接出错');
        };
        xhr.onabort = function () {
            cc.log('网络连接中断');
        };
        xhr.send(JSON.stringify(data));
    },

    onLoginIn: function(data,cbSuccess,cbFail){
        var url = "Config/userInfo";
        cc.loader.loadRes( url, function( err, res){
            if(err){
                cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify(res));
                if( cbFail ){
                    cbFail();
                }
                return;
            }
            
            var result = JSON.parse(JSON.stringify(res));
            cc.log( result );
            if( result.userID == data.userID && result.password == data.password ){
                if( cbSuccess ){
                    cbSuccess(result);
                }
            }else{
                result = "昵称或密码错误！";
                if( cbFail ){
                    cbFail(result);
                }
            }
        });
    },

    
});
