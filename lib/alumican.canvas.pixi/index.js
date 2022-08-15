var alm;
(function (alm) {
    var canvas;
    (function (canvas_1) {
        class PixiApp extends canvas_1.BaseApp {
            constructor(canvas, isAutoResizeEnabled = true, isAutoUpdateEnabled = true, options) {
                super(canvas, isAutoResizeEnabled, isAutoUpdateEnabled, [options]);
            }
            onPlatformSetup(platformSetupOptions) {
                const options = platformSetupOptions[0];
                this.pixi = new PIXI.Application({
                    autoStart: options && options.autoStart !== undefined ? options.autoStart : true,
                    view: options && options.view !== undefined ? options.view : this.getCanvas().get(0),
                    antialias: options && options.antialias !== undefined ? options.antialias : true,
                    transparent: options && options.transparent !== undefined ? options.transparent : false,
                    resolution: options && options.resolution !== undefined ? options.resolution : window.devicePixelRatio,
                    backgroundColor: options && options.backgroundColor !== undefined ? options.backgroundColor : 0x000000,
                });
            }
            onPlatformResize(stageWidth, stageHeight) {
                const canvas = this.getCanvas();
                canvas.attr({ width: stageWidth, height: stageHeight });
                canvas.css({ width: stageWidth, height: stageHeight });
                this.pixi.renderer.resize(stageWidth, stageHeight);
            }
        }
        canvas_1.PixiApp = PixiApp;
    })(canvas = alm.canvas || (alm.canvas = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
