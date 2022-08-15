/// <reference path='../index.ts' />

namespace cmd {

	import Event = alm.event.Event;
	import EventDispatcher = alm.event.EventDispatcher;

	export class Func extends Command {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(func:Function = null, args:any[] = [], eventDispatcher:EventDispatcher = null, eventType:string = null) {
			super();
			this.func = func;
			this.args = args;
			this.eventDispatcher = eventDispatcher;
			this.eventType = eventType;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implExecuteFunction(command:Command):void {
			if (this.eventDispatcher && this.eventType) {
				this.eventDispatcher.addEventListener(this.eventType, this.completeHandler);
				if (this.args) {
					this.func(...this.args);
				} else {
					this.func();
				}
			} else {
				if (this.args) {
					this.func(...this.args);
				} else {
					this.func();
				}
				this.notifyComplete();
			}
		}

		protected implInterruptFunction(command:Command):void {
			if (this.eventDispatcher && this.eventType) {
				this.eventDispatcher.removeEventListener(this.eventType, this.completeHandler);
			}
		}

		protected implDestroyFunction(command:Command):void {
			if (this.eventDispatcher && this.eventType) {
				this.eventDispatcher.removeEventListener(this.eventType, this.completeHandler);
			}

			this.func = null;
			this.args = null;
			this.eventDispatcher = null;
			this.eventType = null;
		}

		private completeHandler = (event:Event):void => {
			this.notifyComplete();
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public getFunction():Function { return this.func; }
		public setFunction(func:Function):void { this.func = func; }
		private func:Function;

		public getArguments():any[] { return this.args; }
		public setArguments(args:any[]):void { this.args = args; }
		private args:any[];

		public getEventDispatcher():EventDispatcher { return this.eventDispatcher; }
		public setEventDispatcher(eventDispatcher:EventDispatcher):void { this.eventDispatcher = eventDispatcher; }
		private eventDispatcher:EventDispatcher;

		public getEventType():string { return this.eventType; }
		public setEventType(eventType:string):void { this.eventType = eventType; }
		private eventType:string;
	}
}
