/**
 * Created by GSN on 9/30/2015.
 */

fr.facebook = {
    userId: "",
    userName: "",
    userAvatarUrl: "",
    loginSuccess: 2,
    pluginUser: null,
    accessToken: null,
    sessionKey: null,

    init:function(){
        this.callback = null;
        if(plugin.PluginManager == null)
            return false;
        this.pluginUser = plugin.PluginManager.getInstance().loadPlugin("UserFacebook");
        return true;
    },

    /**
     *
     * @param callback
     */
    login: function (callbackFunc) {
        var self = this;
        if(this.pluginUser.isLoggedIn()) {
            this.pluginUser.logout(function () {
                self._requestLogin(callbackFunc);
            });
        }
        else{
            self._requestLogin(callbackFunc);
        }
    },
    _requestLogin:function(callbackFunc)
    {
        this.pluginUser.login(function(result, response){
            if(result == plugin.ProtocolUser.UserActionResultCode.LOGIN_SUCCEED){
                var data = JSON.parse(response);
                var accessToken = data["accessToken"];
                callbackFunc(true, accessToken);
            }else{
                if(result != plugin.ProtocolUser.UserActionResultCode.LOGOUT_SUCCEED) {
                    var error = response;
                    callbackFunc(false, "fb:" + error);
                }
            }
        });
    },


    getFriendsPlayedGame:function(callbackFunc)
    {
        var url = "https://graph.facebook.com/v2.5/me/friends?fields=id,name,picture.width(160).height(160)&limit=1000&access_token=" + this.getAccessToken();
        fr.Network.requestJsonGet(url, function(result, response)
        {
            if(result)
            {
                callbackFunc(true, response.data);
            }else
            {
                callbackFunc(false, "");
            }
        });
    },
    getFriendsNotPlayGame:function(callbackFunc)
    {
        var url = "https://graph.facebook.com/v2.5/me/invitable_friends?fields=id,name,picture.width(160).height(160)&limit=500&access_token=" + this.getAccessToken();
        fr.Network.requestJsonGet(url, function(result, response)
            {
                if(result)
                {
                    callbackFunc(true, response.data);

                }else
                {
                    callbackFunc(false, "");
                }
            }
        );
    },

    inviteRequest: function (toFriend, message, callbackFunc, title) {
        if (!toFriend) {
            if (callbackFunc != undefined) {
                callbackFunc(false, "List friend empty!")
            }
            return;
        }

        if (title == undefined) {
            title = "invite_install_zingplay";
        }
        var map = {
            "message": message,
            "title": title,
            "to": toFriend
        };
        plugin.FacebookAgent.getInstance().appRequest(map, function (result, response) {
            if (result == plugin.FacebookAgent.CODE_SUCCEED) {
                callbackFunc(true, "Success!");
            }
            else {

                callbackFunc(false, "Failed!");
            }
        });
    },
    getDeepLink:function()
    {
        if(this.pluginUser)
        {
           return this.pluginUser.callStringFuncWithParam("getDeepLink");
        }
        return "";
    },
	sharePhoto: function (imgPath, callback)
    {
        var info = {
            "dialog": "sharePhoto",
            "photo": imgPath

        };

        plugin.FacebookAgent.getInstance().dialog(info, function(ret, msg){

            cc.log("msg = " + JSON.stringify(msg));
            if(ret == plugin.FacebookAgent.CODE_SUCCEED)
            {
                cc.log("share photo facebook success!");
                callback(true);
            }else
            {
                cc.log("share photo facebook failed! ");
                callback(false);
            }
        })
    },
};
