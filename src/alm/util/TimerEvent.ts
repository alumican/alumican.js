/// <reference path="../../reference.ts" />

namespace alm.util {

	import Event = alm.event.Event;

	export class TimerEvent extends Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static TICK:string = "tick";
		public static COMPLETE:string = "complete";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null, elapsedCount:number = 0, repeatCount:number = 0, restCount:number = 0) {
			super(eventType, eventTarget);
			this.elapsedCount = elapsedCount;
			this.repeatCount = repeatCount;
			this.restCount = restCount;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():TimerEvent {
			return new TimerEvent(this.getType(), this.getTarget(), this.elapsedCount, this.repeatCount, this.restCount);
		}

		public toString():string {
			return "[TimerEvent] type = " + this.getType() + ", elapsedCount = " + this.elapsedCount + ", repeatCount=" + this.repeatCount + ", restCount=" + this.restCount;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public elapsedCount:number;
		public repeatCount:number;
		public restCount:number;
	}
}