

cc.Class({
    extends: cc.Component,

    properties: {
        genPos: [cc.Node],
        fishPrefabs: [cc.Prefab],
        fishPanel: cc.Node,

        _fishPool: null,
    },

    onLoad: function(){
        GameManager.FishFactory = this;
        this.createFishPool();
        this.schedule( function(){
            this.addFish();
        },0.5);
    },

    createFishPool: function(){
        this._fishPool = [];
        for( var i=0; i<this.fishPrefabs.length; i++ ){
            this._fishPool[i] = new cc.NodePool();
            for( var j=0; j<20; j++ ){
                let fish = cc.instantiate(this.fishPrefabs[i]);
                this._fishPool[i].put(fish);
            }
        }
    },

    clearFishPool: function(){
        for( var i=0; i<this._fishPool.length; i++ ){
            this._fishPool[i].clear();
        }
    },

    getFish: function( index ){
        let fish = null;
        if( this._fishPool[index].size() > 0 ){
            fish = this._fishPool[index].get();
        }else{
            fish = cc.instantiate(this.fishPrefabs[index]);
        }
        return fish;
    },

    putFish: function(fish,fishIndex){
        this._fishPool[fishIndex].put(fish);
    },

    addFish: function(){
        var max = this.fishPrefabs.length;
        var fishIndex = Math.floor(Math.random()*max);
        var data = this.fishPrefabs[fishIndex].data.getComponent("Fish");
        var num = Utils.random(data.num/2, data.num) ;

        var self = this;
        this.node.runAction( cc.repeat( 
            cc.sequence( cc.callFunc( function(){
                let posmax = self.genPos.length;
                let genIndex = Math.floor(Math.random()*posmax);

                let moveType = Utils.random(0,1) ;   //0:直线  1:曲线
                let moveAngle = Utils.random(4,8);   //旋转的角度

                let fish = self.getFish(fishIndex);
                fish.getComponent("Fish").initData();
                fish.parent = self.fishPanel;
                fish.position = self.genPos[genIndex].position;
                fish.rotation = self.genPos[genIndex].rotation;
                fish.scaleX = self.genPos[genIndex].scaleX;
                fish.scaleY = self.genPos[genIndex].scaleY;
                fish.getComponent("Fish").fishIndex = fishIndex;

                if( moveType == 0 ) {
                    fish.getComponent("Fish").moveType = moveType;
                }else{
                    fish.getComponent("Fish").angSpeed = moveAngle;
                }
        }), 
        cc.delayTime(data.delayTime)), num));

    },
});
