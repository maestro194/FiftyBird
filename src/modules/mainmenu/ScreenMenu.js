/**
 * Created by GSN on 7/6/2015.
 */

var ScreenMenu = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var yBtn = size.height/5;

        var btnNetwork = gv.commonButton(200, 64, cc.winSize.width/4, yBtn,"Network");
        this.addChild(btnNetwork);
        btnNetwork.addClickEventListener(this.onSelectNetwork.bind(this));

        var btnLocalization = gv.commonButton(200, 64, cc.winSize.width/2, yBtn,"Localize");
        this.addChild(btnLocalization);
        btnLocalization.addClickEventListener(this.onSelectLocalization.bind(this));

        var btnDragonbones = gv.commonButton(200, 64, 3*cc.winSize.width/4, yBtn,"Dragonbone");
        this.addChild(btnDragonbones);
        btnDragonbones.addClickEventListener(this.onSelectDragonbones.bind(this));


        var yBtn = 2*size.height/5;

        var btnAnimation = gv.commonButton(200, 64, cc.winSize.width/4, yBtn,"Animations");
        this.addChild(btnAnimation);
        btnAnimation.addClickEventListener(this.onSelectAnimations.bind(this));

        var btnVideo = gv.commonButton(200, 64, 2*cc.winSize.width/4, yBtn,"Video");
        this.addChild(btnVideo);
        btnVideo.addClickEventListener(this.onSelectVideo.bind(this));

        var btnRestart = gv.commonButton(200, 64, 3*cc.winSize.width/4, yBtn,"Restart VM");
        this.addChild(btnRestart);
        btnRestart.addClickEventListener(this.onRestartGame.bind(this));

        yBtn = 3*size.height/5;
        var btnLogin = gv.commonButton(200, 64, 1*cc.winSize.width/4, yBtn,"Login");
        this.addChild(btnLogin);
        btnLogin.addClickEventListener(this.onSelectLogin.bind(this));
        var btnGoogleIAP = gv.commonButton(200, 64, 2*cc.winSize.width/4, yBtn,"Google IAP");
        this.addChild(btnGoogleIAP);
        btnGoogleIAP.addClickEventListener(this.onSelectGoogleIAP.bind(this));

        var btnAppleIAP = gv.commonButton(200, 64, 3*cc.winSize.width/4, yBtn,"Apple IAP");
        this.addChild(btnAppleIAP);
        btnAppleIAP.addClickEventListener(this.onSelectAppleIAP.bind(this));

        yBtn = 4 * size.height/5;
        var btnDownload = gv.commonButton(200, 64, 1*cc.winSize.width / 4, yBtn,"Download");
        this.addChild(btnDownload);
        btnDownload.addClickEventListener(this.onSelectDownload.bind(this));
    },
    onEnter:function(){
        this._super();
    },
    onSelectNetwork:function(sender)
    {
        fr.view(ScreenNetwork);
    },
    onSelectLocalization:function(sender)
    {
        fr.view(ScreenLocalization);
    },
    onSelectDragonbones:function(sender)
    {
        fr.view(ScreenDragonbones);
    },
    onSelectAnimations:function()
    {
        fr.view(ScreenAnimationMenu);
    },
    onSelectLogin:function(sender)
    {
        fr.view(ScreenLogin);
    },
    onSelectGoogleIAP:function(sender)
    {
        fr.view(ScreenGoogleIAP);
    },
    onSelectAppleIAP:function(sender)
    {
        fr.view(ScreenAppleIAP);
    },
    onSelectVideo:function()
    {
        fr.view(ScreenVideo);
    },
    onRestartGame:function()
    {
        fr.NativePortal.getInstance().restartVM();
    },
    onSelectDownload: function() {
        fr.view(ScreenDownload);
    },
});