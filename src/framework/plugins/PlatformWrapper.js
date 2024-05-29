/**
 * Created by KienVN on 10/23/2015.
 */

fr.platformWrapper = {
    init:function()
    {
        if(plugin.PluginManager == null) return false;
        if(fr.platformWrapper.pluginPlatform == null) {
            var pluginManager = plugin.PluginManager.getInstance();
            fr.platformWrapper.pluginPlatform = pluginManager.loadPlugin("PlatformWrapper");
        }
        return true;
    },

    getPhoneNumber:function()
    {
        if(this.pluginPlatform != null)
        {
           return this.pluginPlatform.callStringFuncWithParam("getPhoneNumber");
        }

        return "";
    },

    getMailAccount:function()
    {
        if(this.pluginPlatform != null) {
            return this.pluginPlatform.callStringFuncWithParam("getMailAccount");
        }
        return "";
    },

    getDeviceModel:function()
    {
        if(this.pluginPlatform != null) {
            return this.pluginPlatform.callStringFuncWithParam("getDeviceModel");
        }
        return "";
    },

    getAvailableRAM:function()
    {
        if(this.pluginPlatform != null) {
            return this.pluginPlatform.callIntFuncWithParam("getAvailableRAM");
        }
        return -1;
    },

    getVersionCode:function() {
        if(this.pluginPlatform != null) {
            return this.pluginPlatform.callIntFuncWithParam("getVersionCode");
        }
        return -1;
    },

    getOSVersion:function() {
        if(this.pluginPlatform != null) {
            return this.pluginPlatform.callStringFuncWithParam("getOSVersion");
        }
        return "";
    },
    //connection type 0: ko co mang, 1: 3g, 2: wifi
    getConnectionStatus:function() {
        if(this.pluginPlatform != null) {
            return this.pluginPlatform.callIntFuncWithParam("getConnectionStatus");
        }
        return -1;
    },

    hasNetwork: function(){
        if(fr.platformWrapper.getConnectionStatus() == CONNECTION_STATUS.NO_NETWORK){
            return false;
        }
        else return true;
    },

    getConnectionStatusName:function() {
        var connectionType =  this.getConnectionStatus();
        switch (connectionType) {
            case 0:
                return "unknown";
            case 1:
                return "3g";
            case 2:
                return "wifi";
        }
        return "";
    },

    getOsName:function() {
        if(sys.platform == sys.WIN32) {
            return "Win32";
        }
        if(sys.platform == sys.ANDROID) {
            return "Android";
        }
        if(sys.platform == sys.IPAD || sys.platform == sys.IPHONE) {
            return "IOS";
        }
        if(sys.platform == sys.WP8) {
            return "WindowPhone8";
        }
        return "";
    },

    getClientVersion:function() {
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callStringFuncWithParam("getAppVersion");
        }
        return "1.0";
    },
	
    getExternalDataPath:function() {
        if(this.pluginPlatform != null) {
            return this.pluginPlatform.callStringFuncWithParam("getExternalDataPath");
        }
        return jsb.fileUtils.getWritablePath();
    },

    addNotify:function(notify) {
        if(this.pluginPlatform != null) {
            this.pluginPlatform.callFuncWithParam("addNotify",
               new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(notify)));
        }
    },

    showNotify:function() {
        if(this.pluginPlatform != null) {
            this.pluginPlatform.callFuncWithParam("showNotify" ,null);
        }
    },

    cancelAllNotification:function() {
        if(this.pluginPlatform != null) {
            this.pluginPlatform.callFuncWithParam("cancelAllNotification",null);
        }
    },

    getDeviceID:function() {
        if(this.pluginPlatform != null) {
            var deviceID =  this.pluginPlatform.callStringFuncWithParam("getDeviceID");
            if(deviceID == "")
            {
                return this.getMailAccount();
            }
            return deviceID;
        }
        return "";
    },

    //accountType: google , zingme , facebook , zalo
    //openAccount: socialID, voi zingme la username
    trackLoginGSN:function(_accountId, _accountType, _openAccount, _zingName) {
        if(this.pluginPlatform != null) {
            var data = {
                accountId: _accountId,
                accountType: _accountType,
                openAccount: _openAccount,
                zingName: _zingName
            };

            this.pluginPlatform.callFuncWithParam("trackLoginGSN",
               new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }else{
            cc.error("trackLoginGSN-pluginPlatform is null");
        }
    },

    //zalo uri = "com.zing.zalo";
    isInstalledApp:function(url) {
        if(this.pluginPlatform != null) {
            return this.pluginPlatform.callIntFuncWithParam("isInstalledApp",
               new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, url));
        }
        return 0;
    },



    isInstalledFacebookApp:function() {
        if(this.isAndroid()){
            return this.isInstalledApp("com.facebook.katana");
        }
        else if(this.isIOs()){
            return true;
        }

        return false;
    },

    isInstalledZaloApp:function() {
        if(this.isAndroid()){
            return this.isInstalledApp("com.zing.zalo");
        }
        else if(this.isIOs()){
            return true;
        }
        return false;
    },

    getSimOperator: function(){
        if(this.isAndroid()){
            if(this.pluginPlatform != null) {
                return this.pluginPlatform.callStringFuncWithParam("getSimOperator").toLowerCase();
            }
        }
        else if(this.isIOs()){
            return "";
        }

        return "";
    },

    getNetworkOperator: function(){
        if(this.isAndroid()){
            if(this.pluginPlatform != null) {
                return this.pluginPlatform.callStringFuncWithParam("getNetworkOperator").toLowerCase();
            }
        }
        else if(this.isIOs()){
            return "";
        }

        return "";
    },

    getSimState: function(){
        if(this.isAndroid()){
            if(this.pluginPlatform != null) {
                return this.pluginPlatform.callIntFuncWithParam("getSimState");
            }
        }
        else if(this.isIOs()){
            return SIM_STATE.READY;
        }

        return 0;
    },
    getTotalUpdateAssetMemorySize:function()
    {
        if(this.isMobile()){
            if(this.pluginPlatform != null) {
                return this.pluginPlatform.callIntFuncWithParam("getTotalUpdateAssetMemorySize");
            }
        }
        return -1;
    },
    getAvailableUpdateAssetMemorySize:function()
    {
        if(this.isMobile()){
            if(this.pluginPlatform != null) {
                return this.pluginPlatform.callIntFuncWithParam("getAvailableUpdateAssetMemorySize");
            }
        }
        return -1;
    },
    getAvailableInternalMemorySize: function(){
        if(this.isAndroid()){
            if(this.pluginPlatform != null) {
                return this.pluginPlatform.callIntFuncWithParam("getAvailableInternalMemorySize");
            }
        }
        else if(this.isIOs()){
            return null;
        }

        return -1;
    },

    getTotalInternalMemorySize: function(){
        if(this.isAndroid()){
            if(this.pluginPlatform != null) {
                return this.pluginPlatform.callIntFuncWithParam("getTotalInternalMemorySize");
            }
        }

        return -1;
    },

    getAvailableExternalMemorySize: function(){
        if(this.isAndroid()){
            if(this.pluginPlatform != null) {
                return this.pluginPlatform.callIntFuncWithParam("getAvailableExternalMemorySize");
            }
        }
        else if(this.isIOs()){
            return null;
        }

        return -1;
    },

    getTotalExternalMemorySize: function(){
        if(this.isAndroid()){
            if(this.pluginPlatform != null) {
                return this.pluginPlatform.callIntFuncWithParam("getTotalExternalMemorySize");
            }
        }
        else if(this.isIOs()){
            return null;
        }

        return 1;
    },
    getPackageName:function()
    {
        if(this.pluginPlatform)
        {
            return this.pluginPlatform.callStringFuncWithParam("getPackageName");
        }
        return null;
    },
	sendSMS:function(content, serviceNumber)
    {
        if(this.pluginPlatform != null)
        {
            var data = {
                message:content,
                recipent:serviceNumber
            };
            this.pluginPlatform.callFuncWithParam("sendMessage",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }
    },
	share:function(title, msg)
    {
        if(this.pluginPlatform != null)
        {
            var data = {
                msg:msg,
                title:title
            };
            this.pluginPlatform.callFuncWithParam("share",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }
    },
	copy2Clipboard:function(label, text)
    {
        if(this.pluginPlatform != null)
        {
            var data = {
                text:text,
                label:label
            };
            this.pluginPlatform.callFuncWithParam("copy2Clipboard",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }
    },
	isAndroid: function() {
        return sys.os === sys.OS_ANDROID;
    },
    isIOs: function() {
        return sys.os === sys.OS_IOS;
    },
	isMobile: function(){
        return sys.os === sys.OS_ANDROID || sys.os === sys.OS_IOS || sys.os === sys.OS_WP8 || sys.os === sys.OS_WINRT;
    },
};

var SIM_STATE = {
    UNKNOWN: 0,
    ABSENT: 1,
    PIN_REQUIRED:2,
    PUK_REQUIRED: 3,
    NETWORK_LOCKED: 4,
    READY: 5,
};

var CONNECTION_STATUS = {
    NO_NETWORK: 0,
    CELULAR_DATA: 1,
    WIFI: 2
};