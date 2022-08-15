/// <reference path="../../index.ts" />

namespace alm.unlock_gesture {

	export class UnlockGestureEvent extends alm.event.Event {

		public static readonly complete:string = 'UnlockGestureEvent.complete';
		public static readonly failure:string = 'UnlockGestureEvent.failure';
		public static readonly reset:string = 'UnlockGestureEvent.reset';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, target:object) {
			super(eventType, target);
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
	}
}
