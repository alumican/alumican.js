/// <reference path='../../include.ts' />

namespace alm.io {

	export class FileLoaderProgressEvent extends alm.event.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static START:string = 'start';
		static PROGRESS:string = 'progress';
		static COMPLETE:string = 'complete';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null, progress:number = 0, loadedCount:number = 0, totalCount:number = 0) {
			super(eventType, eventTarget);
			this.progress = progress;
			this.loadedCount = loadedCount;
			this.totalCount = totalCount;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():FileLoaderProgressEvent {
			return new FileLoaderProgressEvent(this.getType(), this.getTarget(), this.progress, this.loadedCount, this.totalCount);
		}

		public toString():string {
			return '[FileLoaderProgressEvent] type = ' + this.getType() + ', progress = ' + this.progress + ', loadedCount = ' + this.loadedCount + ', totalCount = ' + this.totalCount;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public progress:number;
		public loadedCount:number;
		public totalCount:number;
	}
}
