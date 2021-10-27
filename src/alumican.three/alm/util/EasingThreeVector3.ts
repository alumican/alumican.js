/// <reference path='../../index.ts' />

namespace alm.util {

	import EasingValue = math.EasingValue;

	export class EasingThreeVector3 {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(initValue:THREE.Vector3, easing:number = 0.1, tolerance:number = 0) {
			this.x = new EasingValue(initValue.x, easing, tolerance);
			this.y = new EasingValue(initValue.y, easing, tolerance);
			this.z = new EasingValue(initValue.z, easing, tolerance);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public update(useTransition:boolean = true):void {
			this.x.update(useTransition);
			this.y.update(useTransition);
			this.z.update(useTransition);
		}

		public setTarget(x:number, y:number, z:number):void {
			this.x.target = x;
			this.y.target = y;
			this.z.target = z;
		}

		public setEasing(easing:number):void {
			this.x.easing = easing;
			this.y.easing = easing;
			this.z.easing = easing;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public x:EasingValue;
		public y:EasingValue;
		public z:EasingValue;
	}
}
1
