
var GC = GC || {};
var HOME = 0;
var PLAY = 1;

var homeLayer;

var ScreenHome = cc.Layer.extend({
    _state: HOME,
    _background: null,
    _backgroundWidth: 0,
    _backgroundRe: null,
    _ground: null,
    _time: 0,

    ctor: function() {
        this._super();
        this.init();
    },

    init: function() {
        this._state = HOME;

        GC.CONTAINER.BACKGROUNDS = [];
        GC.KEYS = [];

        winSize = cc.director.getWinSize();

        // schedule
        this.scheduleUpdate();
        this.schedule(this._counter(), 1);

        homeLayer = this;

        // preset
        Background.preSet(homeLayer);

        this.initTitle();
        this.initBackground();
        this.addKeyboardListener();

        return true;
    },
    update: function(dt) {
        this.movingBackground(dt);
        // this.checkIsCollide();
        // this.removeInactiveUnit(dt);
        // this.checkIsReborn();
        // this.updateUI();
    },

    initTitle: function() {
        var title = new ccui.Text(GC.TITLE_HOME, GC.FONT, 64);
        title.attr({
            // anchorX: 0,
            // anchorY: 0,
            x: GC.TITLEX,
            y: GC.TITLEY,
        })
        this.addChild(title, 1000);

        var enter = new ccui.Text(GC.ENTER, GC.FONT, 36);
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
        this._backgroundWidth = this._background.width;

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
            const self = this;
            // a moving system so that anytime a key is pressed add the key to the keydown,
            // the ship can move in multiple directions at once and it moved if at least 1 key is pressed
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
                if (self._state === HOME) {
                    if(GC.KEYS[cc.KEY.space]) {
                        self.onSelectPlay();
                        self._state = PLAY;
                    }
                }
            }, 0)
        }
    },

    movingBackground: function(dt) {
        var movingDist = 16 * dt * GC.SCROLL_SPEED;       // background's moving rate is 16 pixel per second

        var bgWidth = this._backgroundWidth;
        var bg = this._background;
        var currPosX = bg.x - movingDist;
        var bgRe = this._backgroundRe;

        console.log(currPosX);
        console.log(bgWidth);
        console.log(winSize.width);

        // check if needed to create a new background
        if(bgWidth + currPosX <= winSize.width){
            if(bgRe != null)
                throw "The memory is leaking at moving background";

            // Recycled
            bgRe = this._background;
            this._backgroundRe = this._background;

            //create a new background
            this._background = Background.getOrCreate(playLayer);
            bg = this._background;
            bg.x = currPosX + bgWidth ;
        } else
            bg.x = currPosX;

        if(bgRe){
            //locBackgroundRe
            currPosX = bgRe.x - movingDist;
            bgRe.x = currPosX
            if(currPosX + bgWidth < 0){
                bgRe.destroy();
                this._backgroundRe = null;
            } else
                bgRe.x = currPosX;
        }
    },

    onEnter: function () {
        this._super();
    },

    onSelectPlay: function () {
        var scene = new cc.Scene();
        scene.addChild(new ScreenPlay());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
})