/// <reference path='../../include.ts' />

namespace alm.value {

	export class SpringValue {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(initValue:number, spring:number = 0.1, friction:number = 0.9) {
			this.acceleration = 0;
			this.velocity = 0;
			this.value = this.target = initValue;
			this.spring = spring;
			this.friction = friction;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public update(useTransition:boolean = true):number {
			if (useTransition) {
				this.acceleration = (this.target - this.value) * this.spring;
				this.velocity += this.acceleration;
				this.velocity *= this.friction;
				this.value += this.velocity;
			} else {
				this.acceleration = 0;
				this.velocity = 0;
				this.value = this.target;
			}

			return this.value;
		}

		public clone():SpringValue {
			const v:SpringValue = new SpringValue(this.value, this.spring, this.friction);
			v.acceleration = this.acceleration;
			v.velocity = this.velocity;
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
		public velocity:number;
		public acceleration:number;
		public spring:number;
		public friction:number;
	}
}