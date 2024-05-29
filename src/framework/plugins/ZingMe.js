/**
 * Created by GSN on 9/29/2015.
 */

zingmeHostUrlPrivate = "https://118.102.3.28:456"; // private
zingmeHostUrlLive = "https://52.76.245.162:443"; // live
myplayUrlLogin = "https://myplay.apps.zing.vn/sso3/login.php?";
myplayUrlRegister = "https://myplay.apps.zing.vn/sso3/register.php?";


ZM_LOGIN_RESPONSE = {
    SUCCESS: 0,
    USER_OR_PASS_WRONG: 4,
    SPECIAL_KEY: 1,
    NOT_ENOUGH_AGE:20,
    OTHER_ERROR:101
};

ZM_SIGNUP_RESPONSE = {
    SUCCESS: 0,
    TOO_MANY_TIMES: -5,
    EXISTED_NAME: 5,
    SPECIAL_KEY: 7,
    INVALID_USERNAME:6,
    ERROR_NO_NETWORK:102
};

fr.zingme = {
    login:function(gameIdZMe, secretKeyZMe, userName, password, callback){
		userName = userName.toLowerCase();
        var md5Pass = CryptoJS.MD5(password);
        var mac = md5(gameIdZMe+userName+md5Pass+secretKeyZMe);
        var args = "gameId=" + gameIdZMe + "&username=" + userName + "&password=" + md5Pass + "&v=2" + "&mac=" +mac;
        fr.Network.xmlHttpPostForm(myplayUrlLogin,args, function(result, response){
            if(result)
            {
                var data = JSON.parse(response);
                if(data) {
                        callback(data["error"], data["sessionKey"]);
                }else{
                    callback(ZM_LOGIN_RESPONSE.OTHER_ERROR);
                }
            }
            else
            {
                callback(ZM_LOGIN_RESPONSE.OTHER_ERROR);
            }
        });
    },

    register:function(userName, password, callbackFunc){

    }
};