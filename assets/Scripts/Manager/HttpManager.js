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
            var responseText = xhr.responseText;
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <300) ) {  
                cc.log("receive:"+responseText);
                var json_data = JSON.parse(responseText);
                callback(json_data);
            } 
        };  
        cc.log("send:"+JSON.stringify(data));
        xhr.send(JSON.stringify(data));
    },

    login: function(data,cbSuccess,cbFail){
        var sendData = {
            command: "login",
            userName: data.userName,
            password: data.password,
        }
        this.send(sendData, function(data){
            if( data["result"] == 0 ){
                if(cbSuccess) cbSuccess(data.data);
            }else{
                if(cbFail) cbFail(data.data);
            }
        });
    },

    register: function(data,cbSuccess,cbFail){
        var sendData = {
            command:  "register",
            userName: data.userName,
            password: data.password,
        }
        this.send(sendData, function(data){
            if( data["result"] == 0 ){
                if(cbSuccess) cbSuccess(data.data);
            }else{
                if(cbFail) cbFail(data.data);
            }
        });
    },

    updateInfo: function(data,cbSuccess,cbFail){
        var sendData = {
            command: "updateInfo",
            userName: data.userName,
            gold:     data.gold,
            diamond:  data.diamond,
            gunIndex: data.gunIndex,
        }
        this.send(sendData, function(data){
            if( data["result"] == 0 ){
                if(cbSuccess) cbSuccess(data.data);
            }else{
                if(cbFail) cbFail(data.data);
            }
        });
    },

    buyItem: function(data,cbSuccess,cbFail){
        var sendData = {
            command: "buyGold",
            userName: data.userName,
            itemName: data.itemName,
        }

        this.send(sendData, function(data){
            if( data["result"] == 0 ){
                if(cbSuccess) cbSuccess(data.data);
            }else{
                if(cbFail) cbFail(data.data);
            }
        });
    },

    upGradeGun: function(data,cbSuccess,cbFail){
        var sendData = {
            command: "upGradeGun",
            userName: data.userName,
            gunIndex: data.gunIndex,
            gunName:  data.gunName,
        }

        this.send(sendData, function(data){
            if( data["result"] == 0 ){
                if(cbSuccess) cbSuccess(data.data);
            }else{
                if(cbFail) cbFail(data.data);
            }
        });
    },
});
