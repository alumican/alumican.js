/// <reference path="../lib/alumican.d.ts" />
/// <reference types="jquery" />
declare namespace alm.canvas {
    import EventDispatcher = alm.event.EventDispatcher;
    abstract class BaseApp extends EventDispatcher {
        constructor(canvas: HTMLElement, isAutoResizeEnabled?: boolean, isAutoUpdateEnabled?: boolean, platformSetupOptions?: any[]);
        onSetup(): void;
        onUpdate(): void;
        onPointerEnter(pointer: Pointer): void;
        onPointerLeave(pointer: Pointer): void;
        onPointerTouch(pointer: Pointer): void;
        onPointerRelease(pointer: Pointer): void;
        onPointerMove(pointer: Pointer): void;
        onPointerDrag(pointer: Pointer): void;
        onPointerTouchForceChange(pointer: Pointer): void;
        onKeyDown(key: string): void;
        onKeyUp(key: string): void;
        onResize(stageWidth: number, stageHeight: number): void;
        onVisibilityStateChange(visibilityState: VisibilityState): void;
        protected onPlatformSetup(platformSetupOptions: any[]): void;
        protected onPlatformRender(): void;
        protected onPlatformResize(stageWidth: number, stageHeight: number): void;
        update(): void;
        resize(width: number, height: number): void;
        private mouseOverHandler;
        private mouseOutHandler;
        private mouseDownHandler;
        private mouseUpHandler;
        private mouseMoveHandler;
        private touchStartHandler;
        private touchEndHandler;
        private touchCancelHandler;
        private touchMoveHandler;
        private touchForceChangeHandler;
        private keyDownHandler;
        private keyUpHandler;
        private requestAnimationFrameHandler;
        private resizeHandler;
        private visibilityStateChangeHandler;
        private getMousePointer;
        private getTouchPointerPosition;
        private getMousePointerPosition;
        static getPointerId(touchId: number): string;
        getPointerIds(): string[];
        private pointerIds;
        getFirstPointer(): Pointer;
        getLastPointer(): Pointer;
        getPointerById(id: string): Pointer;
        private pointersById;
        getPointingCount(): number;
        private pointingCount;
        getStageWidth(): number;
        private stageWidth;
        getStageHeight(): number;
        private stageHeight;
        getElapsedFrameCount(): number;
        private elapsedFrameCount;
        getElapsedTime(): number;
        private elapsedTime;
        getCanvas(): JQuery<HTMLCanvasElement>;
        private canvas;
        getVisibilityState(): VisibilityState;
        private visibilityState;
        getIsAutoResizeEnabled(): boolean;
        private isAutoResizeEnabled;
        getIsAutoUpdateEnabled(): boolean;
        private isAutoUpdateEnabled;
        getIsForceTouchEnabled(): boolean;
        private isForceTouchEnabled;
        getIsTouchEnabled(): boolean;
        private isTouchEnabled;
        getIsDefaultTouchEventEnabled(): boolean;
        setIsDefaultTouchEventEnabled(value: boolean): void;
        private isDefaultTouchEventEnabled;
        private startTime;
        private mousePointerId;
        private window;
        private animationFrameTicker;
    }
}
declare namespace alm.canvas {
    class Pointer {
        constructor(id: string);
        notifyEnter(x: number, y: number): void;
        notifyLeave(): void;
        notifyTouch(): void;
        notifyRelease(): void;
        notifyMove(x: number, y: number): void;
        notifyTouchForce(force: number): void;
        id: string;
        isHovering: boolean;
        isTouching: boolean;
        isDragging: boolean;
        x: number;
        y: number;
        prevX: number;
        prevY: number;
        dragX: number;
        dragY: number;
        velocityX: number;
        velocityY: number;
        touchBeginX: number;
        touchBeginY: number;
        touchForce: number;
    }
}
