/* ---------- project dependencies ---------- */


/* ---------- project scripts ---------- */

/// <reference path='alm/util/Time.ts' />
/// <reference path='alm/math/Easing.ts' />
/// <reference path='alm/browser/QueryString.ts' />

/// <reference path='alm/debug/Logger.ts' />
/// <reference path='alm/debug/FpsMonitor.ts' />

/// <reference path='alm/event/Event.ts' />
/// <reference path='alm/event/EventListener.ts' />
/// <reference path='alm/event/EventDispatcher.ts' />
/// <reference path='alm/event/IEventDispatcher.ts' />

/// <reference path='cmd/CommandState.ts' />
/// <reference path='cmd/CommandEvent.ts' />
/// <reference path='cmd/Command.ts' />
/// <reference path='cmd/CommandList.ts' />
/// <reference path='cmd/Break.ts' />
/// <reference path='cmd/Return.ts' />
/// <reference path='cmd/Log.ts' />
/// <reference path='cmd/Wait.ts' />
/// <reference path='cmd/Func.ts' />
/// <reference path='cmd/Listen.ts' />
/// <reference path='cmd/Tween.ts' />
/// <reference path='cmd/If.ts' />
/// <reference path='cmd/Serial.ts' />
/// <reference path='cmd/Parallel.ts' />

/// <reference path='alm/geom/Vector2.ts' />
/// <reference path='alm/geom/Vector3.ts' />
/// <reference path='alm/geom/Rectangle.ts' />
/// <reference path='alm/geom/Boxer.ts' />

/// <reference path='alm/util/Hash.ts' />
/// <reference path='alm/util/Obj.ts' />
/// <reference path='alm/util/Arr.ts' />
/// <reference path='alm/util/Num.ts' />
/// <reference path='alm/util/Str.ts' />
/// <reference path='alm/util/Cmd.ts' />
/// <reference path='alm/util/Dom.ts' />
/// <reference path='alm/util/Cvs.ts' />
/// <reference path='alm/util/CssVar.ts' />
/// <reference path='alm/util/Sensor.ts' />
/// <reference path='alm/util/Time.ts' />

/// <reference path='alm/resource/ObjectPool.ts' />

/// <reference path='alm/state/Lottery.ts' />
/// <reference path='alm/state/Switcher.ts' />
/// <reference path='alm/state/SwitcherEvent.ts' />
/// <reference path='alm/state/LoHi.ts' />
/// <reference path='alm/state/LoHiEvent.ts' />

/// <reference path='alm/math/EasingValue.ts' />
/// <reference path='alm/math/SpringValue.ts' />
/// <reference path='alm/math/MinMax.ts' />
/// <reference path='alm/math/SimpleAverage.ts' />
/// <reference path='alm/math/SimpleMovingAverage.ts' />
/// <reference path='alm/math/MaxValue.ts' />
/// <reference path='alm/math/Circular.ts' />
/// <reference path='alm/math/BinarySearch.ts' />
/// <reference path='alm/math/MersenneTwister.ts' />

/// <reference path='alm/time/AnimationFrameTicker.ts' />
/// <reference path='alm/time/AnimationFrameTickerEvent.ts' />
/// <reference path='alm/time/Timer.ts' />
/// <reference path='alm/time/TimerEvent.ts' />

/// <reference path='alm/io/FileLoader.ts' />
/// <reference path='alm/io/FileLoaderProgressEvent.ts' />
/// <reference path='alm/io/FileLoaderSuccessEvent.ts' />
/// <reference path='alm/io/FileLoaderErrorEvent.ts' />
/// <reference path='alm/io/FileQuery.ts' />
/// <reference path='alm/io/IFileHandler.ts' />
/// <reference path='alm/io/ImageFileHandler.ts' />

/// <reference path='alm/view/IView.ts' />
/// <reference path='alm/view/ViewEvent.ts' />
/// <reference path='alm/view/View.ts' />
/// <reference path='alm/view/ButtonBehavior.ts' />
/// <reference path='alm/view/IButton.ts' />
/// <reference path='alm/view/SelectionBehavior.ts' />
/// <reference path='alm/view/ISelection.ts' />

/// <reference path='alm/browser/DeviceInfo.ts' />
/// <reference path='alm/browser/LocalStorage.ts' />
/// <reference path='alm/browser/SessionStorage.ts' />
/// <reference path='alm/browser/KeyWatcher.ts' />
/// <reference path='alm/browser/KeyWatcherEvent.ts' />
/// <reference path='alm/browser/WinWatcher.ts' />
/// <reference path='alm/browser/WinWatcherEvent.ts' />
/// <reference path="alm/browser/ScrollSectionTriggerEvent.ts" />
/// <reference path="alm/browser/ScrollSectionTrigger.ts" />
/// <reference path="alm/browser/ResponsiveObserver.ts" />
/// <reference path="alm/browser/ResponsiveObserverEvent.ts" />
/// <reference path="alm/browser/Kiosk.ts" />

/// <reference path='scn/Scene.ts' />
/// <reference path='scn/SceneEvent.ts' />
/// <reference path='scn/SceneTransferInfo.ts' />
/// <reference path='scn/SceneState.ts' />
/// <reference path='scn/core/Direction.ts' />
/// <reference path='scn/core/Waypoint.ts' />
/// <reference path='scn/core/IRootScene.ts' />
/// <reference path='scn/core/RootScene.ts' />
/// <reference path='scn/SceneManager.ts' />
/// <reference path='scn/SceneManagerTransferEvent.ts' />
/// <reference path='scn/SceneManagerRequireSceneEvent.ts' />


/* ---------- init ---------- */

namespace alm {

	// Library version info
	export function getVersion():string {
		return '0.0.1';
	}

	// Credit info
	const style:string = 'color:#999;';
	const print:Function = console.debug;
	print('%c+ + + + + + + + + + + + + + + + + + + + + + + + + +', style);
	print('%c+ alumican.js', style);
	print('%c+ version ' + getVersion(), style);
	print('%c+ http://alumican.net', style);
	print('%c+ https://github.com/alumican/alumican.js', style);
	print('%c+ + + + + + + + + + + + + + + + + + + + + + + + + +', style);
	print('');
}
