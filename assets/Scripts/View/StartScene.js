var DataManager = require("DataManager");
var SoundManager = require("SoundManager");
var HttpManager = require("HttpManager");

cc.Class({
    extends: cc.Component,

    properties: {
        loginNode:    cc.Node,
        nameEdit:     cc.EditBox,
        passwordEdit: cc.EditBox,
        nameTip:      cc.Label,
        passwordTip:  cc.Label,


        loginBtn:     cc.Button,
        registerBtn:  cc.Button,

        _customPop: null,
        _nameIsValid: false,
        _pswdIsValid: false,
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
        this.nameTip.node.active = false;
        this.passwordTip.node.active = false;

        var userInfo = GameManager.DataManager.getUserInfo();
        cc.log(userInfo);
        if( (!userInfo.userID || userInfo.userID == "null" || userInfo.userID == "" ) || (!userInfo.password || userInfo.password == "null" || userInfo.password == "" ) ){
            this.loginNode.active = true;
        }else{
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
                content: "请输入账号或密码！"
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

    onNameEditEnd: function(){
        var name = this.nameEdit.string;
        cc.log(name);
        cc.log(name.replace(/[^\w\.\/]/ig,''))
        if( name == "" ){
            this.nameTip.string = "请输入账号"
            this.nameTip.node.active = true;
            this._nameIsValid = false;
            return;
        }
        if( name != name.replace(/[^\w\.\/]/ig,'') ){
            this.nameTip.node.active = true;
            this.nameTip.string = "必须字母、数字和下划线";
            this._nameIsValid = false;
            return;
        }

        if( name.length < 8 ){
            this.nameTip.node.active = true;
            this.nameTip.string = "至少是8个字符";
            this._nameIsValid = false;
            return;
        }

        this.nameTip.node.active = false;

        this.loginBtn.interactable = (this._nameIsValid && this._pswdIsValid);
        this.registerBtn.interactable = (this._nameIsValid && this._pswdIsValid);
    },

    onPasswordEditEnd: function(){
        var password = this.passwordEdit.string;
        if( password == "" ){
            this.passwordTip.string = "请输入密码"
            this.passwordTip.node.active = true;
            this._pswdIsValid = false;
            return;
        }
        if( password == password.replace(/[^/d]/g,'') ){
            this.passwordTip.string = "必须是数字"
            this.passwordTip.node.active = true;
            this._pswdIsValid = false;
            return;
        }
        if( password.length < 8 ){
            this.passwordTip.string = "至少是8位数"
            this.passwordTip.node.active = true;
            this._pswdIsValid = false;
            return;
        }

        this.passwordTip.node.active = false;
        
        this.loginBtn.interactable = (this._nameIsValid && this._pswdIsValid);
        this.registerBtn.interactable = (this._nameIsValid && this._pswdIsValid);
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

    onLoginClicked: function(){
        GameManager.SoundManager.playEffect("后台按键音_01");
        this.onLoginIn();
    },

    onRegisterClicked: function(){
        GameManager.SoundManager.playEffect("后台按键音_01");
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
