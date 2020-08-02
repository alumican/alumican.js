/// <reference path='../../index.ts' />

namespace alm.state {

	export class LoHiEvent extends alm.event.Event<LoHi> {

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

		constructor(eventType:string, eventTarget:LoHi, isHigh:boolean) {
			super(eventType, eventTarget);
			this.isHigh = isHigh;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():LoHiEvent {
			return new LoHiEvent(this.type, this.target, this.isHigh);
		}

		public toString():string {
			return '[LoHiEvent] type = ' + this.type + ', isHigh = ' + this.isHigh;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public readonly isHigh:boolean;
	}
}
