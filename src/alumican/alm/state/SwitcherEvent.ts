/// <reference path='../../index.ts' />

namespace alm.state {

	export class SwitcherEvent<T = string> extends alm.event.Event<Switcher<T>> {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static readonly change:string = 'SwitcherEvent.change';
		public static readonly prev:string = 'SwitcherEvent.prev';
		public static readonly next:string = 'SwitcherEvent.next';





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, eventTarget:Switcher<T>, currentItemIndex:number, oldItemIndex:number, currentItemId:T, oldItemId:T, useTransition:boolean) {
			super(eventType, eventTarget);
			this.currentItemIndex = currentItemIndex;
			this.oldItemIndex = oldItemIndex;
			this.currentItemId = currentItemId;
			this.oldItemId = oldItemId;
			this.useTransition = useTransition;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():SwitcherEvent<T> {
			return new SwitcherEvent<T>(this.type, this.target, this.currentItemIndex, this.oldItemIndex, this.currentItemId, this.oldItemId, this.useTransition);
		}

		public toString():string {
			return '[SwitcherEvent] type = ' + this.type + ', ' + this.oldItemIndex + ' -> ' + this.currentItemIndex + ', transition = ' + this.useTransition;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public readonly currentItemIndex:number;
		public readonly oldItemIndex:number;
		public readonly currentItemId:T;
		public readonly oldItemId:T;
		public readonly useTransition:boolean;
	}
}
