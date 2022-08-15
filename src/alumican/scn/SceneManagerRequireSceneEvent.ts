/// <reference path='../index.ts' />

namespace scn {

	import Event = alm.event.Event;

	export class SceneManagerRequireSceneEvent extends Event<SceneManager> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static readonly requireScene:string = 'SceneManagerRequireSceneEvent.requireScene';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:SceneManager, scenePath:string) {
			super(eventType, eventTarget);
			this.scenePath = scenePath;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():SceneManagerRequireSceneEvent {
			return new SceneManagerRequireSceneEvent(this.type, this.target, this.scenePath);
		}

		public toString():string {
			return '[SceneManagerRequireSceneEvent] type = ' + this.type + ', scenePath = ' + this.scenePath;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public readonly scenePath:string;
	}
}
