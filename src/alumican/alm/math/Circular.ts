/// <reference path='../../index.ts' />

namespace alm.math {

	export class Circular {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(angle:number = 0, velocity:number = 0, radian:boolean = true) {
			this.setAngle(angle, radian);
			this.setVelocity(velocity, radian);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public getAngle(radian:boolean = true):number {
			return radian ? this.angle : (this.angle * 180 / Math.PI);
		}

		public setAngle(angle:number, radian:boolean = true):void {
			this.angle = radian ? angle : (angle * Math.PI / 180);
		}

		public getVelocity(radian:boolean = true):number {
			return radian ? this.velocity : (this.velocity * 180 / Math.PI);
		}

		public setVelocity(velocity:number, radian:boolean = true):void {
			this.velocity = radian ? velocity : (velocity * Math.PI / 180);
		}

		public update():void {
			this.angle += this.velocity;
		}

		public getSin(length:number = 1):number {
			return length * Math.sin(this.angle);
		}

		public getCos(length:number = 1):number {
			return length * Math.cos(this.angle);
		}

		public getTan(length:number = 1):number {
			return length * Math.tan(this.angle);
		}

		public getMagnitude(length:number = 1):number {
			return length * (1 + Math.sin(this.angle)) / 2;
		}

		public getVector(length:number = 1, xy:{ x:number, y:number } = null):{ x:number, y:number } {
			if (xy != null) {
				xy.x = this.getCos(length);
				xy.y = this.getSin(length);
			} else {
				return { x: this.getCos(length), y: this.getSin(length) };
			}
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private angle:number;
		private velocity:number;
	}
}
