
var Pipe = cc.Sprite.extend({
    active: true,
    speed: GC.PIPE_SPEED,

    ctor: function() {
        this._super(res.pipe_png);
        var rect = cc.rect(0, 0, this.width, this.height);
        this.setTextureRect(rect);
        this.setPosition(GC.PIPEX, GC.PIPEY);
        this.anchorX = 0;
        this.anchorY = 0;
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
        this.y = GC.HEIGHT - this.height;
    },
    collideRect:function (x, y) {
        var w = this.width, h = this.height;
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
    }
}