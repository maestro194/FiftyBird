
var GC = GC || {};

var HOME = 0;

var gameController = null;

var GameController = cc.Class.extend({
    _curScene: null,
    _state: HOME,
    // _isNewGame: true,

    ctor: function () {
        this._curScene = null;
        this._state = HOME;

        gameController = this;

        // this._isNewGame = true;
        this.init();
    },

    init: function () {
        let scene = new cc.Scene();
        scene.addChild(new ScreenHome());
        this.setCurScene(scene);
    },

    setCurScene: function (s) {
        if (this._curScene !== s) {
            // if (this._curScene)
            //     this._curScene.onExit();
            this._curScene = s;
            if (this._curScene) {
                this._curScene.onEnter();
                cc.director.runScene(s);
            }
        }
    },

    addChild: function (child) {
        this._curScene.addChild(child);
    },

    setState: function (state) {
        this._state = state;
    },
});