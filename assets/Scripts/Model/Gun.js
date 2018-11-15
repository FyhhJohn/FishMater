

cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: [cc.Prefab],
        gunIndex: 0,
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
        GameManager.SoundManager.playEffect("click_01");

        var userInfo = GameManager.DataManager.getUserInfo();
        var self = this;
        
        if( !self._GunInfo.isUpGrade ){
            GameManager.MainScene.showPop({
                title: "提示",
                content: `您的炮台已经是满级,无法升级了！`
            });
            return;
        }

        GameManager.MainScene.showPop({
            title: "升级",
            content: `是否消耗${self._GunInfo.upGrageCost}钻石升级炮台威力?`
        },function(){
            if( userInfo.diamond >= self._GunInfo.upGrageCost ){
                
                var data = {
                    gunName: self.node.name,
                    userName: GameManager.DataManager.userInfo.userName,
                    gunIndex: self.gunIndex,
                }

                GameManager.HttpManager.upGradeGun(data,function(data){

                    GameManager.GameControler.upgradeGun();
                    GameManager.GameControler.updateDiamondValue(-1*self._GunInfo.upGrageCost);
                    GameManager.MainScene.showPop({
                        title: "提示",
                        content: `您的炮台升级成功`
                    });

                },function(data){
                    GameManager.MainScene.showPop({
                        title: "提示",
                        content: data
                    });
                });
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
