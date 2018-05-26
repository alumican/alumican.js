/// <reference path="../reference.ts" />

namespace scn {

	export class SceneTransferInfo {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(transferId:number, departurePath:string, destinationPath:string) {
			this.transferId = transferId;
			this.departurePath = departurePath;
			this.destinationPath = destinationPath;
			this.relay = null;
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
		// MEMBER
		//
		// --------------------------------------------------

		public relay:any;

		private transferId:number;
		private departurePath:string;
		private destinationPath:string;
	}
}