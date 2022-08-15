/// <reference path="../../index.ts" />

namespace alm.browser {

	export class ResponsiveObserverEvent extends alm.event.Event<ResponsiveObserver> {

		public static readonly change:string = 'ResponsiveObserverEvent.change';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, target:ResponsiveObserver, currentIndex:number, prevIndex:number) {
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
		// MEMBER
		//
		// --------------------------------------------------

		public readonly currentIndex:number;
		public readonly prevIndex:number;
	}
}
