var alm;
(function (alm) {
    var multitouch;
    (function (multitouch) {
        class Multitouch extends EventTarget {
            constructor(startHitArea, moveEndHitArea = null) {
                super();
                this.hitAreaTouchStartHandler = (event) => {
                    for (let pointerId in this.touchingPointersByPointerId) {
                        const pointer = this.touchingPointersByPointerId[pointerId];
                        pointer.isLastTouch = false;
                        pointer.isLatestTouch = false;
                    }
                    const changedTouches = event.changedTouches;
                    const changedTouchCount = changedTouches.length;
                    for (let i = 0; i < changedTouchCount; ++i) {
                        const touch = changedTouches.item(i);
                        const pointer = this.getTouchPointer(touch);
                        pointer.isTouching = true;
                        const localPosition = multitouch.TouchUtil.getLocalTouchPosition(touch, this.startHitArea);
                        pointer.x = localPosition.offsetX;
                        pointer.y = localPosition.offsetY;
                        if (i === changedTouchCount - 1) {
                            pointer.isLastTouch = true;
                            pointer.isLatestTouch = true;
                            pointer.latestStartTime = performance.now();
                        }
                        if (!this.isTouching && (this.touchingCount === 1)) {
                            pointer.isFirstTouch = true;
                            pointer.isOldestTouch = true;
                            pointer.oldestStartTime = performance.now();
                        }
                        this.isTouching = this.touchingCount > 0;
                        this.dispatchDefaultEvent(multitouch.MultitouchEventType.touchStart, pointer);
                    }
                };
                this.hitAreaTouchMoveHandler = (event) => {
                    if (this.touchingCount === 0)
                        return;
                    const changedTouches = event.changedTouches;
                    const changedTouchCount = changedTouches.length;
                    for (let i = 0; i < changedTouchCount; ++i) {
                        const touch = changedTouches.item(i);
                        const pointer = this.getTouchPointer(touch);
                        pointer.isTouching = true;
                        const localPosition = multitouch.TouchUtil.getLocalTouchPosition(touch, this.startHitArea);
                        pointer.x = localPosition.offsetX;
                        pointer.y = localPosition.offsetY;
                        this.dispatchDefaultEvent(multitouch.MultitouchEventType.touchMove, pointer);
                    }
                };
                this.hitAreaTouchEndHandler = (event) => {
                    if (this.touchingCount === 0)
                        return;
                    const changedTouches = event.changedTouches;
                    const changedTouchCount = changedTouches.length;
                    for (let i = 0; i < changedTouchCount; ++i) {
                        const touch = changedTouches.item(i);
                        const pointer = this.getTouchPointer(touch);
                        pointer.isTouching = false;
                        pointer.isOldestTouch = false;
                        pointer.isLatestTouch = false;
                        const localPosition = multitouch.TouchUtil.getLocalTouchPosition(touch, this.startHitArea);
                        pointer.x = localPosition.offsetX;
                        pointer.y = localPosition.offsetY;
                        const pointerIndex = this.touchingPointerIds.indexOf(pointer.pointerId);
                        if (pointerIndex !== -1) {
                            this.touchingPointerIds.splice(pointerIndex, 1);
                            this.touchingCount = this.touchingPointerIds.length;
                        }
                        delete this.touchingPointersByPointerId[pointer.pointerId];
                        this.isTouching = this.touchingCount > 0;
                        this.dispatchDefaultEvent(multitouch.MultitouchEventType.touchEnd, pointer);
                    }
                    {
                        const pointer = this.getOldestPointer();
                        if (pointer && !pointer.isOldestTouch) {
                            pointer.isOldestTouch = true;
                            pointer.oldestStartTime = performance.now();
                        }
                    }
                    {
                        const pointer = this.getLatestPointer();
                        if (pointer && !pointer.isLatestTouch) {
                            pointer.isLatestTouch = true;
                            pointer.latestStartTime = performance.now();
                        }
                    }
                };
                this.hitAreaMouseDownHandler = (event) => {
                    this.touchingCount = 1;
                    this.isTouching = true;
                    this.mousePointerId = ++Multitouch.mousePointerId;
                    const localPosition = multitouch.TouchUtil.getLocalPosition(event.clientX, event.clientY, this.startHitArea);
                    const pointer = new multitouch.MultitouchPointer(this.mousePointerId, localPosition.offsetX, localPosition.offsetY);
                    pointer.isTouching = true;
                    pointer.isFirstTouch = true;
                    pointer.isLastTouch = true;
                    pointer.isOldestTouch = true;
                    pointer.isLatestTouch = true;
                    this.touchingPointersByPointerId[pointer.pointerId] = pointer;
                    this.touchingPointerIds.push(pointer.pointerId);
                    this.dispatchDefaultEvent(multitouch.MultitouchEventType.touchStart, pointer);
                };
                this.hitAreaMouseMoveHandler = (event) => {
                    if (this.touchingCount === 0)
                        return;
                    const pointer = this.touchingPointersByPointerId[this.mousePointerId];
                    pointer.isTouching = true;
                    const localPosition = multitouch.TouchUtil.getLocalPosition(event.clientX, event.clientY, this.startHitArea);
                    pointer.x = localPosition.offsetX;
                    pointer.y = localPosition.offsetY;
                    this.dispatchDefaultEvent(multitouch.MultitouchEventType.touchMove, pointer);
                };
                this.hitAreaMouseUpHandler = (event) => {
                    if (this.touchingCount === 0)
                        return;
                    this.touchingCount = 0;
                    this.isTouching = false;
                    const pointer = this.touchingPointersByPointerId[this.mousePointerId];
                    pointer.isTouching = false;
                    pointer.isOldestTouch = false;
                    pointer.isLatestTouch = false;
                    pointer.touchEndTime = performance.now();
                    this.mousePointerId = -1;
                    const localPosition = multitouch.TouchUtil.getLocalPosition(event.clientX, event.clientY, this.startHitArea);
                    pointer.x = localPosition.offsetX;
                    pointer.y = localPosition.offsetY;
                    delete this.touchingPointersByPointerId[pointer.pointerId];
                    this.touchingPointerIds.pop();
                    this.dispatchDefaultEvent(multitouch.MultitouchEventType.touchEnd, pointer);
                };
                this.startHitArea = startHitArea;
                this.moveEndHitArea = moveEndHitArea || window;
                this.isTouchEventEnabled = multitouch.TouchUtil.getIsTouchEventSupported();
                this.touchingPointersByPointerId = {};
                this.touchingPointerIds = [];
                this.touchingCount = 0;
                console.debug('[Multitouch] touchEvent enabled :', this.isTouchEventEnabled);
            }
            start() {
                console.debug('[Multitouch] start');
                if (this.isTouchEventEnabled) {
                    this.startHitArea.addEventListener('touchstart', this.hitAreaTouchStartHandler);
                    this.moveEndHitArea.addEventListener('touchmove', this.hitAreaTouchMoveHandler);
                    this.moveEndHitArea.addEventListener('touchend', this.hitAreaTouchEndHandler);
                }
                else {
                    this.startHitArea.addEventListener('mousedown', this.hitAreaMouseDownHandler);
                    this.moveEndHitArea.addEventListener('mousemove', this.hitAreaMouseMoveHandler);
                    this.moveEndHitArea.addEventListener('mouseup', this.hitAreaMouseUpHandler);
                }
            }
            stop() {
                console.debug('[Multitouch] stop');
                if (this.isTouchEventEnabled) {
                    this.startHitArea.removeEventListener('touchstart', this.hitAreaTouchStartHandler);
                    this.moveEndHitArea.removeEventListener('touchmove', this.hitAreaTouchMoveHandler);
                    this.moveEndHitArea.removeEventListener('touchend', this.hitAreaTouchEndHandler);
                }
                else {
                    this.startHitArea.removeEventListener('mousedown', this.hitAreaMouseDownHandler);
                    this.moveEndHitArea.removeEventListener('mousemove', this.hitAreaMouseMoveHandler);
                    this.moveEndHitArea.removeEventListener('mouseup', this.hitAreaMouseUpHandler);
                }
            }
            dispose() {
                this.stop();
                this.startHitArea = null;
                this.moveEndHitArea = null;
                this.touchingPointersByPointerId = null;
                this.touchingPointerIds = null;
            }
            getTouchPointer(touch) {
                const touchId = touch.identifier;
                let pointer = this.touchingPointersByPointerId[touchId];
                if (!pointer) {
                    pointer = this.touchingPointersByPointerId[touchId] = new multitouch.MultitouchPointer(touchId);
                    this.touchingPointerIds.push(pointer.pointerId);
                    this.touchingCount = this.touchingPointerIds.length;
                }
                return pointer;
            }
            dispatchDefaultEvent(eventType, pointer) {
                this.dispatchEvent(new multitouch.MultitouchEvent(eventType, { detail: { pointer: pointer } }));
            }
            getIsTouching() {
                return this.isTouching;
            }
            getTouchingCount() {
                return this.touchingCount;
            }
            getTouchingPointerIds() {
                return this.touchingPointerIds.concat();
            }
            getTouchingPointer(pointerId) {
                return this.touchingPointersByPointerId[pointerId];
            }
            getOldestPointer() {
                return this.touchingCount > 0 ? this.touchingPointersByPointerId[this.touchingPointerIds[0]] : null;
            }
            getLatestPointer() {
                return this.touchingCount > 0 ? this.touchingPointersByPointerId[this.touchingPointerIds[this.touchingCount - 1]] : null;
            }
        }
        Multitouch.mousePointerId = -1;
        multitouch.Multitouch = Multitouch;
    })(multitouch = alm.multitouch || (alm.multitouch = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var multitouch;
    (function (multitouch) {
        class MultitouchPointer {
            constructor(pointerId, x = 0, y = 0) {
                this.pointerId = pointerId;
                this.isTouching = false;
                this.isFirstTouch = false;
                this.isLastTouch = false;
                this.isOldestTouch = false;
                this.isLatestTouch = false;
                this.x = x;
                this.y = y;
                this.touchStartTime = performance.now();
                this.touchEndTime = -1;
                this.oldestStartTime = -1;
                this.latestStartTime = -1;
            }
        }
        multitouch.MultitouchPointer = MultitouchPointer;
    })(multitouch = alm.multitouch || (alm.multitouch = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var multitouch;
    (function (multitouch) {
        let MultitouchEventType;
        (function (MultitouchEventType) {
            MultitouchEventType["touchStart"] = "touchstart";
            MultitouchEventType["touchMove"] = "touchmove";
            MultitouchEventType["touchEnd"] = "touchend";
        })(MultitouchEventType = multitouch.MultitouchEventType || (multitouch.MultitouchEventType = {}));
        class MultitouchEvent extends CustomEvent {
            constructor(type, options) {
                super(type, options);
            }
        }
        multitouch.MultitouchEvent = MultitouchEvent;
    })(multitouch = alm.multitouch || (alm.multitouch = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var multitouch;
    (function (multitouch) {
        class TouchUtil {
            static getIsTouchEventSupported() {
                return (window.document['ontouchstart'] !== undefined) || (window.navigator.maxTouchPoints > 0);
            }
            static getLocalTouchPosition(touch, local) {
                return TouchUtil.getLocalPosition(touch.clientX, touch.clientY, local);
            }
            static getLocalPosition(clientX, clientY, local) {
                if (local['getBoundingClientRect']) {
                    const rect = local.getBoundingClientRect();
                    return { offsetX: clientX - window.scrollX - rect.left, offsetY: clientY - window.scrollY - rect.top };
                }
                else {
                    return { offsetX: clientX, offsetY: clientY };
                }
            }
            constructor() {
            }
        }
        multitouch.TouchUtil = TouchUtil;
    })(multitouch = alm.multitouch || (alm.multitouch = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
