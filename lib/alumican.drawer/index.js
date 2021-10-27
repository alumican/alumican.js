var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
                function DrawerBackground(transition) {
                    var _this = _super.call(this) || this;
                    _this.clickHandler = function () {
                        window.closeDrawer();
                    };
                    _this.transition = transition;
                    _this.initialize();
                    return _this;
                }
                DrawerBackground.prototype.implInitialize = function () {
                    var view = jQuery('<div>');
                    view.addClass('drawer-background');
                    this.customShowTransition = null;
                    this.customHideTransition = null;
                    return view;
                };
                DrawerBackground.prototype.implReady = function () {
                };
                DrawerBackground.prototype.implFinalize = function () {
                };
                DrawerBackground.prototype.implShow = function (view, useTransition) {
                    var _this = this;
                    var command = new cmd.Serial(new cmd.Func(function () {
                        view.on('click', _this.clickHandler);
                    }));
                    if (this.customShowTransition) {
                        command.addCommand(this.customShowTransition);
                    }
                    else if (this.transition == drawer.DrawerTransition.none) {
                        command.addCommand(new cmd.Func(function () {
                            view.css('display', 'block');
                        }));
                    }
                    else {
                        command.addCommand(TweenCSS.fadeIn(view, useTransition ? 500 : 0, Easing.easeOutQuart, 'block', false));
                    }
                    return command;
                };
                DrawerBackground.prototype.implHide = function (view, useTransition) {
                    var _this = this;
                    var command = new cmd.Serial();
                    if (this.customHideTransition) {
                        command.addCommand(this.customHideTransition);
                    }
                    else if (this.transition == drawer.DrawerTransition.none) {
                        command.addCommand(new cmd.Func(function () {
                            view.css('display', 'none');
                        }));
                    }
                    else {
                        command.addCommand(TweenCSS.fadeOut(view, useTransition ? 500 : 0, Easing.easeOutQuart, true, false));
                    }
                    command.addCommand(new cmd.Func(function () {
                        view.off('click', _this.clickHandler);
                    }));
                    return command;
                };
                DrawerBackground.prototype.setCustomTransition = function (customShowTransition, customHideTransition) {
                    this.customShowTransition = customShowTransition;
                    this.customHideTransition = customHideTransition;
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
            var TweenCSS = alm.util.TweenCSS;
            var DrawerForeground = (function (_super) {
                __extends(DrawerForeground, _super);
                function DrawerForeground(content, transition) {
                    var _this = _super.call(this, content) || this;
                    _this.content = content;
                    _this.transition = transition;
                    _this.initialize();
                    return _this;
                }
                DrawerForeground.prototype.implInitialize = function () {
                    var view = jQuery('<div>');
                    view.addClass('drawer-foreground');
                    view.append(this.content);
                    this.content.css('display', 'block');
                    switch (this.transition) {
                        case drawer.DrawerTransition.left:
                            view.css({ top: 0, left: 0 });
                            break;
                        case drawer.DrawerTransition.right:
                            view.css({ top: 0, right: 0 });
                            break;
                        case drawer.DrawerTransition.top:
                            view.css({ top: 0, left: 0 });
                            break;
                        case drawer.DrawerTransition.bottom:
                            view.css({ bottom: 0, left: 0 });
                            break;
                    }
                    this.customShowTransition = null;
                    this.customHideTransition = null;
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
                    if (this.customShowTransition) {
                        command.addCommand(this.customShowTransition);
                    }
                    else if (this.transition === drawer.DrawerTransition.none) {
                    }
                    else if (this.transition === drawer.DrawerTransition.fade) {
                        command.addCommand(TweenCSS.fadeIn(view, useTransition ? 500 : 0, Easing.easeOutCubic, null, false));
                    }
                    else {
                        var prop = '';
                        var from = 0;
                        switch (this.transition) {
                            case drawer.DrawerTransition.left:
                                prop = 'left';
                                from = -this.getWidth();
                                break;
                            case drawer.DrawerTransition.right:
                                prop = 'right';
                                from = -this.getWidth();
                                break;
                            case drawer.DrawerTransition.top:
                                prop = 'top';
                                from = -this.getHeight();
                                break;
                            case drawer.DrawerTransition.bottom:
                                prop = 'bottom';
                                from = -this.getHeight();
                                break;
                        }
                        if (prop !== '') {
                            view.css(prop, from);
                            command.addCommand(this.move(view, prop, from, 0, useTransition ? 500 : 0, Easing.easeOutQuart));
                        }
                    }
                    return command;
                };
                DrawerForeground.prototype.implHide = function (view, useTransition) {
                    var command = new cmd.Serial();
                    if (this.customHideTransition) {
                        command.addCommand(this.customHideTransition);
                    }
                    else if (this.transition === drawer.DrawerTransition.none) {
                    }
                    else if (this.transition === drawer.DrawerTransition.fade) {
                        command.addCommand(TweenCSS.fadeOut(view, useTransition ? 500 : 0, Easing.easeOutCubic, false, false));
                    }
                    else {
                        var prop = '';
                        var to = 0;
                        switch (this.transition) {
                            case drawer.DrawerTransition.left:
                                prop = 'left';
                                to = -this.getWidth();
                                break;
                            case drawer.DrawerTransition.right:
                                prop = 'right';
                                to = -this.getWidth();
                                break;
                            case drawer.DrawerTransition.top:
                                prop = 'top';
                                to = -this.getHeight();
                                break;
                            case drawer.DrawerTransition.bottom:
                                prop = 'bottom';
                                to = -this.getHeight();
                                break;
                        }
                        if (prop !== '') {
                            command.addCommand(this.move(view, prop, 0, to, useTransition ? 500 : 0, Easing.easeOutQuart));
                        }
                    }
                    command.addCommand(new cmd.Func(function () {
                        view.css('visibility', 'hidden');
                    }));
                    return command;
                };
                DrawerForeground.prototype.move = function (target, prop, from, to, duration, easing) {
                    if (duration === void 0) { duration = 500; }
                    if (easing === void 0) { easing = Easing.easeOutQuart; }
                    var o = { value: from };
                    return new cmd.Tween(o, { value: to }, null, duration, easing, null, function () {
                        var value = o['value'];
                        target.css(prop, value);
                    }, null);
                };
                DrawerForeground.prototype.getWidth = function () {
                    return Math.round(this.getView().width());
                };
                DrawerForeground.prototype.getHeight = function () {
                    return Math.round(this.getView().height());
                };
                DrawerForeground.prototype.setCustomTransition = function (customShowTransition, customHideTransition) {
                    this.customShowTransition = customShowTransition;
                    this.customHideTransition = customHideTransition;
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
                function DrawerContainer(content, transition, drawerId) {
                    if (drawerId === void 0) { drawerId = 'drawer'; }
                    var _this = _super.call(this, content) || this;
                    _this.content = content;
                    _this.transition = transition;
                    _this.drawerId = drawerId;
                    _this.initialize();
                    return _this;
                }
                DrawerContainer.prototype.implInitialize = function () {
                    var view = jQuery('<div>');
                    view.attr('id', this.drawerId);
                    view.addClass('drawer');
                    this.background = new view_3.DrawerBackground(this.transition);
                    this.foreground = new view_3.DrawerForeground(this.content, this.transition);
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
                DrawerContainer.prototype.setBackgroundCustomTransition = function (showCommand, hideCommand) {
                    this.background.setCustomTransition(showCommand, hideCommand);
                };
                DrawerContainer.prototype.setForegroundCustomTransition = function (showCommand, hideCommand) {
                    this.foreground.setCustomTransition(showCommand, hideCommand);
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
        var DrawerTransition;
        (function (DrawerTransition) {
            DrawerTransition["none"] = "none";
            DrawerTransition["fade"] = "fade";
            DrawerTransition["left"] = "left";
            DrawerTransition["right"] = "right";
            DrawerTransition["top"] = "top";
            DrawerTransition["bottom"] = "bottom";
        })(DrawerTransition = drawer.DrawerTransition || (drawer.DrawerTransition = {}));
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var drawer;
    (function (drawer) {
        var DrawerContainer = alm.drawer.view.DrawerContainer;
        var Drawer = (function () {
            function Drawer(content, transition, drawerId) {
                if (drawerId === void 0) { drawerId = 'drawer'; }
                this.container = new DrawerContainer(content, transition, drawerId);
                this.container.ready();
                window.openDrawer = this.container.show.bind(this.container);
                window.closeDrawer = this.container.hide.bind(this.container);
            }
            Drawer.prototype.open = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                this.container.show(useTransition);
            };
            Drawer.prototype.close = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
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
            Drawer.prototype.setBackgroundCustomTransition = function (showCommand, hideCommand) {
                this.container.setBackgroundCustomTransition(showCommand, hideCommand);
            };
            Drawer.prototype.setForegroundCustomTransition = function (showCommand, hideCommand) {
                this.container.setForegroundCustomTransition(showCommand, hideCommand);
            };
            return Drawer;
        }());
        drawer.Drawer = Drawer;
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
