/// <reference path="../reference.ts" />

namespace alm {

	export abstract class View<T> extends cmd.EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(view:T = null) {
			super();
			this.view = view;
			this.isInitializing = false;
			this.isInitialized = false;
			this.isReady = false;
			this.isShowing = false;
			this.isShown = true;
			this.isHiding = false;
			this.autoHideWithInit = true;
			this.name = "";
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
			throwError(this.name || this, "view is null", !this.view);
			this.hide(false);
			this.isInitializing = false;
			this.isInitialized = true;
		}

		public ready():void {
			if (this.isReady) return;
			throwError(this.name || this, "ready() was called without being initialized", !this.isInitialized);
			this.implReady();
			this.isReady = true;
		}

		public finalize():void {
			this.implFinalize();
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
					throwError(this.name || this, "getShowCommand() was called without being initialized", !this.isInitialized);
					throwWarn(this.name || this, "getShowCommand() was called without being ready", !this.isReady);
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
						throwError(this.name || this, "getHideCommand() was called without being initialized", !this.isInitialized);
						throwWarn(this.name || this, "getHideCommand() was called without being ready", !this.isReady);
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

		protected abstract implInitialize():T;
		protected abstract implReady():void;
		protected abstract implFinalize():void;
		protected abstract implShow(view:T, useTransition:boolean):cmd.Command;
		protected abstract implHide(view:T, useTransition:boolean):cmd.Command;





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public getIsInitializing():boolean { return this.isInitializing; }
		private isInitializing:boolean;

		public getIsInitialized():boolean { return this.isInitialized; }
		private isInitialized:boolean;

		public getIsReady():boolean { return this.isReady; }
		private isReady:boolean;

		public getIsShowing():boolean { return this.isShowing; }
		private isShowing:boolean;

		public getIsShown():boolean { return this.isShown; }
		private isShown:boolean;

		public getIsHiding():boolean { return this.isHiding; }
		private isHiding:boolean;

		public getIsHidden():boolean { return !this.isShown; }

		public getView():T { return this.view; }
		private view:T;

		public getAutoHideWithInit():boolean { return this.autoHideWithInit; }
		public setAutoHideWithInit(value:boolean):void { this.autoHideWithInit = value; }
		private autoHideWithInit:boolean;

		public getName():string { return this.name; }
		public setName(value:string):void { this.name = value; }
		private name:string;

		private showCommand:cmd.Command;
		private hideCommand:cmd.Command;
	}
}