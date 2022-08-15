/// <reference path='../../index.ts' />

namespace alm.io {

	export class FileLoaderProgressEvent extends alm.event.Event<FileLoader> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static readonly start:string = 'FileLoaderProgressEvent.start';
		public static readonly progress:string = 'FileLoaderProgressEvent.progress';
		public static readonly complete:string = 'FileLoaderProgressEvent.complete';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:FileLoader, progress:number = 0, loadedCount:number = 0, totalCount:number = 0) {
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
			return new FileLoaderProgressEvent(this.type, this.target, this.progress, this.loadedCount, this.totalCount);
		}

		public toString():string {
			return '[FileLoaderProgressEvent] type = ' + this.type + ', progress = ' + this.progress + ', loadedCount = ' + this.loadedCount + ', totalCount = ' + this.totalCount;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public readonly progress:number;
		public readonly loadedCount:number;
		public readonly totalCount:number;
	}
}
