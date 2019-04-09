/// <reference path='../../include.ts' />

namespace alm.event {

	import Logger = alm.io.Logger;
	export type EventListener = (event:Event) => void;

	export class EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(target:any = null) {
			this.target = target || this;
			this.listeners = {};
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public addEventListener(eventType:string, listener:EventListener):void {
			if (typeof(listener) != 'function') {
				Logger.warn('[EventDispatcher] addEventListener : listener is not function, eventType = \'' + eventType + '\', listener = ' + listener);
				return;
			}
			let listeners:EventListener[] = this.listeners[eventType];
			if (listeners) {
				const numListeners:number = listeners.length;
				for (let i:number = 0; i < numListeners; ++i) {
					if (listener == listeners[i]) return;
				}
			} else {
				this.listeners[eventType] = listeners = [];
			}
			listeners.push(listener);
		}

		public removeEventListener(eventType:string, listener:EventListener):void {
			if (typeof(listener) != 'function') {
				Logger.warn('[EventDispatcher] removeEventListener : listener is not function, eventType = \'' + eventType + '\', listener = ' + listener);
				return;
			}
			let listeners:EventListener[] = this.listeners[eventType];
			if (listeners) {
				const numListeners:number = listeners.length;
				for (let i:number = 0; i < numListeners; ++i) {
					if (listener == listeners[i]) {
						listeners.splice(i,  1);
						break;
					}
				}
				if (listeners.length == 0) {
					delete this.listeners[eventType];
				}
			}
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
			let listeners:EventListener[] = this.listeners[event.getType()];
			if (listeners) {
				const numListeners:number = listeners.length;
				for (let i:number = 0; i < numListeners; ++i) {
					listeners[i].call(this.target, event);
				}
			}
		}

		public dispatchEventType<T = any>(eventType:string, target:Object = null, data:T = null):void {
			this.dispatchEvent(new Event<T>(eventType, target, data));
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