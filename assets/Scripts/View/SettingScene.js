
cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        effectToggle: cc.Toggle,
        musicToggle: cc.Toggle,
    },

    onLoad: function(){
        this.effectToggle.isChecked = SoundManager.isEffectOn();
        this.musicToggle.isChecked = SoundManager.isMusicOn();
    },

    onEffectBtnClicked: function(toggle, customEventData){
        var _toggle = toggle.node.getComponent(cc.Toggle);
        SoundManager.setEffectOn(_toggle.isChecked);
    },

    onMusicBtnClicked: function(toggle, customEventData){
        var _toggle = toggle.node.getComponent(cc.Toggle);
        SoundManager.setMusicOn(_toggle.isChecked);
    },

    show: function(){
        this.bg.stopAllActions();
        this.node.active = true;
        var desPos = cc.v2(0,360-this.bg.height/2-30);
        var desPos2 = cc.v2(0,360-this.bg.height/2);
        var moveAct = cc.moveTo(0.2,desPos);
        var moveAct2 = cc.moveTo(0.1,desPos2);
        this.bg.runAction(cc.sequence(moveAct,moveAct2));
    },

    hide: function(){
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
        GameManager.FishFactory.node.getComponent("FishFactory").clearFishPool();
        UserDefault.setInt("gold",GameManager.GameControler.goldValue);
        cc.director.loadScene("StartScene");
    },
});
