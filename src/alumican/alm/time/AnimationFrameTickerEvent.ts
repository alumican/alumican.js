/// <reference path='../../index.ts' />

namespace alm.time {

	import Event = alm.event.Event;

	export class AnimationFrameTickerEvent extends Event<AnimationFrameTicker> {

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

		constructor(eventType:string, eventTarget:AnimationFrameTicker) {
			super(eventType, eventTarget);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():AnimationFrameTickerEvent {
			return new AnimationFrameTickerEvent(this.type, this.target);
		}

		public toString():string {
			return '[AnimationFrameTickerEvent] type = ' + this.type;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------
	}
}
