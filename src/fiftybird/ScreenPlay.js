
var GC = GC || {};
var PLAY = 1;
var MAX_CONTAINT_WIDTH = 20;
var MAX_CONTAINT_HEIGHT = 20;

var playLayer;

var ScreenPlay = cc.Layer.extend({
    _state: HOME,
    _background: null,
    _backgroundWidth: 0,
    _backgroundRe: null,
    _ground: null,
    _groundWidth: 0,
    _groundRe: null,
    _pipe: [],
    _pipeTimer: 0,
    _time: 0,
    _bird: null,
    score: 0,
    yVelocity: 0,
    gravity: 50,

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
        GC.KEYS = [];

        // schedule
        this.scheduleUpdate();
        this.schedule(this._counter(), 1);

        playLayer = this;

        // preset
        Background.preSet(playLayer);
        Ground.preSet(playLayer);
        // Bird.preSet();
        Pipe.preSet(playLayer);

        // background
        this.initBackground();
        this.addKeyboardListener();
    },

    update: function (dt) {
        this.movingBackground(dt);
        this.gravityMove(dt);
        this.spawnPipe(dt);
        this.movePipe(dt);
        this.checkCollision();
    },

    initBackground: function () {
        this._background = Background.getOrCreate(playLayer);
        this._backgroundWidth = this._background.width;

        this._ground = Ground.getOrCreate(playLayer);
        this._groundWidth = this._ground.width;

        this._bird = Bird.create(playLayer);

    },

    checkCollision: function () {
        let pipe = null;
        let bird = this._bird;

        for(let i = 0; i < GC.CONTAINER.PIPES.length; i ++) {
            pipe = GC.CONTAINER.PIPES[i];
            if (!pipe.active)
                continue;
            if (this.collide(bird, pipe)) {
                this.onGameOver();
            }
        }
    },

    _counter: function() {
        if (this._state === GC.GAME_STATE.PLAY) {
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
            this._background = Background.getOrCreate(playLayer);
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

    spawnPipe: function (dt) {
        this._pipeTimer += dt * GC.SCROLL_SPEED * 10;
        if (this._pipeTimer >= GC.PIPE_WIDTH) {
            this._pipeTimer = 0;
            var pipeUp = Pipe.getOrCreate(playLayer);
            var pipeDown = Pipe.getOrCreate(playLayer);
            pipeUp.flip();
        }
    },

    movePipe: function (dt) {
        GC.CONTAINER.PIPES.forEach(pipe => {
            if (pipe.active) {
                pipe.x -= dt * GC.PIPE_SPEED;
                if (pipe.x < -pipe.width) {
                    pipe.x = GC.PIPEX;
                    pipe.active = false;
                }
            }
        })
    },

    gravityMove: function (dt) {
        this._bird.move(dt);
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
                if (self._state === PLAY) {
                    if(GC.KEYS[cc.KEY.space]) {
                        GC.KEYS[cc.KEY.space] = false;
                        this._bird.jump();
                    }
                }
            }, 0)
        }
    },

    collide:function (a, b) {
        var ax = a.x, ay = a.y, bx = b.x, by = b.y;
        // if (Math.abs(ax - bx) > MAX_CONTAINT_WIDTH || Math.abs(ay - by) > MAX_CONTAINT_HEIGHT)
        //     return false;

        var aRect = a.collideRect(ax, ay);
        var bRect = b.collideRect(bx, by);
        return cc.rectIntersectsRect(aRect, bRect);
    },

    onEnter: function () {
        this._super();
    },
    onGameOver: function () {
        var scene = new cc.Scene();
        scene.addChild(new GameOver());
        cc.director.runScene(new cc.TransitionFade(1.5, scene));
    }
})