

cc.Class({
    extends: cc.Component,

    properties: {
        bloodValue: 0,
        speed: 0,
        num: 0,
        angSpeed: 0,
        moveType: 0,
        delayTime: 0,
        diePrefab: cc.Prefab,
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
        cc.log("bloodValue = "+this.bloodValue);
        if( this.bloodValue <= 0 ){
            cc.log("bloodValue2 = "+this.bloodValue);

            var die = cc.instantiate(this.diePrefab);
            die.addComponent("ef_AutoClear");
            die.parent = this.node.parent;
            die.position = this.node.position;
            die.rotation = this.node.rotation;

            this.node.destroy();

            GameControler
        }
    },
});
