/// <reference path='../index.ts' />

namespace scn {

	export enum SceneState {
		idling,
		loading,
		unloading,
		arriving,
		leaving,
		ascending,
		descending,
	}

	export function getSceneStateString(state:SceneState):string {
		switch (state) {
			case SceneState.idling:
				return 'idling';
			case SceneState.loading:
				return 'loading';
			case SceneState.unloading:
				return 'unloading';
			case SceneState.arriving:
				return 'arriving';
			case SceneState.leaving:
				return 'leaving';
			case SceneState.ascending:
				return 'ascending';
			case SceneState.descending:
				return 'descending';
		}
		return '';
	}
}
