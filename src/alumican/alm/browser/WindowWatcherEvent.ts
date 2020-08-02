/// <reference path='../../index.ts' />

namespace alm.browser {

	export class WindowWatcherEvent extends alm.event.Event<WindowWatcher> {

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

		constructor(eventType:string, eventTarget:WindowWatcher, originalEvent:Event = null, scrollTop:number = 0, scrollBottom:number = 0, windowWidth:number = 0, windowHeight:number = 0) {
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
			return new WindowWatcherEvent(this.type, this.target, this.originalEvent, this.scrollTop, this.scrollBottom, this.windowWidth, this.windowHeight);
		}

		public toString():string {
			return '[WindowWatcherEvent] type = ' + this.type + ', scrollTop = ' + this.scrollTop + ', scrollBottom = ' + this.scrollBottom + ', windowWidth = ' + this.windowWidth + ', windowHeight = ' + this.windowHeight;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public readonly originalEvent:Event;
		public readonly scrollTop:number;
		public readonly scrollBottom:number;
		public readonly windowWidth:number;
		public readonly windowHeight:number;
	}
}
