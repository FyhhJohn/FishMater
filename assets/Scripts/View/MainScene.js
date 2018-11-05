

cc.Class({
    extends: cc.Component,

    properties: {
        _settingUI: null,
        _shopUI: null,
        _customPop: null,
    },

    onLoad: function(){

        this._settingUI = null;
        this._shopUI = null;
        this._customPop = null;

        GameManager.MainScene = this;

        var musicIndex =  Utils.random(1,4);
        SoundManager.playMusic("背景乐_0"+musicIndex);
    },

    onSettingClicked: function(){
        SoundManager.playEffect("后台按键音_01");

        var self = this;
        if( this._settingUI ){
            this._settingUI.getComponent("SettingScene").show();
        }else{
            cc.loader.loadRes("Prefabs/Setting/settingUI",function(err,prefab){
                if( err ){
                    return;
                }

                self._settingUI = cc.instantiate(prefab);
                self._settingUI.parent = self.node;

                self._settingUI.getComponent("SettingScene").show();
            });
        }
    },

    onShopClicked: function(){
        SoundManager.playEffect("后台按键音_01");

        cc.log("onShopClicked");
        var self = this;
        if( this._shopUI  ){
            this._shopUI.getComponent("ShopScene").show();
        }else{
            cc.loader.loadRes("Prefabs/Shop/ShopUI",function(err,prefab){
                if( err ){
                    return;
                }

                self._shopUI = cc.instantiate(prefab);
                self._shopUI.parent = self.node;
                self._shopUI.getComponent("ShopScene").show();
            });
        }
    },

    onDestroy: function(){
        SoundManager.stopEffect();
        SoundManager.stopMusic();
    },

    showPop: function(data){
        var self = this;
        if( self._customPop ){
            self._customPop.getComponent("CustomPop").show(data)
            cc.log("aaaaaaaaaaaaa");
        }else{
            cc.loader.loadRes("Prefabs/CustomPop",function(err,prefab){
                if( err ){
                    return;
                }
                cc.log("bbbbbbbbb");
                self._customPop = cc.instantiate(prefab);
                self._customPop.parent = self.node;
                self._customPop.getComponent("CustomPop").show(data);
            });
        }
    }
});
