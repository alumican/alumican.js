var alm;
(function (alm) {
    var canvas;
    (function (canvas_1) {
        var DeviceInfo = alm.browser.DeviceInfo;
        class PaperApp extends canvas_1.BaseApp {
            constructor(canvas, isAutoResizeEnabled = true, isAutoUpdateEnabled = true) {
                super(canvas, isAutoResizeEnabled, isAutoUpdateEnabled);
            }
            onPlatformSetup(platformSetupOptions) {
                this.paper = new paper.PaperScope();
                this.paper.setup(this.getCanvas().get(0));
            }
            onPlatformRender() {
            }
            onPlatformResize(stageWidth, stageHeight) {
                const devicePixelRatio = DeviceInfo.getDevicePixelRatio();
                const viewSize = this.paper.view.viewSize;
                viewSize.width = stageWidth;
                viewSize.height = stageHeight;
                this.paper.view.size.width = stageWidth;
                this.paper.view.size.height = stageHeight;
            }
        }
        canvas_1.PaperApp = PaperApp;
    })(canvas = alm.canvas || (alm.canvas = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
