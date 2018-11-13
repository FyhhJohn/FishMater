var DataManager = require("DataManager");
var SoundManager = require("SoundManager");
var HttpManager = require("HttpManager");
var GameControler = require("GameControler");
var MainScene = require("MainScene");
var FishFactory = require("FishFactory");

var GameManager = cc.Class({
    properties:{
        GameControler: GameControler,
        MainScene:     MainScene,
        FishFactory:   FishFactory,
        DataManager:   DataManager,
        SoundManager:  SoundManager,
        HttpManager:   HttpManager,
        LoadingUI:     null,
    },
    
    ctor(){
        cc.log("GameManager");
        
        this.SoundManager = new SoundManager(); 
        this.DataManager = new DataManager();
        this.HttpManager = new HttpManager();

    },
});

window.GameManager = new GameManager();
