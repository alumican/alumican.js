var alm;
(function (alm) {
    var util;
    (function (util) {
        var GoogleMapsUtil = (function () {
            function GoogleMapsUtil() {
            }
            GoogleMapsUtil.loadScript = function (apiKey) {
                return new Promise(function (resolve, reject) {
                    var callbackName = 'googleMapsScriptInitializedHandler_' + (new Date()).getTime();
                    window[callbackName] = function () {
                        delete window[callbackName];
                        resolve();
                    };
                    var script = document.createElement('script');
                    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=' + callbackName;
                    script.setAttribute('async', true);
                    script.setAttribute('defer', true);
                    document.body.appendChild(script);
                });
            };
            return GoogleMapsUtil;
        }());
        util.GoogleMapsUtil = GoogleMapsUtil;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
