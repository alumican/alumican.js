var alm;
(function (alm) {
    var util;
    (function (util) {
        var Easing = alm.math.Easing;
        var TweenCSS = (function () {
            function TweenCSS() {
            }
            TweenCSS.scale = function (target, from, to, duration, easing, execute) {
                if (duration === void 0) { duration = 0.5; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                if (execute === void 0) { execute = true; }
                var o = { value: from };
                var tween = new cmd.Tween(o, { value: to }, null, duration, easing, null, function () {
                    var value = o['value'];
                    target.css('transform', 'scale(' + value + ',' + value + ')');
                }, null);
                if (execute)
                    tween.execute();
                return tween;
            };
            TweenCSS.fade = function (target, from, to, duration, easing, updateDisplayTo, updateVisibility, execute) {
                if (duration === void 0) { duration = 0.5; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                if (updateDisplayTo === void 0) { updateDisplayTo = ''; }
                if (updateVisibility === void 0) { updateVisibility = false; }
                if (execute === void 0) { execute = true; }
                var o = { value: from };
                var tween = new cmd.Tween(o, { value: to }, null, duration, easing, function () {
                    if (to > 0) {
                        if (updateDisplayTo != '') {
                            target.css('display', updateDisplayTo);
                        }
                        if (updateVisibility) {
                            target.css('visibility', 'visible');
                        }
                    }
                }, function () {
                    target.css('opacity', o['value']);
                }, function () {
                    if (to <= 0) {
                        if (updateDisplayTo != '') {
                            target.css('display', 'none');
                        }
                        if (updateVisibility) {
                            target.css('visibility', 'hidden');
                        }
                    }
                });
                if (execute)
                    tween.execute();
                return tween;
            };
            TweenCSS.fadeTo = function (target, to, duration, easing, updateDisplayTo, updateVisibility, execute) {
                if (duration === void 0) { duration = 0.5; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                if (updateDisplayTo === void 0) { updateDisplayTo = ''; }
                if (updateVisibility === void 0) { updateVisibility = false; }
                if (execute === void 0) { execute = true; }
                return TweenCSS.fade(target, parseFloat(target.css('opacity')), to, duration, easing, updateDisplayTo, updateVisibility, execute);
            };
            TweenCSS.fadeIn = function (target, duration, easing, updateDisplayTo, updateVisibility, execute) {
                if (duration === void 0) { duration = 0.5; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                if (updateDisplayTo === void 0) { updateDisplayTo = ''; }
                if (updateVisibility === void 0) { updateVisibility = false; }
                if (execute === void 0) { execute = true; }
                return TweenCSS.fadeTo(target, 1, duration, easing, updateDisplayTo, updateVisibility, execute);
            };
            TweenCSS.fadeOut = function (target, duration, easing, updateDisplay, updateVisibility, execute) {
                if (duration === void 0) { duration = 0.5; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                if (updateDisplay === void 0) { updateDisplay = false; }
                if (updateVisibility === void 0) { updateVisibility = false; }
                if (execute === void 0) { execute = true; }
                return TweenCSS.fadeTo(target, 0, duration, easing, updateDisplay ? 'none' : '', updateVisibility, execute);
            };
            TweenCSS.show = function (target, updateDisplayTo, updateVisibility, execute) {
                if (updateDisplayTo === void 0) { updateDisplayTo = 'block'; }
                if (updateVisibility === void 0) { updateVisibility = true; }
                if (execute === void 0) { execute = true; }
                var func = new cmd.Func(function () {
                    if (updateDisplayTo != '') {
                        target.css('display', updateDisplayTo);
                    }
                    if (updateVisibility) {
                        target.css('visibility', 'visible');
                    }
                });
                if (execute)
                    func.execute();
                return func;
            };
            TweenCSS.hide = function (target, updateDisplay, updateVisibility, execute) {
                if (updateDisplay === void 0) { updateDisplay = false; }
                if (updateVisibility === void 0) { updateVisibility = true; }
                if (execute === void 0) { execute = true; }
                var func = new cmd.Func(function () {
                    if (updateDisplay) {
                        target.css('display', 'none');
                    }
                    if (!updateVisibility) {
                        target.css('visibility', 'hidden');
                    }
                });
                if (execute)
                    func.execute();
                return func;
            };
            return TweenCSS;
        }());
        util.TweenCSS = TweenCSS;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        var JQueryJsonFileHandler = (function () {
            function JQueryJsonFileHandler() {
            }
            JQueryJsonFileHandler.prototype.getType = function () {
                return JQueryJsonFileHandler.TYPE;
            };
            JQueryJsonFileHandler.prototype.load = function (url, onComplete, onError) {
                jQuery.getJSON(url).done(function (data, textStatus, jqXHR) {
                    onComplete(data, { textStatus: textStatus, jqXHR: jqXHR });
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    onError({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
                });
            };
            JQueryJsonFileHandler.TYPE = 'jQuery.JSON';
            return JQueryJsonFileHandler;
        }());
        io.JQueryJsonFileHandler = JQueryJsonFileHandler;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));

//# sourceMappingURL=alumican.jquery.js.map
