/// <reference path='../include.ts' />

namespace cmd {

	import Event = alm.event.Event;
	import EventDispatcher = alm.event.EventDispatcher;

	export class Listen extends Command {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventDispatcher:EventDispatcher = null, eventType:string = null) {
			super();
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

			this.eventType = null;
			this.eventDispatcher = null;
		}

		private completeHandler = (event:Event):void => {
			this.notifyComplete();
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public getEventDispatcher():EventDispatcher { return this.eventDispatcher; }
		public setEventDispatcher(eventDispatcher:EventDispatcher):void { this.eventDispatcher = eventDispatcher; }
		private eventDispatcher:EventDispatcher;

		public getEventType():string { return this.eventType; }
		public setEventType(eventType:string):void { this.eventType = eventType; }
		private eventType:string;
	}
}