/// <reference types="paper@0.11.8" />
/// <reference types="alumican.canvas" />
declare namespace alm.canvas {
    class PaperApp extends BaseApp {
        constructor(canvas: HTMLElement, isAutoResizeEnabled?: boolean, isAutoUpdateEnabled?: boolean);
        protected onPlatformSetup(platformSetupOptions: any[]): void;
        protected onPlatformRender(): void;
        protected onPlatformResize(stageWidth: number, stageHeight: number): void;
        protected paper: paper.PaperScope;
    }
}
