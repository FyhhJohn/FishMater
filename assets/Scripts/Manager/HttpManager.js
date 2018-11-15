const HTTP_SERVER = "http://192.168.231.184/user.php";
// const HTTP_SERVER = "http://192.168.231.82/by/user.php";

cc.Class({
    name: 'HttpManager',

    properties: {},

    send: function (data, callback, isLoad) {
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
                if( isLoad ){
                    if( GameManager.LoadingUI ){
                        GameManager.LoadingUI.active = false;
                    }
                }
            } 
        };  
        cc.log("send:"+JSON.stringify(data));
        xhr.send(JSON.stringify(data));

        if( isLoad ){
            if ( !GameManager.LoadingUI ){
                cc.loader.loadRes("Prefabs/loadingUI", function(err,prefab){
                    if( err ){
                        return;
                    }

                    GameManager.LoadingUI = cc.instantiate(prefab);
                    var runScene = cc.director.getScene();
                    if( runScene ){
                        runScene.addChild(GameManager.LoadingUI,999);
                    }
                });
            }else{
                GameManager.LoadingUI.active = true;
                GameManager.LoadingUI.parent = cc.director.getScene();
                GameManager.LoadingUI.nIndex = 999;
            }
        }
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
        },true);
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
        },true);
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
        },true);
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
        },true);
    },
});
