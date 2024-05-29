
fr.googleIap = {

    init:function (licenseKey, listProductId) {
        if (plugin.PluginManager != undefined) {
            var pluginManager = plugin.PluginManager.getInstance();
            if (pluginManager != null) {
                this.plugin = pluginManager.loadPlugin("IAPGooglePlay");
                if (this.plugin) {
                    this.plugin.setListener(this);
					
					this.plugin.configDeveloperInfo({
						listProductId: listProductId.join("|"),
						GooglePlayAppKey: licenseKey
					});

                }
            }
        }
    },
    requestPayProduct: function(productKey){
		var productId = fr.paymentInfo.getProductID(productKey);
        if(this.plugin){
            var paramMap = {};
            paramMap["IAPId"] = productId;
            paramMap["IAPSecKey"] = fr.paymentInfo.getLicenseKey();
            this.plugin.payForProduct(paramMap);
			return true;
        }
		return false;
    },

    onPayResult: function (ret, msg) {

        if(ret == -1){
            return;
        }

        if(ret == plugin.ProtocolIAP.PayResultCode.PaySuccess){

            if(msg && msg.length > 0){
                var data = JSON.parse(msg);
				//Send receipt data to server
                //gv.gameClient.sendValidateGoogleReceipt(JSON.stringify(data.purchaseData), data.signature);
            }
            else{
               
            }
        }
        else{
            if(ret == plugin.ProtocolIAP.PayResultCode.PayFail){

            }
            else if(ret == plugin.ProtocolIAP.PayResultCode.PayCancel){

            }
            else if(ret == plugin.ProtocolIAP.PayResultCode.PayTimeOut){

            }
        }
    },

    finishTransactions:function(purchaseData, signature)
    {
        if(purchaseData){
            if(purchaseData.productId === undefined) {
                return;
            }
            // send to finish purchase
            var data = {
                purchaseData: purchaseData,
                signature: signature
            };
            if(this.plugin){
                this.plugin.callFuncWithParam("consumePurchase",
                    plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
            }
        }
    },
    getProductLocalCurrencyById:function(productKey)
    {
        var productId = fr.paymentInfo.getProductID(productKey);
        if(this.plugin) {
            return this.plugin.callStringFuncWithParam("getProductLocalCurrencyById",
                plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, productId));
        }
    }
};
