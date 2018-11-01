var alm;
(function (alm) {
    var util;
    (function (util) {
        var JQueryUtil = (function () {
            function JQueryUtil() {
            }
            JQueryUtil.fadeTo = function (target, opacity, duration, easing, switchDisplayTo, switchVisibility, execute) {
                if (switchDisplayTo === void 0) { switchDisplayTo = ''; }
                if (switchVisibility === void 0) { switchVisibility = false; }
                if (execute === void 0) { execute = true; }
                var o = { value: parseInt(target.css('opacity')) };
                var tween = new cmd.Tween(o, { value: opacity }, null, duration, easing, function () {
                    if (opacity > 0) {
                        if (switchDisplayTo != '')
                            target.css('display', switchDisplayTo);
                        if (switchVisibility)
                            target.css('visibility', 'visible');
                    }
                }, function () {
                    target.css('opacity', o['value']);
                }, function () {
                    if (opacity <= 0) {
                        if (switchDisplayTo != '')
                            target.css('display', 'none');
                        if (switchVisibility)
                            target.css('visibility', 'hidden');
                    }
                });
                if (execute)
                    tween.execute();
                return tween;
            };
            JQueryUtil.fadeInJquery = function (target, duration, easing, switchDisplayTo, switchVisibility, execute) {
                if (switchDisplayTo === void 0) { switchDisplayTo = ''; }
                if (switchVisibility === void 0) { switchVisibility = false; }
                if (execute === void 0) { execute = true; }
                return JQueryUtil.fadeTo(target, 1, duration, easing, switchDisplayTo, switchVisibility, execute);
            };
            JQueryUtil.fadeOutJquery = function (target, duration, easing, switchDisplayTo, switchVisibility, execute) {
                if (switchDisplayTo === void 0) { switchDisplayTo = ''; }
                if (switchVisibility === void 0) { switchVisibility = false; }
                if (execute === void 0) { execute = true; }
                return JQueryUtil.fadeTo(target, 0, duration, easing, switchDisplayTo, switchVisibility, execute);
            };
            return JQueryUtil;
        }());
        util.JQueryUtil = JQueryUtil;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var loader;
    (function (loader) {
        var JQueryJsonFileHandler = (function () {
            function JQueryJsonFileHandler() {
            }
            JQueryJsonFileHandler.prototype.getType = function () {
                return JQueryJsonFileHandler.TYPE;
            };
            JQueryJsonFileHandler.prototype.load = function (url, onComplete, onError) {
                jQuery.getJSON(url, function (data) {
                    onComplete(data);
                });
            };
            JQueryJsonFileHandler.TYPE = 'jQuery.JSON';
            return JQueryJsonFileHandler;
        }());
        loader.JQueryJsonFileHandler = JQueryJsonFileHandler;
    })(loader = alm.loader || (alm.loader = {}));
})(alm || (alm = {}));

//# sourceMappingURL=alumican.jquery.js.map
