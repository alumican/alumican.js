/// <reference path='../../index.ts' />

namespace alm.util {

	export class Dom {

		public static instantiate(templateId:string):HTMLElement {
			const element = <HTMLElement>document.getElementById(templateId).cloneNode(true);
			element.removeAttribute('id');
			return element;
		}

		public static addPointerDownListener(target:HTMLElement, listener:(event:PointerEvent) => void):void {
			target.addEventListener('pointerdown', listener);
		}

		public static addPointerUpListener(target:HTMLElement, listener:(event:PointerEvent) => void):void {
			target.addEventListener('pointerup', listener);
		}
		public static removePointerEventListener(target:HTMLElement, listener:(event:PointerEvent) => void):void {
			target.removeEventListener('pointerdown', listener);
		}

		public static removePointerUpListener(target:HTMLElement, listener:(event:PointerEvent) => void):void {
			target.removeEventListener('pointerup', listener);
		}





		private constructor() {}
	}
}
