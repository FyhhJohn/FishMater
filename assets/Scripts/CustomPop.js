

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        content: cc.Label,
        lay: cc.Node,

        _isClose: false,
        _callBack: null,
    },

    show: function( data, func ){
        this.node.stopAllActions();
        this.lay.stopAllActions();
        this._isClose = false;
        this.title.string = data.title;
        this.content.string = data.content;

        this.node.active = true;
        this.lay.active = true;

        cc.log(data);

        this.lay.scale = 0.2;

        var scaleAct1 = cc.scaleTo(0.3, 1.1, 1.1);
        var scaleAct2 = cc.scaleTo(0.1, 1.0, 1.0);
        this.lay.runAction( cc.sequence( scaleAct1, scaleAct2) );

        this._callBack = func;
    },

    hide: function(){
        if( this._isClose ){
            return;
        }
        this._isClose = true;

        var scaleAct1 = cc.scaleTo(0.1,1.3,1.3);
        var scaleAct2 = cc.scaleTo(0.1,0.2,0.2);
        var self = this;
        this.lay.runAction( cc.sequence( scaleAct1, scaleAct2, cc.callFunc(function(){
            self.node.active = false;
            self.lay.active = false;
        })  ) );
    },

    onOkClickCallback: function(){
        if( this._callBack ){
            cc.log("確定");
            this.hide();
            this._callBack();
        }
    },
});
