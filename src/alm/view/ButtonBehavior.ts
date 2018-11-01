/// <reference path="../../reference.ts" />

namespace alm.view {

	export class ButtonBehavior {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(target:IButton, hitArea:HTMLElement = null) {
			this.target = target;
			this.hitArea = null;
			this.isOver = false;
			this.isDown = false;

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
			this.hitArea.addEventListener("mouseover", this.mouseOverHandler);
			this.hitArea.addEventListener("mouseout", this.mouseOutHandler);
			this.hitArea.addEventListener("mousedown", this.mouseDownHandler);
			this.hitArea.addEventListener("mouseup", this.mouseUpHandler);
			this.hitArea.addEventListener("click", this.clickHandler);
		}

		private off():void {
			this.hitArea.addEventListener("mouseover", this.mouseOverHandler);
			this.hitArea.addEventListener("mouseout", this.mouseOutHandler);
			this.hitArea.addEventListener("mousedown", this.mouseDownHandler);
			this.hitArea.addEventListener("mouseup", this.mouseUpHandler);
			this.hitArea.addEventListener("click", this.clickHandler);
		}

		private mouseOverHandler = (event:MouseEvent):void => {
			this.over();
		};

		private mouseOutHandler = (event:MouseEvent):void => {
			this.out();
		};

		private mouseDownHandler = (event:MouseEvent):void => {
			this.down();
		};

		private mouseUpHandler = (event:MouseEvent):void => {
			this.over();
		};

		private clickHandler = (event:MouseEvent):void => {
			this.click();
		};

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





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private target:IButton;
		private hitArea:HTMLElement;
		private isOver:boolean;
		private isDown:boolean;
	}
}