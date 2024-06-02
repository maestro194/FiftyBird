
var GC = GC || {}
var OVER = 3;
var overLayer;

var GameOver = cc.Layer.extend({
    _title: null,
    _score: null,
    _scoreboard: null,

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
        // this.initTitle();
        this.addKeyboardListener();
    },

    initTitle: function () {
        this._title = new ccui.Text(GC.TITLE_OVER, res.flappy_ttf, 64);
        this._title.attr({
            x: GC.TITLEX,
            y: GC.TITLEY,
        })
        this.addChild(this._title, 99);

        this._score = new ccui.Text("Score: " + playLayer.score, res.flappy_ttf, 48)
        this._score.attr({
            x: GC.TITLEX,
            y: GC.TITLEY - 80,
        })
        this.addChild(this._score, 99);
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
        var scene = new cc.Scene();
        scene.addChild(new ScreenPlay());
        scene.addChild(new CountDown());
        scene.addChild(new GameOver());

        gameController._state = GC.GAME_STATE.COUNT;
        gameController.setCurScene(new cc.TransitionFade(1.2, scene));
    }
})