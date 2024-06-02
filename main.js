
var gv = gv || {};

var DESIGN_RESOLUTION_WIDTH = 1280;
var DESIGN_RESOLUTION_HEIGHT = 768;
cc.game.onStart = function () {
    if(!cc.sys.isNative) {
        if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
            document.body.removeChild(document.getElementById("cocosLoading"));
		 if(setEncryptKeys){
            setEncryptKeys(0x99999999, 0x99999999, 0x99999999, 0x99999999);
        }
        cc.loader.resPath = "res";
        cc.game.initScreen();
        cc.LoaderScene.preload(g_preload_resources, function () {
            cc.game.startGame();
        }, this);
    }else
    {
        cc.game.initScreen();
        cc.game.startGame();
    }
};
cc.game.initScreen = function()
{
    fr.onStart();
    cc.view.enableRetina(true);
    cc.view.adjustViewPort(true);
    cc.view.resizeWithBrowserSize(true);

    var frameSize = cc.view.getFrameSize();
    var ratio = frameSize.width / frameSize.height;
    if (ratio < 2) {
        cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH, DESIGN_RESOLUTION_HEIGHT, cc.ResolutionPolicy.FIXED_HEIGHT);
    } else {
        cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH, DESIGN_RESOLUTION_WIDTH / 2, cc.ResolutionPolicy.SHOW_ALL);
    }
    cc.director.setDisplayStats(true);
    //socket
    gv.gameClient = new GameClient();
    gv.poolObjects = new PoolObject();
    //modules

    //add search paths
    jsb.fileUtils.addSearchPath("res", true);
    jsb.fileUtils.addSearchPath(fr.NativeService.getFolderUpdateAssets() + "/res", true);
}
cc.game.startGame = function()
{
    // fr.view(ScreenHome);
    gameController = new GameController();
    // gameController.setCurScene(new cc.Scene());
    // gameController.addChild(new ScreenHome())
}
cc.game.run();