/// <reference path='../../index.ts' />

namespace alm.math {

	export class SimpleAverage {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
			this.reset();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public add(n:number):number {
			this._value = (this._value * this._count + n) / ++this._count;

			this.value = this._value;
			this.count = this._count;

			return this._value;
		}

		public reset():void {
			this.value = this._value = 0;
			this.count = this._count = 0;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public value:number;
		public count:number;

		private _value:number;
		private _count:number;
	}
}
