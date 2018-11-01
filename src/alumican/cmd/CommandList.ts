/// <reference path='../include.ts' />

namespace cmd {

	export abstract class CommandList extends Command {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(...commands:(Command|Function)[]) {
			super();
			this.commands = [];
			this.addCommand(...commands);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public addCommand(...commands:(Command|Function)[]):void {
			if (commands.length > 0) {
				this.preProcess(commands);
				this.commands = this.getCommands().concat(<Command[]>commands);
			}
		}

		public insertCommand(...commands:(Command|Function)[]):void {
			this.insertCommandAt(0, ...commands);
		}

		protected insertCommandAt(index:number, ...commands:(Command|Function)[]):void {
			if (commands.length > 0) {
				this.preProcess(commands);
				Array.prototype.splice.apply(this.getCommands(), (<any[]>[index, 0]).concat(commands));
			}
		}

		public addCommandArray(commands:(Command|Function)[]):void {
			this.addCommand(...commands);
		}

		public insertCommandArray(commands:(Command|Function)[]):void {
			this.insertCommand(...commands);
		}

		protected insertCommandArrayAt(index:number, commands:(Command|Function)[]):void {
			this.insertCommandAt(index, ...commands);
		}

		public getLength():number {
			return this.commands.length;
		}

		public getCommandByIndex(index:number):Command { return this.commands[index]; }
		public getCommands():Command[] { return this.commands; }

		private preProcess(commands:(Command|Function)[]):void {
			const numCommands:number = commands.length;
			let command:Command|Function;
			for (let i:number = 0; i < numCommands; ++i) {
				command = commands[i];
				if (typeof(command) == 'function') commands[i] = command = new Func(command);
				command.setParent(this);
			}
		}

		protected implExecuteFunction(command:Command):void {
			this.notifyComplete();
		}

		protected implInterruptFunction(command:Command):void {
		}

		protected implDestroyFunction(command:Command):void {
		}

		protected abstract implNotifyBreak():void;
		protected abstract implNotifyReturn():void;





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private commands:Command[];
	}
}