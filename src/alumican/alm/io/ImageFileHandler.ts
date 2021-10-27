/// <reference path='../../index.ts' />

namespace alm.io {

	import IFileHandler = alm.io.IFileHandler;
	import CompleteFunction = alm.io.CompleteFunction;
	import ErrorFunction = alm.io.ErrorFunction;

	export class ImageFileHandler implements IFileHandler {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(crossOrigin:string = null) {
			this.crossOrigin = crossOrigin;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public getType():string {
			return ImageFileHandler.TYPE;
		}

		public load(url:string, onComplete:CompleteFunction, onError:ErrorFunction):void {
			const image = new Image();
			image.crossOrigin = this.crossOrigin;
			image.src = url;
			image.onabort = ():void => {
				onError('load abort : ' + url);
			};
			image.onerror = ():void => {
				onError('load error : ' + url);
			};
			image.onload = ():void => {
				onComplete(image);
			};
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private crossOrigin:string;

		public static TYPE:string = 'image';
	}
}
