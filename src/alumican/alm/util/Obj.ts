/// <reference path='../../include.ts' />

namespace alm.util {

	export class Obj {

		public static each(target:any, func:(key:string, value:any) => void):void {
			if (target == null) return;
			Object.keys(target).forEach((key:string):void => {
				func(key, target[key]);
			});
		}

		private constructor() {}
	}
}