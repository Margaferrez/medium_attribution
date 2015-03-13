(function(){

    var domain = "yourdomain.com"; // *MANDATORY* Changes the domain of the website
    var cookieSource = "trf_source"; // *Optional* Changes the name of the cookie storing the source
    var cookieMedium = "trf_medium"; // *Optional* Changes the name of the cookie storing the medium

    var NONE = "(none)";
    var DIRECT = "(direct)";
    // param: is the name of the parameter to find
    // trf_source: is the text you want to add to the trf_source cookie when comes from this referrer
    //             if the {'param':'#param_name'} defined instead of text, would find the value of the #param_name in the url
    // trf_medium: is the text you want to add to the trf_medium cookie when comes from this referrer
    //             if the {'param':'#param_name'} defined instead of text, would find the value of the #param_name in the url
    var parametersUrl = new Array(
        {'param':'gclsrc', 'trf_source':'Google','trf_medium':'Display'},
        {'param':'gclid', 'trf_source':'Google','trf_medium':'cpc'},
        {'param':'utm_source', 'trf_source': {'param':'utm_source'},'trf_medium':{'param':'utm_medium'}}
        //Add here more lines with all the parameters you want to track
    );
    // url: is the minimum part recognizable of the url to track, trf_source is the text
    // trf_source: is the text you want to add to the trf_source cookie when comes from this referrer
    // trf_medium: is the text you want to add to the trf_medium cookie when comes from this referrer
    var referrerUrls = new Array(
        {'url':'www.google', 'trf_source':'Google Search','trf_medium':'Organic'},
        {'url':'search.yahoo', 'trf_source':'Yahoo Search','trf_medium':'Organic'},
        {'url':'www.bing', 'trf_source':'Bing Search','trf_medium':'Organic'},
        {'url':'facebook.com', 'trf_source':'Facebook','trf_medium':'Social Media'},
        {'url':'twitter.com', 'trf_source':'Twitter','trf_medium':'Social Media'},
        {'url':'t.co', 'trf_source':'t.co','trf_medium':'Social Media'},
        {'url':'www.youtube.com', 'trf_source':'Youtube','trf_medium':'Social Media'},
        {'url':'instagram.com', 'trf_source':'Instagram','trf_medium':'Social Media'}
        //Add here more lines with all the websites you want to track
    );
    var referrer = document.referrer;

    domain = domain || window.location.hostname;

    function getCookie(cookieSource){
        var name = cookieSource + "=";
        var cookieArray = document.cookie.split(';'); //break cookie into array
        for(var i = 0; i < cookieArray.length; i++){
            var cookie = cookieArray[i].replace(/^\s+|\s+$/g, ''); //replace all space with '' = delete it
            if (cookie.indexOf(name) === 0){
                return cookie.substring(name.length,cookie.length); //
            }
        }
        return null;
    }

    function getURLParameter(param){
        var pageURL = window.location.search.substring(1); //get the query string parameters without the "?"
        var URLVariables = pageURL.split('&'); //break the parameters and values attached together to an array
        for (var i = 0; i < URLVariables.length; i++) {
            var parameterName = URLVariables[i].split('='); //break the parameters from the values
            if (parameterName[0] === param) {
                return parameterName[1];
            }
        }
        return null;
    }

    function setCookie(cookie, value){
        var expires = new Date();
        expires.setTime(expires.getTime() + 62208000000); //1000*60*60*24*30*24 (2 years)
        document.cookie = cookie + "=" + value + "; expires=" + expires.toGMTString() + "; domain=" + domain + "; path=/";
    }

    /*
     Remove the protocol for the referral token
     */
    function removeProtocol(href) {
        return href.replace(/.*?:\/\//g, "");
    }

    if(document.cookie.indexOf(cookieSource) === -1) {
        var traffic_source = "";
        var traffic_medium = "";
        //if we have a recognized parameter in the url
        for (var i = 0; i < parametersUrl.length ; i++ ) {
            if (getURLParameter(parametersUrl[i]['param']) !== null) {
                if (parametersUrl[i]['trf_source']['param'] !== undefined ) {
                    traffic_source = decodeURI(getURLParameter(parametersUrl[i]['trf_source']['param']));
                } else {
                    traffic_source = parametersUrl[i]['trf_source'];
                }
                if (parametersUrl[i]['trf_medium']['param'] !== undefined ) {
                    traffic_medium = decodeURI(getURLParameter(parametersUrl[i]['trf_medium']['param']));
                } else {
                    traffic_medium = parametersUrl[i]['trf_medium'];
                }
                continue;
            }
        }
        // if not and we have defined the referrer
        if (traffic_source === "") {
            if(referrer !== ""){
                var referrerHostName = removeProtocol(referrer);
                for (var i = 0; i < referrerUrls.length ; i++) {
                    var referrerName = referrerUrls[i]['url'];
                    if(referrerHostName.indexOf(referrerName) > -1){
                        traffic_source = referrerUrls[i]['trf_source'];
                        traffic_medium = referrerUrls[i]['trf_medium'];
                        continue;
                    }
                }
                if (traffic_source === "") {
                    traffic_source = referrerHostName;
                    traffic_medium = "Referral";
                }
            } else { //any other case
                traffic_source = DIRECT;
                traffic_medium = NONE;
            }
        }
        setCookie(cookieSource, traffic_source);
        setCookie(cookieMedium, traffic_medium);
    }
})();