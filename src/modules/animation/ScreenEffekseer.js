/**
 * Created by KienVN on 8/22/2019.
 */
var ScreenEffekseer = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();


        var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));

        this.scheduleUpdate();

        this._manager =  efk.EffectManager.create(cc.winSize);
        this._count = 0;
    },
    onSelectBack:function(sender)
    {
        fr.view(ScreenAnimationMenu);
    },
    update:function(dt)
    {
        if (this._count % 300 == 0)
        {
            var effect = efk.Effect.create("res/Laser01.efk", 13.0);
            if (effect)
            {
                var emitter = efk.EffectEmitter.create(this._manager);
                emitter.setEffect(effect);
                emitter.setPlayOnEnter(true);
                emitter.setRotation3D(cc.math.vec3(0, 90, 0));
                emitter.setPosition(cc.p(320, 150));

                // emitter->setScale(13);
                this.addChild(emitter, 0);
            }
        }

        // Effect2
        if (this._count % 300 == 120)
        {

            var effect = efk.Effect.create("res/Homing_Laser01.efk");
            if (effect)
            {

                var emitter = efk.EffectEmitter.create(this._manager);
                emitter.setEffect(effect);
                emitter.setPlayOnEnter(true);

                emitter.setPosition(cc.p(320, 150));
                emitter.setScale(4);
                this.addChild(emitter, 0);

                emitter.setTargetPosition(cc.math.vec3(320, 480, 0));

            }
        }

        this._manager.update();

        this._count++;

    }
});