/// <reference path="../../index.ts" />

namespace alm.drawer {

	import DrawerContainer = alm.drawer.view.DrawerContainer;

	export class Drawer {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(content:JQuery, drawerId:string = 'drawer') {
			this.container = new DrawerContainer(content, drawerId);
			this.container.ready();

			(<any>window).openDrawer = this.container.show.bind(this.container);
			(<any>window).closeDrawer = this.container.hide.bind(this.container);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public open(useTransition:boolean):void {
			this.container.show(useTransition);
		}

		public close(useTransition:boolean):void {
			this.container.hide(useTransition);
		}

		public dispose():void {
			this.container.finalize();
			this.container = null;

			delete (<any>window).openDrawer;
			delete (<any>window).closeDrawer;
		}

		public getView():JQuery {
			return this.container.getView();
		}

		public getContentView():JQuery {
			return this.container.getContent();
		}

		public getDrawerId():string {
			return this.getDrawerId();
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private container:DrawerContainer;
	}
}
