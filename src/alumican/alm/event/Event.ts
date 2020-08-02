/// <reference path='../../index.ts' />

namespace alm.event {

	export class Event<Target = object, Data = any> {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(type:string, target:Target, data:Data = null) {
			this.type = type;
			this.target = target;
			this.data = data;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public readonly type:string;
		public readonly target:Target;
		public readonly data:Data;
	}
}
