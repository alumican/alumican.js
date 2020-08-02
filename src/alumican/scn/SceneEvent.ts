/// <reference path='../index.ts' />

namespace scn {

	import Event = alm.event.Event;

	export class SceneEvent extends Event<Scene> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static LOAD:string = 'load';
		public static UNLOAD:string = 'unload';
		public static ARRIVE:string = 'arrive';
		public static LEAVE:string = 'leave';
		public static ASCEND:string = 'ascend';
		public static DESCEND:string = 'descend';

		public static LOAD_COMPLETE:string = 'loadComplete';
		public static UNLOAD_COMPLETE:string = 'unloadComplete';
		public static ARRIVE_COMPLETE:string = 'arriveComplete';
		public static LEAVE_COMPLETE:string = 'leaveComplete';
		public static ASCEND_COMPLETE:string = 'ascendComplete';
		public static DESCEND_COMPLETE:string = 'descendComplete';





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
