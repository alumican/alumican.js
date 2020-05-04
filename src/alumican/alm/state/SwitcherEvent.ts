/// <reference path='../../index.ts' />

namespace alm.state {

	export class SwitcherEvent<T = string> extends alm.event.Event {

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

		constructor(eventType:string, eventTarget:any, currentItemIndex:number, prevItemIndex:number, currentItemId:T, prevItemId:T, useTransition:boolean) {
			super(eventType, eventTarget);
			this.currentItemIndex = currentItemIndex;
			this.prevItemIndex = prevItemIndex;
			this.currentItemId = currentItemId;
			this.prevItemId = prevItemId;
			this.useTransition = useTransition;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():SwitcherEvent<T> {
			return new SwitcherEvent<T>(this.getType(), this.getTarget(), this.currentItemIndex, this.prevItemIndex, this.currentItemId, this.prevItemId, this.useTransition);
		}

		public toString():string {
			return '[SwitcherEvent] type = ' + this.getType() + ', ' + this.prevItemIndex + ' -> ' + this.currentItemIndex + ', transition = ' + this.useTransition;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public readonly currentItemIndex:number;
		public readonly prevItemIndex:number;
		public readonly currentItemId:T;
		public readonly prevItemId:T;
		public readonly useTransition:boolean;
	}
}
