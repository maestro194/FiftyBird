
var ScoreBoard = cc.Sprite.extend({
    active: true,
    ctor: function () {
        this._super(res.scoreboard_png);
        var rect = cc.rect(0, 0, this.width, this.height);
        this.setTextureRect(rect);
        this.setPosition(GC.SCOREBOARDX, GC.SCOREBOARDY);
    },
    destroy: function () {
        this.visible = false;
        this.active = false;
    },
})

ScoreBoard.create = function (layer) {
    var scoreboard = new ScoreBoard();
    layer.addChild(scoreboard, 10);
    return scoreboard;
};