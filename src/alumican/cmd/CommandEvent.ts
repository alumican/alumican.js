/// <reference path='../index.ts' />

namespace cmd {

	import Event = alm.event.Event;

	export class CommandEvent extends Event<Command> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static readonly complete:string = 'CommandEvent.complete';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:Command) {
			super(eventType, eventTarget);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():CommandEvent {
			return new CommandEvent(this.type, this.target);
		}

		public toString():string {
			return '[CommandEvent] type = ' + this.type;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------
	}
}
