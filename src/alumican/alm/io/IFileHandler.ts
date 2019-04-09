/// <reference path='../../include.ts' />

namespace alm.io {

	export interface IFileHandler {

		getType():string;
		load(url:string, onComplete:CompleteFunction, onError:ErrorFunction):void;
	}
}