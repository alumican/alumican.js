/// <reference path="../../reference.ts" />

namespace alm.event {

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
			if (typeof(listener) != "function") return;
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
			if (typeof(listener) != "function") return;
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

		public dispatchEventType(eventType:string, target:Object = null, data:any = null):void {
			this.dispatchEvent(new Event(eventType, target, data));
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private target:any;
		private listeners:Hash<EventListener[]>;
	}
}