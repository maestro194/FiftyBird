
var Bird = cc.Sprite.extend({
    active: true,
    speed: 0,

    ctor: function() {
        this._super(res.bird_png);
        var rect = cc.rect(0, 0, this.width, this.height);
        this.setTextureRect(rect);
        this.setPosition(GC.BIRDX, GC.BIRDY);
        this.anchorX = 0;
        this.anchorY = 0;
        this.scale = GC.SCALE_BIRD;
        this.speed = 0;
    },
    destroy: function() {
        this.visible = false;
        this.active = false;
    },
    move: function (dt) {
        this.speed += dt * GC.SPEED_MULTIPLIER;
        if (this.speed > GC.GRAVITY)
            this.speed = GC.GRAVITY;
        // console.log(this.speed);

        this.y -= dt * this.speed;
        if (this.y < 0)
            this.y = 0;
    },
    jump: function () {
        this.speed = GC.JUMP_SPEED; // JUMP_SPEED
    },

    collideRect:function (x, y) {
        let w = this.width * GC.SCALE_BIRD;
        let h = this.height * GC.SCALE_BIRD;
        return cc.rect(x, y, w, h);
    },
});

Bird.create = function (layer) {
    var bird = new Bird();
    bird.active = true;
    bird.visible = true;
    layer.addChild(bird, 7);
    return bird;
};