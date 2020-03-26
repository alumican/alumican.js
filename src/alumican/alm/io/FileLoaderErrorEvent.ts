/// <reference path='../../include.ts' />

namespace alm.io {

	export class FileLoaderErrorEvent extends alm.event.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static ERROR:string = 'error';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null, info:any = null) {
			super(eventType, eventTarget);
			this.info = info;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():FileLoaderErrorEvent {
			return new FileLoaderErrorEvent(this.getType(), this.getTarget(), this.info);
		}

		public toString():string {
			return '[FileLoaderErrorEvent] type = ' + this.getType() + ', info = ' + this.info;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public info:any;
	}
}
