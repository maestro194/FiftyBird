
var Background = cc.Sprite.extend({
    active:true,
    ctor:function () {
        this._super("res/fiftybird/background.png");
        var rect = cc.rect(0, 1, this.width, this.height-2);
        this.setTextureRect(rect);
        this.anchorX = 0;
        this.anchorY = 0;
        this.scale = GC.SCALE;
    },
    destroy:function () {
        this.visible = false;
        this.active = false;
    }
});

Background.create = function () {
    var background = new Background();
    homeLayer.addChild(background, -10);
    GC.CONTAINER.BACKGROUNDS.push(background);
    return background;
};

Background.getOrCreate = function () {
    var selChild = null;
    for (var j = 0; j < GC.CONTAINER.BACKGROUNDS.length; j++) {
        selChild = GC.CONTAINER.BACKGROUNDS[j];
        if (selChild.active === false) {
            selChild.visible = true;
            selChild.active = true;
            return selChild;
        }
    }
    selChild = Background.create();
    return selChild;
};


Background.preSet = function () {
    var background = null;
    for (var i = 0; i < 2; i++) {
        background = Background.create();
        background.visible = false;
        background.active = false;
    }
};