var DataManager = require("DataManager");
var SoundManager = require("SoundManager");
var HttpManager = require("HttpManager");

cc.Class({
    extends: cc.Component,

    properties: {
        loginNode: cc.Node,
        nameEdit: cc.EditBox,
        passwordEdit: cc.EditBox,
        _customPop: null,
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

        var self = this;
        this.loginNode.active = true;

        var userInfo = GameManager.DataManager.getUserInfo();
        cc.log(userInfo);
        if( (!userInfo.userID || userInfo.userID == "null" || userInfo.userID == "" ) || (!userInfo.password || userInfo.password == "null" || userInfo.password == "" ) ){
            this.loginNode.active = true;
        }else{
            var data = {
                userID:  userInfo.userID,
                password:userInfo.password, 
            }
            this.nameEdit.string     = userInfo.userID;
            this.passwordEdit.string = userInfo.password;

            this.onLoginIn();
        }
    },

    onLoginIn: function(){
        var logindata = {
            userID:   this.nameEdit.string,
            password: this.passwordEdit.string
        }

        if( logindata.userID == "" || logindata.password == "" ){
            var tip = {
                title: "提示",
                content: "请输入昵称或密码！"
            }
            this.showPop(tip);
            return;
        }

        cc.log(logindata);
        var self = this;
        GameManager.HttpManager.onLoginIn(logindata,(data)=>{

            GameManager.DataManager.userInfo.gold     = data["gold"];
            GameManager.DataManager.userInfo.diamond  = data["diamond"];
            GameManager.DataManager.userInfo.gunIndex = data["gunIndex"];
            GameManager.DataManager.userInfo.userID   = data["userID"];
            GameManager.DataManager.userInfo.password = data["password"];
            GameManager.DataManager.saveUserInfo();

            self.loginNode.active = false;
        },function(data){
            var info = {
                title: "提示",
                content: data,
            }
            self.showPop(info);
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

    showPop: function(data,func){
        var self = this;
        if( self._customPop ){
            self._customPop.getComponent("CustomPop").show(data,func)
        }else{
            cc.loader.loadRes("Prefabs/CustomPop",function(err,prefab){
                if( err ){
                    return;
                }
                self._customPop = cc.instantiate(prefab);
                self.node.addChild(self._customPop, 999)
                self._customPop.getComponent("CustomPop").show(data,func);
            });
        }
    }
});
