
var GC = GC || {};
var HOME = 0;

var homeLayer;

var ScreenHome = cc.Layer.extend({
    _state: HOME,
    _background: null,
    _ground: null,
    _time: 0,

    ctor: function() {
        this._super();
        this.init();
    },

    init: function() {
        GC.CONTAINER.BACKGROUNDS = [];
        GC.KEYS = [];

        winSize = cc.director.getWinSize();

        // schedule
        this.scheduleUpdate();
        this.schedule(this._counter(), 1);

        homeLayer = this;

        // preset
        Background.preSet(homeLayer);
        Ground.preSet(homeLayer);

        this.initTitle();
        this.initBackground();
        this.addKeyboardListener();

        return true;
    },
    update: function(dt) {
        if (gameController._state === GC.GAME_STATE.HOME) {
            this.movingBackground(dt);
            this.movingGround(dt);
        }
    },

    initTitle: function() {
        var title = new ccui.Text(GC.TITLE_HOME, res.flappy_ttf, 64);
        title.attr({
            // anchorX: 0,
            // anchorY: 0,
            x: GC.TITLEX,
            y: GC.TITLEY,
        })
        this.addChild(title, 1000);

        var enter = new ccui.Text(GC.ENTER, res.flappy_ttf, 36);
        enter.attr({
            // anchorX: 0,
            // anchorY: 0,
            x: GC.TITLEX,
            y: GC.TITLEY - 60
        })
        this.addChild(enter, 999);
    },

    initBackground: function() {
        this._background = Background.getOrCreate(homeLayer);
        this._ground = Ground.getOrCreate(homeLayer);
    },

    _counter: function() {
        if (this._state === GC.GAME_STATE.HOME) {
            this._time ++;
        }
    },

    addKeyboardListener:function(){
        //Add code here
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
                if (gameController._state === HOME) {
                    if(GC.KEYS[cc.KEY.enter]) {
                        this.onSelectPlay();
                    }
                }
            }, 0)
        }
    },

    movingBackground: function(dt) {
        let movingDist = dt * GC.BACKGROUND_SPEED;
        let filled = false;
        let bgWidth = GC.BG_WIDTH;

        GC.CONTAINER.BACKGROUNDS.forEach(bg => {
            if (bg.active === true){
                let newPosX = bg.x - movingDist;
                if (newPosX + bgWidth * GC.SCALE <= 0) {
                    bg.destroy();
                } else {
                    bg.x = newPosX;
                }
                if (newPosX + bgWidth * (GC.SCALE - GC.SCALE_DELTA) >= winSize.width) {
                    filled = true;
                }
            }
        })

        if (!filled) {
            let bg = Background.getOrCreate(homeLayer);
            bg.x = winSize.width;
        }
    },

    movingGround: function(dt) {
        let movingDist = dt * GC.GROUND_SPEED;
        let filled = false;
        let gWidth = GC.G_WIDTH;

        GC.CONTAINER.GROUNDS.forEach(g => {
            if (g.active === true){
                let newPosX = g.x - movingDist;
                if (newPosX + gWidth * GC.SCALE <= 0) {
                    g.destroy();
                } else {
                    g.x = newPosX;
                }
                if (newPosX + gWidth * (GC.SCALE - GC.SCALE_DELTA) >= winSize.width) {
                    filled = true;
                }
            }
        })

        if (!filled) {
            let g = Ground.getOrCreate(homeLayer);
            g.x = winSize.width;
        }
    },

    onEnter: function () {
        this._super();
    },

    onSelectPlay: function () {
        this.stopAllActions();
        var scene = new cc.Scene();
        scene.addChild(new ScreenPlay());
        scene.addChild(new CountDown());
        scene.addChild(new GameOver());

        gameController._state = GC.GAME_STATE.COUNT;
        gameController.setCurScene(new cc.TransitionFade(1.2, scene));
    },
})