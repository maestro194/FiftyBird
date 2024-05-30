
var CountDown = cc.Layer.extend({
    _state: GC.COUNT,
    cnt: 3,
    _time: 0,

    ctor: function () {
        this.scheduleUpdate();
        this.schedule(this._counter, 1);
    },
    update: function (dt) {

    },
    _counter: function () {
        _time ++;
    }
})