
var overLayer;

var OVER = 3;

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
        Background.preSet();

        this.initBackground();
    },

    initBackground: function() {
        this._background = Background.getOrCreate(this._state);
        this._ground = Ground.getOrCreate(this._state);
    }
})