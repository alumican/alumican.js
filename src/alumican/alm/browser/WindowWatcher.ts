/// <reference path='../../index.ts' />

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

		public static start(target:Window = null):void {
			if (this.isRunning) return;
			this.isRunning = true;

			this.initialize();
			trace('[WindowWatcher] start');

			this.window = target || window;

			this.window.addEventListener('resize', this.windowResizeHandler);
			this.window.addEventListener('orientationchange', this.windowResizeHandler);
			this.window.addEventListener('scroll', this.windowScrollHandler);
			this.apply();
		}

		public static stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			this.initialize();
			trace('[WindowWatcher] stop');

			this.window.removeEventListener('resize', this.windowResizeHandler);
			this.window.removeEventListener('orientationchange', this.windowResizeHandler);
			this.window.removeEventListener('scroll', this.windowScrollHandler);
		}

		public static apply():void {
			this.windowWidth = this.window.innerWidth;
			this.windowHeight = this.window.innerHeight;

			this.scrollTop = (this.window.pageYOffset !== undefined) ? this.window.pageYOffset : document.documentElement.scrollTop;
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

		private static resize(event:Event):void {
			WindowWatcher.apply();
			WindowWatcher.eventDispatcher.dispatchEvent(new WindowWatcherEvent(WindowWatcherEvent.RESIZE, WindowWatcher, event, WindowWatcher.scrollTop, WindowWatcher.scrollBottom, WindowWatcher.windowWidth, WindowWatcher.windowHeight));
		};





		private static windowResizeHandler = (event:Event):void => {
			if (!DeviceInfo.getIsDesktop() && WindowWatcher.isMobileOrientationResize) return;
			trace('[WindowWatcher] resize by window.resize');
			WindowWatcher.resize(event);
		};

		private static windowOrientationChangeHandler = (event:Event):void => {
			if (DeviceInfo.getIsDesktop() || !WindowWatcher.isMobileOrientationResize) return;
			trace('[WindowWatcher] resize by window.orientationchange');
			WindowWatcher.resize(event);
		};

		private static windowScrollHandler = (event:Event):void => {
			WindowWatcher.apply();
			WindowWatcher.eventDispatcher.dispatchEvent(new WindowWatcherEvent(WindowWatcherEvent.SCROLL, WindowWatcher, event, WindowWatcher.scrollTop, WindowWatcher.scrollBottom, WindowWatcher.windowWidth, WindowWatcher.windowHeight));
		};





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public static getIsRunning():boolean { return this.isRunning; }
		private static isRunning:boolean = false;

		public static getWindow():Window { return this.window; }
		private static window:Window = null;

		public static getScrollTop():number { return this.scrollTop; }
		private static scrollTop:number;

		public static getScrollBottom():number { return this.scrollBottom; }
		private static scrollBottom:number;

		public static getWindowWidth():number { return this.windowWidth; }
		private static windowWidth:number = 0;

		public static getWindowHeight():number { return this.windowHeight; }
		private static windowHeight:number = 0;

		public static getIsMobileOrientationResize():boolean { return this.isMobileOrientationResize; }
		public static setIsMobileOrientationResize(value:boolean):void { this.isMobileOrientationResize = value; }
		private static isMobileOrientationResize:boolean = true;

		private static isInitialized:boolean = false;
		private static eventDispatcher:alm.event.EventDispatcher = null;





		private constructor() {}
	}
}
