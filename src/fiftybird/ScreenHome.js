/**
 * Created by DongLQ on 27/5/2024
 */

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

        winSize = cc.director.getWinSize();

        // schedule
        this.scheduleUpdate();
        this.schedule(this._counter(), 1);

        homeLayer = this;

        // preset
        Background.preSet(this._state);

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
        var title = new ccui.Text(GC.TITLE, GC.FONT, 64);
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

        this._ground = cc.Sprite("res/fiftybird/pipe.png");
        this._ground.attr({
            anchorX: 0,
            anchorY: 0,
        })
        this.addChild(this._ground, 1);
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

    onEnter: function () {
        this._super();
    },

    onSelectPlay: function () {
        fr.view(ScreenPlay)
    },
})