/// <reference path='../../include.ts' />

namespace alm.loader {

	export interface IFileHandler {

		getType():string;
		load(url:string, onComplete:CompleteFunction, onError:ErrorFunction):void;
	}
}