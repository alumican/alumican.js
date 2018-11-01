/// <reference path='../../include.ts' />

namespace alm.browser {

	export class WindowWatcherEvent extends alm.event.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static SCROLL:string = 'scroll';
		static RESIZE:string = 'resize';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null, originalEvent:Event = null, scrollTop:number = 0, scrollBottom:number = 0, windowWidth:number = 0, windowHeight:number = 0) {
			super(eventType, eventTarget);
			this.originalEvent = originalEvent;
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
			return new WindowWatcherEvent(this.getType(), this.getTarget(), this.originalEvent, this.scrollTop, this.scrollBottom, this.windowWidth, this.windowHeight);
		}

		public toString():string {
			return '[WindowWatcherEvent] type = ' + this.getType() + ', scrollTop = ' + this.scrollTop + ', scrollBottom = ' + this.scrollBottom + ', windowWidth = ' + this.windowWidth + ', windowHeight = ' + this.windowHeight;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public originalEvent:Event;
		public scrollTop:number;
		public scrollBottom:number;
		public windowWidth:number;
		public windowHeight:number;
	}
}