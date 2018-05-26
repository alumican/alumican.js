/// <reference path="../../reference.ts" />

namespace alm.geom {

	export class Rectangle {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(x:number = 0, y:number = 0, width:number = 0, height:number = 0) {
			this.set(x, y, width, height);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public set(x:number, y:number, width:number, height:number):void {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}

		public copyTo(rect:Rectangle):void {
			rect.set(this.x, this.y, this.width, this.height);
		}

		public getClone():Rectangle {
			return new Rectangle(this.x, this.y, this.width, this.height);
		}

		public getTop():number {
			return this.y;
		}

		public getBottom():number {
			return this.y + this.height;
		}

		public getLeft():number {
			return this.x;
		}

		public getRight():number {
			return this.x + this.width;
		}

		public getTopLeft():Vector2 {
			return new Vector2(this.getLeft(), this.getTop());
		}

		public getTopRight():Vector2 {
			return new Vector2(this.getRight(), this.getTop());
		}

		public getBottomLeft():Vector2 {
			return new Vector2(this.getLeft(), this.getBottom());
		}

		public getBottomRight():Vector2 {
			return new Vector2(this.getRight(), this.getBottom());
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public x:number;
		public y:number;
		public width:number;
		public height:number;
	}
}