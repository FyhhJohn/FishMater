

cc.Class({
    extends: cc.Component,

    properties: {
        userNameLab: cc.Label,
        rankLab:     cc.Label,
        scoreLab:    cc.Label,
    },

    init: function(data){
        this.userNameLab.string = data.name;
        this.rankLab.string = data.rank;
        this.scoreLab.string = data.score;
    }
});
