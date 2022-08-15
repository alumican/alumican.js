/// <reference path="../../index.ts" />

namespace alm.multitouch {

	export enum MultitouchEventType {
		touchStart = 'touchstart',
		touchMove = 'touchmove',
		touchEnd = 'touchend',
	}

	export interface MultitouchEventDetail {
		pointer:MultitouchPointer;
	}

	export class MultitouchEvent extends CustomEvent<MultitouchEventDetail> {
		constructor(type:MultitouchEventType, options:CustomEventInit<MultitouchEventDetail>) {
			super(type, options);
		}
	}
}
