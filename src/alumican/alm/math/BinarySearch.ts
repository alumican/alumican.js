/// <reference path='../../index.ts' />

namespace alm.math {

	export class BinarySearch {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(list:number[] = null) {
			this.setList(list);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public setList(list:number[]):void {
			this.list = list;
		}

		public searchNearest(value:number):number {
			let lowIndex = 0;
			let highIndex = this.list.length - 1;
			let midIndex;
			let estimated;
			while (lowIndex <= highIndex) {
				midIndex = Math.floor((lowIndex + highIndex) / 2);
				estimated = this.list[midIndex];
				if (estimated == value) {
					return midIndex;
				} else if (estimated > value) {
					highIndex = midIndex - 1;
				} else {
					lowIndex = midIndex + 1;
				}
			}
			return midIndex;
		}

		public leapNearest(value:number):{ index0:number, index1:number, ratio:number } {
			const nearestIndex = this.searchNearest(value);
			const nearestValue = this.list[nearestIndex];

			let lowIndex;
			let lowValue;
			let highIndex;
			let highValue;
			if (nearestValue <= value) {
				lowIndex = nearestIndex;
				lowValue = nearestValue;
				highIndex = nearestIndex + 1;
				if (highIndex >= this.list.length) {
					highIndex = this.list.length - 1;
				}
				highValue = this.list[highIndex];
			} else {
				lowIndex = nearestIndex - 1;
				if (lowIndex < 0) {
					lowIndex = 0;
				}
				lowValue = this.list[lowIndex];
				highIndex = nearestIndex;
				highValue = nearestValue;
			}

			const d = highValue - lowValue;
			if (d > 0) {
				return { index0: lowIndex, index1: highIndex, ratio: (value - lowValue) / (highValue - lowValue) };
			} else {
				return { index0: lowIndex, index1: highIndex, ratio: 0 };
			}
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private list:number[];
	}
}
