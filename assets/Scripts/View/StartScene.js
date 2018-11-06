var DataManager = require("DataManager");
var SoundManager = require("SoundManager");
var HttpManager = require("HttpManager");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {
    },

    onLoad: function(){
        GameManager.SoundManager = new SoundManager(); 
        GameManager.DataManager = new DataManager();
        GameManager.HttpManager = new HttpManager();

        var isEffectOn = UserDefault.getBool("effectOn");
        var isMusicOn  = UserDefault.getBool("musicOn");

        GameManager.SoundManager.setEffectOn(isEffectOn);
        GameManager.SoundManager.setMusicOn(isMusicOn);
        GameManager.SoundManager.playMusic("背景乐_01");

        GameManager.HttpManager.onLoginIn({},(data)=>{
            cc.log(data);

            GameManager.DataManager.userInfo.gold = data["gold"];
            GameManager.DataManager.userInfo.diamond = data["diamond"];
            GameManager.DataManager.userInfo.gunIndex = data["gunIndex"];
            GameManager.DataManager.userInfo.userID = data["userID"];
        },function(){
            cc.log("login failed");
        });
    },

    onNewGame: function(){
        cc.director.loadScene("MainScene");
        GameManager.SoundManager.playEffect("后台按键音_01");
    },

    onOldGame: function(){
        cc.director.loadScene("MainScene");
        GameManager.SoundManager.playEffect("后台按键音_01");
    },

    onDestroy: function(){
        GameManager.SoundManager.stopMusic();
    },
});
