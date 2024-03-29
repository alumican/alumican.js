/// <reference path='../../index.ts' />

namespace alm.io {

	export class ThreeTextureFileHandler implements IFileHandler {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public getType():string {
			return ThreeTextureFileHandler.type;
		}

		public load(url:string, onComplete:CompleteFunction, onError:ErrorFunction):void {
			const loader:THREE.TextureLoader = new THREE.TextureLoader();
			loader.crossOrigin = 'anonymous';
			const texture:THREE.Texture = loader.load(
				url,
				(texture:THREE.Texture):void => {
					onComplete(texture);
				},
				(event:ProgressEvent):void => {
				},
				(event:ErrorEvent):void => {
					onError(event);
				}
			);
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public static readonly type:string = 'THREE.Texture';
	}
}
