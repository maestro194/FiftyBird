
var Bird = cc.Sprite.extend({
    active: true,
    speed: 0,
    _skill1: null,
    skill1: 0,
    cd1: 0,
    _skill2: null,
    skill2: 0,
    cd2: 0,

    ctor: function() {
        this._super(res.bird_png);
        var rect = cc.rect(0, 0, this.width, this.height);
        this.setTextureRect(rect);
        this.setPosition(GC.BIRDX, GC.BIRDY);
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.scale = GC.SCALE_BIRD;
        this.speed = 0;

        let boundingBox = this.getBoundingBox();
        let drawNode = new cc.DrawNode();
        drawNode.drawRect(cc.p(0, 0), cc.p(this.width, this.height), cc.color(255, 0, 0, 255), 1, cc.color(0, 0, 0, 255));
        this.addChild(drawNode, 10);
    },
    destroy: function() {
        this.visible = false;
        this.active = false;
    },
    move: function (dt) {
        // dashing
        if (this.skill1 > 0) {
            this.skill1 -= dt;
            this.speed = 0;
            if (this.skill1 <= 0) {
                this.skill1 = 0;
                this.cd1 = GC.SKILL_DASH_CD;
            }
        } else if (this.cd1 > 0) {
            this.cd1 -= dt;
            if (this.cd1 <= 0)
                this.cd1 = 0;
        }
        // growing
        else if (this.skill2 > 0) {
            this.skill2 -= dt;
            this.y = GC.BIRDY;
            this.scale = GC.SCALE_BIRD + GC.SKILL_GROW_SCALE;
            if (this.skill2 <= 0) {
                this.skill2 = 0;
                this.cd2 = GC.SKILL_GROW_CD;
                this.scale = GC.SCALE_BIRD;
            }
        }
        // else {
            this.speed += dt * GC.GRAVITY;
            if (this.speed > GC.GRAVITY)
                this.speed = GC.GRAVITY;
            // console.log(this.speed);

            this.y -= dt * this.speed;
            if (this.y < 0)
                this.y = 0;
            this.rotate();
        // }
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

    setSkill1: function() {
        if (this.cd1 === 0 && this.skill1 === 0 && this.skill2 === 0)
            this.skill1 = GC.SKILL_DASH_DURATION;
    },

    getSkill1: function() {
        return this.skill1;
    },

    setSkill2: function () {
        if (this.cd2 === 0 && this.skill1 === 0 && this.skill2 === 0)
            this.skill2 = GC.SKILL_GROW_DURATION;
    },

    getSkill2: function() {
        return this.skill2;
    },

    getCD1: function() {
        return this.cd1;
    },

    getCD2: function() {
        return this.cd2;
    },

    collideRect:function (x, y) {
        return this.getBoundingBox();
    },
});

Bird.create = function (layer) {
    var bird = new Bird();
    bird.active = true;
    bird.visible = true;
    layer.addChild(bird, 7);
    return bird;
};