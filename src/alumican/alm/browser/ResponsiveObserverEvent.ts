/// <reference path="../../index.ts" />

namespace alm.browser {

	export class ResponsiveObserverEvent extends alm.event.Event {

		public static CHANGE:string = 'ResponsiveObserverEvent.CHANGE';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, target:object, currentIndex:number, prevIndex:number) {
			super(eventType, target);

			this.currentIndex = currentIndex;
			this.prevIndex = prevIndex;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public readonly currentIndex:number;
		public readonly prevIndex:number;
	}
}
