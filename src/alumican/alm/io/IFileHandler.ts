/// <reference path='../../index.ts' />

namespace alm.io {

	export interface IFileHandler {

		getType():string;
		load(url:string, onComplete:CompleteFunction, onError:ErrorFunction):void;
	}
}
