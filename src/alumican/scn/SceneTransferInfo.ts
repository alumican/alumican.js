/// <reference path='../index.ts' />

namespace scn {

	export class SceneTransferInfo {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(transferId:number, departurePath:string, destinationPath:string, message:any = null) {
			this.transferId = transferId;
			this.departurePath = departurePath;
			this.destinationPath = destinationPath;
			this.message = message;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public getTransferId():number {
			return this.transferId;
		}

		public getDeparturePath():string {
			return this.departurePath;
		}

		public getDestinationPath():string {
			return this.destinationPath;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public message:any;

		private transferId:number;
		private departurePath:string;
		private destinationPath:string;
	}
}
