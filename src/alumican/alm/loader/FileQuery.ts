/// <reference path='../../include.ts' />

namespace alm.loader {

	export class FileQuery {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
			this.isLoading = false;
			this.isLoadComplete = false;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public id:string;
		public type:string;
		public url:string;
		public param:any;
		public content:any;
		public isLoading:boolean;
		public isLoadComplete:boolean;
	}
}