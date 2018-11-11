const HTTP_SERVER = "http://localhost:80/user.php";

cc.Class({
    name: 'HttpManager',

    properties: {},

    send: function (data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 15000;
        xhr.open("post",HTTP_SERVER);
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {  
            var responseText = xhr.responseText;
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <300) ) {  
                cc.log("receive:"+responseText);
                callback(JSON.parse(responseText));
            } 
        };  
        cc.log("send:"+JSON.stringify(data));
        xhr.send(JSON.stringify(data));
    },

    login: function(data,cbSuccess,cbFail){
        this.send(data, function(data){
            if( data["result"] == 0 ){
                cbSuccess(data.data);
            }else{
                cbFail(data.data);
            }
        });
    },

    register: function(data,cbSuccess,cbFail){
        this.send(data, function(data){
            if( data["result"] == 0 ){
                cbSuccess(data.data);
            }else{
                cbFail(data.data);
            }
        });
    },
});
