/// <reference path='../../index.ts' />

namespace alm.util {

	import Easing = alm.math.Easing;
	import EasingFunction = alm.math.EasingFunction;

	export class Dom {

		public static instantiate(templateId:string, removeId:boolean = true):HTMLElement {
			const element = <HTMLElement>document.getElementById(templateId).cloneNode(true);
			if (removeId) {
				element.removeAttribute('id');
			}
			return element;
		}





		public static addPointerDownListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.addEventListener('pointerdown', listener);
		}

		public static addPointerMoveListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.addEventListener('pointermove', listener);
		}

		public static addPointerUpListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.addEventListener('pointerup', listener);
		}

		public static addPointerEnterListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.addEventListener('pointerenter', listener);
		}

		public static addPointerLeaveListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.addEventListener('pointerleave', listener);
		}

		public static addPointerOverListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.addEventListener('pointerover', listener);
		}

		public static addPointerOutListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.addEventListener('pointerout', listener);
		}

		public static removePointerDownListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.removeEventListener('pointerdown', listener);
		}

		public static removePointerMoveListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.removeEventListener('pointermove', listener);
		}

		public static removePointerUpListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.removeEventListener('pointerup', listener);
		}

		public static removePointerEnterListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.removeEventListener('pointerenter', listener);
		}

		public static removePointerLeaveListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.removeEventListener('pointerleave', listener);
		}

		public static removePointerOverListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.removeEventListener('pointerover', listener);
		}

		public static removePointerOutListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void):void {
			target.removeEventListener('pointerout', listener);
		}





		public static addRootClass(value:string):void {
			if (Dom.root === null) {
				Dom.root = document.documentElement;
			}
			Dom.root.classList.add(value);
		}

		public static removeRootClass(value:string):void {
			if (Dom.root === null) {
				Dom.root = document.documentElement;
			}
			Dom.root.classList.remove(value);
		}

		public static addRootAttribute(key:string, value:string):void {
			if (Dom.root === null) {
				Dom.root = document.documentElement;
			}
			Dom.root.setAttribute(key, value);
		}

		public static removeRootAttribute(key:string, value:string):void {
			if (Dom.root === null) {
				Dom.root = document.documentElement;
			}
			Dom.root.removeAttribute(key);
		}





		public static getRootCss(property:string):string {
			if (Dom.root === null) {
				Dom.root = document.documentElement;
			}
			return Dom.root.style.getPropertyValue(property);
		}

		public static setRootCss(property:string, value:string):void {
			if (Dom.root === null) {
				Dom.root = document.documentElement;
			}
			Dom.root.style.setProperty(property, value);
		}





		public static scrollTo(scrollTop:number, useTransition:boolean = true):void {
			Dom.scrollTween = Cmd.stop(Dom.scrollTween);
			if (useTransition) {
				Dom.scrollTween = new cmd.Tween(Dom, {scrollPosition:scrollTop}, null, 1000, Easing.easeOutQuart, null, ():void => {
					Dom.applyScrollPosition();
				});
				Dom.scrollTween.execute();
			} else {
				Dom.scrollPosition = scrollTop;
				Dom.applyScrollPosition();
			}
		}

		private static applyScrollPosition():void {
			window.scroll(0, Dom.scrollPosition);
		}





		public static setupSmoothAnchorLink():void {
			const tags = document.getElementsByTagName('a');
			const tagCount = tags.length;
			for (let i = 0; i < tagCount; ++i) {
				Dom.setAnchorLinkAction(tags.item(i));
			}
		}

		private static setAnchorLinkAction(tag:HTMLElement):void {
			const href = tag.getAttribute('href');
			if ((href.indexOf('#')) == 0 && !tag.hasAttribute('data-smooth-anchor-target')) {
				tag.setAttribute('data-smooth-anchor-target', href.slice(1));
				tag.setAttribute('href', 'javascript:void(0)');
				tag.addEventListener('click', Dom.anchorLinkClickHandler);
			}
		}

		private static anchorLinkClickHandler = (event:MouseEvent):void => {
			const tag = <HTMLElement>event.currentTarget;

			const targetId = tag.getAttribute('data-smooth-anchor-target');
			const target = document.getElementById(targetId);
			let targetScrollPosition = window.pageYOffset + target.getBoundingClientRect().top;

			if (tag.hasAttribute('data-smooth-anchor-offset')) {
				targetScrollPosition += parseFloat(tag.getAttribute('data-smooth-anchor-offset'));
			}

			Dom.scrollTo(targetScrollPosition);
		};





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private static root:HTMLElement = null;
		private static scrollTween:cmd.Tween = null;
		private static scrollPosition:number;





		private constructor() {
		}
	}
}
