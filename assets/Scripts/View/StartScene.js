

cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {

    },

    onNewGame: function(){
        cc.director.loadScene("MainScene");
    },

    onOldGame: function(){
        cc.director.loadScene("MainScene");
    },
});
