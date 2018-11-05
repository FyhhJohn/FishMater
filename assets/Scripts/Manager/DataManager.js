
cc.Class({

    properties: {
        userInfo:   null,
        shopConfig: null,
        fishConfig: null,
        gunConfig:  null,
    },

    ctor(){
        this.userInfo = {
            gold: 0,
            diamond: 0,
            gunIndex: 0,
            userID: null,
        }

        this.userInfo.gold = UserDefault.getInt("gold");
        this.userInfo.diamond = UserDefault.getInt("diamond");
        this.userInfo.gunIndex = UserDefault.getInt("gunIndex");
        this.userInfo.userID = UserDefault.getString("UserID");
        this.userInfo.diamond = 0;

        this.parseShopConfig();
        this.parseFishConfig();
        this.parseGunConfig();

        Utils.randomUserName(10);
    },

    //解析商城数据
    parseShopConfig:function(){
        var self = this;
        var url = "config/shopConfig";
        cc.loader.loadRes( url, function( err, res){
            if(err){
                cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify(res));
            }
            
            var result = JSON.parse(JSON.stringify(res));
            self.shopConfig = result;
        });
    },

    //解析鱼数据
    parseFishConfig: function(){
        var self = this;
        var url = "config/fishConfig";
        cc.loader.loadRes( url, function( err, res){
            if(err){
                cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify(res));
            }
            
            var result = JSON.parse(JSON.stringify(res));
            self.fishConfig = result;
            cc.log(result);
        });
    },

    parseGunConfig: function(){
        var self = this;
        var url = "config/gunConfig";
        cc.loader.loadRes( url, function( err, res){
            if(err){
                cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify(res));
            }
            
            var result = JSON.parse(JSON.stringify(res));
            self.gunConfig = result;
            cc.log(result);
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
});

