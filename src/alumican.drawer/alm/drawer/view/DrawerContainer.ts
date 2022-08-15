/// <reference path="../../../index.ts" />

namespace alm.drawer.view {

	import View = alm.view.View;

	export class DrawerContainer extends View<JQuery> {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(content:JQuery, transition:DrawerTransition, drawerId:string = 'drawer') {
			super(content);

			this.content = content;
			this.transition = transition;
			this.drawerId = drawerId;

			this.initialize();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implInitialize():JQuery {
			const view:JQuery = jQuery('<div>');
			view.attr('id', this.drawerId);
			view.addClass('drawer');

			this.background = new DrawerBackground(this.transition);
			this.foreground = new DrawerForeground(this.content, this.transition);

			return view;
		}

		protected implReady():void {
			const view = this.getView();

			this.background.ready();
			view.append(this.background.getView());

			this.foreground.ready();
			view.append(this.foreground.getView());

			jQuery('body').append(view);
		}

		protected implFinalize():void {
			this.background.finalize();
			this.background = null;

			this.foreground.finalize();
			this.foreground = null;

			this.content = null;
		}

		protected implShow(view:JQuery, useTransition:boolean):cmd.Command {
			return new cmd.Serial(
				new cmd.Func(():void => {
					view.css('display', 'block');
				}),
				new cmd.Parallel(
					this.background.getShowCommand(useTransition),
					this.foreground.getShowCommand(useTransition),
				)
			);
		}

		protected implHide(view:JQuery, useTransition:boolean):cmd.Command {
			return new cmd.Serial(
				new cmd.Parallel(
					this.background.getHideCommand(useTransition),
					this.foreground.getHideCommand(useTransition),
				),
				new cmd.Func(():void => {
					view.css('display', 'none');
				})
			);
		}

		public getContent():JQuery {
			return this.content;
		}

		public getDrawerId():string {
			return this.drawerId;
		}

		public setBackgroundCustomTransition(showCommand:cmd.Serial, hideCommand:cmd.Serial):void {
			this.background.setCustomTransition(showCommand, hideCommand);
		}

		public setForegroundCustomTransition(showCommand:cmd.Serial, hideCommand:cmd.Serial):void {
			this.foreground.setCustomTransition(showCommand, hideCommand);
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private background:DrawerBackground;
		private foreground:DrawerForeground;

		private content:JQuery;
		private transition:DrawerTransition;
		private drawerId:string;
	}
}
