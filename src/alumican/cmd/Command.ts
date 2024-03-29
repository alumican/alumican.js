/// <reference path='../index.ts' />

namespace cmd {

	import EventDispatcher = alm.event.EventDispatcher;

	export class Command extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(executeFunction:Function = null, interruptFunction:Function = null, destroyFunction:Function = null) {
			super();

			this.setExecuteFunction(executeFunction);
			this.setInterruptFunction(interruptFunction);
			this.setDestroyFunction(destroyFunction);

			this.state = CommandState.sleeping;
			this.self = this;
			this.parent = null;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public execute():void {
			if (this.state > CommandState.sleeping) {
				throw new Error('[Command.execute] + Command is already executing.');
			}
			this.state = CommandState.executing;
			this.getExecuteFunction().call(this, this);
		}

		public interrupt():void {
			if (this.state == CommandState.executing) {
				this.state = CommandState.interrupting;
				this.getInterruptFunction().call(this, this);
			}
		}

		public destroy():void {
			this.state = CommandState.sleeping;
			this.getDestroyFunction().call(this, this);
			this.parent = null;
			this.executeFunction = null;
			this.interruptFunction = null;
			this.destroyFunction = null;
		}

		protected notifyComplete():void {
			switch (this.state) {
				case CommandState.sleeping:
					break;
				case CommandState.executing:
					this.dispatchEvent(new CommandEvent(CommandEvent.complete, this));
					this.destroy();
					break;
				case CommandState.interrupting:
					this.dispatchEvent(new CommandEvent(CommandEvent.complete, this));
					this.destroy();
					break;
			}
		}

		protected implExecuteFunction(command:Command):void {
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

		public getExecuteFunction():Function { return this.executeFunction || this.implExecuteFunction };
		public setExecuteFunction(func:Function):void { this.executeFunction = func; }
		private executeFunction:Function;

		public getInterruptFunction():Function { return this.interruptFunction || this.implInterruptFunction };
		public setInterruptFunction(func:Function):void { this.interruptFunction = func; }
		private interruptFunction:Function;

		public getDestroyFunction():Function { return this.destroyFunction || this.implDestroyFunction };
		public setDestroyFunction(func:Function):void { this.destroyFunction = func; }
		private destroyFunction:Function;

		public getState():CommandState { return this.state; }
		private state:CommandState;

		public getParent():Command { return this.parent; }
		public setParent(parent:Command):void { this.parent = parent; }
		private parent:Command;

		public getSelf():Command { return this.self; }
		private self:Command;
	}
}
