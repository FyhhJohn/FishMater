
var SoundManager = cc.Class({

    properties: {
        _musicId: null,
        _effectId: null,
    },

    playMusic: function(music){
        this.stopMusic();
        this._musicId = cc.audioEngine.playMusic(music, true);
    },

    stopMusic: function(){
        cc.audioEngine.stopMusic();
        this._musicId = null;
    },

    pauseMusic: function(){
        cc.audioEngine.pauseMusic();
    },

    resumeMusic: function(){
        cc.audioEngine.resumeMusic();
    },

    playEffect: function(effect){
        this._effectId = cc.audioEngine.playEffect(effect, false);
    },

    stopEffect: function(){
        if(this._effectId){
            cc.audioEngine.stopEffect(this._effectId);
            this._effectId = null;
        }
    },

    pauseEffect: function(){
        if( this._effectId ){
            cc.audioEngine.pauseEffect(this._effectId);
        }
    },

    resumeEffect: function(){
        if(this._effectId){
            cc.audioEngine.resumeEffect(this._effectId);
        }
    },
});

window.SoundManager = new SoundManager; 