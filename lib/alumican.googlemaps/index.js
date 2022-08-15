var alm;
(function (alm) {
    var util;
    (function (util) {
        class GoogleMapsUtil {
            static loadScript(apiKey) {
                return new Promise((resolve, reject) => {
                    const callbackName = 'googleMapsScriptInitializedHandler_' + (new Date()).getTime();
                    window[callbackName] = () => {
                        delete window[callbackName];
                        resolve();
                    };
                    const script = document.createElement('script');
                    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=' + callbackName;
                    script.setAttribute('async', true);
                    script.setAttribute('defer', true);
                    document.body.appendChild(script);
                });
            }
            constructor() {
            }
        }
        util.GoogleMapsUtil = GoogleMapsUtil;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
