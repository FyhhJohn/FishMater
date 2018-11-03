
var SoundManager = cc.Class({

    properties: {
        _musicId: null,
        _effectId: null,

        _isEffectOn: true,
        _isMusicOn: true,

        _musicName: null,
    },

    ctor: function(){
    },

    playMusic: function(name){
        this._musicName = name;
        if( !this._isMusicOn ){
            return;
        }
        this._musicId = cc.audioEngine.playMusic(cc.url.raw("resources/Sound/" + name + ".wav"), true);
    },
    
    stopMusic: function(){
        cc.audioEngine.stopMusic();
        this._musicId = null;
        this._musicName = null;
    },

    pauseMusic: function(){
        cc.audioEngine.pauseMusic();
    },

    resumeMusic: function(){
        if( !this._musicName ){
            return;
        }
        if( this._musicName && this._musicId ){
            cc.audioEngine.resumeMusic();
        }else{
            this.playMusic(this._musicName);
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
        UserDefault.setBool("effectOn",isOn);
    },

    setMusicOn: function(isOn){
        this._isMusicOn = isOn;
        UserDefault.setBool("musicOn",isOn);

        if( !this._isMusicOn ){
            this.pauseMusic();
        }else{
            this.resumeMusic();
        }
    },

    isEffectOn: function(){
        return this._isEffectOn;
    },

    isMusicOn: function(){
        return this._isMusicOn;
    },
});

window.SoundManager = new SoundManager(); 