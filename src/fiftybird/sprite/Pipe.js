
var Pipe = cc.Sprite.extend({
    active: true,
    speed: GC.PIPE_SPEED,
    passed: false,

    ctor: function() {
        this._super(res.pipe_png);
        var rect = cc.rect(0, 0, this.width, this.height);
        this.setTextureRect(rect);
        this.setPosition(GC.PIPEX, GC.PIPEY);
        this.anchorX = 0;
        this.anchorY = 0;
        this.scale = GC.SCALE_PIPE;
    },
    destroy: function() {
        this.visible = false;
        this.active = false;
    },
    move: function(dt) {
        this.x -= dt * this.speed;
        if (this.x < 0)
            this.x = 0;
    },
    flip: function() {
        this.setFlippedY(true);
    },
    randomY: function() {
        let randomizer = Math.floor(Math.random() * winSize.height / 3);
        randomizer -= GC.PIPE_GAP / 2 + this.height;
        this.y = randomizer;
    },
    collideRect:function (x, y) {
        let w = this.width * GC.SCALE_PIPE;
        let h = this.height * GC.SCALE_PIPE;
        return cc.rect(x, y, w, h);
    },
})

Pipe.create = function (layer) {
    var pipe = new Pipe();
    layer.addChild(pipe, 5);
    GC.CONTAINER.PIPES.push(pipe);
    return pipe;
}

Pipe.getOrCreate = function (layer) {
    var selChild = null;
    for (var i = 0; i < GC.CONTAINER.PIPES.length; i ++) {
        selChild = GC.CONTAINER.PIPES[i];
        if(selChild.active === false) {
            selChild.active = true;
            selChild.visible = true;
            selChild.passed = false;
            return selChild;
        }
    }
    selChild = new Pipe.create(layer);
    return selChild;
}

Pipe.preSet = function (layer) {
    var pipe = null;
    for(var i = 0; i < 12; i ++) {
        pipe = Pipe.create(layer);
        pipe.visible = false;
        pipe.active = false;
        pipe.passed = false;
    }
}