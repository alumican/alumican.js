/// <reference path='../../index.ts' />

namespace alm.math {

	export class SimpleMovingAverage {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(maxCount:number) {
			this.maxCount = this._maxCount = maxCount;
			this.reset();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public add(n:number):number {
			if (++this._count > this._maxCount) {
				this._count = this._maxCount;

				const oldest:number = this.values.shift();
				this._value -= oldest;

				const latest:number = n / this._maxCount;
				this._value += latest;

				this.values.push(latest);

			} else {
				this._value *= (this._count - 1);
				this._value += n;
				this._value /= this._count;

				this.values.push(n / this._maxCount);
			}

			/*
			this._values.push(n);

			if (++this._count > this._maxCount) {
				this._values.shift();
				this._count = this._maxCount;
			}

			this._value = 0;
			for (let i:number = 0; i < this._count; ++i) {
				this._value += this._values[i];
			}
			this._value /= this._count;
			*/

			this.value = this._value;
			this.count = this._count;

			return this._value;
		}

		public reset():void {
			this.value = this._value = 0;
			this.count = this._count = 0;
			this.values = [];
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public value:number;
		public maxCount:number;
		public count:number;

		private _value:number;
		private _maxCount:number;
		private _count:number;

		private values:number[];
	}
}
