/// <reference path="../../reference.ts" />

namespace alm.browser {

	import EventDispatcher = alm.event.EventDispatcher;

	export class WindowWatcher {

		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		private static initialize():void {
			if (this.isInitialized) return;
			this.isInitialized = true;

			this.eventDispatcher = new EventDispatcher();
		}

		public static start():void {
			if (this.isRunning) return;
			this.isRunning = true;

			this.initialize();
			trace("[WindowWatcher] start");

			jQuery(window).on("resize", this.windowScrollHandler);
			jQuery(window).on("scroll", this.windowScrollHandler);
			this.apply();
		}

		public static stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			this.initialize();
			trace("[WindowWatcher] stop");

			jQuery(window).off("resize", this.windowScrollHandler);
			jQuery(window).off("scroll", this.windowScrollHandler);
		}

		public static apply():void {
			const $window:JQuery = jQuery(window);

			this.windowWidth = $window.width();
			this.windowHeight = $window.height();

			this.scrollTop = $window.scrollTop();
			this.scrollBottom = this.scrollTop + this.windowHeight;
		}

		public static addEventListener(eventType:string, listener:(event:WindowWatcherEvent) => void):void {
			this.initialize();
			this.eventDispatcher.addEventListener(eventType, listener);
		}

		public static removeEventListener(eventType:string, listener:(event:WindowWatcherEvent) => void):void {
			this.initialize();
			this.eventDispatcher.removeEventListener(eventType, listener);
		}

		public static calcScrolledPosition(y:number):number {
			return y - this.scrollTop;
		};

		public static calcScrolledPositionRatio(y:number):number {
			return this.calcScrolledPosition(y) / this.windowHeight;
		}





		private static windowScrollHandler = (event:JQuery.Event):void => {
			WindowWatcher.apply();
			WindowWatcher.eventDispatcher.dispatchEvent(new WindowWatcherEvent(WindowWatcherEvent.SCROLL, WindowWatcher, event, WindowWatcher.scrollTop, WindowWatcher.scrollBottom, WindowWatcher.windowWidth, WindowWatcher.windowHeight));
		};

		private static windowResizeHandler = (event:JQuery.Event):void => {
			WindowWatcher.apply();
			WindowWatcher.eventDispatcher.dispatchEvent(new WindowWatcherEvent(WindowWatcherEvent.RESIZE, WindowWatcher, event, WindowWatcher.scrollTop, WindowWatcher.scrollBottom, WindowWatcher.windowWidth, WindowWatcher.windowHeight));
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public static getIsRunning():boolean { return this.isRunning; }
		private static isRunning:boolean = false;

		public static getScrollTop():number { return this.scrollTop; }
		private static scrollTop:number;

		public static getScrollBottom():number { return this.scrollBottom; }
		private static scrollBottom:number;

		public static getWindowWidth():number { return this.windowWidth; }
		private static windowWidth:number = 0;

		public static getWindowHeight():number { return this.windowHeight; }
		private static windowHeight:number = 0;

		private static isInitialized:boolean = false;
		private static eventDispatcher:EventDispatcher = null;





		private constructor() {}
	}
}