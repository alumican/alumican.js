/// <reference path='../../index.ts' />

namespace alm.io {

	export class FileLoaderErrorEvent extends alm.event.Event<FileLoader> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static readonly error:string = 'FileLoaderErrorEvent.error';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:FileLoader, info:any = null) {
			super(eventType, eventTarget);
			this.info = info;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():FileLoaderErrorEvent {
			return new FileLoaderErrorEvent(this.type, this.target, this.info);
		}

		public toString():string {
			return '[FileLoaderErrorEvent] type = ' + this.type + ', info = ' + this.info;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public readonly info:any;
	}
}
