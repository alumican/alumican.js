/// <reference path='../../include.ts' />

namespace alm.util {

	export class PagerEvent<T = string> extends alm.event.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static CHANGE:string = 'change';
		public static PREV:string = 'prev';
		public static NEXT:string = 'next';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:any, newItemIndex:number, oldItemIndex:number, newItemId:T, oldItemId:T, useTransition:boolean) {
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

		public clone():PagerEvent<T> {
			return new PagerEvent<T>(this.getType(), this.getTarget(), this.newItemIndex, this.oldItemIndex, this.newItemId, this.oldItemId, this.useTransition);
		}

		public toString():string {
			return '[PagerEvent] type = ' + this.getType() + ', ' + this.oldItemIndex + ' -> ' + this.newItemIndex + ', transition = ' + this.useTransition;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public newItemIndex:number;
		public oldItemIndex:number;
		public newItemId:T;
		public oldItemId:T;
		public useTransition:boolean;
	}
}