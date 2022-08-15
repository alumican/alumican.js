/// <reference path='../../index.ts' />

namespace alm.io {

	export class FileLoaderSuccessEvent extends alm.event.Event<FileLoader> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static readonly success:string = 'FileLoaderSuccessEvent.success';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:FileLoader, content:any, info:any = null) {
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
			return new FileLoaderSuccessEvent(this.type, this.target, this.content, this.info);
		}

		public toString():string {
			return '[FileLoaderSuccessEvent] type = ' + this.type + ', info = ' + this.info;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public readonly content:any;
		public readonly info:any;
	}
}
