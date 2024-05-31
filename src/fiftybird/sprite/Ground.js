
var Ground = cc.Sprite.extend({
    active: true,
    ctor: function() {
        this._super(res.ground_png);
        var rect = cc.rect(0, 1, this.width, this.height);
        this.setTextureRect(rect);
        this.setPosition(0, 0);
        this.anchorX = 0;
        this.anchorY = 0;
        this.scale = GC.SCALE;
    },
    destroy: function() {
        this.visible = false;
        this.active = false;
    },
    collideRect:function (x, y) {
        let w = this.width * GC.SCALE;
        let h = this.height * GC.SCALE;
        return cc.rect(x, y, w, h);
    },
});

Ground.create = function(layer) {
    var ground = new Ground();
    layer.addChild(ground, 10);
    GC.CONTAINER.GROUNDS.push(ground);
    return ground;
};

Ground.getOrCreate = function(layer) {
    var selChild = null;
    for (var j = 0; j < GC.CONTAINER.GROUNDS.length; j++) {
        selChild = GC.CONTAINER.GROUNDS[j];
        if (selChild.active === false) {
            selChild.visible = true;
            selChild.active = true;
            return selChild;
        }
    }
    selChild = Ground.create(layer);
    return selChild;
};

Ground.preSet = function(layer) {
    var ground = null;
    for (var i = 0; i < 4; i ++) {
        ground = Ground.create(layer);
        ground.active = false;
        ground.visible = false;
    }
};