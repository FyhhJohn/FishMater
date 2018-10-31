

cc.Class({
    extends: cc.Component,

    properties: {
        _settingUI: null,
    },

    onLoad: function(){
        GameManager.MainScene = this;
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

    onDestroy: function(){
        SoundManager.stopEffect();
        SoundManager.stopMusic();
    },
});
