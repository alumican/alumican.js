/// <reference path='../../include.ts' />

namespace alm.value {

	export class SimpleAverage {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
			this.value = this._value = 0;
			this.count = this._count = 0;
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