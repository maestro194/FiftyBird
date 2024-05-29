/**
 * Created by GSN on 9/30/2015.
 */

fr.appleid = {
    pluginUser:null,
    /***
     *
     * @returns {boolean}
     */
    init:function()
    {
        if(plugin.PluginManager == null)
            return false;
        if(this.pluginUser == null) {
            var pluginManager = plugin.PluginManager.getInstance();
            this.pluginUser = pluginManager.loadPlugin("AppleID");
            var data = {
            };
            if(this.pluginUser != null) {
                this.pluginUser.configDeveloperInfo(data);
            }
        }
        return true;
    },
    /***
     *
     * @param callback
     */
    login:function(callback)
    {
        cc.log("appleid login");
        if(!this.pluginUser)
        {
            callback(false,"");
            return;
        }
        var self = this;
        this.pluginUser.login(function (result, msg) {
            if(result == 0) {
                cc.log(msg);
                cc.log(self.getFullName());
                cc.log(self.getUserID());
                callback(true, msg);
            }
            else{
            }
        });

    },
    getUserID:function()
    {
        if(this.pluginUser != null)
        {
           return this.pluginUser.callStringFuncWithParam("getUserID");
        }

        return "";
    },
    getFullName:function()
    {
        if(this.pluginUser != null)
               {
                  return this.pluginUser.callStringFuncWithParam("getFullName");
               }

               return "";
    }

};
