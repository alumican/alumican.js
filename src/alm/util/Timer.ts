/// <reference path="../../reference.ts" />

namespace alm.util {

	import EventDispatcher = alm.event.EventDispatcher;

	export class Timer extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(interval:number = 1000, repeatCount:number = 0) {
			super();
			this.interval = interval;
			this.repeatCount = repeatCount;
			this.isRunning = false;
			this.tId = -1;
			this.reset();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public start():void {
			if (this.isRunning) return;
			this.isRunning = true;
			this.tStartTime = this.getCurrentTime();
			this.startInterval(this.tRestTime != -1 ? this.tRestTime : this.interval);
		}

		public stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;
			this.tRestTime = this.getCurrentTime() - this.tStartTime;
			this.stopInterval();
		}

		public reset():void {
			this.stop();
			this.elapsedCount = 0;
			this.tRestTime = -1;
		}

		public restart():void {
			this.reset();
			this.start();
		}





		private getCurrentTime():number {
			return new Date().valueOf();
		}

		private startInterval(interval:number):void {
			this.stopInterval();
			this.tInterval = interval;
			this.tId = window.setInterval(this.timerHandler, this.tInterval);
		}

		private stopInterval():void {
			if (this.tId != -1) {
				clearInterval(this.tId);
				this.tId = -1;
			}
		}

		private dispatch(eventType:string):void {
			this.dispatchEvent(new TimerEvent(eventType, this, this.elapsedCount, this.repeatCount, this.getRestCount()));
		}

		private timerHandler = ():void => {
			this.tStartTime = this.getCurrentTime();
			++this.elapsedCount;
			let isCompleted:boolean = false;
			if (this.repeatCount > 0 && this.elapsedCount >= this.repeatCount) {
				isCompleted = true;
				this.stop();
			} else if (this.tInterval != this.interval) {
				this.startInterval(this.interval);
			}
			this.dispatch(TimerEvent.TICK);
			if (isCompleted) {
				this.dispatch(TimerEvent.COMPLETE);
			}
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public getIsRunning():boolean { return this.isRunning; }
		private isRunning:boolean;

		public getInterval():number { return this.interval; }
		public setInterval(interval:number):void { this.interval = interval; }
		private interval:number;

		public getElapsedTime():number { return this.getCurrentTime() - this.tStartTime; }

		public getRestTime():number { return this.interval - this.getElapsedTime(); }

		public getElapsedCount():number { return this.elapsedCount; }
		private elapsedCount:number;

		public getRepeatCount():number { return this.repeatCount; }
		public setRepeatCount(count:number):void { this.repeatCount = count; }
		private repeatCount:number;

		public getRestCount():number { return this.repeatCount - this.elapsedCount; }

		private tStartTime:number;
		private tRestTime:number;
		private tInterval:number;
		private tId:number;
	}
}