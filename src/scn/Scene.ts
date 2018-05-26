/// <reference path="../reference.ts" />

namespace scn {

	import Logger = alm.util.Logger;
	import EventDispatcher = alm.event.EventDispatcher;

	export class Scene extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(name:string) {
			super();
			this.name = name;
			this.state = SceneState.Idling;
			this.parent = null;
			this.childrenByName = {};
			this.numChildren = 0;
			this.isEntered = false;
			this.onLoad = null;
			this.onUnload = null;
			this.onArrive = null;
			this.onLeave = null;
			this.onAscend = null;
			this.onDescend = null;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public addChild(child:Scene):Scene {
			if (child) {
				const childName:string = child.name;
				if (this.childrenByName[childName]) {
					Logger.warn("[Scene '" + this.name + "'] addChild was failed, because child name '" + childName + "' is already contained.");
				} else {
					++this.numChildren;
					child.parent = this;
					this.childrenByName[childName] = child;
					return child;
				}
			} else {
				Logger.warn("[Scene '" + this.name + "'] addChild was failed, because child is null.");
			}
			return null;
		}

		public removeChild(child:Scene):Scene {
			if (child) {
				const childName:string = child.name;
				if (this.childrenByName[childName]) {
					--this.numChildren;
					child.parent = null;
					delete this.childrenByName[childName];
					return child;
				} else {
					Logger.warn("[Scene '" + this.name + "'] removeChild was failed, because child name '" + childName + "' is not contained.");
				}
			} else {
				Logger.warn("[Scene '" + this.name + "'] removeChild was failed, because child is null.");
			}
			return null;
		}

		public addChildren(children:Scene[]):Scene[] {
			const addedChildren:Scene[] = [];
			const n:number = children.length;
			let c:Scene;
			for (let i:number = 0; i < n; ++i) {
				c = this.addChild(children[i]);
				if (c) {
					addedChildren.push(c);
				}
			}
			return addedChildren;
		}

		public removeChildren(children:Scene[]):Scene[] {
			const removedChildren:Scene[] = [];
			const n:number = children.length;
			let c:Scene;
			for (let i:number = 0; i < n; ++i) {
				c = this.removeChild(children[i]);
				if (c) {
					removedChildren.push(c);
				}
			}
			return removedChildren;
		}

		public removeAllChildren():Scene[] {
			const children:Scene[] = [];
			let child:Scene;
			for (let name in this.childrenByName) {
				child = this.childrenByName[name];
				child.parent = null;
				children.push(child);
			}
			this.childrenByName = {};
			this.numChildren = 0;
			return children;
		}

		public contains(child:Scene|string):boolean {
			if (child) {
				return this.childrenByName[typeof child == "string" ? child : child.name] != null;
			} else {
				return false;
			}
		}

		public getName():string {
			return this.name;
		}

		public getState():SceneState {
			return this.state;
		}

		public getLastState():SceneState {
			return this.lastState;
		}

		public getParent():Scene {
			return this.parent;
		}

		public getChildByName(name:string):Scene {
			return this.childrenByName[name];
		}

		public getNumChildren():number {
			return this.numChildren;
		}

		public getManager():SceneManager {
			if (this.parent) {
				return this.parent.getManager();
			} else {
				Logger.warn("[Scene '" + this.name + "'] getManager was failed, check whether if scene is connected to root.");
			}
			return null;
		}

		public getPath():string {
			const manager:SceneManager = this.getManager();
			if (manager) {
				const names:string[] = [this.name];
				let scene:Scene = this;
				while (scene = scene.parent) {
					names.unshift(scene.name);
				}
				return manager.getScenePathByNames(names);
			} else {
				Logger.warn("[Scene '" + this.name + "'] getPath was failed, check whether if scene is connected to root.");
			}
			return null;
		}

		public gotoScene(path:string):void {
			this.getManager().goto(path);
		}





		public _load(transferInfo:SceneTransferInfo):void {
			this.transferInfo = transferInfo;
			this.state = SceneState.Loading;
			this.isEntered = true;
			const command:cmd.Serial = new cmd.Serial(
				():void => {
					this.dispatchEvent(new SceneEvent(SceneEvent.LOAD, this));
					const c:cmd.Command = typeof(this.onLoad) == "function" ? this.onLoad() : this.implOnLoad();
					if (c) command.insertCommand(c);
				},
				():void => {
					this.lastState = this.state;
					this.state = SceneState.Idling;
					this.dispatchEvent(new SceneEvent(SceneEvent.LOAD_COMPLETE, this));
				}
			);
			command.execute();
		}

		public _unload(transferInfo:SceneTransferInfo):void {
			this.transferInfo = transferInfo;
			this.state = SceneState.Unloading;
			this.isEntered = false;
			const command:cmd.Serial = new cmd.Serial(
				():void => {
					this.dispatchEvent(new SceneEvent(SceneEvent.UNLOAD, this));
					const c:cmd.Command = typeof(this.onUnload) == "function" ? this.onUnload() : this.implOnUnload();
					if (c) command.insertCommand(c);
				},
				():void => {
					this.lastState = this.state;
					this.state = SceneState.Idling;
					this.dispatchEvent(new SceneEvent(SceneEvent.UNLOAD_COMPLETE, this));
				}
			);
			command.execute();
		}

		public _arrive(transferInfo:SceneTransferInfo):void {
			this.transferInfo = transferInfo;
			this.state = SceneState.Arriving;
			this.isEntered = true;
			const command:cmd.Serial = new cmd.Serial(
				():void => {
					this.dispatchEvent(new SceneEvent(SceneEvent.ARRIVE, this));
					const c:cmd.Command = typeof(this.onArrive) == "function" ? this.onArrive() : this.implOnArrive();
					if (c) command.insertCommand(c);
				},
				():void => {
					this.lastState = this.state;
					this.state = SceneState.Idling;
					this.dispatchEvent(new SceneEvent(SceneEvent.ARRIVE_COMPLETE, this));
				}
			);
			command.execute();
		}

		public _leave(transferInfo:SceneTransferInfo):void {
			this.transferInfo = transferInfo;
			this.state = SceneState.Leaving;
			this.isEntered = false;
			const command:cmd.Serial = new cmd.Serial(
				():void => {
					this.dispatchEvent(new SceneEvent(SceneEvent.LEAVE, this));
					const c:cmd.Command = typeof(this.onLeave) == "function" ? this.onLeave() : this.implOnLeave();
					if (c) command.insertCommand(c);
				},
				():void => {
					this.lastState = this.state;
					this.state = SceneState.Idling;
					this.dispatchEvent(new SceneEvent(SceneEvent.LEAVE_COMPLETE, this));
				}
			);
			command.execute();
		}

		public _ascend(transferInfo:SceneTransferInfo):void {
			this.transferInfo = transferInfo;
			this.state = SceneState.Ascending;
			this.isEntered = true;
			const command:cmd.Serial = new cmd.Serial(
				():void => {
					this.dispatchEvent(new SceneEvent(SceneEvent.ASCEND, this));
					const c:cmd.Command = typeof(this.onAscend) == "function" ? this.onAscend() : this.implOnAscend();
					if (c) command.insertCommand(c);
				},
				():void => {
					this.lastState = this.state;
					this.state = SceneState.Idling;
					this.dispatchEvent(new SceneEvent(SceneEvent.ASCEND_COMPLETE, this));
				}
			);
			command.execute();
		}

		public _descend(transferInfo:SceneTransferInfo):void {
			this.transferInfo = transferInfo;
			this.state = SceneState.Descending;
			this.isEntered = false;
			const command:cmd.Serial = new cmd.Serial(
				():void => {
					this.dispatchEvent(new SceneEvent(SceneEvent.DESCEND, this));
					const c:cmd.Command = typeof(this.onDescend) == "function" ? this.onDescend() : this.implOnDescend();
					if (c) command.insertCommand(c);
				},
				():void => {
					this.lastState = this.state;
					this.state = SceneState.Idling;
					this.dispatchEvent(new SceneEvent(SceneEvent.DESCEND_COMPLETE, this));
				}
			);
			command.execute();
		}





		protected implOnLoad():cmd.Command {
			return new cmd.Command();
		}

		protected implOnUnload():cmd.Command {
			return new cmd.Command();
		}

		protected implOnArrive():cmd.Command {
			return new cmd.Command();
		}

		protected implOnLeave():cmd.Command {
			return new cmd.Command();
		}

		protected implOnAscend():cmd.Command {
			return new cmd.Command();
		}

		protected implOnDescend():cmd.Command {
			return new cmd.Command();
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		// The callback function is called preferentially over the override
		public onLoad:() => cmd.Command;
		public onUnload:() => cmd.Command;
		public onArrive:() => cmd.Command;
		public onLeave:() => cmd.Command;
		public onAscend:() => cmd.Command;
		public onDescend:() => cmd.Command;

		private isEntered:boolean;
		private name:string;
		private state:SceneState;
		private lastState:SceneState;
		private parent:Scene;
		private childrenByName:alm.Hash<Scene>;
		private numChildren:number;
		private transferInfo:SceneTransferInfo;
	}
}