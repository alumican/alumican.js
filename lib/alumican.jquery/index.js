var alm;
(function (alm) {
    var io;
    (function (io) {
        var JQueryTextFileHandler = (function () {
            function JQueryTextFileHandler(headers) {
                if (headers === void 0) { headers = null; }
                this.headers = headers;
            }
            JQueryTextFileHandler.prototype.getType = function () {
                return JQueryTextFileHandler.TYPE;
            };
            JQueryTextFileHandler.prototype.load = function (url, onComplete, onError) {
                jQuery.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'text',
                    headers: this.headers,
                }).then(function (data, textStatus, jqXHR) {
                    onComplete(data, { textStatus: textStatus, jqXHR: jqXHR });
                }, function (jqXHR, textStatus, errorThrown) {
                    onError({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
                });
            };
            JQueryTextFileHandler.TYPE = 'jQuery.TEXT';
            return JQueryTextFileHandler;
        }());
        io.JQueryTextFileHandler = JQueryTextFileHandler;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        var JQueryJsonFileHandler = (function () {
            function JQueryJsonFileHandler(headers) {
                if (headers === void 0) { headers = null; }
                this.headers = headers;
            }
            JQueryJsonFileHandler.prototype.getType = function () {
                return JQueryJsonFileHandler.TYPE;
            };
            JQueryJsonFileHandler.prototype.load = function (url, onComplete, onError) {
                jQuery.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    headers: this.headers
                }).then(function (data, textStatus, jqXHR) {
                    onComplete(data, { textStatus: textStatus, jqXHR: jqXHR });
                }, function (jqXHR, textStatus, errorThrown) {
                    onError({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
                });
            };
            JQueryJsonFileHandler.TYPE = 'jQuery.JSON';
            return JQueryJsonFileHandler;
        }());
        io.JQueryJsonFileHandler = JQueryJsonFileHandler;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Easing = alm.math.Easing;
        var TweenCSS = (function () {
            function TweenCSS() {
            }
            TweenCSS.scale = function (target, from, to, duration, easing) {
                if (duration === void 0) { duration = 500; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                var o = { value: from };
                return new cmd.Tween(o, { value: to }, null, duration, easing, null, function () {
                    var value = o['value'];
                    target.css('transform', 'scale(' + value + ',' + value + ')');
                }, null);
            };
            TweenCSS.fade = function (target, from, to, duration, easing, updateDisplayTo, updateVisibility) {
                if (duration === void 0) { duration = 500; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                if (updateDisplayTo === void 0) { updateDisplayTo = null; }
                if (updateVisibility === void 0) { updateVisibility = false; }
                var o = { value: from };
                return new cmd.Tween(o, { value: to }, null, duration, easing, function () {
                    if (to > 0) {
                        if (updateDisplayTo) {
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
                        if (updateDisplayTo) {
                            target.css('display', 'none');
                        }
                        if (updateVisibility) {
                            target.css('visibility', 'hidden');
                        }
                    }
                });
            };
            TweenCSS.fadeTo = function (target, to, duration, easing, updateDisplayTo, updateVisibility) {
                if (duration === void 0) { duration = 500; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                if (updateDisplayTo === void 0) { updateDisplayTo = null; }
                if (updateVisibility === void 0) { updateVisibility = false; }
                return TweenCSS.fade(target, parseFloat(target.css('opacity')), to, duration, easing, updateDisplayTo, updateVisibility);
            };
            TweenCSS.fadeIn = function (target, duration, easing, updateDisplayTo, updateVisibility) {
                if (duration === void 0) { duration = 500; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                if (updateDisplayTo === void 0) { updateDisplayTo = null; }
                if (updateVisibility === void 0) { updateVisibility = false; }
                return TweenCSS.fadeTo(target, 1, duration, easing, updateDisplayTo, updateVisibility);
            };
            TweenCSS.fadeOut = function (target, duration, easing, updateDisplay, updateVisibility) {
                if (duration === void 0) { duration = 500; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                if (updateDisplay === void 0) { updateDisplay = false; }
                if (updateVisibility === void 0) { updateVisibility = false; }
                return TweenCSS.fadeTo(target, 0, duration, easing, updateDisplay ? 'none' : '', updateVisibility);
            };
            TweenCSS.movePosition = function (target, property, from, to, duration, easing) {
                if (duration === void 0) { duration = 500; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                var o = { value: from };
                return new cmd.Tween(o, { value: to }, null, duration, easing, null, function () {
                    target.css(property, o['value']);
                });
            };
            TweenCSS.moveLeft = function (target, from, to, duration, easing) {
                if (duration === void 0) { duration = 500; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                return TweenCSS.movePosition(target, 'left', from, to, duration, easing);
            };
            TweenCSS.moveRight = function (target, from, to, duration, easing) {
                if (duration === void 0) { duration = 500; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                return TweenCSS.movePosition(target, 'right', from, to, duration, easing);
            };
            TweenCSS.moveTop = function (target, from, to, duration, easing) {
                if (duration === void 0) { duration = 500; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                return TweenCSS.movePosition(target, 'top', from, to, duration, easing);
            };
            TweenCSS.moveBottom = function (target, from, to, duration, easing) {
                if (duration === void 0) { duration = 500; }
                if (easing === void 0) { easing = Easing.easeOutQuart; }
                return TweenCSS.movePosition(target, 'bottom', from, to, duration, easing);
            };
            TweenCSS.show = function (target, updateDisplayTo, updateVisibility) {
                if (updateDisplayTo === void 0) { updateDisplayTo = 'block'; }
                if (updateVisibility === void 0) { updateVisibility = true; }
                return new cmd.Func(function () {
                    if (updateDisplayTo != '') {
                        target.css('display', updateDisplayTo);
                    }
                    if (updateVisibility) {
                        target.css('visibility', 'visible');
                    }
                });
            };
            TweenCSS.hide = function (target, updateDisplay, updateVisibility) {
                if (updateDisplay === void 0) { updateDisplay = false; }
                if (updateVisibility === void 0) { updateVisibility = true; }
                return new cmd.Func(function () {
                    if (updateDisplay) {
                        target.css('display', 'none');
                    }
                    if (!updateVisibility) {
                        target.css('visibility', 'hidden');
                    }
                });
            };
            return TweenCSS;
        }());
        util.TweenCSS = TweenCSS;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
