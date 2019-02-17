/// <reference path="../../include.ts" />

namespace alm.canvas {

	import EventDispatcher = alm.event.EventDispatcher;

	export abstract class BaseApp extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(canvasId:string, isAutoResizeEnabled:boolean = true, ...platformSetupOptions:any[]) {
			super();

			this.canvas = <JQuery<HTMLCanvasElement>>jQuery(canvasId);
			this.isAutoResizeEnabled = isAutoResizeEnabled;

			trace("[BaseApp] canvasId : " + canvasId);
			trace("[BaseApp] isAutoResizeEnabled : " + this.isAutoResizeEnabled);

			this.pointerIds = [];
			this.pointersById = {};
			this.pointingCount = 0;

			this.elapsedFrameCount = 0;
			this.startTime = new Date().getTime();
			this.mousePointerId = 'mouse';

			jQuery(window).on('mouseover', this.mouseOverHandler);
			jQuery(window).on('mouseout', this.mouseOutHandler);
			jQuery(window).on('mousedown', this.mouseDownHandler);
			jQuery(window).on('mouseup', this.mouseUpHandler);
			jQuery(window).on('mousemove', this.mouseMoveHandler);
			jQuery(window).on('touchstart', this.touchStartHandler);
			jQuery(window).on('touchend', this.touchEndHandler);
			jQuery(window).on('touchcancel', this.touchCancelHandler);
			jQuery(window).on('touchmove', this.touchMoveHandler);
			jQuery(window).on('keydown', this.keyDownHandler);
			jQuery(window).on('keyup', this.keyUpHandler);
			this.canvas.on('touchmove', this.canvasTouchMoveHandler);
			this.canvas.on('touchforcechange', this.touchForceChangeHandler);
			requestAnimationFrame(this.requestAnimationFrame);

			this.onPlatformSetup.apply(this, platformSetupOptions);
			this.onSetup();

			if (this.isAutoResizeEnabled) {
				jQuery(window).on('resize', this.resizeHandler);
				this.resizeHandler(null);
			}
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public onSetup():void {
		}

		public onUpdate():void {
		}

		public onPointerEnter(pointer:Pointer):void {
		}

		public onPointerLeave(pointer:Pointer,):void {
		}

		public onPointerTouch(pointer:Pointer):void {
		}

		public onPointerRelease(pointer:Pointer):void {
		}

		public onPointerMove(pointer:Pointer):void {
		}

		public onPointerDrag(pointer:Pointer):void {
		}

		public onPointerTouchForceChange(pointer:Pointer):void {
		}

		public onKeyDown(key:string):void {
		}

		public onKeyUp(key:string):void {
		}

		public onResize(stageWidth:number, stageHeight:number):void {
		}

		protected onPlatformSetup(...platformSetupOptions:any[]):void {
		}

		protected onPlatformRender():void {
		}

		protected onPlatformResize(stageWidth:number, stageHeight:number):void {
		}

		public resize(width:number, height:number):void {
			this.stageWidth = width;
			this.stageHeight = height;
			trace('[BaseApp] resize : width = ' + this.stageWidth + ', height = ' + this.stageHeight);
			this.onPlatformResize(this.stageWidth, this.stageHeight);
			this.onResize(this.stageWidth, this.stageHeight);
		}

		// --------------------------------------------------
		// Mouse Event

		private mouseOverHandler = (event:JQuery.Event):void => {
			const pointer:Pointer = this.getMousePointer(event);
		};

		private mouseOutHandler = (event:JQuery.Event):void => {
			const pointer:Pointer = this.getMousePointer(event);
			delete this.pointersById[this.mousePointerId];
			const pointerIndex = this.pointerIds.indexOf(this.mousePointerId);
			if (pointerIndex != -1) {
				this.pointerIds.splice(pointerIndex, 1);
			}
			--this.pointingCount;
			pointer.notifyLeave();
			this.onPointerLeave(pointer);
		};

		private mouseDownHandler = (event:JQuery.Event):void => {
			const pointer:Pointer = this.getMousePointer(event);
			pointer.notifyTouch();
			this.onPointerTouch(pointer);
		};

		private mouseUpHandler = (event:JQuery.Event):void => {
			const pointer:Pointer = this.getMousePointer(event);
			pointer.notifyRelease();
			this.onPointerRelease(pointer);
		};

		private mouseMoveHandler = (event:JQuery.Event):void => {
			const pointer:Pointer = this.getMousePointer(event);
			pointer.notifyMove(event.clientX, event.clientY);
			this.onPointerMove(pointer);
			if (pointer.isDragging) {
				this.onPointerDrag(pointer);
			}
		};

		// --------------------------------------------------
		// Touch Event

		private touchStartHandler = (event:JQuery.Event):void => {
			const touches:TouchList = event.changedTouches;
			const touchCount:number = event.changedTouches.length;
			let touch:Touch;
			let id:string;
			let pointer:Pointer;
			for (let i:number = 0; i < touchCount; ++i) {
				touch = touches.item(i);
				id = BaseApp.getPointerId(touch.identifier);
				pointer = new Pointer(id);
				this.pointersById[id] = pointer;
				this.pointerIds.push(id);
				++this.pointingCount;
				pointer.notifyEnter(touch.clientX, touch.clientY);
				pointer.notifyTouch();
				this.onPointerEnter(pointer);
				this.onPointerTouch(pointer);
			}
		};

		private touchEndHandler = (event:JQuery.Event):void => {
			const touches:TouchList = event.changedTouches;
			const touchCount:number = event.changedTouches.length;
			let touch:Touch;
			let id:string;
			let pointer:Pointer;
			for (let i:number = 0; i < touchCount; ++i) {
				touch = touches.item(i);
				id = BaseApp.getPointerId(touch.identifier);
				pointer = this.pointersById[id];
				delete this.pointersById[id];
				const pointerIndex = this.pointerIds.indexOf(id);
				if (pointerIndex != -1) {
					this.pointerIds.splice(pointerIndex, 1);
				}
				--this.pointingCount;
				pointer.notifyRelease();
				pointer.notifyLeave();
				this.onPointerRelease(pointer);
				this.onPointerLeave(pointer);
			}
		};

		private touchCancelHandler = (event:JQuery.Event):void => {
			this.touchEndHandler(event);
		};

		private touchMoveHandler = (event:JQuery.Event):void => {
			const touches:TouchList = event.changedTouches;
			const touchCount:number = event.changedTouches.length;
			let touch:Touch;
			let id:string;
			let pointer:Pointer;
			for (let i:number = 0; i < touchCount; ++i) {
				touch = touches.item(i);
				id = BaseApp.getPointerId(touch.identifier);
				pointer = this.pointersById[id];
				pointer.notifyMove(touch.clientX, touch.clientY);
				if (pointer.isDragging) {
					this.onPointerDrag(pointer);
				}
			}
		};

		private touchForceChangeHandler = (event:JQuery.Event):void => {
			const touches:TouchList = event.changedTouches;
			const touchCount:number = event.changedTouches.length;
			let touch:Touch;
			let id:string;
			let pointer:Pointer;
			for (let i:number = 0; i < touchCount; ++i) {
				touch = touches.item(i);
				id = BaseApp.getPointerId(touch.identifier);
				pointer = this.pointersById[id];
				pointer.notifyTouchForce(touch.force);
				this.onPointerTouchForceChange(pointer);
			}
		};

		private canvasTouchMoveHandler = (event:JQuery.Event):void => {
			event.originalEvent.preventDefault();
		};

		// --------------------------------------------------
		// Key Event

		private keyDownHandler = (event:JQuery.Event):void => {
			this.onKeyDown(event.key);
		};

		private keyUpHandler = (event:JQuery.Event):void => {
			this.onKeyUp(event.key);
		};

		// --------------------------------------------------
		// Other Event

		private resizeHandler = (event:JQuery.Event):void => {
			this.resize($(window).width(), $(window).height());
		};

		private requestAnimationFrame = ():void => {
			++this.elapsedFrameCount;
			this.elapsedTime = (new Date().getTime() - this.startTime) / 1000;
			this.onUpdate();
			this.onPlatformRender();
			requestAnimationFrame(this.requestAnimationFrame);
		};

		// --------------------------------------------------
		// Util

		private getMousePointer(event:JQuery.Event):Pointer {
			let pointer:Pointer = this.pointersById[this.mousePointerId];
			if (pointer == null) {
				pointer = new Pointer(this.mousePointerId);
				this.pointersById[this.mousePointerId] = pointer;
				this.pointerIds.push(this.mousePointerId);
				++this.pointingCount;
				pointer.notifyEnter(event.clientX, event.clientY);
				this.onPointerEnter(pointer);
			}
			return pointer;
		}

		public static getPointerId(touchId:number):string {
			return 'touch_' + touchId;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public getPointerIds():string[] { return this.pointerIds; }
		private pointerIds:string[];

		public getFirstPointer():Pointer { return this.pointingCount > 0 ? this.getPointerById(this.pointerIds[0]) : null; }
		public getLastPointer():Pointer { return this.pointingCount > 0 ? this.getPointerById(this.pointerIds[this.pointingCount - 1]) : null; }

		public getPointerById(id:string):Pointer { return this.pointersById[id]; }
		private pointersById:alm.util.Hash<Pointer>;

		public getPointingCount():number { return this.pointingCount; }
		private pointingCount:number;

		public getStageWidth():number { return this.stageWidth; }
		private stageWidth:number;

		public getStageHeight():number { return this.stageHeight; }
		private stageHeight:number;

		public getElapsedFrameCount():number { return this.elapsedFrameCount; }
		private elapsedFrameCount:number;

		public getElapsedTime():number { return this.elapsedTime; }
		private elapsedTime:number;

		public getCanvas():JQuery<HTMLCanvasElement> { return this.canvas; }
		private canvas:JQuery<HTMLCanvasElement>;

		public getIsAutoResizeEnabled():boolean { return this.isAutoResizeEnabled; }
		public setIsAutoResizeEnabled(value:boolean):void { this.isAutoResizeEnabled = value; }
		private isAutoResizeEnabled:boolean;

		private startTime:number;
		private mousePointerId:string;
	}
}