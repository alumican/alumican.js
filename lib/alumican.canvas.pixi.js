var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var alm;
(function (alm) {
    var canvas;
    (function (canvas_1) {
        var PixiApp = (function (_super) {
            __extends(PixiApp, _super);
            function PixiApp(canvasId, isAutoResizeEnabled, options) {
                if (isAutoResizeEnabled === void 0) { isAutoResizeEnabled = true; }
                return _super.call(this, canvasId, isAutoResizeEnabled, options) || this;
            }
            PixiApp.prototype.onPlatformSetup = function () {
                var platformSetupOptions = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    platformSetupOptions[_i] = arguments[_i];
                }
                var options = platformSetupOptions[0];
                this.pixi = new PIXI.Application({
                    autoStart: options && options.autoStart !== undefined ? options.autoStart : true,
                    view: options && options.view !== undefined ? options.view : this.getCanvas().get(0),
                    antialias: options && options.antialias !== undefined ? options.antialias : true,
                    transparent: options && options.transparent !== undefined ? options.transparent : false,
                    resolution: options && options.resolution !== undefined ? options.resolution : window.devicePixelRatio,
                    backgroundColor: options && options.backgroundColor !== undefined ? options.backgroundColor : 0x000000,
                });
            };
            PixiApp.prototype.onPlatformResize = function (stageWidth, stageHeight) {
                var canvas = this.getCanvas();
                canvas.attr({ width: stageWidth, height: stageHeight });
                canvas.css({ width: stageWidth, height: stageHeight });
                this.pixi.renderer.resize(stageWidth, stageHeight);
            };
            return PixiApp;
        }(canvas_1.BaseApp));
        canvas_1.PixiApp = PixiApp;
    })(canvas = alm.canvas || (alm.canvas = {}));
})(alm || (alm = {}));

//# sourceMappingURL=alumican.canvas.pixi.js.map