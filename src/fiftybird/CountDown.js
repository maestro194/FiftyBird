
var CountDown = cc.Layer.extend({
    cnt: 3,
    _title: null,
    _time: 0,

    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        // schedule
        this.scheduleUpdate();

        // init
        this.initTitle();
    },
    update: function (dt) {
        this._time += dt;
        if (this.cnt === 0) {
            this.getParent().removeChild(this);
            gameController.setState(GC.GAME_STATE.PLAY);
        }
        if (this._time - (3 - this.cnt) > 1) {
            this.cnt--;
            this._title.setString(this.cnt);
        }
        console.log(this.cnt);
    },
    initTitle: function () {
        this._title = new ccui.Text(this.cnt, res.font, 64);
        this._title.attr({
            x: GC.TITLEX,
            y: GC.TITLEY,
        })
        this.addChild(this._title, 1000);
    },
})