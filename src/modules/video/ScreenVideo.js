/**
 * Created by KienVN on 10/22/2019.
 */
var ScreenVideo = cc.Layer.extend({
    _itemMenu: null,
    _beginPos: 0,
    isMouseDown: false,

    ctor: function () {
        this._super();
        var size = cc.director.getVisibleSize();

        var yBtn = 8 * size.height / 12;

        var btnPlay = gv.commonButton(200, 64, cc.winSize.width / 4, yBtn, "Play");
        this.addChild(btnPlay);
        btnPlay.addClickEventListener(this.onSelectPlayVideo.bind(this));

        var video = new ccui.VideoPlayer("http://benchmark.cocos2d-x.org/cocosvideo.mp4");
        video.setContentSize(320, 240);
        video.setPosition(800/2, 450/2);
        video.setScale(0.5);
        window.video = video;
        this.video = video;
        this.addChild(video);

        video.setEventListener(ccui.VideoPlayer.EventType.PLAYING, function(sender){
            cc.log("VideoPlayer PLAYING");
        });
        video.setEventListener(ccui.VideoPlayer.EventType.PAUSED, function(sender){
            cc.log("VideoPlayer PAUSED");
        });
        video.setEventListener(ccui.VideoPlayer.EventType.STOPPED, function(sender){
            cc.log("VideoPlayer STOPPED");
        });
        video.setEventListener(ccui.VideoPlayer.EventType.COMPLETED, function(sender){
            cc.log("VideoPlayer COMPLETED");
        });

        ccui.VideoPlayer.EventType = {
            PLAYING: "play",
            PAUSED: "pause",
            STOPPED: "stop",
            COMPLETED: "complete"
        };

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
    onSelectPlayVideo: function (sender) {
        this.video.setURL("http://benchmark.cocos2d-x.org/cocosvideo.mp4");
        this.video.play();
    }

});