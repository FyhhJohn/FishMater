
cc.Class({

    properties: {
        userInfo:null,
        shopConfig:null,
    },

    ctor(){
        this.userInfo = {
            gold: 0,
            diamond: 0,
            gunIndex: 0,
        }

        this.userInfo.gold = UserDefault.getInt("gold");
        this.userInfo.diamond = UserDefault.getInt("diamond");
        this.userInfo.gunIndex = UserDefault.getInt("gunIndex");

        this.parseShopConfig();
    },

    parseShopConfig:function(){
        var self = this;
        var url = "config/shopConfig";
        cc.loader.loadRes( url, function( err, res){
            if(err){
                cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify(res));
            }
            
            var result = JSON.stringify(res);
            cc.log( 'result:' + result);
            self.shopConfig = result;
        });
    },

    getShopConfig: function(){
        return this.shopConfig;
    },

    getUserInfo: function(){
        return this.userInfo;
    }
});

