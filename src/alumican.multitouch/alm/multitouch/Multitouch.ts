/// <reference path="../../index.ts" />

namespace alm.multitouch {

	import Hash = alm.util.Hash;

	export class Multitouch extends EventTarget {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(startHitArea:HTMLElement | Window, moveEndHitArea:HTMLElement | Window = null) {
			super();

			this.startHitArea = startHitArea;
			this.moveEndHitArea = moveEndHitArea || window;
			this.isTouchEventEnabled = TouchUtil.getIsTouchEventSupported();
			this.touchingPointersByPointerId = {};
			this.touchingPointerIds = [];
			this.touchingCount = 0;

			console.debug('[Multitouch] touchEvent enabled :', this.isTouchEventEnabled);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public start():void {
			console.debug('[Multitouch] start');

			if (this.isTouchEventEnabled) {
				this.startHitArea.addEventListener('touchstart', this.hitAreaTouchStartHandler);
				this.moveEndHitArea.addEventListener('touchmove', this.hitAreaTouchMoveHandler);
				this.moveEndHitArea.addEventListener('touchend', this.hitAreaTouchEndHandler);
			} else {
				this.startHitArea.addEventListener('mousedown', this.hitAreaMouseDownHandler);
				this.moveEndHitArea.addEventListener('mousemove', this.hitAreaMouseMoveHandler);
				this.moveEndHitArea.addEventListener('mouseup', this.hitAreaMouseUpHandler);
			}
		}

		public stop():void {
			console.debug('[Multitouch] stop');

			if (this.isTouchEventEnabled) {
				this.startHitArea.removeEventListener('touchstart', this.hitAreaTouchStartHandler);
				this.moveEndHitArea.removeEventListener('touchmove', this.hitAreaTouchMoveHandler);
				this.moveEndHitArea.removeEventListener('touchend', this.hitAreaTouchEndHandler);
			} else {
				this.startHitArea.removeEventListener('mousedown', this.hitAreaMouseDownHandler);
				this.moveEndHitArea.removeEventListener('mousemove', this.hitAreaMouseMoveHandler);
				this.moveEndHitArea.removeEventListener('mouseup', this.hitAreaMouseUpHandler);
			}
		}

		public dispose():void {
			this.stop();
			this.startHitArea = null;
			this.moveEndHitArea = null;
			this.touchingPointersByPointerId = null;
			this.touchingPointerIds = null;
		}


		private hitAreaTouchStartHandler = (event:TouchEvent):void => {
			for (let pointerId in this.touchingPointersByPointerId) {
				const pointer = this.touchingPointersByPointerId[pointerId];
				pointer.isLastTouch = false;
				pointer.isLatestTouch = false;
			}

			const changedTouches = event.changedTouches;
			const changedTouchCount = changedTouches.length;
			for (let i = 0; i < changedTouchCount; ++i) {
				const touch = changedTouches.item(i);
				const pointer = this.getTouchPointer(touch);
				pointer.isTouching = true;

				const localPosition = TouchUtil.getLocalTouchPosition(touch, this.startHitArea);
				pointer.x = localPosition.offsetX;
				pointer.y = localPosition.offsetY;

				// last touch
				if (i === changedTouchCount - 1) {
					pointer.isLastTouch = true;
					pointer.isLatestTouch = true;
					pointer.latestStartTime = performance.now();
				}

				// 0 touching -> 1 touching
				if (!this.isTouching && (this.touchingCount === 1)) {
					pointer.isFirstTouch = true;
					pointer.isOldestTouch = true;
					pointer.oldestStartTime = performance.now();
				}

				this.isTouching = this.touchingCount > 0;

				this.dispatchDefaultEvent(MultitouchEventType.touchStart, pointer);
			}
		};

		private hitAreaTouchMoveHandler = (event:TouchEvent):void => {
			if (this.touchingCount === 0) return;

			const changedTouches = event.changedTouches;
			const changedTouchCount = changedTouches.length;
			for (let i = 0; i < changedTouchCount; ++i) {
				const touch = changedTouches.item(i);
				const pointer = this.getTouchPointer(touch);
				pointer.isTouching = true;

				const localPosition = TouchUtil.getLocalTouchPosition(touch, this.startHitArea);
				pointer.x = localPosition.offsetX;
				pointer.y = localPosition.offsetY;

				this.dispatchDefaultEvent(MultitouchEventType.touchMove, pointer);
			}
		};

		private hitAreaTouchEndHandler = (event:TouchEvent):void => {
			if (this.touchingCount === 0) return;

			const changedTouches = event.changedTouches;
			const changedTouchCount = changedTouches.length;
			for (let i = 0; i < changedTouchCount; ++i) {
				const touch = changedTouches.item(i);
				const pointer = this.getTouchPointer(touch);
				pointer.isTouching = false;
				pointer.isOldestTouch = false;
				pointer.isLatestTouch = false;

				const localPosition = TouchUtil.getLocalTouchPosition(touch, this.startHitArea);
				pointer.x = localPosition.offsetX;
				pointer.y = localPosition.offsetY;

				const pointerIndex = this.touchingPointerIds.indexOf(pointer.pointerId);
				if (pointerIndex !== -1) {
					this.touchingPointerIds.splice(pointerIndex, 1);
					this.touchingCount = this.touchingPointerIds.length;
				}
				delete this.touchingPointersByPointerId[pointer.pointerId];
				this.isTouching = this.touchingCount > 0;

				this.dispatchDefaultEvent(MultitouchEventType.touchEnd, pointer);
			}

			{
				const pointer = this.getOldestPointer();
				if (pointer && !pointer.isOldestTouch) {
					pointer.isOldestTouch = true;
					pointer.oldestStartTime = performance.now();
				}
			}

			{
				const pointer = this.getLatestPointer();
				if (pointer && !pointer.isLatestTouch) {
					pointer.isLatestTouch = true;
					pointer.latestStartTime = performance.now();
				}
			}
		};

		private getTouchPointer(touch:Touch):MultitouchPointer {
			const touchId = touch.identifier;
			let pointer = this.touchingPointersByPointerId[touchId];
			if (!pointer) {
				pointer = this.touchingPointersByPointerId[touchId] = new MultitouchPointer(touchId);
				this.touchingPointerIds.push(pointer.pointerId);
				this.touchingCount = this.touchingPointerIds.length;
			}
			return pointer;
		}

		private hitAreaMouseDownHandler = (event:MouseEvent):void => {
			this.touchingCount = 1;
			this.isTouching = true;

			this.mousePointerId = ++Multitouch.mousePointerId;

			const localPosition = TouchUtil.getLocalPosition(event.clientX, event.clientY, this.startHitArea);
			const pointer = new MultitouchPointer(this.mousePointerId, localPosition.offsetX, localPosition.offsetY);
			pointer.isTouching = true;
			pointer.isFirstTouch = true;
			pointer.isLastTouch = true;
			pointer.isOldestTouch = true;
			pointer.isLatestTouch = true;

			this.touchingPointersByPointerId[pointer.pointerId] = pointer;
			this.touchingPointerIds.push(pointer.pointerId);

			this.dispatchDefaultEvent(MultitouchEventType.touchStart, pointer);
		};

		private hitAreaMouseMoveHandler = (event:MouseEvent):void => {
			if (this.touchingCount === 0) return;

			const pointer = this.touchingPointersByPointerId[this.mousePointerId];
			pointer.isTouching = true;

			const localPosition = TouchUtil.getLocalPosition(event.clientX, event.clientY, this.startHitArea);
			pointer.x = localPosition.offsetX;
			pointer.y = localPosition.offsetY;

			this.dispatchDefaultEvent(MultitouchEventType.touchMove, pointer);
		};

		private hitAreaMouseUpHandler = (event:MouseEvent):void => {
			if (this.touchingCount === 0) return;
			this.touchingCount = 0;
			this.isTouching = false;

			const pointer = this.touchingPointersByPointerId[this.mousePointerId];
			pointer.isTouching = false;
			pointer.isOldestTouch = false;
			pointer.isLatestTouch = false;
			pointer.touchEndTime = performance.now();

			this.mousePointerId = -1;

			const localPosition = TouchUtil.getLocalPosition(event.clientX, event.clientY, this.startHitArea);
			pointer.x = localPosition.offsetX;
			pointer.y = localPosition.offsetY;

			delete this.touchingPointersByPointerId[pointer.pointerId];
			this.touchingPointerIds.pop();

			this.dispatchDefaultEvent(MultitouchEventType.touchEnd, pointer);
		};

		private dispatchDefaultEvent(eventType:MultitouchEventType, pointer:MultitouchPointer):void {
			this.dispatchEvent(new MultitouchEvent(eventType, { detail: { pointer: pointer } }));
		}


		public getIsTouching():boolean {
			return this.isTouching;
		}

		public getTouchingCount():number {
			return this.touchingCount;
		}

		public getTouchingPointerIds():number[] {
			return this.touchingPointerIds.concat();
		}

		public getTouchingPointer(pointerId:number):MultitouchPointer {
			return this.touchingPointersByPointerId[pointerId];
		}

		public getOldestPointer():MultitouchPointer {
			return this.touchingCount > 0 ? this.touchingPointersByPointerId[this.touchingPointerIds[0]] : null;
		}

		public getLatestPointer():MultitouchPointer {
			return this.touchingCount > 0 ? this.touchingPointersByPointerId[this.touchingPointerIds[this.touchingCount - 1]] : null;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private touchingPointersByPointerId:Hash<MultitouchPointer>;
		private touchingPointerIds:number[];
		private touchingCount:number;
		private isTouching:boolean;

		private readonly isTouchEventEnabled:boolean;
		private startHitArea:HTMLElement | Window;
		private moveEndHitArea:HTMLElement | Window;

		private mousePointerId:number;
		private static mousePointerId:number = -1;
	}
}
