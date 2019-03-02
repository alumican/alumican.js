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
    var canvas;
    (function (canvas_1) {
        var EventDispatcher = alm.event.EventDispatcher;
        var DeviceInfo = alm.browser.DeviceInfo;
        var BaseApp = (function (_super) {
            __extends(BaseApp, _super);
            function BaseApp(canvas, isAutoResizeEnabled) {
                if (isAutoResizeEnabled === void 0) { isAutoResizeEnabled = true; }
                var platformSetupOptions = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    platformSetupOptions[_i - 2] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                _this.mouseOverHandler = function (event) {
                    var pointer = _this.getMousePointer(event);
                };
                _this.mouseOutHandler = function (event) {
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
                _this.mouseDownHandler = function (event) {
                    var pointer = _this.getMousePointer(event);
                    pointer.notifyTouch();
                    _this.onPointerTouch(pointer);
                };
                _this.mouseUpHandler = function (event) {
                    var pointer = _this.getMousePointer(event);
                    pointer.notifyRelease();
                    _this.onPointerRelease(pointer);
                };
                _this.mouseMoveHandler = function (event) {
                    var pointer = _this.getMousePointer(event);
                    var position = _this.getPointerPosition(event);
                    pointer.notifyMove(position[0], position[1]);
                    _this.onPointerMove(pointer);
                    if (pointer.isDragging) {
                        _this.onPointerDrag(pointer);
                    }
                };
                _this.touchStartHandler = function (event) {
                    var touches = event.changedTouches;
                    var touchCount = event.changedTouches.length;
                    var touch;
                    var id;
                    var pointer;
                    for (var i = 0; i < touchCount; ++i) {
                        touch = touches.item(i);
                        id = BaseApp.getPointerId(touch.identifier);
                        pointer = new canvas_1.Pointer(id);
                        _this.pointersById[id] = pointer;
                        _this.pointerIds.push(id);
                        ++_this.pointingCount;
                        var position = _this.getPointerPosition(event);
                        pointer.notifyEnter(position[0], position[1]);
                        pointer.notifyTouch();
                        _this.onPointerEnter(pointer);
                        _this.onPointerTouch(pointer);
                    }
                };
                _this.touchEndHandler = function (event) {
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
                _this.touchCancelHandler = function (event) {
                    _this.touchEndHandler(event);
                };
                _this.touchMoveHandler = function (event) {
                    event.originalEvent.preventDefault();
                    var touches = event.changedTouches;
                    var touchCount = event.changedTouches.length;
                    var touch;
                    var id;
                    var pointer;
                    for (var i = 0; i < touchCount; ++i) {
                        touch = touches.item(i);
                        id = BaseApp.getPointerId(touch.identifier);
                        pointer = _this.pointersById[id];
                        var position = _this.getPointerPosition(event);
                        pointer.notifyMove(position[0], position[1]);
                        if (pointer.isDragging) {
                            _this.onPointerDrag(pointer);
                        }
                    }
                };
                _this.touchForceChangeHandler = function (event) {
                    var touches = event.changedTouches;
                    var touchCount = event.changedTouches.length;
                    var touch;
                    var id;
                    var pointer;
                    for (var i = 0; i < touchCount; ++i) {
                        touch = touches.item(i);
                        id = BaseApp.getPointerId(touch.identifier);
                        pointer = _this.pointersById[id];
                        if (pointer) {
                            pointer.notifyTouchForce(touch.force);
                            _this.onPointerTouchForceChange(pointer);
                        }
                    }
                };
                _this.keyDownHandler = function (event) {
                    _this.onKeyDown(event.key);
                };
                _this.keyUpHandler = function (event) {
                    _this.onKeyUp(event.key);
                };
                _this.resizeHandler = function (event) {
                    _this.resize(_this.canvas.width(), _this.canvas.height());
                };
                _this.requestAnimationFrame = function () {
                    ++_this.elapsedFrameCount;
                    _this.elapsedTime = (new Date().getTime() - _this.startTime) / 1000;
                    _this.onUpdate();
                    _this.onPlatformRender();
                    requestAnimationFrame(_this.requestAnimationFrame);
                };
                _this.canvas = jQuery(canvas);
                _this.isAutoResizeEnabled = isAutoResizeEnabled;
                trace("[BaseApp] canvas : ", canvas);
                trace("[BaseApp] isAutoResizeEnabled : " + _this.isAutoResizeEnabled);
                _this.pointerIds = [];
                _this.pointersById = {};
                _this.pointingCount = 0;
                _this.elapsedFrameCount = 0;
                _this.startTime = new Date().getTime();
                _this.mousePointerId = 'mouse';
                if (DeviceInfo.getIsTouchEnabled()) {
                    _this.canvas.on('touchstart', _this.touchStartHandler);
                    _this.canvas.on('touchend', _this.touchEndHandler);
                    _this.canvas.on('touchcancel', _this.touchCancelHandler);
                    _this.canvas.on('touchmove', _this.touchMoveHandler);
                    _this.canvas.on('touchforcechange', _this.touchForceChangeHandler);
                }
                else {
                    _this.canvas.on('mouseover', _this.mouseOverHandler);
                    _this.canvas.on('mouseout', _this.mouseOutHandler);
                    _this.canvas.on('mousedown', _this.mouseDownHandler);
                    _this.canvas.on('mouseup', _this.mouseUpHandler);
                    _this.canvas.on('mousemove', _this.mouseMoveHandler);
                }
                _this.canvas.on('keydown', _this.keyDownHandler);
                _this.canvas.on('keyup', _this.keyUpHandler);
                _this.canvas.attr('tabindex', 1);
                requestAnimationFrame(_this.requestAnimationFrame);
                _this.onPlatformSetup.apply(_this, platformSetupOptions);
                _this.onSetup();
                if (_this.isAutoResizeEnabled) {
                    _this.canvas.on('resize', _this.resizeHandler);
                    _this.resizeHandler(null);
                }
                return _this;
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
            BaseApp.prototype.onPointerTouchForceChange = function (pointer) {
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
                    pointer = new canvas_1.Pointer(this.mousePointerId);
                    this.pointersById[this.mousePointerId] = pointer;
                    this.pointerIds.push(this.mousePointerId);
                    ++this.pointingCount;
                    var position = this.getPointerPosition(event);
                    pointer.notifyEnter(position[0], position[1]);
                    this.onPointerEnter(pointer);
                }
                return pointer;
            };
            BaseApp.prototype.getPointerPosition = function (event) {
                var offset = this.getCanvas().offset();
                return [
                    event.pageX - offset.left,
                    event.pageY - offset.top
                ];
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
        }(EventDispatcher));
        canvas_1.BaseApp = BaseApp;
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
                this.touchForce = 0;
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
            Pointer.prototype.notifyTouchForce = function (force) {
                this.touchForce = force;
            };
            return Pointer;
        }());
        canvas.Pointer = Pointer;
    })(canvas = alm.canvas || (alm.canvas = {}));
})(alm || (alm = {}));

//# sourceMappingURL=alumican.canvas.js.map
