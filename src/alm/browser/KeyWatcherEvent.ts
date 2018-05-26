/// <reference path="../../reference.ts" />

namespace alm.browser {

	import Event = alm.event.Event;

	export class KeyWatcherEvent extends Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static KEY_UP:string = "keyUp";
		static KEY_DOWN:string = "keyDown";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any = null, jqueryEvent:JQuery.Event = null) {
			super(eventType, eventTarget);
			this.jqueryEvent = jqueryEvent;
			this.key = this.jqueryEvent.key;
			this.keyCode = this.jqueryEvent.keyCode;
			this.altKey = this.jqueryEvent.altKey;
			this.ctrlKey = this.jqueryEvent.ctrlKey;
			this.shiftKey = this.jqueryEvent.shiftKey;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():KeyWatcherEvent {
			return new KeyWatcherEvent(this.getType(), this.getTarget(), this.jqueryEvent);
		}

		public toString():string {
			return "[KeyWatcherEvent] type = " + this.getType() + ", key = " + this.key + ", keyCode = " + this.keyCode + ", altKey = " + this.altKey + ", ctrlKey = " + this.ctrlKey + ", shiftKey = " + this.shiftKey;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public jqueryEvent:JQuery.Event;
		public key:string;
		public keyCode:number;
		public altKey:boolean;
		public ctrlKey:boolean;
		public shiftKey:boolean;
	}
}