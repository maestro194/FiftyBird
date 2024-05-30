
var Bird = cc.Sprite.extend({
    active: true,
    ctor: function() {
        this._super(res.bird_png);
        var rect = cc.rect(GC.BIRDX, GC.BIRDY, this.width, this.height);
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

Bird.create = function () {
    var bird = new Bird();
    bird.active = true;
    bird.visible = true;
    playLayer.addChild(bird, 100);
    return bird;
};

Bird.preSet = function() {
    var bird = Bird.create();
    bird.active = false;
    bird.visible = false;
}