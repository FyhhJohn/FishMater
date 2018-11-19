
cc.Class({
    extends: cc.Component,

    properties: {
        userNameLab: cc.Label,
        rankLab:     cc.Label,
        scoreLab:    cc.Label,

        scrollView:  cc.ScrollView,
        rankItemPre: cc.Prefab,
        bg:          cc.Node,

        _rankData:   null,
        _isClose:    false,
    },


    onLoad: function() {
        var self = this;
        GameManager.HttpManager.rank({},function(data){
            self._rankData = data;
            self.initList();
        });
    },

    initList: function(){
        this.scrollView.content.removeAllChildren();

        for( var i=0; i<this._rankData.length; i++ ){
            var item = cc.instantiate(this.rankItemPre);
            item.getComponent("RankItem").init(this._rankData[i]);
            this.scrollView.content.addChild(item);
        }
    },

    show: function(){
        this._isClose = false;
        this.bg.stopAllActions();
        this.node.active = true;
        var desPos = cc.v2(0,-30);
        var desPos2 = cc.v2(0,0);
        var moveAct = cc.moveTo(0.2,desPos);
        var moveAct2 = cc.moveTo(0.1,desPos2);
        this.bg.runAction(cc.sequence(moveAct,moveAct2));
    },

    hide: function(){
        if( this._isClose ) return;
        this._isClose = true;
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
