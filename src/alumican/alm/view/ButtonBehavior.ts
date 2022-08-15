/// <reference path='../../index.ts' />

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
			this.isEnabled = true;
			this.isOver = false;
			this.isDown = false;
			this.isOverInternal = false;
			this.isDownInternal = false;
			this.defaultMouseCursor = '';

			this.setHitArea(hitArea);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public over(useTransition:boolean = true):void {
			this.isOverInternal = true;
			if (this.isEnabled) {
				if (this.isOver) return;
				this.isOver = true;
				this.target.implButtonOver(useTransition);
			}
		}

		public out(useTransition:boolean = true):void {
			this._out(true, useTransition);
		}

		private _out(checkEnabled:boolean, useTransition:boolean = true):void {
			this.isOverInternal = false;
			if (this.isEnabled || !checkEnabled) {
				if (!this.isOver) return;
				this.isOver = false;
				this.target.implButtonOut(useTransition);
			}
		}

		public down(useTransition:boolean = true):void {
			this.isDownInternal = true;
			if (this.isEnabled) {
				if (this.isDown) return;
				this.isDown = true;
				this.target.implButtonDown(useTransition);
			}
		}

		public up(useTransition:boolean = true):void {
			this._up(true, useTransition);
		}

		private _up(checkEnabled:boolean, useTransition:boolean = true):void {
			this.isDownInternal = false;
			if (this.isEnabled || !checkEnabled) {
				if (!this.isDown) return;
				this.isDown = false;
				this.target.implButtonUp(useTransition);
			}
		}

		public click(useTransition:boolean = true):void {
			if (this.isEnabled) {
				this.target.implButtonClick(useTransition);
			}
		}

		private on():void {
			if (this.hitArea == null) return;

			this.hitArea.addEventListener('mouseover', this.mouseOverHandler);
			this.hitArea.addEventListener('mouseout', this.mouseOutHandler);
			this.hitArea.addEventListener('mousedown', this.mouseDownHandler);
			this.hitArea.addEventListener('mouseup', this.mouseUpHandler);
			this.hitArea.addEventListener('click', this.clickHandler);

			this.hitArea.addEventListener('touchstart', this.touchStartHandler);
			this.hitArea.addEventListener('touchend', this.touchEndHandler);
			this.hitArea.addEventListener('touchcancel', this.touchCancelHandler);
		}

		private off():void {
			if (this.hitArea == null) return;

			this.hitArea.removeEventListener('mouseover', this.mouseOverHandler);
			this.hitArea.removeEventListener('mouseout', this.mouseOutHandler);
			this.hitArea.removeEventListener('mousedown', this.mouseDownHandler);
			this.hitArea.removeEventListener('mouseup', this.mouseUpHandler);
			this.hitArea.removeEventListener('click', this.clickHandler);

			this.hitArea.removeEventListener('touchstart', this.touchStartHandler);
			this.hitArea.removeEventListener('touchend', this.touchEndHandler);
			this.hitArea.removeEventListener('touchcancel', this.touchCancelHandler);
		}

		public getIsEnabled():boolean {
			return this.isEnabled;
		}

		public setIsEnabled(value:boolean, useTransition:boolean = true):void {
			if (this.isEnabled != value) {
				this.isEnabled = value;
				if (this.isEnabled) {
					if (this.isOverInternal) {
						this.over();
					}
					if (this.isDownInternal) {
						this.down();
					}
				} else {
					if (this.isOver) {
						this._out(false);
						this.isOverInternal = true;
					}
					if (this.isDown) {
						this._up(false);
						this.isDownInternal = true;
					}
				}
				this.target.implButtonChangeEnabled(this.isEnabled, useTransition);
			}
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
				this.off();
				this.hitArea = hitArea;
				this.on();
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

		private applyMouseCursor():void {
			if (this.isHoverCursorEnabled) {
				if (this.isOverInternal && this.isEnabled && this.hitArea != null) {
					this.defaultMouseCursor = this.hitArea.style.cursor;
					this.hitArea.style.cursor = 'pointer';
				} else {
					this.hitArea.style.cursor = this.defaultMouseCursor != '' ? this.defaultMouseCursor : 'auto';
				}
			}
		}

		// --------------------------------------------------
		// Mouse Event

		private mouseOverHandler = (event:MouseEvent):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.over();
			this.applyMouseCursor();
		};

		private mouseOutHandler = (event:MouseEvent):void => {
			if (this.isPreventDefaultEnabled) event.preventDefault();
			if (this.isStopPropagationEnabled) event.stopPropagation();
			this.out();
			this.applyMouseCursor();
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
			this.click();
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
		private hitArea:HTMLElement;
		private isEnabled:boolean;
		private isOver:boolean;
		private isDown:boolean;
		private isOverInternal:boolean;
		private isDownInternal:boolean;
		private isPreventDefaultEnabled:boolean;
		private isStopPropagationEnabled:boolean;
		private isHoverCursorEnabled:boolean;
		private defaultMouseCursor:string;
	}
}
