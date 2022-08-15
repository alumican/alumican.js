/// <reference path='../../index.ts' />

namespace alm.browser {

	export class WinWatcher {

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
			trace('[WinWatcher] start');

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
			trace('[WinWatcher] stop');

			this.window.removeEventListener('resize', this.windowResizeHandler);
			this.window.removeEventListener('orientationchange', this.windowResizeHandler);
			this.window.removeEventListener('scroll', this.windowScrollHandler);
		}

		public static apply():void {
			this.width = this.window.innerWidth;
			this.height = this.window.innerHeight;

			this.scrollTop = (this.window.scrollY !== undefined) ? this.window.scrollY : document.documentElement.scrollTop;
			this.scrollBottom = this.scrollTop + this.height;
		}

		public static addEventListener(eventType:string, listener:(event:WinWatcherEvent) => void):void {
			this.initialize();
			this.eventDispatcher.addEventListener(eventType, listener);
		}

		public static removeEventListener(eventType:string, listener:(event:WinWatcherEvent) => void):void {
			this.initialize();
			this.eventDispatcher.removeEventListener(eventType, listener);
		}

		public static calcScrolledPosition(y:number):number {
			return y - this.scrollTop;
		};

		public static calcScrolledPositionRatio(y:number):number {
			return this.calcScrolledPosition(y) / this.height;
		}

		private static resize(event:Event):void {
			WinWatcher.apply();
			WinWatcher.eventDispatcher.dispatchEvent(new WinWatcherEvent(WinWatcherEvent.resize, WinWatcher, event, WinWatcher.scrollTop, WinWatcher.scrollBottom, WinWatcher.width, WinWatcher.height));
		};





		private static windowResizeHandler = (event:Event):void => {
			if (!DeviceInfo.getIsDesktop() && WinWatcher.isMobileOrientationResize) return;
			trace('[WinWatcher] resize by window.resize');
			WinWatcher.resize(event);
		};

		private static windowOrientationChangeHandler = (event:Event):void => {
			if (DeviceInfo.getIsDesktop() || !WinWatcher.isMobileOrientationResize) return;
			trace('[WinWatcher] resize by window.orientationchange');
			WinWatcher.resize(event);
		};

		private static windowScrollHandler = (event:Event):void => {
			WinWatcher.apply();
			WinWatcher.eventDispatcher.dispatchEvent(new WinWatcherEvent(WinWatcherEvent.scroll, WinWatcher, event, WinWatcher.scrollTop, WinWatcher.scrollBottom, WinWatcher.width, WinWatcher.height));
		};





		// --------------------------------------------------
		//
		// MEMBER
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

		public static getWidth():number { return this.width; }
		private static width:number = 0;

		public static getHeight():number { return this.height; }
		private static height:number = 0;

		public static getIsMobileOrientationResize():boolean { return this.isMobileOrientationResize; }
		public static setIsMobileOrientationResize(value:boolean):void { this.isMobileOrientationResize = value; }
		private static isMobileOrientationResize:boolean = true;

		private static isInitialized:boolean = false;
		private static eventDispatcher:alm.event.EventDispatcher = null;





		private constructor() {}
	}
}
