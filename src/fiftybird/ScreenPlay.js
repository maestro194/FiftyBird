/**
 * Create by DongLQ on 27/5/2024
 */

var ScreenPlay = cc.Layer.extend({
    _background:null,
    _backgroundHeight: 0,
    _bird: null,
    _ground: null,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function() {

        GC.CONTAINER.BACKGROUNDS = [];
        // background
        this.initBackground();
    },

    initBackground: function () {
        this._background = Background.getOrCreate();
        this._backgroundHeight = this._background.height;

        var ground = cc.Sprite("Texture/ground.png");
        ground.attr({
            anchorX: 0,
            anchorY: 0,
            scale: GC.SCALE
        })
        this.addChild(ground, 1);

        this._bird = cc.Sprite(res.bird_png);
        this._bird.attr({
            anchorX: 0,
            anchorY: 0,
            x: GC.BIRDY,
            y: GC.BIRDY,
            scale: GC.SCALE
        })
        this.addChild(this._bird, 3);
    },
    onEnter: function () {
        this._super();
    },
    onTouchesBegan: function (touches, event) {
        cc.log("onTouchesBegan");
    }
})