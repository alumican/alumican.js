/// <reference path="../../index.ts" />

namespace alm.browser {

	import Logger = alm.debug.Logger;
	import WinWatcher = alm.browser.WinWatcher;
	import WinWatcherEvent = alm.browser.WinWatcherEvent;
	import EventDispatcher = alm.event.EventDispatcher;

	export class ScrollSectionTrigger extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(threshold:number = 0.5) {
			super();

			this.isRunning = false;

			this.scrollPosition = null;
			this.triggerPositions = [];
			this.thresholdRatio = threshold;
			this.thresholdPosition = null;

			this.currentSectionIndex = -1;
			this.prevSectionIndex = -1;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public start():void {
			if (this.isRunning) return;
			this.isRunning = true;

			WinWatcher.addEventListener(WinWatcherEvent.scroll, this.windowScrollHandler);
			WinWatcher.addEventListener(WinWatcherEvent.resize, this.windowResizeHandler);
			WinWatcher.start();

			this.updateThresholdPosition();
			this.updateScrollPosition();
			this.check();
		}

		public stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			WinWatcher.removeEventListener(WinWatcherEvent.scroll, this.windowScrollHandler);
			WinWatcher.removeEventListener(WinWatcherEvent.resize, this.windowResizeHandler);
			WinWatcher.stop();
		}

		public getIsRunning():boolean {
			return this.isRunning;
		}

		public getCurrentIndex():number {
			return this.currentSectionIndex;
		}

		public getPrevIndex():number {
			return this.prevSectionIndex;
		}

		public getTriggerPositions():number[] {
			return this.triggerPositions.concat();
		}

		public setTriggerPositions(positions:number[]):void {
			this.triggerPositions = positions.concat();
			this.triggerPositions.sort((a, b):number => { return a - b; });
			if (this.isRunning) {
				this.check();
			}
		}

		public getThreshold():number {
			return this.thresholdRatio;
		}

		public setThreshold(ratio:number):void {
			this.thresholdRatio = ratio;
			this.updateThresholdPosition();
			if (this.isRunning) {
				this.check();
			}
		}

		private check():void {
			if (this.scrollPosition == null) {
				Logger.warn('[RangeTrigger] current position is need set');
				return;
			}

			let nearestTriggerIndex = -1;
			let nearestScrolledTriggerPosition = -1;
			let nearestDistance:number = Number.MAX_VALUE;
			const triggerPositionCount = this.triggerPositions.length;
			for (let i = 0; i < triggerPositionCount; ++i) {
				const scrolledTriggerPosition = this.triggerPositions[i] - this.scrollPosition;
				const distance = Math.abs(scrolledTriggerPosition - this.thresholdPosition);
				if (distance < nearestDistance) {
					nearestDistance = distance;
					nearestTriggerIndex = i;
					nearestScrolledTriggerPosition = scrolledTriggerPosition;
				}
			}

			if (nearestTriggerIndex >= 0) {
				let sectionIndex = -1;
				if (nearestScrolledTriggerPosition > this.thresholdPosition) {
					sectionIndex = nearestTriggerIndex;
				} else {
					sectionIndex = nearestTriggerIndex + 1;
				}

				if (this.currentSectionIndex != sectionIndex) {
					this.prevSectionIndex = this.currentSectionIndex;
					this.currentSectionIndex = sectionIndex;
					this.dispatchEvent(new ScrollSectionTriggerEvent(ScrollSectionTriggerEvent.change, this, this.currentSectionIndex, this.prevSectionIndex));
				}
			}
		}

		private updateThresholdPosition():void {
			this.thresholdPosition = WinWatcher.getHeight() * this.thresholdRatio;
		}

		private updateScrollPosition():void {
			this.scrollPosition = WinWatcher.getScrollTop();
		}

		private windowScrollHandler = (event:WinWatcherEvent):void => {
			this.updateScrollPosition();
			this.check();
		};

		private windowResizeHandler = (event:WinWatcherEvent):void => {
			this.updateThresholdPosition();
			this.updateScrollPosition();
			this.check();
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private isRunning:boolean;

		private scrollPosition:number;
		private triggerPositions:number[];
		private thresholdRatio:number;
		private thresholdPosition:number;

		private currentSectionIndex:number;
		private prevSectionIndex:number;
	}
}
