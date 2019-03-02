/// <reference path="../../include.ts" />

namespace alm.canvas {

	import DeviceInfo = alm.browser.DeviceInfo;

	export class PaperApp extends BaseApp {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(canvas:HTMLElement, isAutoResizeEnabled:boolean = true, useGlobalPaper:boolean = true) {
			super(canvas, isAutoResizeEnabled, useGlobalPaper);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected onPlatformSetup(...platformSetupOptions:any[]):void {
			this.paper = new paper.PaperScope();
			if (platformSetupOptions[0]) { // useGlobalPaper:boolean
				this.paper.install(paper);
			}
			this.paper.setup(this.getCanvas().get(0));
		}

		protected onPlatformRender():void {
		}

		protected onPlatformResize(stageWidth:number, stageHeight:number):void {
			//this.getCanvas().attr({ width: stageWidth, height: stageHeight });
			//this.getCanvas().css({ width: stageWidth, height: stageHeight });

			const devicePixelRatio:number = DeviceInfo.getDevicePixelRatio();
			const viewSize:paper.Size = this.paper.view.viewSize;
			viewSize.width = stageWidth * devicePixelRatio;
			viewSize.height = stageHeight * devicePixelRatio;

			this.paper.view.size.width = stageWidth * devicePixelRatio;
			this.paper.view.size.height = stageHeight * devicePixelRatio;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		protected paper:paper.PaperScope;
	}
}