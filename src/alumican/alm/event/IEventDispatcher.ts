/// <reference path='../../index.ts' />

namespace alm.event {

	export interface IEventDispatcher {

		addEventListener(eventType:string, listener:EventListener):void;
		removeEventListener(eventType:string, listener:EventListener):void;
		removeAllEventListener(eventType:string):void;
		hasEventListener(eventType:string):boolean;
		dispatchEvent(event:Event):void;
		dispatchEventType<T = any>(eventType:string, target:Object, data:T):void;
	}
}
