/// <reference path='../index.ts' />

namespace cmd {

	import Event = alm.event.Event;

	export class Serial extends CommandList {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(...commands:(Command|Function)[]) {
			super(...commands);
			this.currentCommand = null;
			this.position = -1;
			this.isPaused = false;
			this.isCompleteOnPaused = false;
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
			super.insertCommandAt(this.position + 1, ...commands);
		}

		public addCommandArray(commands:(Command|Function)[]):void {
			this.addCommand(...commands);
		}

		public insertCommandArray(commands:(Command|Function)[]):void {
			this.insertCommand(...commands);
		}

		private next():void {
			this.currentCommand = this.getCommandByIndex(this.position);
			this.currentCommand.addEventListener(CommandEvent.COMPLETE, this.completeHandler);
			this.currentCommand.execute();
		}

		private completeHandler = (event:Event):void => {
			this.currentCommand.removeEventListener(CommandEvent.COMPLETE, this.completeHandler);
			this.currentCommand = null;
			if (++this.position >= this.getLength()) {
				this.notifyComplete();
			} else {
				this.next();
			}
		};

		protected implExecuteFunction(command:Command):void {
			this.position = 0;
			if (this.getLength() > 0) {
				this.next();
			} else {
				this.notifyComplete();
			}
		}

		protected implInterruptFunction(command:Command):void {
			if (this.currentCommand) {
				this.currentCommand.removeEventListener(CommandEvent.COMPLETE, this.completeHandler);
				this.currentCommand.interrupt();
				this.currentCommand = null;
			}
			this.position = -1;
			super.implInterruptFunction(command);
		}

		protected implDestroyFunction(command:Command):void {
			if (this.currentCommand) {
				this.currentCommand.removeEventListener(CommandEvent.COMPLETE, this.completeHandler);
				this.currentCommand.destroy();
				this.currentCommand = null;
			}
			this.position = -1;
			this.isPaused = false;
			this.isCompleteOnPaused = false;
			super.implDestroyFunction(command);
		}

		protected implNotifyBreak():void {
			if (this.currentCommand.getState() == CommandState.Executing) {
				this.currentCommand.removeEventListener(CommandEvent.COMPLETE, this.completeHandler);
				this.currentCommand.interrupt();
			}
			this.notifyComplete();
		}

		protected implNotifyReturn():void {
			if (this.currentCommand.getState() == CommandState.Executing) {
				this.currentCommand.removeEventListener(CommandEvent.COMPLETE, this.completeHandler);
				this.currentCommand.interrupt();
			}
			const func:Function = this.getParent()['notifyReturn'];
			if (func) func();
			this.destroy();
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		protected getPosition():number { return this.position; }
		private position:number;

		private currentCommand:Command;
		private isPaused:boolean;
		private isCompleteOnPaused:boolean;
	}
}
