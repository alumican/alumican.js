declare namespace alm.multitouch {
    class Multitouch extends EventTarget {
        constructor(startHitArea: HTMLElement | Window, moveEndHitArea?: HTMLElement | Window);
        start(): void;
        stop(): void;
        dispose(): void;
        private hitAreaTouchStartHandler;
        private hitAreaTouchMoveHandler;
        private hitAreaTouchEndHandler;
        private getTouchPointer;
        private hitAreaMouseDownHandler;
        private hitAreaMouseMoveHandler;
        private hitAreaMouseUpHandler;
        private dispatchDefaultEvent;
        getIsTouching(): boolean;
        getTouchingCount(): number;
        getTouchingPointerIds(): number[];
        getTouchingPointer(pointerId: number): MultitouchPointer;
        getOldestPointer(): MultitouchPointer;
        getLatestPointer(): MultitouchPointer;
        private touchingPointersByPointerId;
        private touchingPointerIds;
        private touchingCount;
        private isTouching;
        private readonly isTouchEventEnabled;
        private startHitArea;
        private moveEndHitArea;
        private mousePointerId;
        private static mousePointerId;
    }
}
declare namespace alm.multitouch {
    class MultitouchPointer {
        constructor(pointerId: number, x?: number, y?: number);
        readonly pointerId: number;
        isTouching: boolean;
        isFirstTouch: boolean;
        isLastTouch: boolean;
        isOldestTouch: boolean;
        isLatestTouch: boolean;
        x: number;
        y: number;
        touchStartTime: number;
        touchEndTime: number;
        oldestStartTime: number;
        latestStartTime: number;
    }
}
declare namespace alm.multitouch {
    enum MultitouchEventType {
        touchStart = "touchstart",
        touchMove = "touchmove",
        touchEnd = "touchend"
    }
    interface MultitouchEventDetail {
        pointer: MultitouchPointer;
    }
    class MultitouchEvent extends CustomEvent<MultitouchEventDetail> {
        constructor(type: MultitouchEventType, options: CustomEventInit<MultitouchEventDetail>);
    }
}
declare namespace alm.multitouch {
    class TouchUtil {
        static getIsTouchEventSupported(): boolean;
        static getLocalTouchPosition(touch: Touch, local: HTMLElement | Window): {
            offsetX: number;
            offsetY: number;
        };
        static getLocalPosition(clientX: number, clientY: number, local: HTMLElement | Window): {
            offsetX: number;
            offsetY: number;
        };
        private constructor();
    }
}
