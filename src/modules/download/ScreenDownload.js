/**
 * Created by Cantaloupe on 5/17/2021.
 */
var ScreenDownload = cc.Layer.extend({
    _itemMenu: null,
    _beginPos: 0,
    isMouseDown: false,

    ctor: function () {
        this._super();
        var size = cc.director.getVisibleSize();

        var yBtn = 8 * size.height / 12;

        var btnDownloadGroup = gv.commonButton(230, 64, cc.winSize.width / 4, yBtn, "Download GUI");
        this.addChild(btnDownloadGroup);
        btnDownloadGroup.addClickEventListener(this.onSelectDownloadGroup.bind(this));

        var btnResetDownload = gv.commonButton(230, 64, cc.winSize.width / 2, yBtn, "Reset");
        this.addChild(btnResetDownload);
        btnResetDownload.addClickEventListener(this.onSelectResetDownload.bind(this));

        var btnBack = gv.commonButton(100, 64, size.width - 70, 52, "Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));

        fr.downloadMgr.init(); // put this line on cc.game.startAfterCheckUpdate in main.js
    },
    onEnter: function () {
        this._super();
    },
    onSelectBack: function (sender) {
        fr.view(ScreenMenu);
    },
    onSelectDownloadGroup: function(sender) {
        var groupName = "eventPopup";
        gv.showDL(groupName, function () {
            cc.log('download group "' + groupName + '" finish');
            // TODO: show GUI or whatever here
        }, this);
    },
    onSelectResetDownload: function (sender) {
        // hardcode for this test case only
        // do not use this function in production!
        try {
            var dst = fr.NativeService.getFolderUpdateAssets() + "/dwnld/";
            var assets_prefix = fr.NativeService.getFolderUpdateAssets() + "/";
            fr.download.deleteFile(dst + "res/download/group/eventPopup/x4IAP.png");
            fr.download.deleteFile(dst + "res/download/group/eventPopup/thang12abc.png");
            fr.download.deleteFile(dst + "res/download/group/eventPopup/popup.png");
            fr.download.deleteFile(assets_prefix + "lcldwnld.manifest");
            fr.downloadMgr.init();
        }
        catch (e) {
            cc.log('error');
        }
    },
});