/// <reference path="../reference.ts" />

namespace alm {

	export class ResizeWatcherEvent extends cmd.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static RESIZE:string = "resize";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null, jqueryEvent:JQuery.Event = null, windowWidth:number = 0, windowHeight:number = 0) {
			super(eventType, eventTarget);
			this.jqueryEvent = jqueryEvent;
			this.windowWidth = windowWidth;
			this.windowHeight = windowHeight;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():ResizeWatcherEvent {
			return new ResizeWatcherEvent(this.getType(), this.getTarget(), this.jqueryEvent, this.windowWidth, this.windowHeight);
		}

		public toString():string {
			return "[ResizeWatcherEvent] type = " + this.getType() + ", windowWidth = " + this.windowWidth + ", windowHeight = " + this.windowHeight;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public jqueryEvent:JQuery.Event;
		public windowWidth:number;
		public windowHeight:number;
	}
}