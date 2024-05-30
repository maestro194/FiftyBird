
GC.GameController = cc.Class.extend({
    _curScene: null,
    // _state: GC.GAME_STATE.HOME,
    // _isNewGame: true,

    init: function () {
        return true;
    },

    setCurScene: function (s) {
        if (this._curScene !== s) {
            if (this._curScene === null)
                this._curScene.onExit();
            this._curScene = s;
            if (this._curScene) {
                this._curScene.onEnter();
                cc.director.runScene(s);
            }
        }
    },
});