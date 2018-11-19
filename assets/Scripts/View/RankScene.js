
cc.Class({
    extends: cc.Component,

    properties: {
        userNameLab: cc.Label,
        rankLab:     cc.Label,
        scoreLab:    cc.Label,

        scrollView:  cc.ScrollView,
        rankItemPre: cc.Prefab,
        bg:          cc.Node,
    },


    onLoad: function() {
        this.initList();
    },

    initList: function(){
        this.scrollView.content.removeAllChildren();

        var data = [
            {name: "玩家1", rank: 1, score: 100},
            {name: "玩家2", rank: 2, score: 99 },
            {name: "玩家3", rank: 3, score: 98 },
            {name: "玩家4", rank: 4, score: 97 },
            {name: "玩家5", rank: 5, score: 96 },
            {name: "玩家6", rank: 6, score: 95 },
            {name: "玩家7", rank: 7, score: 94 },
            {name: "玩家8", rank: 8, score: 93 }
        ]
        for( var i=0; i<data.length; i++ ){
            var item = cc.instantiate(this.rankItemPre);
            item.getComponent("RankItem").init(data[i]);
            this.scrollView.content.addChild(item);
        }
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

    onCloseClicked: function(){
        GameManager.SoundManager.playEffect("click_01");
        this.hide();
    },
});
