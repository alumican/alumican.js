var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var alm;
(function (alm) {
    var canvas;
    (function (canvas) {
        var PaperApp = (function (_super) {
            __extends(PaperApp, _super);
            function PaperApp(canvasId, isAutoResizeEnabled) {
                if (isAutoResizeEnabled === void 0) { isAutoResizeEnabled = true; }
                return _super.call(this, canvasId, isAutoResizeEnabled) || this;
            }
            PaperApp.prototype.onPlatformSetup = function () {
                var platformSetupOptions = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    platformSetupOptions[_i] = arguments[_i];
                }
                paper.setup(this.getCanvas().get(0));
            };
            PaperApp.prototype.onPlatformRender = function () {
            };
            PaperApp.prototype.onPlatformResize = function (stageWidth, stageHeight) {
                this.getCanvas().attr({ width: stageWidth, height: stageHeight });
                var viewSize = paper.view.viewSize;
                viewSize.width = stageWidth;
                viewSize.height = stageHeight;
            };
            return PaperApp;
        }(canvas.BaseApp));
        canvas.PaperApp = PaperApp;
    })(canvas = alm.canvas || (alm.canvas = {}));
})(alm || (alm = {}));

//# sourceMappingURL=alumican.canvas.paper.js.map
