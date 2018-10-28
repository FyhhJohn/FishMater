

cc.Class({
    extends: cc.Component,

    properties: {
        gold: 0,
        bloodValue: 0,
        speed: 0,
        num: 0,
        angSpeed: 0,
        moveType: 0,
        delayTime: 0,
        diePrefab: cc.Prefab,
    },

    onLoad: function(){
        this.gold = this.bloodValue;
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
            self.node.destroy();
        }
    },

    //受到攻击
    attacked: function(damage){
        this.bloodValue -= damage;
        if( this.bloodValue <= 0 ){

            var die = cc.instantiate(this.diePrefab);
            die.addComponent("ef_AutoClear");
            die.parent = this.node.parent;
            die.position = this.node.position;
            die.rotation = this.node.rotation;
            die.scaleX = this.node.scaleX;
            die.scaleY = this.node.scaleY;

            this.node.destroy();

            GameManager.GameControler.updateGoldValue(this.gold);
        }
    },
});
