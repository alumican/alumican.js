/// <reference path='../../include.ts' />

namespace alm.view {

	import EventDispatcher = alm.event.EventDispatcher;

	export class ButtonBehavior {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(target:IButton, hitArea:HTMLElement = null, isHoverCursorEnabled:boolean = true, isPreventDefaultEnabled:boolean = true, isStopPropagationEnabled:boolean = true) {
			this.target = target;
			this.hitArea = null;
			this.isHoverCursorEnabled = isHoverCursorEnabled;
			this.isPreventDefaultEnabled = isPreventDefaultEnabled;
			this.isStopPropagationEnabled = isStopPropagationEnabled;
			this.isOver = false;
			this.isDown = false;
			this.defaultMouseCursor = '';
			this.eventDistatcher = new EventDispatcher(this.target);

			this.setHitArea(hitArea);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public over(useTransition:boolean = true):void {
			if (this.isOver) return;
			this.isOver = true;
			this.target.implButtonOver(useTransition);
			this.eventDistatcher.dispatchEventType('over', this.target);
		}

		public out(useTransition:boolean = true):void {
			if (!this.isOver) return;
			this.isOver = false;
			this.target.implButtonOut(useTransition);
			this.eventDistatcher.dispatchEventType('out', this.target);
		}

		public down(useTransition:boolean = true):void {
			if (this.isDown) return;
			this.isDown = true;
			this.target.implButtonDown(useTransition);
			this.eventDistatcher.dispatchEventType('down', this.target);
		}

		public up(useTransition:boolean = true):void {
			if (!this.isDown) return;
			this.isDown = false;
			this.target.implButtonUp(useTransition);
			this.eventDistatcher.dispatchEventType('up', this.target);
		}

		public click(useTransition:boolean = true):void {
			this.target.implButtonClick(useTransition);
			this.eventDistatcher.dispatchEventType('click', this.target);
		}

		private on():void {
			this.hitArea.addEventListener('mouseover', this.mouseOverHandler);
			this.hitArea.addEventListener('mouseout', this.mouseOutHandler);
			this.hitArea.addEventListener('mousedown', this.mouseDownHandler);
			this.hitArea.addEventListener('mouseup', this.mouseUpHandler);
			this.hitArea.addEventListener('click', this.clickHandler);

			//this.hitArea.addEventListener('touchstart', this.touchStartHandler);
			//this.hitArea.addEventListener('touchend', this.touchEndHandler);
			//this.hitArea.addEventListener('touchcancel', this.touchCancelHandler);
		}

		private off():void {
			this.hitArea.removeEventListener('mouseover', this.mouseOverHandler);
			this.hitArea.removeEventListener('mouseout', this.mouseOutHandler);
			this.hitArea.removeEventListener('mousedown', this.mouseDownHandler);
			this.hitArea.removeEventListener('mouseup', this.mouseUpHandler);
			this.hitArea.removeEventListener('click', this.clickHandler);

			//this.hitArea.removeEventListener('touchstart', this.touchStartHandler);
			//this.hitArea.removeEventListener('touchend', this.touchEndHandler);
			//this.hitArea.removeEventListener('touchcancel', this.touchCancelHandler);
		}

		public getIsOver():boolean {
			return this.isOver;
		}

		public getIsDown():boolean {
			return this.isDown;
		}

		public getHitArea():HTMLElement {
			return this.hitArea;
		}

		public setHitArea(hitArea:HTMLElement):void {
			if (this.hitArea !== hitArea) {
				if (this.hitArea !== null) {
					this.off();
				}
				this.hitArea = hitArea;
				if (this.hitArea !== null) {
					this.on();
				}
			}
		}

		public clearHitArea():void {
			this.setHitArea(null);
		}

		public getIsPreventDefaultEnabled():boolean {
			return this.isPreventDefaultEnabled;
		}

		public setIsPreventDefaultEnabled(enabled:boolean):void {
			this.isPreventDefaultEnabled = enabled;
		}

		public getIsStopPropagationEnabled():boolean {
			return this.isStopPropagationEnabled;
		}

		public setIsStopPropagationEnabled(enabled:boolean):void {
			this.isStopPropagationEnabled = enabled;
		}

		public getIsHoverCursorEnabled():boolean {
			return this.isHoverCursorEnabled;
		}

		public setIsHoverCursorEnabled(enabled:boolean):void {
			this.isHoverCursorEnabled = enabled;
		}

		// --------------------------------------------------
		// Mouse Event

		private mouseOverHandler = (event:MouseEvent):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			if (this.isHoverCursorEnabled) {
				this.defaultMouseCursor = this.hitArea.style.cursor;
				this.hitArea.style.cursor = 'pointer';
			}
			this.over();
		};

		private mouseOutHandler = (event:MouseEvent):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			if (this.isHoverCursorEnabled) {
				this.hitArea.style.cursor = this.defaultMouseCursor != '' ? this.defaultMouseCursor : 'pointer';
			}
			this.out();
		};

		private mouseDownHandler = (event:MouseEvent):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.down();
		};

		private mouseUpHandler = (event:MouseEvent):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.up();
		};

		private clickHandler = (event:MouseEvent):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.click();
		};

		// --------------------------------------------------
		// Touch Event

		private touchStartHandler = (event:TouchEvent):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.down();
		};

		private touchEndHandler = (event:TouchEvent):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.up();
		};

		private touchCancelHandler = (event:TouchEvent):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.up();
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private target:IButton;
		private eventDistatcher:EventDispatcher;
		private hitArea:HTMLElement;
		private isOver:boolean;
		private isDown:boolean;
		private isPreventDefaultEnabled:boolean;
		private isStopPropagationEnabled:boolean;
		private isHoverCursorEnabled:boolean;
		private defaultMouseCursor:string;
	}
}