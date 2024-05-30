/**
 * Create by DongLQ on 27/5/2024
 */
var GC = GC || {};
var PLAY = 1;

var playLayer;

var ScreenPlay = cc.Layer.extend({
    _state: HOME,
    _background: null,
    _backgroundWidth: 0,
    _backgroundRe: null,
    _ground: null,
    _groundWidth: 0,
    _groundRe: null,
    _time: 0,
    _bird: null,
    yVelocity: 0,
    yAcceleration: 0,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function() {
        this._state = PLAY;

        winSize = cc.director.getWinSize();

        // containers
        GC.CONTAINER.BACKGROUNDS = [];
        GC.CONTAINER.GROUNDS = [];
        GC.CONTAINER.PIPES = [];

        // schedule
        this.scheduleUpdate();
        this.schedule(this._counter(), 1);

        playLayer = this;

        // preset
        Background.preSet(this._state);
        Ground.preSet();
        Bird.preSet();
        // Pipe.preSet();

        // background
        this.initBackground();
        this.addKeyboardListener();
    },

    update: function (dt) {
        this.movingBackground(dt);
    },

    initBackground: function () {
        this._background = Background.getOrCreate();
        this._backgroundWidth = this._background.width;

        this._ground = Ground.getOrCreate();
        this._groundWidth = this._ground.width;

        this._bird = Bird.create();
        // this._bird = cc.Sprite("res/fiftybird/bird.png");
        // this._bird.attr({
        //     anchorX: 0,
        //     anchorY: 0,
        // })
        // this.addChild(this._bird, 100);
    },

    _counter: function() {
        if (this._state === GC.GAME_STATE.HOME) {
            this._time ++;
        }
    },
    movingBackground: function(dt) {
        var movingDist = 16 * dt * GC.SCROLL_SPEED;       // background's moving rate is 16 pixel per second

        var locGroundWidth = this._backgroundWidth;
        var locBackground = this._background;
        var currPosX = locBackground.x - movingDist;
        var locBackgroundRe = this._backgroundRe;

        // check if needed to create a new background
        if(locGroundWidth + currPosX <= winSize.width){
            if(locBackgroundRe != null)
                throw "The memory is leaking at moving background";

            // Recycled
            locBackgroundRe = this._background;
            this._backgroundRe = this._background;

            //create a new background
            this._background = Background.getOrCreate();
            locBackground = this._background;
            locBackground.x = currPosX + locGroundWidth - 5;
        } else
            locBackground.x = currPosX;

        if(locBackgroundRe){
            //locBackgroundRe
            currPosX = locBackgroundRe.x - movingDist;
            locBackgroundRe.x = currPosX
            if(currPosX + locGroundWidth < 0){
                locBackgroundRe.destroy();
                this._backgroundRe = null;
            } else
                locBackgroundRe.x = currPosX;
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
                if (self._state === PLAY) {
                    if(GC.KEYS[cc.KEY.enter]) {
                        self.onGameOver();
                        self._state = OVER;
                    }
                }
            }, 0)
        }
    },

    onEnter: function () {
        this._super();
    },
    onGameOver: function () {
        fr.view(GameOver);
    }
})