/// <reference path='../../index.ts' />

namespace alm.util {

	export class GoogleMapsUtil {

		public static loadScript(apiKey:string):Promise<void> {
			return new Promise((resolve:() => void, reject:() => void) => {
				const callbackName = 'googleMapsScriptInitializedHandler_' + (new Date()).getTime();

				window[callbackName] = ():void => {
					delete window[callbackName];
					resolve();
				};

				const script = document.createElement('script');
				script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=' + callbackName;
				script.setAttribute('async', <any>true);
				script.setAttribute('defer', <any>true);
				document.body.appendChild(script);
			});
		}





		private constructor() {
		}
	}
}
