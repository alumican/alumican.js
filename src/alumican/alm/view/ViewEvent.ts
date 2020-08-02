/// <reference path='../../index.ts' />

namespace alm.view {

	import Event = alm.event.Event;

	export class ViewEvent extends Event<View> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static INITIALIZE_BEGIN:string = 'initializeBegin';
		public static INITIALIZE_END:string = 'initializeEnd';

		public static FINALIZE_BEGIN:string = 'finalizeBegin';
		public static FINALIZE_END:string = 'finalizeEnd';

		public static READY_BEGIN:string = 'readyBegin';
		public static READY_END:string = 'readyEnd';

		public static SHOW_BEGIN:string = 'showBegin';
		public static SHOW_END:string = 'showEnd';

		public static HIDE_BEGIN:string = 'hideBegin';
		public static HIDE_END:string = 'hideEnd';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:View) {
			super(eventType, eventTarget);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():ViewEvent {
			return new ViewEvent(this.type, this.target);
		}

		public toString():string {
			return '[ViewEvent] type = ' + this.type;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------
	}
}
