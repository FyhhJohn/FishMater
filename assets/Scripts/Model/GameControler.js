

cc.Class({
    extends: cc.Component,

    properties: {
        GenPanel: cc.Node,
        GunList: [cc.Node],
        GunPanel: cc.Node,

        goldPanel: cc.Node,
        goldLabel: cc.Label,
        goldValue: 100000,
        
        costLabel: cc.Label,
        goldPrefabs: [cc.Prefab],

        time1Label: cc.Label,
        time2Label: cc.Label,

        _goldTime1: 99,
        _goldTime2: 240,

        _gunIndex: 0,
        _bulletIndex: 0,
    },

    ctor: function(){
        this._goldTime1 = 10;
        this._goldTime2 = 20;
        this._gunIndex = 0;
        this._bulletIndex = 0;
    },

    onLoad () {
        GameManager.GameControler = this;
        this.goldColor = this.goldLabel.node.color;
        this.goldLabel.string = "$"+this.goldValue;
        cc.director.getCollisionManager().enabled = true;
        this.GunList[this._gunIndex].active = true;
        this.time1Label.string = this._goldTime1;
        this.time2Label.string = this._goldTime2+"s";


        this.updateCost();
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.enabledDrawBoundingBox = true;

        this.GenPanel.on(cc.Node.EventType.TOUCH_START,this.addBullet,this);

        this.schedule(function(){
            this.updateTime();
        },1);

        SoundManager.playMusic("背景乐_01");
    },

    updateCost: function(){
        var Gun = this.GunList[this._gunIndex].getComponent("Gun");
        var bulletList = Gun.bulletPrefab;
        var bullet = bulletList[this._bulletIndex].data.getComponent("Bullet");
        var cost = bullet.damageValue;
        this.costLabel.string = "$"+cost;
    },

    addBullet: function(event){
        var Gun = this.GunList[this._gunIndex].getComponent("Gun");
        var bulletList = Gun.bulletPrefab;
        var bullet = bulletList[this._bulletIndex].data.getComponent("Bullet");
        var cost = bullet.damageValue;
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

        SoundManager.playEffect("FX_发炮_01");

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

        var bullet = cc.instantiate(bulletList[this._bulletIndex]);
        bullet.rotation = angle;
        bullet.position = bulletPos;
        this.GenPanel.addChild(bullet,10);
    },

    updateGoldValue: function(goldValue,pos){
        var count = this.getGoldCount(goldValue);
        var goldIndex = 0;
        var effectName = "";
        if( goldValue <= 300 ){
            goldIndex = 0;
            effectName = "FX_银币_01";
        // }else if( goldValue <= 600 ){
        //     goldIndex = 1;
        }else{
            goldIndex = 2;
            effectName = "FX_金币";
        }

        var self = this;

        if( pos ){
            var delayTime = 0;
            var index = 0;
            for( var i=0; i<count; i++ ){
                let gold = cc.instantiate(this.goldPrefabs[goldIndex]);
                gold.position = pos;
                gold.parent = this.goldPanel;
                let desPos = this.goldLabel.node.position;
                gold.runAction( cc.sequence( 
                    cc.delayTime(delayTime),
                    cc.jumpBy(1.0, cc.v2(0,-40),30,1), 
                    cc.moveTo(0.8,desPos), 
                    cc.callFunc(function(){

                        if( index == count-1 ){
                            self.goldValue += goldValue;
                            self.goldLabel.string = "$"+self.goldValue; 
                        }
                        index++;
                        gold.destroy();
                        SoundManager.playEffect(effectName);
                    }) 
                ) );
                delayTime += 0.35;
            }

            let goldNode = new cc.Node();
            let goldLabel = goldNode.addComponent(cc.Label);
            goldLabel.string = "+" + goldValue;
            goldLabel.fontSize = 40;
            goldNode.color = cc.color(255,255,0);
            goldNode.parent = self.goldPanel;
            goldNode.position = cc.v2(pos.x,pos.y+100);
            goldNode.runAction( cc.sequence( cc.delayTime(0.8),cc.fadeOut(0.2),cc.removeSelf() ) );
        }else{
            self.goldValue += goldValue;
            self.goldLabel.string = "$"+this.goldValue; 
        }
    },

    getGoldCount: function(gold){
        var count = 0;
        if( gold > 300 ){
            count = Math.round( gold / 40 );
        }else{
            count = Math.round( gold / 60 );
        }
        return count;
    },

    updateTime: function(){
        this._goldTime1--;
        this._goldTime2--;
        if( this._goldTime1 < 0 ){
            this._goldTime1 = 99;
            this.updateGoldValue(100);
        }
        this.time1Label.string = this._goldTime1;

        if( this._goldTime2 < 0 ){
            this._goldTime2 = 240;
            this.updateGoldValue(1000);
        }
        this.time2Label.string = this._goldTime2+"s";
    },

    onButtonP: function(){
        var Gun = this.GunList[this._gunIndex].getComponent("Gun");
        var bulletList = Gun.bulletPrefab;
        if( this._bulletIndex < bulletList.length-1 ){
            this._bulletIndex++;
        }else{
            this.GunList[this._gunIndex].active = false;
            var rotation = this.GunList[this._gunIndex].rotation;
            this._gunIndex++;
            this._gunIndex = (this._gunIndex % this.GunList.length);
            this.GunList[this._gunIndex].active = true;
            this.GunList[this._gunIndex].rotation = rotation;
            cc.log("GunIndex = "+this._gunIndex);
            this._bulletIndex = 0;
        }

        this.updateCost();
        SoundManager.playEffect("FX_换炮_01");
    },

    onButtonM: function(){
        var Gun = this.GunList[this._gunIndex].getComponent("Gun");
        var bulletList = Gun.bulletPrefab;
        if( this._bulletIndex > 1 ){
            this._bulletIndex--;
        }else{
            this.GunList[this._gunIndex].active = false;
            var rotation = this.GunList[this._gunIndex].rotation;
            this._gunIndex--;
            this._gunIndex = (this._gunIndex < 0) ? this.GunList.length-1:this._gunIndex;
            this.GunList[this._gunIndex].active = true;
            this.GunList[this._gunIndex].rotation = rotation;
            cc.log("GunIndex = "+this._gunIndex);
            this._bulletIndex = 0;
        }
        this.updateCost();

        SoundManager.playEffect("FX_换炮_01");
    },
});
