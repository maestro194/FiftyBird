/**
 * Created by KienVN on 2/12/2019.
 */
var ScreenAppleIAP = cc.Layer.extend({
    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));

        var yBtn = 7*size.height/12;

        var btnBuyGold = gv.commonButton(200, 64, cc.winSize.width/4, yBtn,"Buy Gold");
        this.addChild(btnBuyGold);
        btnBuyGold.addClickEventListener(this.onSelectBuyGold.bind(this));

        var btnBuyG = gv.commonButton(200, 64, 2*cc.winSize.width/4, yBtn,"Buy G");
        this.addChild(btnBuyG);
        btnBuyG.addClickEventListener(this.onSelectBuyG.bind(this));

    },
    onEnter:function(){
        this._super();
    },
    onSelectBack:function(sender)
    {
        fr.view(ScreenMenu);
    },
    onSelectBuyGold:function(sender)
    {

    },
    onSelectBuyG:function(sender)
    {

    }

});