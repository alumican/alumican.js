/// <reference path='../index.ts' />

namespace scn {

	import Event = alm.event.Event;

	export class SceneManagerEvent extends Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static TRANSFER_START:string = 'transferStart';
		public static TRANSFER_COMPLETE:string = 'transferComplete';





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

		public clone():SceneManagerEvent {
			return new SceneManagerEvent(this.getType(), this.getTarget());
		}

		public toString():string {
			return '[SceneManagerEvent] type = ' + this.getType();
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------
	}
}
