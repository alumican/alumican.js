/// <reference path='../index.ts' />

namespace scn {

	import Event = alm.event.Event;

	export class SceneManagerTransferEvent extends Event<SceneManager> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static readonly transferStart:string = 'SceneManagerTransferEvent.transferStart';
		public static readonly transferComplete:string = 'SceneManagerTransferEvent.transferComplete';





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
		// MEMBER
		//
		// --------------------------------------------------

		public readonly transferInfo:SceneTransferInfo;
	}
}
