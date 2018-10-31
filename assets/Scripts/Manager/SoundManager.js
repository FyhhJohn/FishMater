
var SoundManager = cc.Class({

    properties: {
        _musicId: null,
        _effectId: null,

        _isEffectOn: true,
        _isMusicOn: true,
    },

    ctor: function(){

    },

    playMusic: function(name){
        if( !this._isMusicOn ){
            return;
        }
        this.stopMusic();
        this._musicId = cc.audioEngine.playMusic(cc.url.raw("resources/Sound/" + name + ".wav"), true);
    },

    stopMusic: function(){
        cc.audioEngine.stopMusic();
        this._musicId = null;
    },

    pauseMusic: function(){
        cc.audioEngine.pauseMusic();
    },

    resumeMusic: function(){
        if( this._isMusicOn ){
            cc.audioEngine.resumeMusic();
        }
    },

    playEffect: function(name){
        if( !this._isEffectOn ){
            return;
        }
        this._effectId = cc.audioEngine.playEffect(cc.url.raw("resources/Sound/" + name + ".wav"), false);
        this.setVolume(this._effectId,0.4);
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

    setVolume: function(audioID, volume) {
        cc.audioEngine.setVolume(audioID, volume);
    },

    setEffectOn: function(isOn){
        this._isEffectOn = isOn;
        if( !this._isEffectOn ){
            this.stopEffect();
        }
    },

    setMusicOn: function(isOn){
        this._isMusicOn = isOn;
        if( !this._isMusicOn ){
            this.pauseMusic();
        }else{
            this.resumeMusic();
        }
    },
});

window.SoundManager = new SoundManager; 