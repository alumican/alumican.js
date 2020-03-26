/// <reference path='../include.ts' />

namespace scn {

	import Logger = alm.debug.Logger;
	import LoggerLevel = alm.debug.LoggerLevel;
	import EventDispatcher = alm.event.EventDispatcher;

	export class SceneManager extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(name:string = '') {
			super();
			this.name = name;
			this.root = new core.RootScene(this);
			this.currentScene = null;

			this.waypoints = [];
			this.waypointIndex = -1;
			this.lastState = SceneState.Idling;
			this.eventIndex = -1;
			this.transferId = -1;
			this.transferInfo = null;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public start():void {
			Logger.verbose('----- scene manager start -----');
			this.goto('/');
		}

		public goto(path:string):void {
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
					this.printWaypoint(this.waypoints);
				}

				this.transferInfo = new SceneTransferInfo(this.transferId, this.waypoints[this.waypointIndex].getPath(), this.waypoints[this.waypoints.length - 1].getPath());

				if (!isDestinationChanged) {
					this.dispatchEvent(new SceneManagerEvent(SceneManagerEvent.TRANSFER_START, this));
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

		public addSceneAt(path:string, createScene:boolean = false):Scene {
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
			const names:string[] = this.getSceneNamesByPath(path);
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

			if (Logger.level <= LoggerLevel.Verbose) {
				this.printWaypoint(waypoints);
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

		private printWaypoint(waypoints:core.Waypoint[]):void {
			Logger.verbose('    waypoints');
			const n:number = waypoints.length;
			for (let i:number = 0; i < n; ++i) {
				Logger.verbose('        [' + i + '] ' + waypoints[i]);
			}
			Logger.verbose('');
		}





		private checkState():void {
			trace('lastState : ' + scn.getSceneStateString(this.lastState));

			//trace(this.waypointIndex + ' / ' + this.waypoints.length);

			if (this.waypointIndex >= this.waypoints.length) {
				Logger.verbose('----- scene transfer complete -----');
				const tmpTransferId:number = this.transferInfo.getTransferId();
				this.waypointIndex = this.waypoints.length - 1;
				this.dispatchEvent(new SceneManagerEvent(SceneManagerEvent.TRANSFER_COMPLETE, this));
				if (tmpTransferId == this.transferInfo.getTransferId()) {
					this.lastState = SceneState.Idling;
					this.transferInfo = null;
				}
				return;
			}

			if (this.currentScene) {
				const currentWaypoint:core.Waypoint = this.waypoints[this.waypointIndex];
				this.currentScene = this.getSceneByPath(currentWaypoint.getPath());

				// Departure scene
				if (this.waypoints.length > 1 && this.waypointIndex == 0) {
					trace('Departure scene');

					// Leave
					if (this.lastState != SceneState.Leaving && this.currentScene.getLastState() == SceneState.Arriving) {
						Logger.verbose(this.eventIndex + ' Leave   : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.LEAVE_COMPLETE, this.sceneLeaveCompleteHandler);
						this.currentScene._leave(this.transferInfo);
						return;
					}

					// Unload
					if (this.lastState != SceneState.Unloading && (currentWaypoint.getTo() == core.Direction.Sibling || currentWaypoint.getTo() == core.Direction.Ascend)) {
						++this.waypointIndex;
						Logger.verbose(this.eventIndex + ' Unload  : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.UNLOAD_COMPLETE, this.sceneUnloadCompleteHandler);
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
					trace('Through scene');

					// Load
					if (this.lastState != SceneState.Loading && (currentWaypoint.getFrom() == core.Direction.Sibling || currentWaypoint.getFrom() == core.Direction.Descend)) {
						Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.LOAD_COMPLETE, this.sceneLoadCompleteHandler);
						this.currentScene._load(this.transferInfo);
						return;
					}

					// Ascend
					if (this.lastState != SceneState.Ascending && currentWaypoint.getFrom() == core.Direction.Ascend) {
						Logger.verbose(this.eventIndex + ' Ascend  : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.ASCEND_COMPLETE, this.sceneAscendCompleteHandler);
						this.currentScene._ascend(this.transferInfo);
						return;
					}

					// Unload
					if (this.lastState != SceneState.Unloading && (currentWaypoint.getTo() == core.Direction.Sibling || currentWaypoint.getTo() == core.Direction.Ascend)) {
						++this.waypointIndex;
						Logger.verbose(this.eventIndex + ' Unload  : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.UNLOAD_COMPLETE, this.sceneUnloadCompleteHandler);
						this.currentScene._unload(this.transferInfo);
						return;
					}

					// Descend
					if (this.lastState != SceneState.Descending && currentWaypoint.getTo() == core.Direction.Descend) {
						++this.waypointIndex;
						Logger.verbose(this.eventIndex + ' Descend : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.DESCEND_COMPLETE, this.sceneDescendCompleteHandler);
						this.currentScene._descend(this.transferInfo);
						return;
					}
				}

				// Destination scene
				if (this.waypointIndex == this.waypoints.length - 1) {
					trace('Destination scene');

					// Load
					if (this.lastState != SceneState.Loading && (currentWaypoint.getFrom() == core.Direction.Sibling || currentWaypoint.getFrom() == core.Direction.Descend)) {
						Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.LOAD_COMPLETE, this.sceneLoadCompleteHandler);
						this.currentScene._load(this.transferInfo);
						return;
					}

					// Arrive
					if (this.lastState != SceneState.Arriving) {
						++this.waypointIndex;
						Logger.verbose(this.eventIndex + ' Arrive  : \'' + this.currentScene.getPath() + '\'');
						this.currentScene.addEventListener(SceneEvent.ARRIVE_COMPLETE, this.sceneArriveCompleteHandler);
						this.currentScene._arrive(this.transferInfo);
						return;
					}
				}

			} else {
				trace('Init scene');

				// Init
				this.lastState = SceneState.Idling;
				this.currentScene = this.root;
				Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
				this.currentScene.addEventListener(SceneEvent.LOAD_COMPLETE, this.sceneLoadCompleteHandler);
				this.currentScene._load(this.transferInfo);
			}
		}

		private sceneLoadCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.LOAD_COMPLETE, this.sceneLoadCompleteHandler);
			this.lastState = SceneState.Loading;
			++this.eventIndex;
			this.checkState();
		};

		private sceneUnloadCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.UNLOAD_COMPLETE, this.sceneUnloadCompleteHandler);
			this.lastState = SceneState.Unloading;
			++this.eventIndex;
			this.checkState();
		};

		private sceneArriveCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.ARRIVE_COMPLETE, this.sceneArriveCompleteHandler);
			this.lastState = SceneState.Arriving;
			++this.eventIndex;
			this.checkState();
		};

		private sceneLeaveCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.LEAVE_COMPLETE, this.sceneLeaveCompleteHandler);
			this.lastState = SceneState.Leaving;
			++this.eventIndex;
			this.checkState();
		};

		private sceneAscendCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.ASCEND_COMPLETE, this.sceneAscendCompleteHandler);
			this.lastState = SceneState.Ascending;
			++this.eventIndex;
			this.checkState();
		};

		private sceneDescendCompleteHandler = (event:SceneEvent):void => {
			this.currentScene.removeEventListener(SceneEvent.DESCEND_COMPLETE, this.sceneDescendCompleteHandler);
			this.lastState = SceneState.Descending;
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