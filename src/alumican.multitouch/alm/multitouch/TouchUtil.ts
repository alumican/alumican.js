/// <reference path="../../index.ts" />

namespace alm.multitouch {

	export class TouchUtil {

		public static getIsTouchEventSupported():boolean {
			return (window.document['ontouchstart'] !== undefined) || (window.navigator.maxTouchPoints > 0);
		}

		public static getLocalTouchPosition(touch:Touch, local:HTMLElement | Window):{ offsetX:number, offsetY:number } {
			return TouchUtil.getLocalPosition(touch.clientX, touch.clientY, local);
		}

		public static getLocalPosition(clientX:number, clientY:number, local:HTMLElement | Window):{ offsetX:number, offsetY:number } {
			if (local['getBoundingClientRect']) {
				const rect = (<HTMLElement>local).getBoundingClientRect();
				return { offsetX: clientX - window.scrollX - rect.left, offsetY: clientY - window.scrollY - rect.top };
			} else {
				return { offsetX: clientX, offsetY: clientY };
			}
		}





		private constructor() {
		}
	}
}
