var alm;
(function (alm) {
    var io;
    (function (io) {
        class JQueryTextFileHandler {
            constructor(headers = null) {
                this.headers = headers;
            }
            getType() {
                return JQueryTextFileHandler.type;
            }
            load(url, onComplete, onError) {
                jQuery.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'text',
                    headers: this.headers,
                }).then((data, textStatus, jqXHR) => {
                    onComplete(data, { textStatus: textStatus, jqXHR: jqXHR });
                }, (jqXHR, textStatus, errorThrown) => {
                    onError({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
                });
            }
        }
        JQueryTextFileHandler.type = 'jQuery.TEXT';
        io.JQueryTextFileHandler = JQueryTextFileHandler;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        class JQueryJsonFileHandler {
            constructor(headers = null) {
                this.headers = headers;
            }
            getType() {
                return JQueryJsonFileHandler.type;
            }
            load(url, onComplete, onError) {
                jQuery.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    headers: this.headers
                }).then((data, textStatus, jqXHR) => {
                    onComplete(data, { textStatus: textStatus, jqXHR: jqXHR });
                }, (jqXHR, textStatus, errorThrown) => {
                    onError({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
                });
            }
        }
        JQueryJsonFileHandler.type = 'jQuery.JSON';
        io.JQueryJsonFileHandler = JQueryJsonFileHandler;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        class ViewUtil {
            static setTransform(target, x, y, rotation, scale, xSuffix = 'px', ySuffix = null) {
                target.css('transform', 'translate(' + x + xSuffix + ',' + y + (ySuffix || xSuffix) + ') rotate(' + rotation + 'rad) scale(' + scale + ')');
            }
            static setTransformByPixel(target, x, y, rotation, scale) {
                ViewUtil.setTransform(target, x, y, rotation, scale, 'px', 'px');
            }
            static setTransformByPercent(target, x, y, rotation, scale) {
                ViewUtil.setTransform(target, x * 100, y * 100, rotation, scale, '%', '%');
            }
            static setTransformByViewport(target, x, y, rotation, scale) {
                ViewUtil.setTransform(target, x * 100, y * 100, rotation, scale, 'vw', 'vh');
            }
            static setOpacity(target, opacity) {
                target.css('opacity', opacity);
            }
            constructor() {
            }
        }
        util.ViewUtil = ViewUtil;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Cmd = alm.util.Cmd;
        class TweenView {
            constructor(target, xSuffix = 'px', ySuffix = 'px') {
                this.target = target;
                this.xSuffix = xSuffix;
                this.ySuffix = ySuffix;
                this.x = 0;
                this.y = 0;
                this.rotation = 0;
                this.scale = 1;
                this.opacity = 1;
                this.isNeedUpdateTransform = false;
                this.isNeedUpdateOpacity = false;
                this.command = null;
            }
            dispose() {
                this.target = null;
                this.command = Cmd.stop(this.command);
            }
            set(p) {
                this.tween(p, 0, null);
            }
            tween(p, duration, easing) {
                const target = {};
                this.isNeedUpdateTransform = false;
                this.isNeedUpdateOpacity = false;
                if (p.x !== undefined) {
                    target.x = p.x;
                    this.isNeedUpdateTransform = true;
                }
                if (p.y !== undefined) {
                    target.y = p.y;
                    this.isNeedUpdateTransform = true;
                }
                if (p.rotation !== undefined) {
                    target.rotation = p.rotation;
                    this.isNeedUpdateTransform = true;
                }
                if (p.scale !== undefined) {
                    target.scale = p.scale;
                    this.isNeedUpdateTransform = true;
                }
                if (p.opacity !== undefined) {
                    target.opacity = p.opacity;
                    this.isNeedUpdateOpacity = true;
                }
                if (this.isNeedUpdateTransform || this.isNeedUpdateOpacity) {
                    this.command = Cmd.stop(this.command);
                    if (duration > 0) {
                        this.command = new cmd.Tween(this, target, null, duration, easing, null, () => {
                            this.apply();
                        }, () => {
                            this.command = null;
                            this.isNeedUpdateTransform = false;
                            this.isNeedUpdateOpacity = false;
                        });
                        this.command.execute();
                    }
                    else {
                        this.x = target.x;
                        this.y = target.y;
                        this.rotation = target.rotation;
                        this.scale = target.scale;
                        this.opacity = target.opacity;
                        this.apply();
                        this.isNeedUpdateTransform = false;
                        this.isNeedUpdateOpacity = false;
                    }
                }
            }
            stop() {
                if (this.command) {
                    this.command = Cmd.stop(this.command);
                    this.isNeedUpdateTransform = false;
                    this.isNeedUpdateOpacity = false;
                }
            }
            apply() {
                if (this.isNeedUpdateTransform) {
                    util.ViewUtil.setTransform(this.target, this.x, this.y, this.rotation, this.scale, this.xSuffix, this.ySuffix);
                }
                if (this.isNeedUpdateOpacity) {
                    util.ViewUtil.setOpacity(this.target, this.opacity);
                }
            }
        }
        util.TweenView = TweenView;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Easing = alm.math.Easing;
        class TweenCSS {
            static scale(target, from, to, duration = 500, easing = Easing.easeOutQuart) {
                let o = { value: from };
                return new cmd.Tween(o, { value: to }, null, duration, easing, null, () => {
                    const value = o['value'];
                    target.css('transform', 'scale(' + value + ',' + value + ')');
                }, null);
            }
            static fade(target, from, to, duration = 500, easing = Easing.easeOutQuart, updateDisplayTo = null, updateVisibility = false) {
                let o = { value: from };
                return new cmd.Tween(o, { value: to }, null, duration, easing, () => {
                    if (to > 0) {
                        if (updateDisplayTo) {
                            target.css('display', updateDisplayTo);
                        }
                        if (updateVisibility) {
                            target.css('visibility', 'visible');
                        }
                    }
                }, () => {
                    target.css('opacity', o['value']);
                }, () => {
                    if (to <= 0) {
                        if (updateDisplayTo) {
                            target.css('display', 'none');
                        }
                        if (updateVisibility) {
                            target.css('visibility', 'hidden');
                        }
                    }
                });
            }
            static fadeTo(target, to, duration = 500, easing = Easing.easeOutQuart, updateDisplayTo = null, updateVisibility = false) {
                return TweenCSS.fade(target, parseFloat(target.css('opacity')), to, duration, easing, updateDisplayTo, updateVisibility);
            }
            static fadeIn(target, duration = 500, easing = Easing.easeOutQuart, updateDisplayTo = null, updateVisibility = false) {
                return TweenCSS.fadeTo(target, 1, duration, easing, updateDisplayTo, updateVisibility);
            }
            static fadeOut(target, duration = 500, easing = Easing.easeOutQuart, updateDisplay = false, updateVisibility = false) {
                return TweenCSS.fadeTo(target, 0, duration, easing, updateDisplay ? 'none' : '', updateVisibility);
            }
            static movePosition(target, property, from, to, duration = 500, easing = Easing.easeOutQuart) {
                let o = { value: from };
                return new cmd.Tween(o, { value: to }, null, duration, easing, null, () => {
                    target.css(property, o['value']);
                });
            }
            static moveLeft(target, from, to, duration = 500, easing = Easing.easeOutQuart) {
                return TweenCSS.movePosition(target, 'left', from, to, duration, easing);
            }
            static moveRight(target, from, to, duration = 500, easing = Easing.easeOutQuart) {
                return TweenCSS.movePosition(target, 'right', from, to, duration, easing);
            }
            static moveTop(target, from, to, duration = 500, easing = Easing.easeOutQuart) {
                return TweenCSS.movePosition(target, 'top', from, to, duration, easing);
            }
            static moveBottom(target, from, to, duration = 500, easing = Easing.easeOutQuart) {
                return TweenCSS.movePosition(target, 'bottom', from, to, duration, easing);
            }
            static show(target, updateDisplayTo = 'block', updateVisibility = true) {
                return new cmd.Func(() => {
                    if (updateDisplayTo != '') {
                        target.css('display', updateDisplayTo);
                    }
                    if (updateVisibility) {
                        target.css('visibility', 'visible');
                    }
                });
            }
            static hide(target, updateDisplay = false, updateVisibility = true) {
                return new cmd.Func(() => {
                    if (updateDisplay) {
                        target.css('display', 'none');
                    }
                    if (!updateVisibility) {
                        target.css('visibility', 'hidden');
                    }
                });
            }
            constructor() { }
        }
        util.TweenCSS = TweenCSS;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
