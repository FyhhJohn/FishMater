

cc.Class({
    extends: cc.Component,

    properties: {
        bg:        cc.Node,
        noticeLab: cc.Label,
    },

    onLoad: function(){
        var notice = GameManager.DataManager.getNotice();
        this.noticeLab.string = "" + notice;
    },

    onCloseClicked: function() {
        GameManager.SoundManager.playEffect("click_01");

        this.hide();
    },

    show: function(){
        this.bg.stopAllActions();
        this.node.active = true;
        this.bg.scale = 0.2;
        var scaleAct  = cc.scaleTo(0.4,1.1,1.1);
        var scaleAct2 = cc.scaleTo(0.2,1.0,1.0);
        this.bg.runAction(cc.sequence(scaleAct,scaleAct2));
    },

    hide: function(){
        this.bg.stopAllActions();
        var scaleAct  = cc.scaleTo(0.1,1.1,1.1);
        var scaleAct2 = cc.scaleTo(0.2,0.2,0.2);
        var self = this;
        this.bg.runAction(cc.sequence(scaleAct,scaleAct2,cc.callFunc(function(){
            self.node.active = false;
        })));
    },
});
