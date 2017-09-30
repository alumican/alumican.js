/// <reference path="../reference.ts" />

namespace alm {

	export class KeyWatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		private constructor() {
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		private static initialize():void {
			if (this.isInitialized) return;
			this.isInitialized = true;

			this.eventDispatcher = new cmd.EventDispatcher();
		}

		public static start():void {
			if (this.isRunning) return;
			this.isRunning = true;

			this.initialize();
			trace("[KeyWatcher] start");

			const $window:JQuery = jQuery(window);
			$window.on("keydown", this.windowKeyDownHandler);
			$window.on("keyup", this.windowKeyUpHandler);
		}


		public static stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			this.initialize();
			trace("[KeyWatcher] stop");

			const $window:JQuery = jQuery(window);
			$window.off("keydown", this.windowKeyDownHandler);
			$window.off("keyup", this.windowKeyUpHandler);
		}

		public static addEventListener(eventType:string, listener:(event:KeyWatcherEvent) => void):void {
			this.initialize();
			this.eventDispatcher.addEventListener(eventType, listener);
		}

		public static removeEventListener(eventType:string, listener:(event:KeyWatcherEvent) => void):void {
			this.initialize();
			this.eventDispatcher.removeEventListener(eventType, listener);
		}





		private static windowKeyDownHandler = (event:JQuery.Event):void => {
			const keyCode:number = event.keyCode;
			if (KeyWatcher.isKeyPressedByKeyCode[keyCode] == null) {
				KeyWatcher.isKeyPressedByKeyCode[keyCode] = true;
				++KeyWatcher.pressedKeyCount;
				KeyWatcher.eventDispatcher.dispatchEvent(new KeyWatcherEvent(KeyWatcherEvent.KEY_DOWN, KeyWatcher, event));
			} else if (KeyWatcher.isContinuousPressEnabled) {
				KeyWatcher.eventDispatcher.dispatchEvent(new KeyWatcherEvent(KeyWatcherEvent.KEY_DOWN, KeyWatcher, event));
			}
		};

		private static windowKeyUpHandler = (event:JQuery.Event):void => {
			const keyCode:number = event.keyCode;
			if (KeyWatcher.isKeyPressedByKeyCode[keyCode] != null) {
				delete KeyWatcher.isKeyPressedByKeyCode[keyCode];
				--KeyWatcher.pressedKeyCount;
				KeyWatcher.eventDispatcher.dispatchEvent(new KeyWatcherEvent(KeyWatcherEvent.KEY_UP, KeyWatcher, event));
			}
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public static getIsRunning():boolean { return this.isRunning; }
		private static isRunning:boolean = false;

		public static getIsAnyKeyPressed():boolean { return this.pressedKeyCount > 0; }
		private static pressedKeyCount:number = 0;

		public static getIsKeyPressed(keyCode:number):boolean { return this.isKeyPressedByKeyCode[keyCode] != null; }
		private static isKeyPressedByKeyCode:cmd.Hash<boolean> = {};


		public static getIsContinuousPressEnabled():boolean { return this.isContinuousPressEnabled; }
		public static setIsContinuousPressEnabled(enabled:boolean):void { this.isContinuousPressEnabled = enabled; }
		private static isContinuousPressEnabled:boolean = false;

		private static isInitialized:boolean = false;
		private static pressTimer:alm.Timer = null;
		private static isLongPressed:boolean = false;
		private static eventDispatcher:cmd.EventDispatcher = null;
	}
}