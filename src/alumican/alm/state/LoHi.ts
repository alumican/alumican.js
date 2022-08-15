/// <reference path='../../index.ts' />

namespace alm.state {

	import EventDispatcher = alm.event.EventDispatcher;

	export class LoHi extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(lowThreshold:number, highThreshold:number, initValue:number = 0) {
			super();

			this.lowThreshold = lowThreshold;
			this.highThreshold = highThreshold;
			this.isHigh = false;
			this._set(initValue, false);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		/**
		 * 新しい入力値を設定する
		 * @param {number} value 入力値
		 * @returns {boolean} 結果が更新されればtrue
		 */
		public set(value:number):boolean {
			return this._set(value, true);
		}

		public getIsHigh():boolean {
			return this.isHigh;
		}

		public getValue():number {
			return this.value;
		}

		public getLowThreshold():number {
			return this.lowThreshold;
		}

		public getHighThreshold():number {
			return this.highThreshold;
		}

		public setLowThreshold(threshold:number):void {
			this.lowThreshold = threshold;
			this._set(this.value, true);
		}

		public setHighThreshold(threshold:number):void {
			this.highThreshold = threshold;
			this._set(this.value, true);
		}

		private _set(value:number, dispatchEvent:boolean):boolean {
			this.value = value;
			if (this.isHigh && this.value < this.lowThreshold) {
				this.isHigh = false;
				if (dispatchEvent) {
					this.dispatchEvent(new LoHiEvent(LoHiEvent.low, this, this.isHigh));
					this.dispatchEvent(new LoHiEvent(LoHiEvent.change, this, this.isHigh));
				}
				return true;
			} else if (!this.isHigh && this.value > this.highThreshold) {
				this.isHigh = true;
				if (dispatchEvent) {
					this.dispatchEvent(new LoHiEvent(LoHiEvent.high, this, this.isHigh));
					this.dispatchEvent(new LoHiEvent(LoHiEvent.change, this, this.isHigh));
				}
				return true;
			}
			return false;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private lowThreshold:number;
		private highThreshold:number;
		private value:number;
		private isHigh:boolean;
	}
}
