var alm;
(function (alm) {
    var drawer;
    (function (drawer) {
        var view;
        (function (view_1) {
            var View = alm.view.View;
            var Easing = alm.math.Easing;
            var TweenCSS = alm.util.TweenCSS;
            class SlideshowItem extends View {
                constructor(content) {
                    super(content);
                    this.content = content;
                    this.initialize();
                }
                implInitialize() {
                    const view = jQuery('<div>');
                    view.addClass('slideshow-item');
                    this.transitionDuration = 1000;
                    return view;
                }
                implReady() {
                }
                implFinalize() {
                }
                implShow(view, useTransition) {
                    return TweenCSS.fadeIn(view, useTransition ? 1000 : 0, Easing.linear, 'block', true);
                }
                implHide(view, useTransition) {
                    return TweenCSS.fadeOut(view, useTransition ? 1000 : 0, Easing.linear, false, true);
                }
                getTransitionDuration() {
                    return this.transitionDuration;
                }
                setTransitionDuration(duration) {
                    this.transitionDuration = duration;
                }
            }
            view_1.SlideshowItem = SlideshowItem;
        })(view = drawer.view || (drawer.view = {}));
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var drawer;
    (function (drawer) {
        var SlideshowItem = alm.drawer.view.SlideshowItem;
        var Switcher = alm.state.Switcher;
        var Timer = alm.time.Timer;
        var TimerEvent = alm.time.TimerEvent;
        var SwitcherEvent = alm.state.SwitcherEvent;
        class Slideshow {
            constructor(content, loop = true, itemSelector = '') {
                this.switcherChangeHandler = (event) => {
                    if (event.oldItemIndex != -1) {
                        const item = this.items[event.oldItemIndex];
                        item.setTransitionDuration(this.transitionDuration);
                        item.hide(event.useTransition);
                    }
                    if (event.currentItemIndex != -1) {
                        const item = this.items[event.currentItemIndex];
                        item.setTransitionDuration(this.transitionDuration);
                        item.show(event.useTransition);
                    }
                };
                this.autoPlayTimerTickHandler = (event) => {
                    this.next();
                };
                this.content = content;
                this.content.addClass('slideshow');
                this.isLoopEnabled = loop;
                this.autoPlayInterval = 5000;
                this.transitionDuration = 1000;
                this.items = [];
                let itemElements;
                if (itemSelector !== '') {
                    itemElements = this.content.find(itemSelector);
                }
                else {
                    itemElements = this.content.children();
                }
                itemElements.each((index, element) => {
                    const item = new SlideshowItem(jQuery(element));
                    this.items.push(item);
                });
                this.autoPlayTimer = new Timer(this.autoPlayInterval);
                this.autoPlayTimer.addEventListener(TimerEvent.tick, this.autoPlayTimerTickHandler);
                this.switcher = new Switcher();
                this.switcher.setupByCount(this.items.length);
                this.switcher.addEventListener(SwitcherEvent.change, this.switcherChangeHandler);
                this.reset(false);
            }
            play() {
                if (this.isPlaying)
                    return;
                this.isPlaying = true;
                this.autoPlayTimer.setInterval(this.autoPlayInterval);
                this.autoPlayTimer.start();
            }
            stop() {
                if (!this.isPlaying)
                    return;
                this.isPlaying = false;
                this.autoPlayTimer.stop();
            }
            reset(useTransition = true) {
                this.stop();
                this.resetInterval();
                this.switcher.gotoByIndex(0, useTransition);
            }
            resetInterval() {
                this.autoPlayTimer.reset();
            }
            goto(index, useTransition = true) {
                return this.switcher.gotoByIndex(index, useTransition);
            }
            next(useTransition = true) {
                return this.switcher.next(useTransition);
            }
            prev(useTransition = true) {
                return this.switcher.prev(useTransition);
            }
            getIsPlaying() {
                return this.isPlaying;
            }
            getCurrentIndex() {
                return this.switcher.getCurrentItemIndex();
            }
            getOldIndex() {
                return this.switcher.getOldItemIndex();
            }
            getLength() {
                return this.switcher.getItemCount();
            }
            getIsLoopEnabled() {
                return this.isLoopEnabled;
            }
            setIsLoopEnabled(enabled) {
                this.isLoopEnabled = enabled;
            }
            getAutoPlayInterval() {
                return this.autoPlayInterval;
            }
            setAutoPlayInterval(interval) {
                this.autoPlayInterval = interval;
            }
            getTransitionDuration() {
                return this.transitionDuration;
            }
            setTransitionDuration(duration) {
                this.transitionDuration = duration;
            }
        }
        drawer.Slideshow = Slideshow;
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
