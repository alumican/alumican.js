/// <reference path='../../include.ts' />

namespace alm.util {

	export class Pager<T = string> extends alm.event.EventDispatcher {

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
			this.newItemIndex = -1;
			this.oldItemIndex = -1;

			this.newItemId = null;
			this.oldItemId = null;
		}

		public gotoByIndex(itemIndex:number, useTransition:boolean = true):boolean {
			if (itemIndex < 0 || itemIndex >= this.itemCount) itemIndex = -1;
			if (itemIndex == this.newItemIndex) return false;

			this.oldItemIndex = this.newItemIndex;
			this.newItemIndex = itemIndex;

			if (this.itemIds) {
				this.oldItemId = this.oldItemIndex != -1 ? this.itemIds[this.oldItemIndex] : null;
				this.newItemId = this.newItemIndex != -1 ? this.itemIds[this.newItemIndex] : null;
			}

			this.dispatchPagerEvent(PagerEvent.CHANGE, this.onChange, useTransition);

			return true;
		}

		public gotoById(itemId:string, useTransition:boolean = true):boolean {
			const itemIndex:number = this.itemIndexById.hasOwnProperty(itemId) ? this.itemIndexById[itemId] : -1;
			return this.gotoByIndex(itemIndex, useTransition);
		}

		public prev(useTransition:boolean = true):boolean {
			let itemIndex = this.newItemIndex - 1;
			if (this.isLoopEnabled && itemIndex < 0) itemIndex = this.itemCount - 1;

			const result:boolean = this.gotoByIndex(itemIndex, useTransition);
			if (result) {
				this.dispatchPagerEvent(PagerEvent.PREV, this.onPrev, useTransition);
			}

			return result;
		}

		public next(useTransition:boolean = true):boolean {
			let itemIndex = this.newItemIndex + 1;
			if (this.isLoopEnabled && itemIndex >= this.itemCount) itemIndex = 0;

			const result:boolean = this.gotoByIndex(itemIndex, useTransition);
			if (result) {
				this.dispatchPagerEvent(PagerEvent.NEXT, this.onNext, useTransition);
			}

			return result;
		}

		private dispatchPagerEvent(eventType:string, callback:(event:PagerEvent<T>) => void, useTransition:boolean):void {
			const oldItemId:T = (this.itemIds && this.oldItemIndex != -1) ? this.itemIds[this.oldItemIndex] : null;
			const newItemId:T = (this.itemIds && this.newItemIndex != -1) ? this.itemIds[this.newItemIndex] : null;

			const event:PagerEvent<T> = new PagerEvent<T>(eventType, this, this.newItemIndex, this.oldItemIndex, this.newItemId, this.oldItemId, useTransition);
			if (callback) {
				callback(event);
			}
			this.dispatchEvent(event);
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public getIsLoopEnabled():boolean { return this.isLoopEnabled; }
		public setIsLoopEnabled(value:boolean):void { this.isLoopEnabled = value; }
		private isLoopEnabled:boolean;

		public getNewItemIndex():number { return this.newItemIndex; }
		private newItemIndex:number;

		public getOldItemIndex():number { return this.oldItemIndex; }
		private oldItemIndex:number;

		public getItemCount():number { return this.itemCount; }
		private itemCount:number;

		public getNewItemId():T { return this.newItemId; }
		private newItemId:T;

		public getOldItemId():T { return this.oldItemId; }
		private oldItemId:T;

		public getItemIds():T[] { return this.itemIds; }
		private itemIds:T[];

		private itemIndexById:Hash<number>;

		public onChange:(event:PagerEvent<T>) => void;
		public onPrev:(event:PagerEvent<T>) => void;
		public onNext:(event:PagerEvent<T>) => void;
	}
}