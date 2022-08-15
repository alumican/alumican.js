var alm;
(function (alm) {
    var drawer;
    (function (drawer) {
        var view;
        (function (view_1) {
            var View = alm.view.View;
            var TweenCSS = alm.util.TweenCSS;
            var Easing = alm.math.Easing;
            class DrawerBackground extends View {
                constructor(transition) {
                    super();
                    this.clickHandler = () => {
                        window.closeDrawer();
                    };
                    this.transition = transition;
                    this.initialize();
                }
                implInitialize() {
                    const view = jQuery('<div>');
                    view.addClass('drawer-background');
                    this.customShowTransition = null;
                    this.customHideTransition = null;
                    return view;
                }
                implReady() {
                }
                implFinalize() {
                }
                implShow(view, useTransition) {
                    const command = new cmd.Serial(new cmd.Func(() => {
                        view.on('click', this.clickHandler);
                    }));
                    if (this.customShowTransition) {
                        command.addCommand(this.customShowTransition);
                    }
                    else if (this.transition == drawer.DrawerTransition.none) {
                        command.addCommand(new cmd.Func(() => {
                            view.css('display', 'block');
                        }));
                    }
                    else {
                        command.addCommand(TweenCSS.fadeIn(view, useTransition ? 500 : 0, Easing.easeOutQuart, 'block', false));
                    }
                    return command;
                }
                implHide(view, useTransition) {
                    const command = new cmd.Serial();
                    if (this.customHideTransition) {
                        command.addCommand(this.customHideTransition);
                    }
                    else if (this.transition == drawer.DrawerTransition.none) {
                        command.addCommand(new cmd.Func(() => {
                            view.css('display', 'none');
                        }));
                    }
                    else {
                        command.addCommand(TweenCSS.fadeOut(view, useTransition ? 500 : 0, Easing.easeOutQuart, true, false));
                    }
                    command.addCommand(new cmd.Func(() => {
                        view.off('click', this.clickHandler);
                    }));
                    return command;
                }
                setCustomTransition(customShowTransition, customHideTransition) {
                    this.customShowTransition = customShowTransition;
                    this.customHideTransition = customHideTransition;
                }
            }
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
            class DrawerForeground extends View {
                constructor(content, transition) {
                    super(content);
                    this.content = content;
                    this.transition = transition;
                    this.initialize();
                }
                implInitialize() {
                    const view = jQuery('<div>');
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
                }
                implReady() {
                }
                implFinalize() {
                }
                implShow(view, useTransition) {
                    const command = new cmd.Serial(new cmd.Func(() => {
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
                        let prop = '';
                        let from = 0;
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
                }
                implHide(view, useTransition) {
                    const command = new cmd.Serial();
                    if (this.customHideTransition) {
                        command.addCommand(this.customHideTransition);
                    }
                    else if (this.transition === drawer.DrawerTransition.none) {
                    }
                    else if (this.transition === drawer.DrawerTransition.fade) {
                        command.addCommand(TweenCSS.fadeOut(view, useTransition ? 500 : 0, Easing.easeOutCubic, false, false));
                    }
                    else {
                        let prop = '';
                        let to = 0;
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
                    command.addCommand(new cmd.Func(() => {
                        view.css('visibility', 'hidden');
                    }));
                    return command;
                }
                move(target, prop, from, to, duration = 500, easing = Easing.easeOutQuart) {
                    let o = { value: from };
                    return new cmd.Tween(o, { value: to }, null, duration, easing, null, () => {
                        const value = o['value'];
                        target.css(prop, value);
                    }, null);
                }
                getWidth() {
                    return Math.round(this.getView().width());
                }
                getHeight() {
                    return Math.round(this.getView().height());
                }
                setCustomTransition(customShowTransition, customHideTransition) {
                    this.customShowTransition = customShowTransition;
                    this.customHideTransition = customHideTransition;
                }
            }
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
            class DrawerContainer extends View {
                constructor(content, transition, drawerId = 'drawer') {
                    super(content);
                    this.content = content;
                    this.transition = transition;
                    this.drawerId = drawerId;
                    this.initialize();
                }
                implInitialize() {
                    const view = jQuery('<div>');
                    view.attr('id', this.drawerId);
                    view.addClass('drawer');
                    this.background = new view_3.DrawerBackground(this.transition);
                    this.foreground = new view_3.DrawerForeground(this.content, this.transition);
                    return view;
                }
                implReady() {
                    const view = this.getView();
                    this.background.ready();
                    view.append(this.background.getView());
                    this.foreground.ready();
                    view.append(this.foreground.getView());
                    jQuery('body').append(view);
                }
                implFinalize() {
                    this.background.finalize();
                    this.background = null;
                    this.foreground.finalize();
                    this.foreground = null;
                    this.content = null;
                }
                implShow(view, useTransition) {
                    return new cmd.Serial(new cmd.Func(() => {
                        view.css('display', 'block');
                    }), new cmd.Parallel(this.background.getShowCommand(useTransition), this.foreground.getShowCommand(useTransition)));
                }
                implHide(view, useTransition) {
                    return new cmd.Serial(new cmd.Parallel(this.background.getHideCommand(useTransition), this.foreground.getHideCommand(useTransition)), new cmd.Func(() => {
                        view.css('display', 'none');
                    }));
                }
                getContent() {
                    return this.content;
                }
                getDrawerId() {
                    return this.drawerId;
                }
                setBackgroundCustomTransition(showCommand, hideCommand) {
                    this.background.setCustomTransition(showCommand, hideCommand);
                }
                setForegroundCustomTransition(showCommand, hideCommand) {
                    this.foreground.setCustomTransition(showCommand, hideCommand);
                }
            }
            view_3.DrawerContainer = DrawerContainer;
        })(view = drawer.view || (drawer.view = {}));
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var drawer;
    (function (drawer) {
        let DrawerTransition;
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
        class Drawer {
            constructor(content, transition, drawerId = 'drawer') {
                this.container = new DrawerContainer(content, transition, drawerId);
                this.container.ready();
                window.openDrawer = this.container.show.bind(this.container);
                window.closeDrawer = this.container.hide.bind(this.container);
            }
            open(useTransition = true) {
                this.container.show(useTransition);
            }
            close(useTransition = true) {
                this.container.hide(useTransition);
            }
            dispose() {
                this.container.finalize();
                this.container = null;
                delete window.openDrawer;
                delete window.closeDrawer;
            }
            getView() {
                return this.container.getView();
            }
            getContentView() {
                return this.container.getContent();
            }
            getDrawerId() {
                return this.getDrawerId();
            }
            setBackgroundCustomTransition(showCommand, hideCommand) {
                this.container.setBackgroundCustomTransition(showCommand, hideCommand);
            }
            setForegroundCustomTransition(showCommand, hideCommand) {
                this.container.setForegroundCustomTransition(showCommand, hideCommand);
            }
        }
        drawer.Drawer = Drawer;
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
