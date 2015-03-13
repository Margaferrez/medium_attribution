# medium_attribution
The main idea of this script is to create two cookies, one with the medium and the other with the referrer, that can be used in GA or other Analytics Tool.

The logic of this script is created by Xavi Colomés.(https://twitter.com/xavier_colomes)

We've used as a base this other script https://github.com/dm-guy/utm-alternative.


#How it works
It finds the medium of the referrer and saves the values in two different cookies.
These values can be:
```
medium: Display source: Google
medium: cpc source: Google
medium: *parameter utm_medium source: *parameter utm_source
medium: Organic  sources: Google Search, Yahoo Search, Bing Search
medium: Social Media sources: Facebook, Twitter, t.co, Youtube, Instagram 
medium: (direct)
```


#Starting
It's created with pure Javascript, so no library dependencies.
Before start using it you need to adapt some values to your website:
```
var domain = "yourdomain.com";
```
If you don't change here the domain of the website you are tracking, the cookies won't be created.

If you use a tag manager or are pasting the code directly, wrap the code with `<script></script>` tags

#Adapting

The name of the cookies can be changed:
```
    var cookieSource = "trf_source"; 
    var cookieMedium = "trf_medium";
```

To add more parameter tracking, add more lines in this array:
```
var parametersUrl = new Array(
        {'param':'gclsrc', 'trf_source':'Google','trf_medium':'Display'},
        {'param':'gclid', 'trf_source':'Google','trf_medium':'cpc'},
        {'param':'utm_source', 'trf_source': {'param':'utm_source'},'trf_medium':{'param':'utm_medium'}}
        //Add here more lines with all the parameters you want to track
    );
```
with this options:
- param: is the name of the parameter to find
- trf_source: is the text you want to add to the trf_source cookie when comes from this referrer
  * if the {'param':'#param_name'} defined instead of text, would find the value of the #param_name in the url
- trf_medium: is the text you want to add to the trf_medium cookie when comes from this referrer
  * if the {'param':'#param_name'} defined instead of text, would find the value of the #param_name in the url


To add more referrers, add more lines in this array:
```
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
```
with this options:
- url: is the minimum part recognizable of the url to track, trf_source is the text
- trf_source: is the text you want to add to the trf_source cookie when comes from this referrer
- trf_medium: is the text you want to add to the trf_medium cookie when comes from this referrer


