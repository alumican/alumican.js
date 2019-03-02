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
    (function (canvas_1) {
        var DeviceInfo = alm.browser.DeviceInfo;
        var PaperApp = (function (_super) {
            __extends(PaperApp, _super);
            function PaperApp(canvas, isAutoResizeEnabled, useGlobalPaper) {
                if (isAutoResizeEnabled === void 0) { isAutoResizeEnabled = true; }
                if (useGlobalPaper === void 0) { useGlobalPaper = true; }
                return _super.call(this, canvas, isAutoResizeEnabled, [useGlobalPaper]) || this;
            }
            PaperApp.prototype.onPlatformSetup = function (platformSetupOptions) {
                this.paper = new paper.PaperScope();
                if (platformSetupOptions[0]) {
                    this.paper.install(paper);
                }
                this.paper.setup(this.getCanvas().get(0));
            };
            PaperApp.prototype.onPlatformRender = function () {
            };
            PaperApp.prototype.onPlatformResize = function (stageWidth, stageHeight) {
                var devicePixelRatio = DeviceInfo.getDevicePixelRatio();
                var viewSize = this.paper.view.viewSize;
                viewSize.width = stageWidth * devicePixelRatio;
                viewSize.height = stageHeight * devicePixelRatio;
                this.paper.view.size.width = stageWidth * devicePixelRatio;
                this.paper.view.size.height = stageHeight * devicePixelRatio;
            };
            return PaperApp;
        }(canvas_1.BaseApp));
        canvas_1.PaperApp = PaperApp;
    })(canvas = alm.canvas || (alm.canvas = {}));
})(alm || (alm = {}));

//# sourceMappingURL=alumican.canvas.paper.js.map
