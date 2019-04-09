/// <reference path='../../include.ts' />

namespace alm.resource {

	export class ObjectPool<T> {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		/**
		 * ObjectPool class.
		 * @class
		 * @param {function} onRequireItem This callback function is called when new item is required.
		 * @param {function} onDestroyItem This callback function is called when item is disposed.
		 * @param {number} initCount Init item count.
		 * @param {number} growthCount Growth item count.
		 *
		 * @property {number} initCount Init item count.
		 * @property {number} growthCount Growth item count.
		 * @property {function} onRequireItem This callback function is called when new item is required.
		 * @property {function} onDestroyItem This callback function is called when item is disposed.
		 * @property {Array} items Array of items.
		 * @property {number} index Current index of items.
		 *
		 * @return void
		 */
		constructor(onRequireItem:() => T, onDestroyItem:(item:T) => void, initCount:number = 100, growthCount:number = 50) {
			this.onRequireItem = onRequireItem;
			this.onDestroyItem = onDestroyItem;
			this.growthCount = growthCount;
			this.items = new Array(initCount);
			for (let i = 0; i < initCount; ++i) {
				this.items[i] = this.onRequireItem();
			}
			this.index = initCount;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		/**
		 * Get item from object pool.
		 * @return {T} Item
		 */
		public getItem():T {
			if (this.index > 0) {
				return this.items[--this.index];
			}
			for (let i = 0; i < this.growthCount; ++i) {
				this.items.unshift(this.onRequireItem());
			}
			this.index = this.growthCount;
			return this.getItem();
		}

		/**
		 * Return item to object pool.
		 * @param {T} Item.
		 * @return void
		 */
		public returnItem(item:T):void {
			this.items[this.index++] = item;
		}

		/**
		 * Optimize object pool size.
		 * @return void
		 */
		public reduce():void {
			const n = this.index;
			for (let i = 0; i < n; ++i) {
				this.onDestroyItem(this.items.shift());
			}
			this.index = 0;
		}

		/**
		 * Destroy object pool.
		 * @return void
		 */
		public destroy():void {
			const n = this.items.length;
			for (let i = 0; i < n; ++i) {
				this.onDestroyItem(this.items[i]);
			}
			this.index = 0;
			this.items = null;
			this.onRequireItem = null;
			this.onDestroyItem = null;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private items:T[];
		private index:number;
		private growthCount:number;

		public onRequireItem:() => T;
		public onDestroyItem:(item:T) => void;
	}
}
