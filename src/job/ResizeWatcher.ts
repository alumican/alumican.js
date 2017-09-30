/// <reference path="../reference.ts" />

namespace alm {

	export class ResizeWatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		private constructor() {
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		private static initialize():void {
			if (this.isInitialized) return;
			this.isInitialized = true;

			this.eventDispatcher = new cmd.EventDispatcher();
		}

		public static start():void {
			if (this.isRunning) return;
			this.isRunning = true;

			this.initialize();
			trace("[ResizeWatcher] start");

			jQuery(window).on("resize", this.windowResizeHandler);
			this.apply();
		}


		public static stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			this.initialize();
			trace("[ResizeWatcher] stop");

			jQuery(window).off("resize", this.windowResizeHandler);
		}

		public static apply():void {
			const $window:JQuery = jQuery(window);
			ResizeWatcher.windowWidth = $window.width();
			ResizeWatcher.windowHeight = $window.height();
		}

		public static addEventListener(eventType:string, listener:(event:ResizeWatcherEvent) => void):void {
			this.initialize();
			this.eventDispatcher.addEventListener(eventType, listener);
		}

		public static removeEventListener(eventType:string, listener:(event:ResizeWatcherEvent) => void):void {
			this.initialize();
			this.eventDispatcher.removeEventListener(eventType, listener);
		}





		private static windowResizeHandler = (event:JQuery.Event):void => {
			ResizeWatcher.apply();
			ResizeWatcher.eventDispatcher.dispatchEvent(new ResizeWatcherEvent(ResizeWatcherEvent.RESIZE, ResizeWatcher, event, ResizeWatcher.windowWidth, ResizeWatcher.windowHeight));
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public static getIsRunning():boolean { return this.isRunning; }
		private static isRunning:boolean = false;

		public static getWindowWidth():number { return this.windowWidth; }
		private static windowWidth:number = 0;

		public static getWindowHeight():number { return this.windowHeight; }
		private static windowHeight:number = 0;

		private static isInitialized:boolean = false;
		private static eventDispatcher:cmd.EventDispatcher = null;
	}
}