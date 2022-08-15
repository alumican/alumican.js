/// <reference path='../../index.ts' />

namespace alm.browser {

	export class WinWatcherEvent extends alm.event.Event<WinWatcher> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static readonly scroll:string = 'WinWatcherEvent.scroll';
		public static readonly resize:string = 'WinWatcherEvent.resize';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:WinWatcher, originalEvent:Event = null, scrollTop:number = 0, scrollBottom:number = 0, width:number = 0, height:number = 0) {
			super(eventType, eventTarget);
			this.originalEvent = originalEvent;
			this.scrollTop = scrollTop;
			this.scrollBottom = scrollBottom;
			this.width = width;
			this.height = height;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():WinWatcherEvent {
			return new WinWatcherEvent(this.type, this.target, this.originalEvent, this.scrollTop, this.scrollBottom, this.width, this.height);
		}

		public toString():string {
			return '[WinWatcherEvent] type = ' + this.type + ', scrollTop = ' + this.scrollTop + ', scrollBottom = ' + this.scrollBottom + ', width = ' + this.width + ', height = ' + this.height;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public readonly originalEvent:Event;
		public readonly scrollTop:number;
		public readonly scrollBottom:number;
		public readonly width:number;
		public readonly height:number;
	}
}
