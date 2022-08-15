var alm;
(function (alm) {
    var util;
    (function (util) {
        class Time {
            static now() {
                return (window.performance || Date).now();
            }
            constructor() { }
        }
        util.Time = Time;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        class Easing {
            static linear(t) {
                return t;
            }
            static easeInQuad(t) {
                return (t /= 1) * t;
            }
            static easeOutQuad(t) {
                return -(t /= 1) * (t - 2);
            }
            static easeInOutQuad(t) {
                if ((t /= 0.5) < 1)
                    return 0.5 * t * t;
                return -0.5 * ((--t) * (t - 2) - 1);
            }
            static easeInCubic(t) {
                return (t /= 1) * t * t;
            }
            static easeOutCubic(t) {
                return (t = t - 1) * t * t + 1;
            }
            static easeInOutCubic(t) {
                if ((t /= 0.5) < 1)
                    return 0.5 * t * t * t;
                return 0.5 * ((t -= 2) * t * t + 2);
            }
            static easeInQuart(t) {
                return (t /= 1) * t * t * t;
            }
            static easeOutQuart(t) {
                return -((t = t - 1) * t * t * t - 1);
            }
            static easeInOutQuart(t) {
                if ((t /= 0.5) < 1)
                    return 0.5 * t * t * t * t;
                return -0.5 * ((t -= 2) * t * t * t - 2);
            }
            static easeInQuint(t) {
                return (t /= 1) * t * t * t * t;
            }
            static easeOutQuint(t) {
                return ((t = t - 1) * t * t * t * t + 1);
            }
            static easeInOutQuint(t) {
                if ((t /= 0.5) < 1)
                    return 0.5 * t * t * t * t * t;
                return 0.5 * ((t -= 2) * t * t * t * t + 2);
            }
            static easeInSine(t) {
                return -Math.cos(t * (Math.PI / 2)) + 1;
            }
            static easeOutSine(t) {
                return Math.sin(t * (Math.PI / 2));
            }
            static easeInOutSine(t) {
                return -0.5 * (Math.cos(Math.PI * t) - 1);
            }
            static easeInExpo(t) {
                if (t == 0)
                    return 0;
                return Math.pow(2, 10 * (t - 1));
            }
            static easeOutExpo(t) {
                if (t == 1)
                    return 1;
                return -Math.pow(2, -10 * t) + 1;
            }
            static easeInOutExpo(t) {
                if (t == 0)
                    return 0;
                if (t == 1)
                    return 1;
                if ((t /= 0.5) < 1)
                    return 0.5 * Math.pow(2, 10 * (t - 1));
                return 0.5 * (-Math.pow(2, -10 * --t) + 2);
            }
            static easeInCirc(t) {
                return -(Math.sqrt(1 - (t /= 1) * t) - 1);
            }
            static easeOutCirc(t) {
                return Math.sqrt(1 - (t = t - 1) * t);
            }
            static easeInOutCirc(t) {
                if ((t /= 0.5) < 1)
                    return -0.5 * (Math.sqrt(1 - t * t) - 1);
                return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            }
            static createEaseInElastic(s = 1.70158) {
                return function (t) {
                    let p = 0;
                    let a = 1;
                    if (t == 0)
                        return 0;
                    if ((t /= 1) == 1)
                        return 1;
                    if (p == 0)
                        p = 0.3;
                    if (a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else {
                        s = p / (2 * Math.PI) * Math.asin(1 / a);
                    }
                    return -a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p);
                };
            }
            static createEaseOutElastic(s = 1.70158) {
                return function (t) {
                    let p = 0;
                    let a = 1;
                    if (t == 0)
                        return 0;
                    if ((t /= 1) == 1)
                        return 1;
                    if (p == 0)
                        p = 0.3;
                    if (a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else {
                        s = p / (2 * Math.PI) * Math.asin(1 / a);
                    }
                    return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
                };
            }
            static createEaseInOutElastic(s = 1.70158) {
                return function (t) {
                    let p = 0;
                    let a = 1;
                    if (t == 0)
                        return 0;
                    if ((t /= 0.5) == 2)
                        return 1;
                    if (p == 0)
                        p = 0.3 * 1.5;
                    if (a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else {
                        s = p / (2 * Math.PI) * Math.asin(1 / a);
                    }
                    if (t < 1)
                        return -0.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p);
                    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
                };
            }
            static easeInElastic(t) {
                return Easing.defaultEaseInElastic(t);
            }
            static easeOutElastic(t) {
                return Easing.defaultEaseOutElastic(t);
            }
            static easeInOutElastic(t) {
                return Easing.defaultEaseInOutElastic(t);
            }
            static createEaseInBack(s = 1.70158) {
                return function (t) {
                    return (t /= 1) * t * ((s + 1) * t - s);
                };
            }
            static createEaseOutBack(s = 1.70158) {
                return function (t) {
                    return (t = t - 1) * t * ((s + 1) * t + s) + 1;
                };
            }
            static createEaseInOutBack(s = 1.70158) {
                return function (t) {
                    if ((t /= 0.5) < 1)
                        return 0.5 * t * t * (((s *= 1.525) + 1) * t - s);
                    return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
                };
            }
            static easeInBack(t) {
                return Easing.defaultEaseInBack(t);
            }
            static easeOutBack(t) {
                return Easing.defaultEaseOutBack(t);
            }
            static easeInOutBack(t) {
                return Easing.defaultEaseInOutBack(t);
            }
            static easeInBounce(t) {
                return 1 - Easing.easeOutBounce(1 - t);
            }
            static easeOutBounce(t) {
                if ((t /= 1) < (1 / 2.75)) {
                    return 7.5625 * t * t;
                }
                else if (t < (2 / 2.75)) {
                    return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
                }
                else if (t < (2.5 / 2.75)) {
                    return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
                }
                else {
                    return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
                }
            }
            static easeInOutBounce(t) {
                if (t < 0.5)
                    return Easing.easeInBounce(t * 2) * 0.5;
                return Easing.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
            }
        }
        Easing.defaultEaseInElastic = Easing.createEaseInElastic();
        Easing.defaultEaseOutElastic = Easing.createEaseOutElastic();
        Easing.defaultEaseInOutElastic = Easing.createEaseInOutElastic();
        Easing.defaultEaseInBack = Easing.createEaseInBack();
        Easing.defaultEaseOutBack = Easing.createEaseOutBack();
        Easing.defaultEaseInOutBack = Easing.createEaseInOutBack();
        math.Easing = Easing;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        class QueryString {
            constructor(url = '') {
                this.set(url);
            }
            set(url = '') {
                let search = '';
                if (url != '') {
                    const index = url.indexOf('?');
                    if (index != -1) {
                        search = url.substring(index);
                    }
                }
                else {
                    search = location.search;
                }
                this.hash = {};
                const pairs = search.substring(1).split('&');
                let pair;
                for (let i = 0; pairs[i]; ++i) {
                    pair = pairs[i].split('=');
                    this.hash[pair[0]] = pair[1];
                }
            }
            getString(key, defaultValue) {
                const value = this.hash[key];
                return value === undefined ? defaultValue : value;
            }
            getInt(key, defaultValue) {
                const value = parseInt(this.hash[key]);
                return isNaN(value) ? defaultValue : value;
            }
            getFloat(key, defaultValue) {
                const value = parseFloat(this.hash[key]);
                return isNaN(value) ? defaultValue : value;
            }
            getBool(key, defaultValue) {
                const value = this.hash[key];
                return value === undefined ? defaultValue : (value == true);
            }
            getHash() {
                return this.hash;
            }
            setHash(hash) {
                this.hash = hash;
            }
            setParam(key, value) {
                this.hash[key] = value;
            }
            removeParam(key) {
                delete this.hash[key];
            }
            hasParam(key) {
                return this.hash[key] !== undefined;
            }
            static getReplacedQueryStringUrl(url, key, value) {
                const regExp = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
                const separator = url.indexOf('?') !== -1 ? '&' : '?';
                if (url.match(regExp)) {
                    return url.replace(regExp, '$1' + key + '=' + value + '$2');
                }
                else {
                    return url + separator + key + '=' + value;
                }
            }
            static replaceQueryString(key, value) {
                const url = QueryString.getReplacedQueryStringUrl(window.location.href, key, value);
                const state = url.match(/^https?:\/{2,}.*?(\/.*)/)[1];
                window.history.replaceState(null, null, state);
            }
        }
        browser.QueryString = QueryString;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var debug;
    (function (debug) {
        var QueryString = alm.browser.QueryString;
        let LoggerLevel;
        (function (LoggerLevel) {
            LoggerLevel[LoggerLevel["verbose"] = 0] = "verbose";
            LoggerLevel[LoggerLevel["info"] = 1] = "info";
            LoggerLevel[LoggerLevel["warn"] = 2] = "warn";
            LoggerLevel[LoggerLevel["error"] = 3] = "error";
            LoggerLevel[LoggerLevel["silent"] = 4] = "silent";
        })(LoggerLevel = debug.LoggerLevel || (debug.LoggerLevel = {}));
        class NullLogging {
            verbose(prefix, messages) {
            }
            info(prefix, messages) {
            }
            warn(prefix, messages) {
            }
            error(prefix, messages) {
            }
        }
        debug.NullLogging = NullLogging;
        class ConsoleLogging {
            verbose(prefix, messages) {
                console.debug.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
            }
            info(prefix, messages) {
                console.log.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
            }
            warn(prefix, messages) {
                console.warn.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
            }
            error(prefix, messages) {
                console.error.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
            }
        }
        debug.ConsoleLogging = ConsoleLogging;
        class DOMLogging {
            constructor(dom, html) {
                this.dom = dom;
                this.html = html;
            }
            verbose(prefix, messages) {
                this.print(prefix, messages);
            }
            info(prefix, messages) {
                this.print(prefix, messages);
            }
            warn(prefix, messages) {
                this.print(prefix, messages);
            }
            error(prefix, messages) {
                this.print(prefix, messages);
            }
            print(prefix, messages) {
                const line = prefix + messages.join(', ');
                if (this.html) {
                    this.dom.innerHTML = line + '<br>\n' + this.dom.innerHTML;
                }
                else {
                    this.dom.innerText = line + '\n' + this.dom.innerText;
                }
            }
        }
        debug.DOMLogging = DOMLogging;
        class ParallelLogging {
            constructor(loggers) {
                this.loggers = loggers;
            }
            verbose(prefix, messages) {
                const n = this.loggers.length;
                for (let i = 0; i < n; ++i) {
                    this.loggers[i].verbose(prefix, messages);
                }
            }
            info(prefix, messages) {
                const n = this.loggers.length;
                for (let i = 0; i < n; ++i) {
                    this.loggers[i].info(prefix, messages);
                }
            }
            warn(prefix, messages) {
                const n = this.loggers.length;
                for (let i = 0; i < n; ++i) {
                    this.loggers[i].warn(prefix, messages);
                }
            }
            error(prefix, messages) {
                const n = this.loggers.length;
                for (let i = 0; i < n; ++i) {
                    this.loggers[i].error(prefix, messages);
                }
            }
        }
        debug.ParallelLogging = ParallelLogging;
        class Logger {
            constructor() { }
            static setLevelByQuery(key) {
                const level = new QueryString().getInt(key, LoggerLevel.silent);
                Logger.level = isNaN(level) ? LoggerLevel.silent : level;
            }
            static setNamespace(namespace) {
                Logger.namespace = namespace != '' ? (namespace + ' ') : '';
            }
            static verbose(...messages) {
                if (Logger.level <= LoggerLevel.verbose) {
                    Logger.logger.verbose('[' + Logger.namespace + 'Verbose] ', messages);
                }
            }
            static info(...messages) {
                if (Logger.level <= LoggerLevel.info) {
                    Logger.logger.info('[' + Logger.namespace + 'Info] ', messages);
                }
            }
            static warn(...messages) {
                if (Logger.level <= LoggerLevel.warn) {
                    Logger.logger.warn('[' + Logger.namespace + 'Warn] ', messages);
                }
            }
            static error(...messages) {
                if (Logger.level <= LoggerLevel.error) {
                    Logger.logger.error('[' + Logger.namespace + 'Error] ', messages);
                }
            }
            static warnIf(target, message, condition = true) {
                if (Logger.level <= LoggerLevel.warn && condition) {
                    Logger.logger.warn('[' + Logger.namespace + 'Warn] ', [message + ' : ' + target]);
                }
            }
            static errorIf(target, message, condition = true) {
                if (Logger.level <= LoggerLevel.error && condition) {
                    Logger.logger.error('[' + Logger.namespace + 'Error] ', [message + ' : ' + target]);
                }
            }
            static stackTrace() {
                console.trace();
            }
        }
        Logger.level = LoggerLevel.verbose;
        Logger.logger = new ConsoleLogging();
        Logger.namespace = '';
        debug.Logger = Logger;
    })(debug = alm.debug || (alm.debug = {}));
})(alm || (alm = {}));
function trace(...messages) {
    alm.debug.Logger.info.apply(trace.caller, arguments);
}
function throwWarn(target, message, condition = true) {
    alm.debug.Logger.warnIf.apply(null, arguments);
}
function throwError(target, message, condition = true) {
    alm.debug.Logger.errorIf.apply(null, arguments);
}
var alm;
(function (alm) {
    var debug;
    (function (debug) {
        var Time = alm.util.Time;
        class FpsMonitor {
            constructor() {
                this.reset();
            }
            reset() {
                this.frameRate = 0;
                this.frameCount = 0;
                this.startTime = Time.now();
                this.actualFrameRate = -1;
                this.dummyFrameRate = -1;
            }
            update() {
                ++this.frameCount;
                const currentTime = Time.now();
                const elapsedTime = currentTime - this.startTime;
                if (elapsedTime >= 1000) {
                    this.actualFrameRate = 1000 * this.frameCount / elapsedTime;
                    this.frameCount = 0;
                    this.startTime = currentTime;
                    if (this.dummyFrameRate < 0) {
                        this.frameRate = this.actualFrameRate;
                    }
                }
            }
            setDummyFrameRate(frameRate) {
                this.dummyFrameRate = frameRate;
                this.frameRate = this.dummyFrameRate;
            }
            clearDummyFrameRate() {
                this.dummyFrameRate = -1;
                this.frameRate = this.actualFrameRate;
            }
            getFrameRate() {
                return this.frameRate;
            }
        }
        debug.FpsMonitor = FpsMonitor;
    })(debug = alm.debug || (alm.debug = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var event;
    (function (event) {
        class Event {
            constructor(type, target, data = null) {
                this.type = type;
                this.target = target;
                this.data = data;
            }
        }
        event.Event = Event;
    })(event = alm.event || (alm.event = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var event;
    (function (event_1) {
        var Logger = alm.debug.Logger;
        class EventDispatcher {
            constructor(target = null) {
                this.target = target || this;
                this.listeners = {};
            }
            addEventListener(eventType, listener) {
                if (typeof (listener) != 'function') {
                    Logger.warn('[EventDispatcher] addEventListener : listener is not function, eventType = \'' + eventType + '\', listener = ' + listener);
                    return false;
                }
                let listeners = this.listeners[eventType];
                if (listeners) {
                    const numListeners = listeners.length;
                    for (let i = 0; i < numListeners; ++i) {
                        if (listener == listeners[i])
                            return false;
                    }
                }
                else {
                    this.listeners[eventType] = listeners = [];
                }
                listeners.push(listener);
                return true;
            }
            removeEventListener(eventType, listener) {
                if (typeof (listener) != 'function') {
                    Logger.warn('[EventDispatcher] removeEventListener : listener is not function, eventType = \'' + eventType + '\', listener = ' + listener);
                    return false;
                }
                let result = false;
                let listeners = this.listeners[eventType];
                if (listeners) {
                    const numListeners = listeners.length;
                    for (let i = 0; i < numListeners; ++i) {
                        if (listener == listeners[i]) {
                            listeners.splice(i, 1);
                            result = true;
                            break;
                        }
                    }
                    if (listeners.length == 0) {
                        delete this.listeners[eventType];
                    }
                }
                return result;
            }
            removeAllEventListener(eventType = null) {
                if (eventType) {
                    delete this.listeners[eventType];
                }
                else {
                    this.listeners = {};
                }
            }
            hasEventListener(eventType) {
                return this.listeners[eventType] != null;
            }
            dispatchEvent(event) {
                let listeners = this.listeners[event.type];
                if (listeners) {
                    listeners = listeners.concat();
                    const numListeners = listeners.length;
                    for (let i = 0; i < numListeners; ++i) {
                        listeners[i].call(this.target, event);
                    }
                }
            }
            dispatchEventType(eventType, eventTarget = null, data = null) {
                this.dispatchEvent(new event_1.Event(eventType, eventTarget, data));
            }
        }
        event_1.EventDispatcher = EventDispatcher;
    })(event = alm.event || (alm.event = {}));
})(alm || (alm = {}));
var cmd;
(function (cmd) {
    let CommandState;
    (function (CommandState) {
        CommandState[CommandState["sleeping"] = 0] = "sleeping";
        CommandState[CommandState["executing"] = 1] = "executing";
        CommandState[CommandState["interrupting"] = 2] = "interrupting";
    })(CommandState = cmd.CommandState || (cmd.CommandState = {}));
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Event = alm.event.Event;
    class CommandEvent extends Event {
        constructor(eventType, eventTarget) {
            super(eventType, eventTarget);
        }
        clone() {
            return new CommandEvent(this.type, this.target);
        }
        toString() {
            return '[CommandEvent] type = ' + this.type;
        }
    }
    CommandEvent.complete = 'CommandEvent.complete';
    cmd.CommandEvent = CommandEvent;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var EventDispatcher = alm.event.EventDispatcher;
    class Command extends EventDispatcher {
        constructor(executeFunction = null, interruptFunction = null, destroyFunction = null) {
            super();
            this.setExecuteFunction(executeFunction);
            this.setInterruptFunction(interruptFunction);
            this.setDestroyFunction(destroyFunction);
            this.state = cmd.CommandState.sleeping;
            this.self = this;
            this.parent = null;
        }
        execute() {
            if (this.state > cmd.CommandState.sleeping) {
                throw new Error('[Command.execute] + Command is already executing.');
            }
            this.state = cmd.CommandState.executing;
            this.getExecuteFunction().call(this, this);
        }
        interrupt() {
            if (this.state == cmd.CommandState.executing) {
                this.state = cmd.CommandState.interrupting;
                this.getInterruptFunction().call(this, this);
            }
        }
        destroy() {
            this.state = cmd.CommandState.sleeping;
            this.getDestroyFunction().call(this, this);
            this.parent = null;
            this.executeFunction = null;
            this.interruptFunction = null;
            this.destroyFunction = null;
        }
        notifyComplete() {
            switch (this.state) {
                case cmd.CommandState.sleeping:
                    break;
                case cmd.CommandState.executing:
                    this.dispatchEvent(new cmd.CommandEvent(cmd.CommandEvent.complete, this));
                    this.destroy();
                    break;
                case cmd.CommandState.interrupting:
                    this.dispatchEvent(new cmd.CommandEvent(cmd.CommandEvent.complete, this));
                    this.destroy();
                    break;
            }
        }
        implExecuteFunction(command) {
            this.notifyComplete();
        }
        implInterruptFunction(command) {
        }
        implDestroyFunction(command) {
        }
        getExecuteFunction() { return this.executeFunction || this.implExecuteFunction; }
        ;
        setExecuteFunction(func) { this.executeFunction = func; }
        getInterruptFunction() { return this.interruptFunction || this.implInterruptFunction; }
        ;
        setInterruptFunction(func) { this.interruptFunction = func; }
        getDestroyFunction() { return this.destroyFunction || this.implDestroyFunction; }
        ;
        setDestroyFunction(func) { this.destroyFunction = func; }
        getState() { return this.state; }
        getParent() { return this.parent; }
        setParent(parent) { this.parent = parent; }
        getSelf() { return this.self; }
    }
    cmd.Command = Command;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    class CommandList extends cmd.Command {
        constructor(...commands) {
            super();
            this.commands = [];
            this.addCommand(...commands);
        }
        addCommand(...commands) {
            if (commands.length > 0) {
                this.preProcess(commands);
                this.commands = this.getCommands().concat(commands);
            }
        }
        insertCommand(...commands) {
            this.insertCommandAt(0, ...commands);
        }
        insertCommandAt(index, ...commands) {
            if (commands.length > 0) {
                this.preProcess(commands);
                Array.prototype.splice.apply(this.getCommands(), [index, 0].concat(commands));
            }
        }
        addCommandArray(commands) {
            this.addCommand(...commands);
        }
        insertCommandArray(commands) {
            this.insertCommand(...commands);
        }
        insertCommandArrayAt(index, commands) {
            this.insertCommandAt(index, ...commands);
        }
        getLength() {
            return this.commands.length;
        }
        getCommandByIndex(index) { return this.commands[index]; }
        getCommands() { return this.commands; }
        preProcess(commands) {
            const numCommands = commands.length;
            let command;
            for (let i = 0; i < numCommands; ++i) {
                command = commands[i];
                if (typeof (command) == 'function')
                    commands[i] = command = new cmd.Func(command);
                command.setParent(this);
            }
        }
        implExecuteFunction(command) {
            this.notifyComplete();
        }
        implInterruptFunction(command) {
        }
        implDestroyFunction(command) {
        }
    }
    cmd.CommandList = CommandList;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    class Break extends cmd.Command {
        constructor() {
            super();
        }
        implExecuteFunction(command) {
            const func = this.getParent()['notifyBreak'];
            if (func)
                func();
            this.notifyComplete();
        }
        implInterruptFunction(command) {
        }
        implDestroyFunction(command) {
        }
    }
    cmd.Break = Break;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    class Return extends cmd.Command {
        constructor() {
            super();
        }
        implExecuteFunction(command) {
            const func = this.getParent()['notifyReturn'];
            if (func)
                func();
            this.notifyComplete();
        }
        implInterruptFunction(command) {
        }
        implDestroyFunction(command) {
        }
    }
    cmd.Return = Return;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    class Log extends cmd.Command {
        constructor(...messages) {
            super();
            this.messages = messages;
        }
        implExecuteFunction(command) {
            console.log.apply(console, Array.prototype.slice.call(this.messages));
            this.notifyComplete();
        }
        implInterruptFunction(command) {
        }
        implDestroyFunction(command) {
            this.messages = null;
        }
        getMessages() { return this.messages; }
        setMessages(messages) { this.messages = messages; }
    }
    cmd.Log = Log;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    class Wait extends cmd.Command {
        constructor(time = 1000) {
            super();
            this.completeHandler = () => {
                this.notifyComplete();
            };
            this.time = time;
            this.timerId = -1;
        }
        implExecuteFunction(command) {
            this.timerId = window.setTimeout(this.completeHandler, this.time);
        }
        implInterruptFunction(command) {
            this.cancel();
        }
        implDestroyFunction(command) {
            this.cancel();
        }
        cancel() {
            if (this.timerId != -1) {
                clearTimeout(this.timerId);
                this.timerId = -1;
            }
        }
        getTime() { return this.time; }
        setTime(time) { this.time = time; }
    }
    cmd.Wait = Wait;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    class Func extends cmd.Command {
        constructor(func = null, args = [], eventDispatcher = null, eventType = null) {
            super();
            this.completeHandler = (event) => {
                this.notifyComplete();
            };
            this.func = func;
            this.args = args;
            this.eventDispatcher = eventDispatcher;
            this.eventType = eventType;
        }
        implExecuteFunction(command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.addEventListener(this.eventType, this.completeHandler);
                if (this.args) {
                    this.func(...this.args);
                }
                else {
                    this.func();
                }
            }
            else {
                if (this.args) {
                    this.func(...this.args);
                }
                else {
                    this.func();
                }
                this.notifyComplete();
            }
        }
        implInterruptFunction(command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.removeEventListener(this.eventType, this.completeHandler);
            }
        }
        implDestroyFunction(command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.removeEventListener(this.eventType, this.completeHandler);
            }
            this.func = null;
            this.args = null;
            this.eventDispatcher = null;
            this.eventType = null;
        }
        getFunction() { return this.func; }
        setFunction(func) { this.func = func; }
        getArguments() { return this.args; }
        setArguments(args) { this.args = args; }
        getEventDispatcher() { return this.eventDispatcher; }
        setEventDispatcher(eventDispatcher) { this.eventDispatcher = eventDispatcher; }
        getEventType() { return this.eventType; }
        setEventType(eventType) { this.eventType = eventType; }
    }
    cmd.Func = Func;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    class Listen extends cmd.Command {
        constructor(eventDispatcher = null, eventType = null) {
            super();
            this.completeHandler = (event) => {
                this.notifyComplete();
            };
            this.eventDispatcher = eventDispatcher;
            this.eventType = eventType;
        }
        implExecuteFunction(command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.addEventListener(this.eventType, this.completeHandler);
            }
        }
        implInterruptFunction(command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.removeEventListener(this.eventType, this.completeHandler);
            }
        }
        implDestroyFunction(command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.removeEventListener(this.eventType, this.completeHandler);
            }
            this.eventType = null;
            this.eventDispatcher = null;
        }
        getEventDispatcher() { return this.eventDispatcher; }
        setEventDispatcher(eventDispatcher) { this.eventDispatcher = eventDispatcher; }
        getEventType() { return this.eventType; }
        setEventType(eventType) { this.eventType = eventType; }
    }
    cmd.Listen = Listen;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Easing = alm.math.Easing;
    var Time = alm.util.Time;
    class Tween extends cmd.Command {
        constructor(target, to, from = null, duration = 1000, easing = Easing.linear, onStart = null, onUpdate = null, onComplete = null) {
            super();
            this.intervalHandler = () => {
                const elapsedTime = Time.now() - this.startTime;
                if (elapsedTime < this.duration) {
                    this.apply(elapsedTime / this.duration);
                    if (this.onUpdate)
                        this.onUpdate(this.progressTime, this.progressValue);
                }
                else {
                    this.apply(1);
                    this.cancel();
                    if (this.onUpdate)
                        this.onUpdate(this.progressTime, this.progressValue);
                    if (this.onComplete)
                        this.onComplete(this.progressTime, this.progressValue);
                    this.notifyComplete();
                }
            };
            this.tweenTarget = target;
            this.to = to;
            this.from = from;
            this.duration = duration;
            this.easing = easing;
            this.onStart = onStart;
            this.onUpdate = onUpdate;
            this.onComplete = onComplete;
            this.progressTime = 0;
            this.progressValue = 0;
            this.startTime = 0;
            this.timerId = -1;
        }
        implExecuteFunction(command) {
            this.internalFrom = {};
            let value0;
            let value1;
            for (let key in this.to) {
                value1 = this.to[key];
                if (this.from && this.from[key] != null) {
                    this.internalFrom[key] = this.from[key];
                }
                else {
                    this.internalFrom[key] = this.tweenTarget[key];
                }
            }
            if (this.duration > 0) {
                this.timerId = window.setInterval(this.intervalHandler, Tween.updateInterval);
                this.startTime = Time.now();
                this.apply(0);
                if (this.onStart)
                    this.onStart(this.progressTime, this.progressValue);
            }
            else {
                this.apply(0);
                if (this.onStart)
                    this.onStart(this.progressTime, this.progressValue);
                this.apply(1);
                if (this.onUpdate)
                    this.onUpdate(this.progressTime, this.progressValue);
                if (this.onComplete)
                    this.onComplete(this.progressTime, this.progressValue);
                this.notifyComplete();
            }
        }
        implInterruptFunction(command) {
            this.cancel();
        }
        implDestroyFunction(command) {
            this.cancel();
            this.tweenTarget = null;
            this.to = null;
            this.from = null;
            this.easing = null;
            this.onStart = null;
            this.onUpdate = null;
            this.onComplete = null;
            this.internalFrom = null;
        }
        cancel() {
            if (this.timerId != -1) {
                clearInterval(this.timerId);
                this.timerId = -1;
            }
        }
        apply(timeRatio) {
            this.progressTime = timeRatio;
            this.progressValue = this.easing(this.progressTime);
            let value0;
            for (let key in this.to) {
                value0 = this.internalFrom[key];
                this.tweenTarget[key] = value0 + (this.to[key] - value0) * this.progressValue;
            }
        }
        getTarget() { return this.tweenTarget; }
        setTarget(target) { this.tweenTarget = target; }
        getDuration() { return this.duration; }
        setDuration(duration) { this.duration = duration; }
        getTo() { return this.to; }
        setTo(to) { this.to = to; }
        getFrom() { return this.from; }
        setFrom(from) { this.from = from; }
        getEasing() { return this.easing; }
        setEasing(easing) { this.easing = easing; }
        getOnStart() { return this.onStart; }
        setOnStart(func) { this.onStart = func; }
        getOnUpdate() { return this.onUpdate; }
        setOnUpdate(func) { this.onUpdate = func; }
        getOnComplete() { return this.onComplete; }
        setOnComplete(func) { this.onComplete = func; }
        getProgressTime() { return this.progressTime; }
        getProgressValue() { return this.progressValue; }
        getUpdateInterval() { return Tween.updateInterval; }
        setUpdateInterval(milliseconds) { Tween.updateInterval = milliseconds; }
    }
    Tween.updateInterval = 1000 / 60;
    cmd.Tween = Tween;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    class If extends cmd.Command {
        constructor(condition = false, then = null, reject = null) {
            super();
            this.completeHandler = (event) => {
                this.selectedCommand.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                this.selectedCommand = null;
                this.notifyComplete();
            };
            this.condition = condition;
            this.then = then;
            this.reject = reject;
            this.selectedCommand = null;
        }
        implExecuteFunction(command) {
            let result;
            if (typeof this.condition === 'function') {
                result = this.condition();
            }
            else {
                result = this.condition;
            }
            if (result) {
                if (this.then) {
                    this.selectedCommand = this.then;
                }
            }
            else {
                if (this.reject) {
                    this.selectedCommand = this.reject;
                }
            }
            if (this.selectedCommand) {
                this.selectedCommand.addEventListener(cmd.CommandEvent.complete, this.completeHandler);
                this.selectedCommand.execute();
            }
            else {
                this.notifyComplete();
            }
        }
        implInterruptFunction(command) {
            if (this.selectedCommand) {
                this.selectedCommand.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                this.selectedCommand.interrupt();
                this.selectedCommand = null;
            }
        }
        implDestroyFunction(command) {
            if (this.selectedCommand) {
                this.selectedCommand.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                this.selectedCommand.destroy();
                this.selectedCommand = null;
            }
            this.condition = null;
            this.then = null;
            this.reject = null;
        }
        getCondition() { return this.condition; }
        setCondition(condition) { this.condition = condition; }
        getThen() { return this.then; }
        setThen(then) { this.then = then; }
        getReject() { return this.reject; }
        setReject(reject) { this.reject = reject; }
    }
    cmd.If = If;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    class Serial extends cmd.CommandList {
        constructor(...commands) {
            super(...commands);
            this.completeHandler = (event) => {
                this.currentCommand.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                this.currentCommand = null;
                if (++this.position >= this.getLength()) {
                    this.notifyComplete();
                }
                else {
                    this.next();
                }
            };
            this.currentCommand = null;
            this.position = -1;
            this.isPaused = false;
            this.isCompleteOnPaused = false;
        }
        addCommand(...commands) {
            super.addCommand(...commands);
        }
        insertCommand(...commands) {
            super.insertCommandAt(this.position + 1, ...commands);
        }
        addCommandArray(commands) {
            this.addCommand(...commands);
        }
        insertCommandArray(commands) {
            this.insertCommand(...commands);
        }
        next() {
            this.currentCommand = this.getCommandByIndex(this.position);
            this.currentCommand.addEventListener(cmd.CommandEvent.complete, this.completeHandler);
            this.currentCommand.execute();
        }
        implExecuteFunction(command) {
            this.position = 0;
            if (this.getLength() > 0) {
                this.next();
            }
            else {
                this.notifyComplete();
            }
        }
        implInterruptFunction(command) {
            if (this.currentCommand) {
                this.currentCommand.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                this.currentCommand.interrupt();
                this.currentCommand = null;
            }
            this.position = -1;
            super.implInterruptFunction(command);
        }
        implDestroyFunction(command) {
            if (this.currentCommand) {
                this.currentCommand.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                this.currentCommand.destroy();
                this.currentCommand = null;
            }
            this.position = -1;
            this.isPaused = false;
            this.isCompleteOnPaused = false;
            super.implDestroyFunction(command);
        }
        implNotifyBreak() {
            if (this.currentCommand.getState() == cmd.CommandState.executing) {
                this.currentCommand.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                this.currentCommand.interrupt();
            }
            this.notifyComplete();
        }
        implNotifyReturn() {
            if (this.currentCommand.getState() == cmd.CommandState.executing) {
                this.currentCommand.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                this.currentCommand.interrupt();
            }
            const func = this.getParent()['notifyReturn'];
            if (func)
                func();
            this.destroy();
        }
        getPosition() { return this.position; }
    }
    cmd.Serial = Serial;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    class Parallel extends cmd.CommandList {
        constructor(...commands) {
            super(...commands);
            this.completeHandler = (event) => {
                if (++this.completeCount >= this.getLength()) {
                    this.notifyComplete();
                }
            };
            this.completeCount = 0;
        }
        addCommand(...commands) {
            super.addCommand(...commands);
        }
        insertCommand(...commands) {
            this.addCommand(...commands);
        }
        addCommandArray(commands) {
            this.addCommand(...commands);
        }
        insertCommandArray(commands) {
            this.addCommand(...commands);
        }
        implExecuteFunction(command) {
            this.completeCount = 0;
            const length = this.getLength();
            if (length > 0) {
                const commands = this.getCommands();
                let command;
                for (let i = 0; i < length; ++i) {
                    command = commands[i];
                    command.addEventListener(cmd.CommandEvent.complete, this.completeHandler);
                    command.execute();
                }
            }
            else {
                this.notifyComplete();
            }
        }
        implInterruptFunction(command) {
            const length = this.getLength();
            if (length > 0) {
                const commands = this.getCommands();
                let command;
                for (let i = 0; i < length; ++i) {
                    command = commands[i];
                    command.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                    command.interrupt();
                }
            }
            super.implInterruptFunction(command);
        }
        implDestroyFunction(command) {
            const length = this.getLength();
            if (length > 0) {
                const commands = this.getCommands();
                let command;
                for (let i = 0; i < length; ++i) {
                    command = commands[i];
                    command.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                    command.destroy();
                }
            }
            super.implDestroyFunction(command);
        }
        implNotifyBreak() {
            const length = this.getLength();
            if (length > 0) {
                const commands = this.getCommands();
                let command;
                for (let i = 0; i < length; ++i) {
                    command = commands[i];
                    if (command.getState() == cmd.CommandState.executing) {
                        command.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                        command.interrupt();
                    }
                }
            }
            this.notifyComplete();
        }
        implNotifyReturn() {
            const length = this.getLength();
            if (length > 0) {
                const commands = this.getCommands();
                let command;
                for (let i = 0; i < length; ++i) {
                    command = commands[i];
                    if (command.getState() == cmd.CommandState.executing) {
                        command.removeEventListener(cmd.CommandEvent.complete, this.completeHandler);
                        command.interrupt();
                    }
                }
            }
            const func = this.getParent()['notifyReturn'];
            if (func)
                func();
            this.destroy();
        }
        getCompleteCount() { return this.completeCount; }
    }
    cmd.Parallel = Parallel;
})(cmd || (cmd = {}));
var alm;
(function (alm) {
    var geom;
    (function (geom) {
        class Vector2 {
            constructor(x = 0, y = 0) {
                this.set(x, y);
            }
            set(x, y) {
                this.x = x;
                this.y = y;
            }
            copyTo(point) {
                point.set(this.x, this.y);
            }
            getClone() {
                return new Vector2(this.x, this.y);
            }
            zero() {
                this.set(0, 0);
            }
            normalize() {
                const l = this.getLength();
                this.x /= l;
                this.y /= l;
            }
            getLength() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            }
            getSquareDistance(point) {
                const dx = point.x - this.x;
                const dy = point.y - this.y;
                return dx * dx + dy * dy;
            }
            getDistance(point) {
                return Math.sqrt(this.getSquareDistance(point));
            }
        }
        geom.Vector2 = Vector2;
    })(geom = alm.geom || (alm.geom = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var geom;
    (function (geom) {
        class Vector3 {
            constructor(x = 0, y = 0, z = 0) {
                this.set(x, y, z);
            }
            set(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
            }
            copyTo(point) {
                point.set(this.x, this.y, this.z);
            }
            getClone() {
                return new Vector3(this.x, this.y, this.z);
            }
            zero() {
                this.set(0, 0, 0);
            }
            normalize() {
                const l = this.getLength();
                this.x /= l;
                this.y /= l;
                this.z /= l;
            }
            getLength() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            }
            getSquareDistance(point) {
                const dx = point.x - this.x;
                const dy = point.y - this.y;
                const dz = point.z - this.z;
                return dx * dx + dy * dy + dz * dz;
            }
            getDistance(point) {
                return Math.sqrt(this.getSquareDistance(point));
            }
        }
        geom.Vector3 = Vector3;
    })(geom = alm.geom || (alm.geom = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var geom;
    (function (geom) {
        class Rectangle {
            constructor(x = 0, y = 0, width = 0, height = 0) {
                this.set(x, y, width, height);
            }
            set(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            }
            copyTo(rect) {
                rect.set(this.x, this.y, this.width, this.height);
            }
            getClone() {
                return new Rectangle(this.x, this.y, this.width, this.height);
            }
            getTop() {
                return this.y;
            }
            getBottom() {
                return this.y + this.height;
            }
            getLeft() {
                return this.x;
            }
            getRight() {
                return this.x + this.width;
            }
            getTopLeft() {
                return new geom.Vector2(this.getLeft(), this.getTop());
            }
            getTopRight() {
                return new geom.Vector2(this.getRight(), this.getTop());
            }
            getBottomLeft() {
                return new geom.Vector2(this.getLeft(), this.getBottom());
            }
            getBottomRight() {
                return new geom.Vector2(this.getRight(), this.getBottom());
            }
        }
        geom.Rectangle = Rectangle;
    })(geom = alm.geom || (alm.geom = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var geom;
    (function (geom) {
        let Align;
        (function (Align) {
            Align[Align["topLeft"] = 0] = "topLeft";
            Align[Align["topCenter"] = 1] = "topCenter";
            Align[Align["topRight"] = 2] = "topRight";
            Align[Align["middleLeft"] = 3] = "middleLeft";
            Align[Align["middleCenter"] = 4] = "middleCenter";
            Align[Align["middleRight"] = 5] = "middleRight";
            Align[Align["bottomLeft"] = 6] = "bottomLeft";
            Align[Align["bottomCenter"] = 7] = "bottomCenter";
            Align[Align["bottomRight"] = 8] = "bottomRight";
        })(Align = geom.Align || (geom.Align = {}));
        let ScaleMode;
        (function (ScaleMode) {
            ScaleMode[ScaleMode["exactFit"] = 0] = "exactFit";
            ScaleMode[ScaleMode["showAll"] = 1] = "showAll";
            ScaleMode[ScaleMode["noBorder"] = 2] = "noBorder";
            ScaleMode[ScaleMode["noScale"] = 3] = "noScale";
        })(ScaleMode = geom.ScaleMode || (geom.ScaleMode = {}));
        class Boxer {
            static resize(target, bounds, scaleMode = ScaleMode.showAll, align = Align.middleCenter) {
                let tx = target.x;
                let ty = target.y;
                let tw = target.width;
                let th = target.height;
                const bx = bounds.x;
                const by = bounds.y;
                const bw = bounds.width;
                const bh = bounds.height;
                switch (scaleMode) {
                    case ScaleMode.showAll:
                    case ScaleMode.noBorder:
                        const ratioW = bw / tw;
                        const ratioH = bh / th;
                        const ratio = scaleMode == ScaleMode.showAll ? (ratioW < ratioH ? ratioW : ratioH) : (ratioW > ratioH ? ratioW : ratioH);
                        tw *= ratio;
                        th *= ratio;
                        break;
                    case ScaleMode.exactFit:
                        return new geom.Rectangle(bx, by, bw, bh);
                }
                tx = bx + ((align == Align.topLeft || align == Align.middleLeft || align == Align.bottomLeft) ? 0 :
                    (align == Align.topRight || align == Align.middleRight || align == Align.bottomRight) ? (bw - tw) : (bw - tw) / 2);
                ty = by + ((align == Align.topLeft || align == Align.topCenter || align == Align.topRight) ? 0 :
                    (align == Align.bottomLeft || align == Align.bottomCenter || align == Align.bottomRight) ? (bh - th) : (bh - th) / 2);
                return new geom.Rectangle(tx, ty, tw, th);
            }
            constructor() { }
        }
        geom.Boxer = Boxer;
    })(geom = alm.geom || (alm.geom = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        class Obj {
            static each(target, func) {
                if (target == null)
                    return;
                Object.keys(target).forEach((key) => {
                    func(key, target[key]);
                });
            }
            static get(target, key, defaultValue) {
                const value = target[key];
                return typeof value !== 'undefined' ? value : defaultValue;
            }
            constructor() { }
        }
        util.Obj = Obj;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        class Arr {
            static sequence(count, init = 0, step = 1) {
                const result = new Array(count);
                let v = init;
                for (let i = 0; i < count; ++i) {
                    result[i] = v;
                    v += step;
                }
                return result;
            }
            static unique(list) {
                return list.filter(function (x, i, self) {
                    return self.indexOf(x) === i;
                });
            }
            static duplicated(list, unique = false) {
                if (unique) {
                    return list.filter(function (x, i, self) {
                        return self.indexOf(x) !== self.lastIndexOf(x);
                    });
                }
                else {
                    return list.filter(function (x, i, self) {
                        return (self.indexOf(x) === i) && (self.lastIndexOf(x) !== i);
                    });
                }
            }
            static roundRobin(list1, list2, callback) {
                let i, j, p = 1;
                const m = list1.length;
                const n = list2.length;
                for (i = 0; i < m; ++i) {
                    for (j = i + 1; j < n; ++j) {
                        callback(p++, i, j, list1[i], list2[j]);
                    }
                }
            }
            static swap(list, index1, index2) {
                const tmp = list[index1];
                list[index1] = list[index2];
                list[index2] = tmp;
            }
            static shuffle(list) {
                for (let i = list.length - 1; i > 0; --i) {
                    Arr.swap(list, i, Math.floor(Math.random() * (i + 1)));
                }
            }
            static sort(list, asc = true) {
                list.sort(asc ? function (a, b) { return a - b; } : function (a, b) { return b - a; });
            }
            static choose(list) {
                return list[Math.floor(Math.random() * list.length)];
            }
            static clean(list) {
                return list.filter(Boolean);
            }
            static update(list, f) {
                let n = list.length;
                for (let i = 0; i < n; ++i) {
                    const item = list[i];
                    if (f(item) === false) {
                        list.splice(i, 1);
                        --i;
                        --n;
                    }
                }
            }
            constructor() { }
        }
        util.Arr = Arr;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        class Num {
            constructor() { }
            static map(value, srcA, srcB, dstA, dstB, clamp = true) {
                if (srcA === srcB)
                    return dstA;
                if (clamp) {
                    if (srcA < srcB) {
                        if (value < srcA)
                            value = srcA;
                        else if (value > srcB)
                            value = srcB;
                    }
                    else {
                        if (value < srcB)
                            value = srcB;
                        else if (value > srcA)
                            value = srcA;
                    }
                }
                return (value - srcA) * (dstB - dstA) / (srcB - srcA) + dstA;
            }
            static ease(value, srcA, srcB, dstA, dstB, easing) {
                if (srcA === srcB)
                    return dstA;
                if (srcA < srcB) {
                    if (value < srcA)
                        value = srcA;
                    else if (value > srcB)
                        value = srcB;
                    return easing((value - srcA) / (srcB - srcA)) * (dstB - dstA) + dstA;
                }
                else {
                    if (value < srcB)
                        value = srcB;
                    else if (value > srcA)
                        value = srcA;
                    return easing((value - srcB) / (srcA - srcB)) * (dstB - dstA) + dstA;
                }
            }
            static clamp(value, min, max) {
                return value < min ? min : (value > max ? max : value);
            }
            static clampAbs(value, minAbs, maxAbs) {
                if (value > 0) {
                    return value < minAbs ? minAbs : (value > maxAbs ? maxAbs : value);
                }
                else {
                    value = Math.abs(value);
                    return -(value < minAbs ? minAbs : (value > maxAbs ? maxAbs : value));
                }
            }
            static lerp(t, a, b, clamp = true) {
                if (clamp) {
                    if (t < 0)
                        t = 0;
                    else if (t > 1)
                        t = 1;
                }
                return a * (1 - t) + b * t;
            }
            static random(min = 0, max = 1) {
                return min + (max - min) * Math.random();
            }
            static randomInt(min = 0, max = 1) {
                return Math.floor(Num.random(min, max + 1));
            }
            static randomAbs(min = 0, max = 1) {
                return Num.random(min, max) * Num.randomSign();
            }
            static randomSign() {
                return Math.random() < 0.5 ? 1 : -1;
            }
            static dist(x1, y1, x2, y2, squared = false) {
                const dx = x2 - x1;
                const dy = y2 - y1;
                return squared ? (dx * dx + dy * dy) : Math.sqrt(dx * dx + dy * dy);
            }
            static radToDeg(radian) {
                return radian * Num.RAD2DEG;
            }
            static degToRad(degree) {
                return degree * Num.DEG2RAD;
            }
            static turn(from, to, radian = true) {
                return radian ? ((to - from + Num.PI3) % Num.PI2 - Math.PI) : ((to - from + 540) % 360 - 180);
            }
        }
        Num.PI2 = Math.PI * 2;
        Num.PI3 = Math.PI * 3;
        Num.PI4 = Math.PI * 4;
        Num.PI5 = Math.PI * 5;
        Num.PI6 = Math.PI * 6;
        Num.PI_2 = Math.PI / 2;
        Num.PI_3 = Math.PI / 3;
        Num.PI_4 = Math.PI / 4;
        Num.PI_6 = Math.PI / 6;
        Num.RAD2DEG = 180 / Math.PI;
        Num.DEG2RAD = Math.PI / 180;
        util.Num = Num;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        class Str {
            static toTimeString(hours = 0, minutes = 0, seconds = 0) {
                seconds += minutes * 60 + hours * 3600;
                let h = Math.floor(seconds / 3600).toString();
                let m = Math.floor((seconds / 60) % 60).toString();
                let s = ('0' + Math.floor(seconds % 60)).substr(-2, 2);
                if (h != '0') {
                    return h + ':' + ('0' + m).substr(-2, 2) + ':' + s;
                }
                else {
                    return m + ':' + s;
                }
            }
            constructor() { }
        }
        util.Str = Str;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        class Cmd {
            static stop(command) {
                if (command)
                    command.interrupt();
                return null;
            }
            static sequence(execute, ...commands) {
                const c = new cmd.Serial();
                c.addCommand(...commands);
                if (execute)
                    c.execute();
                return c;
            }
            static single(execute, command) {
                if (execute && command)
                    command.execute();
                return command;
            }
            constructor() { }
        }
        util.Cmd = Cmd;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Easing = alm.math.Easing;
        class Dom {
            constructor() {
            }
            static instantiate(templateId, removeId = true, verbose = true) {
                const template = document.getElementById(templateId);
                if (template) {
                    const element = template.cloneNode(true);
                    if (removeId) {
                        element.removeAttribute('id');
                    }
                    return element;
                }
                else {
                    if (verbose) {
                        console.warn('[Dom.instantiate] template (id = ' + templateId + ' ) is not found.');
                    }
                }
                return null;
            }
            static addPointerDownListener(target, listener, options = null) {
                target.addEventListener('pointerdown', listener, options);
            }
            static addPointerMoveListener(target, listener, options = null) {
                target.addEventListener('pointermove', listener, options);
            }
            static addPointerUpListener(target, listener, options = null) {
                target.addEventListener('pointerup', listener, options);
            }
            static addPointerEnterListener(target, listener, options = null) {
                target.addEventListener('pointerenter', listener, options);
            }
            static addPointerLeaveListener(target, listener, options = null) {
                target.addEventListener('pointerleave', listener, options);
            }
            static addPointerOverListener(target, listener, options = null) {
                target.addEventListener('pointerover', listener, options);
            }
            static addPointerOutListener(target, listener, options = null) {
                target.addEventListener('pointerout', listener, options);
            }
            static removePointerDownListener(target, listener, options = null) {
                target.removeEventListener('pointerdown', listener, options);
            }
            static removePointerMoveListener(target, listener, options = null) {
                target.removeEventListener('pointermove', listener, options);
            }
            static removePointerUpListener(target, listener, options = null) {
                target.removeEventListener('pointerup', listener, options);
            }
            static removePointerEnterListener(target, listener, options = null) {
                target.removeEventListener('pointerenter', listener, options);
            }
            static removePointerLeaveListener(target, listener, options = null) {
                target.removeEventListener('pointerleave', listener, options);
            }
            static removePointerOverListener(target, listener, options = null) {
                target.removeEventListener('pointerover', listener, options);
            }
            static removePointerOutListener(target, listener, options = null) {
                target.removeEventListener('pointerout', listener, options);
            }
            static addRootClass(value) {
                if (Dom.root === null) {
                    Dom.root = document.documentElement;
                }
                Dom.root.classList.add(value);
            }
            static removeRootClass(value) {
                if (Dom.root === null) {
                    Dom.root = document.documentElement;
                }
                Dom.root.classList.remove(value);
            }
            static addRootAttribute(key, value) {
                if (Dom.root === null) {
                    Dom.root = document.documentElement;
                }
                Dom.root.setAttribute(key, value);
            }
            static removeRootAttribute(key, value) {
                if (Dom.root === null) {
                    Dom.root = document.documentElement;
                }
                Dom.root.removeAttribute(key);
            }
            static getRootCss(property) {
                if (Dom.root === null) {
                    Dom.root = document.documentElement;
                }
                return Dom.root.style.getPropertyValue(property);
            }
            static setRootCss(property, value) {
                if (Dom.root === null) {
                    Dom.root = document.documentElement;
                }
                Dom.root.style.setProperty(property, value);
            }
            static scrollTo(scrollTop, useTransition = true) {
                Dom.scrollTween = util.Cmd.stop(Dom.scrollTween);
                if (useTransition) {
                    Dom.scrollTween = new cmd.Tween(Dom, { scrollPosition: scrollTop }, null, 1000, Easing.easeOutQuart, null, () => {
                        Dom.applyScrollPosition();
                    });
                    Dom.scrollTween.execute();
                }
                else {
                    Dom.scrollPosition = scrollTop;
                    Dom.applyScrollPosition();
                }
            }
            static applyScrollPosition() {
                window.scroll(0, Dom.scrollPosition);
            }
            static setupSmoothAnchorLink() {
                const tags = document.getElementsByTagName('a');
                const tagCount = tags.length;
                for (let i = 0; i < tagCount; ++i) {
                    Dom.setAnchorLinkAction(tags.item(i));
                }
            }
            static setAnchorLinkAction(tag) {
                const href = tag.getAttribute('href');
                if ((href.indexOf('#')) == 0 && !tag.hasAttribute('data-smooth-anchor-target')) {
                    tag.setAttribute('data-smooth-anchor-target', href.slice(1));
                    tag.setAttribute('href', 'javascript:void(0)');
                    tag.addEventListener('click', Dom.anchorLinkClickHandler);
                }
            }
            static getViewportRect(element) {
                const rect = element.getBoundingClientRect();
                return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
            }
            static geDocumentRect(element) {
                const rect = Dom.getViewportRect(element);
                return { x: rect.x + window.scrollX, y: rect.y + window.scrollY, width: rect.width, height: rect.height };
            }
        }
        Dom.anchorLinkClickHandler = (event) => {
            const tag = event.currentTarget;
            const targetId = tag.getAttribute('data-smooth-anchor-target');
            const target = document.getElementById(targetId);
            let targetScrollPosition = window.pageYOffset + target.getBoundingClientRect().top;
            if (tag.hasAttribute('data-smooth-anchor-offset')) {
                targetScrollPosition += parseFloat(tag.getAttribute('data-smooth-anchor-offset'));
            }
            Dom.scrollTo(targetScrollPosition);
        };
        Dom.root = null;
        Dom.scrollTween = null;
        util.Dom = Dom;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        class Cvs {
            static getHighDpiContext2d(canvas) {
                const dpr = Math.round(window.devicePixelRatio) || 1;
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                const context = canvas.getContext('2d');
                context.scale(dpr, dpr);
                return context;
            }
            constructor() { }
        }
        util.Cvs = Cvs;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Dom = alm.util.Dom;
        var Cmd = alm.util.Cmd;
        var Easing = alm.math.Easing;
        class CssVar {
            constructor(property, defaultValue = null, suffix = null) {
                this.reset(property, defaultValue, suffix);
            }
            reset(property, value = null, suffix = null) {
                this.property = property;
                this.value = value;
                this.suffix = suffix;
                this.cancelAnimation();
                if ((this.value === null) || (this.suffix === null)) {
                    const result = CssVar.numberPattern.exec(Dom.getRootCss(this.property));
                    let isNeedApply = false;
                    if (this.value === null) {
                        this.value = parseFloat(result[1]);
                        if (isNaN(this.value)) {
                            this.value = 0;
                        }
                    }
                    else {
                        isNeedApply = true;
                    }
                    if (this.value === null) {
                        this.suffix = result[2] !== '' ? result[2] : '';
                    }
                    else {
                        isNeedApply = true;
                    }
                    if (isNeedApply) {
                        this.apply();
                    }
                }
                else {
                    this.apply();
                }
            }
            getProperty() {
                return this.property;
            }
            setProperty(property) {
                this.cancelAnimation();
                if (this.property !== property) {
                    this.property = property;
                    this.apply();
                }
            }
            getValue() {
                return this.value;
            }
            setValue(value) {
                this.cancelAnimation();
                if (this.value !== value) {
                    this.value = value;
                    this.apply();
                }
            }
            getSuffix() {
                return this.suffix;
            }
            setSuffix(suffix) {
                this.cancelAnimation();
                if (this.suffix !== suffix) {
                    this.suffix = suffix;
                    this.apply();
                }
            }
            animate(to, from, duration = 1000, easing = Easing.linear, execute = true) {
                this.cancelAnimation();
                this.tween = new cmd.Tween(this, { value: to }, from !== null ? { value: from } : null, duration, easing, null, () => {
                    this.apply();
                }, () => {
                    this.tween = null;
                });
                if (execute) {
                    this.tween.execute();
                }
                return this.tween;
            }
            cancelAnimation() {
                if (this.tween) {
                    this.tween = Cmd.stop(this.tween);
                }
            }
            animateTo(to, duration = 1000, easing = Easing.linear, execute = true) {
                return this.animate(to, null, duration, easing, execute);
            }
            apply() {
                Dom.setRootCss(this.property, this.value + this.suffix);
            }
        }
        CssVar.numberPattern = new RegExp(/([+-]?\d*\.?\d*)(.*)/);
        util.CssVar = CssVar;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        class Sensor {
            static wakeUpDeviceMotion() {
                return new Promise((resolve, reject) => {
                    console.debug('[DeviceMotion] check');
                    if (DeviceMotionEvent) {
                        if (typeof DeviceMotionEvent['requestPermission'] === 'function') {
                            console.debug('[DeviceMotion] iOS');
                            DeviceMotionEvent['requestPermission']()
                                .then(permissionState => {
                                if (permissionState === 'granted') {
                                    console.debug('[DeviceMotion] allowed on iOS');
                                    resolve();
                                }
                                else {
                                    console.debug('[DeviceMotion] not allowed, state :', permissionState);
                                    reject();
                                }
                            })
                                .catch((error) => {
                                console.error('[DeviceMotion] error', error);
                                reject();
                            });
                        }
                        else {
                            console.debug('[DeviceMotion] allowed on PC / Android');
                            resolve();
                        }
                    }
                    else {
                        console.debug('[DeviceMotion] not available');
                        reject();
                    }
                });
            }
            static wakeUpDeviceOrientation() {
                return new Promise((resolve, reject) => {
                    console.debug('[DeviceOrientation] check');
                    if (DeviceOrientationEvent) {
                        if (typeof DeviceOrientationEvent['requestPermission'] === 'function') {
                            console.debug('[checkDeviceOrientation] iOS');
                            DeviceOrientationEvent['requestPermission']()
                                .then(permissionState => {
                                if (permissionState === 'granted') {
                                    console.debug('[DeviceOrientation] allowed on iOS');
                                    resolve();
                                }
                                else {
                                    console.debug('[DeviceOrientation] not allowed, state :', permissionState);
                                    reject();
                                }
                            })
                                .catch((error) => {
                                console.error('[DeviceOrientation] error', error);
                                reject();
                            });
                        }
                        else {
                            console.debug('[DeviceOrientation] allowed on PC / Android');
                            resolve();
                        }
                    }
                    else {
                        console.debug('[DeviceOrientation] not available');
                        reject();
                    }
                });
            }
            constructor() {
            }
        }
        util.Sensor = Sensor;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var resource;
    (function (resource) {
        class ObjectPool {
            constructor(onRequireItem, onDestroyItem, initCount = 100, growthCount = 50) {
                this.onRequireItem = onRequireItem;
                this.onDestroyItem = onDestroyItem;
                this.growthCount = growthCount;
                this.items = new Array(initCount);
                for (let i = 0; i < initCount; ++i) {
                    this.items[i] = this.onRequireItem();
                }
                this.index = initCount;
            }
            getItem() {
                if (this.index > 0) {
                    return this.items[--this.index];
                }
                for (let i = 0; i < this.growthCount; ++i) {
                    this.items.unshift(this.onRequireItem());
                }
                this.index = this.growthCount;
                return this.getItem();
            }
            returnItem(item) {
                this.items[this.index++] = item;
            }
            reduce() {
                const n = this.index;
                for (let i = 0; i < n; ++i) {
                    this.onDestroyItem(this.items.shift());
                }
                this.index = 0;
            }
            destroy() {
                const n = this.items.length;
                for (let i = 0; i < n; ++i) {
                    this.onDestroyItem(this.items[i]);
                }
                this.index = 0;
                this.items = null;
                this.onRequireItem = null;
                this.onDestroyItem = null;
            }
        }
        resource.ObjectPool = ObjectPool;
    })(resource = alm.resource || (alm.resource = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var state;
    (function (state) {
        class Lottery {
            constructor(values = null) {
                if (values) {
                    this.set(values);
                }
                else {
                    this.initValues = this.restValues = null;
                    this.restCount = this.restValues.length;
                    this.isEmpty = true;
                }
                this.onCheck = null;
                this.isAutoResetEnabled = false;
            }
            set(values) {
                this.initValues = values.concat();
                this.reset();
            }
            get() {
                if (this.isEmpty && this.isAutoResetEnabled) {
                    this.reset();
                }
                const index = Math.floor(Math.random() * this.restCount);
                const value = this.restValues[index];
                let result = true;
                if (this.onCheck)
                    result = this.onCheck(value);
                if (result) {
                    this.restValues.splice(index, 1);
                    this.restCount = this.restValues.length;
                    this.isEmpty = this.restCount == 0;
                }
                return value;
            }
            add(value, reset = false) {
                this.initValues.push(value);
                this.restValues.push(value);
                this.restCount = this.restValues.length;
                this.isEmpty = this.restCount == 0;
                if (reset) {
                    this.reset();
                }
            }
            reset() {
                this.restValues = this.initValues.concat();
                this.restCount = this.restValues.length;
                this.isEmpty = this.restCount == 0;
            }
            getRestCount() {
                return this.restCount;
            }
            getIsEmply() {
                return this.isEmpty;
            }
            getIsAutoResetEnabled() {
                return this.isAutoResetEnabled;
            }
            setIsAutoResetEnabled(enabled) {
                this.isAutoResetEnabled = enabled;
            }
            static createIndices(count) {
                const values = new Array(count);
                for (let i = 0; i < count; ++i)
                    values[i] = i;
                return new Lottery(values);
            }
        }
        state.Lottery = Lottery;
    })(state = alm.state || (alm.state = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var state;
    (function (state) {
        class Switcher extends alm.event.EventDispatcher {
            constructor() {
                super();
                this.isLoopEnabled = true;
                this.itemCount = 0;
                this.itemIds = null;
                this.itemIndexById = null;
                this.onChange = null;
                this.onPrev = null;
                this.onNext = null;
            }
            setupById(ids) {
                this.itemCount = ids.length;
                this.itemIds = ids;
                this.itemIndexById = {};
                for (let i = 0; i < this.itemCount; ++i) {
                    this.itemIndexById[this.itemIds[i]] = i;
                }
                this.setup();
            }
            setupByCount(itemCount) {
                this.itemCount = itemCount;
                this.itemIds = null;
                this.itemIndexById = null;
                this.setup();
            }
            setup() {
                this.currentItemIndex = -1;
                this.currentItemId = null;
                this.oldItemIndex = -1;
                this.oldItemId = null;
            }
            gotoByIndex(itemIndex, useTransition = true) {
                if (itemIndex < 0 || itemIndex >= this.itemCount)
                    itemIndex = -1;
                if (itemIndex == this.currentItemIndex)
                    return false;
                this.oldItemIndex = this.currentItemIndex;
                this.currentItemIndex = itemIndex;
                if (this.itemIds) {
                    this.oldItemId = this.oldItemIndex != -1 ? this.itemIds[this.oldItemIndex] : null;
                    this.currentItemId = this.currentItemIndex != -1 ? this.itemIds[this.currentItemIndex] : null;
                }
                this.dispatchPagerEvent(state.SwitcherEvent.change, this.onChange, useTransition);
                return true;
            }
            gotoById(itemId, useTransition = true) {
                const itemIndex = this.itemIndexById.hasOwnProperty(itemId) ? this.itemIndexById[itemId] : -1;
                return this.gotoByIndex(itemIndex, useTransition);
            }
            prev(useTransition = true) {
                let itemIndex = this.getPrevItemIndex();
                const result = this.gotoByIndex(itemIndex, useTransition);
                if (result) {
                    this.dispatchPagerEvent(state.SwitcherEvent.prev, this.onPrev, useTransition);
                }
                return result;
            }
            next(useTransition = true) {
                let itemIndex = this.getNextItemIndex();
                const result = this.gotoByIndex(itemIndex, useTransition);
                if (result) {
                    this.dispatchPagerEvent(state.SwitcherEvent.next, this.onNext, useTransition);
                }
                return result;
            }
            getPrevItemIndex() {
                let itemIndex = this.currentItemIndex - 1;
                if (this.isLoopEnabled && itemIndex < 0)
                    itemIndex = this.itemCount - 1;
                return itemIndex;
            }
            getPrevItemId() {
                return this.itemIds[this.getPrevItemIndex()];
            }
            getNextItemIndex() {
                let itemIndex = this.currentItemIndex + 1;
                if (this.isLoopEnabled && itemIndex >= this.itemCount)
                    itemIndex = 0;
                return itemIndex;
            }
            getNextItemId() {
                return this.itemIds[this.getNextItemIndex()];
            }
            dispatchPagerEvent(eventType, callback, useTransition) {
                const event = new state.SwitcherEvent(eventType, this, this.currentItemIndex, this.oldItemIndex, this.currentItemId, this.oldItemId, useTransition);
                if (callback) {
                    callback(event);
                }
                this.dispatchEvent(event);
            }
            getIsLoopEnabled() { return this.isLoopEnabled; }
            setIsLoopEnabled(value) { this.isLoopEnabled = value; }
            getItemCount() { return this.itemCount; }
            getCurrentItemIndex() { return this.currentItemIndex; }
            getOldItemIndex() { return this.oldItemIndex; }
            getCurrentItemId() { return this.currentItemId; }
            getOldItemId() { return this.oldItemId; }
            getItemIds() { return this.itemIds; }
        }
        state.Switcher = Switcher;
    })(state = alm.state || (alm.state = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var state;
    (function (state) {
        class SwitcherEvent extends alm.event.Event {
            constructor(eventType, eventTarget, currentItemIndex, oldItemIndex, currentItemId, oldItemId, useTransition) {
                super(eventType, eventTarget);
                this.currentItemIndex = currentItemIndex;
                this.oldItemIndex = oldItemIndex;
                this.currentItemId = currentItemId;
                this.oldItemId = oldItemId;
                this.useTransition = useTransition;
            }
            clone() {
                return new SwitcherEvent(this.type, this.target, this.currentItemIndex, this.oldItemIndex, this.currentItemId, this.oldItemId, this.useTransition);
            }
            toString() {
                return '[SwitcherEvent] type = ' + this.type + ', ' + this.oldItemIndex + ' -> ' + this.currentItemIndex + ', transition = ' + this.useTransition;
            }
        }
        SwitcherEvent.change = 'SwitcherEvent.change';
        SwitcherEvent.prev = 'SwitcherEvent.prev';
        SwitcherEvent.next = 'SwitcherEvent.next';
        state.SwitcherEvent = SwitcherEvent;
    })(state = alm.state || (alm.state = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var state;
    (function (state) {
        var EventDispatcher = alm.event.EventDispatcher;
        class LoHi extends EventDispatcher {
            constructor(lowThreshold, highThreshold, initValue = 0) {
                super();
                this.lowThreshold = lowThreshold;
                this.highThreshold = highThreshold;
                this.isHigh = false;
                this._set(initValue, false);
            }
            set(value) {
                return this._set(value, true);
            }
            getIsHigh() {
                return this.isHigh;
            }
            getValue() {
                return this.value;
            }
            getLowThreshold() {
                return this.lowThreshold;
            }
            getHighThreshold() {
                return this.highThreshold;
            }
            setLowThreshold(threshold) {
                this.lowThreshold = threshold;
                this._set(this.value, true);
            }
            setHighThreshold(threshold) {
                this.highThreshold = threshold;
                this._set(this.value, true);
            }
            _set(value, dispatchEvent) {
                this.value = value;
                if (this.isHigh && this.value < this.lowThreshold) {
                    this.isHigh = false;
                    if (dispatchEvent) {
                        this.dispatchEvent(new state.LoHiEvent(state.LoHiEvent.low, this, this.isHigh));
                        this.dispatchEvent(new state.LoHiEvent(state.LoHiEvent.change, this, this.isHigh));
                    }
                    return true;
                }
                else if (!this.isHigh && this.value > this.highThreshold) {
                    this.isHigh = true;
                    if (dispatchEvent) {
                        this.dispatchEvent(new state.LoHiEvent(state.LoHiEvent.high, this, this.isHigh));
                        this.dispatchEvent(new state.LoHiEvent(state.LoHiEvent.change, this, this.isHigh));
                    }
                    return true;
                }
                return false;
            }
        }
        state.LoHi = LoHi;
    })(state = alm.state || (alm.state = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var state;
    (function (state) {
        class LoHiEvent extends alm.event.Event {
            constructor(eventType, eventTarget, isHigh) {
                super(eventType, eventTarget);
                this.isHigh = isHigh;
            }
            clone() {
                return new LoHiEvent(this.type, this.target, this.isHigh);
            }
            toString() {
                return '[LoHiEvent] type = ' + this.type + ', isHigh = ' + this.isHigh;
            }
        }
        LoHiEvent.change = 'LoHiEvent.change';
        LoHiEvent.low = 'LoHiEvent.low';
        LoHiEvent.high = 'LoHiEvent.high';
        state.LoHiEvent = LoHiEvent;
    })(state = alm.state || (alm.state = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        class EasingValue {
            constructor(initValue, easing = 0.1, tolerance = 0) {
                this.value = this.target = initValue;
                this.easing = easing;
                this.tolerance = tolerance;
            }
            update(useTransition = true) {
                if (useTransition) {
                    const d = this.target - this.value;
                    if (this.tolerance > 0 && Math.abs(d) <= this.tolerance) {
                        this.value = this.target;
                    }
                    else {
                        this.value += d * this.easing;
                    }
                }
                else {
                    this.value = this.target;
                }
                return this.value;
            }
            clone() {
                const v = new EasingValue(this.value, this.easing, this.tolerance);
                v.target = this.target;
                return v;
            }
        }
        math.EasingValue = EasingValue;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        class SpringValue {
            constructor(initValue, spring = 0.1, friction = 0.9) {
                this.acceleration = 0;
                this.velocity = 0;
                this.value = this.target = initValue;
                this.spring = spring;
                this.friction = friction;
            }
            update(useTransition = true) {
                if (useTransition) {
                    this.acceleration = (this.target - this.value) * this.spring;
                    this.velocity += this.acceleration;
                    this.velocity *= this.friction;
                    this.value += this.velocity;
                }
                else {
                    this.acceleration = 0;
                    this.velocity = 0;
                    this.value = this.target;
                }
                return this.value;
            }
            clone() {
                const v = new SpringValue(this.value, this.spring, this.friction);
                v.acceleration = this.acceleration;
                v.velocity = this.velocity;
                v.target = this.target;
                return v;
            }
        }
        math.SpringValue = SpringValue;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        class MinMax {
            constructor() {
                this.min = this._min = Number.MAX_VALUE;
                this.max = this._max = -Number.MAX_VALUE;
            }
            add(n) {
                if (n < this._min) {
                    this._min = n;
                }
                if (n > this._max) {
                    this._max = n;
                }
                this.min = this._min;
                this.max = this._max;
            }
        }
        math.MinMax = MinMax;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        class SimpleAverage {
            constructor() {
                this.reset();
            }
            add(n) {
                this._value = (this._value * this._count + n) / ++this._count;
                this.value = this._value;
                this.count = this._count;
                return this._value;
            }
            reset() {
                this.value = this._value = 0;
                this.count = this._count = 0;
            }
        }
        math.SimpleAverage = SimpleAverage;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        class SimpleMovingAverage {
            constructor(maxCount) {
                this.maxCount = this._maxCount = maxCount;
                this.reset();
            }
            add(n) {
                if (++this._count > this._maxCount) {
                    this._count = this._maxCount;
                    const oldest = this.values.shift();
                    this._value -= oldest;
                    const latest = n / this._maxCount;
                    this._value += latest;
                    this.values.push(latest);
                }
                else {
                    this._value *= (this._count - 1);
                    this._value += n;
                    this._value /= this._count;
                    this.values.push(n / this._maxCount);
                }
                this.value = this._value;
                this.count = this._count;
                return this._value;
            }
            reset() {
                this.value = this._value = 0;
                this.count = this._count = 0;
                this.values = [];
            }
        }
        math.SimpleMovingAverage = SimpleMovingAverage;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        class MaxValue {
            constructor(maxLatestCount = 0) {
                this.maxLatestCount = this._maxLatestCount = maxLatestCount;
                this.value = this._value = -Number.MAX_VALUE;
                this.count = this._count = 0;
                this.values = [];
            }
            add(n) {
                if (this._maxLatestCount > 0) {
                    if (++this._count > this._maxLatestCount) {
                        this._count = this._maxLatestCount;
                        this.values.push(n);
                        const oldest = this.values.shift();
                        if (this._value > oldest) {
                            if (this._value < n) {
                                this._value = n;
                            }
                        }
                        else {
                            this._value = -Number.MAX_VALUE;
                            for (let i = 0; i < this._count; ++i) {
                                const v = this.values[i];
                                if (this._value < v) {
                                    this._value = v;
                                }
                            }
                        }
                    }
                    else {
                        this.values.push(n);
                        if (this._value < n) {
                            this._value = n;
                        }
                    }
                }
                else {
                    ++this._count;
                    if (this._value < n) {
                        this._value = n;
                    }
                }
                this.value = this._value;
                this.count = this._count;
                return this._value;
            }
        }
        math.MaxValue = MaxValue;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        class Circular {
            constructor(angle = 0, velocity = 0, radian = true) {
                this.setAngle(angle, radian);
                this.setVelocity(velocity, radian);
            }
            getAngle(radian = true) {
                return radian ? this.angle : (this.angle * 180 / Math.PI);
            }
            setAngle(angle, radian = true) {
                this.angle = radian ? angle : (angle * Math.PI / 180);
            }
            getVelocity(radian = true) {
                return radian ? this.velocity : (this.velocity * 180 / Math.PI);
            }
            setVelocity(velocity, radian = true) {
                this.velocity = radian ? velocity : (velocity * Math.PI / 180);
            }
            update() {
                this.angle += this.velocity;
            }
            getSin(length = 1) {
                return length * Math.sin(this.angle);
            }
            getCos(length = 1) {
                return length * Math.cos(this.angle);
            }
            getTan(length = 1) {
                return length * Math.tan(this.angle);
            }
            getMagnitude(length = 1) {
                return length * (1 + Math.sin(this.angle)) / 2;
            }
            getVector(length = 1, xy = null) {
                if (xy != null) {
                    xy.x = this.getCos(length);
                    xy.y = this.getSin(length);
                }
                else {
                    return { x: this.getCos(length), y: this.getSin(length) };
                }
            }
        }
        math.Circular = Circular;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        class BinarySearch {
            constructor(list = null) {
                this.setList(list);
            }
            setList(list) {
                this.list = list;
            }
            searchNearest(value) {
                let lowIndex = 0;
                let highIndex = this.list.length - 1;
                let midIndex;
                let estimated;
                while (lowIndex <= highIndex) {
                    midIndex = Math.floor((lowIndex + highIndex) / 2);
                    estimated = this.list[midIndex];
                    if (estimated == value) {
                        return midIndex;
                    }
                    else if (estimated > value) {
                        highIndex = midIndex - 1;
                    }
                    else {
                        lowIndex = midIndex + 1;
                    }
                }
                return midIndex;
            }
            leapNearest(value) {
                const nearestIndex = this.searchNearest(value);
                const nearestValue = this.list[nearestIndex];
                let lowIndex;
                let lowValue;
                let highIndex;
                let highValue;
                if (nearestValue <= value) {
                    lowIndex = nearestIndex;
                    lowValue = nearestValue;
                    highIndex = nearestIndex + 1;
                    if (highIndex >= this.list.length) {
                        highIndex = this.list.length - 1;
                    }
                    highValue = this.list[highIndex];
                }
                else {
                    lowIndex = nearestIndex - 1;
                    if (lowIndex < 0) {
                        lowIndex = 0;
                    }
                    lowValue = this.list[lowIndex];
                    highIndex = nearestIndex;
                    highValue = nearestValue;
                }
                const d = highValue - lowValue;
                if (d > 0) {
                    return { index0: lowIndex, index1: highIndex, ratio: (value - lowValue) / (highValue - lowValue) };
                }
                else {
                    return { index0: lowIndex, index1: highIndex, ratio: 0 };
                }
            }
        }
        math.BinarySearch = BinarySearch;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        class MersenneTwister {
            constructor(seed) {
                if (arguments.length == 0) {
                    seed = new Date().getTime();
                }
                this._mt = new Array(624);
                this.setSeed(seed);
            }
            static _mulUint32(a, b) {
                const a1 = a >>> 16, a2 = a & 0xffff;
                const b1 = b >>> 16, b2 = b & 0xffff;
                return (((a1 * b2 + a2 * b1) << 16) + a2 * b2) >>> 0;
            }
            ;
            static _toNumber(x) {
                return (typeof x == 'number' && !isNaN(x)) ? Math.ceil(x) : 0;
            }
            ;
            setSeed(seed) {
                const mt = this._mt;
                if (typeof seed == 'number') {
                    mt[0] = seed >>> 0;
                    for (let i = 1; i < mt.length; i++) {
                        const x = mt[i - 1] ^ (mt[i - 1] >>> 30);
                        mt[i] = MersenneTwister._mulUint32(1812433253, x) + i;
                    }
                    this._index = mt.length;
                }
                else if (seed instanceof Array) {
                    let i = 1, j = 0;
                    this.setSeed(19650218);
                    for (let k = Math.max(mt.length, seed.length); k > 0; k--) {
                        let x = mt[i - 1] ^ (mt[i - 1] >>> 30);
                        x = MersenneTwister._mulUint32(x, 1664525);
                        mt[i] = (mt[i] ^ x) + (seed[j] >>> 0) + j;
                        if (++i >= mt.length) {
                            mt[0] = mt[mt.length - 1];
                            i = 1;
                        }
                        if (++j >= seed.length) {
                            j = 0;
                        }
                    }
                    for (let k = mt.length - 1; k > 0; k--) {
                        let x = mt[i - 1] ^ (mt[i - 1] >>> 30);
                        x = MersenneTwister._mulUint32(x, 1566083941);
                        mt[i] = (mt[i] ^ x) - i;
                        if (++i >= mt.length) {
                            mt[0] = mt[mt.length - 1];
                            i = 1;
                        }
                    }
                    mt[0] = 0x80000000;
                }
                else {
                    throw new TypeError('MersenneTwister: illegal seed.');
                }
            }
            ;
            _nextInt() {
                const mt = this._mt;
                let value;
                if (this._index >= mt.length) {
                    let k = 0;
                    const N = mt.length, M = 397;
                    do {
                        value = (mt[k] & 0x80000000) | (mt[k + 1] & 0x7fffffff);
                        mt[k] = mt[k + M] ^ (value >>> 1) ^ ((value & 1) ? 0x9908b0df : 0);
                    } while (++k < N - M);
                    do {
                        value = (mt[k] & 0x80000000) | (mt[k + 1] & 0x7fffffff);
                        mt[k] = mt[k + M - N] ^ (value >>> 1) ^ ((value & 1) ? 0x9908b0df : 0);
                    } while (++k < N - 1);
                    value = (mt[N - 1] & 0x80000000) | (mt[0] & 0x7fffffff);
                    mt[N - 1] = mt[M - 1] ^ (value >>> 1) ^ ((value & 1) ? 0x9908b0df : 0);
                    this._index = 0;
                }
                value = mt[this._index++];
                value ^= value >>> 11;
                value ^= (value << 7) & 0x9d2c5680;
                value ^= (value << 15) & 0xefc60000;
                value ^= value >>> 18;
                return value >>> 0;
            }
            ;
            getInt() {
                let min, sup;
                switch (arguments.length) {
                    case 0:
                        return this._nextInt();
                    case 1:
                        min = 0;
                        sup = MersenneTwister._toNumber(arguments[0]);
                        break;
                    default:
                        min = MersenneTwister._toNumber(arguments[0]);
                        sup = MersenneTwister._toNumber(arguments[1]) - min;
                        break;
                }
                if (!(0 < sup && sup < 0x100000000))
                    return this._nextInt() + min;
                if ((sup & (~sup + 1)) == sup)
                    return ((sup - 1) & this._nextInt()) + min;
                let value;
                do {
                    value = this._nextInt();
                } while (sup > 4294967296 - (value - (value %= sup)));
                return value + min;
            }
            ;
            getFloat() {
                const a = this._nextInt() >>> 5, b = this._nextInt() >>> 6;
                return (a * 0x4000000 + b) / 0x20000000000000;
            }
            ;
        }
        math.MersenneTwister = MersenneTwister;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var time;
    (function (time) {
        var EventDispatcher = alm.event.EventDispatcher;
        var Time = alm.util.Time;
        class AnimationFrameTicker extends EventDispatcher {
            constructor(frameRate = 0, tolerance = 0.1) {
                super();
                this.updateHandler = () => {
                    this.requestId = window.requestAnimationFrame(this.updateHandler);
                    if (this.targetFrameRate > 0) {
                        const currentTime = Time.now();
                        const elapsedTime = currentTime - this.frameStartTime;
                        if (elapsedTime >= this.interval - this.toleranceDuration) {
                            this.frameStartTime = currentTime;
                            this.dispatchEvent(new time.AnimationFrameTickerEvent(time.AnimationFrameTickerEvent.tick, this));
                        }
                    }
                    else {
                        this.dispatchEvent(new time.AnimationFrameTickerEvent(time.AnimationFrameTickerEvent.tick, this));
                    }
                };
                this.targetFrameRate = frameRate;
                this.interval = 1000 / this.targetFrameRate;
                this.tolerance = tolerance;
                this.toleranceDuration = this.interval * this.tolerance;
                this.isRunning = false;
            }
            start() {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                this.frameStartTime = Time.now();
                this.requestId = window.requestAnimationFrame(this.updateHandler);
            }
            stop() {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                window.cancelAnimationFrame(this.requestId);
            }
            getIsRunning() {
                return this.isRunning;
            }
            getTargetFrameRate() {
                return this.targetFrameRate;
            }
            getInterval() {
                return this.interval;
            }
            getTolerance() {
                return this.tolerance;
            }
            getToleranceDuration() {
                return this.toleranceDuration;
            }
            static addEventListener(listener) {
                const result = AnimationFrameTicker.ticker.addEventListener(time.AnimationFrameTickerEvent.tick, listener);
                if (result) {
                    ++AnimationFrameTicker.listenerCount;
                    if (AnimationFrameTicker.listenerCount === 1) {
                        AnimationFrameTicker.ticker.start();
                    }
                }
            }
            static removeEventListener(listener) {
                const result = AnimationFrameTicker.ticker.removeEventListener(time.AnimationFrameTickerEvent.tick, listener);
                if (result) {
                    --AnimationFrameTicker.listenerCount;
                    if (AnimationFrameTicker.listenerCount === 0) {
                        AnimationFrameTicker.ticker.stop();
                    }
                }
            }
        }
        AnimationFrameTicker.ticker = new AnimationFrameTicker();
        AnimationFrameTicker.listenerCount = 0;
        time.AnimationFrameTicker = AnimationFrameTicker;
    })(time = alm.time || (alm.time = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var time;
    (function (time) {
        var Event = alm.event.Event;
        class AnimationFrameTickerEvent extends Event {
            constructor(eventType, eventTarget) {
                super(eventType, eventTarget);
            }
            clone() {
                return new AnimationFrameTickerEvent(this.type, this.target);
            }
            toString() {
                return '[AnimationFrameTickerEvent] type = ' + this.type;
            }
        }
        AnimationFrameTickerEvent.tick = 'AnimationFrameTickerEvent.tick';
        time.AnimationFrameTickerEvent = AnimationFrameTickerEvent;
    })(time = alm.time || (alm.time = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var time;
    (function (time) {
        var EventDispatcher = alm.event.EventDispatcher;
        var Time = alm.util.Time;
        class Timer extends EventDispatcher {
            constructor(interval = 1000, repeatCount = 0) {
                super();
                this.timerHandler = () => {
                    this.tStartTime = Time.now();
                    ++this.elapsedCount;
                    let isCompleted = false;
                    if (this.repeatCount > 0 && this.elapsedCount >= this.repeatCount) {
                        isCompleted = true;
                        this.stop();
                    }
                    else if (this.tInterval != this.interval) {
                        this.startInterval(this.interval);
                    }
                    this.dispatch(time.TimerEvent.tick);
                    if (isCompleted) {
                        this.dispatch(time.TimerEvent.complete);
                    }
                };
                this.interval = interval;
                this.repeatCount = repeatCount;
                this.isRunning = false;
                this.tId = -1;
                this.reset();
            }
            start() {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                this.tStartTime = Time.now();
                this.startInterval(this.tRestTime != -1 ? this.tRestTime : this.interval);
            }
            stop() {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                this.tRestTime = Time.now() - this.tStartTime;
                this.stopInterval();
            }
            reset() {
                this.stop();
                this.elapsedCount = 0;
                this.tRestTime = -1;
            }
            restart() {
                this.reset();
                this.start();
            }
            startInterval(interval) {
                this.stopInterval();
                this.tInterval = interval;
                this.tId = window.setInterval(this.timerHandler, this.tInterval);
            }
            stopInterval() {
                if (this.tId != -1) {
                    clearInterval(this.tId);
                    this.tId = -1;
                }
            }
            dispatch(eventType) {
                this.dispatchEvent(new time.TimerEvent(eventType, this, this.elapsedCount, this.repeatCount, this.getRestCount()));
            }
            getIsRunning() { return this.isRunning; }
            getInterval() { return this.interval; }
            setInterval(interval) { this.interval = interval; }
            getElapsedTime() { return Time.now() - this.tStartTime; }
            getRestTime() { return this.interval - this.getElapsedTime(); }
            getElapsedCount() { return this.elapsedCount; }
            getRepeatCount() { return this.repeatCount; }
            setRepeatCount(count) { this.repeatCount = count; }
            getRestCount() { return this.repeatCount - this.elapsedCount; }
        }
        time.Timer = Timer;
    })(time = alm.time || (alm.time = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var time;
    (function (time) {
        var Event = alm.event.Event;
        class TimerEvent extends Event {
            constructor(eventType, eventTarget, elapsedCount = 0, repeatCount = 0, restCount = 0) {
                super(eventType, eventTarget);
                this.elapsedCount = elapsedCount;
                this.repeatCount = repeatCount;
                this.restCount = restCount;
            }
            clone() {
                return new TimerEvent(this.type, this.target, this.elapsedCount, this.repeatCount, this.restCount);
            }
            toString() {
                return '[TimerEvent] type = ' + this.type + ', elapsedCount = ' + this.elapsedCount + ', repeatCount=' + this.repeatCount + ', restCount=' + this.restCount;
            }
        }
        TimerEvent.tick = 'TimerEvent.tick';
        TimerEvent.complete = 'TimerEvent.complete';
        time.TimerEvent = TimerEvent;
    })(time = alm.time || (alm.time = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        var EventDispatcher = alm.event.EventDispatcher;
        class FileLoader extends EventDispatcher {
            constructor(totalThreadCount = 3) {
                super();
                this.fileLoadCompleteHandler = (query, content, info = null) => {
                    --this.currentThreadCount;
                    query.isLoading = false;
                    query.isLoadComplete = true;
                    query.content = content;
                    if (query.param.onLoad) {
                        query.param.onLoad(content, info);
                    }
                    this.dispatchEvent(new io.FileLoaderSuccessEvent(io.FileLoaderSuccessEvent.success, this, content, info));
                    this.next();
                };
                this.fileLoadErrorHandler = (query, info = null) => {
                    --this.currentThreadCount;
                    query.isLoading = false;
                    query.isLoadComplete = true;
                    if (query.param.onError) {
                        query.param.onError(info);
                    }
                    this.dispatchEvent(new io.FileLoaderErrorEvent(io.FileLoaderErrorEvent.error, this, info));
                    this.next();
                };
                this.isLoading_ = false;
                this.currentCount = 0;
                this.totalCount = 0;
                this.currentThreadCount = 0;
                this.totalThreadCount = totalThreadCount;
                this.loadingQueries = [];
                this.loadingQueryIndex = -1;
                this.queriesByQueryId = {};
                this.queriesByUrl = {};
                this.handlersByType = {};
                trace('[FileLoader] totalThreadCount : ' + this.totalThreadCount);
            }
            require(url, type, id = '') {
                return this.addQuery(type, url, {}, id);
            }
            addQuery(type, url, param, id = '') {
                if (this.queriesByUrl[url])
                    return this.queriesByUrl[url].id;
                const query = new io.FileQuery();
                query.type = type;
                query.url = url;
                query.param = param;
                if (id != '') {
                    query.id = id;
                }
                else {
                    query.id = String(FileLoader.id);
                    ++FileLoader.id;
                }
                this.loadingQueries.push(query);
                this.queriesByQueryId[query.id] = query;
                this.queriesByUrl[query.url] = query;
                return query.id;
            }
            load() {
                if (this.isLoading_)
                    return;
                this.isLoading_ = true;
                this.loadingQueryIndex = -1;
                this.next();
            }
            next() {
                this.currentCount = this.loadingQueryIndex + 1;
                this.totalCount = this.loadingQueries.length;
                const progress = this.currentCount / this.totalCount;
                if (this.currentCount == 0) {
                    this.dispatchEvent(new io.FileLoaderProgressEvent(io.FileLoaderProgressEvent.start, this, progress, this.currentCount, this.totalCount));
                }
                else {
                    this.dispatchEvent(new io.FileLoaderProgressEvent(io.FileLoaderProgressEvent.progress, this, progress, this.currentCount, this.totalCount));
                }
                while (this.currentThreadCount < this.totalThreadCount) {
                    if (this.loadingQueryIndex + 1 < this.totalCount) {
                        ++this.currentThreadCount;
                        ++this.loadingQueryIndex;
                        const query = this.loadingQueries[this.loadingQueryIndex];
                        query.isLoading = true;
                        query.isLoadComplete = false;
                        trace('[FileLoader] loading... ' + '\'' + query.url + '\' as \'' + query.type + '\'');
                        const handler = this.handlersByType[query.type];
                        if (handler) {
                            handler.load(query.url, (content, info = null) => {
                                this.fileLoadCompleteHandler(query, content, info);
                            }, (info = null) => {
                                this.fileLoadErrorHandler(query, info);
                            });
                        }
                        else {
                            trace('[FileLoader] handler is not found \'' + query.type + '\'');
                            --this.currentThreadCount;
                        }
                    }
                    else {
                        this.isLoading_ = false;
                        this.loadingQueries = [];
                        this.loadingQueryIndex = -1;
                        this.dispatchEvent(new io.FileLoaderProgressEvent(io.FileLoaderProgressEvent.complete, this, progress, this.currentCount, this.totalCount));
                        break;
                    }
                }
            }
            addHandler(handler) {
                this.handlersByType[handler.getType()] = handler;
            }
            getQueryByQueryId(queryId) {
                return this.queriesByQueryId[queryId];
            }
            getQueryByUrl(url) {
                return this.queriesByUrl[url];
            }
            isLoading() {
                return this.isLoading_;
            }
            getCurrentCount() {
                return this.currentCount;
            }
            getTotalCount() {
                return this.totalCount;
            }
            getContentByUrl(url) {
                return this.queriesByUrl[url].content;
            }
            getContentByQueryId(textureId) {
                return this.queriesByQueryId[textureId].content;
            }
            getCurrentThreadCount() {
                return this.currentThreadCount;
            }
            getTotalThreadCount() {
                return this.totalThreadCount;
            }
        }
        FileLoader.id = 0;
        io.FileLoader = FileLoader;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        class FileLoaderProgressEvent extends alm.event.Event {
            constructor(eventType, eventTarget, progress = 0, loadedCount = 0, totalCount = 0) {
                super(eventType, eventTarget);
                this.progress = progress;
                this.loadedCount = loadedCount;
                this.totalCount = totalCount;
            }
            clone() {
                return new FileLoaderProgressEvent(this.type, this.target, this.progress, this.loadedCount, this.totalCount);
            }
            toString() {
                return '[FileLoaderProgressEvent] type = ' + this.type + ', progress = ' + this.progress + ', loadedCount = ' + this.loadedCount + ', totalCount = ' + this.totalCount;
            }
        }
        FileLoaderProgressEvent.start = 'FileLoaderProgressEvent.start';
        FileLoaderProgressEvent.progress = 'FileLoaderProgressEvent.progress';
        FileLoaderProgressEvent.complete = 'FileLoaderProgressEvent.complete';
        io.FileLoaderProgressEvent = FileLoaderProgressEvent;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        class FileLoaderSuccessEvent extends alm.event.Event {
            constructor(eventType, eventTarget, content, info = null) {
                super(eventType, eventTarget);
                this.content = content;
                this.info = info;
            }
            clone() {
                return new FileLoaderSuccessEvent(this.type, this.target, this.content, this.info);
            }
            toString() {
                return '[FileLoaderSuccessEvent] type = ' + this.type + ', info = ' + this.info;
            }
        }
        FileLoaderSuccessEvent.success = 'FileLoaderSuccessEvent.success';
        io.FileLoaderSuccessEvent = FileLoaderSuccessEvent;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        class FileLoaderErrorEvent extends alm.event.Event {
            constructor(eventType, eventTarget, info = null) {
                super(eventType, eventTarget);
                this.info = info;
            }
            clone() {
                return new FileLoaderErrorEvent(this.type, this.target, this.info);
            }
            toString() {
                return '[FileLoaderErrorEvent] type = ' + this.type + ', info = ' + this.info;
            }
        }
        FileLoaderErrorEvent.error = 'FileLoaderErrorEvent.error';
        io.FileLoaderErrorEvent = FileLoaderErrorEvent;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        class FileQuery {
            constructor() {
                this.isLoading = false;
                this.isLoadComplete = false;
            }
        }
        io.FileQuery = FileQuery;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        class ImageFileHandler {
            constructor(crossOrigin = null) {
                this.crossOrigin = crossOrigin;
            }
            getType() {
                return ImageFileHandler.type;
            }
            load(url, onComplete, onError) {
                const image = new Image();
                image.crossOrigin = this.crossOrigin;
                image.src = url;
                image.onabort = () => {
                    onError('load abort : ' + url);
                };
                image.onerror = () => {
                    onError('load error : ' + url);
                };
                image.onload = () => {
                    onComplete(image);
                };
            }
        }
        ImageFileHandler.type = 'image';
        io.ImageFileHandler = ImageFileHandler;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var view;
    (function (view) {
        var Event = alm.event.Event;
        class ViewEvent extends Event {
            constructor(eventType, eventTarget) {
                super(eventType, eventTarget);
            }
            clone() {
                return new ViewEvent(this.type, this.target);
            }
            toString() {
                return '[ViewEvent] type = ' + this.type;
            }
        }
        ViewEvent.initializeBegin = 'ViewEvent.initializeBegin';
        ViewEvent.initializeEnd = 'ViewEvent.initializeEnd';
        ViewEvent.finalizeBegin = 'ViewEvent.finalizeBegin';
        ViewEvent.finalizeEnd = 'ViewEvent.finalizeEnd';
        ViewEvent.readyBegin = 'ViewEvent.readyBegin';
        ViewEvent.readyEnd = 'ViewEvent.readyEnd';
        ViewEvent.showBegin = 'ViewEvent.showBegin';
        ViewEvent.showEnd = 'ViewEvent.showEnd';
        ViewEvent.hideBegin = 'ViewEvent.hideBegin';
        ViewEvent.hideEnd = 'ViewEvent.hideEnd';
        view.ViewEvent = ViewEvent;
    })(view = alm.view || (alm.view = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var view;
    (function (view_1) {
        var EventDispatcher = alm.event.EventDispatcher;
        var Logger = alm.debug.Logger;
        class View extends EventDispatcher {
            constructor(view = null, id = null) {
                super();
                this.id = id != null ? id : String(View.viewCount);
                this.view = view;
                this.name = '';
                this.autoHideWithInit = true;
                this.isInitializing = false;
                this.isInitialized = false;
                this.isFinalizing = false;
                this.isFinalized = false;
                this.isReadying = false;
                this.isReadied = false;
                this.isShowing = false;
                this.isShown = true;
                this.isHiding = false;
                if (View.viewsById[this.id]) {
                    Logger.warn('view id \'' + this.id + '\' is duplicate');
                }
                View.viewsById[this.id] = this;
                ++View.viewCount;
            }
            initialize() {
                if (this.isInitializing || this.isInitialized)
                    return;
                this.isInitializing = true;
                this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.initializeBegin, this));
                this.view = this.implInitialize();
                if (this.isInitializing) {
                    throwError(this.name || this, 'view is not assigned', !this.view);
                    if (this.autoHideWithInit) {
                        this.hide(false);
                    }
                    this.isInitializing = false;
                    this.isInitialized = true;
                    this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.initializeEnd, this));
                }
                else {
                    this.view = null;
                }
            }
            ready() {
                if (this.isReadying || this.isReadied)
                    return;
                this.isReadying = true;
                throwError(this.name || this, 'ready() must be called after initialize()', !this.isInitialized);
                this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.readyBegin, this));
                this.implReady();
                this.isReadying = false;
                this.isReadied = true;
                this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.readyEnd, this));
            }
            finalize() {
                if (!this.isInitializing && !this.isInitialized)
                    return;
                if (this.isFinalizing && this.isFinalized)
                    return;
                this.isFinalizing = true;
                this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.finalizeBegin, this));
                this.implFinalize();
                this.isFinalizing = false;
                this.isFinalized = true;
                this.isInitializing = false;
                this.isInitialized = false;
                this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.finalizeEnd, this));
                delete View.viewsById[this.id];
                View.viewsById[this.id] = null;
            }
            show(useTransition = true) {
                if (this.isShown)
                    return;
                this.getShowCommand(useTransition).execute();
            }
            hide(useTransition = true) {
                if (!this.isShown)
                    return;
                this.getHideCommand(useTransition).execute();
            }
            getShowCommand(useTransition = true) {
                const command = new cmd.Serial();
                command.addCommand(new cmd.Func(() => {
                    if (this.isShown)
                        return;
                    throwError(this.name || this, 'getShowCommand() is must be called after initialize()', this.isInitializing || !this.isInitialized);
                    throwWarn(this.name || this, 'getShowCommand() is must be called after ready()', this.isReadying || !this.isReadied);
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
                    this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.showBegin, this));
                    command.insertCommand(this.implShow(this.view, useTransition), new cmd.Func(() => {
                        this.showCommand = null;
                        this.isShowing = false;
                        this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.showEnd, this));
                    }));
                }));
                return command;
            }
            getHideCommand(useTransition = true) {
                const command = new cmd.Serial();
                command.addCommand(new cmd.Func(() => {
                    if (!this.isShown)
                        return;
                    if (!this.isInitializing) {
                        throwError(this.name || this, 'getHideCommand() is must be called after initialize()', this.isInitializing || !this.isInitialized);
                        throwWarn(this.name || this, 'getHideCommand() is must be called after ready()', this.isReadying || !this.isReadied);
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
                    this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.hideBegin, this));
                    command.insertCommand(this.implHide(this.view, useTransition), new cmd.Func(() => {
                        this.hideCommand = null;
                        this.isHiding = false;
                        this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.hideEnd, this));
                    }));
                }));
                return command;
            }
            getIsInitializing() {
                return this.isInitializing;
            }
            getIsInitialized() {
                return this.isInitialized;
            }
            getIsReadying() {
                return this.isReadying;
            }
            getIsReadied() {
                return this.isReadied;
            }
            getIsShowing() {
                return this.isShowing;
            }
            getIsShown() {
                return this.isShown;
            }
            getIsHiding() {
                return this.isHiding;
            }
            getIsHidden() {
                return !this.isShown;
            }
            getIsFinalizing() {
                return this.isFinalizing;
            }
            getIsFinalized() {
                return this.isFinalized;
            }
            getId() {
                return this.id;
            }
            getView() {
                return this.view;
            }
            getName() {
                return this.name;
            }
            setName(value) {
                this.name = value;
            }
            getAutoHideWithInit() {
                return this.autoHideWithInit;
            }
            setAutoHideWithInit(value) {
                this.autoHideWithInit = value;
            }
            static getViewById(id) {
                return View.viewsById[id];
            }
        }
        View.viewCount = 0;
        View.viewsById = {};
        view_1.View = View;
    })(view = alm.view || (alm.view = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var view;
    (function (view) {
        class ButtonBehavior {
            constructor(target, hitArea = null, isHoverCursorEnabled = true, isPreventDefaultEnabled = true, isStopPropagationEnabled = true) {
                this.mouseOverHandler = (event) => {
                    if (this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (this.isStopPropagationEnabled)
                        event.stopPropagation();
                    this.over();
                    this.applyMouseCursor();
                };
                this.mouseOutHandler = (event) => {
                    if (this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (this.isStopPropagationEnabled)
                        event.stopPropagation();
                    this.out();
                    this.applyMouseCursor();
                };
                this.mouseDownHandler = (event) => {
                    if (this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (this.isStopPropagationEnabled)
                        event.stopPropagation();
                    this.down();
                };
                this.mouseUpHandler = (event) => {
                    if (this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (this.isStopPropagationEnabled)
                        event.stopPropagation();
                    this.up();
                };
                this.clickHandler = (event) => {
                    if (this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (this.isStopPropagationEnabled)
                        event.stopPropagation();
                    this.click();
                };
                this.touchStartHandler = (event) => {
                    if (this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (this.isStopPropagationEnabled)
                        event.stopPropagation();
                    this.down();
                };
                this.touchEndHandler = (event) => {
                    if (this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (this.isStopPropagationEnabled)
                        event.stopPropagation();
                    this.up();
                    this.click();
                };
                this.touchCancelHandler = (event) => {
                    if (this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (this.isStopPropagationEnabled)
                        event.stopPropagation();
                    this.up();
                };
                this.target = target;
                this.hitArea = null;
                this.isHoverCursorEnabled = isHoverCursorEnabled;
                this.isPreventDefaultEnabled = isPreventDefaultEnabled;
                this.isStopPropagationEnabled = isStopPropagationEnabled;
                this.isEnabled = true;
                this.isOver = false;
                this.isDown = false;
                this.isOverInternal = false;
                this.isDownInternal = false;
                this.defaultMouseCursor = '';
                this.setHitArea(hitArea);
            }
            over(useTransition = true) {
                this.isOverInternal = true;
                if (this.isEnabled) {
                    if (this.isOver)
                        return;
                    this.isOver = true;
                    this.target.implButtonOver(useTransition);
                }
            }
            out(useTransition = true) {
                this._out(true, useTransition);
            }
            _out(checkEnabled, useTransition = true) {
                this.isOverInternal = false;
                if (this.isEnabled || !checkEnabled) {
                    if (!this.isOver)
                        return;
                    this.isOver = false;
                    this.target.implButtonOut(useTransition);
                }
            }
            down(useTransition = true) {
                this.isDownInternal = true;
                if (this.isEnabled) {
                    if (this.isDown)
                        return;
                    this.isDown = true;
                    this.target.implButtonDown(useTransition);
                }
            }
            up(useTransition = true) {
                this._up(true, useTransition);
            }
            _up(checkEnabled, useTransition = true) {
                this.isDownInternal = false;
                if (this.isEnabled || !checkEnabled) {
                    if (!this.isDown)
                        return;
                    this.isDown = false;
                    this.target.implButtonUp(useTransition);
                }
            }
            click(useTransition = true) {
                if (this.isEnabled) {
                    this.target.implButtonClick(useTransition);
                }
            }
            on() {
                if (this.hitArea == null)
                    return;
                this.hitArea.addEventListener('mouseover', this.mouseOverHandler);
                this.hitArea.addEventListener('mouseout', this.mouseOutHandler);
                this.hitArea.addEventListener('mousedown', this.mouseDownHandler);
                this.hitArea.addEventListener('mouseup', this.mouseUpHandler);
                this.hitArea.addEventListener('click', this.clickHandler);
                this.hitArea.addEventListener('touchstart', this.touchStartHandler);
                this.hitArea.addEventListener('touchend', this.touchEndHandler);
                this.hitArea.addEventListener('touchcancel', this.touchCancelHandler);
            }
            off() {
                if (this.hitArea == null)
                    return;
                this.hitArea.removeEventListener('mouseover', this.mouseOverHandler);
                this.hitArea.removeEventListener('mouseout', this.mouseOutHandler);
                this.hitArea.removeEventListener('mousedown', this.mouseDownHandler);
                this.hitArea.removeEventListener('mouseup', this.mouseUpHandler);
                this.hitArea.removeEventListener('click', this.clickHandler);
                this.hitArea.removeEventListener('touchstart', this.touchStartHandler);
                this.hitArea.removeEventListener('touchend', this.touchEndHandler);
                this.hitArea.removeEventListener('touchcancel', this.touchCancelHandler);
            }
            getIsEnabled() {
                return this.isEnabled;
            }
            setIsEnabled(value, useTransition = true) {
                if (this.isEnabled != value) {
                    this.isEnabled = value;
                    if (this.isEnabled) {
                        if (this.isOverInternal) {
                            this.over();
                        }
                        if (this.isDownInternal) {
                            this.down();
                        }
                    }
                    else {
                        if (this.isOver) {
                            this._out(false);
                            this.isOverInternal = true;
                        }
                        if (this.isDown) {
                            this._up(false);
                            this.isDownInternal = true;
                        }
                    }
                    this.target.implButtonChangeEnabled(this.isEnabled, useTransition);
                }
            }
            getIsOver() {
                return this.isOver;
            }
            getIsDown() {
                return this.isDown;
            }
            getHitArea() {
                return this.hitArea;
            }
            setHitArea(hitArea) {
                if (this.hitArea !== hitArea) {
                    this.off();
                    this.hitArea = hitArea;
                    this.on();
                }
            }
            clearHitArea() {
                this.setHitArea(null);
            }
            getIsPreventDefaultEnabled() {
                return this.isPreventDefaultEnabled;
            }
            setIsPreventDefaultEnabled(enabled) {
                this.isPreventDefaultEnabled = enabled;
            }
            getIsStopPropagationEnabled() {
                return this.isStopPropagationEnabled;
            }
            setIsStopPropagationEnabled(enabled) {
                this.isStopPropagationEnabled = enabled;
            }
            getIsHoverCursorEnabled() {
                return this.isHoverCursorEnabled;
            }
            setIsHoverCursorEnabled(enabled) {
                this.isHoverCursorEnabled = enabled;
            }
            applyMouseCursor() {
                if (this.isHoverCursorEnabled) {
                    if (this.isOverInternal && this.isEnabled && this.hitArea != null) {
                        this.defaultMouseCursor = this.hitArea.style.cursor;
                        this.hitArea.style.cursor = 'pointer';
                    }
                    else {
                        this.hitArea.style.cursor = this.defaultMouseCursor != '' ? this.defaultMouseCursor : 'auto';
                    }
                }
            }
        }
        view.ButtonBehavior = ButtonBehavior;
    })(view = alm.view || (alm.view = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var view;
    (function (view) {
        class SelectionBehavior {
            constructor(target) {
                this.target = target;
            }
            select(useTransition = true) {
                if (this.isSelected)
                    return;
                this.isSelected = true;
                this.target.implSelectionChanged(this.isSelected, useTransition);
            }
            deselect(useTransition = true) {
                if (!this.isSelected)
                    return;
                this.isSelected = false;
                this.target.implSelectionChanged(this.isSelected, useTransition);
            }
            getIsSelected() {
                return this.isSelected;
            }
        }
        view.SelectionBehavior = SelectionBehavior;
    })(view = alm.view || (alm.view = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        class DeviceInfo {
            constructor() { }
            static initialize() {
                if (this.isInitialized)
                    return;
                this.isInitialized = true;
                const u = window.navigator.userAgent.toLowerCase();
                this.isTablet = (u.indexOf('windows') != -1 && u.indexOf('touch') != -1)
                    || u.indexOf('ipad') != -1
                    || (u.indexOf('android') != -1 && u.indexOf('mobile') == -1)
                    || (u.indexOf('firefox') != -1 && u.indexOf('tablet') != -1)
                    || u.indexOf('kindle') != -1
                    || u.indexOf('silk') != -1
                    || u.indexOf('playbook') != -1;
                this.isMobile = (u.indexOf('windows') != -1 && u.indexOf('phone') != -1)
                    || u.indexOf('iphone') != -1
                    || u.indexOf('ipod') != -1
                    || (u.indexOf('android') != -1 && u.indexOf('mobile') != -1)
                    || (u.indexOf('firefox') != -1 && u.indexOf('mobile') != -1)
                    || u.indexOf('blackberry') != -1;
                this.isDesktop = !this.isTablet && !this.isMobile;
                this.isIOS = u.indexOf('ipad') != -1 || u.indexOf('iphone') != -1 || u.indexOf('ipod') != -1;
                this.isAndroid = u.indexOf('android') != -1 && u.indexOf('mobile') != -1;
                if (u.indexOf('msie') != -1 || u.indexOf('trident') != -1) {
                    this.isIE = true;
                }
                else if (u.indexOf('edge') != -1) {
                    this.isEdge = true;
                }
                else if (u.indexOf('chrome') != -1) {
                    this.isChrome = true;
                }
                else if (u.indexOf('safari') != -1) {
                    this.isSafari = true;
                }
                else if (u.indexOf('firefox') != -1) {
                    this.isFireFox = true;
                }
                else if (u.indexOf('opera') != -1) {
                    this.isOpera = true;
                }
                else {
                    this.isUnknownBrowser = true;
                }
                try {
                    const navigator = window.navigator;
                    if (this.isChrome) {
                        this.langFull = (navigator.languages[0] || navigator['browserLanguage'] || navigator.language || navigator['userLanguage']);
                    }
                    else {
                        this.langFull = (navigator['browserLanguage'] || navigator.language || navigator['userLanguage']);
                    }
                    this.lang = this.langFull.substr(0, 2);
                }
                catch (exception) {
                    this.lang = undefined;
                    this.langFull = undefined;
                }
                this.isTouchEnabled = (typeof window.ontouchstart) !== 'undefined';
                this.isDownloadEnabled = !this.isIOS;
                try {
                    const canvas = document.createElement('canvas');
                    const webGlContext = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
                    this.isWebGlEnabled = !!(window.WebGLRenderingContext && webGlContext && webGlContext.getShaderPrecisionFormat);
                }
                catch (e) {
                    this.isWebGlEnabled = false;
                }
                this.devicePixelRatio = window.devicePixelRatio;
                this.isRetina = this.devicePixelRatio > 1;
            }
            static getIsDesktop() {
                this.initialize();
                return this.isDesktop;
            }
            static getIsTablet() {
                this.initialize();
                return this.isTablet;
            }
            static getIsMobile() {
                this.initialize();
                return this.isMobile;
            }
            static getIsIOS() {
                this.initialize();
                return this.isIOS;
            }
            static getIsAndroid() {
                this.initialize();
                return this.isAndroid;
            }
            static getIsIE() {
                this.initialize();
                return this.isIE;
            }
            static getIsEdge() {
                this.initialize();
                return this.isEdge;
            }
            static getIsChrome() {
                this.initialize();
                return this.isChrome;
            }
            static getIsSafari() {
                this.initialize();
                return this.isSafari;
            }
            static getIsFireFox() {
                this.initialize();
                return this.isFireFox;
            }
            static getIsOpera() {
                this.initialize();
                return this.isOpera;
            }
            static getIsUnknownBrowser() {
                this.initialize();
                return this.isUnknownBrowser;
            }
            static getLang() {
                this.initialize();
                return this.lang;
            }
            static getLangFull() {
                this.initialize();
                return this.langFull;
            }
            static getIsTouchEnabled() {
                this.initialize();
                return this.isTouchEnabled;
            }
            static getIsDownloadEnabled() {
                this.initialize();
                return this.isDownloadEnabled;
            }
            static getIsWebGlEnabled() {
                this.initialize();
                return this.isWebGlEnabled;
            }
            static getIsRetina() {
                this.initialize();
                return this.isRetina;
            }
            static getDevicePixelRatio() {
                this.initialize();
                return this.devicePixelRatio;
            }
            static getDpi() {
                if (this.dpi == -1) {
                    const div = document.createElement('div');
                    div.setAttribute('style', 'height:1in;left:-100%;top:-100%;position:absolute;width:1in;');
                    document.body.appendChild(div);
                    this.dpi = div.offsetHeight;
                    document.body.removeChild(div);
                }
                return this.dpi;
            }
        }
        DeviceInfo.isDesktop = false;
        DeviceInfo.isTablet = false;
        DeviceInfo.isMobile = false;
        DeviceInfo.isIOS = false;
        DeviceInfo.isAndroid = false;
        DeviceInfo.isIE = false;
        DeviceInfo.isEdge = false;
        DeviceInfo.isChrome = false;
        DeviceInfo.isSafari = false;
        DeviceInfo.isFireFox = false;
        DeviceInfo.isOpera = false;
        DeviceInfo.isUnknownBrowser = false;
        DeviceInfo.isTouchEnabled = false;
        DeviceInfo.isDownloadEnabled = false;
        DeviceInfo.isWebGlEnabled = false;
        DeviceInfo.isRetina = false;
        DeviceInfo.devicePixelRatio = 1;
        DeviceInfo.dpi = -1;
        DeviceInfo.isInitialized = false;
        browser.DeviceInfo = DeviceInfo;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var Time = alm.util.Time;
        class LocalStorage {
            constructor() { }
            static save(key, value, expiredAt = -1) {
                if (!LocalStorage.isAvailable())
                    return false;
                const record = { value: JSON.stringify(value), expiredAt: expiredAt };
                localStorage.setItem(key, JSON.stringify(record));
                return true;
            }
            static saveWithTerm(key, value, milliseconds = -1) {
                const expiredAt = milliseconds > 0 ? Time.now() + milliseconds : -1;
                return LocalStorage.save(key, value, expiredAt);
            }
            static load(key, defaultValue = null) {
                if (!LocalStorage.isAvailable())
                    return defaultValue;
                const record = JSON.parse(localStorage.getItem(key));
                if (record) {
                    if (record.expiredAt > 0) {
                        if (Time.now() < record.expiredAt) {
                            return JSON.parse(record.value);
                        }
                        else {
                            localStorage.removeItem(key);
                            return defaultValue;
                        }
                    }
                    else {
                        return JSON.parse(record.value);
                    }
                }
                else {
                    return defaultValue;
                }
            }
            static remove(key) {
                if (!LocalStorage.isAvailable())
                    return;
                localStorage.removeItem(key);
            }
            static isAvailable() {
                if (LocalStorage.isAvailable_ == null) {
                    try {
                        localStorage.setItem('__CKECK__', '__CKECK__');
                        localStorage.removeItem('__CKECK__');
                        LocalStorage.isAvailable_ = true;
                    }
                    catch (error) {
                        LocalStorage.isAvailable_ = false;
                    }
                }
                return LocalStorage.isAvailable_;
            }
            static toMilliseconds(dates = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
                return milliseconds + (seconds + (minutes + (hours + dates * 24) * 60) * 60) * 1000;
            }
        }
        LocalStorage.isAvailable_ = null;
        browser.LocalStorage = LocalStorage;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        class SessionStorage {
            constructor() { }
            static save(key, value) {
                if (!SessionStorage.isAvailable())
                    return false;
                sessionStorage.setItem(key, JSON.stringify(value));
                return true;
            }
            static load(key, defaultValue = null) {
                if (!SessionStorage.isAvailable())
                    return defaultValue;
                const record = JSON.parse(sessionStorage.getItem(key));
                if (record) {
                    return JSON.parse(record.value);
                }
                else {
                    return defaultValue;
                }
            }
            static remove(key) {
                if (!SessionStorage.isAvailable())
                    return;
                sessionStorage.removeItem(key);
            }
            static isAvailable() {
                if (SessionStorage.isAvailable_ == null) {
                    try {
                        sessionStorage.setItem('__CKECK__', '__CKECK__');
                        sessionStorage.removeItem('__CKECK__');
                        SessionStorage.isAvailable_ = true;
                    }
                    catch (error) {
                        SessionStorage.isAvailable_ = false;
                    }
                }
                return SessionStorage.isAvailable_;
            }
        }
        SessionStorage.isAvailable_ = null;
        browser.SessionStorage = SessionStorage;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        let KeyCode;
        (function (KeyCode) {
            KeyCode[KeyCode["backspace"] = 8] = "backspace";
            KeyCode[KeyCode["tab"] = 9] = "tab";
            KeyCode[KeyCode["enter"] = 13] = "enter";
            KeyCode[KeyCode["shift"] = 16] = "shift";
            KeyCode[KeyCode["ctrl"] = 17] = "ctrl";
            KeyCode[KeyCode["alt"] = 18] = "alt";
            KeyCode[KeyCode["pauseBreak"] = 19] = "pauseBreak";
            KeyCode[KeyCode["capsLock"] = 20] = "capsLock";
            KeyCode[KeyCode["escape"] = 27] = "escape";
            KeyCode[KeyCode["space"] = 32] = "space";
            KeyCode[KeyCode["pageUp"] = 33] = "pageUp";
            KeyCode[KeyCode["pageDown"] = 34] = "pageDown";
            KeyCode[KeyCode["end"] = 35] = "end";
            KeyCode[KeyCode["home"] = 36] = "home";
            KeyCode[KeyCode["leftArrow"] = 37] = "leftArrow";
            KeyCode[KeyCode["upArrow"] = 38] = "upArrow";
            KeyCode[KeyCode["rightArrow"] = 39] = "rightArrow";
            KeyCode[KeyCode["downArrow"] = 40] = "downArrow";
            KeyCode[KeyCode["insert"] = 45] = "insert";
            KeyCode[KeyCode["delete"] = 46] = "delete";
            KeyCode[KeyCode["key0"] = 48] = "key0";
            KeyCode[KeyCode["key1"] = 49] = "key1";
            KeyCode[KeyCode["key2"] = 50] = "key2";
            KeyCode[KeyCode["key3"] = 51] = "key3";
            KeyCode[KeyCode["key4"] = 52] = "key4";
            KeyCode[KeyCode["key5"] = 53] = "key5";
            KeyCode[KeyCode["key6"] = 54] = "key6";
            KeyCode[KeyCode["key7"] = 55] = "key7";
            KeyCode[KeyCode["key8"] = 56] = "key8";
            KeyCode[KeyCode["key9"] = 57] = "key9";
            KeyCode[KeyCode["closedParen"] = 48] = "closedParen";
            KeyCode[KeyCode["exclamationMark"] = 49] = "exclamationMark";
            KeyCode[KeyCode["atSign"] = 50] = "atSign";
            KeyCode[KeyCode["poundSign"] = 51] = "poundSign";
            KeyCode[KeyCode["hash"] = 51] = "hash";
            KeyCode[KeyCode["dollarSign"] = 52] = "dollarSign";
            KeyCode[KeyCode["percentSign"] = 53] = "percentSign";
            KeyCode[KeyCode["caret"] = 54] = "caret";
            KeyCode[KeyCode["hat"] = 54] = "hat";
            KeyCode[KeyCode["ampersand"] = 55] = "ampersand";
            KeyCode[KeyCode["star"] = 56] = "star";
            KeyCode[KeyCode["asterik"] = 56] = "asterik";
            KeyCode[KeyCode["openParen"] = 57] = "openParen";
            KeyCode[KeyCode["a"] = 65] = "a";
            KeyCode[KeyCode["b"] = 66] = "b";
            KeyCode[KeyCode["c"] = 67] = "c";
            KeyCode[KeyCode["d"] = 68] = "d";
            KeyCode[KeyCode["e"] = 69] = "e";
            KeyCode[KeyCode["f"] = 70] = "f";
            KeyCode[KeyCode["g"] = 71] = "g";
            KeyCode[KeyCode["h"] = 72] = "h";
            KeyCode[KeyCode["i"] = 73] = "i";
            KeyCode[KeyCode["j"] = 74] = "j";
            KeyCode[KeyCode["k"] = 75] = "k";
            KeyCode[KeyCode["l"] = 76] = "l";
            KeyCode[KeyCode["m"] = 77] = "m";
            KeyCode[KeyCode["n"] = 78] = "n";
            KeyCode[KeyCode["o"] = 79] = "o";
            KeyCode[KeyCode["p"] = 80] = "p";
            KeyCode[KeyCode["q"] = 81] = "q";
            KeyCode[KeyCode["r"] = 82] = "r";
            KeyCode[KeyCode["s"] = 83] = "s";
            KeyCode[KeyCode["t"] = 84] = "t";
            KeyCode[KeyCode["u"] = 85] = "u";
            KeyCode[KeyCode["v"] = 86] = "v";
            KeyCode[KeyCode["w"] = 87] = "w";
            KeyCode[KeyCode["x"] = 88] = "x";
            KeyCode[KeyCode["y"] = 89] = "y";
            KeyCode[KeyCode["z"] = 90] = "z";
            KeyCode[KeyCode["leftWindowKey"] = 91] = "leftWindowKey";
            KeyCode[KeyCode["rightWindowKey"] = 92] = "rightWindowKey";
            KeyCode[KeyCode["selectKey"] = 93] = "selectKey";
            KeyCode[KeyCode["numpad0"] = 96] = "numpad0";
            KeyCode[KeyCode["numpad1"] = 97] = "numpad1";
            KeyCode[KeyCode["numpad2"] = 98] = "numpad2";
            KeyCode[KeyCode["numpad3"] = 99] = "numpad3";
            KeyCode[KeyCode["numpad4"] = 100] = "numpad4";
            KeyCode[KeyCode["numpad5"] = 101] = "numpad5";
            KeyCode[KeyCode["numpad6"] = 102] = "numpad6";
            KeyCode[KeyCode["numpad7"] = 103] = "numpad7";
            KeyCode[KeyCode["numpad8"] = 104] = "numpad8";
            KeyCode[KeyCode["numpad9"] = 105] = "numpad9";
            KeyCode[KeyCode["multiply"] = 106] = "multiply";
            KeyCode[KeyCode["add"] = 107] = "add";
            KeyCode[KeyCode["subtract"] = 109] = "subtract";
            KeyCode[KeyCode["decimalPoint"] = 110] = "decimalPoint";
            KeyCode[KeyCode["divide"] = 111] = "divide";
            KeyCode[KeyCode["F1"] = 112] = "F1";
            KeyCode[KeyCode["F2"] = 113] = "F2";
            KeyCode[KeyCode["F3"] = 114] = "F3";
            KeyCode[KeyCode["F4"] = 115] = "F4";
            KeyCode[KeyCode["F5"] = 116] = "F5";
            KeyCode[KeyCode["F6"] = 117] = "F6";
            KeyCode[KeyCode["F7"] = 118] = "F7";
            KeyCode[KeyCode["F8"] = 119] = "F8";
            KeyCode[KeyCode["F9"] = 120] = "F9";
            KeyCode[KeyCode["F10"] = 121] = "F10";
            KeyCode[KeyCode["F11"] = 122] = "F11";
            KeyCode[KeyCode["F12"] = 123] = "F12";
            KeyCode[KeyCode["numLock"] = 144] = "numLock";
            KeyCode[KeyCode["scrollLock"] = 145] = "scrollLock";
            KeyCode[KeyCode["semiColon"] = 186] = "semiColon";
            KeyCode[KeyCode["equals"] = 187] = "equals";
            KeyCode[KeyCode["comma"] = 188] = "comma";
            KeyCode[KeyCode["dash"] = 189] = "dash";
            KeyCode[KeyCode["period"] = 190] = "period";
            KeyCode[KeyCode["underScore"] = 189] = "underScore";
            KeyCode[KeyCode["plusSign"] = 187] = "plusSign";
            KeyCode[KeyCode["forwardSlash"] = 191] = "forwardSlash";
            KeyCode[KeyCode["tilde"] = 192] = "tilde";
            KeyCode[KeyCode["graveAccent"] = 192] = "graveAccent";
            KeyCode[KeyCode["openBracket"] = 219] = "openBracket";
            KeyCode[KeyCode["closedBracket"] = 221] = "closedBracket";
            KeyCode[KeyCode["quote"] = 222] = "quote";
        })(KeyCode = browser.KeyCode || (browser.KeyCode = {}));
        class KeyWatcher {
            constructor() { }
            static initialize() {
                if (this.isInitialized)
                    return;
                this.isInitialized = true;
                this.eventDispatcher = new alm.event.EventDispatcher();
            }
            static start() {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                this.initialize();
                trace('[KeyWatcher] start');
                window.addEventListener('keydown', this.windowKeyDownHandler);
                window.addEventListener('keyup', this.windowKeyUpHandler);
            }
            static stop() {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                this.initialize();
                trace('[KeyWatcher] stop');
                window.removeEventListener('keydown', this.windowKeyDownHandler);
                window.removeEventListener('keyup', this.windowKeyUpHandler);
            }
            static addEventListener(eventType, listener) {
                this.initialize();
                this.eventDispatcher.addEventListener(eventType, listener);
            }
            static removeEventListener(eventType, listener) {
                this.initialize();
                this.eventDispatcher.removeEventListener(eventType, listener);
            }
            static getIsRunning() { return this.isRunning; }
            static getIsAnyKeyPressed() { return this.pressedKeyCount > 0; }
            static getIsKeyPressed(keyCode) { return this.isKeyPressedByKeyCode[keyCode] != null; }
            static getIsContinuousPressEnabled() { return this.isContinuousPressEnabled; }
            static setIsContinuousPressEnabled(enabled) { this.isContinuousPressEnabled = enabled; }
        }
        KeyWatcher.windowKeyDownHandler = (event) => {
            const keyCode = event.keyCode;
            if (KeyWatcher.isKeyPressedByKeyCode[keyCode] == null) {
                KeyWatcher.isKeyPressedByKeyCode[keyCode] = true;
                ++KeyWatcher.pressedKeyCount;
                KeyWatcher.eventDispatcher.dispatchEvent(new browser.KeyWatcherEvent(browser.KeyWatcherEvent.keyDown, KeyWatcher, event));
            }
            else if (KeyWatcher.isContinuousPressEnabled) {
                KeyWatcher.eventDispatcher.dispatchEvent(new browser.KeyWatcherEvent(browser.KeyWatcherEvent.keyDown, KeyWatcher, event));
            }
        };
        KeyWatcher.windowKeyUpHandler = (event) => {
            const keyCode = event.keyCode;
            if (KeyWatcher.isKeyPressedByKeyCode[keyCode] != null) {
                delete KeyWatcher.isKeyPressedByKeyCode[keyCode];
                --KeyWatcher.pressedKeyCount;
                KeyWatcher.eventDispatcher.dispatchEvent(new browser.KeyWatcherEvent(browser.KeyWatcherEvent.keyUp, KeyWatcher, event));
            }
        };
        KeyWatcher.isRunning = false;
        KeyWatcher.pressedKeyCount = 0;
        KeyWatcher.isKeyPressedByKeyCode = {};
        KeyWatcher.isContinuousPressEnabled = false;
        KeyWatcher.isInitialized = false;
        KeyWatcher.isLongPressed = false;
        KeyWatcher.eventDispatcher = null;
        browser.KeyWatcher = KeyWatcher;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        class KeyWatcherEvent extends alm.event.Event {
            constructor(eventType, eventTarget, originalEvent = null) {
                super(eventType, eventTarget);
                this.originalEvent = originalEvent;
                this.key = this.originalEvent.key;
                this.keyCode = this.originalEvent.keyCode;
                this.altKey = this.originalEvent.altKey;
                this.ctrlKey = this.originalEvent.ctrlKey;
                this.shiftKey = this.originalEvent.shiftKey;
            }
            clone() {
                return new KeyWatcherEvent(this.type, this.target, this.originalEvent);
            }
            toString() {
                return '[KeyWatcherEvent] type = ' + this.type + ', key = ' + this.key + ', keyCode = ' + this.keyCode + ', altKey = ' + this.altKey + ', ctrlKey = ' + this.ctrlKey + ', shiftKey = ' + this.shiftKey;
            }
        }
        KeyWatcherEvent.keyUp = 'KeyWatcherEvent.keyUp';
        KeyWatcherEvent.keyDown = 'KeyWatcherEvent.keyDown';
        browser.KeyWatcherEvent = KeyWatcherEvent;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        class WinWatcher {
            constructor() { }
            static initialize() {
                if (this.isInitialized)
                    return;
                this.isInitialized = true;
                this.eventDispatcher = new alm.event.EventDispatcher();
            }
            static start(target = null) {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                this.initialize();
                trace('[WinWatcher] start');
                this.window = target || window;
                this.window.addEventListener('resize', this.windowResizeHandler);
                this.window.addEventListener('orientationchange', this.windowResizeHandler);
                this.window.addEventListener('scroll', this.windowScrollHandler);
                this.apply();
            }
            static stop() {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                this.initialize();
                trace('[WinWatcher] stop');
                this.window.removeEventListener('resize', this.windowResizeHandler);
                this.window.removeEventListener('orientationchange', this.windowResizeHandler);
                this.window.removeEventListener('scroll', this.windowScrollHandler);
            }
            static apply() {
                this.width = this.window.innerWidth;
                this.height = this.window.innerHeight;
                this.scrollTop = (this.window.scrollY !== undefined) ? this.window.scrollY : document.documentElement.scrollTop;
                this.scrollBottom = this.scrollTop + this.height;
            }
            static addEventListener(eventType, listener) {
                this.initialize();
                this.eventDispatcher.addEventListener(eventType, listener);
            }
            static removeEventListener(eventType, listener) {
                this.initialize();
                this.eventDispatcher.removeEventListener(eventType, listener);
            }
            static calcScrolledPosition(y) {
                return y - this.scrollTop;
            }
            ;
            static calcScrolledPositionRatio(y) {
                return this.calcScrolledPosition(y) / this.height;
            }
            static resize(event) {
                WinWatcher.apply();
                WinWatcher.eventDispatcher.dispatchEvent(new browser.WinWatcherEvent(browser.WinWatcherEvent.resize, WinWatcher, event, WinWatcher.scrollTop, WinWatcher.scrollBottom, WinWatcher.width, WinWatcher.height));
            }
            ;
            static getIsRunning() { return this.isRunning; }
            static getWindow() { return this.window; }
            static getScrollTop() { return this.scrollTop; }
            static getScrollBottom() { return this.scrollBottom; }
            static getWidth() { return this.width; }
            static getHeight() { return this.height; }
            static getIsMobileOrientationResize() { return this.isMobileOrientationResize; }
            static setIsMobileOrientationResize(value) { this.isMobileOrientationResize = value; }
        }
        WinWatcher.windowResizeHandler = (event) => {
            if (!browser.DeviceInfo.getIsDesktop() && WinWatcher.isMobileOrientationResize)
                return;
            trace('[WinWatcher] resize by window.resize');
            WinWatcher.resize(event);
        };
        WinWatcher.windowOrientationChangeHandler = (event) => {
            if (browser.DeviceInfo.getIsDesktop() || !WinWatcher.isMobileOrientationResize)
                return;
            trace('[WinWatcher] resize by window.orientationchange');
            WinWatcher.resize(event);
        };
        WinWatcher.windowScrollHandler = (event) => {
            WinWatcher.apply();
            WinWatcher.eventDispatcher.dispatchEvent(new browser.WinWatcherEvent(browser.WinWatcherEvent.scroll, WinWatcher, event, WinWatcher.scrollTop, WinWatcher.scrollBottom, WinWatcher.width, WinWatcher.height));
        };
        WinWatcher.isRunning = false;
        WinWatcher.window = null;
        WinWatcher.width = 0;
        WinWatcher.height = 0;
        WinWatcher.isMobileOrientationResize = true;
        WinWatcher.isInitialized = false;
        WinWatcher.eventDispatcher = null;
        browser.WinWatcher = WinWatcher;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        class WinWatcherEvent extends alm.event.Event {
            constructor(eventType, eventTarget, originalEvent = null, scrollTop = 0, scrollBottom = 0, width = 0, height = 0) {
                super(eventType, eventTarget);
                this.originalEvent = originalEvent;
                this.scrollTop = scrollTop;
                this.scrollBottom = scrollBottom;
                this.width = width;
                this.height = height;
            }
            clone() {
                return new WinWatcherEvent(this.type, this.target, this.originalEvent, this.scrollTop, this.scrollBottom, this.width, this.height);
            }
            toString() {
                return '[WinWatcherEvent] type = ' + this.type + ', scrollTop = ' + this.scrollTop + ', scrollBottom = ' + this.scrollBottom + ', width = ' + this.width + ', height = ' + this.height;
            }
        }
        WinWatcherEvent.scroll = 'WinWatcherEvent.scroll';
        WinWatcherEvent.resize = 'WinWatcherEvent.resize';
        browser.WinWatcherEvent = WinWatcherEvent;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        class ScrollSectionTriggerEvent extends alm.event.Event {
            constructor(eventType, target, currentSectionIndex, prevSectionIndex) {
                super(eventType, target);
                this.currentSectionIndex = currentSectionIndex;
                this.prevSectionIndex = prevSectionIndex;
            }
        }
        ScrollSectionTriggerEvent.change = 'ScrollSectionTriggerEvent.change';
        browser.ScrollSectionTriggerEvent = ScrollSectionTriggerEvent;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var Logger = alm.debug.Logger;
        var WinWatcher = alm.browser.WinWatcher;
        var WinWatcherEvent = alm.browser.WinWatcherEvent;
        var EventDispatcher = alm.event.EventDispatcher;
        class ScrollSectionTrigger extends EventDispatcher {
            constructor(threshold = 0.5) {
                super();
                this.windowScrollHandler = (event) => {
                    this.updateScrollPosition();
                    this.check();
                };
                this.windowResizeHandler = (event) => {
                    this.updateThresholdPosition();
                    this.updateScrollPosition();
                    this.check();
                };
                this.isRunning = false;
                this.scrollPosition = null;
                this.triggerPositions = [];
                this.thresholdRatio = threshold;
                this.thresholdPosition = null;
                this.currentSectionIndex = -1;
                this.prevSectionIndex = -1;
            }
            start() {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                WinWatcher.addEventListener(WinWatcherEvent.scroll, this.windowScrollHandler);
                WinWatcher.addEventListener(WinWatcherEvent.resize, this.windowResizeHandler);
                WinWatcher.start();
                this.updateThresholdPosition();
                this.updateScrollPosition();
                this.check();
            }
            stop() {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                WinWatcher.removeEventListener(WinWatcherEvent.scroll, this.windowScrollHandler);
                WinWatcher.removeEventListener(WinWatcherEvent.resize, this.windowResizeHandler);
                WinWatcher.stop();
            }
            getIsRunning() {
                return this.isRunning;
            }
            getCurrentIndex() {
                return this.currentSectionIndex;
            }
            getPrevIndex() {
                return this.prevSectionIndex;
            }
            getTriggerPositions() {
                return this.triggerPositions.concat();
            }
            setTriggerPositions(positions) {
                this.triggerPositions = positions.concat();
                this.triggerPositions.sort((a, b) => { return a - b; });
                if (this.isRunning) {
                    this.check();
                }
            }
            getThreshold() {
                return this.thresholdRatio;
            }
            setThreshold(ratio) {
                this.thresholdRatio = ratio;
                this.updateThresholdPosition();
                if (this.isRunning) {
                    this.check();
                }
            }
            check() {
                if (this.scrollPosition == null) {
                    Logger.warn('[RangeTrigger] current position is need set');
                    return;
                }
                let nearestTriggerIndex = -1;
                let nearestScrolledTriggerPosition = -1;
                let nearestDistance = Number.MAX_VALUE;
                const triggerPositionCount = this.triggerPositions.length;
                for (let i = 0; i < triggerPositionCount; ++i) {
                    const scrolledTriggerPosition = this.triggerPositions[i] - this.scrollPosition;
                    const distance = Math.abs(scrolledTriggerPosition - this.thresholdPosition);
                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        nearestTriggerIndex = i;
                        nearestScrolledTriggerPosition = scrolledTriggerPosition;
                    }
                }
                if (nearestTriggerIndex >= 0) {
                    let sectionIndex = -1;
                    if (nearestScrolledTriggerPosition > this.thresholdPosition) {
                        sectionIndex = nearestTriggerIndex;
                    }
                    else {
                        sectionIndex = nearestTriggerIndex + 1;
                    }
                    if (this.currentSectionIndex != sectionIndex) {
                        this.prevSectionIndex = this.currentSectionIndex;
                        this.currentSectionIndex = sectionIndex;
                        this.dispatchEvent(new browser.ScrollSectionTriggerEvent(browser.ScrollSectionTriggerEvent.change, this, this.currentSectionIndex, this.prevSectionIndex));
                    }
                }
            }
            updateThresholdPosition() {
                this.thresholdPosition = WinWatcher.getHeight() * this.thresholdRatio;
            }
            updateScrollPosition() {
                this.scrollPosition = WinWatcher.getScrollTop();
            }
        }
        browser.ScrollSectionTrigger = ScrollSectionTrigger;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var WinWatcher = alm.browser.WinWatcher;
        var WinWatcherEvent = alm.browser.WinWatcherEvent;
        var EventDispatcher = alm.event.EventDispatcher;
        class ResponsiveObserver extends EventDispatcher {
            constructor() {
                super();
                this.windowResizeHandler = (event) => {
                    this.check();
                };
                this.breakPoints = [];
                this.breakPointCount = 0;
                this.currentIndex = -1;
                this.prevIndex = -1;
            }
            start() {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                WinWatcher.addEventListener(WinWatcherEvent.resize, this.windowResizeHandler);
                WinWatcher.start();
                this.check();
            }
            stop() {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                WinWatcher.removeEventListener(WinWatcherEvent.resize, this.windowResizeHandler);
                WinWatcher.stop();
            }
            setBreakpoints(breakPoints) {
                this.breakPoints = breakPoints.concat();
                this.breakPointCount = this.breakPoints.length;
                this.breakPoints.sort((a, b) => { return a - b; });
                if (this.isRunning) {
                    this.check();
                }
            }
            getIsRunning() {
                return this.isRunning;
            }
            getCurrentIndex() {
                return this.currentIndex;
            }
            getPrevIndex() {
                return this.prevIndex;
            }
            getBreakPoints() {
                return this.breakPoints.concat();
            }
            getBreakPointCount() {
                return this.breakPointCount;
            }
            check() {
                const windowWidth = WinWatcher.getWidth();
                let index;
                for (index = 0; index < this.breakPointCount; ++index) {
                    if (windowWidth <= this.breakPoints[index]) {
                        break;
                    }
                }
                if (this.currentIndex == index)
                    return;
                this.prevIndex = this.currentIndex;
                this.currentIndex = index;
                trace('[ResponsiveObserver] switch index :', this.prevIndex, '->', this.currentIndex, ', window width =', windowWidth);
                this.dispatchEvent(new browser.ResponsiveObserverEvent(browser.ResponsiveObserverEvent.change, this, this.currentIndex, this.prevIndex));
            }
        }
        browser.ResponsiveObserver = ResponsiveObserver;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        class ResponsiveObserverEvent extends alm.event.Event {
            constructor(eventType, target, currentIndex, prevIndex) {
                super(eventType, target);
                this.currentIndex = currentIndex;
                this.prevIndex = prevIndex;
            }
        }
        ResponsiveObserverEvent.change = 'ResponsiveObserverEvent.change';
        browser.ResponsiveObserverEvent = ResponsiveObserverEvent;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var Num = alm.util.Num;
        class Kiosk {
            constructor() {
            }
            static disableInteraction() {
                if (this.isInteractionDisabled)
                    return;
                this.isInteractionDisabled = true;
                document.addEventListener('dblclick', Kiosk.doubleClickHandler, { passive: false });
                document.addEventListener('contextmenu', Kiosk.contextMenuHandler, { passive: false });
                document.documentElement.style.setProperty('touch-action', 'none');
                document.documentElement.style.setProperty('pointer-events', 'none');
                document.documentElement.style.setProperty('user-select', 'none');
                document.documentElement.style.setProperty('-webkit-user-select', 'none');
                document.documentElement.style.setProperty('overscroll-behavior', 'none');
                document.documentElement.style.setProperty('overflow', 'hidden');
                document.body.style.setProperty('touch-action', 'none');
                document.body.style.setProperty('pointer-events', 'none');
                document.body.style.setProperty('user-select', 'none');
                document.body.style.setProperty('-webkit-user-select', 'none');
                document.body.style.setProperty('overscroll-behavior', 'none');
                document.body.style.setProperty('overflow', 'hidden');
                document.body.style.setProperty('-webkit-touch-callout', 'none');
                document.body.style.setProperty('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');
            }
            static setStageSize(width, height) {
                this.width = width;
                this.height = height;
                this.aspectRatio = this.width / this.height;
                if (this.aspectRatio >= 1) {
                    this.normalizedByCoverWidth = this.aspectRatio;
                    this.normalizedByCoverHeight = 1;
                    this.normalizedByContainWidth = 1;
                    this.normalizedByContainHeight = 1 / this.aspectRatio;
                }
                else {
                    this.normalizedByCoverWidth = 1;
                    this.normalizedByCoverHeight = 1 / this.aspectRatio;
                    this.normalizedByContainWidth = this.aspectRatio;
                    this.normalizedByContainHeight = 1;
                }
            }
            static ratioX(xPixel, clamp = true) {
                const ratio = xPixel / Kiosk.width;
                return clamp ? Num.clamp(ratio, 0, 1) : ratio;
            }
            static ratioY(yPixel, clamp = true) {
                const ratio = yPixel / Kiosk.height;
                return clamp ? Num.clamp(ratio, 0, 1) : ratio;
            }
            static coverRatioX(xPixel, clamp = true) {
                return Kiosk.ratioX(xPixel, clamp) * Kiosk.normalizedByCoverWidth;
            }
            static coverRatioY(yPixel, clamp = true) {
                return Kiosk.ratioY(yPixel, clamp) * Kiosk.normalizedByCoverHeight;
            }
            static containRatioX(xPixel, clamp = true) {
                return Kiosk.ratioX(xPixel, clamp) * Kiosk.normalizedByContainWidth;
            }
            static containRatioY(yPixel, clamp = true) {
                return Kiosk.ratioY(yPixel, clamp) * Kiosk.normalizedByContainHeight;
            }
            static getWidth() { return this.width; }
            static getHeight() { return this.height; }
            static getAspectRatio() { return this.aspectRatio; }
            static getNormalizedByCoverWidth() { return this.normalizedByCoverWidth; }
            static getNormalizedByCoverHeight() { return this.normalizedByCoverHeight; }
            static getNormalizedByContainWidth() { return this.normalizedByContainWidth; }
            static getNormalizedByContainHeight() { return this.normalizedByContainHeight; }
        }
        Kiosk.doubleClickHandler = (event) => {
            event.preventDefault();
        };
        Kiosk.contextMenuHandler = (event) => {
            event.preventDefault();
        };
        Kiosk.isInteractionDisabled = false;
        Kiosk.width = 0;
        Kiosk.height = 0;
        Kiosk.aspectRatio = 0;
        Kiosk.normalizedByCoverWidth = 0;
        Kiosk.normalizedByCoverHeight = 0;
        Kiosk.normalizedByContainWidth = 0;
        Kiosk.normalizedByContainHeight = 0;
        browser.Kiosk = Kiosk;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var scn;
(function (scn) {
    var Logger = alm.debug.Logger;
    var EventDispatcher = alm.event.EventDispatcher;
    class Scene extends EventDispatcher {
        constructor(name) {
            super();
            this.name = name;
            this.state = scn.SceneState.idling;
            this.parent = null;
            this.childrenByName = {};
            this.numChildren = 0;
            this.transferInfo = null;
            this.onLoad = null;
            this.onUnload = null;
            this.onArrive = null;
            this.onLeave = null;
            this.onAscend = null;
            this.onDescend = null;
        }
        addChild(child) {
            if (child) {
                const childName = child.name;
                if (this.childrenByName[childName]) {
                    Logger.warn('[Scene \'' + this.name + '\'] addChild was failed, because child name \'' + childName + '\' is already contained.');
                }
                else {
                    ++this.numChildren;
                    child.parent = this;
                    this.childrenByName[childName] = child;
                    return child;
                }
            }
            else {
                Logger.warn('[Scene \'' + this.name + '\'] addChild was failed, because child is null.');
            }
            return null;
        }
        removeChild(child) {
            if (child) {
                const childName = child.name;
                if (this.childrenByName[childName]) {
                    --this.numChildren;
                    child.parent = null;
                    delete this.childrenByName[childName];
                    return child;
                }
                else {
                    Logger.warn('[Scene \'' + this.name + '\'] removeChild was failed, because child name \'' + childName + '\' is not contained.');
                }
            }
            else {
                Logger.warn('[Scene \'' + this.name + '\'] removeChild was failed, because child is null.');
            }
            return null;
        }
        addChildren(children) {
            const addedChildren = [];
            const n = children.length;
            let c;
            for (let i = 0; i < n; ++i) {
                c = this.addChild(children[i]);
                if (c) {
                    addedChildren.push(c);
                }
            }
            return addedChildren;
        }
        removeChildren(children) {
            const removedChildren = [];
            const n = children.length;
            let c;
            for (let i = 0; i < n; ++i) {
                c = this.removeChild(children[i]);
                if (c) {
                    removedChildren.push(c);
                }
            }
            return removedChildren;
        }
        removeAllChildren() {
            const children = [];
            let child;
            for (let name in this.childrenByName) {
                child = this.childrenByName[name];
                child.parent = null;
                children.push(child);
            }
            this.childrenByName = {};
            this.numChildren = 0;
            return children;
        }
        contains(child) {
            if (child) {
                return this.childrenByName[typeof child == 'string' ? child : child.name] != null;
            }
            else {
                return false;
            }
        }
        getName() {
            return this.name;
        }
        getState() {
            return this.state;
        }
        getLastState() {
            return this.lastState;
        }
        getParent() {
            return this.parent;
        }
        getChildByName(name) {
            return this.childrenByName[name] || null;
        }
        getChildrenByName() {
            return this.childrenByName;
        }
        getNumChildren() {
            return this.numChildren;
        }
        getManager() {
            if (this.parent) {
                return this.parent.getManager();
            }
            else {
                Logger.warn('[Scene \'' + this.name + '\'] getManager was failed, check whether if scene is connected to root.');
            }
            return null;
        }
        getPath() {
            const manager = this.getManager();
            if (manager) {
                const names = [this.name];
                let scene = this;
                while (scene = scene.parent) {
                    names.unshift(scene.name);
                }
                return manager.getScenePathByNames(names);
            }
            else {
                Logger.warn('[Scene \'' + this.name + '\'] getPath was failed, check whether if scene is connected to root.');
            }
            return null;
        }
        getTransferInfo() {
            return this.transferInfo || null;
        }
        gotoScene(path, message = null) {
            this.getManager().goto(path, message);
        }
        _load(transferInfo) {
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.loading;
            const command = new cmd.Serial(() => {
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.load, this));
                const c = typeof (this.onLoad) == 'function' ? this.onLoad() : this.implOnLoad();
                if (c)
                    command.insertCommand(c);
            }, () => {
                this.lastState = this.state;
                this.state = scn.SceneState.idling;
                this.transferInfo = null;
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.loadComplete, this));
            });
            command.execute();
        }
        _unload(transferInfo) {
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.unloading;
            const command = new cmd.Serial(() => {
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.unload, this));
                const c = typeof (this.onUnload) == 'function' ? this.onUnload() : this.implOnUnload();
                if (c)
                    command.insertCommand(c);
            }, () => {
                this.lastState = this.state;
                this.state = scn.SceneState.idling;
                this.transferInfo = null;
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.unloadComplete, this));
            });
            command.execute();
        }
        _arrive(transferInfo) {
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.arriving;
            const command = new cmd.Serial(() => {
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.arrive, this));
                const c = typeof (this.onArrive) == 'function' ? this.onArrive() : this.implOnArrive();
                if (c)
                    command.insertCommand(c);
            }, () => {
                this.lastState = this.state;
                this.state = scn.SceneState.idling;
                this.transferInfo = null;
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.arriveComplete, this));
            });
            command.execute();
        }
        _leave(transferInfo) {
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.leaving;
            const command = new cmd.Serial(() => {
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.leave, this));
                const c = typeof (this.onLeave) == 'function' ? this.onLeave() : this.implOnLeave();
                if (c)
                    command.insertCommand(c);
            }, () => {
                this.lastState = this.state;
                this.state = scn.SceneState.idling;
                this.transferInfo = null;
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.leaveComplete, this));
            });
            command.execute();
        }
        _ascend(transferInfo) {
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.ascending;
            const command = new cmd.Serial(() => {
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.ascend, this));
                const c = typeof (this.onAscend) == 'function' ? this.onAscend() : this.implOnAscend();
                if (c)
                    command.insertCommand(c);
            }, () => {
                this.lastState = this.state;
                this.state = scn.SceneState.idling;
                this.transferInfo = null;
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.ascendComplete, this));
            });
            command.execute();
        }
        _descend(transferInfo) {
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.descending;
            const command = new cmd.Serial(() => {
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.descend, this));
                const c = typeof (this.onDescend) == 'function' ? this.onDescend() : this.implOnDescend();
                if (c)
                    command.insertCommand(c);
            }, () => {
                this.lastState = this.state;
                this.state = scn.SceneState.idling;
                this.transferInfo = null;
                this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.descendComplete, this));
            });
            command.execute();
        }
        implOnLoad() {
            return new cmd.Command();
        }
        implOnUnload() {
            return new cmd.Command();
        }
        implOnArrive() {
            return new cmd.Command();
        }
        implOnLeave() {
            return new cmd.Command();
        }
        implOnAscend() {
            return new cmd.Command();
        }
        implOnDescend() {
            return new cmd.Command();
        }
    }
    scn.Scene = Scene;
})(scn || (scn = {}));
var scn;
(function (scn) {
    var Event = alm.event.Event;
    class SceneEvent extends Event {
        constructor(eventType, eventTarget) {
            super(eventType, eventTarget);
        }
        clone() {
            return new SceneEvent(this.type, this.target);
        }
        toString() {
            return '[SceneEvent] type = ' + this.type;
        }
    }
    SceneEvent.load = 'SceneEvent.load';
    SceneEvent.unload = 'SceneEvent.unload';
    SceneEvent.arrive = 'SceneEvent.arrive';
    SceneEvent.leave = 'SceneEvent.leave';
    SceneEvent.ascend = 'SceneEvent.ascend';
    SceneEvent.descend = 'SceneEvent.descend';
    SceneEvent.loadComplete = 'SceneEvent.loadComplete';
    SceneEvent.unloadComplete = 'SceneEvent.unloadComplete';
    SceneEvent.arriveComplete = 'SceneEvent.arriveComplete';
    SceneEvent.leaveComplete = 'SceneEvent.leaveComplete';
    SceneEvent.ascendComplete = 'SceneEvent.ascendComplete';
    SceneEvent.descendComplete = 'SceneEvent.descendComplete';
    scn.SceneEvent = SceneEvent;
})(scn || (scn = {}));
var scn;
(function (scn) {
    class SceneTransferInfo {
        constructor(transferId, departurePath, destinationPath, message = null) {
            this.transferId = transferId;
            this.departurePath = departurePath;
            this.destinationPath = destinationPath;
            this.message = message;
        }
        getTransferId() {
            return this.transferId;
        }
        getDeparturePath() {
            return this.departurePath;
        }
        getDestinationPath() {
            return this.destinationPath;
        }
    }
    scn.SceneTransferInfo = SceneTransferInfo;
})(scn || (scn = {}));
var scn;
(function (scn) {
    let SceneState;
    (function (SceneState) {
        SceneState[SceneState["idling"] = 0] = "idling";
        SceneState[SceneState["loading"] = 1] = "loading";
        SceneState[SceneState["unloading"] = 2] = "unloading";
        SceneState[SceneState["arriving"] = 3] = "arriving";
        SceneState[SceneState["leaving"] = 4] = "leaving";
        SceneState[SceneState["ascending"] = 5] = "ascending";
        SceneState[SceneState["descending"] = 6] = "descending";
    })(SceneState = scn.SceneState || (scn.SceneState = {}));
    function getSceneStateString(state) {
        switch (state) {
            case SceneState.idling:
                return 'idling';
            case SceneState.loading:
                return 'loading';
            case SceneState.unloading:
                return 'unloading';
            case SceneState.arriving:
                return 'arriving';
            case SceneState.leaving:
                return 'leaving';
            case SceneState.ascending:
                return 'ascending';
            case SceneState.descending:
                return 'descending';
        }
        return '';
    }
    scn.getSceneStateString = getSceneStateString;
})(scn || (scn = {}));
var scn;
(function (scn) {
    var core;
    (function (core) {
        let Direction;
        (function (Direction) {
            Direction[Direction["Static"] = 0] = "Static";
            Direction[Direction["Sibling"] = 1] = "Sibling";
            Direction[Direction["Ascend"] = 2] = "Ascend";
            Direction[Direction["Descend"] = 3] = "Descend";
        })(Direction = core.Direction || (core.Direction = {}));
        function getDirectionString(direction) {
            switch (direction) {
                case Direction.Static:
                    return 'static';
                case Direction.Sibling:
                    return 'sibling';
                case Direction.Ascend:
                    return 'ascend';
                case Direction.Descend:
                    return 'descend';
            }
            return '';
        }
        core.getDirectionString = getDirectionString;
    })(core = scn.core || (scn.core = {}));
})(scn || (scn = {}));
var scn;
(function (scn) {
    var core;
    (function (core) {
        class Waypoint {
            constructor(path, level) {
                this.path = path;
                this.level = level;
                this.from = core.Direction.Static;
                this.to = core.Direction.Static;
            }
            getPath() {
                return this.path;
            }
            getLevel() {
                return this.level;
            }
            getFrom() {
                return this.from;
            }
            getTo() {
                return this.to;
            }
            _setFrom(from) {
                this.from = from;
            }
            _setTo(to) {
                this.to = to;
            }
            toString() {
                return '[Waypoint] path = \'' + this.path + '\', level = ' + this.level + ', from = ' + core.getDirectionString(this.from) + ', to = ' + core.getDirectionString(this.to);
            }
        }
        core.Waypoint = Waypoint;
    })(core = scn.core || (scn.core = {}));
})(scn || (scn = {}));
var scn;
(function (scn) {
    var core;
    (function (core) {
        class RootScene extends scn.Scene {
            constructor(manager) {
                super('');
                this.manager = manager;
            }
            getManager() {
                return this.manager;
            }
        }
        core.RootScene = RootScene;
    })(core = scn.core || (scn.core = {}));
})(scn || (scn = {}));
var scn;
(function (scn) {
    var Logger = alm.debug.Logger;
    var LoggerLevel = alm.debug.LoggerLevel;
    var EventDispatcher = alm.event.EventDispatcher;
    var Obj = alm.util.Obj;
    var RootScene = scn.core.RootScene;
    class SceneManager extends EventDispatcher {
        constructor(name = '', rootSceneClass = RootScene) {
            super();
            this.sceneLoadCompleteHandler = (event) => {
                this.currentScene.removeEventListener(scn.SceneEvent.loadComplete, this.sceneLoadCompleteHandler);
                this.lastState = scn.SceneState.loading;
                ++this.eventIndex;
                this.checkState();
            };
            this.sceneUnloadCompleteHandler = (event) => {
                this.currentScene.removeEventListener(scn.SceneEvent.unloadComplete, this.sceneUnloadCompleteHandler);
                this.lastState = scn.SceneState.unloading;
                ++this.eventIndex;
                this.checkState();
            };
            this.sceneArriveCompleteHandler = (event) => {
                this.currentScene.removeEventListener(scn.SceneEvent.arriveComplete, this.sceneArriveCompleteHandler);
                this.lastState = scn.SceneState.arriving;
                ++this.eventIndex;
                this.checkState();
            };
            this.sceneLeaveCompleteHandler = (event) => {
                this.currentScene.removeEventListener(scn.SceneEvent.leaveComplete, this.sceneLeaveCompleteHandler);
                this.lastState = scn.SceneState.leaving;
                ++this.eventIndex;
                this.checkState();
            };
            this.sceneAscendCompleteHandler = (event) => {
                this.currentScene.removeEventListener(scn.SceneEvent.ascendComplete, this.sceneAscendCompleteHandler);
                this.lastState = scn.SceneState.ascending;
                ++this.eventIndex;
                this.checkState();
            };
            this.sceneDescendCompleteHandler = (event) => {
                this.currentScene.removeEventListener(scn.SceneEvent.descendComplete, this.sceneDescendCompleteHandler);
                this.lastState = scn.SceneState.descending;
                ++this.eventIndex;
                this.checkState();
            };
            this.name = name;
            this.root = new rootSceneClass(this);
            this.currentScene = null;
            this.waypoints = [];
            this.waypointIndex = -1;
            this.lastState = scn.SceneState.idling;
            this.eventIndex = -1;
            this.transferId = -1;
            this.transferInfo = null;
        }
        start(message = null) {
            Logger.verbose('----- scene manager start -----');
            this.goto('/', message);
        }
        goto(path, message = null) {
            path = this.resolvePath(path);
            if (this.transferInfo && this.transferInfo.getDestinationPath() == path) {
                return;
            }
            let newWaypoints = [];
            if (this.waypointIndex != -1) {
                newWaypoints = this.createWaypoints(this.waypoints[this.waypointIndex].getPath(), path);
            }
            else {
                newWaypoints = [new scn.core.Waypoint('/', 0)];
            }
            if (newWaypoints.length > 0) {
                const isDestinationChanged = this.transferInfo != null;
                if (!isDestinationChanged) {
                    this.waypointIndex = 0;
                    this.eventIndex = 0;
                    ++this.transferId;
                    this.waypoints = newWaypoints;
                }
                else {
                    Logger.verbose('destination is changed');
                    Logger.verbose('waypoint index : ' + this.waypointIndex);
                    this.waypoints = this.waypoints.slice(0, this.waypointIndex + 1).concat(newWaypoints.slice(1));
                    this.setDirection(this.waypoints);
                    this.dumpWaypoint(this.waypoints);
                }
                this.transferInfo = new scn.SceneTransferInfo(this.transferId, this.waypoints[this.waypointIndex].getPath(), this.waypoints[this.waypoints.length - 1].getPath(), message);
                if (!isDestinationChanged) {
                    this.dispatchEvent(new scn.SceneManagerTransferEvent(scn.SceneManagerTransferEvent.transferStart, this, this.transferInfo));
                }
                this.checkState();
            }
        }
        resolvePath(path) {
            if (path[0] != '/') {
                if (this.currentScene) {
                    path = this.currentScene.getPath() + '/' + path;
                }
                else {
                    path = '/' + path;
                }
            }
            const names = path.split('/');
            const normalized = [];
            for (let i = 0; i < names.length; ++i) {
                const name = names[i];
                if (name == '')
                    continue;
                if (name == '.')
                    continue;
                if (name == '..') {
                    normalized.pop();
                    continue;
                }
                normalized.push(name);
            }
            return '/' + normalized.join('/');
        }
        addSceneAt(path) {
            let success = false;
            const names = this.getSceneNamesByPath(path);
            const n = names.length;
            let scene = this.root;
            for (let i = 1; i < n; ++i) {
                const name = names[i];
                if (i == n - 1) {
                    if (scene.contains(name)) {
                        Logger.warn('[SceneManager \'' + this.name + '\'] addSceneAt was failed, because path \'' + path + '\' is already exist.');
                    }
                    else {
                        scene = scene.addChild(new scn.Scene(name));
                        success = true;
                    }
                }
                else {
                    if (scene.contains(name)) {
                        scene = scene.getChildByName(name);
                    }
                    else {
                        scene = scene.addChild(new scn.Scene(name));
                    }
                }
            }
            return success ? scene : null;
        }
        getName() {
            return this.name;
        }
        getRoot() {
            return this.root;
        }
        getSceneByPath(path) {
            return this.getSceneBySceneNames(this.getSceneNamesByPath(path));
        }
        getParentSceneByPath(path) {
            const names = this.getSceneNamesByPath(path);
            names.pop();
            return this.getSceneBySceneNames(names);
        }
        getSceneBySceneNames(names) {
            const n = names.length;
            let scene = this.root;
            for (let i = 1; i < n; ++i) {
                scene = scene.getChildByName(names[i]);
            }
            return scene;
        }
        getSceneNamesByPath(path) {
            return path == '/' ? [''] : this.resolvePath(path).split('/');
        }
        getSceneLevelByNames(names) {
            return names.length - 1;
        }
        getScenePathByNames(names) {
            return names.length == 0 ? '/' : names.length == 1 ? ('/' + names[0]) : names.join('/');
        }
        createWaypoints(departurePath, destinationPath) {
            if (departurePath == destinationPath) {
                Logger.warn('[SceneManager] departure path and destination path is same, path = \'' + departurePath + '\'');
                return [];
            }
            Logger.verbose('----- scene flow -----');
            const waypoints = [
                new scn.core.Waypoint(departurePath, this.getSceneLevelByNames(this.getSceneNamesByPath(departurePath)))
            ];
            const departureNames = this.getSceneNamesByPath(departurePath);
            const destinationNames = this.getSceneNamesByPath(destinationPath);
            Logger.verbose('    path');
            Logger.verbose('        current    : \'' + departurePath + '\'');
            Logger.verbose('        destination: \'' + destinationPath + '\'');
            Logger.verbose('    names');
            Logger.verbose('        current(' + departureNames.length + ')    : \'' + departureNames + '\'');
            Logger.verbose('        destination(' + destinationNames.length + '): \'' + destinationNames + '\'');
            let turningLevel = 0;
            let turningNames = [];
            let turningPath;
            if (destinationPath == '/') {
                turningLevel = -1;
                turningNames = [];
                turningPath = '/';
            }
            else {
                while (true) {
                    if (departureNames[turningLevel] == destinationNames[turningLevel]) {
                        turningNames.push(departureNames[turningLevel]);
                        ++turningLevel;
                    }
                    else {
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
            {
                const names = departureNames.concat();
                let prevPath = departurePath;
                for (let i = departureNames.length - 1; i > turningLevel + 1; --i) {
                    names.pop();
                    const path = this.getScenePathByNames(names);
                    if (path != prevPath) {
                        const level = this.getSceneLevelByNames(names);
                        waypoints.push(new scn.core.Waypoint(path, level));
                        prevPath = path;
                    }
                }
            }
            if (turningPath == destinationPath && turningLevel > 0) {
                const from = turningLevel == waypoints[waypoints.length - 1].getLevel() ? scn.core.Direction.Sibling : scn.core.Direction.Ascend;
                waypoints.push(new scn.core.Waypoint(turningPath, turningLevel));
            }
            else {
                const names = turningNames.concat();
                const prev = waypoints[waypoints.length - 1];
                let prevPath = prev.getPath();
                let prevLevel = prev.getLevel();
                for (let i = turningLevel + 1; i < destinationNames.length; ++i) {
                    const name = destinationNames[i];
                    names.push(name);
                    const path = this.getScenePathByNames(names);
                    if (path != prevPath) {
                        const level = this.getSceneLevelByNames(names);
                        waypoints.push(new scn.core.Waypoint(path, level));
                        prevLevel = level;
                        prevPath = path;
                    }
                }
            }
            this.setDirection(waypoints);
            if (Logger.level <= LoggerLevel.verbose) {
                this.dumpWaypoint(waypoints);
            }
            return waypoints;
        }
        setDirection(waypoints) {
            const n = waypoints.length;
            let prev = null;
            let point;
            for (let i = 0; i < n; ++i) {
                point = waypoints[i];
                if (i > 0) {
                    const d = point.getLevel() - prev.getLevel();
                    point._setFrom(d > 0 ? scn.core.Direction.Descend : d < 0 ? scn.core.Direction.Ascend : scn.core.Direction.Sibling);
                    prev._setTo(point.getFrom());
                }
                prev = point;
            }
        }
        dumpWaypoint(waypoints) {
            Logger.verbose('    waypoints');
            const n = waypoints.length;
            for (let i = 0; i < n; ++i) {
                Logger.verbose('        [' + i + '] ' + waypoints[i]);
            }
            Logger.verbose('');
        }
        dumpAllPath() {
            Logger.info('----- scene all path -----');
            this._dumpAllPath(this.root);
        }
        _dumpAllPath(parent) {
            const children = parent.getChildrenByName();
            Obj.each(children, (name, child) => {
                Logger.info(child.getPath());
                this._dumpAllPath(child);
            });
        }
        checkState() {
            if (this.waypointIndex >= this.waypoints.length) {
                Logger.verbose('----- scene transfer complete -----');
                const tmpTransferId = this.transferInfo.getTransferId();
                this.waypointIndex = this.waypoints.length - 1;
                this.dispatchEvent(new scn.SceneManagerTransferEvent(scn.SceneManagerTransferEvent.transferComplete, this, this.transferInfo));
                if (tmpTransferId == this.transferInfo.getTransferId()) {
                    this.lastState = scn.SceneState.idling;
                    this.transferInfo = null;
                }
                return;
            }
            if (this.currentScene) {
                const currentWaypoint = this.waypoints[this.waypointIndex];
                const currentWaypointPath = currentWaypoint.getPath();
                this.currentScene = this.getSceneByPath(currentWaypointPath);
                if (!this.currentScene) {
                    this.dispatchEvent(new scn.SceneManagerRequireSceneEvent(scn.SceneManagerRequireSceneEvent.requireScene, this, currentWaypointPath));
                    this.currentScene = this.getSceneByPath(currentWaypointPath);
                }
                if (!this.currentScene) {
                    Logger.warn('[SceneManager] scene is null : scene path =', currentWaypointPath);
                }
                if (this.waypoints.length > 1 && this.waypointIndex == 0) {
                    if (this.lastState != scn.SceneState.leaving && this.currentScene.getLastState() == scn.SceneState.arriving) {
                        Logger.verbose(this.eventIndex + ' Leave   : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.leaveComplete, this.sceneLeaveCompleteHandler);
                        this.currentScene._leave(this.transferInfo);
                        return;
                    }
                    if (this.lastState != scn.SceneState.unloading && (currentWaypoint.getTo() == scn.core.Direction.Sibling || currentWaypoint.getTo() == scn.core.Direction.Ascend)) {
                        ++this.waypointIndex;
                        Logger.verbose(this.eventIndex + ' Unload  : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.unloadComplete, this.sceneUnloadCompleteHandler);
                        this.currentScene._unload(this.transferInfo);
                        return;
                    }
                    else {
                        ++this.waypointIndex;
                        this.checkState();
                        return;
                    }
                }
                if (this.waypointIndex > 0 && this.waypointIndex < this.waypoints.length - 1) {
                    if (this.lastState != scn.SceneState.loading && (currentWaypoint.getFrom() == scn.core.Direction.Sibling || currentWaypoint.getFrom() == scn.core.Direction.Descend)) {
                        Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.loadComplete, this.sceneLoadCompleteHandler);
                        this.currentScene._load(this.transferInfo);
                        return;
                    }
                    if (this.lastState != scn.SceneState.ascending && currentWaypoint.getFrom() == scn.core.Direction.Ascend) {
                        Logger.verbose(this.eventIndex + ' Ascend  : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.ascendComplete, this.sceneAscendCompleteHandler);
                        this.currentScene._ascend(this.transferInfo);
                        return;
                    }
                    if (this.lastState != scn.SceneState.unloading && (currentWaypoint.getTo() == scn.core.Direction.Sibling || currentWaypoint.getTo() == scn.core.Direction.Ascend)) {
                        ++this.waypointIndex;
                        Logger.verbose(this.eventIndex + ' Unload  : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.unloadComplete, this.sceneUnloadCompleteHandler);
                        this.currentScene._unload(this.transferInfo);
                        return;
                    }
                    if (this.lastState != scn.SceneState.descending && currentWaypoint.getTo() == scn.core.Direction.Descend) {
                        ++this.waypointIndex;
                        Logger.verbose(this.eventIndex + ' Descend : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.descendComplete, this.sceneDescendCompleteHandler);
                        this.currentScene._descend(this.transferInfo);
                        return;
                    }
                }
                if (this.waypointIndex == this.waypoints.length - 1) {
                    if (this.lastState != scn.SceneState.loading && (currentWaypoint.getFrom() == scn.core.Direction.Sibling || currentWaypoint.getFrom() == scn.core.Direction.Descend)) {
                        Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.loadComplete, this.sceneLoadCompleteHandler);
                        this.currentScene._load(this.transferInfo);
                        return;
                    }
                    if (this.lastState != scn.SceneState.arriving) {
                        ++this.waypointIndex;
                        Logger.verbose(this.eventIndex + ' Arrive  : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.arriveComplete, this.sceneArriveCompleteHandler);
                        this.currentScene._arrive(this.transferInfo);
                        return;
                    }
                }
            }
            else {
                this.lastState = scn.SceneState.idling;
                this.currentScene = this.root;
                Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
                this.currentScene.addEventListener(scn.SceneEvent.loadComplete, this.sceneLoadCompleteHandler);
                this.currentScene._load(this.transferInfo);
            }
        }
    }
    scn.SceneManager = SceneManager;
})(scn || (scn = {}));
var scn;
(function (scn) {
    var Event = alm.event.Event;
    class SceneManagerTransferEvent extends Event {
        constructor(eventType, eventTarget, transferInfo) {
            super(eventType, eventTarget);
            this.transferInfo = transferInfo;
        }
        clone() {
            return new SceneManagerTransferEvent(this.type, this.target, this.transferInfo);
        }
        toString() {
            return '[SceneManagerTransferEvent] type = ' + this.type;
        }
    }
    SceneManagerTransferEvent.transferStart = 'SceneManagerTransferEvent.transferStart';
    SceneManagerTransferEvent.transferComplete = 'SceneManagerTransferEvent.transferComplete';
    scn.SceneManagerTransferEvent = SceneManagerTransferEvent;
})(scn || (scn = {}));
var scn;
(function (scn) {
    var Event = alm.event.Event;
    class SceneManagerRequireSceneEvent extends Event {
        constructor(eventType, eventTarget, scenePath) {
            super(eventType, eventTarget);
            this.scenePath = scenePath;
        }
        clone() {
            return new SceneManagerRequireSceneEvent(this.type, this.target, this.scenePath);
        }
        toString() {
            return '[SceneManagerRequireSceneEvent] type = ' + this.type + ', scenePath = ' + this.scenePath;
        }
    }
    SceneManagerRequireSceneEvent.requireScene = 'SceneManagerRequireSceneEvent.requireScene';
    scn.SceneManagerRequireSceneEvent = SceneManagerRequireSceneEvent;
})(scn || (scn = {}));
var alm;
(function (alm) {
    function getVersion() {
        return '0.0.1';
    }
    alm.getVersion = getVersion;
    const style = 'color:#999;';
    const print = console.debug;
    print('%c+ + + + + + + + + + + + + + + + + + + + + + + + + +', style);
    print('%c+ alumican.js', style);
    print('%c+ version ' + getVersion(), style);
    print('%c+ http://alumican.net', style);
    print('%c+ https://github.com/alumican/alumican.js', style);
    print('%c+ + + + + + + + + + + + + + + + + + + + + + + + + +', style);
    print('');
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
