
var GC = GC || {}
var OVER = 3;
var overLayer;

var GameOver = cc.Layer.extend({
    _background: null,
    _ground: null,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        winSize = cc.director.getWinSize();

        overLayer = this;
        this.setVisible(false);

        // preset
        // Background.preSet(overLayer);

        // init
        // this.initBackground();
        this.initTitle();
        this.addKeyboardListener();
    },

    // initBackground: function() {
    //     this._background = Background.getOrCreate(overLayer);
    //     this._ground = Ground.getOrCreate(overLayer);
    // },

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
            y: GC.TITLEY - 80,
        })
        this.addChild(score, 1000);
    },

    addKeyboardListener:function(){
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
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
                if (gameController._state === OVER) {
                    if(GC.KEYS[cc.KEY.enter]) {
                        this.onReplay();
                    }
                }
            }, 0)
        }
    },

    onReplay: function () {
        this.stopAllActions();
        var scene = new cc.Scene();
        scene.addChild(new ScreenPlay());
        scene.addChild(new CountDown());
        scene.addChild(new GameOver());

        gameController._state = GC.GAME_STATE.COUNT;
        gameController.setCurScene(new cc.TransitionFade(1.2, scene));
    }
})