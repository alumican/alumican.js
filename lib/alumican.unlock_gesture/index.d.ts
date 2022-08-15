/// <reference types="alumican" />
declare namespace alm.unlock_gesture {
    import EventDispatcher = alm.event.EventDispatcher;
    class UnlockGesture extends EventDispatcher {
        constructor(commands: HTMLElement[], resetDuration?: number, hitArea?: HTMLElement | Window);
        startObserving(eventListenerOptions?: AddEventListenerOptions): void;
        stopObserving(eventListenerOptions?: EventListenerOptions): void;
        reset(): void;
        private windowPointerDownHandler;
        private resetTimerCompleteHandler;
        private isRunning;
        private hitArea;
        private defaultCommands;
        private restCommands;
        private totalCount;
        private restCount;
        private currentCount;
        private resetTimer;
        private resetDuration;
    }
}
declare namespace alm.unlock_gesture {
    class UnlockGestureEvent extends alm.event.Event {
        static readonly complete: string;
        static readonly failure: string;
        static readonly reset: string;
        constructor(eventType: string, target: object);
    }
}
declare namespace alm.unlock_gesture {
    class UnlockGestureProgressEvent extends alm.event.Event {
        static readonly progress: string;
        constructor(eventType: string, target: object, current: number, total: number);
        readonly current: number;
        readonly total: number;
    }
}
