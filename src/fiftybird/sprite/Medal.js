
var Medal = cc.Sprite.extend({
    active: true,
    rank: 'invisible', // 'bronze', 'silver', 'gold', 'platinum

    ctor: function(type) {
        this._super(type);
        this.setPosition(GC.MEDALX, GC.MEDALY);
    },
    destroy: function() {
        this.visible = false;
        this.active = false;
    },
})

Medal.create = function(layer, score) {
    let medal = null;
    if (score < 10) {
        console.log("invisible")
        medal = new Medal(res.invisible_png);
        var rect = cc.rect(0, 0, medal.width, medal.height);
        medal.setTextureRect(rect);
    } else if (10 <= score && score < 20) {
        console.log('bronze');
        medal = new Medal(res.bronze_png);
        var rect = cc.rect(0, 0, medal.width, medal.height);
        medal.setTextureRect(rect);
    } else if (20 <= score && score < 30) {
        console.log('sil');
        medal = new Medal(res.silver_png);
        var rect = cc.rect(0, 0, medal.width, medal.height);
        medal.setTextureRect(rect);
    } else if (30 <= score && score < 40) {
        console.log('gold');
        medal = new Medal(res.gold_png);
        var rect = cc.rect(0, 0, medal.width, medal.height);
        medal.setTextureRect(rect);
    } else {
        console.log('plat');
        medal = new Medal(res.platinum_png);
        var rect = cc.rect(0, 0, medal.width, medal.height);
        medal.setTextureRect(rect);
    }
    layer.addChild(medal, 101);
    return medal;
}