/// <reference path='../index.ts' />

namespace scn {

	import Event = alm.event.Event;

	export class SceneManagerTransferEvent extends Event<SceneManager> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static TRANSFER_START:string = 'SceneManagerTransferEvent.transferStart';
		public static TRANSFER_COMPLETE:string = 'SceneManagerTransferEvent.transferComplete';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:SceneManager, transferInfo:SceneTransferInfo) {
			super(eventType, eventTarget);
			this.transferInfo = transferInfo;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():SceneManagerTransferEvent {
			return new SceneManagerTransferEvent(this.type, this.target, this.transferInfo);
		}

		public toString():string {
			return '[SceneManagerTransferEvent] type = ' + this.type;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public readonly transferInfo:SceneTransferInfo;
	}
}
