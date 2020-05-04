/// <reference path='../../index.ts' />

namespace alm.browser {

	// https://github.com/nfriend/ts-keycode-enum
	export enum KeyCode {
		Backspace = 8,
		Tab = 9,
		Enter = 13,
		Shift = 16,
		Ctrl = 17,
		Alt = 18,
		PauseBreak = 19,
		CapsLock = 20,
		Escape = 27,
		Space = 32,
		PageUp = 33,
		PageDown = 34,
		End = 35,
		Home = 36,

		LeftArrow = 37,
		UpArrow = 38,
		RightArrow = 39,
		DownArrow = 40,

		Insert = 45,
		Delete = 46,

		Key0 = 48,
		Key1 = 49,
		Key2 = 50,
		Key3 = 51,
		Key4 = 52,
		Key5 = 53,
		Key6 = 54,
		Key7 = 55,
		Key8 = 56,
		Key9 = 57,

		ClosedParen = Key0,
		ExclamationMark = Key1,
		AtSign = Key2,
		PoundSign = Key3,
		Hash = PoundSign,
		DollarSign = Key4,
		PercentSign = Key5,
		Caret = Key6,
		Hat = Caret,
		Ampersand = Key7,
		Star = Key8,
		Asterik = Star,
		OpenParen = Key9,

		A = 65,
		B = 66,
		C = 67,
		D = 68,
		E = 69,
		F = 70,
		G = 71,
		H = 72,
		I = 73,
		J = 74,
		K = 75,
		L = 76,
		M = 77,
		N = 78,
		O = 79,
		P = 80,
		Q = 81,
		R = 82,
		S = 83,
		T = 84,
		U = 85,
		V = 86,
		W = 87,
		X = 88,
		Y = 89,
		Z = 90,

		LeftWindowKey = 91,
		RightWindowKey = 92,
		SelectKey = 93,

		Numpad0 = 96,
		Numpad1 = 97,
		Numpad2 = 98,
		Numpad3 = 99,
		Numpad4 = 100,
		Numpad5 = 101,
		Numpad6 = 102,
		Numpad7 = 103,
		Numpad8 = 104,
		Numpad9 = 105,

		Multiply = 106,
		Add = 107,
		Subtract = 109,
		DecimalPoint = 110,
		Divide = 111,

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

		NumLock = 144,
		ScrollLock = 145,

		SemiColon = 186,
		Equals = 187,
		Comma = 188,
		Dash = 189,
		Period = 190,
		UnderScore = Dash,
		PlusSign = Equals,
		ForwardSlash = 191,
		Tilde = 192,
		GraveAccent = Tilde,

		OpenBracket = 219,
		ClosedBracket = 221,
		Quote = 222
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
				KeyWatcher.eventDispatcher.dispatchEvent(new KeyWatcherEvent(KeyWatcherEvent.KEY_DOWN, KeyWatcher, event));
			} else if (KeyWatcher.isContinuousPressEnabled) {
				KeyWatcher.eventDispatcher.dispatchEvent(new KeyWatcherEvent(KeyWatcherEvent.KEY_DOWN, KeyWatcher, event));
			}
		};

		private static windowKeyUpHandler = (event:KeyboardEvent):void => {
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
