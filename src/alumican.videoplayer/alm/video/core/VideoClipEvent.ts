/// <reference path="../../../index.ts" />

namespace alm.video {

	export class VideoClipEvent extends alm.event.Event {

		public static readonly complete:string = 'VideoClipEvent.complete';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, target:object) {
			super(eventType, target);
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
	}
}
