/// <reference path="../../reference.ts" />

namespace alm.view {

	export class ButtonBehavior {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(target:IButton, hitArea:JQuery = null) {
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
			this.hitArea.on("mouseover", this.mouseOverHandler);
			this.hitArea.on("mouseout", this.mouseOutHandler);
			this.hitArea.on("mousedown", this.mouseDownHandler);
			this.hitArea.on("mouseup", this.mouseUpHandler);
			this.hitArea.on("click", this.clickHandler);
		}

		private off():void {
			this.hitArea.off("mouseover", this.mouseOverHandler);
			this.hitArea.off("mouseout", this.mouseOutHandler);
			this.hitArea.off("mousedown", this.mouseDownHandler);
			this.hitArea.off("mouseup", this.mouseUpHandler);
			this.hitArea.off("click", this.clickHandler);
		}

		private mouseOverHandler = (event:JQuery.Event):void => {
			this.over();
		};

		private mouseOutHandler = (event:JQuery.Event):void => {
			this.out();
		};

		private mouseDownHandler = (event:JQuery.Event):void => {
			this.down();
		};

		private mouseUpHandler = (event:JQuery.Event):void => {
			this.over();
		};

		private clickHandler = (event:JQuery.Event):void => {
			this.click();
		};

		public getIsOver():boolean {
			return this.isOver;
		}

		public getIsDown():boolean {
			return this.isDown;
		}

		public getHitArea():JQuery {
			return this.hitArea;
		}

		public setHitArea(hitArea:JQuery):void {
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
		private hitArea:JQuery;
		private isOver:boolean;
		private isDown:boolean;
	}
}