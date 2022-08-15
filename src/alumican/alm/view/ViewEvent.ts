/// <reference path='../../index.ts' />

namespace alm.view {

	import Event = alm.event.Event;

	export class ViewEvent extends Event<View> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static readonly initializeBegin:string = 'ViewEvent.initializeBegin';
		public static readonly initializeEnd:string = 'ViewEvent.initializeEnd';

		public static readonly finalizeBegin:string = 'ViewEvent.finalizeBegin';
		public static readonly finalizeEnd:string = 'ViewEvent.finalizeEnd';

		public static readonly readyBegin:string = 'ViewEvent.readyBegin';
		public static readonly readyEnd:string = 'ViewEvent.readyEnd';

		public static readonly showBegin:string = 'ViewEvent.showBegin';
		public static readonly showEnd:string = 'ViewEvent.showEnd';

		public static readonly hideBegin:string = 'ViewEvent.hideBegin';
		public static readonly hideEnd:string = 'ViewEvent.hideEnd';





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
		// MEMBER
		//
		// --------------------------------------------------
	}
}
