/**
 * Created by KienVN on 5/22/2015.
 */
var fr = fr ||{};

if(cc.sys.isNative) {
    fr.OutPacket.extend = cc.Class.extend;
    fr.InPacket.extend = cc.Class.extend;
}
fr.onStart = function()
{
    fr.facebook.init();
    fr.google.init();
    fr.appleid.init();
};
fr.onLoggedIn = function()
{
    //khoi tao iap sau khi login
    fr.paymentInfo.loadInfo(function(result){
        if(result)
        {
            var iapProductList = [ "1A", "2A", "2B", "5A"];
            var listProductId = [];
            for(var i = 0; i < iapProductList.length; i++){
                listProductId.push(fr.paymentInfo.getProductID(iapProductList[i]));
            }

            fr.googleIap.init(fr.paymentInfo.getLicenseKey(), listProductId);
        }
    })
};