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
            var Easing = alm.math.Easing;
            var TweenCSS = alm.util.TweenCSS;
            var SlideshowItem = (function (_super) {
                __extends(SlideshowItem, _super);
                function SlideshowItem(content) {
                    var _this = _super.call(this, content) || this;
                    _this.content = content;
                    _this.initialize();
                    return _this;
                }
                SlideshowItem.prototype.implInitialize = function () {
                    var view = jQuery('<div>');
                    view.addClass('slideshow-item');
                    this.transitionDuration = 1000;
                    return view;
                };
                SlideshowItem.prototype.implReady = function () {
                };
                SlideshowItem.prototype.implFinalize = function () {
                };
                SlideshowItem.prototype.implShow = function (view, useTransition) {
                    return TweenCSS.fadeIn(view, useTransition ? 1000 : 0, Easing.linear, 'block', true, false);
                };
                SlideshowItem.prototype.implHide = function (view, useTransition) {
                    return TweenCSS.fadeOut(view, useTransition ? 1000 : 0, Easing.linear, false, true, false);
                };
                SlideshowItem.prototype.getTransitionDuration = function () {
                    return this.transitionDuration;
                };
                SlideshowItem.prototype.setTransitionDuration = function (duration) {
                    this.transitionDuration = duration;
                };
                return SlideshowItem;
            }(View));
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
        var Slideshow = (function () {
            function Slideshow(content, loop, itemSelector) {
                var _this = this;
                if (loop === void 0) { loop = true; }
                if (itemSelector === void 0) { itemSelector = ''; }
                this.switcherChangeHandler = function (event) {
                    if (event.oldItemIndex != -1) {
                        var item = _this.items[event.oldItemIndex];
                        item.setTransitionDuration(_this.transitionDuration);
                        item.hide(event.useTransition);
                    }
                    if (event.currentItemIndex != -1) {
                        var item = _this.items[event.currentItemIndex];
                        item.setTransitionDuration(_this.transitionDuration);
                        item.show(event.useTransition);
                    }
                };
                this.autoPlayTimerTickHandler = function (event) {
                    _this.next();
                };
                this.content = content;
                this.content.addClass('slideshow');
                this.isLoopEnabled = loop;
                this.autoPlayInterval = 5000;
                this.transitionDuration = 1000;
                this.items = [];
                var itemElements;
                if (itemSelector !== '') {
                    itemElements = this.content.find(itemSelector);
                }
                else {
                    itemElements = this.content.children();
                }
                itemElements.each(function (index, element) {
                    var item = new SlideshowItem(jQuery(element));
                    _this.items.push(item);
                });
                this.autoPlayTimer = new Timer(this.autoPlayInterval);
                this.autoPlayTimer.addEventListener(TimerEvent.TICK, this.autoPlayTimerTickHandler);
                this.switcher = new Switcher();
                this.switcher.setupByCount(this.items.length);
                this.switcher.addEventListener(SwitcherEvent.CHANGE, this.switcherChangeHandler);
                this.reset(false);
            }
            Slideshow.prototype.play = function () {
                if (this.isPlaying)
                    return;
                this.isPlaying = true;
                this.autoPlayTimer.setInterval(this.autoPlayInterval);
                this.autoPlayTimer.start();
            };
            Slideshow.prototype.stop = function () {
                if (!this.isPlaying)
                    return;
                this.isPlaying = false;
                this.autoPlayTimer.stop();
            };
            Slideshow.prototype.reset = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                this.stop();
                this.resetInterval();
                this.switcher.gotoByIndex(0, useTransition);
            };
            Slideshow.prototype.resetInterval = function () {
                this.autoPlayTimer.reset();
            };
            Slideshow.prototype.goto = function (index, useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                return this.switcher.gotoByIndex(index, useTransition);
            };
            Slideshow.prototype.next = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                return this.switcher.next(useTransition);
            };
            Slideshow.prototype.prev = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                return this.switcher.prev(useTransition);
            };
            Slideshow.prototype.getIsPlaying = function () {
                return this.isPlaying;
            };
            Slideshow.prototype.getCurrentIndex = function () {
                return this.switcher.getCurrentItemIndex();
            };
            Slideshow.prototype.getOldIndex = function () {
                return this.switcher.getOldItemIndex();
            };
            Slideshow.prototype.getLength = function () {
                return this.switcher.getItemCount();
            };
            Slideshow.prototype.getIsLoopEnabled = function () {
                return this.isLoopEnabled;
            };
            Slideshow.prototype.setIsLoopEnabled = function (enabled) {
                this.isLoopEnabled = enabled;
            };
            Slideshow.prototype.getAutoPlayInterval = function () {
                return this.autoPlayInterval;
            };
            Slideshow.prototype.setAutoPlayInterval = function (interval) {
                this.autoPlayInterval = interval;
            };
            Slideshow.prototype.getTransitionDuration = function () {
                return this.transitionDuration;
            };
            Slideshow.prototype.setTransitionDuration = function (duration) {
                this.transitionDuration = duration;
            };
            return Slideshow;
        }());
        drawer.Slideshow = Slideshow;
    })(drawer = alm.drawer || (alm.drawer = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
