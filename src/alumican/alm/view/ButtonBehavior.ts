/// <reference path='../../include.ts' />

namespace alm.view {

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
		}

		public out(useTransition:boolean = true):void {
			if (!this.isOver) return;
			this.isOver = false;
			this.target.implButtonOut(useTransition);
		}

		public down(useTransition:boolean = true):void {
			if (this.isDown) return;
			this.isDown = true;
			this.target.implButtonDown(useTransition);
		}

		public up(useTransition:boolean = true):void {
			if (!this.isDown) return;
			this.isDown = false;
			this.target.implButtonUp(useTransition);
		}

		public click(useTransition:boolean = true):void {
			this.target.implButtonClick(useTransition);
		}

		private on():void {
			jQuery(this.hitArea).on('mouseover', this.mouseOverHandler);
			jQuery(this.hitArea).on('mouseout', this.mouseOutHandler);
			jQuery(this.hitArea).on('mousedown', this.mouseDownHandler);
			jQuery(this.hitArea).on('mouseup', this.mouseUpHandler);
			jQuery(this.hitArea).on('click', this.clickHandler);

			jQuery(this.hitArea).on('touchstart', this.touchStartHandler);
			jQuery(this.hitArea).on('touchend', this.touchEndHandler);
			jQuery(this.hitArea).on('touchcancel', this.touchCancelHandler);
		}

		private off():void {
			jQuery(this.hitArea).off('mouseover', this.mouseOverHandler);
			jQuery(this.hitArea).off('mouseout', this.mouseOutHandler);
			jQuery(this.hitArea).off('mousedown', this.mouseDownHandler);
			jQuery(this.hitArea).off('mouseup', this.mouseUpHandler);
			jQuery(this.hitArea).off('click', this.clickHandler);

			jQuery(this.hitArea).off('touchstart', this.touchStartHandler);
			jQuery(this.hitArea).off('touchend', this.touchEndHandler);
			jQuery(this.hitArea).off('touchcancel', this.touchCancelHandler);
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

		private mouseOverHandler = (event:JQuery.Event):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			if (this.isHoverCursorEnabled) {
				this.defaultMouseCursor = this.hitArea.style.cursor;
				this.hitArea.style.cursor = 'pointer';
			}
			this.over();
		};

		private mouseOutHandler = (event:JQuery.Event):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			if (this.isHoverCursorEnabled) {
				this.hitArea.style.cursor = this.defaultMouseCursor != '' ? this.defaultMouseCursor : 'pointer';
			}
			this.out();
		};

		private mouseDownHandler = (event:JQuery.Event):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.down();
		};

		private mouseUpHandler = (event:JQuery.Event):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.up();
		};

		private clickHandler = (event:JQuery.Event):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.click();
		};

		// --------------------------------------------------
		// Touch Event

		private touchStartHandler = (event:JQuery.Event):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.down();
		};

		private touchEndHandler = (event:JQuery.Event):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.up();
		};

		private touchCancelHandler = (event:JQuery.Event):void => {
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
		private hitArea:HTMLElement;
		private isOver:boolean;
		private isDown:boolean;
		private isPreventDefaultEnabled:boolean;
		private isStopPropagationEnabled:boolean;
		private isHoverCursorEnabled:boolean;
		private defaultMouseCursor:string;
	}
}