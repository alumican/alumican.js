/// <reference path='../index.ts' />

namespace cmd {

	export class Return extends Command {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
			super();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implExecuteFunction(command:Command):void {
			const func:Function = this.getParent()['notifyReturn'];
			if (func) func();
			this.notifyComplete();
		}

		protected implInterruptFunction(command:Command):void {
		}

		protected implDestroyFunction(command:Command):void {
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------
	}
}
