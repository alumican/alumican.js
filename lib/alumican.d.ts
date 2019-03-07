declare namespace alm.util {
    class QueryString {
        constructor(url?: string);
        set(url?: string): void;
        getString(key: string, defaultValue: string): string;
        getInt(key: string, defaultValue: number): number;
        getFloat(key: string, defaultValue: number): number;
        getBool(key: string, defaultValue: boolean): boolean;
        getHash(): Hash<string>;
        private hash;
    }
}
declare namespace alm.util {
    enum LoggerLevel {
        Verbose = 0,
        Info = 1,
        Warn = 2,
        Error = 3,
        Silent = 4
    }
    interface ILogging {
        verbose(prefix: string, messages: any[]): void;
        info(prefix: string, messages: any[]): void;
        warn(prefix: string, messages: any[]): void;
        error(prefix: string, messages: any[]): void;
    }
    class NullLogging implements ILogging {
        verbose(prefix: string, messages: any[]): void;
        info(prefix: string, messages: any[]): void;
        warn(prefix: string, messages: any[]): void;
        error(prefix: string, messages: any[]): void;
    }
    class ConsoleLogging implements ILogging {
        verbose(prefix: string, messages: any[]): void;
        info(prefix: string, messages: any[]): void;
        warn(prefix: string, messages: any[]): void;
        error(prefix: string, messages: any[]): void;
    }
    class DOMLogging implements ILogging {
        constructor(dom: HTMLElement, html: boolean);
        verbose(prefix: string, messages: any[]): void;
        info(prefix: string, messages: any[]): void;
        warn(prefix: string, messages: any[]): void;
        error(prefix: string, messages: any[]): void;
        private print;
        private dom;
        private html;
    }
    class ParallelLogging implements ILogging {
        constructor(loggers: ILogging[]);
        verbose(prefix: string, messages: any[]): void;
        info(prefix: string, messages: any[]): void;
        warn(prefix: string, messages: any[]): void;
        error(prefix: string, messages: any[]): void;
        private loggers;
    }
    class Logger {
        static level: number;
        static logger: ILogging;
        private static namespace;
        static setLevelByQuery(key: string): void;
        static setNamespace(namespace: string): void;
        static verbose(...messages: any[]): void;
        static info(...messages: any[]): void;
        static warn(...messages: any[]): void;
        static error(...messages: any[]): void;
        static warnIf(target: any, message: string, condition?: boolean): void;
        static errorIf(target: any, message: string, condition?: boolean): void;
        private constructor();
    }
}
declare function trace(...messages: any[]): void;
declare function throwWarn(target: any, message: string, condition?: boolean): void;
declare function throwError(target: any, message: string, condition?: boolean): void;
declare namespace alm.util {
    type EasingFunction = (t: number, b: number, c: number, d: number) => number;
    class Easing {
        static linear(t: number, b: number, c: number, d: number): number;
        static easeInQuad(t: number, b: number, c: number, d: number): number;
        static easeOutQuad(t: number, b: number, c: number, d: number): number;
        static easeInOutQuad(t: number, b: number, c: number, d: number): number;
        static easeInCubic(t: number, b: number, c: number, d: number): number;
        static easeOutCubic(t: number, b: number, c: number, d: number): number;
        static easeInOutCubic(t: number, b: number, c: number, d: number): number;
        static easeInQuart(t: number, b: number, c: number, d: number): number;
        static easeOutQuart(t: number, b: number, c: number, d: number): number;
        static easeInOutQuart(t: number, b: number, c: number, d: number): number;
        static easeInQuint(t: number, b: number, c: number, d: number): number;
        static easeOutQuint(t: number, b: number, c: number, d: number): number;
        static easeInOutQuint(t: number, b: number, c: number, d: number): number;
        static easeInSine(t: number, b: number, c: number, d: number): number;
        static easeOutSine(t: number, b: number, c: number, d: number): number;
        static easeInOutSine(t: number, b: number, c: number, d: number): number;
        static easeInExpo(t: number, b: number, c: number, d: number): number;
        static easeOutExpo(t: number, b: number, c: number, d: number): number;
        static easeInOutExpo(t: number, b: number, c: number, d: number): number;
        static easeInCirc(t: number, b: number, c: number, d: number): number;
        static easeOutCirc(t: number, b: number, c: number, d: number): number;
        static easeInOutCirc(t: number, b: number, c: number, d: number): number;
        static createEaseInElastic(s?: number): EasingFunction;
        static createEaseOutElastic(s?: number): EasingFunction;
        static createEaseInOutElastic(s?: number): EasingFunction;
        static easeInElastic(t: number, b: number, c: number, d: number): number;
        static easeOutElastic(t: number, b: number, c: number, d: number): number;
        static easeInOutElastic(t: number, b: number, c: number, d: number): number;
        private static defaultEaseInElastic;
        private static defaultEaseOutElastic;
        private static defaultEaseInOutElastic;
        static createEaseInBack(s?: number): EasingFunction;
        static createEaseOutBack(s?: number): EasingFunction;
        static createEaseInOutBack(s?: number): EasingFunction;
        static easeInBack(t: number, b: number, c: number, d: number): number;
        static easeOutBack(t: number, b: number, c: number, d: number): number;
        static easeInOutBack(t: number, b: number, c: number, d: number): number;
        private static defaultEaseInBack;
        private static defaultEaseOutBack;
        private static defaultEaseInOutBack;
        static easeInBounce(t: number, b: number, c: number, d: number): number;
        static easeOutBounce(t: number, b: number, c: number, d: number): number;
        static easeInOutBounce(t: number, b: number, c: number, d: number): number;
    }
}
declare namespace alm.event {
    class Event {
        constructor(type: string, target: Object, data?: any);
        getType(): string;
        getTarget(): Object;
        getData(): any;
        setData(data: any): void;
        private type;
        private target;
        private data;
    }
}
declare namespace alm.event {
    type EventListener = (event: Event) => void;
    class EventDispatcher {
        constructor(target?: any);
        addEventListener(eventType: string, listener: EventListener): void;
        removeEventListener(eventType: string, listener: EventListener): void;
        removeAllEventListener(eventType?: string): void;
        hasEventListener(eventType: string): boolean;
        dispatchEvent(event: Event): void;
        dispatchEventType(eventType: string, target?: Object, data?: any): void;
        private target;
        private listeners;
    }
}
declare namespace cmd {
    enum CommandState {
        Sleeping = 0,
        Executing = 1,
        Interrupting = 2
    }
}
declare namespace cmd {
    import Event = alm.event.Event;
    class CommandEvent extends Event {
        static COMPLETE: string;
        constructor(eventType: string, eventTarget?: any);
        clone(): CommandEvent;
        toString(): string;
    }
}
declare namespace cmd {
    import EventDispatcher = alm.event.EventDispatcher;
    class Command extends EventDispatcher {
        constructor(executeFunction?: Function, interruptFunction?: Function, destroyFunction?: Function);
        execute(): void;
        interrupt(): void;
        destroy(): void;
        protected notifyComplete(): void;
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
        getExecuteFunction(): Function;
        setExecuteFunction(func: Function): void;
        private executeFunction;
        getInterruptFunction(): Function;
        setInterruptFunction(func: Function): void;
        private interruptFunction;
        getDestroyFunction(): Function;
        setDestroyFunction(func: Function): void;
        private destroyFunction;
        getState(): CommandState;
        private state;
        getParent(): Command;
        setParent(parent: Command): void;
        private parent;
        getSelf(): Command;
        private self;
    }
}
declare namespace cmd {
    abstract class CommandList extends Command {
        constructor(...commands: (Command | Function)[]);
        addCommand(...commands: (Command | Function)[]): void;
        insertCommand(...commands: (Command | Function)[]): void;
        protected insertCommandAt(index: number, ...commands: (Command | Function)[]): void;
        addCommandArray(commands: (Command | Function)[]): void;
        insertCommandArray(commands: (Command | Function)[]): void;
        protected insertCommandArrayAt(index: number, commands: (Command | Function)[]): void;
        getLength(): number;
        getCommandByIndex(index: number): Command;
        getCommands(): Command[];
        private preProcess;
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
        protected abstract implNotifyBreak(): void;
        protected abstract implNotifyReturn(): void;
        private commands;
    }
}
declare namespace cmd {
    class Break extends Command {
        constructor();
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
    }
}
declare namespace cmd {
    class Return extends Command {
        constructor();
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
    }
}
declare namespace cmd {
    class Log extends Command {
        constructor(...messages: any[]);
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
        getMessages(): any[];
        setMessages(messages: any[]): void;
        private messages;
    }
}
declare namespace cmd {
    class Wait extends Command {
        constructor(time?: number);
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
        private cancel;
        private completeHandler;
        getTime(): number;
        setTime(time: number): void;
        private time;
        private timerId;
    }
}
declare namespace cmd {
    import EventDispatcher = alm.event.EventDispatcher;
    class Func extends Command {
        constructor(func?: Function, args?: any[], eventDispatcher?: EventDispatcher, eventType?: string);
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
        private completeHandler;
        getFunction(): Function;
        setFunction(func: Function): void;
        private func;
        getArguments(): any[];
        setArguments(args: any[]): void;
        private args;
        getEventDispatcher(): EventDispatcher;
        setEventDispatcher(eventDispatcher: EventDispatcher): void;
        private eventDispatcher;
        getEventType(): string;
        setEventType(eventType: string): void;
        private eventType;
    }
}
declare namespace cmd {
    import EventDispatcher = alm.event.EventDispatcher;
    class Listen extends Command {
        constructor(eventDispatcher?: EventDispatcher, eventType?: string);
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
        private completeHandler;
        getEventDispatcher(): EventDispatcher;
        setEventDispatcher(eventDispatcher: EventDispatcher): void;
        private eventDispatcher;
        getEventType(): string;
        setEventType(eventType: string): void;
        private eventType;
    }
}
declare namespace cmd {
    import EasingFunction = alm.util.EasingFunction;
    type TweenCallbackFunction = (progressTime: number, progressValue: number) => void;
    class Tween extends Command {
        constructor(target: Object, to: Object, from?: Object, duration?: number, easing?: EasingFunction, onStart?: TweenCallbackFunction, onUpdate?: TweenCallbackFunction, onComplete?: TweenCallbackFunction);
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
        private cancel;
        private apply;
        private intervalHandler;
        getTarget(): Object;
        setTarget(target: Object): void;
        private tweenTarget;
        getDuration(): number;
        setDuration(duration: number): void;
        private duration;
        getTo(): Object;
        setTo(to: Object): void;
        private to;
        getFrom(): Object;
        setFrom(from: Object): void;
        private from;
        getEasing(): EasingFunction;
        setEasing(easing: EasingFunction): void;
        private easing;
        getOnStart(): TweenCallbackFunction;
        setOnStart(func: TweenCallbackFunction): void;
        private onStart;
        getOnUpdate(): TweenCallbackFunction;
        setOnUpdate(func: TweenCallbackFunction): void;
        private onUpdate;
        getOnComplete(): TweenCallbackFunction;
        setOnComplete(func: TweenCallbackFunction): void;
        private onComplete;
        getProgressTime(): number;
        private progressTime;
        getProgressValue(): number;
        private progressValue;
        private startTime;
        private timerId;
        private internalFrom;
        getUpdateInterval(): number;
        setUpdateInterval(milliseconds: number): void;
        private static updateInterval;
    }
}
declare namespace cmd {
    class Serial extends CommandList {
        constructor(...commands: (Command | Function)[]);
        addCommand(...commands: (Command | Function)[]): void;
        insertCommand(...commands: (Command | Function)[]): void;
        addCommandArray(commands: (Command | Function)[]): void;
        insertCommandArray(commands: (Command | Function)[]): void;
        private next;
        private completeHandler;
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
        protected implNotifyBreak(): void;
        protected implNotifyReturn(): void;
        protected getPosition(): number;
        private position;
        private currentCommand;
        private isPaused;
        private isCompleteOnPaused;
    }
}
declare namespace cmd {
    class Parallel extends CommandList {
        constructor(...commands: (Command | Function)[]);
        addCommand(...commands: (Command | Function)[]): void;
        insertCommand(...commands: (Command | Function)[]): void;
        addCommandArray(commands: (Command | Function)[]): void;
        insertCommandArray(commands: (Command | Function)[]): void;
        private completeHandler;
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
        protected implNotifyBreak(): void;
        protected implNotifyReturn(): void;
        protected getCompleteCount(): number;
        private completeCount;
        private currentCommand;
        private isPaused;
        private isCompleteOnPaused;
    }
}
declare namespace alm.geom {
    class Vector2 {
        constructor(x?: number, y?: number);
        set(x: number, y: number): void;
        copyTo(point: Vector2): void;
        getClone(): Vector2;
        zero(): void;
        normalize(): void;
        getLength(): number;
        getSquareDistance(point: Vector2): number;
        getDistance(point: Vector2): number;
        x: number;
        y: number;
    }
}
declare namespace alm.geom {
    class Vector3 {
        constructor(x?: number, y?: number, z?: number);
        set(x: number, y: number, z: number): void;
        copyTo(point: Vector3): void;
        getClone(): Vector3;
        zero(): void;
        normalize(): void;
        getLength(): number;
        getSquareDistance(point: Vector3): number;
        getDistance(point: Vector3): number;
        x: number;
        y: number;
        z: number;
    }
}
declare namespace alm.geom {
    class Rectangle {
        constructor(x?: number, y?: number, width?: number, height?: number);
        set(x: number, y: number, width: number, height: number): void;
        copyTo(rect: Rectangle): void;
        getClone(): Rectangle;
        getTop(): number;
        getBottom(): number;
        getLeft(): number;
        getRight(): number;
        getTopLeft(): Vector2;
        getTopRight(): Vector2;
        getBottomLeft(): Vector2;
        getBottomRight(): Vector2;
        x: number;
        y: number;
        width: number;
        height: number;
    }
}
declare namespace alm.util {
    interface Hash<T> {
        [key: string]: T;
    }
}
declare namespace alm.util {
    class Obj {
        static each(target: any, func: (key: string, value: any) => void): void;
        private constructor();
    }
}
declare namespace alm.util {
    class Arr {
        static sequence(count: number, init?: number, step?: number): number[];
        static unique<T>(list: T[]): T[];
        static duplicated<T>(list: T[], unique?: boolean): T[];
        static roundRobin<T>(list1: T[], list2: T[], callback: (count: number, index1: number, index2: number, element1: T, element2: T) => void): void;
        private constructor();
    }
}
declare namespace alm.util {
    class Num {
        static map(value: number, srcMin: number, srcMax: number, dstMin: number, dstMax: number, clamp?: boolean): number;
        static random(min?: number, max?: number): number;
        static randomInt(min?: number, max?: number): number;
        static clamp(value: number, min: number, max: number): number;
        static dist(x1: number, y1: number, x2: number, y2: number, squared?: boolean): number;
        static radToDeg(radian: number): number;
        static degToRad(degree: number): number;
        static turn(from: number, to: number, radian?: boolean): number;
        static PI2: number;
        static PI3: number;
        static PI4: number;
        static PI5: number;
        static PI6: number;
        static PI_2: number;
        static PI_3: number;
        static PI_4: number;
        static PI_6: number;
        private static RAD2DEG;
        private static DEG2RAD;
        private constructor();
    }
}
declare namespace alm.util {
    class Str {
        static toTimeString(hours?: number, minutes?: number, seconds?: number): string;
        private constructor();
    }
}
declare namespace alm.util {
    enum Align {
        Top_Left = 0,
        Top_Center = 1,
        Top_Right = 2,
        Middle_Left = 3,
        Middle_Center = 4,
        Middle_Right = 5,
        Bottom_Left = 6,
        Bottom_Center = 7,
        Bottom_Right = 8
    }
    enum ScaleMode {
        ExactFit = 0,
        ShowAll = 1,
        NoBorder = 2,
        NoScale = 3
    }
    class Boxer {
        static resize(target: geom.Rectangle, bounds: geom.Rectangle, scaleMode?: ScaleMode, align?: Align): geom.Rectangle;
        private constructor();
    }
}
declare namespace alm.util {
    class Raffle<T = any> {
        constructor(values?: T[]);
        set(values: T[]): void;
        get(): T;
        add(value: T, reset?: boolean): void;
        reset(): void;
        getRestCount(): number;
        getIsEmply(): boolean;
        getIsAutoResetEnabled(): boolean;
        setIsAutoResetEnabled(enabled: boolean): void;
        static createIndices(count: number): Raffle<number>;
        onCheck: (value: T) => boolean;
        private isAutoResetEnabled;
        private isEmpty;
        private restCount;
        private restValues;
        private initValues;
    }
}
declare namespace alm.util {
    class Rotator {
        constructor(angle?: number, velocity?: number, radian?: boolean);
        getAngle(radian?: boolean): number;
        setAngle(angle: number, radian?: boolean): void;
        getVelocity(radian?: boolean): number;
        setVelocity(velocity: number, radian?: boolean): void;
        update(): void;
        getSin(length?: number): number;
        getCos(length?: number): number;
        getTan(length?: number): number;
        getMagnitude(length?: number): number;
        getVector(length?: number, xy?: {
            x: number;
            y: number;
        }): {
            x: number;
            y: number;
        };
        private angle;
        private velocity;
    }
}
declare namespace alm.util {
    class Pager<T = string> extends alm.event.EventDispatcher {
        constructor();
        setupById(ids: T[]): void;
        setupByCount(itemCount: number): void;
        private setup;
        gotoByIndex(itemIndex: number, useTransition?: boolean): boolean;
        gotoById(itemId: string, useTransition?: boolean): boolean;
        prev(useTransition?: boolean): boolean;
        next(useTransition?: boolean): boolean;
        private dispatchPagerEvent;
        getIsLoopEnabled(): boolean;
        setIsLoopEnabled(value: boolean): void;
        private isLoopEnabled;
        getNewItemIndex(): number;
        private newItemIndex;
        getOldItemIndex(): number;
        private oldItemIndex;
        getItemCount(): number;
        private itemCount;
        getNewItemId(): T;
        private newItemId;
        getOldItemId(): T;
        private oldItemId;
        getItemIds(): T[];
        private itemIds;
        private itemIndexById;
        onChange: (event: PagerEvent<T>) => void;
        onPrev: (event: PagerEvent<T>) => void;
        onNext: (event: PagerEvent<T>) => void;
    }
}
declare namespace alm.util {
    class PagerEvent<T = string> extends alm.event.Event {
        static CHANGE: string;
        static PREV: string;
        static NEXT: string;
        constructor(eventType: string, eventTarget: any, newItemIndex: number, oldItemIndex: number, newItemId: T, oldItemId: T, useTransition: boolean);
        clone(): PagerEvent<T>;
        toString(): string;
        newItemIndex: number;
        oldItemIndex: number;
        newItemId: T;
        oldItemId: T;
        useTransition: boolean;
    }
}
declare namespace alm.util {
    import EventDispatcher = alm.event.EventDispatcher;
    class Timer extends EventDispatcher {
        constructor(interval?: number, repeatCount?: number);
        start(): void;
        stop(): void;
        reset(): void;
        restart(): void;
        private getCurrentTime;
        private startInterval;
        private stopInterval;
        private dispatch;
        private timerHandler;
        getIsRunning(): boolean;
        private isRunning;
        getInterval(): number;
        setInterval(interval: number): void;
        private interval;
        getElapsedTime(): number;
        getRestTime(): number;
        getElapsedCount(): number;
        private elapsedCount;
        getRepeatCount(): number;
        setRepeatCount(count: number): void;
        private repeatCount;
        getRestCount(): number;
        private tStartTime;
        private tRestTime;
        private tInterval;
        private tId;
    }
}
declare namespace alm.util {
    import Event = alm.event.Event;
    class TimerEvent extends Event {
        static TICK: string;
        static COMPLETE: string;
        constructor(eventType: string, eventTarget?: any, elapsedCount?: number, repeatCount?: number, restCount?: number);
        clone(): TimerEvent;
        toString(): string;
        elapsedCount: number;
        repeatCount: number;
        restCount: number;
    }
}
declare namespace alm.util {
    class ObjectPool<T> {
        constructor(onRequireItem: () => T, onDestroyItem: (item: T) => void, initCount?: number, growthCount?: number);
        getItem(): T;
        returnItem(item: T): void;
        reduce(): void;
        destroy(): void;
        private items;
        private index;
        private growthCount;
        onRequireItem: () => T;
        onDestroyItem: (item: T) => void;
    }
}
declare namespace alm.util {
    class CommandUtil {
        static stop(command: cmd.Command): any;
        static sequence(execute: boolean, ...commands: (cmd.Command | Function)[]): cmd.Serial;
        static single(execute: boolean, command: cmd.Command): cmd.Command;
        private constructor();
    }
}
declare namespace alm.value {
    class EasingValue {
        constructor(initValue: number, easing?: number, tolerance?: number);
        update(useTransition?: boolean): number;
        clone(): EasingValue;
        value: number;
        target: number;
        easing: number;
        tolerance: number;
    }
}
declare namespace alm.value {
    class SpringValue {
        constructor(initValue: number, spring?: number, friction?: number);
        update(useTransition?: boolean): number;
        clone(): SpringValue;
        value: number;
        target: number;
        velocity: number;
        acceleration: number;
        spring: number;
        friction: number;
    }
}
declare namespace alm.value {
    class SimpleAverage {
        constructor();
        add(n: number): number;
        value: number;
        count: number;
        private _value;
        private _count;
    }
}
declare namespace alm.value {
    class SimpleMovingAverage {
        constructor(maxCount: number);
        add(n: number): number;
        value: number;
        maxCount: number;
        count: number;
        private _value;
        private _maxCount;
        private _count;
        private values;
    }
}
declare namespace alm.loader {
    type CompleteFunction = (content: any) => void;
    type ErrorFunction = (message: string) => void;
    class AssetLoader {
        constructor();
        require(url: string, type: string, id?: string): string;
        private addQuery;
        load(): void;
        private next;
        addHandler(handler: IFileHandler): void;
        private fileLoadCompleteHandler;
        private fileLoadErrorHandler;
        addLoadUpdateListener(listener: (event: AssetLoaderEvent) => void): void;
        removeLoadUpdateListener(listener: (event: AssetLoaderEvent) => void): void;
        addLoadCompleteListener(listener: (event: AssetLoaderEvent) => void): void;
        removeLoadCompleteListener(listener: (event: AssetLoaderEvent) => void): void;
        getQueryByQueryId(queryId: string): FileQuery;
        getQueryByUrl(url: string): FileQuery;
        isLoading(): boolean;
        private isLoading_;
        getCurrentCount(): number;
        private currentCount;
        getTotalCount(): number;
        private totalCount;
        getContentByUrl<T = any>(url: string): T;
        getContentByQueryId<T = any>(textureId: string): T;
        private loadingQueries;
        private loadingQueryIndex;
        private queriesByQueryId;
        private queriesByUrl;
        private handlersByType;
        private eventDispatcher;
        private static id;
    }
}
declare namespace alm.loader {
    class AssetLoaderEvent extends alm.event.Event {
        static PROGRESS: string;
        static COMPLETE: string;
        static ERROR: string;
        constructor(eventType: string, eventTarget?: any, progress?: number, loadedCount?: number, totalCount?: number, content?: any);
        clone(): AssetLoaderEvent;
        toString(): string;
        progress: number;
        loadedCount: number;
        totalCount: number;
        content: any;
    }
}
declare namespace alm.loader {
    class FileQuery {
        constructor();
        id: string;
        type: string;
        url: string;
        param: any;
        content: any;
        isLoading: boolean;
        isLoadComplete: boolean;
    }
}
declare namespace alm.loader {
    interface IFileHandler {
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
    }
}
declare namespace alm.view {
    import EventDispatcher = alm.event.EventDispatcher;
    abstract class View<T = any> extends EventDispatcher {
        constructor(view?: T, id?: string);
        initialize(): void;
        ready(): void;
        finalize(): void;
        show(useTransition?: boolean): void;
        hide(useTransition?: boolean): void;
        getShowCommand(useTransition?: boolean): cmd.Command;
        getHideCommand(useTransition?: boolean): cmd.Command;
        getIsInitializing(): boolean;
        getIsInitialized(): boolean;
        getIsReadying(): boolean;
        getIsReadied(): boolean;
        getIsShowing(): boolean;
        getIsShown(): boolean;
        getIsHiding(): boolean;
        getIsHidden(): boolean;
        getId(): string;
        getView(): T;
        getName(): string;
        setName(value: string): void;
        getAutoHideWithInit(): boolean;
        setAutoHideWithInit(value: boolean): void;
        protected abstract implInitialize(): T;
        protected abstract implReady(): void;
        protected abstract implFinalize(): void;
        protected abstract implShow(view: T, useTransition: boolean): cmd.Command;
        protected abstract implHide(view: T, useTransition: boolean): cmd.Command;
        static getViewById(id: string): View;
        private id;
        private view;
        private name;
        private autoHideWithInit;
        private showCommand;
        private hideCommand;
        private isInitializing;
        private isInitialized;
        private isReadying;
        private isReadied;
        private isShowing;
        private isShown;
        private isHiding;
        private static viewCount;
        private static viewsById;
    }
}
declare namespace alm.view {
    class ButtonBehavior {
        constructor(target: IButton, hitArea?: HTMLElement, isHoverCursorEnabled?: boolean, isPreventDefaultEnabled?: boolean, isStopPropagationEnabled?: boolean);
        over(useTransition?: boolean): void;
        out(useTransition?: boolean): void;
        private _out;
        down(useTransition?: boolean): void;
        up(useTransition?: boolean): void;
        private _up;
        click(useTransition?: boolean): void;
        private on;
        private off;
        getIsEnabled(): boolean;
        setIsEnabled(value: boolean, useTransition?: boolean): void;
        getIsOver(): boolean;
        getIsDown(): boolean;
        getHitArea(): HTMLElement;
        setHitArea(hitArea: HTMLElement): void;
        clearHitArea(): void;
        getIsPreventDefaultEnabled(): boolean;
        setIsPreventDefaultEnabled(enabled: boolean): void;
        getIsStopPropagationEnabled(): boolean;
        setIsStopPropagationEnabled(enabled: boolean): void;
        getIsHoverCursorEnabled(): boolean;
        setIsHoverCursorEnabled(enabled: boolean): void;
        private applyMouseCursor;
        private mouseOverHandler;
        private mouseOutHandler;
        private mouseDownHandler;
        private mouseUpHandler;
        private clickHandler;
        private touchStartHandler;
        private touchEndHandler;
        private touchCancelHandler;
        private target;
        private hitArea;
        private isEnabled;
        private isOver;
        private isDown;
        private isOverInternal;
        private isDownInternal;
        private isPreventDefaultEnabled;
        private isStopPropagationEnabled;
        private isHoverCursorEnabled;
        private defaultMouseCursor;
    }
}
declare namespace alm.view {
    interface IButton {
        implButtonOver(useTransition: boolean): void;
        implButtonOut(useTransition: boolean): void;
        implButtonDown(useTransition: boolean): void;
        implButtonUp(useTransition: boolean): void;
        implButtonClick(useTransition: boolean): void;
        implButtonChangeEnabled(isEnabled: boolean, useTransition: boolean): void;
    }
}
declare namespace alm.view {
    class SelectionBehavior {
        constructor(target: ISelection);
        select(useTransition?: boolean): void;
        deselect(useTransition?: boolean): void;
        getIsSelected(): boolean;
        private target;
        private isSelected;
    }
}
declare namespace alm.view {
    interface ISelection {
        implSelectionChanged(isSelected: boolean, useTransition: boolean): void;
    }
}
declare namespace alm.browser {
    class DeviceInfo {
        private static initialize;
        static getIsDesktop(): boolean;
        static getIsTablet(): boolean;
        static getIsMobile(): boolean;
        static getIsIOS(): boolean;
        static getIsAndroid(): boolean;
        static getIsIE(): boolean;
        static getIsEdge(): boolean;
        static getIsChrome(): boolean;
        static getIsSafari(): boolean;
        static getIsFireFox(): boolean;
        static getIsOpera(): boolean;
        static getIsUnknownBrowser(): boolean;
        static getIsTouchEnabled(): boolean;
        static getIsDownloadEnabled(): boolean;
        static getIsRetina(): boolean;
        static getDevicePixelRatio(): number;
        static getDpi(): number;
        private static isDesktop;
        private static isTablet;
        private static isMobile;
        private static isIOS;
        private static isAndroid;
        private static isIE;
        private static isEdge;
        private static isChrome;
        private static isSafari;
        private static isFireFox;
        private static isOpera;
        private static isUnknownBrowser;
        private static isTouchEnabled;
        private static isDownloadEnabled;
        private static isRetina;
        private static devicePixelRatio;
        private static dpi;
        private static isInitialized;
        private constructor();
    }
}
declare namespace alm.browser {
    class LocalStorage {
        static save(key: string, value: any, expiredAt?: number): boolean;
        static saveWithTerm(key: string, value: any, milliseconds?: number): boolean;
        static load(key: string, defaultValue?: any): any;
        static remove(key: string): void;
        static isAvailable(): boolean;
        static toMilliseconds(dates?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): number;
        private static isAvailable_;
        private constructor();
    }
}
declare namespace alm.browser {
    enum KeyCode {
        Backspace = 8,
        Tab = 9,
        Enter = 13,
        Shift = 16,
        Ctrl = 17,
        Alt = 18,
        PauseBreak = 19,
        CapsLock = 20,
        Escape = 27,
        Space = 32,
        PageUp = 33,
        PageDown = 34,
        End = 35,
        Home = 36,
        LeftArrow = 37,
        UpArrow = 38,
        RightArrow = 39,
        DownArrow = 40,
        Insert = 45,
        Delete = 46,
        Key0 = 48,
        Key1 = 49,
        Key2 = 50,
        Key3 = 51,
        Key4 = 52,
        Key5 = 53,
        Key6 = 54,
        Key7 = 55,
        Key8 = 56,
        Key9 = 57,
        ClosedParen = 48,
        ExclamationMark = 49,
        AtSign = 50,
        PoundSign = 51,
        Hash = 51,
        DollarSign = 52,
        PercentSign = 53,
        Caret = 54,
        Hat = 54,
        Ampersand = 55,
        Star = 56,
        Asterik = 56,
        OpenParen = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        LeftWindowKey = 91,
        RightWindowKey = 92,
        SelectKey = 93,
        Numpad0 = 96,
        Numpad1 = 97,
        Numpad2 = 98,
        Numpad3 = 99,
        Numpad4 = 100,
        Numpad5 = 101,
        Numpad6 = 102,
        Numpad7 = 103,
        Numpad8 = 104,
        Numpad9 = 105,
        Multiply = 106,
        Add = 107,
        Subtract = 109,
        DecimalPoint = 110,
        Divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        NumLock = 144,
        ScrollLock = 145,
        SemiColon = 186,
        Equals = 187,
        Comma = 188,
        Dash = 189,
        Period = 190,
        UnderScore = 189,
        PlusSign = 187,
        ForwardSlash = 191,
        Tilde = 192,
        GraveAccent = 192,
        OpenBracket = 219,
        ClosedBracket = 221,
        Quote = 222
    }
    class KeyWatcher {
        private static initialize;
        static start(): void;
        static stop(): void;
        static addEventListener(eventType: string, listener: (event: KeyWatcherEvent) => void): void;
        static removeEventListener(eventType: string, listener: (event: KeyWatcherEvent) => void): void;
        private static windowKeyDownHandler;
        private static windowKeyUpHandler;
        static getIsRunning(): boolean;
        private static isRunning;
        static getIsAnyKeyPressed(): boolean;
        private static pressedKeyCount;
        static getIsKeyPressed(keyCode: number): boolean;
        private static isKeyPressedByKeyCode;
        static getIsContinuousPressEnabled(): boolean;
        static setIsContinuousPressEnabled(enabled: boolean): void;
        private static isContinuousPressEnabled;
        private static isInitialized;
        private static isLongPressed;
        private static eventDispatcher;
        private constructor();
    }
}
declare namespace alm.browser {
    class KeyWatcherEvent extends alm.event.Event {
        static KEY_UP: string;
        static KEY_DOWN: string;
        constructor(eventType: string, eventTarget?: any, originalEvent?: KeyboardEvent);
        clone(): KeyWatcherEvent;
        toString(): string;
        originalEvent: KeyboardEvent;
        key: string;
        keyCode: number;
        altKey: boolean;
        ctrlKey: boolean;
        shiftKey: boolean;
    }
}
declare namespace alm.browser {
    class WindowWatcher {
        private static initialize;
        static start(target?: Window): void;
        static stop(): void;
        static apply(): void;
        static addEventListener(eventType: string, listener: (event: WindowWatcherEvent) => void): void;
        static removeEventListener(eventType: string, listener: (event: WindowWatcherEvent) => void): void;
        static calcScrolledPosition(y: number): number;
        static calcScrolledPositionRatio(y: number): number;
        private static resize;
        private static windowResizeHandler;
        private static windowOrientationChangeHandler;
        private static windowScrollHandler;
        static getIsRunning(): boolean;
        private static isRunning;
        static getWindow(): Window;
        private static window;
        static getScrollTop(): number;
        private static scrollTop;
        static getScrollBottom(): number;
        private static scrollBottom;
        static getWindowWidth(): number;
        private static windowWidth;
        static getWindowHeight(): number;
        private static windowHeight;
        static getIsMobileOrientationResize(): boolean;
        static setIsMobileOrientationResize(value: boolean): void;
        private static isMobileOrientationResize;
        private static isInitialized;
        private static eventDispatcher;
        private constructor();
    }
}
declare namespace alm.browser {
    class WindowWatcherEvent extends alm.event.Event {
        static SCROLL: string;
        static RESIZE: string;
        constructor(eventType: string, eventTarget?: any, originalEvent?: Event, scrollTop?: number, scrollBottom?: number, windowWidth?: number, windowHeight?: number);
        clone(): WindowWatcherEvent;
        toString(): string;
        originalEvent: Event;
        scrollTop: number;
        scrollBottom: number;
        windowWidth: number;
        windowHeight: number;
    }
}
declare namespace scn {
    import EventDispatcher = alm.event.EventDispatcher;
    class Scene extends EventDispatcher {
        constructor(name: string);
        addChild(child: Scene): Scene;
        removeChild(child: Scene): Scene;
        addChildren(children: Scene[]): Scene[];
        removeChildren(children: Scene[]): Scene[];
        removeAllChildren(): Scene[];
        contains(child: Scene | string): boolean;
        getName(): string;
        getState(): SceneState;
        getLastState(): SceneState;
        getParent(): Scene;
        getChildByName(name: string): Scene;
        getNumChildren(): number;
        getManager(): SceneManager;
        getPath(): string;
        gotoScene(path: string): void;
        _load(transferInfo: SceneTransferInfo): void;
        _unload(transferInfo: SceneTransferInfo): void;
        _arrive(transferInfo: SceneTransferInfo): void;
        _leave(transferInfo: SceneTransferInfo): void;
        _ascend(transferInfo: SceneTransferInfo): void;
        _descend(transferInfo: SceneTransferInfo): void;
        protected implOnLoad(): cmd.Command;
        protected implOnUnload(): cmd.Command;
        protected implOnArrive(): cmd.Command;
        protected implOnLeave(): cmd.Command;
        protected implOnAscend(): cmd.Command;
        protected implOnDescend(): cmd.Command;
        onLoad: () => cmd.Command;
        onUnload: () => cmd.Command;
        onArrive: () => cmd.Command;
        onLeave: () => cmd.Command;
        onAscend: () => cmd.Command;
        onDescend: () => cmd.Command;
        private isEntered;
        private name;
        private state;
        private lastState;
        private parent;
        private childrenByName;
        private numChildren;
        private transferInfo;
    }
}
declare namespace scn {
    import Event = alm.event.Event;
    class SceneEvent extends Event {
        static LOAD: string;
        static UNLOAD: string;
        static ARRIVE: string;
        static LEAVE: string;
        static ASCEND: string;
        static DESCEND: string;
        static LOAD_COMPLETE: string;
        static UNLOAD_COMPLETE: string;
        static ARRIVE_COMPLETE: string;
        static LEAVE_COMPLETE: string;
        static ASCEND_COMPLETE: string;
        static DESCEND_COMPLETE: string;
        constructor(eventType: string, eventTarget?: any);
        clone(): SceneEvent;
        toString(): string;
    }
}
declare namespace scn {
    import EventDispatcher = alm.event.EventDispatcher;
    class SceneManager extends EventDispatcher {
        constructor(name?: string);
        start(): void;
        goto(path: string): void;
        resolvePath(path: string): string;
        addSceneAt(path: string, createScene?: boolean): Scene;
        getName(): string;
        getRoot(): Scene;
        getSceneByPath(path: string): Scene;
        getSceneNamesByPath(path: string): string[];
        getSceneLevelByNames(names: string[]): number;
        getScenePathByNames(names: string[]): string;
        private createWaypoints;
        private setDirection;
        private printWaypoint;
        private checkState;
        private sceneLoadCompleteHandler;
        private sceneUnloadCompleteHandler;
        private sceneArriveCompleteHandler;
        private sceneLeaveCompleteHandler;
        private sceneAscendCompleteHandler;
        private sceneDescendCompleteHandler;
        private name;
        private root;
        private currentScene;
        private waypoints;
        private waypointIndex;
        private lastState;
        private eventIndex;
        private transferInfo;
        private transferId;
    }
}
declare namespace scn {
    import Event = alm.event.Event;
    class SceneManagerEvent extends Event {
        static TRANSFER_START: string;
        static TRANSFER_COMPLETE: string;
        constructor(eventType: string, eventTarget?: any);
        clone(): SceneManagerEvent;
        toString(): string;
    }
}
declare namespace scn {
    class SceneTransferInfo {
        constructor(transferId: number, departurePath: string, destinationPath: string);
        getTransferId(): number;
        getDeparturePath(): string;
        getDestinationPath(): string;
        relay: any;
        private transferId;
        private departurePath;
        private destinationPath;
    }
}
declare namespace scn {
    enum SceneState {
        Idling = 0,
        Loading = 1,
        Unloading = 2,
        Arriving = 3,
        Leaving = 4,
        Ascending = 5,
        Descending = 6
    }
    function getSceneStateString(state: SceneState): string;
}
declare namespace scn.core {
    enum Direction {
        Static = 0,
        Sibling = 1,
        Ascend = 2,
        Descend = 3
    }
    function getDirectionString(direction: Direction): string;
}
declare namespace scn.core {
    class RootScene extends Scene {
        constructor(manager: SceneManager);
        getManager(): SceneManager;
        private manager;
    }
}
declare namespace scn.core {
    class Waypoint {
        constructor(path: string, level: number);
        getPath(): string;
        getLevel(): number;
        getFrom(): Direction;
        getTo(): Direction;
        _setFrom(from: Direction): void;
        _setTo(to: Direction): void;
        toString(): string;
        private path;
        private level;
        private from;
        private to;
    }
}
declare namespace alm {
    function getVersion(): string;
}
