/// <reference path='../index.ts' />

namespace scn {

	import Logger = alm.debug.Logger;
	import LoggerLevel = alm.debug.LoggerLevel;
	import EventDispatcher = alm.event.EventDispatcher;
	import Obj = alm.util.Obj;
	import RootScene = scn.core.RootScene;

	export class SceneManager extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(name:string = '', rootSceneClass:(new (sceneManager:SceneManager) => RootScene) = RootScene) {
			super();
			this.name = name;
			this.root = new rootSceneClass(this);
			this.currentScene = null;

			this.waypoints = [];
			this.waypointIndex = -1;
			this.lastState = SceneState.idling;
			this.eventIndex = -1;
			this.transferId = -1;
			this.transferInfo = null;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public start(message:any = null):void {
			Logger.verbose('----- scene manager start -----');
			this.goto('/', message);
		}

		public goto(path:string, message:any = null):void {
			path = this.resolvePath(path);

			// Return if current destination and new destination is same.
			if (this.transferInfo && this.transferInfo.getDestinationPath() == path) {
				return;
			}

			// Build waypoints
			let newWaypoints:core.Waypoint[] = [];
			if (this.waypointIndex != -1) {
				newWaypoints = this.createWaypoints(this.waypoints[this.waypointIndex].getPath(), path);
			} else {
				// Init
				newWaypoints = [new core.Waypoint('/', 0)];
			}

			// Transfer
			if (newWaypoints.length > 0) {
				const isDestinationChanged:boolean = this.transferInfo != null;

				if (!isDestinationChanged) {
					this.waypointIndex = 0;
					this.eventIndex = 0;
					++this.transferId;
					this.waypoints = newWaypoints;
				} else {
					Logger.verbose('destination is changed');
					Logger.verbose('waypoint index : ' + this.waypointIndex);
					this.waypoints = this.waypoints.slice(0, this.waypointIndex + 1).concat(newWaypoints.slice(1));
					this.setDirection(this.waypoints);
					this.dumpWaypoint(this.waypoints);
				}

				this.transferInfo = new SceneTransferInfo(this.transferId, this.waypoints[this.waypointIndex].getPath(), this.waypoints[this.waypoints.length - 1].getPath(), message);

				if (!isDestinationChanged) {
					this.dispatchEvent(new SceneManagerTransferEvent(SceneManagerTransferEvent.transferStart, this, this.transferInfo));
				}

				this.checkState();
			}
		}

		public resolvePath(path:string):string {
			// Relative to absolute
			if (path[0] != '/') {
				if (this.currentScene) {
					path = this.currentScene.getPath() + '/' + path;
				} else {
					path = '/' + path;
				}
			}

			// Normalize
			const names:string[] = path.split('/');
			const normalized:string[] = [];
			for (let i:number = 0; i < names.length; ++i) {
				const name:string = names[i];
				if (name == '') continue;
				if (name == '.') continue;
				if (name == '..') {
					normalized.pop();
					continue;
				}
				normalized.push(name);
			}

			return '/' + normalized.join('/');
		}

		public addSceneAt(path:string):Scene {
			let success:boolean = false;
			const names:string[] = this.getSceneNamesByPath(path);
			const n:number = names.length;
			let scene:Scene = this.root;
			for (let i:number = 1; i < n; ++i) {
				const name:string = names[i];
				if (i == n - 1) {
					if (scene.contains(name)) {
						Logger.warn('[SceneManager \'' + this.name + '\'] addSceneAt was failed, because path \'' + path + '\' is already exist.');
					} else {
						scene = scene.addChild(new Scene(name));
						success = true;
					}
				} else {
					if (scene.contains(name)) {
						scene = scene.getChildByName(name);
					} else {
						scene = scene.addChild(new Scene(name));
					}
				}
			}
			return success ? scene : null;
		}

		public getName():string {
			return this.name;
		}

		public getRoot():Scene {
			return this.root;
		}

		public getSceneByPath(path:string):Scene {
			return this.getSceneBySceneNames(this.getSceneNamesByPath(path));
		}

		public getParentSceneByPath(path:string):Scene {
			const names:string[] = this.getSceneNamesByPath(path);
			names.pop();
			return this.getSceneBySceneNames(names);
		}

		private getSceneBySceneNames(names:string[]):Scene {
			const n:number = names.length;
			let scene:Scene = this.root;
			for (let i:number = 1; i < n; ++i) {
				scene = scene.getChildByName(names[i]);
			}
			return scene;
		}

		public getSceneNamesByPath(path:string):string[] {
			return path == '/' ? [''] : this.resolvePath(path).split('/');
		}

		public getSceneLevelByNames(names:string[]):number {
			return names.length - 1;
		}

		public getScenePathByNames(names:string[]):string {
			return names.length == 0 ? '/' : names.length == 1 ? ('/' + names[0]) : names.join('/');
		}


		private createWaypoints(departurePath:string, destinationPath:string):core.Waypoint[] {
			if (departurePath == destinationPath) {
				Logger.warn('[SceneManager] departure path and destination path is same, path = \'' + departurePath + '\'');
				return [];
			}

			Logger.verbose('----- scene flow -----');

			const waypoints:core.Waypoint[] = [
				new core.Waypoint(departurePath, this.getSceneLevelByNames(this.getSceneNamesByPath(departurePath)))
			];

			const departureNames:string[] = this.getSceneNamesByPath(departurePath);
			const destinationNames:string[] = this.getSceneNamesByPath(destinationPath);

			Logger.verbose('    path');
			Logger.verbose('        current    : \'' + departurePath + '\'');
			Logger.verbose('        destination: \'' + destinationPath + '\'');

			Logger.verbose('    names');
			Logger.verbose('        current(' + departureNames.length + ')    : \'' + departureNames + '\'');
			Logger.verbose('        destination(' + destinationNames.length + '): \'' + destinationNames + '\'');

			// 折り返しを見つける
			let turningLevel:number = 0;
			let turningNames:string[] = [];
			let turningPath:string;
			if (destinationPath == '/') {
				turningLevel = -1;
				turningNames = [];
				turningPath = '/';
			} else {
				while (true) {
					if (departureNames[turningLevel] == destinationNames[turningLevel]) {
						turningNames.push(departureNames[turningLevel]);
						++turningLevel;
					} else {
						--turningLevel;
						break;
					}
				}
				turningPath = this.getScenePathByNames(turningNames);
			}

			Logger.verbose('    turning');
			Logger.verbose('        path     : ' + turningPath);
			Logger.verbose('        level    : ' + turningLevel);
			Logger.verbose('        names(' + turningNames.length + ') : \'' + turningNames + '\'');

			// 出発シーンから折り返しまで
			{
				const names:string[] = departureNames.concat();
				let prevPath:string = departurePath;
				for (let i:number = departureNames.length - 1; i > turningLevel + 1; --i) {
					names.pop();
					const path:string = this.getScenePathByNames(names);
					if (path != prevPath) {
						const level:number = this.getSceneLevelByNames(names);
						waypoints.push(new core.Waypoint(path, level));
						prevPath = path;
					}
				}
			}

			if (turningPath == destinationPath && turningLevel > 0) {
				// 折り返しと到着シーンが同一
				const from:core.Direction = turningLevel == waypoints[waypoints.length - 1].getLevel() ? core.Direction.Sibling : core.Direction.Ascend;
				waypoints.push(new core.Waypoint(turningPath, turningLevel));
			} else {

				// 折り返しから到達シーンまで
				const names:string[] = turningNames.concat();
				const prev:core.Waypoint = waypoints[waypoints.length - 1];
				let prevPath:string = prev.getPath();
				let prevLevel:number = prev.getLevel();
				for (let i:number = turningLevel + 1; i < destinationNames.length; ++i) {
					const name:string = destinationNames[i];
					names.push(name);
					const path:string = this.getScenePathByNames(names);
					if (path != prevPath) {
						const level:number = this.getSceneLevelByNames(names);
						waypoints.push(new core.Waypoint(path, level));
						prevLevel = level;
						prevPath = path;
					}
				}
			}

			// 進行方向
			this.setDirection(waypoints);

			if (Logger.level <= LoggerLevel.verbose) {
				this.dumpWaypoint(waypoints);
			}

			return waypoints;
		}

		private setDirection(waypoints:core.Waypoint[]):void {
			const n:number = waypoints.length;
			let prev:core.Waypoint = null;
			let point:core.Waypoint;
			for (let i:number = 0; i < n; ++i) {
				point = waypoints[i];
				if (i > 0) {
					const d:number = point.getLevel() - prev.getLevel();
					point._setFrom(d > 0 ? core.Direction.Descend : d < 0 ? core.Direction.Ascend : core.Direction.Sibling);
					prev._setTo(point.getFrom());
				}
				prev = point;
			}
		}

		private dumpWaypoint(waypoints:core.Waypoint[]):void {
			Logger.verbose('    waypoints');
			const n:number = waypoints.length;
			for (let i:number = 0; i < n; ++i) {
				Logger.verbose('        [' + i + '] ' + waypoints[i]);
			}
			Logger.verbose('');
		}

		public dumpAllPath():void {
			Logger.info('----- scene all path -----');
			this._dumpAllPath(this.root);
		}

		private _dumpAllPath(parent:Scene):void {
			const children = parent.getChildrenByName();
			Obj.each(children, (name:string, child:Scene):void => {
				Logger.info(child.getPath());
				this._dumpAllPath(child);
			});
		}





		private checkState():void {
			//trace('lastState : ' + scn.getSceneStateString(this.lastState));

			//trace(this.waypointIndex + ' / ' + this.waypoints.length);

			if (this.waypointIndex >= this.waypoints.length) {
				Logger.verbose('----- scene transfer complete -----');
				const tmpTransferId:number = this.transferInfo.getTransferId();
				this.waypointIndex = this.waypoints.length - 1;
				this.dispatchEvent(new SceneManagerTransferEvent(SceneManagerTransferEvent.transferComplete, this, this.transferInfo));
				if (tmpTransferId == this.transferInfo.getTransferId()) {
					this.lastState = SceneState.idling;
					this.transferInfo = null;
				}
				return;
			}

			if (this.currentScene) {
				const currentWaypoint:core.Waypoint = this.waypoints[this.waypointIndex];
				const currentWaypointPath = currentWaypoint.getPath();
				this.currentScene = this.getSceneByPath(currentWaypointPath);

				if (!this.currentScene) {
					this.dispatchEvent(new SceneManagerRequireSceneEvent(SceneManagerRequireSceneEvent.requireScene, this, currentWaypointPath));
					this.currentScene = this.getSceneByPath(currentWaypointPath);
				}
				if (!this.currentScene) {
					Logger.warn('[SceneManager] scene is null : scene path =', currentWaypointPath);
				}

				// Departure scene
				if (this.waypoints.length > 1 && this.waypointIndex == 0) {
					//trace('Departure scene');

					// Leave
					if (this.lastState != SceneState.leaving && this.currentScene.getLastState() == SceneState.arriving) {
						Logger.verbose(this.eventIndex + ' Leave   : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.leaveComplete, this.sceneLeaveCompleteHandler);
						this.currentScene._leave(this.transferInfo);
						return;
					}

					// Unload
					if (this.lastState != SceneState.unloading && (currentWaypoint.getTo() == core.Direction.Sibling || currentWaypoint.getTo() == core.Direction.Ascend)) {
						++this.waypointIndex;
						Logger.verbose(this.eventIndex + ' Unload  : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.unloadComplete, this.sceneUnloadCompleteHandler);
						this.currentScene._unload(this.transferInfo);
						return;

					} else {
						// Departure to child
						++this.waypointIndex;
						this.checkState();
						return;
					}
				}

				// Through scene
				if (this.waypointIndex > 0 && this.waypointIndex < this.waypoints.length - 1) {
					//trace('Through scene');

					// Load
					if (this.lastState != SceneState.loading && (currentWaypoint.getFrom() == core.Direction.Sibling || currentWaypoint.getFrom() == core.Direction.Descend)) {
						Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.loadComplete, this.sceneLoadCompleteHandler);
						this.currentScene._load(this.transferInfo);
						return;
					}

					// Ascend
					if (this.lastState != SceneState.ascending && currentWaypoint.getFrom() == core.Direction.Ascend) {
						Logger.verbose(this.eventIndex + ' Ascend  : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.ascendComplete, this.sceneAscendCompleteHandler);
						this.currentScene._ascend(this.transferInfo);
						return;
					}

					// Unload
					if (this.lastState != SceneState.unloading && (currentWaypoint.getTo() == core.Direction.Sibling || currentWaypoint.getTo() == core.Direction.Ascend)) {
						++this.waypointIndex;
						Logger.verbose(this.eventIndex + ' Unload  : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.unloadComplete, this.sceneUnloadCompleteHandler);
						this.currentScene._unload(this.transferInfo);
						return;
					}

					// Descend
					if (this.lastState != SceneState.descending && currentWaypoint.getTo() == core.Direction.Descend) {
						++this.waypointIndex;
						Logger.verbose(this.eventIndex + ' Descend : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.descendComplete, this.sceneDescendCompleteHandler);
						this.currentScene._descend(this.transferInfo);
						return;
					}
				}

				// Destination scene
				if (this.waypointIndex == this.waypoints.length - 1) {
					//trace('Destination scene');

					// Load
					if (this.lastState != SceneState.loading && (currentWaypoint.getFrom() == core.Direction.Sibling || currentWaypoint.getFrom() == core.Direction.Descend)) {
						Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.loadComplete, this.sceneLoadCompleteHandler);
						this.currentScene._load(this.transferInfo);
						return;
					}

					// Arrive
					if (this.lastState != SceneState.arriving) {
						++this.waypointIndex;
						Logger.verbose(this.eventIndex + ' Arrive  : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.arriveComplete, this.sceneArriveCompleteHandler);
						this.currentScene._arrive(this.transferInfo);
						return;
					}
				}

			} else {
				//trace('Init scene');

				// Init
				this.lastState = SceneState.idling;
				this.currentScene = this.root;
				Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
				this.currentScene.addEventListener(SceneEvent.loadComplete, this.sceneLoadCompleteHandler);
				this.currentScene._load(this.transferInfo);
			}
		}

		private sceneLoadCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.loadComplete, this.sceneLoadCompleteHandler);
			this.lastState = SceneState.loading;
			++this.eventIndex;
			this.checkState();
		};

		private sceneUnloadCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.unloadComplete, this.sceneUnloadCompleteHandler);
			this.lastState = SceneState.unloading;
			++this.eventIndex;
			this.checkState();
		};

		private sceneArriveCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.arriveComplete, this.sceneArriveCompleteHandler);
			this.lastState = SceneState.arriving;
			++this.eventIndex;
			this.checkState();
		};

		private sceneLeaveCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.leaveComplete, this.sceneLeaveCompleteHandler);
			this.lastState = SceneState.leaving;
			++this.eventIndex;
			this.checkState();
		};

		private sceneAscendCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.ascendComplete, this.sceneAscendCompleteHandler);
			this.lastState = SceneState.ascending;
			++this.eventIndex;
			this.checkState();
		};

		private sceneDescendCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.descendComplete, this.sceneDescendCompleteHandler);
			this.lastState = SceneState.descending;
			++this.eventIndex;
			this.checkState();
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private name:string;
		private root:Scene;
		private currentScene:Scene;

		private waypoints:core.Waypoint[];
		private waypointIndex:number;
		private lastState:SceneState;
		private eventIndex:number;
		private transferInfo:SceneTransferInfo;
		private transferId:number;
	}
}
