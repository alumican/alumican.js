/// <reference path="../../include.ts" />

namespace alm.canvas {

	export class PaperApp extends BaseApp {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(canvasId:string, isAutoResizeEnabled:boolean = true) {
			super(canvasId, isAutoResizeEnabled);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected onPlatformSetup(...platformSetupOptions:any[]):void {
			paper.setup(this.getCanvas().get(0));
		}

		protected onPlatformRender():void {
		}

		protected onPlatformResize(stageWidth:number, stageHeight:number):void {
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------
	}
}