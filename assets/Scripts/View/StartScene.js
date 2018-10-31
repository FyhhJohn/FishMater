

cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {
    },

    onNewGame: function(){
        UserDefault.setInt("gold",100000);
        cc.director.loadScene("MainScene");
    },

    onOldGame: function(){
        cc.director.loadScene("MainScene");
    },
});
