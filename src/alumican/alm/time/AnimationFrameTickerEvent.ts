/// <reference path='../../include.ts' />

namespace alm.time {

	import Event = alm.event.Event;

	export class AnimationFrameTickerEvent extends Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static TICK:string = 'tick';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null) {
			super(eventType, eventTarget);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():AnimationFrameTickerEvent {
			return new AnimationFrameTickerEvent(this.getType(), this.getTarget());
		}

		public toString():string {
			return '[AnimationFrameTickerEvent] type = ' + this.getType();
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------
	}
}