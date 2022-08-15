/// <reference path="../../index.ts" />

namespace alm.video {

	export class VideoPlayerEvent extends alm.event.Event {

		public static readonly complete:string = 'VideoPlayerEvent.complete';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, target:object, clipId:string, clipIndex:number) {
			super(eventType, target);
			this.clipId = clipId;
			this.clipIndex = clipIndex;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public readonly clipId:string;
		public readonly clipIndex:number;
	}
}
