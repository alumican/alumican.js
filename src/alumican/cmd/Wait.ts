/// <reference path='../index.ts' />

namespace cmd {

	export class Wait extends Command {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(time:number = 1000) {
			super();
			this.time = time;
			this.timerId = -1;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implExecuteFunction(command:Command):void {
			this.timerId = window.setTimeout(this.completeHandler, this.time);
		}

		protected implInterruptFunction(command:Command):void {
			this.cancel();
		}

		protected implDestroyFunction(command:Command):void {
			this.cancel();
		}

		private cancel():void {
			if (this.timerId != -1) {
				clearTimeout(this.timerId);
				this.timerId = -1;
			}
		}

		private completeHandler = ():void => {
			this.notifyComplete();
		};





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public getTime():number { return this.time; }
		public setTime(time:number):void { this.time = time; }
		private time:number;

		private timerId:number;
	}
}
