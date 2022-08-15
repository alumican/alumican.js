/// <reference path='../index.ts' />

namespace scn {

	import Event = alm.event.Event;

	export class SceneEvent extends Event<Scene> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static readonly load:string = 'SceneEvent.load';
		public static readonly unload:string = 'SceneEvent.unload';
		public static readonly arrive:string = 'SceneEvent.arrive';
		public static readonly leave:string = 'SceneEvent.leave';
		public static readonly ascend:string = 'SceneEvent.ascend';
		public static readonly descend:string = 'SceneEvent.descend';

		public static readonly loadComplete:string = 'SceneEvent.loadComplete';
		public static readonly unloadComplete:string = 'SceneEvent.unloadComplete';
		public static readonly arriveComplete:string = 'SceneEvent.arriveComplete';
		public static readonly leaveComplete:string = 'SceneEvent.leaveComplete';
		public static readonly ascendComplete:string = 'SceneEvent.ascendComplete';
		public static readonly descendComplete:string = 'SceneEvent.descendComplete';





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
		// MEMBER
		//
		// --------------------------------------------------
	}
}
