/**
 * Created by Cantaloupe on 9/5/2017.
 * Imagine there's no heaven
 * Easy if you try
 * No hell below us
 * Above us only sky
 */

var LayerDL = cc.Layer.extend({
    ctor: function () {
        this._super();
        var json = ccs.load("res/zcsd/NodeLoading.json", "");
        this._rootNode = json.node;
        // this._rootNode.setContentSize(cc.winSize);
        this._rootNode.setCascadeOpacityEnabled(true);
        ccui.helper.doLayout(this._rootNode);
        this.addChild(this._rootNode);

        this.bg = this._rootNode.getChildByName("panelBg");
        // this.effLoading = gv.createAnimationById(resAniId.sandclock, this);
        // this.bg.getChildByName("node_eff").addChild(this.effLoading);
        // this.effLoading.gotoAndPlay("run");
        this.lbl_loading = this.bg.getChildByName("lang_dynamic_loading");
        this.btnCancel = this.bg.getChildByName("btn_cancel");
        this.btnCancel.addClickEventListener(this.onCancel.bind(this));

        this.lbl_num_file = this.bg.getChildByName("lbl_num_file");
        this.lbl_num_file.setString("");
        this.numDot = 0;

        this.lblLoading = gv.commonText(fr.Localization.text("lang_dynamic_loading"), 0, cc.winSize.height * 0.1);
        this.addChild(this.lblLoading);

        this.lblNumFile = gv.commonText("", 0, 0);
        this.addChild(this.lblNumFile);
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
        gv.layerDL = null;
    },
    onCancel: function () {
        gv.hideDL();
    },
    show: function (parent) {
        this.numDot = 0;
        parent.addChild(this);
        this.setName("LayerDL");
        this.btnCancel.setVisible(false);
        this.showDownloadingText();
        this.countdownShowBtnCancel();
    },

    showNumFileDownloading: function(){
        var downloadProgress = gv.layerDL.numDownloaded + "/" + gv.layerDL.numFileTotal;
        downloadProgress += gv.layerDL.numFileTotal > 1 ? " files" : "file";
        this.lblNumFile.setString (downloadProgress);
        //this.lbl_num_data.setString (downloadProgress.numDataFinished + "/" + downloadProgress.numDataTotal + " size");
    },

    onFinishOneFile: function (){
        gv.layerDL.numDownloaded ++;
        this.showNumFileDownloading();
    },

    showDownloadingText: function () {
        var showTexDownloading = cc.sequence(
            cc.delayTime(0.4),
            cc.callFunc(this.updateDownloadingText.bind(this))
        ).repeatForever();
        this.runAction(showTexDownloading);
    },

    updateDownloadingText: function () {
        this.numDot++;
        var string = "";
        if (this.numDot > 3)
            this.numDot = 0;
        for (var i = 0; i < this.numDot; ++i) {
            string += ".";
        }
        this.lblLoading.setString(fr.Localization.text("lang_dynamic_loading") + string);
    },

    countdownShowBtnCancel: function () {
        this.runAction(cc.sequence(
            cc.delayTime(3.0),
            cc.callFunc(this.showBtnCancel.bind(this))
        ));
    },

    showBtnCancel: function () {
        this.btnCancel.setVisible(true);
        this.btnCancel.setOpacity(0);
        this.btnCancel.runAction(cc.fadeIn(1));
    },
    hide: function () {
        this.removeFromParent();
    }
});

gv = gv || {};
gv.showDL = function (group, callback, parent) {
    if(fr.downloadMgr.isNotSupportDownload()){
        callback();
        return;
    }
    cc.log("download folder " + group);
    var numFiles = fr.downloadMgr.getNumFileInGroup(group);
    if (numFiles < 0) {
        return;
    }
    gv.layerDL = new LayerDL();
    gv.layerDL.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
    gv.layerDL.show(parent);

    var onDownloadResult = function(group, result){
        cc.log("result: " + "group:" + group + "    result:" + result);
        switch (result){
            case DOWNLOAD_ERROR.SUCCESS:
                if (gv.layerDL != null) {
                    gv.hideDL();
                    callback();
                }
                break;
            case DOWNLOAD_ERROR.FAILED:
                if (gv.layerDL != null) {
                    gv.hideDL();
                }
                break;
            case DOWNLOAD_ERROR.FINISH_ONE_FILE:
                if (gv.layerDL != null) {
                    gv.layerDL.onFinishOneFile();
                }
                break;
            default :
                break;
        }
    };
    gv.layerDL.numDownloaded = 0;
    gv.layerDL.numFileTotal = numFiles;//fr.downloadMgr.getNumFileInGroup(group);
    gv.layerDL.showNumFileDownloading();
    fr.downloadMgr.downloadGroup(group, onDownloadResult);
};

gv.hideDL = function () {
    if (gv.layerDL == null) {
        return;
    }
    gv.layerDL.hide();
    gv.layerDL = null;
};