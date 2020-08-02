/// <reference path='../index.ts' />

namespace scn {

	import Event = alm.event.Event;

	export class SceneManagerEvent extends Event<SceneManager> {

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

		constructor(eventType:string, eventTarget:SceneManager) {
			super(eventType, eventTarget);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():SceneManagerEvent {
			return new SceneManagerEvent(this.type, this.target);
		}

		public toString():string {
			return '[SceneManagerEvent] type = ' + this.type;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------
	}
}
