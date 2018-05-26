/* ---------- project ---------- */
/// <reference path="alm/util/Easing.ts" />
/// <reference path="alm/event/Event.ts" />
/// <reference path="alm/event/EventDispatcher.ts" />

/// <reference path="cmd/CommandState.ts" />
/// <reference path="cmd/CommandEvent.ts" />
/// <reference path="cmd/Command.ts" />
/// <reference path="cmd/CommandList.ts" />
/// <reference path="cmd/Break.ts" />
/// <reference path="cmd/Return.ts" />
/// <reference path="cmd/Log.ts" />
/// <reference path="cmd/Wait.ts" />
/// <reference path="cmd/Func.ts" />
/// <reference path="cmd/Listen.ts" />
/// <reference path="cmd/Tween.ts" />
/// <reference path="cmd/Serial.ts" />
/// <reference path="cmd/Parallel.ts" />

/// <reference path="alm/geom/Vector2.ts" />
/// <reference path="alm/geom/Vector3.ts" />
/// <reference path="alm/geom/Rectangle.ts" />
/// <reference path="alm/util/Hash.ts" />
/// <reference path="alm/util/Arr.ts" />
/// <reference path="alm/util/Num.ts" />
/// <reference path="alm/util/Str.ts" />
/// <reference path="alm/util/Loc.ts" />
/// <reference path="alm/util/Boxer.ts" />
/// <reference path="alm/util/Raffle.ts" />
/// <reference path="alm/util/Rotator.ts" />
/// <reference path="alm/util/Logger.ts" />
/// <reference path="alm/util/Timer.ts" />
/// <reference path="alm/util/TimerEvent.ts" />
/// <reference path="alm/util/JQueryUtil.ts" />
/// <reference path="alm/util/CommandUtil.ts" />
/// <reference path="alm/loader/AssetLoader.ts" />
/// <reference path="alm/loader/AssetLoaderEvent.ts" />
/// <reference path="alm/view/View.ts" />
/// <reference path="alm/browser/DeviceInfo.ts" />
/// <reference path="alm/browser/LocalStorage.ts" />
/// <reference path="alm/browser/KeyWatcher.ts" />
/// <reference path="alm/browser/KeyWatcherEvent.ts" />
/// <reference path="alm/browser/WindowWatcher.ts" />
/// <reference path="alm/browser/WindowWatcherEvent.ts" />

/// <reference path="scn/Scene.ts" />
/// <reference path="scn/SceneEvent.ts" />
/// <reference path="scn/SceneManager.ts" />
/// <reference path="scn/SceneManagerEvent.ts" />
/// <reference path="scn/SceneTransferInfo.ts" />
/// <reference path="scn/SceneState.ts" />
/// <reference path="scn/core/Direction.ts" />
/// <reference path="scn/core/RootScene.ts" />
/// <reference path="scn/core/Waypoint.ts" />


namespace alm {

	// Library version info
	export function getVersion():string {
		return "0.0.1";
	}

	// Credit info
	const style:string = "color:#999;";
	const print:Function = console.debug;
	print("%c+ + + + + + + + + + + + + + + + + + + + + + + + + +", style);
	print("%c+ alumican.js", style);
	print("%c+ version " + getVersion(), style);
	print("%c+ http://alumican.net", style);
	print("%c+ https://github.com/alumican/alumican.js", style);
	print("%c+ + + + + + + + + + + + + + + + + + + + + + + + + +", style);
	print("");
}