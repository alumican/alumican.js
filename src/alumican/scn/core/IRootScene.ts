/// <reference path='../../index.ts' />

namespace scn.core {

	export interface IRootScene {

		new (manager:SceneManager):RootScene;
		getManager():SceneManager;
	}
}
