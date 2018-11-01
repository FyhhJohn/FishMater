

cc.Class({
    extends: cc.Component,

    properties: {
        gold: 0,
        maxbloodValue: 0,
        bloodValue: 0,
        speed: 0,
        num: 0,
        angSpeed: 0,
        moveType: 0,
        delayTime: 0,
        diePrefab: cc.Prefab,
        fishIndex: 0,

        _bloodProgressBar: null,
    },
    
    onLoad: function(){
        this.maxbloodValue = this.bloodValue;
        this.gold = this.bloodValue * 0.8;
        cc.log("鱼名："+ this.node.name + "血量："+this.maxbloodValue);
    },

    update: function(dt){
        var rotation = 90 + this.node.rotation + this.angSpeed * dt;
        var vec = Utils.getVectorByAngle(rotation);
        var deltaPos = vec.mul(this.speed * dt);
        
        this.node.rotation = this.node.rotation + this.angSpeed * dt;
        this.node.position = this.node.position.add(deltaPos);
    },

    onCollisionEnter: function (other, self) {
        if( other.node.group == "border" ){
            // self.node.destroy();
            GameManager.FishFactory.node.getComponent("FishFactory").putFish(self.node,self.node.getComponent("Fish").fishIndex);
        }
    },

    //受到攻击
    attacked: function(damage){
        this.bloodValue -= damage;
        cc.log("攻击 鱼("+this.node.name+") 血量："+this.bloodValue);
        if( this.bloodValue <= 0 ){
            var die = cc.instantiate(this.diePrefab);
            die.addComponent("ef_AutoClear");
            die.parent = this.node.parent;
            die.position = this.node.position;
            die.rotation = this.node.rotation;
            die.scaleX = this.node.scaleX;
            die.scaleY = this.node.scaleY;

            GameManager.FishFactory.node.getComponent("FishFactory").putFish(this.node,this.fishIndex);

            GameManager.GameControler.updateGoldValue(this.gold,this.node.position);
        // }else{
        //     if( !this._bloodProgressBar ){
        //         this.addBlood();
        //     }else{
        //         this.updateBlood();   
        //     }
        }
    },

    addBlood: function(){
        var self = this;
        cc.loader.loadRes("Prefabs/ProgressBar",function(err,prefab){
            if( err ){
                cc.error(err.message || err );
                return;
            }

            self._bloodProgressBar = cc.instantiate( prefab );
            self.node.addChild( self._bloodProgressBar );
            self._bloodProgressBar.position = cc.v2(0, self.node.height);

            self.updateBlood();
        });
    },

    updateBlood: function(){

        this._bloodProgressBar.stopAllActions();
        var progressBar = this._bloodProgressBar.getComponent(cc.ProgressBar);
        progressBar.progress = this.bloodValue / this.maxbloodValue;
        this._bloodProgressBar.active = true;
        var self = this;
        this._bloodProgressBar.runAction(cc.sequence(cc.delayTime(1),cc.fadeOut(0.5),cc.callFunc(function(){
            self._bloodProgressBar.active = false;
        })));
    },
});
