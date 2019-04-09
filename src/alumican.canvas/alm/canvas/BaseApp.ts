/// <reference path="../../include.ts" />

namespace alm.canvas {

	import EventDispatcher = alm.event.EventDispatcher;
	import DeviceInfo = alm.browser.DeviceInfo;

	export abstract class BaseApp extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(canvas:HTMLElement, isAutoResizeEnabled:boolean = true, platformSetupOptions:any[] = null) {
			super();

			this.window = jQuery(window);

			this.canvas = <JQuery<HTMLCanvasElement>>jQuery(canvas);
			this.isAutoResizeEnabled = isAutoResizeEnabled;

			this.pointerIds = [];
			this.pointersById = {};
			this.pointingCount = 0;

			this.elapsedFrameCount = 0;
			this.startTime = new Date().getTime();
			this.mousePointerId = 'mouse';
			this.isTouchEnabled = DeviceInfo.getIsTouchEnabled();
			this.isForceTouchEnabled = typeof canvas['ontouchforcechange'] !== 'undefined';

			trace("[BaseApp] canvas : ", canvas);
			trace("[BaseApp] platformSetupOptions : ", platformSetupOptions);
			trace("[BaseApp] isAutoResizeEnabled : " + this.isAutoResizeEnabled);
			trace("[BaseApp] isTouchEnabled : " + this.isTouchEnabled);
			trace("[BaseApp] isForceTouchEnabled : " + this.isForceTouchEnabled);

			if (this.isTouchEnabled) {
				this.canvas.on('touchstart', this.touchStartHandler);
				this.canvas.on('touchend', this.touchEndHandler);
				this.canvas.on('touchcancel', this.touchCancelHandler);
				this.canvas.on('touchmove', this.touchMoveHandler);
				if (this.isForceTouchEnabled) {
					this.canvas.on('touchforcechange', this.touchForceChangeHandler);
				}
			} else {
				this.canvas.on('mouseover', this.mouseOverHandler);
				this.canvas.on('mouseout', this.mouseOutHandler);
				this.canvas.on('mousedown', this.mouseDownHandler);
				this.canvas.on('mouseup', this.mouseUpHandler);
				this.canvas.on('mousemove', this.mouseMoveHandler);
			}

			this.window.on('keydown', this.keyDownHandler);
			this.window.on('keyup', this.keyUpHandler);
			//this.canvas.attr('tabindex', 1);

			jQuery(document).on('visibilitychange', this.visibilityStateChangeHandler);

			requestAnimationFrame(this.requestAnimationFrame);

			this.onPlatformSetup(platformSetupOptions || []);
			this.onSetup();

			if (this.isAutoResizeEnabled) {
				this.window.on('resize', this.resizeHandler);
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

		public onVisibilityStateChange(visibilityState:VisibilityState):void {
		}

		protected onPlatformSetup(platformSetupOptions:any[]):void {
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

		private mouseOverHandler = (event:JQuery.MouseOverEvent):void => {
			const pointer:Pointer = this.getMousePointer(event);
		};

		private mouseOutHandler = (event:JQuery.MouseOutEvent):void => {
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

		private mouseDownHandler = (event:JQuery.MouseDownEvent):void => {
			const pointer:Pointer = this.getMousePointer(event);
			pointer.notifyTouch();
			this.onPointerTouch(pointer);
		};

		private mouseUpHandler = (event:JQuery.MouseUpEvent):void => {
			const pointer:Pointer = this.getMousePointer(event);
			pointer.notifyRelease();
			this.onPointerRelease(pointer);
		};

		private mouseMoveHandler = (event:JQuery.MouseMoveEvent):void => {
			const pointer:Pointer = this.getMousePointer(event);
			const position:number[] = this.getMousePointerPosition(event);
			pointer.notifyMove(position[0], position[1]);
			this.onPointerMove(pointer);
			if (pointer.isDragging) {
				this.onPointerDrag(pointer);
			}
		};

		// --------------------------------------------------
		// Touch Event

		private touchStartHandler = (event:JQuery.TouchEventBase):void => {
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
				const position:number[] = this.getTouchPointerPosition(touch);
				pointer.notifyEnter(position[0], position[1]);
				pointer.notifyTouch();
				this.onPointerEnter(pointer);
				this.onPointerTouch(pointer);
			}
		};

		private touchEndHandler = (event:JQuery.TouchEventBase):void => {
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

		private touchCancelHandler = (event:JQuery.TouchEventBase):void => {
			this.touchEndHandler(event);
		};

		private touchMoveHandler = (event:JQuery.TouchEventBase):void => {
			event.originalEvent.preventDefault();

			const touches:TouchList = event.changedTouches;
			const touchCount:number = event.changedTouches.length;
			let touch:Touch;
			let id:string;
			let pointer:Pointer;
			for (let i:number = 0; i < touchCount; ++i) {
				touch = touches.item(i);
				id = BaseApp.getPointerId(touch.identifier);
				pointer = this.pointersById[id];
				const position:number[] = this.getTouchPointerPosition(touch);
				pointer.notifyMove(position[0], position[1]);
				if (pointer.isDragging) {
					this.onPointerDrag(pointer);
				}
			}
		};

		private touchForceChangeHandler = (event:JQuery.TouchEventBase):void => {
			const touches:TouchList = event.changedTouches;
			const touchCount:number = event.changedTouches.length;
			let touch:Touch;
			let id:string;
			let pointer:Pointer;
			for (let i:number = 0; i < touchCount; ++i) {
				touch = touches.item(i);
				id = BaseApp.getPointerId(touch.identifier);
				pointer = this.pointersById[id];
				if (pointer) {
					pointer.notifyTouchForce(touch.force);
					this.onPointerTouchForceChange(pointer);
				}
			}
		};

		// --------------------------------------------------
		// Key Event

		private keyDownHandler = (event:JQuery.KeyDownEvent):void => {
			this.onKeyDown(event.key);
		};

		private keyUpHandler = (event:JQuery.KeyUpEvent):void => {
			this.onKeyUp(event.key);
		};

		// --------------------------------------------------
		// Other Event

		private resizeHandler = (event:JQuery.ResizeEvent):void => {
			const newStageWidth:number = this.canvas.width();
			const newStageHeight:number = this.canvas.height();
			if (this.stageWidth != newStageWidth || this.stageHeight != newStageHeight) {
				this.resize(newStageWidth, newStageHeight);
			}
		};

		private visibilityStateChangeHandler = (event:JQuery.Event):void => {
			this.onVisibilityStateChange(document.visibilityState);
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
				const position:number[] = this.getMousePointerPosition(event);
				pointer.notifyEnter(position[0], position[1]);
				this.onPointerEnter(pointer);
			}
			return pointer;
		}

		private getTouchPointerPosition(touch:Touch):number[] {
			const offset:JQuery.Coordinates = this.getCanvas().offset();
			//trace(touch, touch.clientX, touch.clientY, touch.pageX, touch.pageY, offset.left, offset.top);
			return [touch.pageX - offset.left, touch.pageY - offset.top];
		}

		private getMousePointerPosition(event:JQuery.Event):number[] {
			const offset:JQuery.Coordinates = this.getCanvas().offset();
			return [event.pageX - offset.left, event.pageY - offset.top];
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

		public getIsForceTouchEnabled():boolean { return this.isForceTouchEnabled; }
		private isForceTouchEnabled:boolean;

		public getIsTouchEnabled():boolean { return this.isTouchEnabled; }
		private isTouchEnabled:boolean;

		private startTime:number;
		private mousePointerId:string;
		private window:JQuery<Window>;
	}
}