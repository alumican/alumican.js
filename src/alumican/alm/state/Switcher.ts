/// <reference path='../../index.ts' />

namespace alm.state {

	import Hash = alm.util.Hash;

	export class Switcher<T = string> extends alm.event.EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
			super();

			this.isLoopEnabled = true;

			this.itemCount = 0;
			this.itemIds = null;
			this.itemIndexById = null;

			this.onChange = null;
			this.onPrev = null;
			this.onNext = null;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public setupById(ids:T[]):void {
			this.itemCount = ids.length;
			this.itemIds = ids;

			this.itemIndexById = {};
			for (let i:number = 0; i < this.itemCount; ++i) {
				this.itemIndexById[this.itemIds[i] as unknown as string] = i;
			}

			this.setup();
		}

		public setupByCount(itemCount:number):void {
			this.itemCount = itemCount;

			this.itemIds = null;
			this.itemIndexById = null;

			this.setup();
		}

		private setup():void {
			this.currentItemIndex = -1;
			this.currentItemId = null;

			this.oldItemIndex = -1;
			this.oldItemId = null;
		}

		public gotoByIndex(itemIndex:number, useTransition:boolean = true):boolean {
			if (itemIndex < 0 || itemIndex >= this.itemCount) itemIndex = -1;
			if (itemIndex == this.currentItemIndex) return false;

			this.oldItemIndex = this.currentItemIndex;
			this.currentItemIndex = itemIndex;

			if (this.itemIds) {
				this.oldItemId = this.oldItemIndex != -1 ? this.itemIds[this.oldItemIndex] : null;
				this.currentItemId = this.currentItemIndex != -1 ? this.itemIds[this.currentItemIndex] : null;
			}

			this.dispatchPagerEvent(SwitcherEvent.CHANGE, this.onChange, useTransition);

			return true;
		}

		public gotoById(itemId:string, useTransition:boolean = true):boolean {
			const itemIndex:number = this.itemIndexById.hasOwnProperty(itemId) ? this.itemIndexById[itemId] : -1;
			return this.gotoByIndex(itemIndex, useTransition);
		}

		public prev(useTransition:boolean = true):boolean {
			let itemIndex = this.getPrevItemIndex();

			const result:boolean = this.gotoByIndex(itemIndex, useTransition);
			if (result) {
				this.dispatchPagerEvent(SwitcherEvent.PREV, this.onPrev, useTransition);
			}

			return result;
		}

		public next(useTransition:boolean = true):boolean {
			let itemIndex = this.getNextItemIndex();

			const result:boolean = this.gotoByIndex(itemIndex, useTransition);
			if (result) {
				this.dispatchPagerEvent(SwitcherEvent.NEXT, this.onNext, useTransition);
			}

			return result;
		}

		public getPrevItemIndex():number {
			let itemIndex = this.currentItemIndex - 1;
			if (this.isLoopEnabled && itemIndex < 0) itemIndex = this.itemCount - 1;
			return itemIndex;
		}

		public getPrevItemId():T {
			return this.itemIds[this.getPrevItemIndex()];
		}

		public getNextItemIndex():number {
			let itemIndex = this.currentItemIndex + 1;
			if (this.isLoopEnabled && itemIndex >= this.itemCount) itemIndex = 0;
			return itemIndex;
		}

		public getNextItemId():T {
			return this.itemIds[this.getNextItemIndex()];
		}

		private dispatchPagerEvent(eventType:string, callback:(event:SwitcherEvent<T>) => void, useTransition:boolean):void {
			const event:SwitcherEvent<T> = new SwitcherEvent<T>(eventType, this, this.currentItemIndex, this.oldItemIndex, this.currentItemId, this.oldItemId, useTransition);
			if (callback) {
				callback(event);
			}
			this.dispatchEvent(event);
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		public getIsLoopEnabled():boolean { return this.isLoopEnabled; }
		public setIsLoopEnabled(value:boolean):void { this.isLoopEnabled = value; }
		private isLoopEnabled:boolean;

		public getItemCount():number { return this.itemCount; }
		private itemCount:number;

		public getCurrentItemIndex():number { return this.currentItemIndex; }
		private currentItemIndex:number;

		public getOldItemIndex():number { return this.oldItemIndex; }
		private oldItemIndex:number;

		public getCurrentItemId():T { return this.currentItemId; }
		private currentItemId:T;

		public getOldItemId():T { return this.oldItemId; }
		private oldItemId:T;

		public getItemIds():T[] { return this.itemIds; }
		private itemIds:T[];

		private itemIndexById:Hash<number>;

		public onChange:(event:SwitcherEvent<T>) => void;
		public onPrev:(event:SwitcherEvent<T>) => void;
		public onNext:(event:SwitcherEvent<T>) => void;
	}
}
