/// <reference path='../../index.ts' />

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
				url
			).done((data:any, textStatus:string, jqXHR:object):void => {
				onComplete(data, { textStatus: textStatus, jqXHR: jqXHR});
			}).fail((jqXHR:object, textStatus:string, errorThrown:string):void => {
				onError({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
			});
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public static TYPE:string = 'jQuery.JSON';
	}
}
