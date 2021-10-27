/// <reference path='../../index.ts' />

namespace alm.io {

	export class JQueryTextFileHandler implements IFileHandler {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(headers:any = null) {
			this.headers = headers;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public getType():string {
			return JQueryTextFileHandler.TYPE;
		}

		public load(url:string, onComplete:CompleteFunction, onError:ErrorFunction):void {
			jQuery.ajax({
				url: url,
				type: 'GET',
				dataType: 'text',
				headers: this.headers,
			}).then(
				(data:any, textStatus:string, jqXHR:object):void => {
					onComplete(data, { textStatus: textStatus, jqXHR: jqXHR });
				},
				(jqXHR:object, textStatus:string, errorThrown:string):void => {
					onError({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
				}
			);
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public static TYPE:string = 'jQuery.TEXT';

		private headers:any;
	}
}
