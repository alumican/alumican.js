/// <reference path='../../index.ts' />

namespace alm.state {

	export class Lottery<T = any> {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(values:T[] = null) {
			if (values) {
				this.set(values);
			} else {
				this.initValues = this.restValues = null;
				this.restCount = this.restValues.length;
				this.isEmpty = true;
			}
			this.onCheck = null;
			this.isAutoResetEnabled = false;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public set(values:T[]):void {
			this.initValues = values.concat();
			this.reset();
		}

		public get():T {
			if (this.isEmpty && this.isAutoResetEnabled) {
				this.reset();
			}
			const index:number = Math.floor(Math.random() * this.restCount);
			const value:T = this.restValues[index];
			let result:boolean = true;
			if (this.onCheck) result = this.onCheck(value);
			if (result) {
				this.restValues.splice(index, 1);
				this.restCount = this.restValues.length;
				this.isEmpty = this.restCount == 0;
			}
			return value;
		}

		public add(value:T, reset:boolean = false):void {
			this.initValues.push(value);
			this.restValues.push(value);
			this.restCount = this.restValues.length;
			this.isEmpty = this.restCount == 0;
			if (reset) {
				this.reset();
			}
		}

		public reset():void {
			this.restValues = this.initValues.concat();
			this.restCount = this.restValues.length;
			this.isEmpty = this.restCount == 0;
		}

		public getRestCount():number {
			return this.restCount;
		}

		public getIsEmply():boolean {
			return this.isEmpty;
		}

		public getIsAutoResetEnabled():boolean {
			return this.isAutoResetEnabled;
		}

		public setIsAutoResetEnabled(enabled:boolean):void {
			this.isAutoResetEnabled = enabled;
		}

		public static createIndices(count:number):Lottery<number> {
			const values:number[] = new Array(count);
			for (let i:number = 0; i < count; ++i) values[i] = i;
			return new Lottery<number>(values);
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public onCheck:(value:T) => boolean;

		private isAutoResetEnabled:boolean;
		private isEmpty:boolean;
		private restCount:number;
		private restValues:T[];
		private initValues:T[];
	}
}
