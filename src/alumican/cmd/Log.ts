/// <reference path='../include.ts' />

namespace cmd {

	export class Log extends Command {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(...messages:any[]) {
			super();
			this.messages = messages;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implExecuteFunction(command:Command):void {
			console.log.apply(console, Array.prototype.slice.call(this.messages));
			this.notifyComplete();
		}

		protected implInterruptFunction(command:Command):void {
		}

		protected implDestroyFunction(command:Command):void {
			this.messages = null;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public getMessages():any[] { return this.messages; }
		public setMessages(messages:any[]):void { this.messages = messages; }
		private messages:any[];
	}
}