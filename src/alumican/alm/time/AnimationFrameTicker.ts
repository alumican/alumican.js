/// <reference path='../../index.ts' />

namespace alm.time {

	import EventDispatcher = alm.event.EventDispatcher;
	import Time = alm.util.Time;
	import EventListener = alm.event.EventListener;

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

		public getTargetFrameRate():number {
			return this.targetFrameRate;
		}

		public getInterval():number {
			return this.interval;
		}

		public getTolerance():number {
			return this.tolerance;
		}

		public getToleranceDuration():number {
			return this.toleranceDuration;
		}

		private updateHandler = ():void => {
			this.requestId = window.requestAnimationFrame(this.updateHandler);
			if (this.targetFrameRate > 0) {
				const currentTime:number = Time.now();
				const elapsedTime:number = currentTime - this.frameStartTime;
				if (elapsedTime >= this.interval - this.toleranceDuration) {
					//trace('[AnimationFrameTicker] frameRate : ' + (1000 / elapsedTime));
					this.frameStartTime = currentTime;
					this.dispatchEvent(new AnimationFrameTickerEvent(AnimationFrameTickerEvent.tick, this));
				}
			} else {
				this.dispatchEvent(new AnimationFrameTickerEvent(AnimationFrameTickerEvent.tick, this));
			}
		};





		public static addEventListener(listener:alm.event.EventListener):void {
			const result = AnimationFrameTicker.ticker.addEventListener(AnimationFrameTickerEvent.tick, listener);
			if (result) {
				++AnimationFrameTicker.listenerCount;
				if (AnimationFrameTicker.listenerCount === 1) {
					AnimationFrameTicker.ticker.start();
				}
			}
		}

		public static removeEventListener(listener:EventListener):void {
			const result = AnimationFrameTicker.ticker.removeEventListener(AnimationFrameTickerEvent.tick, listener);
			if (result) {
				--AnimationFrameTicker.listenerCount;
				if (AnimationFrameTicker.listenerCount === 0) {
					AnimationFrameTicker.ticker.stop();
				}
			}
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private isRunning:boolean;
		private requestId:number;
		private targetFrameRate:number;
		private interval:number;
		private tolerance:number;
		private toleranceDuration:number;
		private frameStartTime:number;

		private static ticker = new AnimationFrameTicker();
		private static listenerCount = 0;
	}
}
