/// <reference path="../../reference.ts" />

namespace alm.util {

	export class PagerEvent extends alm.event.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static CHANGE:string = "change";
		public static PREV:string = "prev";
		public static NEXT:string = "next";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any, newItemIndex:number, oldItemIndex:number, newItemId:string, oldItemId:string, useTransition:boolean) {
			super(eventType, eventTarget);
			this.newItemIndex = newItemIndex;
			this.oldItemIndex = oldItemIndex;
			this.newItemId = newItemId;
			this.oldItemId = oldItemId;
			this.useTransition = useTransition;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():PagerEvent {
			return new PagerEvent(this.getType(), this.getTarget(), this.newItemIndex, this.oldItemIndex, this.newItemId, this.oldItemId, this.useTransition);
		}

		public toString():string {
			return "[PagerEvent] type = " + this.getType() + ", " + this.oldItemIndex + " -> " + this.newItemIndex + ", transition = " + this.useTransition;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public newItemIndex:number;
		public oldItemIndex:number;
		public newItemId:string;
		public oldItemId:string;
		public useTransition:boolean;
	}
}