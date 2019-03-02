/// <reference path="../lib/alumican.d.ts" />
/// <reference path="../lib/alumican.canvas.d.ts" />
/// <reference types="paper" />
declare namespace alm.canvas {
    class PaperApp extends BaseApp {
        constructor(canvas: HTMLElement, isAutoResizeEnabled?: boolean);
        protected onPlatformSetup(platformSetupOptions: any[]): void;
        protected onPlatformRender(): void;
        protected onPlatformResize(stageWidth: number, stageHeight: number): void;
        protected paper: paper.PaperScope;
    }
}
