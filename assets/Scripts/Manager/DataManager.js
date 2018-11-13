
cc.Class({

    name: "DataManager",

    properties: {
        userInfo:   null,
        shopConfig: null,
        fishConfig: null,
        gunConfig:  null,
        isLogin:    false,
    },

    ctor(){
        this.userInfo = {
            token: null,
            gold: 0,
            diamond: 0,
            gunIndex: 0,
            userName: null,
            password: null,
        }

        cc.log("DataManager");
    },
    
    init: function(){
        this.userInfo.userName = UserDefault.getString("userName");
        this.userInfo.password = UserDefault.getString("password");
    
        this.parseShopConfig();
        this.parseFishConfig();
        this.parseGunConfig();
    },

    //解析商城数据
    parseShopConfig:function(){
        var self = this;
        var url = "Config/shopConfig";
        cc.loader.loadRes( url, function( err, res){
            if(err){
                cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify(res));
            }
            
            var result = JSON.parse(JSON.stringify(res));
            self.shopConfig = result;
            cc.log(self.shopConfig);
        });
    },

    //解析鱼数据
    parseFishConfig: function(){
        var self = this;
        var url = "Config/fishConfig";
        cc.loader.loadRes( url, function( err, res){
            if(err){
                cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify(res));
            }
            
            var result = JSON.parse(JSON.stringify(res));
            self.fishConfig = result;
            cc.log(self.fishConfig);
        });
    },

    parseGunConfig: function(){
        var self = this;
        var url = "Config/gunConfig";
        cc.loader.loadRes( url, function( err, res){
            if(err){
                cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify(res));
            }
            
            var result = JSON.parse(JSON.stringify(res));
            self.gunConfig = result;
            cc.log(self.gunConfig);
        });
    },

    getShopConfig: function(){
        return this.shopConfig;
    },

    getUserInfo: function(){
        return this.userInfo;
    },

    getFishConfig: function(fishName){
        return this.fishConfig[fishName];
    },

    getGunConfig: function(gunName){
        return this.gunConfig[gunName];
    },

    saveUserInfo: function(){
        UserDefault.setString("userName", this.userInfo.userName);
        UserDefault.setString("password", this.userInfo.password);
    },
});

