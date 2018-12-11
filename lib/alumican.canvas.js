var alm;
(function (alm) {
    var canvas;
    (function (canvas) {
        var BaseApp = (function () {
            function BaseApp(canvasId, isAutoResizeEnabled) {
                if (isAutoResizeEnabled === void 0) { isAutoResizeEnabled = true; }
                var platformSetupOptions = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    platformSetupOptions[_i - 2] = arguments[_i];
                }
                var _this = this;
                this.mouseOverHandler = function (event) {
                    var pointer = _this.getMousePointer(event);
                };
                this.mouseOutHandler = function (event) {
                    var pointer = _this.getMousePointer(event);
                    delete _this.pointersById[_this.mousePointerId];
                    var pointerIndex = _this.pointerIds.indexOf(_this.mousePointerId);
                    if (pointerIndex != -1) {
                        _this.pointerIds.splice(pointerIndex, 1);
                    }
                    --_this.pointingCount;
                    pointer.notifyLeave();
                    _this.onPointerLeave(pointer);
                };
                this.mouseDownHandler = function (event) {
                    var pointer = _this.getMousePointer(event);
                    pointer.notifyTouch();
                    _this.onPointerTouch(pointer);
                };
                this.mouseUpHandler = function (event) {
                    var pointer = _this.getMousePointer(event);
                    pointer.notifyRelease();
                    _this.onPointerRelease(pointer);
                };
                this.mouseMoveHandler = function (event) {
                    var pointer = _this.getMousePointer(event);
                    pointer.notifyMove(event.clientX, event.clientY);
                    _this.onPointerMove(pointer);
                    if (pointer.isDragging) {
                        _this.onPointerDrag(pointer);
                    }
                };
                this.touchStartHandler = function (event) {
                    var touches = event.changedTouches;
                    var touchCount = event.changedTouches.length;
                    var touch;
                    var id;
                    var pointer;
                    for (var i = 0; i < touchCount; ++i) {
                        touch = touches.item(i);
                        id = BaseApp.getPointerId(touch.identifier);
                        pointer = new canvas.Pointer(id);
                        _this.pointersById[id] = pointer;
                        _this.pointerIds.push(id);
                        ++_this.pointingCount;
                        pointer.notifyEnter(touch.clientX, touch.clientY);
                        pointer.notifyTouch();
                        _this.onPointerEnter(pointer);
                        _this.onPointerTouch(pointer);
                    }
                };
                this.touchEndHandler = function (event) {
                    var touches = event.changedTouches;
                    var touchCount = event.changedTouches.length;
                    var touch;
                    var id;
                    var pointer;
                    for (var i = 0; i < touchCount; ++i) {
                        touch = touches.item(i);
                        id = BaseApp.getPointerId(touch.identifier);
                        pointer = _this.pointersById[id];
                        delete _this.pointersById[id];
                        var pointerIndex = _this.pointerIds.indexOf(id);
                        if (pointerIndex != -1) {
                            _this.pointerIds.splice(pointerIndex, 1);
                        }
                        --_this.pointingCount;
                        pointer.notifyRelease();
                        pointer.notifyLeave();
                        _this.onPointerRelease(pointer);
                        _this.onPointerLeave(pointer);
                    }
                };
                this.touchCancelHandler = function (event) {
                    _this.touchEndHandler(event);
                };
                this.touchMoveHandler = function (event) {
                    var touches = event.changedTouches;
                    var touchCount = event.changedTouches.length;
                    var touch;
                    var id;
                    var pointer;
                    for (var i = 0; i < touchCount; ++i) {
                        touch = touches.item(i);
                        id = BaseApp.getPointerId(touch.identifier);
                        pointer = _this.pointersById[id];
                        pointer.notifyMove(touch.clientX, touch.clientY);
                        if (pointer.isDragging) {
                            _this.onPointerDrag(pointer);
                        }
                    }
                };
                this.canvasTouchMoveHandler = function (event) {
                    event.originalEvent.preventDefault();
                };
                this.keyDownHandler = function (event) {
                    _this.onKeyDown(event.key);
                };
                this.keyUpHandler = function (event) {
                    _this.onKeyUp(event.key);
                };
                this.resizeHandler = function (event) {
                    _this.resize($(window).width(), $(window).height());
                };
                this.requestAnimationFrame = function () {
                    ++_this.elapsedFrameCount;
                    _this.elapsedTime = (new Date().getTime() - _this.startTime) / 1000;
                    _this.onUpdate();
                    _this.onPlatformRender();
                    requestAnimationFrame(_this.requestAnimationFrame);
                };
                this.canvas = jQuery(canvasId);
                this.isAutoResizeEnabled = isAutoResizeEnabled;
                trace("[BaseApp] canvasId : " + canvasId);
                trace("[BaseApp] isAutoResizeEnabled : " + this.isAutoResizeEnabled);
                this.pointerIds = [];
                this.pointersById = {};
                this.pointingCount = 0;
                this.elapsedFrameCount = 0;
                this.startTime = new Date().getTime();
                this.mousePointerId = 'mouse';
                jQuery(window).on('mouseover', this.mouseOverHandler);
                jQuery(window).on('mouseout', this.mouseOutHandler);
                jQuery(window).on('mousedown', this.mouseDownHandler);
                jQuery(window).on('mouseup', this.mouseUpHandler);
                jQuery(window).on('mousemove', this.mouseMoveHandler);
                jQuery(window).on('touchstart', this.touchStartHandler);
                jQuery(window).on('touchend', this.touchEndHandler);
                jQuery(window).on('touchcancel', this.touchCancelHandler);
                jQuery(window).on('touchmove', this.touchMoveHandler);
                jQuery(window).on('keydown', this.keyDownHandler);
                jQuery(window).on('keyup', this.keyUpHandler);
                this.canvas.on('touchmove', this.canvasTouchMoveHandler);
                requestAnimationFrame(this.requestAnimationFrame);
                this.onPlatformSetup.apply(this, platformSetupOptions);
                this.onSetup();
                if (this.isAutoResizeEnabled) {
                    jQuery(window).on('resize', this.resizeHandler);
                    this.resizeHandler(null);
                }
            }
            BaseApp.prototype.onSetup = function () {
            };
            BaseApp.prototype.onUpdate = function () {
            };
            BaseApp.prototype.onPointerEnter = function (pointer) {
            };
            BaseApp.prototype.onPointerLeave = function (pointer) {
            };
            BaseApp.prototype.onPointerTouch = function (pointer) {
            };
            BaseApp.prototype.onPointerRelease = function (pointer) {
            };
            BaseApp.prototype.onPointerMove = function (pointer) {
            };
            BaseApp.prototype.onPointerDrag = function (pointer) {
            };
            BaseApp.prototype.onKeyDown = function (key) {
            };
            BaseApp.prototype.onKeyUp = function (key) {
            };
            BaseApp.prototype.onResize = function (stageWidth, stageHeight) {
            };
            BaseApp.prototype.onPlatformSetup = function () {
                var platformSetupOptions = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    platformSetupOptions[_i] = arguments[_i];
                }
            };
            BaseApp.prototype.onPlatformRender = function () {
            };
            BaseApp.prototype.onPlatformResize = function (stageWidth, stageHeight) {
            };
            BaseApp.prototype.resize = function (width, height) {
                this.stageWidth = width;
                this.stageHeight = height;
                trace('[BaseApp] resize : width = ' + this.stageWidth + ', height = ' + this.stageHeight);
                this.onPlatformResize(this.stageWidth, this.stageHeight);
                this.onResize(this.stageWidth, this.stageHeight);
            };
            BaseApp.prototype.getMousePointer = function (event) {
                var pointer = this.pointersById[this.mousePointerId];
                if (pointer == null) {
                    pointer = new canvas.Pointer(this.mousePointerId);
                    this.pointersById[this.mousePointerId] = pointer;
                    this.pointerIds.push(this.mousePointerId);
                    ++this.pointingCount;
                    pointer.notifyEnter(event.clientX, event.clientY);
                    this.onPointerEnter(pointer);
                }
                return pointer;
            };
            BaseApp.getPointerId = function (touchId) {
                return 'touch_' + touchId;
            };
            BaseApp.prototype.getPointerIds = function () { return this.pointerIds; };
            BaseApp.prototype.getFirstPointer = function () { return this.pointingCount > 0 ? this.getPointerById(this.pointerIds[0]) : null; };
            BaseApp.prototype.getLastPointer = function () { return this.pointingCount > 0 ? this.getPointerById(this.pointerIds[this.pointingCount - 1]) : null; };
            BaseApp.prototype.getPointerById = function (id) { return this.pointersById[id]; };
            BaseApp.prototype.getPointingCount = function () { return this.pointingCount; };
            BaseApp.prototype.getStageWidth = function () { return this.stageWidth; };
            BaseApp.prototype.getStageHeight = function () { return this.stageHeight; };
            BaseApp.prototype.getElapsedFrameCount = function () { return this.elapsedFrameCount; };
            BaseApp.prototype.getElapsedTime = function () { return this.elapsedTime; };
            BaseApp.prototype.getCanvas = function () { return this.canvas; };
            BaseApp.prototype.getIsAutoResizeEnabled = function () { return this.isAutoResizeEnabled; };
            BaseApp.prototype.setIsAutoResizeEnabled = function (value) { this.isAutoResizeEnabled = value; };
            return BaseApp;
        }());
        canvas.BaseApp = BaseApp;
    })(canvas = alm.canvas || (alm.canvas = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var canvas;
    (function (canvas) {
        var Pointer = (function () {
            function Pointer(id) {
                this.id = id;
                this.isHovering = false;
                this.isTouching = false;
                this.isDragging = false;
                this.x = 0;
                this.y = 0;
                this.prevX = 0;
                this.prevY = 0;
                this.dragX = 0;
                this.dragY = 0;
                this.velocityX = 0;
                this.velocityY = 0;
                this.touchBeginX = 0;
                this.touchBeginY = 0;
            }
            Pointer.prototype.notifyEnter = function (x, y) {
                this.prevX = this.x = x;
                this.prevY = this.y = y;
                this.isHovering = true;
            };
            Pointer.prototype.notifyLeave = function () {
                this.isHovering = false;
            };
            Pointer.prototype.notifyTouch = function () {
                this.isTouching = true;
                this.touchBeginX = this.x;
                this.touchBeginY = this.y;
            };
            Pointer.prototype.notifyRelease = function () {
                this.isTouching = false;
                this.isDragging = false;
                this.dragX = 0;
                this.dragY = 0;
            };
            Pointer.prototype.notifyMove = function (x, y) {
                this.prevX = this.x;
                this.prevY = this.y;
                this.x = x;
                this.y = y;
                this.velocityX = this.x - this.prevX;
                this.velocityY = this.y - this.prevY;
                if (this.isTouching) {
                    this.isDragging = true;
                }
                if (this.isDragging) {
                    this.dragX = this.x - this.touchBeginX;
                    this.dragY = this.y - this.touchBeginY;
                }
            };
            return Pointer;
        }());
        canvas.Pointer = Pointer;
    })(canvas = alm.canvas || (alm.canvas = {}));
})(alm || (alm = {}));

//# sourceMappingURL=alumican.canvas.js.map
