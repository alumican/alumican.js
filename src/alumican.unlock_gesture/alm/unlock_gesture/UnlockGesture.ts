/// <reference path="../../index.ts" />

namespace alm.unlock_gesture {

	import Timer = alm.time.Timer;
	import TimerEvent = alm.time.TimerEvent;
	import EventDispatcher = alm.event.EventDispatcher;
	import Dom = alm.util.Dom;

	export class UnlockGesture extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(commands:HTMLElement[], resetDuration:number = 10000, hitArea:HTMLElement|Window = window) {
			super();

			this.isRunning = false;

			this.defaultCommands = commands.concat();
			this.totalCount = this.defaultCommands.length;

			this.resetDuration = resetDuration;
			this.resetTimer = new Timer(this.resetDuration, 1);
			this.resetTimer.addEventListener(TimerEvent.complete, this.resetTimerCompleteHandler);

			this.hitArea = hitArea;

			this.reset();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public startObserving(eventListenerOptions:AddEventListenerOptions = null):void {
			if (this.isRunning) return;
			this.isRunning = true;

			Dom.addPointerDownListener(this.hitArea, this.windowPointerDownHandler, eventListenerOptions);
			this.reset();
		}

		public stopObserving(eventListenerOptions:EventListenerOptions = null):void {
			if (!this.isRunning) return;
			this.isRunning = false;

			Dom.removePointerDownListener(this.hitArea, this.windowPointerDownHandler, eventListenerOptions);
		}

		public reset():void {
			trace('[UnlockGesture] reset');
			this.restCommands = this.defaultCommands.concat();
			this.resetTimer.reset();
			this.restCount = this.totalCount;
			this.currentCount = 0;
			this.dispatchEvent(new UnlockGestureEvent(UnlockGestureEvent.reset, this));
		}

		private windowPointerDownHandler = (event:PointerEvent):void => {
			const command = this.restCommands[0];
			const targetBounds = command.getBoundingClientRect();
			const pointerX = event.clientX;
			const pointerY = event.clientY;

			if ((pointerX >= targetBounds.left) && (pointerY >= targetBounds.top) && (pointerX <= targetBounds.right) && (pointerY <= targetBounds.bottom)) {
				this.restCommands.shift();
				this.restCount = this.restCommands.length;
				this.totalCount = this.defaultCommands.length;
				this.currentCount = this.totalCount - this.restCount;

				if (this.currentCount == 1) {
					trace('[UnlockGesture] reset timer : start');
					this.resetTimer.start();
				}

				if (this.restCount > 0) {
					trace('[UnlockGesture] ok :', this.currentCount, '/', this.totalCount);
					this.dispatchEvent(new UnlockGestureProgressEvent(UnlockGestureProgressEvent.progress, this, this.currentCount, this.totalCount));
				} else {
					trace('[UnlockGesture] ok : complete');
					this.dispatchEvent(new UnlockGestureProgressEvent(UnlockGestureProgressEvent.progress, this, this.currentCount, this.totalCount));
					this.dispatchEvent(new UnlockGestureEvent(UnlockGestureEvent.complete, this));
				}

			} else {
				if (this.currentCount > 1) {
					trace('[UnlockGesture] failure');
					this.reset();
					this.dispatchEvent(new UnlockGestureEvent(UnlockGestureEvent.failure, this));
				}
			}
		};

		private resetTimerCompleteHandler = (event:TimerEvent):void => {
			trace('[UnlockGesture] reset time : complete');
			this.reset();
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private isRunning:boolean;
		private hitArea:HTMLElement|Window;
		private defaultCommands:HTMLElement[];
		private restCommands:HTMLElement[];
		private totalCount:number;
		private restCount:number;
		private currentCount:number;
		private resetTimer:Timer;
		private resetDuration:number;
	}
}
