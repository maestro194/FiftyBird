
var Ground = cc.Sprite.extend({
    active: true,
    ctor: function() {
        this._super(res.ground_png);
        var rect = cc.rect(0, 1, this.width, this.height - 2);
        this.setTextureRect(rect);
        this.anchorX = 0;
        this.anchorY = 0;
        this.scale = GC.SCALE;
    },
    destroy: function() {
        this.visible = false;
        this.active = false;
    }
});

Ground.create = function() {
    var ground = new Ground();
    playLayer.addChild(ground, -5);
    GC.CONTAINER.GROUNDS.push(ground);
    return ground;
};

Ground.getOrCreate = function() {
    var selChild = null;
    for (var j = 0; j < GC.CONTAINER.GROUNDS.length; j++) {
        selChild = GC.CONTAINER.GROUNDS[j];
        if (selChild.active === false) {
            selChild.visible = true;
            selChild.active = true;
            return selChild;
        }
    }
    selChild = Ground.create();
    return selChild;
};

Ground.preSet = function() {
    var ground = null;
    for (var i = 0; i < 2; i ++) {
        ground = Ground.create();
        ground.active = false;
        ground.visible = false;
    }
};