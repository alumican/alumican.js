/// <reference path="../../index.ts" />

namespace alm.unlock_gesture {

	export class UnlockGestureProgressEvent extends alm.event.Event {

		public static readonly progress:string = 'UnlockGestureProgressEvent.progress';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, target:object, current:number, total:number) {
			super(eventType, target);
			this.current = current;
			this.total = total;
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

		public readonly current:number;
		public readonly total:number;
	}
}
