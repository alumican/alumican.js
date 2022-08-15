/// <reference path='../../index.ts' />

namespace alm.browser {

	// https://github.com/nfriend/ts-keycode-enum
	export enum KeyCode {
		backspace = 8,
		tab = 9,
		enter = 13,
		shift = 16,
		ctrl = 17,
		alt = 18,
		pauseBreak = 19,
		capsLock = 20,
		escape = 27,
		space = 32,
		pageUp = 33,
		pageDown = 34,
		end = 35,
		home = 36,

		leftArrow = 37,
		upArrow = 38,
		rightArrow = 39,
		downArrow = 40,

		insert = 45,
		delete = 46,

		key0 = 48,
		key1 = 49,
		key2 = 50,
		key3 = 51,
		key4 = 52,
		key5 = 53,
		key6 = 54,
		key7 = 55,
		key8 = 56,
		key9 = 57,

		closedParen = key0,
		exclamationMark = key1,
		atSign = key2,
		poundSign = key3,
		hash = poundSign,
		dollarSign = key4,
		percentSign = key5,
		caret = key6,
		hat = caret,
		ampersand = key7,
		star = key8,
		asterik = star,
		openParen = key9,

		a = 65,
		b = 66,
		c = 67,
		d = 68,
		e = 69,
		f = 70,
		g = 71,
		h = 72,
		i = 73,
		j = 74,
		k = 75,
		l = 76,
		m = 77,
		n = 78,
		o = 79,
		p = 80,
		q = 81,
		r = 82,
		s = 83,
		t = 84,
		u = 85,
		v = 86,
		w = 87,
		x = 88,
		y = 89,
		z = 90,

		leftWindowKey = 91,
		rightWindowKey = 92,
		selectKey = 93,

		numpad0 = 96,
		numpad1 = 97,
		numpad2 = 98,
		numpad3 = 99,
		numpad4 = 100,
		numpad5 = 101,
		numpad6 = 102,
		numpad7 = 103,
		numpad8 = 104,
		numpad9 = 105,

		multiply = 106,
		add = 107,
		subtract = 109,
		decimalPoint = 110,
		divide = 111,

		F1 = 112,
		F2 = 113,
		F3 = 114,
		F4 = 115,
		F5 = 116,
		F6 = 117,
		F7 = 118,
		F8 = 119,
		F9 = 120,
		F10 = 121,
		F11 = 122,
		F12 = 123,

		numLock = 144,
		scrollLock = 145,

		semiColon = 186,
		equals = 187,
		comma = 188,
		dash = 189,
		period = 190,
		underScore = dash,
		plusSign = equals,
		forwardSlash = 191,
		tilde = 192,
		graveAccent = tilde,

		openBracket = 219,
		closedBracket = 221,
		quote = 222
	}





	export class KeyWatcher {

		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		private static initialize():void {
			if (this.isInitialized) return;
			this.isInitialized = true;

			this.eventDispatcher = new alm.event.EventDispatcher();
		}

		public static start():void {
			if (this.isRunning) return;
			this.isRunning = true;

			this.initialize();
			trace('[KeyWatcher] start');

			window.addEventListener('keydown', this.windowKeyDownHandler);
			window.addEventListener('keyup', this.windowKeyUpHandler);
		}


		public static stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			this.initialize();
			trace('[KeyWatcher] stop');

			window.removeEventListener('keydown', this.windowKeyDownHandler);
			window.removeEventListener('keyup', this.windowKeyUpHandler);
		}

		public static addEventListener(eventType:string, listener:(event:KeyWatcherEvent) => void):void {
			this.initialize();
			this.eventDispatcher.addEventListener(eventType, listener);
		}

		public static removeEventListener(eventType:string, listener:(event:KeyWatcherEvent) => void):void {
			this.initialize();
			this.eventDispatcher.removeEventListener(eventType, listener);
		}





		private static windowKeyDownHandler = (event:KeyboardEvent):void => {
			const keyCode:number = event.keyCode;
			if (KeyWatcher.isKeyPressedByKeyCode[keyCode] == null) {
				KeyWatcher.isKeyPressedByKeyCode[keyCode] = true;
				++KeyWatcher.pressedKeyCount;
				KeyWatcher.eventDispatcher.dispatchEvent(new KeyWatcherEvent(KeyWatcherEvent.keyDown, KeyWatcher, event));
			} else if (KeyWatcher.isContinuousPressEnabled) {
				KeyWatcher.eventDispatcher.dispatchEvent(new KeyWatcherEvent(KeyWatcherEvent.keyDown, KeyWatcher, event));
			}
		};

		private static windowKeyUpHandler = (event:KeyboardEvent):void => {
			const keyCode:number = event.keyCode;
			if (KeyWatcher.isKeyPressedByKeyCode[keyCode] != null) {
				delete KeyWatcher.isKeyPressedByKeyCode[keyCode];
				--KeyWatcher.pressedKeyCount;
				KeyWatcher.eventDispatcher.dispatchEvent(new KeyWatcherEvent(KeyWatcherEvent.keyUp, KeyWatcher, event));
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
		private static isKeyPressedByKeyCode:util.Hash<boolean> = {};


		public static getIsContinuousPressEnabled():boolean { return this.isContinuousPressEnabled; }
		public static setIsContinuousPressEnabled(enabled:boolean):void { this.isContinuousPressEnabled = enabled; }
		private static isContinuousPressEnabled:boolean = false;

		private static isInitialized:boolean = false;
		private static isLongPressed:boolean = false;
		private static eventDispatcher:alm.event.EventDispatcher = null;





		private constructor() {}
	}
}
