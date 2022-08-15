var alm;
(function (alm) {
    var unlock_gesture;
    (function (unlock_gesture) {
        var Timer = alm.time.Timer;
        var TimerEvent = alm.time.TimerEvent;
        var EventDispatcher = alm.event.EventDispatcher;
        var Dom = alm.util.Dom;
        class UnlockGesture extends EventDispatcher {
            constructor(commands, resetDuration = 10000, hitArea = window) {
                super();
                this.windowPointerDownHandler = (event) => {
                    const command = this.restCommands[0];
                    const targetBounds = command.getBoundingClientRect();
                    const pointerX = event.clientX;
                    const pointerY = event.clientY;
                    if ((pointerX >= targetBounds.left) && (pointerY >= targetBounds.top) && (pointerX <= targetBounds.right) && (pointerY <= targetBounds.bottom)) {
                        this.restCommands.shift();
                        this.restCount = this.restCommands.length;
                        this.totalCount = this.defaultCommands.length;
                        this.currentCount = this.totalCount - this.restCount;
                        if (this.currentCount == 1) {
                            trace('[UnlockGesture] reset timer : start');
                            this.resetTimer.start();
                        }
                        if (this.restCount > 0) {
                            trace('[UnlockGesture] ok :', this.currentCount, '/', this.totalCount);
                            this.dispatchEvent(new unlock_gesture.UnlockGestureProgressEvent(unlock_gesture.UnlockGestureProgressEvent.progress, this, this.currentCount, this.totalCount));
                        }
                        else {
                            trace('[UnlockGesture] ok : complete');
                            this.dispatchEvent(new unlock_gesture.UnlockGestureProgressEvent(unlock_gesture.UnlockGestureProgressEvent.progress, this, this.currentCount, this.totalCount));
                            this.dispatchEvent(new unlock_gesture.UnlockGestureEvent(unlock_gesture.UnlockGestureEvent.complete, this));
                        }
                    }
                    else {
                        if (this.currentCount > 1) {
                            trace('[UnlockGesture] failure');
                            this.reset();
                            this.dispatchEvent(new unlock_gesture.UnlockGestureEvent(unlock_gesture.UnlockGestureEvent.failure, this));
                        }
                    }
                };
                this.resetTimerCompleteHandler = (event) => {
                    trace('[UnlockGesture] reset time : complete');
                    this.reset();
                };
                this.isRunning = false;
                this.defaultCommands = commands.concat();
                this.totalCount = this.defaultCommands.length;
                this.resetDuration = resetDuration;
                this.resetTimer = new Timer(this.resetDuration, 1);
                this.resetTimer.addEventListener(TimerEvent.complete, this.resetTimerCompleteHandler);
                this.hitArea = hitArea;
                this.reset();
            }
            startObserving(eventListenerOptions = null) {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                Dom.addPointerDownListener(this.hitArea, this.windowPointerDownHandler, eventListenerOptions);
                this.reset();
            }
            stopObserving(eventListenerOptions = null) {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                Dom.removePointerDownListener(this.hitArea, this.windowPointerDownHandler, eventListenerOptions);
            }
            reset() {
                trace('[UnlockGesture] reset');
                this.restCommands = this.defaultCommands.concat();
                this.resetTimer.reset();
                this.restCount = this.totalCount;
                this.currentCount = 0;
                this.dispatchEvent(new unlock_gesture.UnlockGestureEvent(unlock_gesture.UnlockGestureEvent.reset, this));
            }
        }
        unlock_gesture.UnlockGesture = UnlockGesture;
    })(unlock_gesture = alm.unlock_gesture || (alm.unlock_gesture = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var unlock_gesture;
    (function (unlock_gesture) {
        class UnlockGestureEvent extends alm.event.Event {
            constructor(eventType, target) {
                super(eventType, target);
            }
        }
        UnlockGestureEvent.complete = 'UnlockGestureEvent.complete';
        UnlockGestureEvent.failure = 'UnlockGestureEvent.failure';
        UnlockGestureEvent.reset = 'UnlockGestureEvent.reset';
        unlock_gesture.UnlockGestureEvent = UnlockGestureEvent;
    })(unlock_gesture = alm.unlock_gesture || (alm.unlock_gesture = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var unlock_gesture;
    (function (unlock_gesture) {
        class UnlockGestureProgressEvent extends alm.event.Event {
            constructor(eventType, target, current, total) {
                super(eventType, target);
                this.current = current;
                this.total = total;
            }
        }
        UnlockGestureProgressEvent.progress = 'UnlockGestureProgressEvent.progress';
        unlock_gesture.UnlockGestureProgressEvent = UnlockGestureProgressEvent;
    })(unlock_gesture = alm.unlock_gesture || (alm.unlock_gesture = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
