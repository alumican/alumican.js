/// <reference path='../../index.ts' />

namespace alm.event {

	import Logger = alm.debug.Logger;

	export class EventDispatcher implements IEventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(target:EventDispatcher = null) {
			this.target = target || this;
			this.listeners = {};
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public addEventListener(eventType:string, listener:EventListener):boolean {
			if (typeof(listener) != 'function') {
				Logger.warn('[EventDispatcher] addEventListener : listener is not function, eventType = \'' + eventType + '\', listener = ' + listener);
				return false;
			}
			let listeners:EventListener[] = this.listeners[eventType];
			if (listeners) {
				const numListeners:number = listeners.length;
				for (let i:number = 0; i < numListeners; ++i) {
					if (listener == listeners[i]) return false;
				}
			} else {
				this.listeners[eventType] = listeners = [];
			}
			listeners.push(listener);
			return true;
		}

		public removeEventListener(eventType:string, listener:EventListener):boolean {
			if (typeof(listener) != 'function') {
				Logger.warn('[EventDispatcher] removeEventListener : listener is not function, eventType = \'' + eventType + '\', listener = ' + listener);
				return false;
			}
			let result = false;
			let listeners:EventListener[] = this.listeners[eventType];
			if (listeners) {
				const numListeners:number = listeners.length;
				for (let i:number = 0; i < numListeners; ++i) {
					if (listener == listeners[i]) {
						listeners.splice(i,  1);
						result = true;
						break;
					}
				}
				if (listeners.length == 0) {
					delete this.listeners[eventType];
				}
			}
			return result;
		}

		public removeAllEventListener(eventType:string = null):void {
			if (eventType) {
				delete this.listeners[eventType];
			} else {
				this.listeners = {};
			}
		}

		public hasEventListener(eventType:string):boolean {
			return this.listeners[eventType] != null;
		}

		public dispatchEvent(event:Event):void {
			let listeners:EventListener[] = this.listeners[event.type];
			if (listeners) {
				listeners = listeners.concat();
				const numListeners:number = listeners.length;
				for (let i:number = 0; i < numListeners; ++i) {
					listeners[i].call(this.target, event);
				}
			}
		}

		public dispatchEventType<T = any>(eventType:string, eventTarget:object = null, data:T = null):void {
			this.dispatchEvent(new Event<object, T>(eventType, eventTarget, data));
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private target:any;
		private listeners:util.Hash<EventListener[]>;
	}
}
