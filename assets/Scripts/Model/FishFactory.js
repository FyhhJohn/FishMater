

cc.Class({
    extends: cc.Component,

    properties: {
        genPos: [cc.Node],
        fishPrefabs: [cc.Prefab],
        fishPanel: cc.Node,
    },

    onLoad: function(){
        this.schedule( function(){
            this.addFish();
        },0.5);
    },

    addFish: function(){
        var max = this.fishPrefabs.length;
        var fishIndex = Math.floor(Math.random()*max);

        var data = this.fishPrefabs[fishIndex].data.getComponent("Fish");
        var num = Utils.random(data.num/2, data.num) ;

        var self = this;
        this.node.runAction( cc.repeat( 
            cc.sequence( cc.callFunc( function(){
                var posmax = self.genPos.length;
                var genIndex = Math.floor(Math.random()*posmax);

                var moveType = Utils.random(0,1) ;   //0:直线  1:曲线
                var moveAngle = Utils.random(4,8);   //旋转的角度

                var fish = cc.instantiate(self.fishPrefabs[fishIndex]);
                fish.parent = self.fishPanel;
                fish.position = self.genPos[genIndex].position;
                fish.rotation = self.genPos[genIndex].rotation;
                fish.scaleX = self.genPos[genIndex].scaleX;
                fish.scaleY = self.genPos[genIndex].scaleY;
        
                if( moveType == 0 ) {
                    fish.getComponent("Fish").moveType = moveType;
                }else{
                    fish.getComponent("Fish").angSpeed = moveAngle;
                }
        }), 
        cc.delayTime(data.delayTime)), num));

    },
});
