
var Bird = cc.Sprite.extend({
    active: true,
    speed: 0,

    ctor: function() {
        this._super(res.bird_png);
        var rect = cc.rect(0, 0, this.width, this.height);
        this.setTextureRect(rect);
        this.setPosition(GC.BIRDX, GC.BIRDY);
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.scale = GC.SCALE_BIRD;
        this.speed = 0;
    },
    destroy: function() {
        this.visible = false;
        this.active = false;
    },
    move: function (dt) {
        this.speed += dt * GC.GRAVITY;
        if (this.speed > GC.GRAVITY)
            this.speed = GC.GRAVITY;
        // console.log(this.speed);

        this.y -= dt * this.speed;
        if (this.y < 0)
            this.y = 0;
        this.rotate();
    },
    jump: function () {
        this.speed = GC.JUMP_SPEED; // JUMP_SPEED
    },

    rotate: function() {
        let rotation = this.speed / GC.GRAVITY * 120;
        if (rotation < -30)
            rotation = -30;
        this.setRotation(rotation);
    },

    collideRect:function (x, y) {
        let w = this.width * GC.SCALE_BIRD;
        let h = this.height * GC.SCALE_BIRD;
        let rect = cc.rect(x - w / 2, y - h / 2, w / 2, h / 2);
        rect.setRotation(this.getRotation());
        return rect;
    },
});

Bird.create = function (layer) {
    var bird = new Bird();
    bird.active = true;
    bird.visible = true;
    layer.addChild(bird, 7);
    return bird;
};