
var GC = GC || {};
var MAX_CONTAINT_WIDTH = 20;
var MAX_CONTAINT_HEIGHT = 20;

var playLayer;

var ScreenPlay = cc.Layer.extend({
    _state: GC.GAME_STATE.COUNT,
    _background: null,
    _backgroundWidth: 0,
    _backgroundRe: null,
    _ground: null,
    _groundWidth: 0,
    _groundRe: null,
    _pipe: [],
    _pipeTimer: 0,
    _interval: 0,
    _time: 0,
    _bird: null,
    _score: null,
    _pause: null,
    score: 0,
    yVelocity: 0,
    gravity: 50,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function() {
        this._state = GC.GAME_STATE.PLAY;

        winSize = cc.director.getWinSize();

        // containers
        GC.CONTAINER.BACKGROUNDS = [];
        GC.CONTAINER.GROUNDS = [];
        GC.CONTAINER.PIPES = [];
        GC.KEYS = [];

        playLayer = this;

        // preset
        Background.preSet(playLayer);
        Ground.preSet(playLayer);
        // Bird.preSet();
        Pipe.preSet(playLayer);

        // schedule
        this.scheduleUpdate();
        // this.schedule(this.update, 0.016);

        // background
        this.initBackground();
        this.addKeyboardListener();
    },
    update: function (dt) {
        if (gameController._state === GC.GAME_STATE.PLAY) {
            this.movingBackground(dt);
            this.movingGround(dt);
            this.birdMove(dt);
            this.spawnPipe(dt);
            this.movePipe(dt);
            this.checkCollision();
            this._time += dt;
            this._score.setVisible(true);
            this._pause.setVisible(false);
        } else if (gameController._state === GC.GAME_STATE.PAUSE) {
            this._score.setVisible(false);
            this._pause.setVisible(true);
        } else if (gameController._state === GC.GAME_STATE.OVER) {
            this._score.setVisible(false);
            this._pause.setVisible(false);
        }
    },
    initBackground: function () {
        this._background = Background.getOrCreate(playLayer);
        this._backgroundWidth = this._background.width;

        this._ground = Ground.getOrCreate(playLayer);
        this._groundWidth = this._ground.width;

        this._bird = Bird.create(playLayer);

        this._score = new ccui.Text(this.score, res.flappy_ttf, 64);
        this._score.attr({
            x: GC.SCOREX,
            y: GC.SCOREY,
            visible: false
        })
        this._score.enableOutline(cc.color(0, 0, 0), 4);
        this.addChild(this._score, 1000);

        this._pause = new ccui.Text(GC.PAUSE_TEXT, res.flappy_ttf, 48);
        this._pause.attr({
            x: GC.SCOREX,
            y: GC.SCOREY,
            visible: false,
        })
        this._pause.enableOutline(cc.color(0, 0, 0), 2);
        this.addChild(this._pause, 1000);
    },
    checkCollision: function () {
        let pipe = null;
        let bird = this._bird;

        // pipe - bird
        for(let i = 0; i < GC.CONTAINER.PIPES.length; i ++) {
            pipe = GC.CONTAINER.PIPES[i];
            if (!pipe.active)
                continue;
            if (this.collide(bird, pipe)) {
                this.onGameOver();
            }
            if (pipe.x < bird.x && !pipe.passed) {
                this.scoreCounting();
                pipe.passed = true;
            }
        }

        // ground - bird
        if (bird.y < this._ground.height) {
            this.onGameOver();
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
    spawnPipe: function (dt) {
        this._pipeTimer += dt * GC.SCROLL_SPEED;
        if (this._pipeTimer >= this._interval) {
            this._pipeTimer = 0;
            let pipeTop = Pipe.getOrCreate(playLayer);
            let pipeBot = Pipe.getOrCreate(playLayer);
            let randomizer;

            /*
             randomizing
            */
            // flip top pipe
            pipeTop.flip();
            // randomize height
            pipeBot.randomY();
            // randomize gap
            randomizer = Math.floor(Math.random() * GC.PIPE_DELTA);
            pipeTop.y = pipeBot.y + GC.PIPE_MIN_GAP + randomizer + pipeBot.height * GC.SCALE_PIPE;
            // randomize interval
            randomizer = Math.floor(Math.random() * GC.PIPE_DELTA);
            this._interval = GC.PIPE_MIN_INTERVAL + randomizer;
        }
    },
    movePipe: function (dt) {
        GC.CONTAINER.PIPES.forEach(pipe => {
            if (pipe.active) {
                pipe.x -= dt * GC.PIPE_INTERVAL;
                if (pipe.x < -pipe.width * GC.SCALE_PIPE) {
                    pipe.x = GC.PIPEX;
                    pipe.active = false;
                }
            }
        })
    },
    scoreCounting: function () {
        this.score += 0.5;
        this._score.setString(this.score);
    },
    birdMove: function (dt) {
        this._bird.move(dt);
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
                if (gameController._state === GC.GAME_STATE.PLAY) {
                    if(GC.KEYS[cc.KEY.space]) {
                        GC.KEYS[cc.KEY.space] = false;
                        this._bird.jump();
                        // this.onBirdJumpEffect();
                    }
                    if(GC.KEYS[cc.KEY.p]) {
                        GC.KEYS[cc.KEY.p] = false;
                        gameController.setState(GC.GAME_STATE.PAUSE);
                    }
                } else if (gameController._state === GC.GAME_STATE.PAUSE) {
                    if(GC.KEYS[cc.KEY.p]) {
                        GC.KEYS[cc.KEY.p] = false;
                        gameController.setState(GC.GAME_STATE.PLAY);
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
    onGameOver: function () {
        this._score.visible = false;
        overLayer.setVisible(true);
        overLayer.initTitle();
        gameController._state = GC.GAME_STATE.OVER;
    },
    onBirdJumpEffect: function () {
        // play sound effect
        var sound = cc.audioEngine.playEffect(res.jump_wav);
    },
    onEnter: function () {
        this._super();
    },
})