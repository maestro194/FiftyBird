
var Background = cc.Sprite.extend({
    active:true,
    ctor:function () {
        this._super(res.background_png);
        var rect = cc.rect(0, 0, this.width, this.height);
        this.setTextureRect(rect);
        this.anchorX = 0;
        this.anchorY = 0;
        this.setPosition(winSize.width - this.width, 0);
        this.scale = GC.SCALE;
    },
    destroy:function () {
        this.visible = false;
        this.active = false;
    }
});

Background.create = function (layer) {
    var background = new Background();
    layer.addChild(background, -10);
    GC.CONTAINER.BACKGROUNDS.push(background);
    return background;
};

Background.getOrCreate = function (layer) {
    var selChild = null;
    for (var j = 0; j < GC.CONTAINER.BACKGROUNDS.length; j++) {
        selChild = GC.CONTAINER.BACKGROUNDS[j];
        if (selChild.active === false) {
            selChild.visible = true;
            selChild.active = true;
            return selChild;
        }
    }
    selChild = Background.create(layer);
    return selChild;
};


Background.preSet = function (state) {
    var background = null;
    for (var i = 0; i < 2; i++) {
        background = Background.create(state);
        background.visible = false;
        background.active = false;
    }
};