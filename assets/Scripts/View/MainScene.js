

cc.Class({
    extends: cc.Component,

    properties: {
        _settingUI: null,
        _shopUI: null,
    },

    onLoad: function(){
        GameManager.MainScene = this;

        SoundManager.playMusic("背景乐_01");
    },

    onSettingClicked: function(){
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
});
