
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.node.runAction(cc.sequence(cc.delayTime(1),cc.removeSelf()));
    },

});
