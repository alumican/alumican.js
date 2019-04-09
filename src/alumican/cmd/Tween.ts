/// <reference path='../include.ts' />

namespace cmd {

	import Easing = alm.math.Easing;
	import EasingFunction = alm.math.EasingFunction;

	export type TweenCallbackFunction = (progressTime:number, progressValue:number) => void;

	export class Tween extends Command {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(target:Object, to:Object, from:Object = null, duration:number = 1000, easing:EasingFunction = Easing.linear, onStart:TweenCallbackFunction = null, onUpdate:TweenCallbackFunction = null, onComplete:TweenCallbackFunction = null) {
			super();
			this.tweenTarget = target;
			this.to = to;
			this.from = from;
			this.duration = duration;
			this.easing = easing;
			this.onStart = onStart;
			this.onUpdate = onUpdate;
			this.onComplete = onComplete;
			this.progressTime = 0;
			this.progressValue = 0;
			this.startTime = 0;
			this.timerId = -1;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implExecuteFunction(command:Command):void {
			this.internalFrom = {};
			let value0:number;
			let value1:number;
			for (let key in this.to) {
				value1 = this.to[key];
				if (this.from && this.from[key] != null) {
					this.internalFrom[key] = this.from[key];
				} else {
					this.internalFrom[key] = this.tweenTarget[key];
				}
			}
			if (this.duration > 0) {
				this.timerId = window.setInterval(this.intervalHandler, Tween.updateInterval);
				this.startTime = new Date().getTime();
				this.apply(0);
				if (this.onStart) this.onStart(this.progressTime, this.progressValue);
			} else {
				this.apply(0);
				if (this.onStart) this.onStart(this.progressTime, this.progressValue);
				this.apply(1);
				if (this.onUpdate) this.onUpdate(this.progressTime, this.progressValue);
				if (this.onComplete) this.onComplete(this.progressTime, this.progressValue);
				this.notifyComplete();
			}
		}

		protected implInterruptFunction(command:Command):void {
			this.cancel();
		}

		protected implDestroyFunction(command:Command):void {
			this.cancel();

			this.tweenTarget = null;
			this.to = null;
			this.from = null;
			this.easing = null;
			this.onStart = null;
			this.onUpdate = null;
			this.onComplete = null;
			this.internalFrom = null;
		}

		private cancel():void {
			if (this.timerId != -1) {
				clearInterval(this.timerId);
				this.timerId = -1;
			}
		}

		private apply(timeRatio:number):void {
			this.progressTime = timeRatio;
			this.progressValue = this.easing(this.progressTime);
			let value0:number;
			for (let key in this.to) {
				value0 = this.internalFrom[key];
				this.tweenTarget[key] = value0 + (this.to[key] - value0) * this.progressValue;
			}
		}

		private intervalHandler = ():void => {
			const elapsedTime:number = new Date().getTime() - this.startTime;
			if (elapsedTime < this.duration) {
				this.apply(elapsedTime / this.duration);
				if (this.onUpdate) this.onUpdate(this.progressTime, this.progressValue);
			} else {
				this.apply(1);
				this.cancel();
				if (this.onUpdate) this.onUpdate(this.progressTime, this.progressValue);
				if (this.onComplete) this.onComplete(this.progressTime, this.progressValue);
				this.notifyComplete();
			}
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public getTarget():Object { return this.tweenTarget; }
		public setTarget(target:Object):void { this.tweenTarget = target; }
		private tweenTarget:Object;

		public getDuration():number { return this.duration; }
		public setDuration(duration:number):void { this.duration = duration; }
		private duration:number;

		public getTo():Object { return this.to; }
		public setTo(to:Object):void { this.to = to; }
		private to:Object;

		public getFrom():Object { return this.from; }
		public setFrom(from:Object):void { this.from = from; }
		private from:Object;

		public getEasing():EasingFunction { return this.easing; }
		public setEasing(easing:EasingFunction):void { this.easing = easing; }
		private easing:EasingFunction;

		public getOnStart():TweenCallbackFunction { return this.onStart; }
		public setOnStart(func:TweenCallbackFunction):void { this.onStart = func; }
		private onStart:TweenCallbackFunction;

		public getOnUpdate():TweenCallbackFunction { return this.onUpdate; }
		public setOnUpdate(func:TweenCallbackFunction):void { this.onUpdate = func; }
		private onUpdate:TweenCallbackFunction;

		public getOnComplete():TweenCallbackFunction { return this.onComplete; }
		public setOnComplete(func:TweenCallbackFunction):void { this.onComplete = func; }
		private onComplete:TweenCallbackFunction;

		public getProgressTime():number { return this.progressTime; }
		private progressTime:number;

		public getProgressValue():number { return this.progressValue; }
		private progressValue:number;

		private startTime:number;
		private timerId:number;
		private internalFrom:Object;

		public getUpdateInterval():number { return Tween.updateInterval; }
		public setUpdateInterval(milliseconds:number):void { Tween.updateInterval = milliseconds; }
		private static updateInterval:number = 1000 / 60;
	}
}