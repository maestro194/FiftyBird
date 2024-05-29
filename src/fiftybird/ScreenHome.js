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
    _backgroundHeight: 0,
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
        GC.CONTAINER.PIPES = [];

        // schedule
        this.scheduleUpdate();
        this.schedule(this._counter(), 1);

        homeLayer = this;

        // preset
        Background.preSet();

        this.initTitle();
        this.initBackground();
        this.addTouchListener();

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
        this._background = Background.getOrCreate();
        this._backgroundHeight = this._background.height;

        // this._ground = cc.Sprite("Texture/ground.png");
        // this._ground.attr({
        //     anchorX: 0,
        //     anchorY: 0,
        //     scale: 2.25
        // })
        // this.addChild(this._ground, 1);
    },

    _counter: function() {
        if (this._state === GC.GAME_STATE.HOME) {
            this._time ++;
        }
    },

    addTouchListener: function() {
        const self = this;
        cc.eventManager.addListener({
            prevTouchID: -1,
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesMoved: function (touches, event) {
                var touch = touches[0];
                if (self.prevTouchID !== touch.getID())
                    self.prevTouchID = touch.getID()
                else {
                    if (self._state === GC.GAME_STATE.HOME) {
                        self.onSelectPlay();
                        self._state = GC.GAME_STATE.PLAY;
                    }
                }
            }
        }, this)
    },

    movingBackground: function(dt) {
        var movingDist = 16 * dt;       // background's moving rate is 16 pixel per second

        var locGroundWidth = this._backgroundHeight, locBackground = this._background;
        var currPosX = locBackground.x - movingDist;
        var locBackgroundRe = this._backgroundRe;

        if(locGroundWidth + currPosX <= GC.WIDTH){
            if(locBackgroundRe != null)
                throw "The memory is leaking at moving background";
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