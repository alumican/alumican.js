/// <reference path="../../reference.ts" />

namespace alm.browser {

	import Event = alm.event.Event;

	export class WindowWatcherEvent extends Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static SCROLL:string = "scroll";
		static RESIZE:string = "resize";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null, jqueryEvent:JQuery.Event = null, scrollTop:number = 0, scrollBottom:number = 0, windowWidth:number = 0, windowHeight:number = 0) {
			super(eventType, eventTarget);
			this.jqueryEvent = jqueryEvent;
			this.scrollTop = scrollTop;
			this.scrollBottom = scrollBottom;
			this.windowWidth = windowWidth;
			this.windowHeight = windowHeight;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():WindowWatcherEvent {
			return new WindowWatcherEvent(this.getType(), this.getTarget(), this.jqueryEvent, this.scrollTop, this.scrollBottom, this.windowWidth, this.windowHeight);
		}

		public toString():string {
			return "[WindowWatcherEvent] type = " + this.getType() + ", scrollTop = " + this.scrollTop + ", scrollBottom = " + this.scrollBottom + ", windowWidth = " + this.windowWidth + ", windowHeight = " + this.windowHeight;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public jqueryEvent:JQuery.Event;
		public scrollTop:number;
		public scrollBottom:number;
		public windowWidth:number;
		public windowHeight:number;
	}
}