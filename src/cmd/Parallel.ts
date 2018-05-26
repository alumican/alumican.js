/// <reference path="../reference.ts" />

namespace cmd {

	import Event = alm.event.Event;

	export class Parallel extends CommandList {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(...commands:(Command|Function)[]) {
			super(...commands);
			this.completeCount = 0;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public addCommand(...commands:(Command|Function)[]):void {
			super.addCommand(...commands);
		}

		public insertCommand(...commands:(Command|Function)[]):void {
			this.addCommand(...commands);
		}

		public addCommandArray(commands:(Command|Function)[]):void {
			this.addCommand(...commands);
		}

		public insertCommandArray(commands:(Command|Function)[]):void {
			this.addCommand(...commands);
		}

		private completeHandler = (event:Event):void => {
			if (++this.completeCount >= this.getLength()) {
				this.notifyComplete();
			}
		};

		protected implExecuteFunction(command:Command):void {
			this.completeCount = 0;
			const length:number = this.getLength();
			if (length > 0) {
				const commands:Command[] = this.getCommands();
				let command:Command;
				for (let i:number = 0; i < length; ++i) {
					command = commands[i];
					command.addEventListener(CommandEvent.COMPLETE, this.completeHandler);
					command.execute();
				}
			} else {
				this.notifyComplete();
			}
		}

		protected implInterruptFunction(command:Command):void {
			const length:number = this.getLength();
			if (length > 0) {
				const commands:Command[] = this.getCommands();
				let command:Command;
				for (let i:number = 0; i < length; ++i) {
					command = commands[i];
					command.removeEventListener(CommandEvent.COMPLETE, this.completeHandler);
					command.interrupt();
				}
			}
			super.implInterruptFunction(command);
		}

		protected implDestroyFunction(command:Command):void {
			const length:number = this.getLength();
			if (length > 0) {
				const commands:Command[] = this.getCommands();
				let command:Command;
				for (let i:number = 0; i < length; ++i) {
					command = commands[i];
					command.removeEventListener(CommandEvent.COMPLETE, this.completeHandler);
					command.destroy();
				}
			}
			super.implDestroyFunction(command);
		}

		protected implNotifyBreak():void {
			const length:number = this.getLength();
			if (length > 0) {
				const commands:Command[] = this.getCommands();
				let command:Command;
				for (let i:number = 0; i < length; ++i) {
					command = commands[i];
					if (command.getState() == CommandState.Executing) {
						command.removeEventListener(CommandEvent.COMPLETE, this.completeHandler);
						command.interrupt();
					}
				}
			}
			this.notifyComplete();
		}

		protected implNotifyReturn():void {
			const length:number = this.getLength();
			if (length > 0) {
				const commands:Command[] = this.getCommands();
				let command:Command;
				for (let i:number = 0; i < length; ++i) {
					command = commands[i];
					if (command.getState() == CommandState.Executing) {
						command.removeEventListener(CommandEvent.COMPLETE, this.completeHandler);
						command.interrupt();
					}
				}
			}
			const func:Function = this.getParent()["notifyReturn"];
			if (func) func();
			this.destroy();
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		protected getCompleteCount():number { return this.completeCount; }
		private completeCount:number;

		private currentCommand:Command;
		private isPaused:boolean;
		private isCompleteOnPaused:boolean;
	}
}