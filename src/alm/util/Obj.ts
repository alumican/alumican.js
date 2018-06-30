/// <reference path="../../reference.ts" />

namespace alm.util {

	export class Obj {

		public static each(target:any, func:(element:any) => void):void {
			Object.keys(target).forEach(func);
		}

		private constructor() {}
	}
}