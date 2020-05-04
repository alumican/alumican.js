/// <reference path="../../index.ts" />

namespace alm.browser {

	import WindowWatcher = alm.browser.WindowWatcher;
	import WindowWatcherEvent = alm.browser.WindowWatcherEvent;
	import EventDispatcher = alm.event.EventDispatcher;

	export class ResponsiveObserver extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
			super();

			this.breakPoints = [];
			this.breakPointCount = 0;

			this.currentIndex = -1;
			this.prevIndex = -1;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public start():void {
			if (this.isRunning) return;
			this.isRunning = true;

			WindowWatcher.addEventListener(WindowWatcherEvent.RESIZE, this.windowResizeHandler);
			WindowWatcher.start();

			this.check();
		}

		public stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			WindowWatcher.removeEventListener(WindowWatcherEvent.RESIZE, this.windowResizeHandler);
			WindowWatcher.stop();
		}

		public setBreakpoints(breakPoints:number[]):void {
			this.breakPoints = breakPoints.concat();
			this.breakPointCount = this.breakPoints.length;
			this.breakPoints.sort((a, b):number => { return a - b; });
			if (this.isRunning) {
				this.check();
			}
		}

		public getIsRunning():boolean {
			return this.isRunning;
		}

		public getCurrentIndex():number {
			return this.currentIndex;
		}

		public getPrevIndex():number {
			return this.prevIndex;
		}

		public getBreakPoints():number[] {
			return this.breakPoints.concat();
		}

		public getBreakPointCount():number {
			return this.breakPointCount;
		}

		private check():void {
			const windowWidth = WindowWatcher.getWindowWidth();
			let index;
			for (index = 0; index < this.breakPointCount; ++index) {
				if (windowWidth <= this.breakPoints[index]) {
					break;
				}
			}

			if (this.currentIndex == index) return;
			this.prevIndex = this.currentIndex;
			this.currentIndex = index;
			trace('[ResponsiveObserver] switch index :', this.prevIndex, '->', this.currentIndex, ', window width =', windowWidth);

			this.dispatchEvent(new ResponsiveObserverEvent(ResponsiveObserverEvent.CHANGE, this, this.currentIndex, this.prevIndex));
		}

		private windowResizeHandler = (event:WindowWatcherEvent):void => {
			this.check();
		};





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private isRunning:boolean;

		private breakPoints:number[];
		private breakPointCount:number;

		private currentIndex:number;
		private prevIndex:number;
	}
}
