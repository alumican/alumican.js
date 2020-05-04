/// <reference path="../../index.ts" />

namespace alm.canvas {

	export class Pointer {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(id:string) {
			this.id = id;

			this.isHovering = false;
			this.isTouching = false;
			this.isDragging = false;

			this.x = 0;
			this.y = 0;

			this.prevX = 0;
			this.prevY = 0;

			this.dragX = 0;
			this.dragY = 0;

			this.velocityX = 0;
			this.velocityY = 0;

			this.touchBeginX = 0;
			this.touchBeginY = 0;

			this.touchForce = 0;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public notifyEnter(x:number, y:number):void {
			this.prevX = this.x = x;
			this.prevY = this.y = y;
			this.isHovering = true;
		}

		public notifyLeave():void {
			this.isHovering = false;
		}

		public notifyTouch():void {
			this.isTouching = true;
			this.touchBeginX = this.x;
			this.touchBeginY = this.y;
		}

		public notifyRelease():void {
			this.isTouching = false;
			this.isDragging = false;
			this.dragX = 0;
			this.dragY = 0;
		}

		public notifyMove(x:number, y:number):void {
			this.prevX = this.x;
			this.prevY = this.y;

			this.x = x;
			this.y = y;

			this.velocityX = this.x - this.prevX;
			this.velocityY = this.y - this.prevY;

			if (this.isTouching) {
				this.isDragging = true;
			}

			if (this.isDragging) {
				this.dragX = this.x - this.touchBeginX;
				this.dragY = this.y - this.touchBeginY;
			}
		}

		public notifyTouchForce(force:number):void {
			this.touchForce = force;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public id:string;
		public isHovering:boolean;
		public isTouching:boolean;
		public isDragging:boolean;

		public x:number;
		public y:number;

		public prevX:number;
		public prevY:number;

		public dragX:number;
		public dragY:number;

		public velocityX:number;
		public velocityY:number;

		public touchBeginX:number;
		public touchBeginY:number;

		public touchForce:number;
	}
}
