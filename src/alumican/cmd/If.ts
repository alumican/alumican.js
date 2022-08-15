/// <reference path='../index.ts' />

namespace cmd {

	export type Condition = boolean | Function;

	export class If extends Command {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(condition:Condition = false, then:Command = null, reject:Command = null) {
			super();
			this.condition = condition;
			this.then = then;
			this.reject = reject;
			this.selectedCommand = null;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implExecuteFunction(command:Command):void {
			let result:boolean;
			if (typeof this.condition === 'function') {
				result = this.condition();
			} else {
				result = this.condition;
			}

			if (result) {
				if (this.then) {
					this.selectedCommand = this.then;
				}
			} else {
				if (this.reject) {
					this.selectedCommand = this.reject;
				}
			}

			if (this.selectedCommand) {
				this.selectedCommand.addEventListener(CommandEvent.complete, this.completeHandler);
				this.selectedCommand.execute();
			} else {
				this.notifyComplete();
			}
		}

		protected implInterruptFunction(command:Command):void {
			if (this.selectedCommand) {
				this.selectedCommand.removeEventListener(CommandEvent.complete, this.completeHandler);
				this.selectedCommand.interrupt();
				this.selectedCommand = null;
			}
		}

		protected implDestroyFunction(command:Command):void {
			if (this.selectedCommand) {
				this.selectedCommand.removeEventListener(CommandEvent.complete, this.completeHandler);
				this.selectedCommand.destroy();
				this.selectedCommand = null;
			}

			this.condition = null;
			this.then = null;
			this.reject = null;
		}

		private completeHandler = (event:CommandEvent):void => {
			this.selectedCommand.removeEventListener(CommandEvent.complete, this.completeHandler);
			this.selectedCommand = null;
			this.notifyComplete();
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public getCondition():Condition { return this.condition; }
		public setCondition(condition:Condition):void { this.condition = condition; }
		private condition:Condition;

		public getThen():Command { return this.then; }
		public setThen(then:Command):void { this.then = then; }
		private then:Command;

		public getReject():Command { return this.reject; }
		public setReject(reject:Command):void { this.reject = reject; }
		private reject:Command;

		private selectedCommand:Command;
	}
}
