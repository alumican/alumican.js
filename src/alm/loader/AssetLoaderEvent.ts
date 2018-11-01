/// <reference path='../../include.ts' />

namespace alm.loader {

	import Event = alm.event.Event;

	export class AssetLoaderEvent extends Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static PROGRESS:string = 'progress';
		static COMPLETE:string = 'complete';
		static ERROR:string = 'error';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null, progress:number = 0, loadedCount:number = 0, totalCount:number = 0, content:any = null) {
			super(eventType, eventTarget);
			this.progress = progress;
			this.loadedCount = loadedCount;
			this.totalCount = totalCount;
			this.content = content;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():AssetLoaderEvent {
			return new AssetLoaderEvent(this.getType(), this.getTarget(), this.progress, this.loadedCount, this.totalCount, this.content);
		}

		public toString():string {
			return '[AssetLoaderEvent] type = ' + this.getType() + ', progress = ' + this.progress + ', loadedCount = ' + this.loadedCount + ', totalCount = ' + this.totalCount;
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
	}
}