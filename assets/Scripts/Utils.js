
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
    },

    //生成随机用户名，数字和字母组成,  
    randomUserName: function(length) {  
        var val = "";  
        
        //参数length，表示生成几位随机数  
        for(var i = 0; i < length; i++) {  
            
            var charOrNum = Utils.random(1,2) % 2 == 0 ? "char" : "num";  
            //输出字母还是数字  
            if( "char" == charOrNum ) {  
                //输出是大写字母还是小写字母  
                var temp = Utils.random(1,2) % 2 == 0 ? 64 : 96;  
                val += String.fromCharCode( Utils.random(1,26) + temp );  
            } else if( "num" == charOrNum ) {  
                val += Utils.random(0,9) ;  
            }  
        }  

        return val;  
    }  
};
