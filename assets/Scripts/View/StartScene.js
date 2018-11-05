var DataManager = require("DataManager");


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

        SoundManager.playMusic("背景乐_01");

        GameManager.DataManager = new DataManager();
    },

    onNewGame: function(){
        cc.director.loadScene("MainScene");
        SoundManager.playEffect("后台按键音_01");
    },

    onOldGame: function(){
        cc.director.loadScene("MainScene");
        SoundManager.playEffect("后台按键音_01");
    },

    onDestroy: function(){
        SoundManager.stopMusic();
    },
});
