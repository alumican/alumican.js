/// <reference path='../../include.ts' />

namespace alm.event {

	export class Event {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(type:string, target:Object, data:any = null) {
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

		public getData():any {
			return this.data;
		}

		public setData(data:any):void {
			this.data = data;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private type:string;
		private target:Object;
		private data:any;
	}
}