

cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: cc.Prefab,
        GenPanel: cc.Node,
        GunList: [cc.Node],
        GunPanel: cc.Node,
        goldLabel: cc.Label,
        goldValue: 100000,

        _gunIndex: 0,
    },

    onLoad () {
        GameManager.GameControler = this;
        this.goldColor = this.goldLabel.node.color;
        this.goldLabel.string = "$"+this.goldValue;
        cc.director.getCollisionManager().enabled = true;
        this.GunList[this._gunIndex].active = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.enabledDrawBoundingBox = true;

        this.GenPanel.on(cc.Node.EventType.TOUCH_START,this.addBullet,this);
    },

    addBullet: function(event){
        var cost = this.bulletPrefab.data.getComponent("Bullet").damageValue;
        if( this.goldValue < cost ){
            var self = this;
            this.node.runAction( cc.repeat( cc.sequence(
                cc.callFunc(function(){
                    self.goldLabel.node.color = cc.color(255,0,0);
                }),
                cc.delayTime(0.5),
                cc.callFunc(function(){
                    self.goldLabel.node.color = cc.color(255,255,0);
                }))
            ,1));
            return;
        }

        this.updateGoldValue(-cost);

        var desPos = event.getLocation();
        desPos = cc.v2(desPos.x,desPos.y);
        desPos = this.GenPanel.convertToNodeSpaceAR(desPos);
        
        //求炮的旋转角度
        var gun = this.GunList[this._gunIndex];
        var gunPos = gun.position;
        gunPos = gun.convertToWorldSpaceAR(cc.v2(0,0));
        gunPos = this.GenPanel.convertToNodeSpaceAR(gunPos);
        var vec = desPos.sub(gunPos);
        vec = vec.normalize();

        //点击位置与炮位置的连线与y轴的夹角
        var angle = cc.radiansToDegrees(cc.pAngleSigned(vec,cc.p(0,1)));
        gun.rotation = angle;

        //放置子弹的位置
        var bulletPosNode = gun.getChildByName("bulletPos");
        var bulletPos = bulletPosNode.position;
        bulletPos = bulletPosNode.convertToWorldSpaceAR(cc.v2(0,0));
        bulletPos = this.GenPanel.convertToNodeSpaceAR(bulletPos);

        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.rotation = angle;
        bullet.position = bulletPos;
        this.GenPanel.addChild(bullet,10);
    },

    updateGoldValue: function(gold){
        this.goldValue += gold;
        this.goldLabel.string = "$"+this.goldValue; 
    },
});
