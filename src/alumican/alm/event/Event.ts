/// <reference path='../../include.ts' />

namespace alm.event {

	export class Event<T = any> {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(type:string, target:Object, data:T = null) {
			this.type = type;
			this.target = target;
			this.data = data;
		}

		public getType():string {
			return this.type;
		}

		public getTarget():Object {
			return this.target;
		}

		public getData():T {
			return this.data;
		}

		public setData(data:T):void {
			this.data = data;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private type:string;
		private target:Object;
		private data:T;
	}
}