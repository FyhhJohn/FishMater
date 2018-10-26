
window.Utils = {

    getSinValue: function(angle){
        return Math.sin(angle * Math.PI/180);
    },

    getCosValue: function(angle){
        return Math.cos(angle * Math.PI/180);
    },

    getSpeedY: function(speedOrigin,moveAngle){
        speedOrigin = Math.abs(speedOrigin);
        if( moveAngle == 0 ){
            return speedOrigin;
        } 

        if( moveAngle == 90 ){
            return 0;
        }

        if( moveAngle == 180 ){
            return -speedOrigin;
        }

        if( moveAngle == -90 ){
            return 0;
        }

        return this.getCosValue(moveAngle)*speedOrigin;
    },

    getSpeedX: function(speedOrigin,moveAngle){
        speedOrigin = Math.abs(speedOrigin);
        if( moveAngle == 0 ){
            return 0;
        }

        if( moveAngle == 90 ){
            return speedOrigin;
        }

        if( moveAngle == 180 ){
            return 0;
        }

        if( moveAngle == -90 ){
            return -speedOrigin;
        }

        return this.getSinValue(moveAngle)*speedOrigin;
    },

    getVectorByAngle: function(angle){
        if( angle == 0 ){
            return cc.p(0,1);
        }

        if( angle == 90 ){
            return cc.p(1,0);
        }

        if( angle == 180 ){
            return cc.p(0,-1);
        }

        if( angle == -90 ){
            return cc.p(-1,0);
        }

        let x = this.getSpeedX(1,angle);
        let y = this.getSpeedY(1,angle);

        return cc.p(x,y);
    },

    random: function(n,m){
        var num = Math.floor( Math.random()*(m-n+1)+n );
        return num;
    }
};
