/// <reference path='../../index.ts' />

namespace alm.time {

	import Event = alm.event.Event;

	export class TimerEvent extends Event<Timer> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static readonly tick:string = 'TimerEvent.tick';
		public static readonly complete:string = 'TimerEvent.complete';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:Timer, elapsedCount:number = 0, repeatCount:number = 0, restCount:number = 0) {
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
			return new TimerEvent(this.type, this.target, this.elapsedCount, this.repeatCount, this.restCount);
		}

		public toString():string {
			return '[TimerEvent] type = ' + this.type + ', elapsedCount = ' + this.elapsedCount + ', repeatCount=' + this.repeatCount + ', restCount=' + this.restCount;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public readonly elapsedCount:number;
		public readonly repeatCount:number;
		public readonly restCount:number;
	}
}
