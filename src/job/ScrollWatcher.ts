/// <reference path="../reference.ts" />

namespace alm {

	export class ScrollWatcher {

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
			trace("[ScrollWatcher] start");

			jQuery(window).on("resize", this.windowScrollHandler);
			jQuery(window).on("scroll", this.windowScrollHandler);
			this.apply();
		}


		public static stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			this.initialize();
			trace("[ScrollWatcher] stop");

			jQuery(window).off("resize", this.windowScrollHandler);
			jQuery(window).off("scroll", this.windowScrollHandler);
		}

		public static apply():void {
			const $window:JQuery = jQuery(window);
			this.windowHeight = $window.height();
			this.scrollTop = $window.scrollTop();
			this.scrollBottom = this.scrollTop + this.windowHeight;
		}

		public static addEventListener(eventType:string, listener:(event:ScrollWatcherEvent) => void):void {
			this.initialize();
			this.eventDispatcher.addEventListener(eventType, listener);
		}

		public static removeEventListener(eventType:string, listener:(event:ScrollWatcherEvent) => void):void {
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
			ScrollWatcher.apply();
			ScrollWatcher.eventDispatcher.dispatchEvent(new ScrollWatcherEvent(ScrollWatcherEvent.SCROLL, ScrollWatcher, event, ScrollWatcher.scrollTop, ScrollWatcher.scrollBottom, ScrollWatcher.windowHeight));
		};

		private static windowResizeHandler = (event:JQuery.Event):void => {
			ScrollWatcher.apply();
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

		public static getWindowHeight():number { return this.windowHeight; }
		private static windowHeight:number = 0;

		private static isInitialized:boolean = false;
		private static eventDispatcher:cmd.EventDispatcher = null;
	}
}