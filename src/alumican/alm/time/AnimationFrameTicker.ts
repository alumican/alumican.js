/// <reference path='../../index.ts' />

namespace alm.time {

	import EventDispatcher = alm.event.EventDispatcher;
	import Time = alm.util.Time;

	export class AnimationFrameTicker extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		/**
		 * requestAnimationFrameベースでのFPSタイマー
		 * @param {number} frameRate 目標フレームレート（0の場合はフレームレートを制限しない）
		 * @param {number} tolerance 許容誤差（frameRateに対する割合）
		 */
		constructor(frameRate:number = 0, tolerance:number = 0.1) {
			super();

			this.targetFrameRate = frameRate;
			this.interval = 1000 / this.targetFrameRate;

			this.tolerance = tolerance;
			this.toleranceDuration = this.interval * this.tolerance;

			this.isRunning = false;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public start():void {
			if (this.isRunning) return;
			this.isRunning = true;

			this.frameStartTime = Time.now();
			this.requestId = window.requestAnimationFrame(this.updateHandler);
		}

		public stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			window.cancelAnimationFrame(this.requestId);
		}

		public getIsRunning():boolean {
			return this.isRunning;
		}

		public getTargetFrameRate():boolean {
			return this.isRunning;
		}

		private setInterval(callback:Function):number {
			return window.setTimeout(callback, 1000 / 60);
		}

		private clearInterval(requestId:number):void {
			window.clearInterval(requestId);
		}

		private updateHandler = ():void => {
			this.requestId = window.requestAnimationFrame(this.updateHandler);
			if (this.targetFrameRate > 0) {
				const currentTime:number = Time.now();
				const elapsedTime:number = currentTime - this.frameStartTime;
				if (elapsedTime >= this.interval - this.toleranceDuration) {
					//trace('[AnimationFrameTicker] frameRate : ' + (1000 / elapsedTime));
					this.frameStartTime = currentTime;
					this.dispatchEvent(new AnimationFrameTickerEvent(AnimationFrameTickerEvent.TICK, this));
				}
			} else {
				this.dispatchEvent(new AnimationFrameTickerEvent(AnimationFrameTickerEvent.TICK, this));
			}
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private isRunning:boolean;

		private requestId:number;

		private targetFrameRate:number;
		private tolerance:number;
		private toleranceDuration:number;
		private interval:number;
		private frameStartTime:number;
	}
}
