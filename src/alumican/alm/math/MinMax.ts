/// <reference path='../../index.ts' />

namespace alm.math {

	/**
	 * 最小値と最大値を見つける
	 */
	export class MinMax {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
			this.min = this._min = Number.MAX_VALUE;
			this.max = this._max = -Number.MAX_VALUE;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public add(n:number):void {
			if (n < this._min) {
				this._min = n;
			}
			if (n > this._max) {
				this._max = n;
			}
			this.min = this._min;
			this.max = this._max;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public min:number;
		public max:number;

		private _min:number;
		private _max:number;
	}
}
