

cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: [cc.Prefab],
    },

    onLoad: function(){
        var btn = this.node.addComponent(cc.Button);
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "Gun";
        clickEventHandler.handler = "onClickCallback";

        btn.clickEvents.push(clickEventHandler);
    },

    onClickCallback: function(target,customEventData){
        GameManager.MainScene.showPop({
            title: "升级",
            content: "是否升级炮台威力?"
        });
    },
});
