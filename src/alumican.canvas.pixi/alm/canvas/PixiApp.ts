/// <reference path="../../index.ts" />

namespace alm.canvas {

	export class PixiApp extends BaseApp {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(canvas:HTMLElement, isAutoResizeEnabled:boolean = true, isAutoUpdateEnabled:boolean = true, options?:PIXI.ApplicationOptions) {
			super(canvas, isAutoResizeEnabled, isAutoUpdateEnabled, [options]);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected onPlatformSetup(platformSetupOptions:any[]):void {
			const options:PIXI.ApplicationOptions = platformSetupOptions[0];

			this.pixi = new PIXI.Application({
				autoStart:       options && options.autoStart !== undefined ? options.autoStart : true,
				view:            options && options.view !== undefined ? options.view : this.getCanvas().get(0),
				antialias:       options && options.antialias !== undefined ? options.antialias : true,
				transparent:     options && options.transparent !== undefined ? options.transparent : false,
				resolution:      options && options.resolution !== undefined ? options.resolution : window.devicePixelRatio,
				backgroundColor: options && options.backgroundColor !== undefined ? options.backgroundColor : 0x000000,
			});
		}

		protected onPlatformResize(stageWidth:number, stageHeight:number):void {
			const canvas:JQuery = this.getCanvas();
			canvas.attr({ width: stageWidth, height: stageHeight });
			canvas.css({ width: stageWidth, height: stageHeight });

			this.pixi.renderer.resize(stageWidth, stageHeight);
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public pixi:PIXI.Application;
	}
}
