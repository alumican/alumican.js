/// <reference path="../../index.ts" />

namespace alm.multitouch {

	export class MultitouchPointer {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(pointerId:number, x:number = 0, y:number = 0) {
			this.pointerId = pointerId;
			this.isTouching = false;
			this.isFirstTouch = false;
			this.isLastTouch = false;
			this.isOldestTouch = false;
			this.isLatestTouch = false;
			this.x = x;
			this.y = y;
			this.touchStartTime = performance.now();
			this.touchEndTime = -1;
			this.oldestStartTime = -1;
			this.latestStartTime = -1;
		}


		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------


		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public readonly pointerId:number;
		public isTouching:boolean;
		public isFirstTouch:boolean;
		public isLastTouch:boolean;
		public isOldestTouch:boolean;
		public isLatestTouch:boolean;
		public x:number;
		public y:number;
		public touchStartTime:number;
		public touchEndTime:number;
		public oldestStartTime:number;
		public latestStartTime:number;
	}
}
