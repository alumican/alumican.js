/// <reference path='../index.ts' />

namespace scn {

	import Event = alm.event.Event;

	export class SceneEvent extends Event<Scene> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static LOAD:string = 'SceneEvent.load';
		public static UNLOAD:string = 'SceneEvent.unload';
		public static ARRIVE:string = 'SceneEvent.arrive';
		public static LEAVE:string = 'SceneEvent.leave';
		public static ASCEND:string = 'SceneEvent.ascend';
		public static DESCEND:string = 'SceneEvent.descend';

		public static LOAD_COMPLETE:string = 'SceneEvent.loadComplete';
		public static UNLOAD_COMPLETE:string = 'SceneEvent.unloadComplete';
		public static ARRIVE_COMPLETE:string = 'SceneEvent.arriveComplete';
		public static LEAVE_COMPLETE:string = 'SceneEvent.leaveComplete';
		public static ASCEND_COMPLETE:string = 'SceneEvent.ascendComplete';
		public static DESCEND_COMPLETE:string = 'SceneEvent.descendComplete';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:Scene) {
			super(eventType, eventTarget);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():SceneEvent {
			return new SceneEvent(this.type, this.target);
		}

		public toString():string {
			return '[SceneEvent] type = ' + this.type;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------
	}
}
