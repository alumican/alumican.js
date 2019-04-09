/// <reference path='../../include.ts' />

namespace alm.math {

	export class MaxValue {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(maxLatestCount:number = 0) {
			this.maxLatestCount = this._maxLatestCount = maxLatestCount;
			this.value = this._value = -Number.MAX_VALUE;
			this.count = this._count = 0;
			this.values = [];
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public add(n:number):number {
			if (this._maxLatestCount > 0) {
				if (++this._count > this._maxLatestCount) {
					this._count = this._maxLatestCount;

					this.values.push(n);
					const oldest:number = this.values.shift();
					if (this._value > oldest) {
						if (this._value < n) {
							this._value = n;
						}
					} else {
						this._value = -Number.MAX_VALUE;
						for (let i:number = 0; i < this._count; ++i) {
							const v:number = this.values[i];
							if (this._value < v) {
								this._value = v;
							}
						}
					}

				} else {
					this.values.push(n);
					if (this._value < n) {
						this._value = n;
					}
				}
			} else {
				++this._count;
				if (this._value < n) {
					this._value = n;
				}
			}

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
		public maxLatestCount:number;
		public count:number;

		private _value:number;
		private _maxLatestCount:number;
		private _count:number;

		private values:number[];
	}
}