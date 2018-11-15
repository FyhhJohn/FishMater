
cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        effectToggle: cc.Toggle,
        musicToggle: cc.Toggle,

        _isClose: false,
    },

    onLoad: function(){
        this._isClose = false;
        this.effectToggle.isChecked = GameManager.SoundManager.isEffectOn();
        this.musicToggle.isChecked = GameManager.SoundManager.isMusicOn();
    },

    onEffectBtnClicked: function(toggle, customEventData){
        var _toggle = toggle.node.getComponent(cc.Toggle);
        GameManager.SoundManager.setEffectOn(_toggle.isChecked);

        GameManager.SoundManager.playEffect("click_01");

    },

    onMusicBtnClicked: function(toggle, customEventData){
        var _toggle = toggle.node.getComponent(cc.Toggle);
        GameManager.SoundManager.setMusicOn(_toggle.isChecked);
        
        GameManager.SoundManager.playEffect("click_01");

    },

    show: function(){
        this._isClose = false;
        this.bg.stopAllActions();
        this.node.active = true;
        var desPos = cc.v2(0,360-this.bg.height/2-30);
        var desPos2 = cc.v2(0,360-this.bg.height/2);
        var moveAct = cc.moveTo(0.2,desPos);
        var moveAct2 = cc.moveTo(0.1,desPos2);
        this.bg.runAction(cc.sequence(moveAct,moveAct2));
    },

    hide: function(){
        if( this._isClose ){
            return;
        }
        this._isClose = true;
        this.bg.stopAllActions();
        var desPos = cc.v2(0,360-this.bg.height/2-30);
        var desPos2 = cc.v2(0,360+this.bg.height/2);
        var moveAct = cc.moveTo(0.1,desPos);
        var moveAct2 = cc.moveTo(0.2,desPos2);
        var self = this;
        this.bg.runAction(cc.sequence(moveAct,moveAct2,cc.callFunc(function(){
            self.node.active = false;
        })));
    },

    backClicked: function(){
        if (GameManager.LoadingUI){
            GameManager.LoadingUI.destroy();
            GameManager.LoadingUI = null;
        }
        GameManager.SoundManager.playEffect("click_01");

        GameManager.FishFactory.node.getComponent("FishFactory").clearFishPool();
        GameManager.GameControler.saveInfo();
        cc.director.loadScene("StartScene");
    },
});
