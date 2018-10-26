

cc.Class({
    extends: cc.Component,

    properties: {
        damageValue: 0,
    },

    onCollisionEnter: function (other, self) {
        if( other.node.group == "fish" ){
            other.node.getComponent("Fish").attacked(self.node.getComponent("Web").damageValue);
        }
    },
});
