/// <reference path='../include.ts' />

namespace cmd {

	export class Break extends Command {

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
			const func:Function = this.getParent()['notifyBreak'];
			if (func) func();
			this.notifyComplete();
		}

		protected implInterruptFunction(command:Command):void {
		}

		protected implDestroyFunction(command:Command):void {
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------
	}
}