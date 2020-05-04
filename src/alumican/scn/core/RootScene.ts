/// <reference path='../../index.ts' />

namespace scn.core {

	export class RootScene extends Scene {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(manager:SceneManager) {
			super('');
			this.manager = manager;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public getManager():SceneManager {
			return this.manager;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private manager:SceneManager;
	}
}
