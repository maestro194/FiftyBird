/**
 * Created by bachbv on 1/20/2016.
 */

fr.iosiap = {
    pluginIAP: null,
    serverMode: false,
    
    init:function(){
        this.callback = null;
        if(plugin.PluginManager == null) return false;
        
        if(fr.iosiap.pluginIAP == null) {
            var pluginManager = plugin.PluginManager.getInstance();
            fr.iosiap.pluginIAP = pluginManager.loadPlugin("IOSIAP");
            fr.iosiap.pluginIAP.setListener(fr.iosiap);

            fr.iosiap.requestProducts();
        }
        return true;
    },

    
    requestProducts: function(){
        var productIdList = ["pack_1", "pack_2", "pack_3", "pack_4", "pack_5", "pack_6"];
        this.pluginIAP.callFuncWithParam("requestProducts", plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, productIdList.toString()));
    },
    
    finishTransactions: function(listTrans){
        if(listTrans){
            var numOfXu = 0;
            var pack = null;
            for(var i = 0; i < listTrans.length; ++i){
                if(listTrans[i].productId && listTrans[i].productId.length > 0){
                    ZLog.debug("--> Transaction for product: %s - quantity: %d", listTrans[i].productId, listTrans[i].quantity);
                    this.pluginIAP.callFuncWithParam("finishTransaction", plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, listTrans[i].productId));

                    pack = resourceMgr.getConfigIAPPackByProductId(listTrans[i].productId);
                    if(pack){
                        numOfXu += pack.xu;
                    }
                }
            }
            
            if(numOfXu > 0){
                moduleMgr.getPlayerModule().addXu(numOfXu);
                var content = {text: languageMgr.getString("NOTIFICATION_RECEIVED_XU").replace("@xu", Utility.formatMoneyFull(numOfXu, ""))};

                Popups.show(content, [{btnName: 'ok', hide: true}]);
            }
        }
    },
    
    payForProduct: function(productId){
        if(this.pluginIAP){
            var paramMap = {};
            paramMap["productId"] = productId;
            this.pluginIAP.payForProduct(paramMap);
        }
    },
    
    onPayResult: function (ret, receipt, productInfo) {
        if(ret == plugin.ProtocolIAP.PayResultCode.PaySuccess){
            ZLog.debug("iosiap onPayResult PaySuccess");
            
            // send receipt to game server
            if(receipt && receipt.length > 0){
                moduleMgr.getPaymentModule().sendIAPIOS(receipt);
            }
            else{
                ZLog.debug("iosiap onPayResult receipt is empty");
            }
        }
        else{
            sceneMgr.hideGUIWaiting();

            if(ret == plugin.ProtocolIAP.PayResultCode.PayFail){
                ZLog.debug("iosiap onPayResult PayFail");
            }
            else if(ret == plugin.ProtocolIAP.PayResultCode.PayCancel){
                ZLog.debug("iosiap onPayResult PayCancel");
            }
            else if(ret == plugin.ProtocolIAP.PayResultCode.PayTimeOut){
                ZLog.debug("iosiap onPayResult PayTimeOut");
            }
        }
    },
    
    onRequestProductsResult: function(ret, productInfo){
        if(ret == plugin.ProtocolIAP.RequestProductCode.RequestFail){
            ZLog.debug("iosiap onRequestProductsResult fail");
        }
        else if(ret == plugin.ProtocolIAP.RequestProductCode.RequestSuccess){
            ZLog.debug("iosiap onRequestProductsResult success");
        }
        else{
            ZLog.debug("iosiap onRequestProductsResult code = %d", ret);
        }
    },
};