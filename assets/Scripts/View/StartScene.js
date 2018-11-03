

cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {
    },

    onLoad: function(){
        var isEffectOn = UserDefault.getBool("effectOn");
        var isMusicOn  = UserDefault.getBool("musicOn");

        SoundManager.setEffectOn(isEffectOn);
        SoundManager.setMusicOn(isMusicOn);
    },

    onNewGame: function(){
        cc.director.loadScene("MainScene");
    },

    onOldGame: function(){
        cc.director.loadScene("MainScene");
    },
});
