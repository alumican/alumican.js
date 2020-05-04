/// <reference path='../../index.ts' />

namespace alm.io {

	export class FileLoaderSuccessEvent extends alm.event.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static SUCCESS:string = 'success';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null, content:any, info:any = null) {
			super(eventType, eventTarget);
			this.content = content;
			this.info = info;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():FileLoaderSuccessEvent {
			return new FileLoaderSuccessEvent(this.getType(), this.getTarget(), this.content, this.info);
		}

		public toString():string {
			return '[FileLoaderSuccessEvent] type = ' + this.getType() + ', info = ' + this.info;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public readonly content:any;
		public readonly info:any;
	}
}
