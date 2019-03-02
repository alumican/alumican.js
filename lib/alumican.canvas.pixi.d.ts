/// <reference path="../lib/alumican.d.ts" />
/// <reference path="../lib/alumican.canvas.d.ts" />
/// <reference types="pixi.js" />
declare namespace alm.canvas {
    class PixiApp extends BaseApp {
        constructor(canvas: HTMLElement, isAutoResizeEnabled?: boolean, options?: PIXI.ApplicationOptions);
        protected onPlatformSetup(platformSetupOptions: any[]): void;
        protected onPlatformResize(stageWidth: number, stageHeight: number): void;
        pixi: PIXI.Application;
    }
}
