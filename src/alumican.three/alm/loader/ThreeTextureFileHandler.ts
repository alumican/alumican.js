/// <reference path='../../include.ts' />

namespace alm.loader {

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
			return ThreeTextureFileHandler.TYPE;
		}

		public load(url:string, onComplete:CompleteFunction, onError:ErrorFunction):void {
			const loader:THREE.TextureLoader = new THREE.TextureLoader();
			const texture:THREE.Texture = loader.load(
				url,
				(texture:THREE.Texture):void => {
					onComplete(texture);
				},
				(event:ProgressEvent):void => {
				},
				(event:ErrorEvent):void => {
					onError(event.type + ' : ' + event.message);
				}
			);
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public static TYPE:string = 'THREE.Texture';
	}
}