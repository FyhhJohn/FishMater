
cc.Class({
    extends: cc.Component,

    properties: {
        loginNode:    cc.Node,
        
        nameLay:      cc.Node,
        nameEdit:     cc.EditBox,
        nameTip:      cc.Label,
        
        passwordLay:  cc.Node,
        passwordEdit: cc.EditBox,
        passwordTip:  cc.Label,

        passwordLay2:  cc.Node,
        passwordEdit2: cc.EditBox,
        passwordTip2:  cc.Label,

        chooseNode:   cc.Node,

        titleLab:     cc.Label,

        loginBtn:     cc.Button,
        registerBtn:  cc.Button,

        infoLay:      cc.Node,
        goldLab:      cc.Label,
        diamondLab:   cc.Label,
        nickNameLab:  cc.Label,

        btnLay:       cc.Node,

        _customPop:   null,
        _nameIsValid: false,
        _pswdIsValid: false,
        _noticeUI:    null,
        _shopUI:      null,
        _settingUI:   null,
        _rankUI:      null,
    },

    start () {
    },

    onLoad: function(){
        cc.log("startScene");

        var isEffectOn = UserDefault.getBool("effectOn");
        var isMusicOn  = UserDefault.getBool("musicOn");

        GameManager.SoundManager.setEffectOn(isEffectOn);
        GameManager.SoundManager.setMusicOn(isMusicOn);
        // GameManager.SoundManager.playMusic("background_01");

        var self = this;

        this.loginNode.active = false;
        this.chooseNode.active = false;
        this.nameTip.node.active = false;
        
        
        if( GameManager.DataManager.isLogin ){
            return;
        }
        GameManager.DataManager.init();
        var userInfo = GameManager.DataManager.getUserInfo();

        if( (!userInfo.userName || userInfo.userName == "null" || userInfo.userName == "" ) || (!userInfo.password || userInfo.password == "null" || userInfo.password == "" ) ){
            this.chooseNode.active = true;
        }else{
            this.onChooseLoginClicked();
            this.nameEdit.string     = userInfo.userName;
            this.passwordEdit.string = userInfo.password;
            
            this.onLoginIn();
        }
    },

    onEnable: function(){

        var self = this;
        cc.systemEvent.on("BuyItemSuccess",function(event){
            var gold = event.detail.gold;
            var diamond = event.detail.diamond;
            self.updateGoldValue(gold);      
            self.updateDiamondValue(diamond);

            self.showPop({
                title: "提示",
                content: '购买成功',
            });
        });

        cc.systemEvent.on("BuyItemFailed",function(event){
            self.showPop({
                title: "提示",
                content: event.detail.msg
            });
        });
    },

    onDisable: function(){
        cc.systemEvent.off("BuyItemSuccess");
        cc.systemEvent.off("BuyItemFailed");
    },

    updateGoldValue: function(gold){
        GameManager.DataManager.userInfo.gold     += parseInt(gold);
        this.goldLab.string     = "" + GameManager.DataManager.userInfo.gold;
    },
    
    updateDiamondValue: function(diamond){
        GameManager.DataManager.userInfo.diamond  += parseInt(diamond);
        this.diamondLab.string  = "" + GameManager.DataManager.userInfo.diamond;
    },

    onLoginIn: function(){
        var logindata = {
            userName: this.nameEdit.string,
            password: this.passwordEdit.string
        }

        if( logindata.userName == "" || logindata.password == "" ){
            var tip = {
                title: "提示",
                content: "请输入账号或密码！"
            }
            this.showPop(tip);
            return;
        }

        if( logindata.userName.length < 4 || logindata.password.length < 8){
            var tip = {
                title: "提示",
                content: "账号或密码错误！"
            }
            this.showPop(tip);
            return;
        }

        cc.log(logindata);
        var self = this;
        GameManager.HttpManager.login(logindata,(data)=>{

            GameManager.DataManager.userInfo.gold     = parseInt(data["gold"]);
            GameManager.DataManager.userInfo.diamond  = parseInt(data["diamond"]);
            GameManager.DataManager.userInfo.gunIndex = parseInt(data["gunIndex"]);
            GameManager.DataManager.userInfo.userName = data["userName"];
            GameManager.DataManager.userInfo.password = data["password"];
            GameManager.DataManager.saveUserInfo();

            self.loginNode.active = false;
            GameManager.DataManager.isLogin = true;
            GameManager.DataManager.setNotice(data["notice"]);

            if( data["notice"] != "" ){
                self.showNotice();
            }

            self.showInfo();
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

        if( name.length < 4 ){
            this.nameTip.node.active = true;
            this.nameTip.string = "至少是4个字符";
            this._nameIsValid = false;
            return;
        }

        this.nameTip.node.active = false;
    },

    onPasswordEditEnd: function(){
        var password = this.passwordEdit.string;
        var result = this.checkPasswordIsValid(password);
        this.passwordTip.string = result;
        cc.log("onPasswordEditEnd");
    },

    onPasswordEdit2End: function(){
        var password2 = this.passwordEdit2.string;
        var result = this.checkPasswordIsValid(password2);
        this.passwordTip2.string = result;
        cc.log("onPasswordEdit2End");
    },

    checkPasswordIsValid: function(password){
        if( password == "" ){
            return "请输入密码";
        }
        if( password == password.replace(/[^/d]/g,'') ){
            return "必须是数字";
        }
        if( password.length < 8 ){
            return "至少是8位数";
        }

        return "";
    },

    onNewGame: function(){
        if (GameManager.LoadingUI){
            GameManager.LoadingUI.destroy();
            GameManager.LoadingUI = null;
        }
        cc.director.loadScene("MainScene");
        GameManager.SoundManager.playEffect("click_01");
    },

    onOldGame: function(){
        if (GameManager.LoadingUI){
            GameManager.LoadingUI.destroy();
            GameManager.LoadingUI = null;
        }
        cc.director.loadScene("MainScene");
        GameManager.SoundManager.playEffect("click_01");
    },

    onDestroy: function(){
        GameManager.SoundManager.stopMusic();
    },

    onChooseLoginClicked: function(){
        this.loginNode.active = true;
        this.chooseNode.active = false;
        this.titleLab.string = "登 陆";
        this.passwordLay2.active = false;
        this.nameLay.position = cc.v2(0,48);
        this.passwordLay.position = cc.v2(0,-30);
        this.loginBtn.node.active = true;
        this.registerBtn.node.active = false;
    },

    onChooseRegisterClicked: function(){
        this.loginNode.active = true;
        this.chooseNode.active = false;
        this.titleLab.string = "注 册";
        this.passwordLay2.active = true;
        this.nameLay.position = cc.v2(0,69);
        this.passwordLay.position = cc.v2(0,4);
        this.loginBtn.node.active = false;
        this.registerBtn.node.active = true;
    },

    onLoginClicked: function(){
        GameManager.SoundManager.playEffect("click_01");
        this.onLoginIn();
    },

    onRegisterClicked: function(){
        GameManager.SoundManager.playEffect("click_01");

        var password1 = this.passwordEdit.string;
        var password2 = this.passwordEdit2.string;

        var registerData = {
            userName: this.nameEdit.string,
            password: password1
        }

        if( registerData.userName == "" || registerData.password == "" || password2 == "" ){
            var tip = {
                title: "提示",
                content: "请输入账号或密码！"
            }
            this.showPop(tip);
            return;
        }

        if( password1 != password2 ){
            var tip = {
                title: "提示",
                content: "两次密码不一致！"
            }
            this.showPop(tip);
            return;
        }

        if( registerData.userName.length < 4 || registerData.password.length < 8 ){
            var tip = {
                title: "提示",
                content: "账号或密码错误！"
            }
            this.showPop(tip);
            return;
        }

        var self = this;
        GameManager.HttpManager.register(registerData,function(data){
            GameManager.DataManager.userInfo.gold     = parseInt(data["gold"]);
            GameManager.DataManager.userInfo.diamond  = parseInt(data["diamond"]);
            GameManager.DataManager.userInfo.gunIndex = parseInt(data["gunIndex"]);
            GameManager.DataManager.userInfo.userName = data["userName"];
            GameManager.DataManager.userInfo.password = data["password"];
            GameManager.DataManager.saveUserInfo();

            self.onChooseLoginClicked();
            var info = {
                title: "提示",
                content: "注册成功",
            }
            self.showPop(info);
        },function(data){
            var info = {
                title: "提示",
                content: data,
            }
            self.showPop(info);
        });
        
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
    },

    showNotice: function(){
        var self = this;
        if( self._noticeUI ){
            self._noticeUI.getComponent("NoticeScene").show()
        }else{
            cc.loader.loadRes("Prefabs/Notice/NoticeUI",function(err,prefab){
                if( err ){
                    return;
                }
                self._noticeUI = cc.instantiate(prefab);
                self.node.addChild(self._noticeUI, 999)
                self._noticeUI.getComponent("NoticeScene").show();
            });
        }
    },

    showInfo: function(){
        var moveAct = cc.moveBy(0.4,0,-210);
        var moveAct2 = cc.moveBy(0.2,0,10);
        this.infoLay.runAction( cc.sequence(moveAct,moveAct2) );

        this.goldLab.string     = "" + GameManager.DataManager.userInfo.gold;
        this.diamondLab.string  = "" + GameManager.DataManager.userInfo.diamond;
        this.nickNameLab.string = "昵称: "+GameManager.DataManager.userInfo.userName;

        this.btnLay.runAction( cc.sequence(cc.moveBy(0.4,0,-135), cc.moveBy(0.2,0,5)) );
    },

    onCloseClicked: function(){
        this.loginNode.active     = false;
        this.chooseNode.active    = true;
        this.passwordEdit.string  = "";
        this.passwordEdit2.string = "";
        this.nameEdit.string      = "";
        this.passwordTip.string   = "";
        this.passwordTip2.string  = "";
        this.nameTip.string       = "";
    },

    onShopClicked: function(){
        GameManager.SoundManager.playEffect("click_01");

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
                self.node.addChild(self._shopUI,999);
                self._shopUI.getComponent("ShopScene").show();
            });
        }
    },

    onRankClicked: function(){
        GameManager.SoundManager.playEffect("click_01");

        var self = this;
        if( this._rankUI ){
            this._rankUI.getComponent("RankScene").show();
        }else{
            cc.loader.loadRes("Prefabs/Rank/RankUI",function(err,prefab){
                if( err ){
                    return;
                }

                self._rankUI = cc.instantiate(prefab);
                self.node.addChild(self._rankUI,999);

                self._rankUI.getComponent("RankScene").show();
            });
        }
    },

    onSetClicked: function(){
        GameManager.SoundManager.playEffect("click_01");

        var self = this;
        if( this._settingUI ){
            this._settingUI.getComponent("SettingScene").show();
        }else{
            cc.loader.loadRes("Prefabs/Setting/SettingUI",function(err,prefab){
                if( err ){
                    return;
                }

                self._settingUI = cc.instantiate(prefab);
                self.node.addChild(self._settingUI,999);

                self._settingUI.getComponent("SettingScene").show();
            });
        }
    },
});
