/// <reference path='../include.ts' />

namespace scn {

	export enum SceneState {
		Idling,
		Loading,
		Unloading,
		Arriving,
		Leaving,
		Ascending,
		Descending,
	}

	export function getSceneStateString(state:SceneState):string {
		switch (state) {
			case SceneState.Idling:
				return 'idling';
			case SceneState.Loading:
				return 'loading';
			case SceneState.Unloading:
				return 'unloading';
			case SceneState.Arriving:
				return 'arriving';
			case SceneState.Leaving:
				return 'leaving';
			case SceneState.Ascending:
				return 'ascending';
			case SceneState.Descending:
				return 'descending';
		}
		return '';
	}
}