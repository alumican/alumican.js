/// <reference path='../../index.ts' />

namespace alm.state {

	export class LoHiEvent extends alm.event.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static CHANGE:string = 'change';
		public static LOW:string = 'low';
		public static HIGH:string = 'high';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any, isHigh:boolean) {
			super(eventType, eventTarget);
			this.isHigh = isHigh;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():LoHiEvent {
			return new LoHiEvent(this.getType(), this.getTarget(), this.isHigh);
		}

		public toString():string {
			return '[LoHiEvent] type = ' + this.getType() + ', isHigh = ' + this.isHigh;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public readonly isHigh:boolean;
	}
}
