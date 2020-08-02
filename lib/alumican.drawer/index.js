var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var alm;
(function (alm) {
    var drawer;
    (function (drawer) {
        var view;
        (function (view_1) {
            var View = alm.view.View;
            var TweenCSS = alm.util.TweenCSS;
            var Easing = alm.math.Easing;
            var DrawerBackground = (function (_super) {
                __extends(DrawerBackground, _super);
                function DrawerBackground() {
                    var _this = _super.call(this) || this;
                    _this.clickHandler = function () {
                        window.closeDrawer();
                    };
                    _this.initialize();
                    return _this;
                }
                DrawerBackground.prototype.implInitialize = function () {
                    var view = jQuery('<div>');
                    view.addClass('drawer-background');
                    return view;
                };
                DrawerBackground.prototype.implReady = function () {
                };
                DrawerBackground.prototype.implFinalize = function () {
                };
                DrawerBackground.prototype.implShow = function (view, useTransition) {
                    var _this = this;
                    return new cmd.Serial(new cmd.Func(function () {
                        view.on('click', _this.clickHandler);
                    }), TweenCSS.fadeIn(view, useTransition ? 500 : 0, Easing.easeOutQuart, 'block', false, false));
                };
                DrawerBackground.prototype.implHide = function (view, useTransition) {
                    var _this = this;
                    return new cmd.Serial(TweenCSS.fadeOut(view, useTransition ? 500 : 0, Easing.easeOutQuart, true, false, false), new cmd.Func(function () {
                        view.off('click', _this.clickHandler);
                    }));
                };
                return DrawerBackground;
            }(View));
            view_1.DrawerBackground = DrawerBackground;
        })(view = drawer.view || (drawer.view = {}));
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var drawer;
    (function (drawer) {
        var view;
        (function (view_2) {
            var View = alm.view.View;
            var Easing = alm.math.Easing;
            var DrawerForeground = (function (_super) {
                __extends(DrawerForeground, _super);
                function DrawerForeground(content, position) {
                    var _this = _super.call(this, content) || this;
                    _this.content = content;
                    _this.position = position;
                    _this.initialize();
                    return _this;
                }
                DrawerForeground.prototype.implInitialize = function () {
                    var view = jQuery('<div>');
                    view.addClass('drawer-foreground');
                    view.append(this.content);
                    this.content.css('display', 'block');
                    switch (this.position) {
                        case drawer.DrawerPosition.left:
                            view.css({ top: 0, left: 0 });
                            break;
                        case drawer.DrawerPosition.right:
                            view.css({ top: 0, right: 0 });
                            break;
                        case drawer.DrawerPosition.top:
                            view.css({ top: 0, left: 0 });
                            break;
                        case drawer.DrawerPosition.bottom:
                            view.css({ bottom: 0, left: 0 });
                            break;
                    }
                    return view;
                };
                DrawerForeground.prototype.implReady = function () {
                };
                DrawerForeground.prototype.implFinalize = function () {
                };
                DrawerForeground.prototype.implShow = function (view, useTransition) {
                    var command = new cmd.Serial(new cmd.Func(function () {
                        view.css('visibility', 'visible');
                    }));
                    var prop = '';
                    var from = 0;
                    switch (this.position) {
                        case drawer.DrawerPosition.left:
                            prop = 'left';
                            from = -this.getWidth();
                            break;
                        case drawer.DrawerPosition.right:
                            prop = 'right';
                            from = -this.getWidth();
                            break;
                        case drawer.DrawerPosition.top:
                            prop = 'top';
                            from = -this.getHeight();
                            break;
                        case drawer.DrawerPosition.bottom:
                            prop = 'bottom';
                            from = -this.getHeight();
                            break;
                    }
                    if (prop !== '') {
                        view.css(prop, from);
                        command.addCommand(this.move(view, prop, from, 0, useTransition ? 500 : 0, Easing.easeOutQuart, false));
                    }
                    return command;
                };
                DrawerForeground.prototype.implHide = function (view, useTransition) {
                    var command = new cmd.Serial();
                    var prop = '';
                    var to = 0;
                    switch (this.position) {
                        case drawer.DrawerPosition.left:
                            prop = 'left';
                            to = -this.getWidth();
                            break;
                        case drawer.DrawerPosition.right:
                            prop = 'right';
                            to = -this.getWidth();
                            break;
                        case drawer.DrawerPosition.top:
                            prop = 'top';
                            to = -this.getHeight();
                            break;
                        case drawer.DrawerPosition.bottom:
                            prop = 'bottom';
                            to = -this.getHeight();
                            break;
                    }
                    if (prop !== '') {
                        command.addCommand(this.move(view, prop, 0, to, useTransition ? 500 : 0, Easing.easeOutQuart, false));
                    }
                    command.addCommand(new cmd.Func(function () {
                        view.css('visibility', 'hidden');
                    }));
                    return command;
                };
                DrawerForeground.prototype.move = function (target, prop, from, to, duration, easing, execute) {
                    if (duration === void 0) { duration = 500; }
                    if (easing === void 0) { easing = Easing.easeOutQuart; }
                    if (execute === void 0) { execute = true; }
                    var o = { value: from };
                    var tween = new cmd.Tween(o, { value: to }, null, duration, easing, null, function () {
                        var value = o['value'];
                        target.css(prop, value);
                    }, null);
                    if (execute)
                        tween.execute();
                    return tween;
                };
                DrawerForeground.prototype.getWidth = function () {
                    return parseInt(this.getView().css('width'));
                };
                DrawerForeground.prototype.getHeight = function () {
                    return parseInt(this.getView().css('height'));
                };
                return DrawerForeground;
            }(View));
            view_2.DrawerForeground = DrawerForeground;
        })(view = drawer.view || (drawer.view = {}));
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var drawer;
    (function (drawer) {
        var view;
        (function (view_3) {
            var View = alm.view.View;
            var DrawerContainer = (function (_super) {
                __extends(DrawerContainer, _super);
                function DrawerContainer(content, position, drawerId) {
                    if (drawerId === void 0) { drawerId = 'drawer'; }
                    var _this = _super.call(this, content) || this;
                    _this.content = content;
                    _this.position = position;
                    _this.drawerId = drawerId;
                    _this.initialize();
                    return _this;
                }
                DrawerContainer.prototype.implInitialize = function () {
                    var view = jQuery('<div>');
                    view.attr('id', this.drawerId);
                    view.addClass('drawer');
                    this.background = new view_3.DrawerBackground();
                    this.foreground = new view_3.DrawerForeground(this.content, this.position);
                    return view;
                };
                DrawerContainer.prototype.implReady = function () {
                    var view = this.getView();
                    this.background.ready();
                    view.append(this.background.getView());
                    this.foreground.ready();
                    view.append(this.foreground.getView());
                    jQuery('body').append(view);
                };
                DrawerContainer.prototype.implFinalize = function () {
                    this.background.finalize();
                    this.background = null;
                    this.foreground.finalize();
                    this.foreground = null;
                    this.content = null;
                };
                DrawerContainer.prototype.implShow = function (view, useTransition) {
                    return new cmd.Serial(new cmd.Func(function () {
                        view.css('display', 'block');
                    }), new cmd.Parallel(this.background.getShowCommand(useTransition), this.foreground.getShowCommand(useTransition)));
                };
                DrawerContainer.prototype.implHide = function (view, useTransition) {
                    return new cmd.Serial(new cmd.Parallel(this.background.getHideCommand(useTransition), this.foreground.getHideCommand(useTransition)), new cmd.Func(function () {
                        view.css('display', 'none');
                    }));
                };
                DrawerContainer.prototype.getContent = function () {
                    return this.content;
                };
                DrawerContainer.prototype.getDrawerId = function () {
                    return this.drawerId;
                };
                return DrawerContainer;
            }(View));
            view_3.DrawerContainer = DrawerContainer;
        })(view = drawer.view || (drawer.view = {}));
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var drawer;
    (function (drawer) {
        var DrawerPosition;
        (function (DrawerPosition) {
            DrawerPosition["left"] = "left";
            DrawerPosition["right"] = "right";
            DrawerPosition["top"] = "top";
            DrawerPosition["bottom"] = "bottom";
        })(DrawerPosition = drawer.DrawerPosition || (drawer.DrawerPosition = {}));
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var drawer;
    (function (drawer) {
        var DrawerContainer = alm.drawer.view.DrawerContainer;
        var Drawer = (function () {
            function Drawer(content, position, drawerId) {
                if (drawerId === void 0) { drawerId = 'drawer'; }
                this.container = new DrawerContainer(content, position, drawerId);
                this.container.ready();
                window.openDrawer = this.container.show.bind(this.container);
                window.closeDrawer = this.container.hide.bind(this.container);
            }
            Drawer.prototype.open = function (useTransition) {
                this.container.show(useTransition);
            };
            Drawer.prototype.close = function (useTransition) {
                this.container.hide(useTransition);
            };
            Drawer.prototype.dispose = function () {
                this.container.finalize();
                this.container = null;
                delete window.openDrawer;
                delete window.closeDrawer;
            };
            Drawer.prototype.getView = function () {
                return this.container.getView();
            };
            Drawer.prototype.getContentView = function () {
                return this.container.getContent();
            };
            Drawer.prototype.getDrawerId = function () {
                return this.getDrawerId();
            };
            return Drawer;
        }());
        drawer.Drawer = Drawer;
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
