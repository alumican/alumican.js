/// <reference path="../../index.ts" />

namespace alm.browser {

	export class ScrollSectionTriggerEvent extends alm.event.Event<ScrollSectionTrigger> {

		public static CHANGE:string = 'ScrollSectionTriggerEvent.CHANGE';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, target:ScrollSectionTrigger, currentSectionIndex:number, prevSectionIndex:number) {
			super(eventType, target);

			this.currentSectionIndex = currentSectionIndex;
			this.prevSectionIndex = prevSectionIndex;
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

		public readonly currentSectionIndex:number;
		public readonly prevSectionIndex:number;
	}
}
