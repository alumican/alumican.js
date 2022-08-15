/// <reference path='../../index.ts' />

namespace alm.io {

	export class JQueryJsonFileHandler implements IFileHandler {

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
			return JQueryJsonFileHandler.type;
		}

		public load(url:string, onComplete:CompleteFunction, onError:ErrorFunction):void {
			jQuery.ajax({
				url: url,
				type: 'GET',
				dataType:'json',
				headers: this.headers
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
		// MEMBER
		//
		// --------------------------------------------------

		public static type:string = 'jQuery.JSON';

		private headers:any;
	}
}
