
cc.Class({
    extends: cc.Component,

    properties: {
        GenPanel: cc.Node,
        GunList: [cc.Node],
        GunPanel: cc.Node,

        goldPanel: cc.Node,
        goldLabel: cc.Label,
        diamondLabel: cc.Label,

        goldValue: 100000,
        diamondValue: 0,
        
        costLabel: cc.Label,
        goldPrefabs: [cc.Prefab],

        time1Label: cc.Label,
        time2Label: cc.Label,

        buttonP: cc.Button,
        buttonM: cc.Button,

        _goldTime1: 60,
        _goldTime2: 240,

        _gunIndex: 0,
        _bulletIndex: 0,
        _shoot: false,
        _shootTime: 0,
        _touchEvent: null,
        _saveTime: 0,
    },

    ctor: function(){
        this._goldTime1 = 60;
        this._goldTime2 = 20;
        this._gunIndex = 0;
        this._bulletIndex = 0;
        this._shopUI = null;
    },

    onLoad () {
        GameManager.GameControler = this;
        
        var userInfo = GameManager.DataManager.getUserInfo();
        this.goldValue = userInfo.gold;
        this.diamondValue = userInfo.diamond;
        this._gunIndex = userInfo.gunIndex;

        this.goldColor = this.goldLabel.node.color;
        this.goldLabel.string = "$"+this.goldValue;
        this.diamondLabel.string = ""+this.diamondValue;

        cc.director.getCollisionManager().enabled = true;
        this.GunList[this._gunIndex].active = true;

        this.updateButton();
        this.updateCost();

        this.GenPanel.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.GenPanel.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        this.GenPanel.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.GenPanel.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);

        this.schedule(function(){
            this.updateTime();
        },1);

    },

    onTouchStart: function(event){
        this._shoot = true;
        this._touchEvent = event;
    },

    onTouchMove: function(event){
        this._touchEvent = event;
    },

    onTouchEnd: function(event){
        this._shoot = false;
    },

    update: function(dt){
        this._shootTime += dt;
        if( this._shoot && this._shootTime > 0.2){
            this.addBullet(this._touchEvent);
            this._shootTime = 0;
        }

        this._saveTime += dt;
        if( this._saveTime >= 10 ){
            this.saveInfo();
            this._saveTime = 0;
        }
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

        GameManager.SoundManager.playEffect("FX_发炮_01");

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
        var self = this;
        GameManager.DataManager.userInfo.gold = self.goldValue + goldValue;

        var count = this.getGoldCount(goldValue);
        var goldIndex = 0;
        var effectName = "";
        if( goldValue < 1000 ){
            goldIndex = 0;
            effectName = "FX_银币_01";
        }else{
            goldIndex = 2;
            effectName = "FX_金币";
        }

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
                        GameManager.SoundManager.playEffect(effectName);
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

    updateDiamondValue: function(diamondValue){
        this.diamondValue += diamondValue;
        this.diamondLabel.string = "" + this.diamondValue;
        GameManager.DataManager.userInfo.diamond = this.diamondValue;
    },

    getGoldCount: function(gold){
        var count = 0;
        if( gold >= 1000 ){
            count = Math.ceil( gold / 500 );
        }else{
            count = Math.ceil( gold / 100 );
        }
        return count;
    },

    updateTime: function(){
        if( this._goldTime1 < 0 ){
            this._goldTime1 = 60;
            this.updateGoldValue(100);
        }
        
        var str = this._goldTime1.toString();
        if( str.length > 1 ){
            this.time1Label.string = str[0]+" "+str[1];
        }else{
            this.time1Label.string = 0+" "+str[0];
        }
        this._goldTime1--;
        
        // if( this._goldTime2 < 0 ){
        //     this._goldTime2 = 240;
        //     this.updateGoldValue(1000);
        // }
        // this.time2Label.string = this._goldTime2+"s";
        this._goldTime2--;
    },

    saveInfo: function(){
        UserDefault.setInt("gold",GameManager.DataManager.userInfo.gold);
        UserDefault.setInt("diamond",GameManager.DataManager.userInfo.diamond);
        UserDefault.setInt("gunIndex",GameManager.DataManager.userInfo.gunIndex);
        var data = {
            userName: GameManager.DataManager.userInfo.userName,
            gold:     GameManager.DataManager.userInfo.gold,
            diamond:  GameManager.DataManager.userInfo.diamond,
            gunIndex: GameManager.DataManager.userInfo.gunIndex
        }
        GameManager.HttpManager.updateInfo(data);
    },

    //升级炮威力
    onButtonP: function(){
        var Gun = this.GunList[this._gunIndex].getComponent("Gun");
        var bulletList = Gun.bulletPrefab;
        if( this._bulletIndex <= bulletList.length-2 ){
            this._bulletIndex++;
        }

        this.updateButton();
        this.updateCost();

        GameManager.SoundManager.playEffect("后台按键音_01");
    },

    //降低炮威力
    onButtonM: function(){
        var Gun = this.GunList[this._gunIndex].getComponent("Gun");
        var bulletList = Gun.bulletPrefab;
        if( this._bulletIndex >= 1 ){
            this._bulletIndex--;
        }

        this.updateButton();
        this.updateCost();

        GameManager.SoundManager.playEffect("后台按键音_01");

    },

    updateButton: function(){
        var Gun = this.GunList[this._gunIndex].getComponent("Gun");
        var bulletList = Gun.bulletPrefab;
        this.buttonP.interactable = ((this._bulletIndex >= bulletList.length-1) ? false:true); 
        this.buttonM.interactable = ((this._bulletIndex <= 0) ? false:true); 
    },

    upgradeGun: function(){
        this.GunList[this._gunIndex].active = false;
        var rotation = this.GunList[this._gunIndex].rotation;
        this._gunIndex++;
        this._gunIndex = (this._gunIndex % this.GunList.length);
        this.GunList[this._gunIndex].active = true;
        this.GunList[this._gunIndex].rotation = rotation;
        cc.log("GunIndex = "+this._gunIndex);
        this._bulletIndex = 0;
        GameManager.DataManager.userInfo.gunIndex = this._gunIndex;

        this.updateButton();
        this.updateCost();

        GameManager.SoundManager.playEffect("FX_换炮_01");
    },
});
