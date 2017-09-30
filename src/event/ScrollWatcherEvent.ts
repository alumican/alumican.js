/// <reference path="../reference.ts" />

namespace alm {

	export class ScrollWatcherEvent extends cmd.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static SCROLL:string = "scroll";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null, jqueryEvent:JQuery.Event = null, scrollTop:number = 0, scrollBottom:number = 0, windowHeight:number = 0) {
			super(eventType, eventTarget);
			this.jqueryEvent = jqueryEvent;
			this.scrollTop = scrollTop;
			this.scrollBottom = scrollBottom;
			this.windowHeight = windowHeight;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():ScrollWatcherEvent {
			return new ScrollWatcherEvent(this.getType(), this.getTarget(), this.jqueryEvent, this.scrollTop, this.scrollBottom, this.windowHeight);
		}

		public toString():string {
			return "[ScrollWatcherEvent] type = " + this.getType() + ", scrollTop = " + this.scrollTop + ", scrollBottom = " + this.scrollBottom + ", windowHeight = " + this.windowHeight;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public jqueryEvent:JQuery.Event;
		public scrollTop:number;
		public scrollBottom:number;
		public windowHeight:number;
	}
}