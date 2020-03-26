/// <reference path="../src/@types/pixi.js/4.8/index.d.ts" />
/// <reference path="../lib/alumican.d.ts" />
/// <reference path="../lib/alumican.canvas.d.ts" />
declare namespace alm.canvas {
    class PixiApp extends BaseApp {
        constructor(canvas: HTMLElement, isAutoResizeEnabled?: boolean, isAutoUpdateEnabled?: boolean, options?: PIXI.ApplicationOptions);
        protected onPlatformSetup(platformSetupOptions: any[]): void;
        protected onPlatformResize(stageWidth: number, stageHeight: number): void;
        pixi: PIXI.Application;
    }
}
