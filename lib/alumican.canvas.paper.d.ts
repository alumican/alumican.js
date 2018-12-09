/// <reference path="../lib/alumican.d.ts" />
/// <reference path="../lib/alumican.canvas.d.ts" />
declare namespace alm.canvas {
    class PaperApp extends BaseApp {
        constructor(canvasId: string, isAutoResizeEnabled?: boolean);
        protected onPlatformSetup(...platformSetupOptions: any[]): void;
        protected onPlatformRender(): void;
        protected onPlatformResize(stageWidth: number, stageHeight: number): void;
    }
}
