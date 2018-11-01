/// <reference path="../../reference.ts" />

namespace alm.browser {

	export class KeyWatcherEvent extends alm.event.Event {

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

		constructor(eventType:string, eventTarget:any = null, originalEvent:KeyboardEvent = null) {
			super(eventType, eventTarget);
			this.originalEvent = originalEvent;
			this.key = this.originalEvent.key;
			this.keyCode = this.originalEvent.keyCode;
			this.altKey = this.originalEvent.altKey;
			this.ctrlKey = this.originalEvent.ctrlKey;
			this.shiftKey = this.originalEvent.shiftKey;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():KeyWatcherEvent {
			return new KeyWatcherEvent(this.getType(), this.getTarget(), this.originalEvent);
		}

		public toString():string {
			return "[KeyWatcherEvent] type = " + this.getType() + ", key = " + this.key + ", keyCode = " + this.keyCode + ", altKey = " + this.altKey + ", ctrlKey = " + this.ctrlKey + ", shiftKey = " + this.shiftKey;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public originalEvent:KeyboardEvent;
		public key:string;
		public keyCode:number;
		public altKey:boolean;
		public ctrlKey:boolean;
		public shiftKey:boolean;
	}
}