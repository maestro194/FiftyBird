
var ScreenTimelineFX = cc.Layer.extend({
    ctor:function() {
        this._super();

        this.initControls();
    },
    onEnter:function(){
        this._super();
        //load effects
        this.preloadEffects();
        //play effects

    },
    onEnterTransitionDidFinish:function()
    {
        this._super();
        this.playAndAutoRemoved();
    },
    onExit:function()
    {
        this._super();
        tlfx.CCEffectsLibrary.getInstance().ClearAll();
    },

    preloadEffects:function(){
        tlfx.CCEffectsLibrary.getInstance().Load("res/tlfx/demo");
    },

    playAndAutoRemoved:function(){
        var effect = tlfx.EffectRenderer.createWithName("Flash In");
        if (effect) {
            effect.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
            effect.setAutoRemoveOnFinish(true);
            this.addChild(effect, 0);
        }else{
            cc.error("Effect not found!");
        }
    },
    playAndQueued:function(){
        if(!this._effPool){
            this._effPool = [];
        }

        for( var i = 0; i < 10; i++){
            var effect = this.getEffectFromQueue();
            var delta = (cc.random0To1() - 0.5)* 200;
            effect.setPosition(cc.p(cc.winSize.width/2 + delta, cc.winSize.height/2 + delta));
            this.addChild(effect, 0);
            effect.start();
            var self = this;
            effect.setCompleteListener(function (eff) {
                cc.log("Complete", self._effPool.length);
                self.putEffectFromQueue(eff);
                eff.removeFromParent();
                cc.log("Complete2", self._effPool.length);

            });
            effect.release();
        }

    },
    getEffectFromQueue:function(){
        var efk;
        if(this._effPool.length > 0)
        {
            return this._effPool.shift();
        }else{
            efk = tlfx.EffectRenderer.createWithName("New Super Effect");
            efk.retain();
        }
        return efk;
    },
    putEffectFromQueue:function(efk){
        efk.retain();
        this._effPool.push(efk);
    },

    initControls:function(){
        var size = cc.director.getVisibleSize();

        var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));

        var self = this;
        var btnPlayQueue = gv.commonButton(100, 64, size.width/2 -240, 52,"Play queue");

        this.addChild(btnPlayQueue);
        btnPlayQueue.addClickEventListener(function () {
            self.playAndQueued();
        });
    },
    onSelectBack:function(sender)
    {
        fr.view(ScreenAnimationMenu);
    },
});