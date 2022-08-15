declare namespace alm.util {
    class Time {
        static now(): number;
        private constructor();
    }
}
declare namespace alm.math {
    type EasingFunction = (t: number) => number;
    class Easing {
        static linear(t: number): number;
        static easeInQuad(t: number): number;
        static easeOutQuad(t: number): number;
        static easeInOutQuad(t: number): number;
        static easeInCubic(t: number): number;
        static easeOutCubic(t: number): number;
        static easeInOutCubic(t: number): number;
        static easeInQuart(t: number): number;
        static easeOutQuart(t: number): number;
        static easeInOutQuart(t: number): number;
        static easeInQuint(t: number): number;
        static easeOutQuint(t: number): number;
        static easeInOutQuint(t: number): number;
        static easeInSine(t: number): number;
        static easeOutSine(t: number): number;
        static easeInOutSine(t: number): number;
        static easeInExpo(t: number): number;
        static easeOutExpo(t: number): number;
        static easeInOutExpo(t: number): number;
        static easeInCirc(t: number): number;
        static easeOutCirc(t: number): number;
        static easeInOutCirc(t: number): number;
        static createEaseInElastic(s?: number): EasingFunction;
        static createEaseOutElastic(s?: number): EasingFunction;
        static createEaseInOutElastic(s?: number): EasingFunction;
        static easeInElastic(t: number): number;
        static easeOutElastic(t: number): number;
        static easeInOutElastic(t: number): number;
        private static defaultEaseInElastic;
        private static defaultEaseOutElastic;
        private static defaultEaseInOutElastic;
        static createEaseInBack(s?: number): EasingFunction;
        static createEaseOutBack(s?: number): EasingFunction;
        static createEaseInOutBack(s?: number): EasingFunction;
        static easeInBack(t: number): number;
        static easeOutBack(t: number): number;
        static easeInOutBack(t: number): number;
        private static defaultEaseInBack;
        private static defaultEaseOutBack;
        private static defaultEaseInOutBack;
        static easeInBounce(t: number): number;
        static easeOutBounce(t: number): number;
        static easeInOutBounce(t: number): number;
    }
}
declare namespace alm.browser {
    import Hash = alm.util.Hash;
    class QueryString {
        constructor(url?: string);
        set(url?: string): void;
        getString(key: string, defaultValue: string): string;
        getInt(key: string, defaultValue: number): number;
        getFloat(key: string, defaultValue: number): number;
        getBool(key: string, defaultValue: boolean): boolean;
        getHash(): Hash<string>;
        setHash(hash: Hash<string>): void;
        setParam(key: string, value: any): void;
        removeParam(key: string): void;
        hasParam(key: string): boolean;
        static getReplacedQueryStringUrl(url: string, key: string, value: string): string;
        static replaceQueryString(key: string, value: string): void;
        private hash;
    }
}
declare namespace alm.debug {
    enum LoggerLevel {
        verbose = 0,
        info = 1,
        warn = 2,
        error = 3,
        silent = 4
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
        static stackTrace(): void;
        private constructor();
    }
}
declare function trace(...messages: any[]): void;
declare function throwWarn(target: any, message: string, condition?: boolean): void;
declare function throwError(target: any, message: string, condition?: boolean): void;
declare namespace alm.debug {
    class FpsMonitor {
        constructor();
        reset(): void;
        update(): void;
        setDummyFrameRate(frameRate: number): void;
        clearDummyFrameRate(): void;
        getFrameRate(): number;
        private frameRate;
        private frameCount;
        private startTime;
        private actualFrameRate;
        private dummyFrameRate;
    }
}
declare namespace alm.event {
    class Event<Target = object, Data = any> {
        constructor(type: string, target: Target, data?: Data);
        readonly type: string;
        readonly target: Target;
        readonly data: Data;
    }
}
declare namespace alm.event {
    type EventListener = (event: Event) => void;
}
declare namespace alm.event {
    class EventDispatcher implements IEventDispatcher {
        constructor(target?: EventDispatcher);
        addEventListener(eventType: string, listener: EventListener): boolean;
        removeEventListener(eventType: string, listener: EventListener): boolean;
        removeAllEventListener(eventType?: string): void;
        hasEventListener(eventType: string): boolean;
        dispatchEvent(event: Event): void;
        dispatchEventType<T = any>(eventType: string, eventTarget?: object, data?: T): void;
        private target;
        private listeners;
    }
}
declare namespace alm.event {
    interface IEventDispatcher {
        addEventListener(eventType: string, listener: EventListener): boolean;
        removeEventListener(eventType: string, listener: EventListener): boolean;
        removeAllEventListener(eventType: string): void;
        hasEventListener(eventType: string): boolean;
        dispatchEvent(event: Event): void;
        dispatchEventType<T = any>(eventType: string, target: Object, data: T): void;
    }
}
declare namespace cmd {
    enum CommandState {
        sleeping = 0,
        executing = 1,
        interrupting = 2
    }
}
declare namespace cmd {
    import Event = alm.event.Event;
    class CommandEvent extends Event<Command> {
        static readonly complete: string;
        constructor(eventType: string, eventTarget: Command);
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
    import EasingFunction = alm.math.EasingFunction;
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
    type Condition = boolean | Function;
    class If extends Command {
        constructor(condition?: Condition, then?: Command, reject?: Command);
        protected implExecuteFunction(command: Command): void;
        protected implInterruptFunction(command: Command): void;
        protected implDestroyFunction(command: Command): void;
        private completeHandler;
        getCondition(): Condition;
        setCondition(condition: Condition): void;
        private condition;
        getThen(): Command;
        setThen(then: Command): void;
        private then;
        getReject(): Command;
        setReject(reject: Command): void;
        private reject;
        private selectedCommand;
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
declare namespace alm.geom {
    enum Align {
        topLeft = 0,
        topCenter = 1,
        topRight = 2,
        middleLeft = 3,
        middleCenter = 4,
        middleRight = 5,
        bottomLeft = 6,
        bottomCenter = 7,
        bottomRight = 8
    }
    enum ScaleMode {
        exactFit = 0,
        showAll = 1,
        noBorder = 2,
        noScale = 3
    }
    class Boxer {
        static resize(target: geom.Rectangle, bounds: geom.Rectangle, scaleMode?: ScaleMode, align?: Align): geom.Rectangle;
        private constructor();
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
        static get(target: any, key: string, defaultValue: any): any;
        private constructor();
    }
}
declare namespace alm.util {
    class Arr {
        static sequence(count: number, init?: number, step?: number): number[];
        static unique<T>(list: T[]): T[];
        static duplicated<T>(list: T[], unique?: boolean): T[];
        static roundRobin<T>(list1: T[], list2: T[], callback: (count: number, index1: number, index2: number, element1: T, element2: T) => void): void;
        static swap<T>(list: T[], index1: number, index2: number): void;
        static shuffle<T>(list: T[]): void;
        static sort(list: number[], asc?: boolean): void;
        static choose<T>(list: T[]): T;
        static clean<T>(list: T[]): T[];
        static update<T>(list: T[], f: (item: T) => (void | boolean)): void;
        private constructor();
    }
}
declare namespace alm.util {
    import EasingFunction = alm.math.EasingFunction;
    class Num {
        static map(value: number, srcA: number, srcB: number, dstA: number, dstB: number, clamp?: boolean): number;
        static ease(value: number, srcA: number, srcB: number, dstA: number, dstB: number, easing: EasingFunction): number;
        static clamp(value: number, min: number, max: number): number;
        static clampAbs(value: number, minAbs: number, maxAbs: number): number;
        static lerp(t: number, a: number, b: number, clamp?: boolean): number;
        static random(min?: number, max?: number): number;
        static randomInt(min?: number, max?: number): number;
        static randomAbs(min?: number, max?: number): number;
        static randomSign(): number;
        static dist(x1: number, y1: number, x2: number, y2: number, squared?: boolean): number;
        static radToDeg(radian: number): number;
        static degToRad(degree: number): number;
        static turn(from: number, to: number, radian?: boolean): number;
        static readonly PI2: number;
        static readonly PI3: number;
        static readonly PI4: number;
        static readonly PI5: number;
        static readonly PI6: number;
        static readonly PI_2: number;
        static readonly PI_3: number;
        static readonly PI_4: number;
        static readonly PI_6: number;
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
    class Cmd {
        static stop(command: cmd.Command): any;
        static sequence(execute: boolean, ...commands: (cmd.Command | Function)[]): cmd.Serial;
        static single(execute: boolean, command: cmd.Command): cmd.Command;
        private constructor();
    }
}
declare namespace alm.util {
    class Dom {
        static instantiate(templateId: string, removeId?: boolean, verbose?: boolean): HTMLElement;
        static addPointerDownListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: AddEventListenerOptions): void;
        static addPointerMoveListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: AddEventListenerOptions): void;
        static addPointerUpListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: AddEventListenerOptions): void;
        static addPointerEnterListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: AddEventListenerOptions): void;
        static addPointerLeaveListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: AddEventListenerOptions): void;
        static addPointerOverListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: AddEventListenerOptions): void;
        static addPointerOutListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: AddEventListenerOptions): void;
        static removePointerDownListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: EventListenerOptions): void;
        static removePointerMoveListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: EventListenerOptions): void;
        static removePointerUpListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: EventListenerOptions): void;
        static removePointerEnterListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: EventListenerOptions): void;
        static removePointerLeaveListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: EventListenerOptions): void;
        static removePointerOverListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: EventListenerOptions): void;
        static removePointerOutListener(target: HTMLElement | Window, listener: (event: PointerEvent) => void, options?: EventListenerOptions): void;
        static addRootClass(value: string): void;
        static removeRootClass(value: string): void;
        static addRootAttribute(key: string, value: string): void;
        static removeRootAttribute(key: string, value: string): void;
        static getRootCss(property: string): string;
        static setRootCss(property: string, value: string): void;
        static scrollTo(scrollTop: number, useTransition?: boolean): void;
        private static applyScrollPosition;
        static setupSmoothAnchorLink(): void;
        private static setAnchorLinkAction;
        private static anchorLinkClickHandler;
        static getViewportRect(element: Element): {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        static geDocumentRect(element: Element): {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        private static root;
        private static scrollTween;
        private static scrollPosition;
        private constructor();
    }
}
declare namespace alm.util {
    class Cvs {
        static getHighDpiContext2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
        private constructor();
    }
}
declare namespace alm.util {
    import EasingFunction = alm.math.EasingFunction;
    class CssVar {
        static readonly numberPattern: RegExp;
        constructor(property: string, defaultValue?: number, suffix?: string);
        reset(property: string, value?: number, suffix?: string): void;
        getProperty(): string;
        setProperty(property: string): void;
        getValue(): number;
        setValue(value: number): void;
        getSuffix(): string;
        setSuffix(suffix: string): void;
        animate(to: number, from: number, duration?: number, easing?: EasingFunction, execute?: boolean): cmd.Tween;
        cancelAnimation(): void;
        animateTo(to: number, duration?: number, easing?: EasingFunction, execute?: boolean): cmd.Tween;
        apply(): void;
        private property;
        private value;
        private suffix;
        private tween;
    }
}
declare namespace alm.util {
    class Sensor {
        static wakeUpDeviceMotion(): Promise<void>;
        static wakeUpDeviceOrientation(): Promise<void>;
        private constructor();
    }
}
declare namespace alm.resource {
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
declare namespace alm.state {
    class Lottery<T = any> {
        constructor(values?: T[]);
        set(values: T[]): void;
        get(): T;
        add(value: T, reset?: boolean): void;
        reset(): void;
        getRestCount(): number;
        getIsEmply(): boolean;
        getIsAutoResetEnabled(): boolean;
        setIsAutoResetEnabled(enabled: boolean): void;
        static createIndices(count: number): Lottery<number>;
        onCheck: (value: T) => boolean;
        private isAutoResetEnabled;
        private isEmpty;
        private restCount;
        private restValues;
        private initValues;
    }
}
declare namespace alm.state {
    class Switcher<T = string> extends alm.event.EventDispatcher {
        constructor();
        setupById(ids: T[]): void;
        setupByCount(itemCount: number): void;
        private setup;
        gotoByIndex(itemIndex: number, useTransition?: boolean): boolean;
        gotoById(itemId: string, useTransition?: boolean): boolean;
        prev(useTransition?: boolean): boolean;
        next(useTransition?: boolean): boolean;
        getPrevItemIndex(): number;
        getPrevItemId(): T;
        getNextItemIndex(): number;
        getNextItemId(): T;
        private dispatchPagerEvent;
        getIsLoopEnabled(): boolean;
        setIsLoopEnabled(value: boolean): void;
        private isLoopEnabled;
        getItemCount(): number;
        private itemCount;
        getCurrentItemIndex(): number;
        private currentItemIndex;
        getOldItemIndex(): number;
        private oldItemIndex;
        getCurrentItemId(): T;
        private currentItemId;
        getOldItemId(): T;
        private oldItemId;
        getItemIds(): T[];
        private itemIds;
        private itemIndexById;
        onChange: (event: SwitcherEvent<T>) => void;
        onPrev: (event: SwitcherEvent<T>) => void;
        onNext: (event: SwitcherEvent<T>) => void;
    }
}
declare namespace alm.state {
    class SwitcherEvent<T = string> extends alm.event.Event<Switcher<T>> {
        static readonly change: string;
        static readonly prev: string;
        static readonly next: string;
        constructor(eventType: string, eventTarget: Switcher<T>, currentItemIndex: number, oldItemIndex: number, currentItemId: T, oldItemId: T, useTransition: boolean);
        clone(): SwitcherEvent<T>;
        toString(): string;
        readonly currentItemIndex: number;
        readonly oldItemIndex: number;
        readonly currentItemId: T;
        readonly oldItemId: T;
        readonly useTransition: boolean;
    }
}
declare namespace alm.state {
    import EventDispatcher = alm.event.EventDispatcher;
    class LoHi extends EventDispatcher {
        constructor(lowThreshold: number, highThreshold: number, initValue?: number);
        set(value: number): boolean;
        getIsHigh(): boolean;
        getValue(): number;
        getLowThreshold(): number;
        getHighThreshold(): number;
        setLowThreshold(threshold: number): void;
        setHighThreshold(threshold: number): void;
        private _set;
        private lowThreshold;
        private highThreshold;
        private value;
        private isHigh;
    }
}
declare namespace alm.state {
    class LoHiEvent extends alm.event.Event<LoHi> {
        static readonly change: string;
        static readonly low: string;
        static readonly high: string;
        constructor(eventType: string, eventTarget: LoHi, isHigh: boolean);
        clone(): LoHiEvent;
        toString(): string;
        readonly isHigh: boolean;
    }
}
declare namespace alm.math {
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
declare namespace alm.math {
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
declare namespace alm.math {
    class MinMax {
        constructor();
        add(n: number): void;
        min: number;
        max: number;
        private _min;
        private _max;
    }
}
declare namespace alm.math {
    class SimpleAverage {
        constructor();
        add(n: number): number;
        reset(): void;
        value: number;
        count: number;
        private _value;
        private _count;
    }
}
declare namespace alm.math {
    class SimpleMovingAverage {
        constructor(maxCount: number);
        add(n: number): number;
        reset(): void;
        value: number;
        maxCount: number;
        count: number;
        private _value;
        private _maxCount;
        private _count;
        private values;
    }
}
declare namespace alm.math {
    class MaxValue {
        constructor(maxLatestCount?: number);
        add(n: number): number;
        value: number;
        maxLatestCount: number;
        count: number;
        private _value;
        private _maxLatestCount;
        private _count;
        private values;
    }
}
declare namespace alm.math {
    class Circular {
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
declare namespace alm.math {
    class BinarySearch {
        constructor(list?: number[]);
        setList(list: number[]): void;
        searchNearest(value: number): number;
        leapNearest(value: number): {
            index0: number;
            index1: number;
            ratio: number;
        };
        private list;
    }
}
declare namespace alm.math {
    class MersenneTwister {
        constructor(seed: number);
        private static _mulUint32;
        private static _toNumber;
        setSeed(seed: number | number[]): void;
        private _nextInt;
        getInt(): number;
        getFloat(): number;
        private _mt;
        private _index;
    }
}
declare namespace alm.time {
    import EventDispatcher = alm.event.EventDispatcher;
    import EventListener = alm.event.EventListener;
    class AnimationFrameTicker extends EventDispatcher {
        constructor(frameRate?: number, tolerance?: number);
        start(): void;
        stop(): void;
        getIsRunning(): boolean;
        getTargetFrameRate(): number;
        getInterval(): number;
        getTolerance(): number;
        getToleranceDuration(): number;
        private updateHandler;
        static addEventListener(listener: alm.event.EventListener): void;
        static removeEventListener(listener: EventListener): void;
        private isRunning;
        private requestId;
        private targetFrameRate;
        private interval;
        private tolerance;
        private toleranceDuration;
        private frameStartTime;
        private static ticker;
        private static listenerCount;
    }
}
declare namespace alm.time {
    import Event = alm.event.Event;
    class AnimationFrameTickerEvent extends Event<AnimationFrameTicker> {
        static readonly tick: string;
        constructor(eventType: string, eventTarget: AnimationFrameTicker);
        clone(): AnimationFrameTickerEvent;
        toString(): string;
    }
}
declare namespace alm.time {
    import EventDispatcher = alm.event.EventDispatcher;
    class Timer extends EventDispatcher {
        constructor(interval?: number, repeatCount?: number);
        start(): void;
        stop(): void;
        reset(): void;
        restart(): void;
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
declare namespace alm.time {
    import Event = alm.event.Event;
    class TimerEvent extends Event<Timer> {
        static readonly tick: string;
        static readonly complete: string;
        constructor(eventType: string, eventTarget: Timer, elapsedCount?: number, repeatCount?: number, restCount?: number);
        clone(): TimerEvent;
        toString(): string;
        readonly elapsedCount: number;
        readonly repeatCount: number;
        readonly restCount: number;
    }
}
declare namespace alm.io {
    import EventDispatcher = alm.event.EventDispatcher;
    type CompleteFunction = (content: any, info?: any) => void;
    type ErrorFunction = (info?: any) => void;
    class FileLoader extends EventDispatcher {
        constructor(totalThreadCount?: number);
        require(url: string, type: string, id?: string): string;
        private addQuery;
        load(): void;
        private next;
        addHandler(handler: IFileHandler): void;
        private fileLoadCompleteHandler;
        private fileLoadErrorHandler;
        getQueryByQueryId(queryId: string): FileQuery;
        getQueryByUrl(url: string): FileQuery;
        isLoading(): boolean;
        getCurrentCount(): number;
        getTotalCount(): number;
        getContentByUrl<T = any>(url: string): T;
        getContentByQueryId<T = any>(textureId: string): T;
        getCurrentThreadCount(): number;
        getTotalThreadCount(): number;
        private isLoading_;
        private currentCount;
        private totalCount;
        private currentThreadCount;
        private totalThreadCount;
        private loadingQueries;
        private loadingQueryIndex;
        private queriesByQueryId;
        private queriesByUrl;
        private handlersByType;
        private static id;
    }
}
declare namespace alm.io {
    class FileLoaderProgressEvent extends alm.event.Event<FileLoader> {
        static readonly start: string;
        static readonly progress: string;
        static readonly complete: string;
        constructor(eventType: string, eventTarget: FileLoader, progress?: number, loadedCount?: number, totalCount?: number);
        clone(): FileLoaderProgressEvent;
        toString(): string;
        readonly progress: number;
        readonly loadedCount: number;
        readonly totalCount: number;
    }
}
declare namespace alm.io {
    class FileLoaderSuccessEvent extends alm.event.Event<FileLoader> {
        static readonly success: string;
        constructor(eventType: string, eventTarget: FileLoader, content: any, info?: any);
        clone(): FileLoaderSuccessEvent;
        toString(): string;
        readonly content: any;
        readonly info: any;
    }
}
declare namespace alm.io {
    class FileLoaderErrorEvent extends alm.event.Event<FileLoader> {
        static readonly error: string;
        constructor(eventType: string, eventTarget: FileLoader, info?: any);
        clone(): FileLoaderErrorEvent;
        toString(): string;
        readonly info: any;
    }
}
declare namespace alm.io {
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
declare namespace alm.io {
    interface IFileHandler {
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
    }
}
declare namespace alm.io {
    import IFileHandler = alm.io.IFileHandler;
    import CompleteFunction = alm.io.CompleteFunction;
    import ErrorFunction = alm.io.ErrorFunction;
    class ImageFileHandler implements IFileHandler {
        constructor(crossOrigin?: string);
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
        private crossOrigin;
        static readonly type: string;
    }
}
declare namespace alm.view {
    import IEventDispatcher = alm.event.IEventDispatcher;
    interface IView<T = any> extends IEventDispatcher {
        initialize(): void;
        ready(): void;
        finalize(): void;
        show(useTransition: boolean): void;
        hide(useTransition: boolean): void;
        getShowCommand(useTransition: boolean): cmd.Command;
        getHideCommand(useTransition: boolean): cmd.Command;
        getIsInitializing(): boolean;
        getIsInitialized(): boolean;
        getIsReadying(): boolean;
        getIsReadied(): boolean;
        getIsShowing(): boolean;
        getIsShown(): boolean;
        getIsHiding(): boolean;
        getIsHidden(): boolean;
        getIsFinalizing(): boolean;
        getIsFinalized(): boolean;
        getId(): string;
        getView(): T;
        getName(): string;
        setName(value: string): void;
        getAutoHideWithInit(): boolean;
        setAutoHideWithInit(value: boolean): void;
    }
}
declare namespace alm.view {
    import Event = alm.event.Event;
    class ViewEvent extends Event<View> {
        static readonly initializeBegin: string;
        static readonly initializeEnd: string;
        static readonly finalizeBegin: string;
        static readonly finalizeEnd: string;
        static readonly readyBegin: string;
        static readonly readyEnd: string;
        static readonly showBegin: string;
        static readonly showEnd: string;
        static readonly hideBegin: string;
        static readonly hideEnd: string;
        constructor(eventType: string, eventTarget: View);
        clone(): ViewEvent;
        toString(): string;
    }
}
declare namespace alm.view {
    import EventDispatcher = alm.event.EventDispatcher;
    abstract class View<T = any> extends EventDispatcher implements IView {
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
        getIsFinalizing(): boolean;
        getIsFinalized(): boolean;
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
        private isFinalizing;
        private isFinalized;
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
        static getLang(): string;
        static getLangFull(): string;
        static getIsTouchEnabled(): boolean;
        static getIsDownloadEnabled(): boolean;
        static getIsWebGlEnabled(): boolean;
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
        private static isWebGlEnabled;
        private static isRetina;
        private static devicePixelRatio;
        private static dpi;
        private static lang;
        private static langFull;
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
    class SessionStorage {
        static save(key: string, value: any): boolean;
        static load(key: string, defaultValue?: any): any;
        static remove(key: string): void;
        static isAvailable(): boolean;
        private static isAvailable_;
        private constructor();
    }
}
declare namespace alm.browser {
    enum KeyCode {
        backspace = 8,
        tab = 9,
        enter = 13,
        shift = 16,
        ctrl = 17,
        alt = 18,
        pauseBreak = 19,
        capsLock = 20,
        escape = 27,
        space = 32,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        leftArrow = 37,
        upArrow = 38,
        rightArrow = 39,
        downArrow = 40,
        insert = 45,
        delete = 46,
        key0 = 48,
        key1 = 49,
        key2 = 50,
        key3 = 51,
        key4 = 52,
        key5 = 53,
        key6 = 54,
        key7 = 55,
        key8 = 56,
        key9 = 57,
        closedParen = 48,
        exclamationMark = 49,
        atSign = 50,
        poundSign = 51,
        hash = 51,
        dollarSign = 52,
        percentSign = 53,
        caret = 54,
        hat = 54,
        ampersand = 55,
        star = 56,
        asterik = 56,
        openParen = 57,
        a = 65,
        b = 66,
        c = 67,
        d = 68,
        e = 69,
        f = 70,
        g = 71,
        h = 72,
        i = 73,
        j = 74,
        k = 75,
        l = 76,
        m = 77,
        n = 78,
        o = 79,
        p = 80,
        q = 81,
        r = 82,
        s = 83,
        t = 84,
        u = 85,
        v = 86,
        w = 87,
        x = 88,
        y = 89,
        z = 90,
        leftWindowKey = 91,
        rightWindowKey = 92,
        selectKey = 93,
        numpad0 = 96,
        numpad1 = 97,
        numpad2 = 98,
        numpad3 = 99,
        numpad4 = 100,
        numpad5 = 101,
        numpad6 = 102,
        numpad7 = 103,
        numpad8 = 104,
        numpad9 = 105,
        multiply = 106,
        add = 107,
        subtract = 109,
        decimalPoint = 110,
        divide = 111,
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
        numLock = 144,
        scrollLock = 145,
        semiColon = 186,
        equals = 187,
        comma = 188,
        dash = 189,
        period = 190,
        underScore = 189,
        plusSign = 187,
        forwardSlash = 191,
        tilde = 192,
        graveAccent = 192,
        openBracket = 219,
        closedBracket = 221,
        quote = 222
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
    class KeyWatcherEvent extends alm.event.Event<KeyWatcher> {
        static readonly keyUp: string;
        static readonly keyDown: string;
        constructor(eventType: string, eventTarget: KeyWatcher, originalEvent?: KeyboardEvent);
        clone(): KeyWatcherEvent;
        toString(): string;
        readonly originalEvent: KeyboardEvent;
        readonly key: string;
        readonly keyCode: number;
        readonly altKey: boolean;
        readonly ctrlKey: boolean;
        readonly shiftKey: boolean;
    }
}
declare namespace alm.browser {
    class WinWatcher {
        private static initialize;
        static start(target?: Window): void;
        static stop(): void;
        static apply(): void;
        static addEventListener(eventType: string, listener: (event: WinWatcherEvent) => void): void;
        static removeEventListener(eventType: string, listener: (event: WinWatcherEvent) => void): void;
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
        static getWidth(): number;
        private static width;
        static getHeight(): number;
        private static height;
        static getIsMobileOrientationResize(): boolean;
        static setIsMobileOrientationResize(value: boolean): void;
        private static isMobileOrientationResize;
        private static isInitialized;
        private static eventDispatcher;
        private constructor();
    }
}
declare namespace alm.browser {
    class WinWatcherEvent extends alm.event.Event<WinWatcher> {
        static readonly scroll: string;
        static readonly resize: string;
        constructor(eventType: string, eventTarget: WinWatcher, originalEvent?: Event, scrollTop?: number, scrollBottom?: number, width?: number, height?: number);
        clone(): WinWatcherEvent;
        toString(): string;
        readonly originalEvent: Event;
        readonly scrollTop: number;
        readonly scrollBottom: number;
        readonly width: number;
        readonly height: number;
    }
}
declare namespace alm.browser {
    class ScrollSectionTriggerEvent extends alm.event.Event<ScrollSectionTrigger> {
        static readonly change: string;
        constructor(eventType: string, target: ScrollSectionTrigger, currentSectionIndex: number, prevSectionIndex: number);
        readonly currentSectionIndex: number;
        readonly prevSectionIndex: number;
    }
}
declare namespace alm.browser {
    import EventDispatcher = alm.event.EventDispatcher;
    class ScrollSectionTrigger extends EventDispatcher {
        constructor(threshold?: number);
        start(): void;
        stop(): void;
        getIsRunning(): boolean;
        getCurrentIndex(): number;
        getPrevIndex(): number;
        getTriggerPositions(): number[];
        setTriggerPositions(positions: number[]): void;
        getThreshold(): number;
        setThreshold(ratio: number): void;
        private check;
        private updateThresholdPosition;
        private updateScrollPosition;
        private windowScrollHandler;
        private windowResizeHandler;
        private isRunning;
        private scrollPosition;
        private triggerPositions;
        private thresholdRatio;
        private thresholdPosition;
        private currentSectionIndex;
        private prevSectionIndex;
    }
}
declare namespace alm.browser {
    import EventDispatcher = alm.event.EventDispatcher;
    class ResponsiveObserver extends EventDispatcher {
        constructor();
        start(): void;
        stop(): void;
        setBreakpoints(breakPoints: number[]): void;
        getIsRunning(): boolean;
        getCurrentIndex(): number;
        getPrevIndex(): number;
        getBreakPoints(): number[];
        getBreakPointCount(): number;
        private check;
        private windowResizeHandler;
        private isRunning;
        private breakPoints;
        private breakPointCount;
        private currentIndex;
        private prevIndex;
    }
}
declare namespace alm.browser {
    class ResponsiveObserverEvent extends alm.event.Event<ResponsiveObserver> {
        static readonly change: string;
        constructor(eventType: string, target: ResponsiveObserver, currentIndex: number, prevIndex: number);
        readonly currentIndex: number;
        readonly prevIndex: number;
    }
}
declare namespace alm.browser {
    class Kiosk {
        private constructor();
        static disableInteraction(): void;
        private static doubleClickHandler;
        private static contextMenuHandler;
        static setStageSize(width: number, height: number): void;
        static ratioX(xPixel: number, clamp?: boolean): number;
        static ratioY(yPixel: number, clamp?: boolean): number;
        static coverRatioX(xPixel: number, clamp?: boolean): number;
        static coverRatioY(yPixel: number, clamp?: boolean): number;
        static containRatioX(xPixel: number, clamp?: boolean): number;
        static containRatioY(yPixel: number, clamp?: boolean): number;
        private static isInteractionDisabled;
        static getWidth(): number;
        private static width;
        static getHeight(): number;
        private static height;
        static getAspectRatio(): number;
        private static aspectRatio;
        static getNormalizedByCoverWidth(): number;
        private static normalizedByCoverWidth;
        static getNormalizedByCoverHeight(): number;
        private static normalizedByCoverHeight;
        static getNormalizedByContainWidth(): number;
        private static normalizedByContainWidth;
        static getNormalizedByContainHeight(): number;
        private static normalizedByContainHeight;
    }
}
declare namespace scn {
    import EventDispatcher = alm.event.EventDispatcher;
    import Hash = alm.util.Hash;
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
        getChildrenByName(): Hash<Scene>;
        getNumChildren(): number;
        getManager(): SceneManager;
        getPath(): string;
        getTransferInfo(): SceneTransferInfo;
        gotoScene(path: string, message?: any): void;
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
    class SceneEvent extends Event<Scene> {
        static readonly load: string;
        static readonly unload: string;
        static readonly arrive: string;
        static readonly leave: string;
        static readonly ascend: string;
        static readonly descend: string;
        static readonly loadComplete: string;
        static readonly unloadComplete: string;
        static readonly arriveComplete: string;
        static readonly leaveComplete: string;
        static readonly ascendComplete: string;
        static readonly descendComplete: string;
        constructor(eventType: string, eventTarget: Scene);
        clone(): SceneEvent;
        toString(): string;
    }
}
declare namespace scn {
    class SceneTransferInfo {
        constructor(transferId: number, departurePath: string, destinationPath: string, message?: any);
        getTransferId(): number;
        getDeparturePath(): string;
        getDestinationPath(): string;
        message: any;
        private transferId;
        private departurePath;
        private destinationPath;
    }
}
declare namespace scn {
    enum SceneState {
        idling = 0,
        loading = 1,
        unloading = 2,
        arriving = 3,
        leaving = 4,
        ascending = 5,
        descending = 6
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
declare namespace scn.core {
    interface IRootScene {
        new (manager: SceneManager): RootScene;
        getManager(): SceneManager;
    }
}
declare namespace scn.core {
    class RootScene extends Scene {
        constructor(manager: SceneManager);
        getManager(): SceneManager;
        private manager;
    }
}
declare namespace scn {
    import EventDispatcher = alm.event.EventDispatcher;
    import RootScene = scn.core.RootScene;
    class SceneManager extends EventDispatcher {
        constructor(name?: string, rootSceneClass?: (new (sceneManager: SceneManager) => RootScene));
        start(message?: any): void;
        goto(path: string, message?: any): void;
        resolvePath(path: string): string;
        addSceneAt(path: string): Scene;
        getName(): string;
        getRoot(): Scene;
        getSceneByPath(path: string): Scene;
        getParentSceneByPath(path: string): Scene;
        private getSceneBySceneNames;
        getSceneNamesByPath(path: string): string[];
        getSceneLevelByNames(names: string[]): number;
        getScenePathByNames(names: string[]): string;
        private createWaypoints;
        private setDirection;
        private dumpWaypoint;
        dumpAllPath(): void;
        private _dumpAllPath;
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
    class SceneManagerTransferEvent extends Event<SceneManager> {
        static readonly transferStart: string;
        static readonly transferComplete: string;
        constructor(eventType: string, eventTarget: SceneManager, transferInfo: SceneTransferInfo);
        clone(): SceneManagerTransferEvent;
        toString(): string;
        readonly transferInfo: SceneTransferInfo;
    }
}
declare namespace scn {
    import Event = alm.event.Event;
    class SceneManagerRequireSceneEvent extends Event<SceneManager> {
        static readonly requireScene: string;
        constructor(eventType: string, eventTarget: SceneManager, scenePath: string);
        clone(): SceneManagerRequireSceneEvent;
        toString(): string;
        readonly scenePath: string;
    }
}
declare namespace alm {
    function getVersion(): string;
}
