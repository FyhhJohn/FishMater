const HTTP_SERVER = "http://localhost:8080/user.php";

cc.Class({
    name: 'HttpManager',

    properties: {},

    send: function (data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 15000;
        xhr.open("post",HTTP_SERVER);
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {  
            var data = xhr.responseText;
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <300) ) {  
                cc.log("receive:"+data);
                callback(data);
            } 
        };  
        cc.log("send:"+JSON.stringify(data));
        xhr.send(JSON.stringify(data));
    },

    // onLoginIn: function(data,cbSuccess,cbFail){
    //     var url = "Config/userInfo";
    //     cc.loader.loadRes( url, function( err, res){
    //         if(err){
    //             cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify(res));
    //             if( cbFail ){
    //                 cbFail();
    //             }
    //             return;
    //         }
            
    //         var result = JSON.parse(JSON.stringify(res));
    //         cc.log( result );
    //         if( result.userID == data.userID && result.password == data.password ){
    //             if( cbSuccess ){
    //                 cbSuccess(result);
    //             }
    //         }else{
    //             result = "昵称或密码错误！";
    //             if( cbFail ){
    //                 cbFail(result);
    //             }
    //         }
    //     });
    // },

    login: function(data,cbSuccess,cbFail){
        this.send(data, function(data){

        });
    },

    register: function(data,cbSuccess,cbFail){
        this.send(data,cbSuccess,cbFail);
    },
});
