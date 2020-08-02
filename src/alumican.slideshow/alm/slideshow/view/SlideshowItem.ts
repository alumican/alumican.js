/// <reference path="../../../index.ts" />

namespace alm.drawer.view {

	import View = alm.view.View;
	import Easing = alm.math.Easing;
	import TweenCSS = alm.util.TweenCSS;

	export class SlideshowItem extends View<JQuery> {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(content:JQuery) {
			super(content);
			this.content = content;
			this.initialize();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implInitialize():JQuery {
			const view = jQuery('<div>');
			view.addClass('slideshow-item');

			this.transitionDuration = 1000;

			return view;
		}

		protected implReady():void {
		}

		protected implFinalize():void {
		}

		protected implShow(view:JQuery, useTransition:boolean):cmd.Command {
			return TweenCSS.fadeIn(view, useTransition ? 1000 : 0, Easing.linear, 'block', true, false);
		}

		protected implHide(view:JQuery, useTransition:boolean):cmd.Command {
			return TweenCSS.fadeOut(view, useTransition ? 1000 : 0, Easing.linear, false, true, false);
		}





		public getTransitionDuration():number {
			return this.transitionDuration;
		}

		public setTransitionDuration(duration:number):void {
			this.transitionDuration = duration;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private content:JQuery;
		private transitionDuration:number;
	}
}
