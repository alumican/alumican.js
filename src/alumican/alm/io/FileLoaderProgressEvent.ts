/// <reference path='../../include.ts' />

namespace alm.io {

	export class FileLoaderEvent extends alm.event.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static PROGRESS:string = 'progress';
		static COMPLETE:string = 'complete';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null, progress:number = 0, loadedCount:number = 0, totalCount:number = 0, content:any = null, info:any = null) {
			super(eventType, eventTarget);
			this.progress = progress;
			this.loadedCount = loadedCount;
			this.totalCount = totalCount;
			this.content = content;
			this.info = info;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():FileLoaderEvent {
			return new FileLoaderEvent(this.getType(), this.getTarget(), this.progress, this.loadedCount, this.totalCount, this.content, this.info);
		}

		public toString():string {
			return '[FileLoaderEvent] type = ' + this.getType() + ', progress = ' + this.progress + ', loadedCount = ' + this.loadedCount + ', totalCount = ' + this.totalCount;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public progress:number;
		public loadedCount:number;
		public totalCount:number;
		public content:any;
		public info:any;
	}
}
