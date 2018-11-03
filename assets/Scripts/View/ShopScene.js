

cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,

        btn1: cc.Button,
        btn2: cc.Button,

        lay1: cc.Node,
        lay2: cc.Node,
    },

    onLoad: function(){
        this.changeLay(1);
    },

    show: function(){
        this.bg.stopAllActions();
        this.node.active = true;
        var desPos = cc.v2(0,-30);
        var desPos2 = cc.v2(0,0);
        var moveAct = cc.moveTo(0.2,desPos);
        var moveAct2 = cc.moveTo(0.1,desPos2);
        this.bg.runAction(cc.sequence(moveAct,moveAct2));
    },

    hide: function(){
        this.bg.stopAllActions();
        var desPos = cc.v2(0,-30);
        var desPos2 = cc.v2(0,360+this.bg.height/2);
        var moveAct = cc.moveTo(0.1,desPos);
        var moveAct2 = cc.moveTo(0.2,desPos2);
        var self = this;
        this.bg.runAction(cc.sequence(moveAct,moveAct2,cc.callFunc(function(){
            self.node.active = false;
        })));
    },

    onTypeClicked: function(event,customData){
        cc.log(customData);
        this.changeLay(customData);
    },

    changeLay: function(type){
        if( customData == 1 ){
            this.lay1.active = true;
            this.lay2.active = false;
            this.btn1.interactable = false;
            this.btn2.interactable = true;
        }else{
            this.lay1.active = false;
            this.lay2.active = true;
            this.btn1.interactable = true;
            this.btn2.interactable = false;
        }
    },
});
