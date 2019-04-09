/// <reference path='../../include.ts' />

namespace alm.io {

	export class JQueryJsonFileHandler implements IFileHandler {

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
			return JQueryJsonFileHandler.TYPE;
		}

		public load(url:string, onComplete:CompleteFunction, onError:ErrorFunction):void {
			jQuery.getJSON(
				url,
				(data:any):void => {
					onComplete(data);
				}
			);
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public static TYPE:string = 'jQuery.JSON';
	}
}