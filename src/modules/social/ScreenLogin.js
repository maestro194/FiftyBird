/**
 * Created by KienVN on 2/12/2019.
 */
var ScreenLogin = cc.Layer.extend({
    _itemMenu: null,
    _beginPos: 0,
    isMouseDown: false,

    ctor: function () {
        this._super();
        var size = cc.director.getVisibleSize();

        var yBtn = 8 * size.height / 12;

        var btnFacebook = gv.commonButton(200, 64, cc.winSize.width / 4, yBtn, "Facebook");
        this.addChild(btnFacebook);
        btnFacebook.addClickEventListener(this.onSelectLoginFacebook.bind(this));

        var btnGoogle = gv.commonButton(200, 64, cc.winSize.width / 2, yBtn, "Google");
        this.addChild(btnGoogle);
        btnGoogle.addClickEventListener(this.onSelectLoginGoogle.bind(this));

        var btnZingMe = gv.commonButton(200, 64, 3 * cc.winSize.width / 4, yBtn, "ZingMe");
        this.addChild(btnZingMe);
        btnZingMe.addClickEventListener(this.onSelectLoginZingMe.bind(this));

        yBtn = size.height / 3;
        var btnShareFB = gv.commonButton(200, 64, 1 * cc.winSize.width / 4, yBtn, "Share FB");
        this.addChild(btnShareFB);
        btnShareFB.addClickEventListener(this.onSelectShareFacebook.bind(this));

        var btnAppleId = gv.commonButton(200, 64, 2 * cc.winSize.width / 4, yBtn, "AppleID");
        this.addChild(btnAppleId);
        btnAppleId.addClickEventListener(this.onSelectLoginAppleID.bind(this));

        var lblToken = gv.commonText("", cc.winSize.width / 2, size.height / 3);
        this.addChild(lblToken);
        lblToken.setVisible(false);

        this._lblToken = lblToken;

        var btnBack = gv.commonButton(100, 64, size.width - 70, 52, "Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));
    },
    onEnter: function () {
        this._super();
    },
    onSelectBack: function (sender) {
        fr.view(ScreenMenu);
    },
    onSelectLoginFacebook: function (sender) {
        fr.facebook.login(this.onLoginResult.bind(this))
    },
    onSelectLoginGoogle: function (sender) {
        fr.google.login(this.onLoginResult.bind(this))
    },
    onSelectLoginZingMe: function (sender) {
        var gameIdZMe = 'put here';
        var secretKeyZMe = 'put here';
        fr.zingme.login(gameIdZMe, secretKeyZMe, 'simo24', 'handoi', this.onLoginResult.bind(this));
    },
    onSelectLoginAppleID:function(){
        fr.appleid.login(this.onLoginResult.bind(this))
    },
    onSelectShareFacebook: function (sender)
    {
        var texture = new cc.RenderTexture(cc.winSize.width, cc.winSize.height);
        texture.begin();
        cc.director.getRunningScene().visit();
        texture.end();

        var fileName = 'share.jpg';
        var imgPath = jsb.fileUtils.getWritablePath();

        if(imgPath.length == 0)
        {
            cc.log("capture failed!");
            return;
        }
        var result = texture.saveToFile(fileName, cc.IMAGE_FORMAT_JPEG);
        if(result)
        {
            imgPath += fileName;
            // WinRT accept only backslashes -> replace all forward slashes
            if  (cc.sys.platform == cc.sys.WINRT || cc.sys.platform == cc.sys.WP8) {
                imgPath = imgPath.replace(/\//g, "\\");
            }
            setTimeout(function(){
                fr.facebook.sharePhoto(imgPath, function(result){
                    cc.log("share facebook result: ", result);
            });},100);
        }
    },
    onLoginResult:function(result, msg)
    {
        this._lblToken.setVisible(true);
        if(result == true || result == ZM_LOGIN_RESPONSE.SUCCESS)
        {
            this._lblToken.setString(msg);

        }else
        {
            this._lblToken.setString("Failed!");
        }

    }

});