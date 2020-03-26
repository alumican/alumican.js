/// <reference path='../../include.ts' />

namespace alm.debug {

	import Time = alm.util.Time;

	export class FpsMonitor {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
			this.reset();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public reset():void {
			this.frameRate = 0;
			this.frameCount = 0;
			this.startTime = Time.now();
			this.actualFrameRate = -1;
			this.dummyFrameRate = -1;
		}

		public update():void {
			++this.frameCount;
			const currentTime:number = Time.now();
			const elapsedTime:number = currentTime - this.startTime;
			if (elapsedTime >= 1000) {
				this.actualFrameRate = 1000 * this.frameCount / elapsedTime;
				this.frameCount = 0;
				this.startTime = currentTime;
				if (this.dummyFrameRate < 0) {
					this.frameRate = this.actualFrameRate;
				}
			}
		}

		public setDummyFrameRate(frameRate:number):void {
			this.dummyFrameRate = frameRate;
			this.frameRate = this.dummyFrameRate;
		}

		public clearDummyFrameRate():void {
			this.dummyFrameRate = -1;
			this.frameRate = this.actualFrameRate;
		}

		public getFrameRate():number {
			return this.frameRate;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private frameRate:number;
		private frameCount:number;
		private startTime:number;
		private actualFrameRate:number;
		private dummyFrameRate:number;
	}
}