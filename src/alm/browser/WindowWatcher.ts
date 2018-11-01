/// <reference path="../../reference.ts" />

namespace alm.browser {

	export class WindowWatcher {

		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		private static initialize():void {
			if (this.isInitialized) return;
			this.isInitialized = true;

			this.eventDispatcher = new alm.event.EventDispatcher();
		}

		public static start():void {
			if (this.isRunning) return;
			this.isRunning = true;

			this.initialize();
			trace("[WindowWatcher] start");

			window.addEventListener("resize", this.windowResizeHandler);
			window.addEventListener("scroll", this.windowScrollHandler);
			this.apply();
		}

		public static stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			this.initialize();
			trace("[WindowWatcher] stop");

			window.removeEventListener("resize", this.windowResizeHandler);
			window.removeEventListener("scroll", this.windowScrollHandler);
		}

		public static apply():void {
			this.windowWidth = window.innerWidth;
			this.windowHeight = window.innerHeight;

			this.scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop;;
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





		private static windowResizeHandler = (event:Event):void => {
			WindowWatcher.apply();
			WindowWatcher.eventDispatcher.dispatchEvent(new WindowWatcherEvent(WindowWatcherEvent.RESIZE, WindowWatcher, event, WindowWatcher.scrollTop, WindowWatcher.scrollBottom, WindowWatcher.windowWidth, WindowWatcher.windowHeight));
		};

		private static windowScrollHandler = (event:Event):void => {
			WindowWatcher.apply();
			WindowWatcher.eventDispatcher.dispatchEvent(new WindowWatcherEvent(WindowWatcherEvent.SCROLL, WindowWatcher, event, WindowWatcher.scrollTop, WindowWatcher.scrollBottom, WindowWatcher.windowWidth, WindowWatcher.windowHeight));
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
		private static eventDispatcher:alm.event.EventDispatcher = null;





		private constructor() {}
	}
}