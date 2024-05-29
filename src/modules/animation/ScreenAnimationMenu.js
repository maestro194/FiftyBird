/**
 * Created by GSN on 7/6/2015.
 */

var ScreenAnimationMenu = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var yBtn = size.height/2;

        var btnEffekseer = gv.commonButton(200, 64, cc.winSize.width/4, yBtn,"Effekseer");
        this.addChild(btnEffekseer);
        btnEffekseer.addClickEventListener(this.onSelectEffekseer.bind(this));

        var btnDragonBone = gv.commonButton(200, 64, 2*cc.winSize.width/4, yBtn,"DragonBones");
        this.addChild(btnDragonBone);
        btnDragonBone.addClickEventListener(this.onSelectDragonbones.bind(this));

        var btnTimelineFX = gv.commonButton(200, 64, 3*cc.winSize.width/4, yBtn,"TimelineFX");
        this.addChild(btnTimelineFX);
        btnTimelineFX.addClickEventListener(this.onSelectTLFX.bind(this));

        var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));
    },
    onEnter:function(){
        this._super();
    },
    onSelectDragonbones:function(sender)
    {
        fr.view(ScreenDragonbones);
    },
    onSelectEffekseer:function()
    {
        fr.view(ScreenEffekseer);
    },
    onSelectTLFX:function(sender)
    {
        fr.view(ScreenTimelineFX);
    },
    onSelectBack:function(sender)
    {
        fr.view(ScreenMenu);
    },
});