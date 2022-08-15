/// <reference path='../../index.ts' />

namespace alm.geom {

	export class Vector3 {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(x:number = 0, y:number = 0, z:number = 0) {
			this.set(x, y, z);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public set(x:number, y:number, z:number):void {
			this.x = x;
			this.y = y;
			this.z = z;
		}

		public copyTo(point:Vector3):void {
			point.set(this.x, this.y, this.z);
		}

		public getClone():Vector3 {
			return new Vector3(this.x, this.y, this.z);
		}

		public zero():void {
			this.set(0, 0, 0);
		}

		public normalize():void {
			const l:number = this.getLength();
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}

		public getLength():number {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		}

		public getSquareDistance(point:Vector3):number {
			const dx:number = point.x - this.x;
			const dy:number = point.y - this.y;
			const dz:number = point.z - this.z;
			return dx * dx + dy * dy + dz * dz;
		}

		public getDistance(point:Vector3):number {
			return Math.sqrt(this.getSquareDistance(point));
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public x:number;
		public y:number;
		public z:number;
	}
}
