var alm;
(function (alm) {
    var canvas;
    (function (canvas_1) {
        var EventDispatcher = alm.event.EventDispatcher;
        var DeviceInfo = alm.browser.DeviceInfo;
        var Time = alm.util.Time;
        class BaseApp extends EventDispatcher {
            constructor(canvas, isAutoResizeEnabled = true, isAutoUpdateEnabled = true, platformSetupOptions = null) {
                super();
                this.mouseOverHandler = (event) => {
                    const pointer = this.getMousePointer(event);
                };
                this.mouseOutHandler = (event) => {
                    const pointer = this.getMousePointer(event);
                    delete this.pointersById[this.mousePointerId];
                    const pointerIndex = this.pointerIds.indexOf(this.mousePointerId);
                    if (pointerIndex != -1) {
                        this.pointerIds.splice(pointerIndex, 1);
                    }
                    --this.pointingCount;
                    pointer.notifyLeave();
                    this.onPointerLeave(pointer);
                };
                this.mouseDownHandler = (event) => {
                    const pointer = this.getMousePointer(event);
                    pointer.notifyTouch();
                    this.onPointerTouch(pointer);
                };
                this.mouseUpHandler = (event) => {
                    const pointer = this.getMousePointer(event);
                    pointer.notifyRelease();
                    this.onPointerRelease(pointer);
                };
                this.mouseMoveHandler = (event) => {
                    const pointer = this.getMousePointer(event);
                    const position = this.getMousePointerPosition(event);
                    pointer.notifyMove(position[0], position[1]);
                    this.onPointerMove(pointer);
                    if (pointer.isDragging) {
                        this.onPointerDrag(pointer);
                    }
                };
                this.touchStartHandler = (event) => {
                    const originalEvent = event.originalEvent;
                    const touches = originalEvent.changedTouches;
                    const touchCount = originalEvent.changedTouches.length;
                    let touch;
                    let id;
                    let pointer;
                    for (let i = 0; i < touchCount; ++i) {
                        touch = touches.item(i);
                        id = BaseApp.getPointerId(touch.identifier);
                        pointer = new canvas_1.Pointer(id);
                        this.pointersById[id] = pointer;
                        this.pointerIds.push(id);
                        ++this.pointingCount;
                        const position = this.getTouchPointerPosition(touch);
                        pointer.notifyEnter(position[0], position[1]);
                        pointer.notifyTouch();
                        this.onPointerEnter(pointer);
                        this.onPointerTouch(pointer);
                    }
                };
                this.touchEndHandler = (event) => {
                    const originalEvent = event.originalEvent;
                    const touches = originalEvent.changedTouches;
                    const touchCount = originalEvent.changedTouches.length;
                    let touch;
                    let id;
                    let pointer;
                    for (let i = 0; i < touchCount; ++i) {
                        touch = touches.item(i);
                        id = BaseApp.getPointerId(touch.identifier);
                        pointer = this.pointersById[id];
                        delete this.pointersById[id];
                        const pointerIndex = this.pointerIds.indexOf(id);
                        if (pointerIndex != -1) {
                            this.pointerIds.splice(pointerIndex, 1);
                        }
                        --this.pointingCount;
                        pointer.notifyRelease();
                        pointer.notifyLeave();
                        this.onPointerRelease(pointer);
                        this.onPointerLeave(pointer);
                    }
                };
                this.touchCancelHandler = (event) => {
                    this.touchEndHandler(event);
                };
                this.touchMoveHandler = (event) => {
                    if (!this.isDefaultTouchEventEnabled) {
                        event.originalEvent.preventDefault();
                    }
                    const originalEvent = event.originalEvent;
                    const touches = originalEvent.changedTouches;
                    const touchCount = originalEvent.changedTouches.length;
                    let touch;
                    let id;
                    let pointer;
                    for (let i = 0; i < touchCount; ++i) {
                        touch = touches.item(i);
                        id = BaseApp.getPointerId(touch.identifier);
                        pointer = this.pointersById[id];
                        const position = this.getTouchPointerPosition(touch);
                        pointer.notifyMove(position[0], position[1]);
                        if (pointer.isDragging) {
                            this.onPointerDrag(pointer);
                        }
                    }
                };
                this.touchForceChangeHandler = (event) => {
                    const originalEvent = event.originalEvent;
                    const touches = originalEvent.changedTouches;
                    const touchCount = originalEvent.changedTouches.length;
                    let touch;
                    let id;
                    let pointer;
                    for (let i = 0; i < touchCount; ++i) {
                        touch = touches.item(i);
                        id = BaseApp.getPointerId(touch.identifier);
                        pointer = this.pointersById[id];
                        if (pointer) {
                            pointer.notifyTouchForce(touch.force);
                            this.onPointerTouchForceChange(pointer);
                        }
                    }
                };
                this.keyDownHandler = (event) => {
                    this.onKeyDown(event.key);
                };
                this.keyUpHandler = (event) => {
                    this.onKeyUp(event.key);
                };
                this.requestAnimationFrameHandler = () => {
                    this.update();
                    window.requestAnimationFrame(this.requestAnimationFrameHandler);
                };
                this.resizeHandler = (event) => {
                    const newStageWidth = this.canvas.width();
                    const newStageHeight = this.canvas.height();
                    if (this.stageWidth != newStageWidth || this.stageHeight != newStageHeight) {
                        this.resize(newStageWidth, newStageHeight);
                    }
                };
                this.visibilityStateChangeHandler = (event) => {
                    this.visibilityState = document.visibilityState;
                    this.onVisibilityStateChange(this.visibilityState);
                };
                this.window = jQuery(window);
                this.canvas = jQuery(canvas);
                this.isAutoResizeEnabled = isAutoResizeEnabled;
                this.isAutoUpdateEnabled = isAutoUpdateEnabled;
                this.isDefaultTouchEventEnabled = false;
                this.pointerIds = [];
                this.pointersById = {};
                this.pointingCount = 0;
                this.elapsedFrameCount = 0;
                this.startTime = Time.now();
                this.mousePointerId = 'mouse';
                this.isTouchEnabled = DeviceInfo.getIsTouchEnabled();
                this.isForceTouchEnabled = typeof canvas['ontouchforcechange'] !== 'undefined';
                this.visibilityState = document.visibilityState;
                trace("[BaseApp] canvas : ", canvas);
                trace("[BaseApp] platformSetupOptions : ", platformSetupOptions);
                trace("[BaseApp] isAutoResizeEnabled : " + this.isAutoResizeEnabled);
                trace("[BaseApp] isAutoUpdateEnabled : " + this.isAutoUpdateEnabled);
                trace("[BaseApp] isTouchEnabled : " + this.isTouchEnabled);
                trace("[BaseApp] isForceTouchEnabled : " + this.isForceTouchEnabled);
                if (this.isTouchEnabled) {
                    this.canvas.on('touchstart', this.touchStartHandler);
                    this.canvas.on('touchend', this.touchEndHandler);
                    this.canvas.on('touchcancel', this.touchCancelHandler);
                    this.canvas.on('touchmove', this.touchMoveHandler);
                    if (this.isForceTouchEnabled) {
                        this.canvas.on('touchforcechange', this.touchForceChangeHandler);
                    }
                }
                else {
                    this.canvas.on('mouseover', this.mouseOverHandler);
                    this.canvas.on('mouseout', this.mouseOutHandler);
                    this.canvas.on('mousedown', this.mouseDownHandler);
                    this.canvas.on('mouseup', this.mouseUpHandler);
                    this.canvas.on('mousemove', this.mouseMoveHandler);
                }
                this.window.on('keydown', this.keyDownHandler);
                this.window.on('keyup', this.keyUpHandler);
                jQuery(document).on('visibilitychange', this.visibilityStateChangeHandler);
                if (this.isAutoUpdateEnabled) {
                    window.requestAnimationFrame(this.requestAnimationFrameHandler);
                }
                this.onPlatformSetup(platformSetupOptions || []);
                this.onSetup();
                if (this.isAutoResizeEnabled) {
                    this.window.on('resize', this.resizeHandler);
                    this.resizeHandler(null);
                }
            }
            onSetup() {
            }
            onUpdate() {
            }
            onPointerEnter(pointer) {
            }
            onPointerLeave(pointer) {
            }
            onPointerTouch(pointer) {
            }
            onPointerRelease(pointer) {
            }
            onPointerMove(pointer) {
            }
            onPointerDrag(pointer) {
            }
            onPointerTouchForceChange(pointer) {
            }
            onKeyDown(key) {
            }
            onKeyUp(key) {
            }
            onResize(stageWidth, stageHeight) {
            }
            onVisibilityStateChange(visibilityState) {
            }
            onPlatformSetup(platformSetupOptions) {
            }
            onPlatformRender() {
            }
            onPlatformResize(stageWidth, stageHeight) {
            }
            update() {
                ++this.elapsedFrameCount;
                this.elapsedTime = (Time.now() - this.startTime) / 1000;
                this.onUpdate();
                this.onPlatformRender();
            }
            resize(width, height) {
                this.stageWidth = width;
                this.stageHeight = height;
                trace('[BaseApp] resize : width = ' + this.stageWidth + ', height = ' + this.stageHeight);
                this.onPlatformResize(this.stageWidth, this.stageHeight);
                this.onResize(this.stageWidth, this.stageHeight);
            }
            getMousePointer(event) {
                let pointer = this.pointersById[this.mousePointerId];
                if (pointer == null) {
                    pointer = new canvas_1.Pointer(this.mousePointerId);
                    this.pointersById[this.mousePointerId] = pointer;
                    this.pointerIds.push(this.mousePointerId);
                    ++this.pointingCount;
                    const position = this.getMousePointerPosition(event);
                    pointer.notifyEnter(position[0], position[1]);
                    this.onPointerEnter(pointer);
                }
                return pointer;
            }
            getTouchPointerPosition(touch) {
                const offset = this.getCanvas().offset();
                return [touch.pageX - offset.left, touch.pageY - offset.top];
            }
            getMousePointerPosition(event) {
                const offset = this.getCanvas().offset();
                return [event.pageX - offset.left, event.pageY - offset.top];
            }
            static getPointerId(touchId) {
                return 'touch_' + touchId;
            }
            getPointerIds() { return this.pointerIds; }
            getFirstPointer() { return this.pointingCount > 0 ? this.getPointerById(this.pointerIds[0]) : null; }
            getLastPointer() { return this.pointingCount > 0 ? this.getPointerById(this.pointerIds[this.pointingCount - 1]) : null; }
            getPointerById(id) { return this.pointersById[id]; }
            getPointingCount() { return this.pointingCount; }
            getStageWidth() { return this.stageWidth; }
            getStageHeight() { return this.stageHeight; }
            getElapsedFrameCount() { return this.elapsedFrameCount; }
            getElapsedTime() { return this.elapsedTime; }
            getCanvas() { return this.canvas; }
            getVisibilityState() { return this.visibilityState; }
            getIsAutoResizeEnabled() { return this.isAutoResizeEnabled; }
            getIsAutoUpdateEnabled() { return this.isAutoUpdateEnabled; }
            getIsForceTouchEnabled() { return this.isForceTouchEnabled; }
            getIsTouchEnabled() { return this.isTouchEnabled; }
            getIsDefaultTouchEventEnabled() { return this.isDefaultTouchEventEnabled; }
            setIsDefaultTouchEventEnabled(value) { this.isDefaultTouchEventEnabled = value; }
        }
        canvas_1.BaseApp = BaseApp;
    })(canvas = alm.canvas || (alm.canvas = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var canvas;
    (function (canvas) {
        class Pointer {
            constructor(id) {
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
            notifyEnter(x, y) {
                this.prevX = this.x = x;
                this.prevY = this.y = y;
                this.isHovering = true;
            }
            notifyLeave() {
                this.isHovering = false;
            }
            notifyTouch() {
                this.isTouching = true;
                this.touchBeginX = this.x;
                this.touchBeginY = this.y;
            }
            notifyRelease() {
                this.isTouching = false;
                this.isDragging = false;
                this.dragX = 0;
                this.dragY = 0;
            }
            notifyMove(x, y) {
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
            }
            notifyTouchForce(force) {
                this.touchForce = force;
            }
        }
        canvas.Pointer = Pointer;
    })(canvas = alm.canvas || (alm.canvas = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
