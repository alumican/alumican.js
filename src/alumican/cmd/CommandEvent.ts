/// <reference path='../index.ts' />

namespace cmd {

	import Event = alm.event.Event;

	export class CommandEvent extends Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static COMPLETE:string = 'complete';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null) {
			super(eventType, eventTarget);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():CommandEvent {
			return new CommandEvent(this.getType(), this.getTarget());
		}

		public toString():string {
			return '[CommandEvent] type = ' + this.getType();
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------
	}
}
