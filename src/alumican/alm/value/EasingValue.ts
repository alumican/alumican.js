/// <reference path='../../include.ts' />

namespace alm.value {

	export class EasingValue {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(initValue:number, easing:number = 0.1, tolerance:number = 0) {
			this.value = this.target = initValue;
			this.easing = easing;
			this.tolerance = tolerance;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public update(useTransition:boolean = true):number {
			if (useTransition) {
				const d:number = this.target - this.value;
				if (this.tolerance > 0 && Math.abs(d) <= this.tolerance) {
					this.value = this.target;
				} else {
					this.value += d * this.easing;
				}
			} else {
				this.value = this.target;
			}

			return this.value;
		}

		public clone():EasingValue {
			const v:EasingValue = new EasingValue(this.value, this.easing, this.tolerance);
			v.target = this.target;
			return v;
		}




		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public value:number;
		public target:number;
		public easing:number;
		public tolerance:number;
	}
}