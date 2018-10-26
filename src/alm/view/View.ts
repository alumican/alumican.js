/// <reference path="../../reference.ts" />

namespace alm.view {

	import EventDispatcher = alm.event.EventDispatcher;

	export abstract class View<T = any> extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(view:T = null) {
			super();
			this.id = View.id;
			this.view = view;
			this.name = "";
			this.autoHideWithInit = true;
			this.isInitializing = false;
			this.isInitialized = false;
			this.isReadying = false;
			this.isReadied = false;
			this.isShowing = false;
			this.isShown = true;
			this.isHiding = false;

			View.viewsById[View.id] = this;
			++View.id;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public initialize():void {
			if (this.isInitializing || this.isInitialized) return;
			this.isInitializing = true;
			this.view = this.implInitialize();
			if (this.isInitializing) {
				throwError(this.name || this, "view is null", !this.view);
				this.hide(false);
				this.isInitializing = false;
				this.isInitialized = true;
			} else {
				// finalized while initializing
				this.view = null;
			}
		}

		public ready():void {
			if (this.isReadying || this.isReadied) return;
			this.isReadying = true;
			throwError(this.name || this, "ready() was called without being initialized", !this.isInitialized);
			this.implReady();
			this.isReadying = false;
			this.isReadied = true;
		}

		public finalize():void {
			if (!this.isInitializing && !this.isInitialized) return;
			this.implFinalize();
			this.isInitializing = false;
			this.isInitialized = false;
		}

		public show(useTransition:boolean = true):void {
			if (this.isShown) return;
			this.getShowCommand(useTransition).execute();
		}

		public hide(useTransition:boolean = true):void {
			if (!this.isShown) return;
			this.getHideCommand(useTransition).execute();
		}

		public getShowCommand(useTransition:boolean = true):cmd.Command {
			const command:cmd.Serial = new cmd.Serial();
			command.addCommand(
				new cmd.Func(():void => {
					if (this.isShown) return;
					throwError(this.name || this, "getShowCommand() was called without being initialized", this.isInitializing || !this.isInitialized);
					throwWarn(this.name || this, "getShowCommand() was called without being ready", this.isReadying|| !this.isReadied);
					this.isShown = true;
					this.isShowing = true;
					this.isHiding = false;

					if (this.showCommand) {
						this.showCommand.interrupt();
						this.showCommand = null;
					}
					if (this.hideCommand) {
						this.hideCommand.interrupt();
						this.hideCommand = null;
					}

					this.showCommand = command;
					command.insertCommand(
						this.implShow(this.view, useTransition),
						new cmd.Func(():void => {
							this.showCommand = null;
							this.isShowing = false;
						})
					);
				})
			);
			return command;
		}

		public getHideCommand(useTransition:boolean = true):cmd.Command {
			const command:cmd.Serial = new cmd.Serial();
			command.addCommand(
				new cmd.Func(():void => {
					if (!this.isShown) return;
					if (!this.isInitializing) {
						throwError(this.name || this, "getHideCommand() was called without being initialized", this.isInitializing || !this.isInitialized);
						throwWarn(this.name || this, "getHideCommand() was called without being ready", this.isReadying || !this.isReadied);
					}
					this.isShown = false;
					this.isShowing = false;
					this.isHiding = true;

					if (this.showCommand) {
						this.showCommand.interrupt();
						this.showCommand = null;
					}
					if (this.hideCommand) {
						this.hideCommand.interrupt();
						this.hideCommand = null;
					}

					this.hideCommand = command;
					command.insertCommand(
						this.implHide(this.view, useTransition),
						new cmd.Func(():void => {
							this.hideCommand = null;
							this.isHiding = false;
						})
					);
				})
			);
			return command;
		}

		public getIsInitializing():boolean {
			return this.isInitializing;
		}

		public getIsInitialized():boolean {
			return this.isInitialized;
		}

		public getIsReadying():boolean {
			return this.isReadying;
		}

		public getIsReadied():boolean {
			return this.isReadied;
		}

		public getIsShowing():boolean {
			return this.isShowing;
		}

		public getIsShown():boolean {
			return this.isShown;
		}

		public getIsHiding():boolean {
			return this.isHiding;
		}

		public getIsHidden():boolean {
			return !this.isShown;
		}

		public getId():number {
			return this.id;
		}

		public getView():T {
			return this.view;
		}

		public getName():string {
			return this.name;
		}

		public setName(value:string):void {
			this.name = value;
		}

		public getAutoHideWithInit():boolean {
			return this.autoHideWithInit;
		}

		public setAutoHideWithInit(value:boolean):void {
			this.autoHideWithInit = value;
		}





		protected abstract implInitialize():T;
		protected abstract implReady():void;
		protected abstract implFinalize():void;
		protected abstract implShow(view:T, useTransition:boolean):cmd.Command;
		protected abstract implHide(view:T, useTransition:boolean):cmd.Command;





		public static getViewById(id:number):View {
			return View.viewsById[id];
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private id:number;
		private view:T;
		private name:string;
		private autoHideWithInit:boolean;
		private showCommand:cmd.Command;
		private hideCommand:cmd.Command;
		private isInitializing:boolean;
		private isInitialized:boolean;
		private isReadying:boolean;
		private isReadied:boolean;
		private isShowing:boolean;
		private isShown:boolean;
		private isHiding:boolean;

		private static id:number = 0;
		private static viewsById:util.Hash<View> = {};
	}
}