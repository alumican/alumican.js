/// <reference path="../reference.ts" />

namespace alm {

	export class Vector2 {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(x:number = 0, y:number = 0) {
			this.set(x, y);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public set(x:number, y:number):void {
			this.x = x;
			this.y = y;
		}

		public copyTo(point:Vector2):void {
			point.set(this.x, this.y);
		}

		public getClone():Vector2 {
			return new Vector2(this.x, this.y);
		}

		public zero():void {
			this.set(0, 0);
		}

		public normalize():void {
			const l:number = this.getLength();
			this.x /= l;
			this.y /= l;
		}

		public getLength():number {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		}

		public getSquareDistance(point:Vector2):number {
			const dx:number = point.x - this.x;
			const dy:number = point.y - this.y;
			return dx * dx + dy * dy;
		}

		public getDistance(point:Vector2):number {
			return Math.sqrt(this.getSquareDistance(point));
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public x:number;
		public y:number;
	}
}