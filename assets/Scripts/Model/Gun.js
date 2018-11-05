

cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: [cc.Prefab],
        _GunInfo: null,
    },

    onLoad: function(){
        cc.log(this.node.name);
        this._GunInfo = GameManager.DataManager.getGunConfig(this.node.name);
        cc.log(this._GunInfo);

        var btn = this.node.addComponent(cc.Button);
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "Gun";
        clickEventHandler.handler = "onClickCallback";

        btn.clickEvents.push(clickEventHandler);
    },

    onClickCallback: function(target,customEventData){
        var self = this;
        GameManager.MainScene.showPop({
            title: "升级",
            content: `是否消耗${self._GunInfo.upGrageCost}钻石升级炮台威力?`
        },function(){
            var userInfo = GameManager.DataManager.getUserInfo();
            if( userInfo.diamond >= self._GunInfo.upGrageCost ){
                GameManager.GameControler.upgradeGun();
                GameManager.GameControler.updateDiamondValue(-1*self._GunInfo.upGrageCost);
            }else{
                GameManager.MainScene.showPop({
                    title: "提示",
                    content: `您的钻石不足，是否前往商城购买钻石?`
                },function(){
                    GameManager.MainScene.onShopClicked();
                })
            }
        });
    },
});
