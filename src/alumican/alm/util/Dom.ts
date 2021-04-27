/// <reference path='../../index.ts' />

namespace alm.util {

	import Easing = alm.math.Easing;

	export class Dom {

		public static instantiate(templateId: string, removeId: boolean = true): HTMLElement {
			const element = <HTMLElement>document.getElementById(templateId).cloneNode(true);
			if (removeId) {
				element.removeAttribute('id');
			}
			return element;
		}





		public static addPointerDownListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void): void {
			target.addEventListener('pointerdown', listener);
		}

		public static addPointerMoveListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void): void {
			target.addEventListener('pointermove', listener);
		}

		public static addPointerUpListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void): void {
			target.addEventListener('pointerup', listener);
		}

		public static removePointerDownListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void): void {
			target.removeEventListener('pointerdown', listener);
		}

		public static removePointerMoveListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void): void {
			target.removeEventListener('pointermove', listener);
		}

		public static removePointerUpListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void): void {
			target.removeEventListener('pointerup', listener);
		}





		public static addRootClass(value: string): void {
			if (Dom.htmlElement === null) {
				Dom.htmlElement = document.documentElement;
			}
			Dom.htmlElement.classList.add(value);
		}

		public static removeRootClass(value: string): void {
			if (Dom.htmlElement === null) {
				Dom.htmlElement = document.documentElement;
			}
			Dom.htmlElement.classList.remove(value);
		}

		public static addRootAttribute(key: string, value: string): void {
			if (Dom.htmlElement === null) {
				Dom.htmlElement = document.documentElement;
			}
			Dom.htmlElement.setAttribute(key, value);
		}

		public static removeRootAttribute(key: string, value: string): void {
			if (Dom.htmlElement === null) {
				Dom.htmlElement = document.documentElement;
			}
			Dom.htmlElement.removeAttribute(key);
		}





		public static scrollTo(scrollTop: number, useTransition: boolean = true): void {
			Dom.scrollTween = Cmd.stop(Dom.scrollTween);
			if (useTransition) {
				Dom.scrollTween = new cmd.Tween(Dom, {scrollPosition: scrollTop}, null, 1000, Easing.easeOutQuart, null, (): void => {
					Dom.applyScrollPosition();
				});
				Dom.scrollTween.execute();
			} else {
				Dom.scrollPosition = scrollTop;
				Dom.applyScrollPosition();
			}
		}

		private static applyScrollPosition(): void {
			window.scroll(0, Dom.scrollPosition);
		}





		public static setupSmoothAnchorLink(): void {
			const tags = document.getElementsByTagName('a');
			const tagCount = tags.length;
			for (let i = 0; i < tagCount; ++i) {
				Dom.setAnchorLinkAction(tags.item(i));
			}
		}

		private static setAnchorLinkAction(tag: HTMLElement): void {
			const href = tag.getAttribute('href');
			if ((href.indexOf('#')) == 0 && !tag.hasAttribute('data-smooth-anchor-target')) {
				tag.setAttribute('data-smooth-anchor-target', href.slice(1));
				tag.setAttribute('href', 'javascript:void(0)');
				tag.addEventListener('click', Dom.anchorLinkClickHandler);
			}
		}

		private static anchorLinkClickHandler = (event: MouseEvent): void => {
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

		private static htmlElement: HTMLElement = null;
		private static scrollTween: cmd.Tween = null;
		private static scrollPosition: number;





		private constructor() {
		}
	}
}
