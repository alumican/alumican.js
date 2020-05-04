/// <reference types="pixi.js@4.8.6" />
/// <reference types="alumican.canvas" />
declare namespace alm.canvas {
    class PixiApp extends BaseApp {
        constructor(canvas: HTMLElement, isAutoResizeEnabled?: boolean, isAutoUpdateEnabled?: boolean, options?: PIXI.ApplicationOptions);
        protected onPlatformSetup(platformSetupOptions: any[]): void;
        protected onPlatformResize(stageWidth: number, stageHeight: number): void;
        pixi: PIXI.Application;
    }
}
