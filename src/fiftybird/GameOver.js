
var GC = GC || {}
var OVER = 3;
var overLayer;

var GameOver = cc.Layer.extend({
    _state: OVER,
    _background: null,
    _ground: null,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._state = OVER;

        // container
        GC.CONTAINER.BACKGROUNDS = [];
        GC.CONTAINER.GROUNDS = [];

        winSize = cc.director.getWinSize();

        overLayer = this;

        // preset
        Background.preSet(overLayer);

        // init
        this.initBackground();
        this.initTitle();
        this.addKeyboardListener();
    },

    initBackground: function() {
        this._background = Background.getOrCreate(overLayer);
        this._ground = Ground.getOrCreate(overLayer);
    },

    initTitle: function () {
        var title = new ccui.Text(GC.TITLE_OVER, res.flappy_ttf, 64);
        title.attr({
            x: GC.TITLEX,
            y: GC.TITLEY,
        })
        this.addChild(title, 1000);
        var score = new ccui.Text("Score: " + playLayer.score, res.flappy_ttf, 48)
        score.attr({
            x: GC.TITLEX,
            y: GC.TITLEY - 80
        })
        this.addChild(score, 1000);
    },

    addKeyboardListener:function(){
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            const self = this;
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (keyCode) {
                    GC.KEYS[keyCode] = true;
                },
                onKeyReleased: function (keyCode) {
                    GC.KEYS[keyCode] = false;
                },

            }, this)
            this.schedule(function(){
                if (self._state === OVER) {
                    if(GC.KEYS[cc.KEY.enter]) {
                        self._state = PLAY;
                        self.onReplay()
                    }
                }
            }, 0)
        }
    },

    onReplay: function () {
        var scene = new cc.Scene();
        scene.addChild(new ScreenPlay());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
})