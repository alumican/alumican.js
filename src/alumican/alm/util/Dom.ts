/// <reference path='../../index.ts' />

namespace alm.util {

	import Easing = alm.math.Easing;

	export class Dom {

		public static instantiate(templateId:string, removeId:boolean = true, verbose:boolean = true):HTMLElement {
			const template = document.getElementById(templateId);
			if (template) {
				const element = <HTMLElement>template.cloneNode(true);
				if (removeId) {
					element.removeAttribute('id');
				}
				return element;
			} else {
				if (verbose) {
					console.warn('[Dom.instantiate] template (id = ' + templateId + ' ) is not found.');
				}
			}
			return null;
		}





		public static addPointerDownListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:AddEventListenerOptions = null):void {
			target.addEventListener('pointerdown', listener, options);
		}

		public static addPointerMoveListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:AddEventListenerOptions = null):void {
			target.addEventListener('pointermove', listener, options);
		}

		public static addPointerUpListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:AddEventListenerOptions = null):void {
			target.addEventListener('pointerup', listener, options);
		}

		public static addPointerEnterListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:AddEventListenerOptions = null):void {
			target.addEventListener('pointerenter', listener, options);
		}

		public static addPointerLeaveListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:AddEventListenerOptions = null):void {
			target.addEventListener('pointerleave', listener, options);
		}

		public static addPointerOverListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:AddEventListenerOptions = null):void {
			target.addEventListener('pointerover', listener, options);
		}

		public static addPointerOutListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:AddEventListenerOptions = null):void {
			target.addEventListener('pointerout', listener, options);
		}

		public static removePointerDownListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:EventListenerOptions = null):void {
			target.removeEventListener('pointerdown', listener, options);
		}

		public static removePointerMoveListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:EventListenerOptions = null):void {
			target.removeEventListener('pointermove', listener, options);
		}

		public static removePointerUpListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:EventListenerOptions = null):void {
			target.removeEventListener('pointerup', listener, options);
		}

		public static removePointerEnterListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:EventListenerOptions = null):void {
			target.removeEventListener('pointerenter', listener, options);
		}

		public static removePointerLeaveListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:EventListenerOptions = null):void {
			target.removeEventListener('pointerleave', listener, options);
		}

		public static removePointerOverListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:EventListenerOptions = null):void {
			target.removeEventListener('pointerover', listener, options);
		}

		public static removePointerOutListener(target:HTMLElement | Window, listener:(event:PointerEvent) => void, options:EventListenerOptions = null):void {
			target.removeEventListener('pointerout', listener, options);
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





		public static getViewportRect(element:Element):{ x:number, y:number, width:number, height:number } {
			const rect = element.getBoundingClientRect();
			return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
		}

		public static geDocumentRect(element:Element):{ x:number, y:number, width:number, height:number } {
			const rect = Dom.getViewportRect(element);
			return { x: rect.x + window.scrollX, y: rect.y + window.scrollY, width: rect.width, height: rect.height };
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private static root:HTMLElement = null;
		private static scrollTween:cmd.Tween = null;
		private static scrollPosition:number;





		private constructor() {
		}
	}
}
