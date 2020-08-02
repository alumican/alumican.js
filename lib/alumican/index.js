var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Time = (function () {
            function Time() {
            }
            Time.now = function () {
                return (window.performance || Date).now();
            };
            return Time;
        }());
        util.Time = Time;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        var Easing = (function () {
            function Easing() {
            }
            Easing.linear = function (t) {
                return t;
            };
            Easing.easeInQuad = function (t) {
                return (t /= 1) * t;
            };
            Easing.easeOutQuad = function (t) {
                return -(t /= 1) * (t - 2);
            };
            Easing.easeInOutQuad = function (t) {
                if ((t /= 0.5) < 1)
                    return 0.5 * t * t;
                return -0.5 * ((--t) * (t - 2) - 1);
            };
            Easing.easeInCubic = function (t) {
                return (t /= 1) * t * t;
            };
            Easing.easeOutCubic = function (t) {
                return (t = t - 1) * t * t + 1;
            };
            Easing.easeInOutCubic = function (t) {
                if ((t /= 0.5) < 1)
                    return 0.5 * t * t * t;
                return 0.5 * ((t -= 2) * t * t + 2);
            };
            Easing.easeInQuart = function (t) {
                return (t /= 1) * t * t * t;
            };
            Easing.easeOutQuart = function (t) {
                return -((t = t - 1) * t * t * t - 1);
            };
            Easing.easeInOutQuart = function (t) {
                if ((t /= 0.5) < 1)
                    return 0.5 * t * t * t * t;
                return -0.5 * ((t -= 2) * t * t * t - 2);
            };
            Easing.easeInQuint = function (t) {
                return (t /= 1) * t * t * t * t;
            };
            Easing.easeOutQuint = function (t) {
                return ((t = t - 1) * t * t * t * t + 1);
            };
            Easing.easeInOutQuint = function (t) {
                if ((t /= 0.5) < 1)
                    return 0.5 * t * t * t * t * t;
                return 0.5 * ((t -= 2) * t * t * t * t + 2);
            };
            Easing.easeInSine = function (t) {
                return -Math.cos(t * (Math.PI / 2)) + 1;
            };
            Easing.easeOutSine = function (t) {
                return Math.sin(t * (Math.PI / 2));
            };
            Easing.easeInOutSine = function (t) {
                return -0.5 * (Math.cos(Math.PI * t) - 1);
            };
            Easing.easeInExpo = function (t) {
                if (t == 0)
                    return 0;
                return Math.pow(2, 10 * (t - 1));
            };
            Easing.easeOutExpo = function (t) {
                if (t == 1)
                    return 1;
                return -Math.pow(2, -10 * t) + 1;
            };
            Easing.easeInOutExpo = function (t) {
                if (t == 0)
                    return 0;
                if (t == 1)
                    return 1;
                if ((t /= 0.5) < 1)
                    return 0.5 * Math.pow(2, 10 * (t - 1));
                return 0.5 * (-Math.pow(2, -10 * --t) + 2);
            };
            Easing.easeInCirc = function (t) {
                return -(Math.sqrt(1 - (t /= 1) * t) - 1);
            };
            Easing.easeOutCirc = function (t) {
                return Math.sqrt(1 - (t = t - 1) * t);
            };
            Easing.easeInOutCirc = function (t) {
                if ((t /= 0.5) < 1)
                    return -0.5 * (Math.sqrt(1 - t * t) - 1);
                return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            };
            Easing.createEaseInElastic = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t) {
                    var p = 0;
                    var a = 1;
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
            };
            Easing.createEaseOutElastic = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t) {
                    var p = 0;
                    var a = 1;
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
            };
            Easing.createEaseInOutElastic = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t) {
                    var p = 0;
                    var a = 1;
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
            };
            Easing.easeInElastic = function (t) {
                return Easing.defaultEaseInElastic(t);
            };
            Easing.easeOutElastic = function (t) {
                return Easing.defaultEaseOutElastic(t);
            };
            Easing.easeInOutElastic = function (t) {
                return Easing.defaultEaseInOutElastic(t);
            };
            Easing.createEaseInBack = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t) {
                    return (t /= 1) * t * ((s + 1) * t - s);
                };
            };
            Easing.createEaseOutBack = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t) {
                    return (t = t - 1) * t * ((s + 1) * t + s) + 1;
                };
            };
            Easing.createEaseInOutBack = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t) {
                    if ((t /= 0.5) < 1)
                        return 0.5 * t * t * (((s *= 1.525) + 1) * t - s);
                    return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
                };
            };
            Easing.easeInBack = function (t) {
                return Easing.defaultEaseInElastic(t);
            };
            Easing.easeOutBack = function (t) {
                return Easing.defaultEaseOutBack(t);
            };
            Easing.easeInOutBack = function (t) {
                return Easing.defaultEaseInOutBack(t);
            };
            Easing.easeInBounce = function (t) {
                return 1 - Easing.easeOutBounce(1 - t);
            };
            Easing.easeOutBounce = function (t) {
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
            };
            Easing.easeInOutBounce = function (t) {
                if (t < 0.5)
                    return Easing.easeInBounce(t * 2) * 0.5;
                return Easing.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
            };
            Easing.defaultEaseInElastic = Easing.createEaseInElastic();
            Easing.defaultEaseOutElastic = Easing.createEaseOutElastic();
            Easing.defaultEaseInOutElastic = Easing.createEaseInOutElastic();
            Easing.defaultEaseInBack = Easing.createEaseInBack();
            Easing.defaultEaseOutBack = Easing.createEaseOutBack();
            Easing.defaultEaseInOutBack = Easing.createEaseInOutBack();
            return Easing;
        }());
        math.Easing = Easing;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var QueryString = (function () {
            function QueryString(url) {
                if (url === void 0) { url = ''; }
                this.set(url);
            }
            QueryString.prototype.set = function (url) {
                if (url === void 0) { url = ''; }
                var search = '';
                if (url != '') {
                    var index = url.indexOf('?');
                    if (index != -1) {
                        search = url.substring(index);
                    }
                }
                else {
                    search = location.search;
                }
                this.hash = {};
                var pairs = search.substring(1).split('&');
                var pair;
                for (var i = 0; pairs[i]; ++i) {
                    pair = pairs[i].split('=');
                    this.hash[pair[0]] = pair[1];
                }
            };
            QueryString.prototype.getString = function (key, defaultValue) {
                var value = this.hash[key];
                return value === undefined ? defaultValue : value;
            };
            QueryString.prototype.getInt = function (key, defaultValue) {
                var value = parseInt(this.hash[key]);
                return isNaN(value) ? defaultValue : value;
            };
            QueryString.prototype.getFloat = function (key, defaultValue) {
                var value = parseFloat(this.hash[key]);
                return isNaN(value) ? defaultValue : value;
            };
            QueryString.prototype.getBool = function (key, defaultValue) {
                var value = this.hash[key];
                return value === undefined ? defaultValue : (value == true);
            };
            QueryString.prototype.getHash = function () {
                return this.hash;
            };
            QueryString.prototype.setHash = function (hash) {
                this.hash = hash;
            };
            QueryString.prototype.setParam = function (key, value) {
                this.hash[key] = value;
            };
            QueryString.prototype.removeParam = function (key) {
                delete this.hash[key];
            };
            QueryString.prototype.hasParam = function (key) {
                return this.hash[key] !== undefined;
            };
            return QueryString;
        }());
        browser.QueryString = QueryString;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var debug;
    (function (debug) {
        var QueryString = alm.browser.QueryString;
        var LoggerLevel;
        (function (LoggerLevel) {
            LoggerLevel[LoggerLevel["Verbose"] = 0] = "Verbose";
            LoggerLevel[LoggerLevel["Info"] = 1] = "Info";
            LoggerLevel[LoggerLevel["Warn"] = 2] = "Warn";
            LoggerLevel[LoggerLevel["Error"] = 3] = "Error";
            LoggerLevel[LoggerLevel["Silent"] = 4] = "Silent";
        })(LoggerLevel = debug.LoggerLevel || (debug.LoggerLevel = {}));
        var NullLogging = (function () {
            function NullLogging() {
            }
            NullLogging.prototype.verbose = function (prefix, messages) {
            };
            NullLogging.prototype.info = function (prefix, messages) {
            };
            NullLogging.prototype.warn = function (prefix, messages) {
            };
            NullLogging.prototype.error = function (prefix, messages) {
            };
            return NullLogging;
        }());
        debug.NullLogging = NullLogging;
        var ConsoleLogging = (function () {
            function ConsoleLogging() {
            }
            ConsoleLogging.prototype.verbose = function (prefix, messages) {
                console.debug.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
            };
            ConsoleLogging.prototype.info = function (prefix, messages) {
                console.log.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
            };
            ConsoleLogging.prototype.warn = function (prefix, messages) {
                console.warn.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
            };
            ConsoleLogging.prototype.error = function (prefix, messages) {
                console.error.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
            };
            return ConsoleLogging;
        }());
        debug.ConsoleLogging = ConsoleLogging;
        var DOMLogging = (function () {
            function DOMLogging(dom, html) {
                this.dom = dom;
                this.html = html;
            }
            DOMLogging.prototype.verbose = function (prefix, messages) {
                this.print(prefix, messages);
            };
            DOMLogging.prototype.info = function (prefix, messages) {
                this.print(prefix, messages);
            };
            DOMLogging.prototype.warn = function (prefix, messages) {
                this.print(prefix, messages);
            };
            DOMLogging.prototype.error = function (prefix, messages) {
                this.print(prefix, messages);
            };
            DOMLogging.prototype.print = function (prefix, messages) {
                var line = prefix + messages.join(', ');
                if (this.html) {
                    this.dom.innerHTML = line + '<br>\n' + this.dom.innerHTML;
                }
                else {
                    this.dom.innerText = line + '\n' + this.dom.innerText;
                }
            };
            return DOMLogging;
        }());
        debug.DOMLogging = DOMLogging;
        var ParallelLogging = (function () {
            function ParallelLogging(loggers) {
                this.loggers = loggers;
            }
            ParallelLogging.prototype.verbose = function (prefix, messages) {
                var n = this.loggers.length;
                for (var i = 0; i < n; ++i) {
                    this.loggers[i].verbose(prefix, messages);
                }
            };
            ParallelLogging.prototype.info = function (prefix, messages) {
                var n = this.loggers.length;
                for (var i = 0; i < n; ++i) {
                    this.loggers[i].info(prefix, messages);
                }
            };
            ParallelLogging.prototype.warn = function (prefix, messages) {
                var n = this.loggers.length;
                for (var i = 0; i < n; ++i) {
                    this.loggers[i].warn(prefix, messages);
                }
            };
            ParallelLogging.prototype.error = function (prefix, messages) {
                var n = this.loggers.length;
                for (var i = 0; i < n; ++i) {
                    this.loggers[i].error(prefix, messages);
                }
            };
            return ParallelLogging;
        }());
        debug.ParallelLogging = ParallelLogging;
        var Logger = (function () {
            function Logger() {
            }
            Logger.setLevelByQuery = function (key) {
                var level = new QueryString().getInt(key, LoggerLevel.Silent);
                Logger.level = isNaN(level) ? LoggerLevel.Silent : level;
            };
            Logger.setNamespace = function (namespace) {
                Logger.namespace = namespace != '' ? (namespace + '#') : '';
            };
            Logger.verbose = function () {
                var messages = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    messages[_i] = arguments[_i];
                }
                if (Logger.level <= LoggerLevel.Verbose) {
                    Logger.logger.verbose('[' + Logger.namespace + 'Verbose] ', messages);
                }
            };
            Logger.info = function () {
                var messages = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    messages[_i] = arguments[_i];
                }
                if (Logger.level <= LoggerLevel.Info) {
                    Logger.logger.info('[' + Logger.namespace + 'Info   ] ', messages);
                }
            };
            Logger.warn = function () {
                var messages = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    messages[_i] = arguments[_i];
                }
                if (Logger.level <= LoggerLevel.Warn) {
                    Logger.logger.warn('[' + Logger.namespace + 'Warn   ] ', messages);
                }
            };
            Logger.error = function () {
                var messages = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    messages[_i] = arguments[_i];
                }
                if (Logger.level <= LoggerLevel.Error) {
                    Logger.logger.error('[' + Logger.namespace + 'Error  ] ', messages);
                }
            };
            Logger.warnIf = function (target, message, condition) {
                if (condition === void 0) { condition = true; }
                if (Logger.level <= LoggerLevel.Warn && condition) {
                    Logger.logger.warn('[' + Logger.namespace + 'Warn   ] ', [message + ' : ' + target]);
                }
            };
            Logger.errorIf = function (target, message, condition) {
                if (condition === void 0) { condition = true; }
                if (Logger.level <= LoggerLevel.Error && condition) {
                    Logger.logger.error('[' + Logger.namespace + 'Error  ] ', [message + ' : ' + target]);
                }
            };
            Logger.stackTrace = function () {
                console.trace();
            };
            Logger.level = LoggerLevel.Verbose;
            Logger.logger = new ConsoleLogging();
            Logger.namespace = '';
            return Logger;
        }());
        debug.Logger = Logger;
    })(debug = alm.debug || (alm.debug = {}));
})(alm || (alm = {}));
function trace() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    alm.debug.Logger.info.apply(trace.caller, arguments);
}
function throwWarn(target, message, condition) {
    if (condition === void 0) { condition = true; }
    alm.debug.Logger.warnIf.apply(null, arguments);
}
function throwError(target, message, condition) {
    if (condition === void 0) { condition = true; }
    alm.debug.Logger.errorIf.apply(null, arguments);
}
var alm;
(function (alm) {
    var debug;
    (function (debug) {
        var Time = alm.util.Time;
        var FpsMonitor = (function () {
            function FpsMonitor() {
                this.reset();
            }
            FpsMonitor.prototype.reset = function () {
                this.frameRate = 0;
                this.frameCount = 0;
                this.startTime = Time.now();
                this.actualFrameRate = -1;
                this.dummyFrameRate = -1;
            };
            FpsMonitor.prototype.update = function () {
                ++this.frameCount;
                var currentTime = Time.now();
                var elapsedTime = currentTime - this.startTime;
                if (elapsedTime >= 1000) {
                    this.actualFrameRate = 1000 * this.frameCount / elapsedTime;
                    this.frameCount = 0;
                    this.startTime = currentTime;
                    if (this.dummyFrameRate < 0) {
                        this.frameRate = this.actualFrameRate;
                    }
                }
            };
            FpsMonitor.prototype.setDummyFrameRate = function (frameRate) {
                this.dummyFrameRate = frameRate;
                this.frameRate = this.dummyFrameRate;
            };
            FpsMonitor.prototype.clearDummyFrameRate = function () {
                this.dummyFrameRate = -1;
                this.frameRate = this.actualFrameRate;
            };
            FpsMonitor.prototype.getFrameRate = function () {
                return this.frameRate;
            };
            return FpsMonitor;
        }());
        debug.FpsMonitor = FpsMonitor;
    })(debug = alm.debug || (alm.debug = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var event;
    (function (event) {
        var Event = (function () {
            function Event(type, target, data) {
                if (data === void 0) { data = null; }
                this.type = type;
                this.target = target;
                this.data = data;
            }
            return Event;
        }());
        event.Event = Event;
    })(event = alm.event || (alm.event = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var event;
    (function (event_1) {
        var Logger = alm.debug.Logger;
        var EventDispatcher = (function () {
            function EventDispatcher(target) {
                if (target === void 0) { target = null; }
                this.target = target || this;
                this.listeners = {};
            }
            EventDispatcher.prototype.addEventListener = function (eventType, listener) {
                if (typeof (listener) != 'function') {
                    Logger.warn('[EventDispatcher] addEventListener : listener is not function, eventType = \'' + eventType + '\', listener = ' + listener);
                    return;
                }
                var listeners = this.listeners[eventType];
                if (listeners) {
                    var numListeners = listeners.length;
                    for (var i = 0; i < numListeners; ++i) {
                        if (listener == listeners[i])
                            return;
                    }
                }
                else {
                    this.listeners[eventType] = listeners = [];
                }
                listeners.push(listener);
            };
            EventDispatcher.prototype.removeEventListener = function (eventType, listener) {
                if (typeof (listener) != 'function') {
                    Logger.warn('[EventDispatcher] removeEventListener : listener is not function, eventType = \'' + eventType + '\', listener = ' + listener);
                    return;
                }
                var listeners = this.listeners[eventType];
                if (listeners) {
                    var numListeners = listeners.length;
                    for (var i = 0; i < numListeners; ++i) {
                        if (listener == listeners[i]) {
                            listeners.splice(i, 1);
                            break;
                        }
                    }
                    if (listeners.length == 0) {
                        delete this.listeners[eventType];
                    }
                }
            };
            EventDispatcher.prototype.removeAllEventListener = function (eventType) {
                if (eventType === void 0) { eventType = null; }
                if (eventType) {
                    delete this.listeners[eventType];
                }
                else {
                    this.listeners = {};
                }
            };
            EventDispatcher.prototype.hasEventListener = function (eventType) {
                return this.listeners[eventType] != null;
            };
            EventDispatcher.prototype.dispatchEvent = function (event) {
                var listeners = this.listeners[event.type];
                if (listeners) {
                    var numListeners = listeners.length;
                    for (var i = 0; i < numListeners; ++i) {
                        listeners[i].call(this.target, event);
                    }
                }
            };
            EventDispatcher.prototype.dispatchEventType = function (eventType, eventTarget, data) {
                if (eventTarget === void 0) { eventTarget = null; }
                if (data === void 0) { data = null; }
                this.dispatchEvent(new event_1.Event(eventType, eventTarget, data));
            };
            return EventDispatcher;
        }());
        event_1.EventDispatcher = EventDispatcher;
    })(event = alm.event || (alm.event = {}));
})(alm || (alm = {}));
var cmd;
(function (cmd) {
    var CommandState;
    (function (CommandState) {
        CommandState[CommandState["Sleeping"] = 0] = "Sleeping";
        CommandState[CommandState["Executing"] = 1] = "Executing";
        CommandState[CommandState["Interrupting"] = 2] = "Interrupting";
    })(CommandState = cmd.CommandState || (cmd.CommandState = {}));
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Event = alm.event.Event;
    var CommandEvent = (function (_super) {
        __extends(CommandEvent, _super);
        function CommandEvent(eventType, eventTarget) {
            return _super.call(this, eventType, eventTarget) || this;
        }
        CommandEvent.prototype.clone = function () {
            return new CommandEvent(this.type, this.target);
        };
        CommandEvent.prototype.toString = function () {
            return '[CommandEvent] type = ' + this.type;
        };
        CommandEvent.COMPLETE = 'complete';
        return CommandEvent;
    }(Event));
    cmd.CommandEvent = CommandEvent;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var EventDispatcher = alm.event.EventDispatcher;
    var Command = (function (_super) {
        __extends(Command, _super);
        function Command(executeFunction, interruptFunction, destroyFunction) {
            if (executeFunction === void 0) { executeFunction = null; }
            if (interruptFunction === void 0) { interruptFunction = null; }
            if (destroyFunction === void 0) { destroyFunction = null; }
            var _this = _super.call(this) || this;
            _this.setExecuteFunction(executeFunction);
            _this.setInterruptFunction(interruptFunction);
            _this.setDestroyFunction(destroyFunction);
            _this.state = cmd.CommandState.Sleeping;
            _this.self = _this;
            _this.parent = null;
            return _this;
        }
        Command.prototype.execute = function () {
            if (this.state > cmd.CommandState.Sleeping) {
                throw new Error('[Command.execute] + Command is already executing.');
            }
            this.state = cmd.CommandState.Executing;
            this.getExecuteFunction().call(this, this);
        };
        Command.prototype.interrupt = function () {
            if (this.state == cmd.CommandState.Executing) {
                this.state = cmd.CommandState.Interrupting;
                this.getInterruptFunction().call(this, this);
            }
        };
        Command.prototype.destroy = function () {
            this.state = cmd.CommandState.Sleeping;
            this.getDestroyFunction().call(this, this);
            this.parent = null;
            this.executeFunction = null;
            this.interruptFunction = null;
            this.destroyFunction = null;
        };
        Command.prototype.notifyComplete = function () {
            switch (this.state) {
                case cmd.CommandState.Sleeping:
                    break;
                case cmd.CommandState.Executing:
                    this.dispatchEvent(new cmd.CommandEvent(cmd.CommandEvent.COMPLETE, this));
                    this.destroy();
                    break;
                case cmd.CommandState.Interrupting:
                    this.dispatchEvent(new cmd.CommandEvent(cmd.CommandEvent.COMPLETE, this));
                    this.destroy();
                    break;
            }
        };
        Command.prototype.implExecuteFunction = function (command) {
            this.notifyComplete();
        };
        Command.prototype.implInterruptFunction = function (command) {
        };
        Command.prototype.implDestroyFunction = function (command) {
        };
        Command.prototype.getExecuteFunction = function () { return this.executeFunction || this.implExecuteFunction; };
        ;
        Command.prototype.setExecuteFunction = function (func) { this.executeFunction = func; };
        Command.prototype.getInterruptFunction = function () { return this.interruptFunction || this.implInterruptFunction; };
        ;
        Command.prototype.setInterruptFunction = function (func) { this.interruptFunction = func; };
        Command.prototype.getDestroyFunction = function () { return this.destroyFunction || this.implDestroyFunction; };
        ;
        Command.prototype.setDestroyFunction = function (func) { this.destroyFunction = func; };
        Command.prototype.getState = function () { return this.state; };
        Command.prototype.getParent = function () { return this.parent; };
        Command.prototype.setParent = function (parent) { this.parent = parent; };
        Command.prototype.getSelf = function () { return this.self; };
        return Command;
    }(EventDispatcher));
    cmd.Command = Command;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var CommandList = (function (_super) {
        __extends(CommandList, _super);
        function CommandList() {
            var commands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                commands[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this.commands = [];
            _this.addCommand.apply(_this, commands);
            return _this;
        }
        CommandList.prototype.addCommand = function () {
            var commands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                commands[_i] = arguments[_i];
            }
            if (commands.length > 0) {
                this.preProcess(commands);
                this.commands = this.getCommands().concat(commands);
            }
        };
        CommandList.prototype.insertCommand = function () {
            var commands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                commands[_i] = arguments[_i];
            }
            this.insertCommandAt.apply(this, __spreadArrays([0], commands));
        };
        CommandList.prototype.insertCommandAt = function (index) {
            var commands = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                commands[_i - 1] = arguments[_i];
            }
            if (commands.length > 0) {
                this.preProcess(commands);
                Array.prototype.splice.apply(this.getCommands(), [index, 0].concat(commands));
            }
        };
        CommandList.prototype.addCommandArray = function (commands) {
            this.addCommand.apply(this, commands);
        };
        CommandList.prototype.insertCommandArray = function (commands) {
            this.insertCommand.apply(this, commands);
        };
        CommandList.prototype.insertCommandArrayAt = function (index, commands) {
            this.insertCommandAt.apply(this, __spreadArrays([index], commands));
        };
        CommandList.prototype.getLength = function () {
            return this.commands.length;
        };
        CommandList.prototype.getCommandByIndex = function (index) { return this.commands[index]; };
        CommandList.prototype.getCommands = function () { return this.commands; };
        CommandList.prototype.preProcess = function (commands) {
            var numCommands = commands.length;
            var command;
            for (var i = 0; i < numCommands; ++i) {
                command = commands[i];
                if (typeof (command) == 'function')
                    commands[i] = command = new cmd.Func(command);
                command.setParent(this);
            }
        };
        CommandList.prototype.implExecuteFunction = function (command) {
            this.notifyComplete();
        };
        CommandList.prototype.implInterruptFunction = function (command) {
        };
        CommandList.prototype.implDestroyFunction = function (command) {
        };
        return CommandList;
    }(cmd.Command));
    cmd.CommandList = CommandList;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Break = (function (_super) {
        __extends(Break, _super);
        function Break() {
            return _super.call(this) || this;
        }
        Break.prototype.implExecuteFunction = function (command) {
            var func = this.getParent()['notifyBreak'];
            if (func)
                func();
            this.notifyComplete();
        };
        Break.prototype.implInterruptFunction = function (command) {
        };
        Break.prototype.implDestroyFunction = function (command) {
        };
        return Break;
    }(cmd.Command));
    cmd.Break = Break;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Return = (function (_super) {
        __extends(Return, _super);
        function Return() {
            return _super.call(this) || this;
        }
        Return.prototype.implExecuteFunction = function (command) {
            var func = this.getParent()['notifyReturn'];
            if (func)
                func();
            this.notifyComplete();
        };
        Return.prototype.implInterruptFunction = function (command) {
        };
        Return.prototype.implDestroyFunction = function (command) {
        };
        return Return;
    }(cmd.Command));
    cmd.Return = Return;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Log = (function (_super) {
        __extends(Log, _super);
        function Log() {
            var messages = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                messages[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this.messages = messages;
            return _this;
        }
        Log.prototype.implExecuteFunction = function (command) {
            console.log.apply(console, Array.prototype.slice.call(this.messages));
            this.notifyComplete();
        };
        Log.prototype.implInterruptFunction = function (command) {
        };
        Log.prototype.implDestroyFunction = function (command) {
            this.messages = null;
        };
        Log.prototype.getMessages = function () { return this.messages; };
        Log.prototype.setMessages = function (messages) { this.messages = messages; };
        return Log;
    }(cmd.Command));
    cmd.Log = Log;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Wait = (function (_super) {
        __extends(Wait, _super);
        function Wait(time) {
            if (time === void 0) { time = 1000; }
            var _this = _super.call(this) || this;
            _this.completeHandler = function () {
                _this.notifyComplete();
            };
            _this.time = time;
            _this.timerId = -1;
            return _this;
        }
        Wait.prototype.implExecuteFunction = function (command) {
            this.timerId = window.setTimeout(this.completeHandler, this.time);
        };
        Wait.prototype.implInterruptFunction = function (command) {
            this.cancel();
        };
        Wait.prototype.implDestroyFunction = function (command) {
            this.cancel();
        };
        Wait.prototype.cancel = function () {
            if (this.timerId != -1) {
                clearTimeout(this.timerId);
                this.timerId = -1;
            }
        };
        Wait.prototype.getTime = function () { return this.time; };
        Wait.prototype.setTime = function (time) { this.time = time; };
        return Wait;
    }(cmd.Command));
    cmd.Wait = Wait;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Func = (function (_super) {
        __extends(Func, _super);
        function Func(func, args, eventDispatcher, eventType) {
            if (func === void 0) { func = null; }
            if (args === void 0) { args = []; }
            if (eventDispatcher === void 0) { eventDispatcher = null; }
            if (eventType === void 0) { eventType = null; }
            var _this = _super.call(this) || this;
            _this.completeHandler = function (event) {
                _this.notifyComplete();
            };
            _this.func = func;
            _this.args = args;
            _this.eventDispatcher = eventDispatcher;
            _this.eventType = eventType;
            return _this;
        }
        Func.prototype.implExecuteFunction = function (command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.addEventListener(this.eventType, this.completeHandler);
                this.func.apply(this, this.args);
            }
            else {
                this.func.apply(this, this.args);
                this.notifyComplete();
            }
        };
        Func.prototype.implInterruptFunction = function (command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.removeEventListener(this.eventType, this.completeHandler);
            }
        };
        Func.prototype.implDestroyFunction = function (command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.removeEventListener(this.eventType, this.completeHandler);
            }
            this.func = null;
            this.args = null;
            this.eventDispatcher = null;
            this.eventType = null;
        };
        Func.prototype.getFunction = function () { return this.func; };
        Func.prototype.setFunction = function (func) { this.func = func; };
        Func.prototype.getArguments = function () { return this.args; };
        Func.prototype.setArguments = function (args) { this.args = args; };
        Func.prototype.getEventDispatcher = function () { return this.eventDispatcher; };
        Func.prototype.setEventDispatcher = function (eventDispatcher) { this.eventDispatcher = eventDispatcher; };
        Func.prototype.getEventType = function () { return this.eventType; };
        Func.prototype.setEventType = function (eventType) { this.eventType = eventType; };
        return Func;
    }(cmd.Command));
    cmd.Func = Func;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Listen = (function (_super) {
        __extends(Listen, _super);
        function Listen(eventDispatcher, eventType) {
            if (eventDispatcher === void 0) { eventDispatcher = null; }
            if (eventType === void 0) { eventType = null; }
            var _this = _super.call(this) || this;
            _this.completeHandler = function (event) {
                _this.notifyComplete();
            };
            _this.eventDispatcher = eventDispatcher;
            _this.eventType = eventType;
            return _this;
        }
        Listen.prototype.implExecuteFunction = function (command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.addEventListener(this.eventType, this.completeHandler);
            }
        };
        Listen.prototype.implInterruptFunction = function (command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.removeEventListener(this.eventType, this.completeHandler);
            }
        };
        Listen.prototype.implDestroyFunction = function (command) {
            if (this.eventDispatcher && this.eventType) {
                this.eventDispatcher.removeEventListener(this.eventType, this.completeHandler);
            }
            this.eventType = null;
            this.eventDispatcher = null;
        };
        Listen.prototype.getEventDispatcher = function () { return this.eventDispatcher; };
        Listen.prototype.setEventDispatcher = function (eventDispatcher) { this.eventDispatcher = eventDispatcher; };
        Listen.prototype.getEventType = function () { return this.eventType; };
        Listen.prototype.setEventType = function (eventType) { this.eventType = eventType; };
        return Listen;
    }(cmd.Command));
    cmd.Listen = Listen;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Easing = alm.math.Easing;
    var Time = alm.util.Time;
    var Tween = (function (_super) {
        __extends(Tween, _super);
        function Tween(target, to, from, duration, easing, onStart, onUpdate, onComplete) {
            if (from === void 0) { from = null; }
            if (duration === void 0) { duration = 1000; }
            if (easing === void 0) { easing = Easing.linear; }
            if (onStart === void 0) { onStart = null; }
            if (onUpdate === void 0) { onUpdate = null; }
            if (onComplete === void 0) { onComplete = null; }
            var _this = _super.call(this) || this;
            _this.intervalHandler = function () {
                var elapsedTime = Time.now() - _this.startTime;
                if (elapsedTime < _this.duration) {
                    _this.apply(elapsedTime / _this.duration);
                    if (_this.onUpdate)
                        _this.onUpdate(_this.progressTime, _this.progressValue);
                }
                else {
                    _this.apply(1);
                    _this.cancel();
                    if (_this.onUpdate)
                        _this.onUpdate(_this.progressTime, _this.progressValue);
                    if (_this.onComplete)
                        _this.onComplete(_this.progressTime, _this.progressValue);
                    _this.notifyComplete();
                }
            };
            _this.tweenTarget = target;
            _this.to = to;
            _this.from = from;
            _this.duration = duration;
            _this.easing = easing;
            _this.onStart = onStart;
            _this.onUpdate = onUpdate;
            _this.onComplete = onComplete;
            _this.progressTime = 0;
            _this.progressValue = 0;
            _this.startTime = 0;
            _this.timerId = -1;
            return _this;
        }
        Tween.prototype.implExecuteFunction = function (command) {
            this.internalFrom = {};
            var value0;
            var value1;
            for (var key in this.to) {
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
        };
        Tween.prototype.implInterruptFunction = function (command) {
            this.cancel();
        };
        Tween.prototype.implDestroyFunction = function (command) {
            this.cancel();
            this.tweenTarget = null;
            this.to = null;
            this.from = null;
            this.easing = null;
            this.onStart = null;
            this.onUpdate = null;
            this.onComplete = null;
            this.internalFrom = null;
        };
        Tween.prototype.cancel = function () {
            if (this.timerId != -1) {
                clearInterval(this.timerId);
                this.timerId = -1;
            }
        };
        Tween.prototype.apply = function (timeRatio) {
            this.progressTime = timeRatio;
            this.progressValue = this.easing(this.progressTime);
            var value0;
            for (var key in this.to) {
                value0 = this.internalFrom[key];
                this.tweenTarget[key] = value0 + (this.to[key] - value0) * this.progressValue;
            }
        };
        Tween.prototype.getTarget = function () { return this.tweenTarget; };
        Tween.prototype.setTarget = function (target) { this.tweenTarget = target; };
        Tween.prototype.getDuration = function () { return this.duration; };
        Tween.prototype.setDuration = function (duration) { this.duration = duration; };
        Tween.prototype.getTo = function () { return this.to; };
        Tween.prototype.setTo = function (to) { this.to = to; };
        Tween.prototype.getFrom = function () { return this.from; };
        Tween.prototype.setFrom = function (from) { this.from = from; };
        Tween.prototype.getEasing = function () { return this.easing; };
        Tween.prototype.setEasing = function (easing) { this.easing = easing; };
        Tween.prototype.getOnStart = function () { return this.onStart; };
        Tween.prototype.setOnStart = function (func) { this.onStart = func; };
        Tween.prototype.getOnUpdate = function () { return this.onUpdate; };
        Tween.prototype.setOnUpdate = function (func) { this.onUpdate = func; };
        Tween.prototype.getOnComplete = function () { return this.onComplete; };
        Tween.prototype.setOnComplete = function (func) { this.onComplete = func; };
        Tween.prototype.getProgressTime = function () { return this.progressTime; };
        Tween.prototype.getProgressValue = function () { return this.progressValue; };
        Tween.prototype.getUpdateInterval = function () { return Tween.updateInterval; };
        Tween.prototype.setUpdateInterval = function (milliseconds) { Tween.updateInterval = milliseconds; };
        Tween.updateInterval = 1000 / 60;
        return Tween;
    }(cmd.Command));
    cmd.Tween = Tween;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Serial = (function (_super) {
        __extends(Serial, _super);
        function Serial() {
            var commands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                commands[_i] = arguments[_i];
            }
            var _this = _super.apply(this, commands) || this;
            _this.completeHandler = function (event) {
                _this.currentCommand.removeEventListener(cmd.CommandEvent.COMPLETE, _this.completeHandler);
                _this.currentCommand = null;
                if (++_this.position >= _this.getLength()) {
                    _this.notifyComplete();
                }
                else {
                    _this.next();
                }
            };
            _this.currentCommand = null;
            _this.position = -1;
            _this.isPaused = false;
            _this.isCompleteOnPaused = false;
            return _this;
        }
        Serial.prototype.addCommand = function () {
            var commands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                commands[_i] = arguments[_i];
            }
            _super.prototype.addCommand.apply(this, commands);
        };
        Serial.prototype.insertCommand = function () {
            var commands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                commands[_i] = arguments[_i];
            }
            _super.prototype.insertCommandAt.apply(this, __spreadArrays([this.position + 1], commands));
        };
        Serial.prototype.addCommandArray = function (commands) {
            this.addCommand.apply(this, commands);
        };
        Serial.prototype.insertCommandArray = function (commands) {
            this.insertCommand.apply(this, commands);
        };
        Serial.prototype.next = function () {
            this.currentCommand = this.getCommandByIndex(this.position);
            this.currentCommand.addEventListener(cmd.CommandEvent.COMPLETE, this.completeHandler);
            this.currentCommand.execute();
        };
        Serial.prototype.implExecuteFunction = function (command) {
            this.position = 0;
            if (this.getLength() > 0) {
                this.next();
            }
            else {
                this.notifyComplete();
            }
        };
        Serial.prototype.implInterruptFunction = function (command) {
            if (this.currentCommand) {
                this.currentCommand.removeEventListener(cmd.CommandEvent.COMPLETE, this.completeHandler);
                this.currentCommand.interrupt();
                this.currentCommand = null;
            }
            this.position = -1;
            _super.prototype.implInterruptFunction.call(this, command);
        };
        Serial.prototype.implDestroyFunction = function (command) {
            if (this.currentCommand) {
                this.currentCommand.removeEventListener(cmd.CommandEvent.COMPLETE, this.completeHandler);
                this.currentCommand.destroy();
                this.currentCommand = null;
            }
            this.position = -1;
            this.isPaused = false;
            this.isCompleteOnPaused = false;
            _super.prototype.implDestroyFunction.call(this, command);
        };
        Serial.prototype.implNotifyBreak = function () {
            if (this.currentCommand.getState() == cmd.CommandState.Executing) {
                this.currentCommand.removeEventListener(cmd.CommandEvent.COMPLETE, this.completeHandler);
                this.currentCommand.interrupt();
            }
            this.notifyComplete();
        };
        Serial.prototype.implNotifyReturn = function () {
            if (this.currentCommand.getState() == cmd.CommandState.Executing) {
                this.currentCommand.removeEventListener(cmd.CommandEvent.COMPLETE, this.completeHandler);
                this.currentCommand.interrupt();
            }
            var func = this.getParent()['notifyReturn'];
            if (func)
                func();
            this.destroy();
        };
        Serial.prototype.getPosition = function () { return this.position; };
        return Serial;
    }(cmd.CommandList));
    cmd.Serial = Serial;
})(cmd || (cmd = {}));
var cmd;
(function (cmd) {
    var Parallel = (function (_super) {
        __extends(Parallel, _super);
        function Parallel() {
            var commands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                commands[_i] = arguments[_i];
            }
            var _this = _super.apply(this, commands) || this;
            _this.completeHandler = function (event) {
                if (++_this.completeCount >= _this.getLength()) {
                    _this.notifyComplete();
                }
            };
            _this.completeCount = 0;
            return _this;
        }
        Parallel.prototype.addCommand = function () {
            var commands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                commands[_i] = arguments[_i];
            }
            _super.prototype.addCommand.apply(this, commands);
        };
        Parallel.prototype.insertCommand = function () {
            var commands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                commands[_i] = arguments[_i];
            }
            this.addCommand.apply(this, commands);
        };
        Parallel.prototype.addCommandArray = function (commands) {
            this.addCommand.apply(this, commands);
        };
        Parallel.prototype.insertCommandArray = function (commands) {
            this.addCommand.apply(this, commands);
        };
        Parallel.prototype.implExecuteFunction = function (command) {
            this.completeCount = 0;
            var length = this.getLength();
            if (length > 0) {
                var commands = this.getCommands();
                var command_1;
                for (var i = 0; i < length; ++i) {
                    command_1 = commands[i];
                    command_1.addEventListener(cmd.CommandEvent.COMPLETE, this.completeHandler);
                    command_1.execute();
                }
            }
            else {
                this.notifyComplete();
            }
        };
        Parallel.prototype.implInterruptFunction = function (command) {
            var length = this.getLength();
            if (length > 0) {
                var commands = this.getCommands();
                var command_2;
                for (var i = 0; i < length; ++i) {
                    command_2 = commands[i];
                    command_2.removeEventListener(cmd.CommandEvent.COMPLETE, this.completeHandler);
                    command_2.interrupt();
                }
            }
            _super.prototype.implInterruptFunction.call(this, command);
        };
        Parallel.prototype.implDestroyFunction = function (command) {
            var length = this.getLength();
            if (length > 0) {
                var commands = this.getCommands();
                var command_3;
                for (var i = 0; i < length; ++i) {
                    command_3 = commands[i];
                    command_3.removeEventListener(cmd.CommandEvent.COMPLETE, this.completeHandler);
                    command_3.destroy();
                }
            }
            _super.prototype.implDestroyFunction.call(this, command);
        };
        Parallel.prototype.implNotifyBreak = function () {
            var length = this.getLength();
            if (length > 0) {
                var commands = this.getCommands();
                var command = void 0;
                for (var i = 0; i < length; ++i) {
                    command = commands[i];
                    if (command.getState() == cmd.CommandState.Executing) {
                        command.removeEventListener(cmd.CommandEvent.COMPLETE, this.completeHandler);
                        command.interrupt();
                    }
                }
            }
            this.notifyComplete();
        };
        Parallel.prototype.implNotifyReturn = function () {
            var length = this.getLength();
            if (length > 0) {
                var commands = this.getCommands();
                var command = void 0;
                for (var i = 0; i < length; ++i) {
                    command = commands[i];
                    if (command.getState() == cmd.CommandState.Executing) {
                        command.removeEventListener(cmd.CommandEvent.COMPLETE, this.completeHandler);
                        command.interrupt();
                    }
                }
            }
            var func = this.getParent()['notifyReturn'];
            if (func)
                func();
            this.destroy();
        };
        Parallel.prototype.getCompleteCount = function () { return this.completeCount; };
        return Parallel;
    }(cmd.CommandList));
    cmd.Parallel = Parallel;
})(cmd || (cmd = {}));
var alm;
(function (alm) {
    var geom;
    (function (geom) {
        var Vector2 = (function () {
            function Vector2(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.set(x, y);
            }
            Vector2.prototype.set = function (x, y) {
                this.x = x;
                this.y = y;
            };
            Vector2.prototype.copyTo = function (point) {
                point.set(this.x, this.y);
            };
            Vector2.prototype.getClone = function () {
                return new Vector2(this.x, this.y);
            };
            Vector2.prototype.zero = function () {
                this.set(0, 0);
            };
            Vector2.prototype.normalize = function () {
                var l = this.getLength();
                this.x /= l;
                this.y /= l;
            };
            Vector2.prototype.getLength = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            };
            Vector2.prototype.getSquareDistance = function (point) {
                var dx = point.x - this.x;
                var dy = point.y - this.y;
                return dx * dx + dy * dy;
            };
            Vector2.prototype.getDistance = function (point) {
                return Math.sqrt(this.getSquareDistance(point));
            };
            return Vector2;
        }());
        geom.Vector2 = Vector2;
    })(geom = alm.geom || (alm.geom = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var geom;
    (function (geom) {
        var Vector3 = (function () {
            function Vector3(x, y, z) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                this.set(x, y, z);
            }
            Vector3.prototype.set = function (x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
            };
            Vector3.prototype.copyTo = function (point) {
                point.set(this.x, this.y, this.z);
            };
            Vector3.prototype.getClone = function () {
                return new Vector3(this.x, this.y, this.z);
            };
            Vector3.prototype.zero = function () {
                this.set(0, 0, 0);
            };
            Vector3.prototype.normalize = function () {
                var l = this.getLength();
                this.x /= l;
                this.y /= l;
                this.z /= l;
            };
            Vector3.prototype.getLength = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            };
            Vector3.prototype.getSquareDistance = function (point) {
                var dx = point.x - this.x;
                var dy = point.y - this.y;
                var dz = point.z - this.z;
                return dx * dx + dy * dy + dz * dz;
            };
            Vector3.prototype.getDistance = function (point) {
                return Math.sqrt(this.getSquareDistance(point));
            };
            return Vector3;
        }());
        geom.Vector3 = Vector3;
    })(geom = alm.geom || (alm.geom = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var geom;
    (function (geom) {
        var Rectangle = (function () {
            function Rectangle(x, y, width, height) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                this.set(x, y, width, height);
            }
            Rectangle.prototype.set = function (x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            };
            Rectangle.prototype.copyTo = function (rect) {
                rect.set(this.x, this.y, this.width, this.height);
            };
            Rectangle.prototype.getClone = function () {
                return new Rectangle(this.x, this.y, this.width, this.height);
            };
            Rectangle.prototype.getTop = function () {
                return this.y;
            };
            Rectangle.prototype.getBottom = function () {
                return this.y + this.height;
            };
            Rectangle.prototype.getLeft = function () {
                return this.x;
            };
            Rectangle.prototype.getRight = function () {
                return this.x + this.width;
            };
            Rectangle.prototype.getTopLeft = function () {
                return new geom.Vector2(this.getLeft(), this.getTop());
            };
            Rectangle.prototype.getTopRight = function () {
                return new geom.Vector2(this.getRight(), this.getTop());
            };
            Rectangle.prototype.getBottomLeft = function () {
                return new geom.Vector2(this.getLeft(), this.getBottom());
            };
            Rectangle.prototype.getBottomRight = function () {
                return new geom.Vector2(this.getRight(), this.getBottom());
            };
            return Rectangle;
        }());
        geom.Rectangle = Rectangle;
    })(geom = alm.geom || (alm.geom = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var geom;
    (function (geom) {
        var Align;
        (function (Align) {
            Align[Align["Top_Left"] = 0] = "Top_Left";
            Align[Align["Top_Center"] = 1] = "Top_Center";
            Align[Align["Top_Right"] = 2] = "Top_Right";
            Align[Align["Middle_Left"] = 3] = "Middle_Left";
            Align[Align["Middle_Center"] = 4] = "Middle_Center";
            Align[Align["Middle_Right"] = 5] = "Middle_Right";
            Align[Align["Bottom_Left"] = 6] = "Bottom_Left";
            Align[Align["Bottom_Center"] = 7] = "Bottom_Center";
            Align[Align["Bottom_Right"] = 8] = "Bottom_Right";
        })(Align = geom.Align || (geom.Align = {}));
        var ScaleMode;
        (function (ScaleMode) {
            ScaleMode[ScaleMode["ExactFit"] = 0] = "ExactFit";
            ScaleMode[ScaleMode["ShowAll"] = 1] = "ShowAll";
            ScaleMode[ScaleMode["NoBorder"] = 2] = "NoBorder";
            ScaleMode[ScaleMode["NoScale"] = 3] = "NoScale";
        })(ScaleMode = geom.ScaleMode || (geom.ScaleMode = {}));
        var Boxer = (function () {
            function Boxer() {
            }
            Boxer.resize = function (target, bounds, scaleMode, align) {
                if (scaleMode === void 0) { scaleMode = ScaleMode.ShowAll; }
                if (align === void 0) { align = Align.Middle_Center; }
                var tx = target.x;
                var ty = target.y;
                var tw = target.width;
                var th = target.height;
                var bx = bounds.x;
                var by = bounds.y;
                var bw = bounds.width;
                var bh = bounds.height;
                switch (scaleMode) {
                    case ScaleMode.ShowAll:
                    case ScaleMode.NoBorder:
                        var ratioW = bw / tw;
                        var ratioH = bh / th;
                        var ratio = scaleMode == ScaleMode.ShowAll ? (ratioW < ratioH ? ratioW : ratioH) : (ratioW > ratioH ? ratioW : ratioH);
                        tw *= ratio;
                        th *= ratio;
                        break;
                    case ScaleMode.ExactFit:
                        return new geom.Rectangle(bx, by, bw, bh);
                }
                tx = bx + ((align == Align.Top_Left || align == Align.Middle_Left || align == Align.Bottom_Left) ? 0 :
                    (align == Align.Top_Right || align == Align.Middle_Right || align == Align.Bottom_Right) ? (bw - tw) : (bw - tw) / 2);
                ty = by + ((align == Align.Top_Left || align == Align.Top_Center || align == Align.Top_Right) ? 0 :
                    (align == Align.Bottom_Left || align == Align.Bottom_Center || align == Align.Bottom_Right) ? (bh - th) : (bh - th) / 2);
                return new geom.Rectangle(tx, ty, tw, th);
            };
            return Boxer;
        }());
        geom.Boxer = Boxer;
    })(geom = alm.geom || (alm.geom = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Obj = (function () {
            function Obj() {
            }
            Obj.each = function (target, func) {
                if (target == null)
                    return;
                Object.keys(target).forEach(function (key) {
                    func(key, target[key]);
                });
            };
            Obj.get = function (target, key, defaultValue) {
                var value = target[key];
                return typeof value !== 'undefined' ? value : defaultValue;
            };
            return Obj;
        }());
        util.Obj = Obj;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Arr = (function () {
            function Arr() {
            }
            Arr.sequence = function (count, init, step) {
                if (init === void 0) { init = 0; }
                if (step === void 0) { step = 1; }
                var result = new Array(count);
                var v = init;
                for (var i = 0; i < count; ++i) {
                    result[i] = v;
                    v += step;
                }
                return result;
            };
            Arr.unique = function (list) {
                return list.filter(function (x, i, self) {
                    return self.indexOf(x) === i;
                });
            };
            Arr.duplicated = function (list, unique) {
                if (unique === void 0) { unique = false; }
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
            };
            Arr.roundRobin = function (list1, list2, callback) {
                var i, j, p = 1;
                var m = list1.length;
                var n = list2.length;
                for (i = 0; i < m; ++i) {
                    for (j = i + 1; j < n; ++j) {
                        callback(p++, i, j, list1[i], list2[j]);
                    }
                }
            };
            Arr.swap = function (list, index1, index2) {
                var tmp = list[index1];
                list[index1] = list[index2];
                list[index2] = tmp;
            };
            Arr.shuffle = function (list) {
                for (var i = list.length - 1; i > 0; --i) {
                    Arr.swap(list, i, Math.floor(Math.random() * (i + 1)));
                }
            };
            Arr.sort = function (list, asc) {
                if (asc === void 0) { asc = true; }
                list.sort(asc ? function (a, b) { return a - b; } : function (a, b) { return b - a; });
            };
            return Arr;
        }());
        util.Arr = Arr;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Num = (function () {
            function Num() {
            }
            Num.map = function (value, srcA, srcB, dstA, dstB, clamp) {
                if (clamp === void 0) { clamp = true; }
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
            };
            Num.ease = function (value, srcA, srcB, dstA, dstB, easing) {
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
            };
            Num.random = function (min, max) {
                if (min === void 0) { min = 0; }
                if (max === void 0) { max = 1; }
                return min + (max - min) * Math.random();
            };
            Num.randomInt = function (min, max) {
                if (min === void 0) { min = 0; }
                if (max === void 0) { max = 1; }
                return Math.floor(Num.random(min, max));
            };
            Num.clamp = function (value, min, max) {
                return value < min ? min : (value > max ? max : value);
            };
            Num.clampAbs = function (value, minAbs, maxAbs) {
                if (value > 0) {
                    return value < minAbs ? minAbs : (value > maxAbs ? maxAbs : value);
                }
                else {
                    value = Math.abs(value);
                    return -(value < minAbs ? minAbs : (value > maxAbs ? maxAbs : value));
                }
            };
            Num.dist = function (x1, y1, x2, y2, squared) {
                if (squared === void 0) { squared = false; }
                var dx = x2 - x1;
                var dy = y2 - y1;
                return squared ? (dx * dx + dy * dy) : Math.sqrt(dx * dx + dy * dy);
            };
            Num.radToDeg = function (radian) {
                return radian * Num.RAD2DEG;
            };
            Num.degToRad = function (degree) {
                return degree * Num.DEG2RAD;
            };
            Num.turn = function (from, to, radian) {
                if (radian === void 0) { radian = true; }
                return radian ? ((to - from + Num.PI3) % Num.PI2 - Math.PI) : ((to - from + 540) % 360 - 180);
            };
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
            return Num;
        }());
        util.Num = Num;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Str = (function () {
            function Str() {
            }
            Str.toTimeString = function (hours, minutes, seconds) {
                if (hours === void 0) { hours = 0; }
                if (minutes === void 0) { minutes = 0; }
                if (seconds === void 0) { seconds = 0; }
                seconds += minutes * 60 + hours * 3600;
                var h = Math.floor(seconds / 3600).toString();
                var m = Math.floor((seconds / 60) % 60).toString();
                var s = ('0' + Math.floor(seconds % 60)).substr(-2, 2);
                if (h != '0') {
                    return h + ':' + ('0' + m).substr(-2, 2) + ':' + s;
                }
                else {
                    return m + ':' + s;
                }
            };
            return Str;
        }());
        util.Str = Str;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Cmd = (function () {
            function Cmd() {
            }
            Cmd.stop = function (command) {
                if (command)
                    command.interrupt();
                return null;
            };
            Cmd.sequence = function (execute) {
                var commands = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    commands[_i - 1] = arguments[_i];
                }
                var c = new cmd.Serial();
                c.addCommand.apply(c, commands);
                if (execute)
                    c.execute();
                return c;
            };
            Cmd.single = function (execute, command) {
                if (execute && command)
                    command.execute();
                return command;
            };
            return Cmd;
        }());
        util.Cmd = Cmd;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Dom = (function () {
            function Dom() {
            }
            Dom.instantiate = function (templateId) {
                var element = document.getElementById(templateId).cloneNode(true);
                element.removeAttribute('id');
                return element;
            };
            Dom.addPointerDownListener = function (target, listener) {
                target.addEventListener('pointerdown', listener);
            };
            Dom.addPointerUpListener = function (target, listener) {
                target.addEventListener('pointerup', listener);
            };
            Dom.removePointerEventListener = function (target, listener) {
                target.removeEventListener('pointerdown', listener);
            };
            Dom.removePointerUpListener = function (target, listener) {
                target.removeEventListener('pointerup', listener);
            };
            return Dom;
        }());
        util.Dom = Dom;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var resource;
    (function (resource) {
        var ObjectPool = (function () {
            function ObjectPool(onRequireItem, onDestroyItem, initCount, growthCount) {
                if (initCount === void 0) { initCount = 100; }
                if (growthCount === void 0) { growthCount = 50; }
                this.onRequireItem = onRequireItem;
                this.onDestroyItem = onDestroyItem;
                this.growthCount = growthCount;
                this.items = new Array(initCount);
                for (var i = 0; i < initCount; ++i) {
                    this.items[i] = this.onRequireItem();
                }
                this.index = initCount;
            }
            ObjectPool.prototype.getItem = function () {
                if (this.index > 0) {
                    return this.items[--this.index];
                }
                for (var i = 0; i < this.growthCount; ++i) {
                    this.items.unshift(this.onRequireItem());
                }
                this.index = this.growthCount;
                return this.getItem();
            };
            ObjectPool.prototype.returnItem = function (item) {
                this.items[this.index++] = item;
            };
            ObjectPool.prototype.reduce = function () {
                var n = this.index;
                for (var i = 0; i < n; ++i) {
                    this.onDestroyItem(this.items.shift());
                }
                this.index = 0;
            };
            ObjectPool.prototype.destroy = function () {
                var n = this.items.length;
                for (var i = 0; i < n; ++i) {
                    this.onDestroyItem(this.items[i]);
                }
                this.index = 0;
                this.items = null;
                this.onRequireItem = null;
                this.onDestroyItem = null;
            };
            return ObjectPool;
        }());
        resource.ObjectPool = ObjectPool;
    })(resource = alm.resource || (alm.resource = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var state;
    (function (state) {
        var Lottery = (function () {
            function Lottery(values) {
                if (values === void 0) { values = null; }
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
            Lottery.prototype.set = function (values) {
                this.initValues = values.concat();
                this.reset();
            };
            Lottery.prototype.get = function () {
                if (this.isEmpty && this.isAutoResetEnabled) {
                    this.reset();
                }
                var index = Math.floor(Math.random() * this.restCount);
                var value = this.restValues[index];
                var result = true;
                if (this.onCheck)
                    result = this.onCheck(value);
                if (result) {
                    this.restValues.splice(index, 1);
                    this.restCount = this.restValues.length;
                    this.isEmpty = this.restCount == 0;
                }
                return value;
            };
            Lottery.prototype.add = function (value, reset) {
                if (reset === void 0) { reset = false; }
                this.initValues.push(value);
                this.restValues.push(value);
                this.restCount = this.restValues.length;
                this.isEmpty = this.restCount == 0;
                if (reset) {
                    this.reset();
                }
            };
            Lottery.prototype.reset = function () {
                this.restValues = this.initValues.concat();
                this.restCount = this.restValues.length;
                this.isEmpty = this.restCount == 0;
            };
            Lottery.prototype.getRestCount = function () {
                return this.restCount;
            };
            Lottery.prototype.getIsEmply = function () {
                return this.isEmpty;
            };
            Lottery.prototype.getIsAutoResetEnabled = function () {
                return this.isAutoResetEnabled;
            };
            Lottery.prototype.setIsAutoResetEnabled = function (enabled) {
                this.isAutoResetEnabled = enabled;
            };
            Lottery.createIndices = function (count) {
                var values = new Array(count);
                for (var i = 0; i < count; ++i)
                    values[i] = i;
                return new Lottery(values);
            };
            return Lottery;
        }());
        state.Lottery = Lottery;
    })(state = alm.state || (alm.state = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var state;
    (function (state) {
        var Switcher = (function (_super) {
            __extends(Switcher, _super);
            function Switcher() {
                var _this = _super.call(this) || this;
                _this.isLoopEnabled = true;
                _this.itemCount = 0;
                _this.itemIds = null;
                _this.itemIndexById = null;
                _this.onChange = null;
                _this.onPrev = null;
                _this.onNext = null;
                return _this;
            }
            Switcher.prototype.setupById = function (ids) {
                this.itemCount = ids.length;
                this.itemIds = ids;
                this.itemIndexById = {};
                for (var i = 0; i < this.itemCount; ++i) {
                    this.itemIndexById[this.itemIds[i]] = i;
                }
                this.setup();
            };
            Switcher.prototype.setupByCount = function (itemCount) {
                this.itemCount = itemCount;
                this.itemIds = null;
                this.itemIndexById = null;
                this.setup();
            };
            Switcher.prototype.setup = function () {
                this.currentItemIndex = -1;
                this.currentItemId = null;
                this.oldItemIndex = -1;
                this.oldItemId = null;
            };
            Switcher.prototype.gotoByIndex = function (itemIndex, useTransition) {
                if (useTransition === void 0) { useTransition = true; }
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
                this.dispatchPagerEvent(state.SwitcherEvent.CHANGE, this.onChange, useTransition);
                return true;
            };
            Switcher.prototype.gotoById = function (itemId, useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                var itemIndex = this.itemIndexById.hasOwnProperty(itemId) ? this.itemIndexById[itemId] : -1;
                return this.gotoByIndex(itemIndex, useTransition);
            };
            Switcher.prototype.prev = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                var itemIndex = this.getPrevItemIndex();
                var result = this.gotoByIndex(itemIndex, useTransition);
                if (result) {
                    this.dispatchPagerEvent(state.SwitcherEvent.PREV, this.onPrev, useTransition);
                }
                return result;
            };
            Switcher.prototype.next = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                var itemIndex = this.getNextItemIndex();
                var result = this.gotoByIndex(itemIndex, useTransition);
                if (result) {
                    this.dispatchPagerEvent(state.SwitcherEvent.NEXT, this.onNext, useTransition);
                }
                return result;
            };
            Switcher.prototype.getPrevItemIndex = function () {
                var itemIndex = this.currentItemIndex - 1;
                if (this.isLoopEnabled && itemIndex < 0)
                    itemIndex = this.itemCount - 1;
                return itemIndex;
            };
            Switcher.prototype.getPrevItemId = function () {
                return this.itemIds[this.getPrevItemIndex()];
            };
            Switcher.prototype.getNextItemIndex = function () {
                var itemIndex = this.currentItemIndex + 1;
                if (this.isLoopEnabled && itemIndex >= this.itemCount)
                    itemIndex = 0;
                return itemIndex;
            };
            Switcher.prototype.getNextItemId = function () {
                return this.itemIds[this.getNextItemIndex()];
            };
            Switcher.prototype.dispatchPagerEvent = function (eventType, callback, useTransition) {
                var event = new state.SwitcherEvent(eventType, this, this.currentItemIndex, this.oldItemIndex, this.currentItemId, this.oldItemId, useTransition);
                if (callback) {
                    callback(event);
                }
                this.dispatchEvent(event);
            };
            Switcher.prototype.getIsLoopEnabled = function () { return this.isLoopEnabled; };
            Switcher.prototype.setIsLoopEnabled = function (value) { this.isLoopEnabled = value; };
            Switcher.prototype.getItemCount = function () { return this.itemCount; };
            Switcher.prototype.getCurrentItemIndex = function () { return this.currentItemIndex; };
            Switcher.prototype.getOldItemIndex = function () { return this.oldItemIndex; };
            Switcher.prototype.getCurrentItemId = function () { return this.currentItemId; };
            Switcher.prototype.getOldItemId = function () { return this.oldItemId; };
            Switcher.prototype.getItemIds = function () { return this.itemIds; };
            return Switcher;
        }(alm.event.EventDispatcher));
        state.Switcher = Switcher;
    })(state = alm.state || (alm.state = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var state;
    (function (state) {
        var SwitcherEvent = (function (_super) {
            __extends(SwitcherEvent, _super);
            function SwitcherEvent(eventType, eventTarget, currentItemIndex, oldItemIndex, currentItemId, oldItemId, useTransition) {
                var _this = _super.call(this, eventType, eventTarget) || this;
                _this.currentItemIndex = currentItemIndex;
                _this.oldItemIndex = oldItemIndex;
                _this.currentItemId = currentItemId;
                _this.oldItemId = oldItemId;
                _this.useTransition = useTransition;
                return _this;
            }
            SwitcherEvent.prototype.clone = function () {
                return new SwitcherEvent(this.type, this.target, this.currentItemIndex, this.oldItemIndex, this.currentItemId, this.oldItemId, this.useTransition);
            };
            SwitcherEvent.prototype.toString = function () {
                return '[SwitcherEvent] type = ' + this.type + ', ' + this.oldItemIndex + ' -> ' + this.currentItemIndex + ', transition = ' + this.useTransition;
            };
            SwitcherEvent.CHANGE = 'change';
            SwitcherEvent.PREV = 'prev';
            SwitcherEvent.NEXT = 'next';
            return SwitcherEvent;
        }(alm.event.Event));
        state.SwitcherEvent = SwitcherEvent;
    })(state = alm.state || (alm.state = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var state;
    (function (state) {
        var EventDispatcher = alm.event.EventDispatcher;
        var LoHi = (function (_super) {
            __extends(LoHi, _super);
            function LoHi(lowThreshold, highThreshold, initValue) {
                if (initValue === void 0) { initValue = 0; }
                var _this = _super.call(this) || this;
                _this.lowThreshold = lowThreshold;
                _this.highThreshold = highThreshold;
                _this.isHigh = false;
                _this._set(initValue, false);
                return _this;
            }
            LoHi.prototype.set = function (value) {
                return this._set(value, true);
            };
            LoHi.prototype.getIsHigh = function () {
                return this.isHigh;
            };
            LoHi.prototype.getValue = function () {
                return this.value;
            };
            LoHi.prototype.getLowThreshold = function () {
                return this.lowThreshold;
            };
            LoHi.prototype.getHighThreshold = function () {
                return this.highThreshold;
            };
            LoHi.prototype.setLowThreshold = function (threshold) {
                this.lowThreshold = threshold;
                this._set(this.value, true);
            };
            LoHi.prototype.setHighThreshold = function (threshold) {
                this.highThreshold = threshold;
                this._set(this.value, true);
            };
            LoHi.prototype._set = function (value, dispatchEvent) {
                this.value = value;
                if (this.isHigh && this.value < this.lowThreshold) {
                    this.isHigh = false;
                    if (dispatchEvent) {
                        this.dispatchEvent(new state.LoHiEvent(state.LoHiEvent.LOW, this, this.isHigh));
                        this.dispatchEvent(new state.LoHiEvent(state.LoHiEvent.CHANGE, this, this.isHigh));
                    }
                    return true;
                }
                else if (!this.isHigh && this.value > this.highThreshold) {
                    this.isHigh = true;
                    if (dispatchEvent) {
                        this.dispatchEvent(new state.LoHiEvent(state.LoHiEvent.HIGH, this, this.isHigh));
                        this.dispatchEvent(new state.LoHiEvent(state.LoHiEvent.CHANGE, this, this.isHigh));
                    }
                    return true;
                }
                return false;
            };
            return LoHi;
        }(EventDispatcher));
        state.LoHi = LoHi;
    })(state = alm.state || (alm.state = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var state;
    (function (state) {
        var LoHiEvent = (function (_super) {
            __extends(LoHiEvent, _super);
            function LoHiEvent(eventType, eventTarget, isHigh) {
                var _this = _super.call(this, eventType, eventTarget) || this;
                _this.isHigh = isHigh;
                return _this;
            }
            LoHiEvent.prototype.clone = function () {
                return new LoHiEvent(this.type, this.target, this.isHigh);
            };
            LoHiEvent.prototype.toString = function () {
                return '[LoHiEvent] type = ' + this.type + ', isHigh = ' + this.isHigh;
            };
            LoHiEvent.CHANGE = 'change';
            LoHiEvent.LOW = 'low';
            LoHiEvent.HIGH = 'high';
            return LoHiEvent;
        }(alm.event.Event));
        state.LoHiEvent = LoHiEvent;
    })(state = alm.state || (alm.state = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        var EasingValue = (function () {
            function EasingValue(initValue, easing, tolerance) {
                if (easing === void 0) { easing = 0.1; }
                if (tolerance === void 0) { tolerance = 0; }
                this.value = this.target = initValue;
                this.easing = easing;
                this.tolerance = tolerance;
            }
            EasingValue.prototype.update = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                if (useTransition) {
                    var d = this.target - this.value;
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
            };
            EasingValue.prototype.clone = function () {
                var v = new EasingValue(this.value, this.easing, this.tolerance);
                v.target = this.target;
                return v;
            };
            return EasingValue;
        }());
        math.EasingValue = EasingValue;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        var SpringValue = (function () {
            function SpringValue(initValue, spring, friction) {
                if (spring === void 0) { spring = 0.1; }
                if (friction === void 0) { friction = 0.9; }
                this.acceleration = 0;
                this.velocity = 0;
                this.value = this.target = initValue;
                this.spring = spring;
                this.friction = friction;
            }
            SpringValue.prototype.update = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
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
            };
            SpringValue.prototype.clone = function () {
                var v = new SpringValue(this.value, this.spring, this.friction);
                v.acceleration = this.acceleration;
                v.velocity = this.velocity;
                v.target = this.target;
                return v;
            };
            return SpringValue;
        }());
        math.SpringValue = SpringValue;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        var SimpleAverage = (function () {
            function SimpleAverage() {
                this.value = this._value = 0;
                this.count = this._count = 0;
            }
            SimpleAverage.prototype.add = function (n) {
                this._value = (this._value * this._count + n) / ++this._count;
                this.value = this._value;
                this.count = this._count;
                return this._value;
            };
            return SimpleAverage;
        }());
        math.SimpleAverage = SimpleAverage;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        var SimpleMovingAverage = (function () {
            function SimpleMovingAverage(maxCount) {
                this.maxCount = this._maxCount = maxCount;
                this.value = this._value = 0;
                this.count = this._count = 0;
                this.values = [];
            }
            SimpleMovingAverage.prototype.add = function (n) {
                if (++this._count > this._maxCount) {
                    this._count = this._maxCount;
                    var oldest = this.values.shift();
                    this._value -= oldest;
                    var latest = n / this._maxCount;
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
            };
            return SimpleMovingAverage;
        }());
        math.SimpleMovingAverage = SimpleMovingAverage;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        var MaxValue = (function () {
            function MaxValue(maxLatestCount) {
                if (maxLatestCount === void 0) { maxLatestCount = 0; }
                this.maxLatestCount = this._maxLatestCount = maxLatestCount;
                this.value = this._value = -Number.MAX_VALUE;
                this.count = this._count = 0;
                this.values = [];
            }
            MaxValue.prototype.add = function (n) {
                if (this._maxLatestCount > 0) {
                    if (++this._count > this._maxLatestCount) {
                        this._count = this._maxLatestCount;
                        this.values.push(n);
                        var oldest = this.values.shift();
                        if (this._value > oldest) {
                            if (this._value < n) {
                                this._value = n;
                            }
                        }
                        else {
                            this._value = -Number.MAX_VALUE;
                            for (var i = 0; i < this._count; ++i) {
                                var v = this.values[i];
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
            };
            return MaxValue;
        }());
        math.MaxValue = MaxValue;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var math;
    (function (math) {
        var Circular = (function () {
            function Circular(angle, velocity, radian) {
                if (angle === void 0) { angle = 0; }
                if (velocity === void 0) { velocity = 0; }
                if (radian === void 0) { radian = true; }
                this.setAngle(angle, radian);
                this.setVelocity(velocity, radian);
            }
            Circular.prototype.getAngle = function (radian) {
                if (radian === void 0) { radian = true; }
                return radian ? this.angle : (this.angle * 180 / Math.PI);
            };
            Circular.prototype.setAngle = function (angle, radian) {
                if (radian === void 0) { radian = true; }
                this.angle = radian ? angle : (angle * Math.PI / 180);
            };
            Circular.prototype.getVelocity = function (radian) {
                if (radian === void 0) { radian = true; }
                return radian ? this.velocity : (this.velocity * 180 / Math.PI);
            };
            Circular.prototype.setVelocity = function (velocity, radian) {
                if (radian === void 0) { radian = true; }
                this.velocity = radian ? velocity : (velocity * Math.PI / 180);
            };
            Circular.prototype.update = function () {
                this.angle += this.velocity;
            };
            Circular.prototype.getSin = function (length) {
                if (length === void 0) { length = 1; }
                return length * Math.sin(this.angle);
            };
            Circular.prototype.getCos = function (length) {
                if (length === void 0) { length = 1; }
                return length * Math.cos(this.angle);
            };
            Circular.prototype.getTan = function (length) {
                if (length === void 0) { length = 1; }
                return length * Math.tan(this.angle);
            };
            Circular.prototype.getMagnitude = function (length) {
                if (length === void 0) { length = 1; }
                return length * (1 + Math.sin(this.angle)) / 2;
            };
            Circular.prototype.getVector = function (length, xy) {
                if (length === void 0) { length = 1; }
                if (xy === void 0) { xy = null; }
                if (xy != null) {
                    xy.x = this.getCos(length);
                    xy.y = this.getSin(length);
                }
                else {
                    return { x: this.getCos(length), y: this.getSin(length) };
                }
            };
            return Circular;
        }());
        math.Circular = Circular;
    })(math = alm.math || (alm.math = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var time;
    (function (time) {
        var EventDispatcher = alm.event.EventDispatcher;
        var Time = alm.util.Time;
        var AnimationFrameTicker = (function (_super) {
            __extends(AnimationFrameTicker, _super);
            function AnimationFrameTicker(frameRate, tolerance) {
                if (frameRate === void 0) { frameRate = 0; }
                if (tolerance === void 0) { tolerance = 0.1; }
                var _this = _super.call(this) || this;
                _this.updateHandler = function () {
                    _this.requestId = window.requestAnimationFrame(_this.updateHandler);
                    if (_this.targetFrameRate > 0) {
                        var currentTime = Time.now();
                        var elapsedTime = currentTime - _this.frameStartTime;
                        if (elapsedTime >= _this.interval - _this.toleranceDuration) {
                            _this.frameStartTime = currentTime;
                            _this.dispatchEvent(new time.AnimationFrameTickerEvent(time.AnimationFrameTickerEvent.TICK, _this));
                        }
                    }
                    else {
                        _this.dispatchEvent(new time.AnimationFrameTickerEvent(time.AnimationFrameTickerEvent.TICK, _this));
                    }
                };
                _this.targetFrameRate = frameRate;
                _this.interval = 1000 / _this.targetFrameRate;
                _this.tolerance = tolerance;
                _this.toleranceDuration = _this.interval * _this.tolerance;
                _this.isRunning = false;
                return _this;
            }
            AnimationFrameTicker.prototype.start = function () {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                this.frameStartTime = Time.now();
                this.requestId = window.requestAnimationFrame(this.updateHandler);
            };
            AnimationFrameTicker.prototype.stop = function () {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                window.cancelAnimationFrame(this.requestId);
            };
            AnimationFrameTicker.prototype.getIsRunning = function () {
                return this.isRunning;
            };
            AnimationFrameTicker.prototype.getTargetFrameRate = function () {
                return this.isRunning;
            };
            AnimationFrameTicker.prototype.setInterval = function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
            AnimationFrameTicker.prototype.clearInterval = function (requestId) {
                window.clearInterval(requestId);
            };
            return AnimationFrameTicker;
        }(EventDispatcher));
        time.AnimationFrameTicker = AnimationFrameTicker;
    })(time = alm.time || (alm.time = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var time;
    (function (time) {
        var Event = alm.event.Event;
        var AnimationFrameTickerEvent = (function (_super) {
            __extends(AnimationFrameTickerEvent, _super);
            function AnimationFrameTickerEvent(eventType, eventTarget) {
                return _super.call(this, eventType, eventTarget) || this;
            }
            AnimationFrameTickerEvent.prototype.clone = function () {
                return new AnimationFrameTickerEvent(this.type, this.target);
            };
            AnimationFrameTickerEvent.prototype.toString = function () {
                return '[AnimationFrameTickerEvent] type = ' + this.type;
            };
            AnimationFrameTickerEvent.TICK = 'tick';
            return AnimationFrameTickerEvent;
        }(Event));
        time.AnimationFrameTickerEvent = AnimationFrameTickerEvent;
    })(time = alm.time || (alm.time = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var time;
    (function (time) {
        var EventDispatcher = alm.event.EventDispatcher;
        var Time = alm.util.Time;
        var Timer = (function (_super) {
            __extends(Timer, _super);
            function Timer(interval, repeatCount) {
                if (interval === void 0) { interval = 1000; }
                if (repeatCount === void 0) { repeatCount = 0; }
                var _this = _super.call(this) || this;
                _this.timerHandler = function () {
                    _this.tStartTime = Time.now();
                    ++_this.elapsedCount;
                    var isCompleted = false;
                    if (_this.repeatCount > 0 && _this.elapsedCount >= _this.repeatCount) {
                        isCompleted = true;
                        _this.stop();
                    }
                    else if (_this.tInterval != _this.interval) {
                        _this.startInterval(_this.interval);
                    }
                    _this.dispatch(time.TimerEvent.TICK);
                    if (isCompleted) {
                        _this.dispatch(time.TimerEvent.COMPLETE);
                    }
                };
                _this.interval = interval;
                _this.repeatCount = repeatCount;
                _this.isRunning = false;
                _this.tId = -1;
                _this.reset();
                return _this;
            }
            Timer.prototype.start = function () {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                this.tStartTime = Time.now();
                this.startInterval(this.tRestTime != -1 ? this.tRestTime : this.interval);
            };
            Timer.prototype.stop = function () {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                this.tRestTime = Time.now() - this.tStartTime;
                this.stopInterval();
            };
            Timer.prototype.reset = function () {
                this.stop();
                this.elapsedCount = 0;
                this.tRestTime = -1;
            };
            Timer.prototype.restart = function () {
                this.reset();
                this.start();
            };
            Timer.prototype.startInterval = function (interval) {
                this.stopInterval();
                this.tInterval = interval;
                this.tId = window.setInterval(this.timerHandler, this.tInterval);
            };
            Timer.prototype.stopInterval = function () {
                if (this.tId != -1) {
                    clearInterval(this.tId);
                    this.tId = -1;
                }
            };
            Timer.prototype.dispatch = function (eventType) {
                this.dispatchEvent(new time.TimerEvent(eventType, this, this.elapsedCount, this.repeatCount, this.getRestCount()));
            };
            Timer.prototype.getIsRunning = function () { return this.isRunning; };
            Timer.prototype.getInterval = function () { return this.interval; };
            Timer.prototype.setInterval = function (interval) { this.interval = interval; };
            Timer.prototype.getElapsedTime = function () { return Time.now() - this.tStartTime; };
            Timer.prototype.getRestTime = function () { return this.interval - this.getElapsedTime(); };
            Timer.prototype.getElapsedCount = function () { return this.elapsedCount; };
            Timer.prototype.getRepeatCount = function () { return this.repeatCount; };
            Timer.prototype.setRepeatCount = function (count) { this.repeatCount = count; };
            Timer.prototype.getRestCount = function () { return this.repeatCount - this.elapsedCount; };
            return Timer;
        }(EventDispatcher));
        time.Timer = Timer;
    })(time = alm.time || (alm.time = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var time;
    (function (time) {
        var Event = alm.event.Event;
        var TimerEvent = (function (_super) {
            __extends(TimerEvent, _super);
            function TimerEvent(eventType, eventTarget, elapsedCount, repeatCount, restCount) {
                if (elapsedCount === void 0) { elapsedCount = 0; }
                if (repeatCount === void 0) { repeatCount = 0; }
                if (restCount === void 0) { restCount = 0; }
                var _this = _super.call(this, eventType, eventTarget) || this;
                _this.elapsedCount = elapsedCount;
                _this.repeatCount = repeatCount;
                _this.restCount = restCount;
                return _this;
            }
            TimerEvent.prototype.clone = function () {
                return new TimerEvent(this.type, this.target, this.elapsedCount, this.repeatCount, this.restCount);
            };
            TimerEvent.prototype.toString = function () {
                return '[TimerEvent] type = ' + this.type + ', elapsedCount = ' + this.elapsedCount + ', repeatCount=' + this.repeatCount + ', restCount=' + this.restCount;
            };
            TimerEvent.TICK = 'tick';
            TimerEvent.COMPLETE = 'complete';
            return TimerEvent;
        }(Event));
        time.TimerEvent = TimerEvent;
    })(time = alm.time || (alm.time = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        var EventDispatcher = alm.event.EventDispatcher;
        var FileLoader = (function (_super) {
            __extends(FileLoader, _super);
            function FileLoader(totalThreadCount) {
                if (totalThreadCount === void 0) { totalThreadCount = 3; }
                var _this = _super.call(this) || this;
                _this.fileLoadCompleteHandler = function (query, content, info) {
                    if (info === void 0) { info = null; }
                    --_this.currentThreadCount;
                    query.isLoading = false;
                    query.isLoadComplete = true;
                    query.content = content;
                    if (query.param.onLoad) {
                        query.param.onLoad(content, info);
                    }
                    _this.dispatchEvent(new io.FileLoaderSuccessEvent(io.FileLoaderSuccessEvent.SUCCESS, _this, content, info));
                    _this.next();
                };
                _this.fileLoadErrorHandler = function (query, info) {
                    if (info === void 0) { info = null; }
                    --_this.currentThreadCount;
                    query.isLoading = false;
                    query.isLoadComplete = true;
                    if (query.param.onError) {
                        query.param.onError(info);
                    }
                    _this.dispatchEvent(new io.FileLoaderErrorEvent(io.FileLoaderErrorEvent.ERROR, _this, info));
                    _this.next();
                };
                _this.isLoading_ = false;
                _this.currentCount = 0;
                _this.totalCount = 0;
                _this.currentThreadCount = 0;
                _this.totalThreadCount = totalThreadCount;
                _this.loadingQueries = [];
                _this.loadingQueryIndex = -1;
                _this.queriesByQueryId = {};
                _this.queriesByUrl = {};
                _this.handlersByType = {};
                trace('[FileLoader] totalThreadCount : ' + _this.totalThreadCount);
                return _this;
            }
            FileLoader.prototype.require = function (url, type, id) {
                if (id === void 0) { id = ''; }
                return this.addQuery(type, url, {}, id);
            };
            FileLoader.prototype.addQuery = function (type, url, param, id) {
                if (id === void 0) { id = ''; }
                if (this.queriesByUrl[url])
                    return this.queriesByUrl[url].id;
                var query = new io.FileQuery();
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
            };
            FileLoader.prototype.load = function () {
                if (this.isLoading_)
                    return;
                this.isLoading_ = true;
                this.loadingQueryIndex = -1;
                this.next();
            };
            FileLoader.prototype.next = function () {
                var _this = this;
                this.currentCount = this.loadingQueryIndex + 1;
                this.totalCount = this.loadingQueries.length;
                var progress = this.currentCount / this.totalCount;
                if (this.currentCount == 0) {
                    this.dispatchEvent(new io.FileLoaderProgressEvent(io.FileLoaderProgressEvent.START, this, progress, this.currentCount, this.totalCount));
                }
                else {
                    this.dispatchEvent(new io.FileLoaderProgressEvent(io.FileLoaderProgressEvent.PROGRESS, this, progress, this.currentCount, this.totalCount));
                }
                var _loop_1 = function () {
                    if (this_1.loadingQueryIndex + 1 < this_1.totalCount) {
                        ++this_1.currentThreadCount;
                        ++this_1.loadingQueryIndex;
                        var query_1 = this_1.loadingQueries[this_1.loadingQueryIndex];
                        query_1.isLoading = true;
                        query_1.isLoadComplete = false;
                        trace('[FileLoader] loading... ' + '\'' + query_1.url + '\' as \'' + query_1.type + '\'');
                        var handler = this_1.handlersByType[query_1.type];
                        if (handler) {
                            handler.load(query_1.url, function (content, info) {
                                if (info === void 0) { info = null; }
                                _this.fileLoadCompleteHandler(query_1, content, info);
                            }, function (info) {
                                if (info === void 0) { info = null; }
                                _this.fileLoadErrorHandler(query_1, info);
                            });
                        }
                        else {
                            trace('[FileLoader] handler is not found \'' + query_1.type + '\'');
                            --this_1.currentThreadCount;
                        }
                    }
                    else {
                        this_1.isLoading_ = false;
                        this_1.loadingQueries = [];
                        this_1.loadingQueryIndex = -1;
                        this_1.dispatchEvent(new io.FileLoaderProgressEvent(io.FileLoaderProgressEvent.COMPLETE, this_1, progress, this_1.currentCount, this_1.totalCount));
                        return "break";
                    }
                };
                var this_1 = this;
                while (this.currentThreadCount < this.totalThreadCount) {
                    var state_1 = _loop_1();
                    if (state_1 === "break")
                        break;
                }
            };
            FileLoader.prototype.addHandler = function (handler) {
                this.handlersByType[handler.getType()] = handler;
            };
            FileLoader.prototype.getQueryByQueryId = function (queryId) {
                return this.queriesByQueryId[queryId];
            };
            FileLoader.prototype.getQueryByUrl = function (url) {
                return this.queriesByUrl[url];
            };
            FileLoader.prototype.isLoading = function () {
                return this.isLoading_;
            };
            FileLoader.prototype.getCurrentCount = function () {
                return this.currentCount;
            };
            FileLoader.prototype.getTotalCount = function () {
                return this.totalCount;
            };
            FileLoader.prototype.getContentByUrl = function (url) {
                return this.queriesByUrl[url].content;
            };
            FileLoader.prototype.getContentByQueryId = function (textureId) {
                return this.queriesByQueryId[textureId].content;
            };
            FileLoader.prototype.getCurrentThreadCount = function () {
                return this.currentThreadCount;
            };
            FileLoader.prototype.getTotalThreadCount = function () {
                return this.totalThreadCount;
            };
            FileLoader.id = 0;
            return FileLoader;
        }(EventDispatcher));
        io.FileLoader = FileLoader;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        var FileLoaderProgressEvent = (function (_super) {
            __extends(FileLoaderProgressEvent, _super);
            function FileLoaderProgressEvent(eventType, eventTarget, progress, loadedCount, totalCount) {
                if (progress === void 0) { progress = 0; }
                if (loadedCount === void 0) { loadedCount = 0; }
                if (totalCount === void 0) { totalCount = 0; }
                var _this = _super.call(this, eventType, eventTarget) || this;
                _this.progress = progress;
                _this.loadedCount = loadedCount;
                _this.totalCount = totalCount;
                return _this;
            }
            FileLoaderProgressEvent.prototype.clone = function () {
                return new FileLoaderProgressEvent(this.type, this.target, this.progress, this.loadedCount, this.totalCount);
            };
            FileLoaderProgressEvent.prototype.toString = function () {
                return '[FileLoaderProgressEvent] type = ' + this.type + ', progress = ' + this.progress + ', loadedCount = ' + this.loadedCount + ', totalCount = ' + this.totalCount;
            };
            FileLoaderProgressEvent.START = 'start';
            FileLoaderProgressEvent.PROGRESS = 'progress';
            FileLoaderProgressEvent.COMPLETE = 'complete';
            return FileLoaderProgressEvent;
        }(alm.event.Event));
        io.FileLoaderProgressEvent = FileLoaderProgressEvent;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        var FileLoaderSuccessEvent = (function (_super) {
            __extends(FileLoaderSuccessEvent, _super);
            function FileLoaderSuccessEvent(eventType, eventTarget, content, info) {
                if (info === void 0) { info = null; }
                var _this = _super.call(this, eventType, eventTarget) || this;
                _this.content = content;
                _this.info = info;
                return _this;
            }
            FileLoaderSuccessEvent.prototype.clone = function () {
                return new FileLoaderSuccessEvent(this.type, this.target, this.content, this.info);
            };
            FileLoaderSuccessEvent.prototype.toString = function () {
                return '[FileLoaderSuccessEvent] type = ' + this.type + ', info = ' + this.info;
            };
            FileLoaderSuccessEvent.SUCCESS = 'success';
            return FileLoaderSuccessEvent;
        }(alm.event.Event));
        io.FileLoaderSuccessEvent = FileLoaderSuccessEvent;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        var FileLoaderErrorEvent = (function (_super) {
            __extends(FileLoaderErrorEvent, _super);
            function FileLoaderErrorEvent(eventType, eventTarget, info) {
                if (info === void 0) { info = null; }
                var _this = _super.call(this, eventType, eventTarget) || this;
                _this.info = info;
                return _this;
            }
            FileLoaderErrorEvent.prototype.clone = function () {
                return new FileLoaderErrorEvent(this.type, this.target, this.info);
            };
            FileLoaderErrorEvent.prototype.toString = function () {
                return '[FileLoaderErrorEvent] type = ' + this.type + ', info = ' + this.info;
            };
            FileLoaderErrorEvent.ERROR = 'error';
            return FileLoaderErrorEvent;
        }(alm.event.Event));
        io.FileLoaderErrorEvent = FileLoaderErrorEvent;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var io;
    (function (io) {
        var FileQuery = (function () {
            function FileQuery() {
                this.isLoading = false;
                this.isLoadComplete = false;
            }
            return FileQuery;
        }());
        io.FileQuery = FileQuery;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var audio;
    (function (audio) {
        var Cmd = alm.util.Cmd;
        var Easing = alm.math.Easing;
        var AudioClip = (function () {
            function AudioClip(context, destination, fileName, masterVolume) {
                if (fileName === void 0) { fileName = ''; }
                if (masterVolume === void 0) { masterVolume = 1; }
                this.context = context;
                this.masterVolume = masterVolume;
                this.buffer = null;
                this.sourceNode = null;
                this.isAvailable = false;
                this.duration = 0;
                this.gainNode = this.context.createGain();
                this.gainNode.connect(destination);
                this.volume = 1;
                this.applyVolume();
                if (fileName != '') {
                    this.load(fileName);
                }
            }
            AudioClip.prototype.load = function (url) {
                var _this = this;
                var request = new XMLHttpRequest();
                request.responseType = 'arraybuffer';
                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        if (request.status == 0 || request.status == 200) {
                            _this.context.decodeAudioData(request.response, function (buffer) {
                                trace('[AudioClip] load complete :', url);
                                _this.isAvailable = true;
                                _this.buffer = buffer;
                                _this.duration = _this.buffer.duration;
                            }, function (error) {
                                trace('[AudioClip] load error :', error);
                                trace(error);
                            });
                        }
                    }
                };
                request.open('GET', url, true);
                request.send('');
            };
            AudioClip.prototype.play = function (loop, overwrite) {
                if (loop === void 0) { loop = false; }
                if (overwrite === void 0) { overwrite = true; }
                if (!this.isAvailable)
                    return;
                if (!overwrite && this.sourceNode)
                    return;
                this.stop();
                this.sourceNode = this.context.createBufferSource();
                this.sourceNode.buffer = this.buffer;
                this.sourceNode.loop = loop;
                this.sourceNode.connect(this.gainNode);
                this.sourceNode.start(0);
            };
            AudioClip.prototype.stop = function () {
                if (this.sourceNode) {
                    this.sourceNode.stop();
                    this.sourceNode.disconnect(this.gainNode);
                    this.sourceNode = null;
                }
            };
            AudioClip.prototype.getVolume = function () {
                return this.volume;
            };
            AudioClip.prototype.setVolume = function (volume) {
                Cmd.stop(this.volumeTween);
                if (this.volume == volume)
                    return;
                this.volume = volume;
                this.applyVolume();
            };
            AudioClip.prototype.fadeTo = function (to, duration, onComplete) {
                var _this = this;
                if (duration === void 0) { duration = 1000; }
                if (onComplete === void 0) { onComplete = null; }
                Cmd.stop(this.volumeTween);
                this.volumeTween = new cmd.Tween(this, { volume: to }, null, duration, Easing.linear, null, function () {
                    _this.applyVolume();
                }, function () {
                    if (onComplete)
                        onComplete();
                });
                this.volumeTween.execute();
            };
            AudioClip.prototype.fadeIn = function (duration) {
                if (duration === void 0) { duration = 1000; }
                this.fadeTo(1, duration);
            };
            AudioClip.prototype.fadeOut = function (duration, stopOnComplete) {
                var _this = this;
                if (duration === void 0) { duration = 1000; }
                if (stopOnComplete === void 0) { stopOnComplete = true; }
                this.fadeTo(0, duration, function () {
                    if (stopOnComplete) {
                        _this.stop();
                    }
                });
            };
            AudioClip.prototype.applyVolume = function () {
                this.gainNode.gain.value = this.volume * this.masterVolume;
            };
            AudioClip.prototype.getIsAvailable = function () {
                return this.isAvailable;
            };
            AudioClip.prototype.getDuration = function () {
                return this.duration;
            };
            AudioClip.prototype.getCurrentTime = function () {
                return this.context.currentTime;
            };
            return AudioClip;
        }());
        audio.AudioClip = AudioClip;
    })(audio = alm.audio || (alm.audio = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var audio;
    (function (audio) {
        var EventDispatcher = alm.event.EventDispatcher;
        var AudioPlayer = (function (_super) {
            __extends(AudioPlayer, _super);
            function AudioPlayer() {
                var _this = _super.call(this) || this;
                var AudioContext = window['AudioContext'] || window['webkitAudioContext'] || null;
                _this.isAvailable = AudioContext != null;
                if (_this.isAvailable) {
                    _this.context = new AudioContext();
                    _this.clipsById = {};
                    _this.masterGainNode = _this.context.createGain();
                    _this.masterGainNode.connect(_this.context.destination);
                    _this.masterVolume = 1;
                }
                return _this;
            }
            AudioPlayer.prototype.add = function (url, masterVolute, id) {
                if (masterVolute === void 0) { masterVolute = 1; }
                if (id === void 0) { id = ''; }
                if (!this.isAvailable)
                    return false;
                if (id == '')
                    id = url;
                if (this.clipsById[id])
                    return false;
                this.clipsById[id] = new audio.AudioClip(this.context, this.masterGainNode, url, masterVolute);
                return true;
            };
            AudioPlayer.prototype.getClip = function (id) {
                if (!this.isAvailable)
                    return;
                return this.clipsById[id];
            };
            AudioPlayer.prototype.getMasterVolume = function () {
                if (!this.isAvailable)
                    return 0;
                return this.masterVolume;
            };
            AudioPlayer.prototype.setMasterVolume = function (volume) {
                if (!this.isAvailable)
                    return;
                this.masterVolume = volume;
                this.masterGainNode.gain.value = this.masterVolume;
            };
            AudioPlayer.getInstance = function () { return AudioPlayer.instance || (AudioPlayer.instance = new AudioPlayer()); };
            AudioPlayer.instance = null;
            return AudioPlayer;
        }(EventDispatcher));
        audio.AudioPlayer = AudioPlayer;
    })(audio = alm.audio || (alm.audio = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var audio;
    (function (audio) {
        var CrossOverLoopAudio = (function () {
            function CrossOverLoopAudio(crossOverDuration) {
                var _this = this;
                if (crossOverDuration === void 0) { crossOverDuration = 1; }
                this.timerHandler = function () {
                    if (++_this.clipIndex == _this.clipCount)
                        _this.clipIndex = 0;
                    _this.playCurrent();
                };
                this.audioPlayer = audio.AudioPlayer.getInstance();
                this.clipCount = 0;
                this.clipIndex = 0;
                this.clipIds = [];
                this.clip = null;
                this.isPlaying = false;
                this.volume = 1;
                this.crossOverDuration = crossOverDuration;
                this.timeoutId = -1;
            }
            CrossOverLoopAudio.prototype.add = function (url, masterVolume) {
                if (masterVolume === void 0) { masterVolume = 1; }
                var id = url + '-' + this.clipCount;
                this.audioPlayer.add(url, masterVolume, id);
                this.clipIds.push(id);
                this.clipCount = this.clipIds.length;
            };
            CrossOverLoopAudio.prototype.play = function () {
                if (this.isPlaying)
                    return;
                this.isPlaying = true;
                this.playCurrent();
            };
            CrossOverLoopAudio.prototype.stop = function () {
                if (!this.isPlaying)
                    return;
                this.isPlaying = false;
                this.stopCurrent();
            };
            CrossOverLoopAudio.prototype.setVolume = function (volume) {
                this.volume = volume;
                if (this.clip) {
                    this.clip.setVolume(this.volume);
                }
            };
            CrossOverLoopAudio.prototype.playCurrent = function () {
                this.clip = this.audioPlayer.getClip(this.clipIds[this.clipIndex]);
                this.clip.setVolume(this.volume);
                this.clip.play(false, true);
                var interval = (this.clip.getDuration() - this.crossOverDuration) * 1000;
                this.timeoutId = window.setTimeout(this.timerHandler, interval);
            };
            CrossOverLoopAudio.prototype.stopCurrent = function () {
                if (this.timeoutId != -1) {
                    window.clearTimeout(this.timeoutId);
                    this.timeoutId = -1;
                }
                if (this.clip) {
                    this.clip.stop();
                    this.clip = null;
                }
            };
            return CrossOverLoopAudio;
        }());
        audio.CrossOverLoopAudio = CrossOverLoopAudio;
    })(audio = alm.audio || (alm.audio = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var audio;
    (function (audio) {
        var Num = alm.util.Num;
        var Easing = alm.math.Easing;
        var FootstepAudio = (function () {
            function FootstepAudio(intervalMin, intervalMax) {
                var _this = this;
                if (intervalMin === void 0) { intervalMin = 0.12; }
                if (intervalMax === void 0) { intervalMax = 0.6; }
                this.timerHandler = function () {
                    var interval = _this.isWaitingForFirstStep ? (_this.interval * 0.5) : _this.interval;
                    var time = new Date().getTime();
                    if (time - _this.startTime >= interval * 1000) {
                        _this.startTime = time;
                        _this.isWaitingForFirstStep = false;
                        if (++_this.clipIndex >= _this.clipCount) {
                            _this.clipIndex = 0;
                        }
                        var clipId = _this.clipIds[_this.clipIndex];
                        _this.audioPlayer.getClip(clipId).setVolume(_this.volume);
                        _this.audioPlayer.getClip(clipId).play(false, true);
                    }
                };
                this.audioPlayer = audio.AudioPlayer.getInstance();
                this.intervalMin = intervalMin;
                this.intervalMax = intervalMax;
                this.intervalId = -1;
                this.interval = this.intervalMax;
                this.clipIndex = -1;
                this.clipCount = 0;
                this.clipIds = [];
                this.isPlaying = false;
                this.volume = 1;
            }
            FootstepAudio.prototype.add = function (url, masterVolume) {
                if (masterVolume === void 0) { masterVolume = 1; }
                var id = url + '-' + this.clipCount;
                this.audioPlayer.add(url, masterVolume, id);
                this.clipIds.push(id);
                this.clipCount = this.clipIds.length;
            };
            FootstepAudio.prototype.play = function (immediately) {
                if (immediately === void 0) { immediately = true; }
                if (this.isPlaying)
                    return;
                this.isPlaying = true;
                this.isWaitingForFirstStep = true;
                this.startTime = immediately ? 0 : new Date().getTime();
                this.intervalId = window.setInterval(this.timerHandler, 1000 / 60);
                this.timerHandler();
            };
            FootstepAudio.prototype.stop = function () {
                if (!this.isPlaying)
                    return;
                this.isPlaying = false;
                window.clearInterval(this.intervalId);
            };
            FootstepAudio.prototype.setSpeed = function (speedRatio) {
                this.interval = Num.ease(speedRatio, 0, 1, this.intervalMax, this.intervalMin, Easing.easeOutSine);
            };
            FootstepAudio.prototype.setVolume = function (volume) {
                this.volume = volume;
            };
            return FootstepAudio;
        }());
        audio.FootstepAudio = FootstepAudio;
    })(audio = alm.audio || (alm.audio = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var view;
    (function (view) {
        var Event = alm.event.Event;
        var ViewEvent = (function (_super) {
            __extends(ViewEvent, _super);
            function ViewEvent(eventType, eventTarget) {
                return _super.call(this, eventType, eventTarget) || this;
            }
            ViewEvent.prototype.clone = function () {
                return new ViewEvent(this.type, this.target);
            };
            ViewEvent.prototype.toString = function () {
                return '[ViewEvent] type = ' + this.type;
            };
            ViewEvent.INITIALIZE_BEGIN = 'initializeBegin';
            ViewEvent.INITIALIZE_END = 'initializeEnd';
            ViewEvent.FINALIZE_BEGIN = 'finalizeBegin';
            ViewEvent.FINALIZE_END = 'finalizeEnd';
            ViewEvent.READY_BEGIN = 'readyBegin';
            ViewEvent.READY_END = 'readyEnd';
            ViewEvent.SHOW_BEGIN = 'showBegin';
            ViewEvent.SHOW_END = 'showEnd';
            ViewEvent.HIDE_BEGIN = 'hideBegin';
            ViewEvent.HIDE_END = 'hideEnd';
            return ViewEvent;
        }(Event));
        view.ViewEvent = ViewEvent;
    })(view = alm.view || (alm.view = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var view;
    (function (view_1) {
        var EventDispatcher = alm.event.EventDispatcher;
        var Logger = alm.debug.Logger;
        var View = (function (_super) {
            __extends(View, _super);
            function View(view, id) {
                if (view === void 0) { view = null; }
                if (id === void 0) { id = null; }
                var _this = _super.call(this) || this;
                _this.id = id != null ? id : String(View.viewCount);
                _this.view = view;
                _this.name = '';
                _this.autoHideWithInit = true;
                _this.isInitializing = false;
                _this.isInitialized = false;
                _this.isFinalizing = false;
                _this.isFinalized = false;
                _this.isReadying = false;
                _this.isReadied = false;
                _this.isShowing = false;
                _this.isShown = true;
                _this.isHiding = false;
                if (View.viewsById[_this.id]) {
                    Logger.warn('view id \'' + _this.id + '\' is duplicate');
                }
                View.viewsById[_this.id] = _this;
                ++View.viewCount;
                return _this;
            }
            View.prototype.initialize = function () {
                if (this.isInitializing || this.isInitialized)
                    return;
                this.isInitializing = true;
                this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.INITIALIZE_BEGIN, this));
                this.view = this.implInitialize();
                if (this.isInitializing) {
                    throwError(this.name || this, 'view is not assigned', !this.view);
                    if (this.autoHideWithInit) {
                        this.hide(false);
                    }
                    this.isInitializing = false;
                    this.isInitialized = true;
                    this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.INITIALIZE_END, this));
                }
                else {
                    this.view = null;
                }
            };
            View.prototype.ready = function () {
                if (this.isReadying || this.isReadied)
                    return;
                this.isReadying = true;
                throwError(this.name || this, 'ready() must be called after initialize()', !this.isInitialized);
                this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.READY_BEGIN, this));
                this.implReady();
                this.isReadying = false;
                this.isReadied = true;
                this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.READY_END, this));
            };
            View.prototype.finalize = function () {
                if (!this.isInitializing && !this.isInitialized)
                    return;
                if (this.isFinalizing && this.isFinalized)
                    return;
                this.isFinalizing = true;
                this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.FINALIZE_BEGIN, this));
                this.implFinalize();
                this.isFinalizing = false;
                this.isFinalized = true;
                this.isInitializing = false;
                this.isInitialized = false;
                this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.FINALIZE_END, this));
                delete View.viewsById[this.id];
                View.viewsById[this.id] = null;
            };
            View.prototype.show = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                if (this.isShown)
                    return;
                this.getShowCommand(useTransition).execute();
            };
            View.prototype.hide = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                if (!this.isShown)
                    return;
                this.getHideCommand(useTransition).execute();
            };
            View.prototype.getShowCommand = function (useTransition) {
                var _this = this;
                if (useTransition === void 0) { useTransition = true; }
                var command = new cmd.Serial();
                command.addCommand(new cmd.Func(function () {
                    if (_this.isShown)
                        return;
                    throwError(_this.name || _this, 'getShowCommand() is must be called after initialize()', _this.isInitializing || !_this.isInitialized);
                    throwWarn(_this.name || _this, 'getShowCommand() is must be called after ready()', _this.isReadying || !_this.isReadied);
                    _this.isShown = true;
                    _this.isShowing = true;
                    _this.isHiding = false;
                    if (_this.showCommand) {
                        _this.showCommand.interrupt();
                        _this.showCommand = null;
                    }
                    if (_this.hideCommand) {
                        _this.hideCommand.interrupt();
                        _this.hideCommand = null;
                    }
                    _this.showCommand = command;
                    _this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.SHOW_BEGIN, _this));
                    command.insertCommand(_this.implShow(_this.view, useTransition), new cmd.Func(function () {
                        _this.showCommand = null;
                        _this.isShowing = false;
                        _this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.SHOW_END, _this));
                    }));
                }));
                return command;
            };
            View.prototype.getHideCommand = function (useTransition) {
                var _this = this;
                if (useTransition === void 0) { useTransition = true; }
                var command = new cmd.Serial();
                command.addCommand(new cmd.Func(function () {
                    if (!_this.isShown)
                        return;
                    if (!_this.isInitializing) {
                        throwError(_this.name || _this, 'getHideCommand() is must be called after initialize()', _this.isInitializing || !_this.isInitialized);
                        throwWarn(_this.name || _this, 'getHideCommand() is must be called after ready()', _this.isReadying || !_this.isReadied);
                    }
                    _this.isShown = false;
                    _this.isShowing = false;
                    _this.isHiding = true;
                    if (_this.showCommand) {
                        _this.showCommand.interrupt();
                        _this.showCommand = null;
                    }
                    if (_this.hideCommand) {
                        _this.hideCommand.interrupt();
                        _this.hideCommand = null;
                    }
                    _this.hideCommand = command;
                    _this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.HIDE_BEGIN, _this));
                    command.insertCommand(_this.implHide(_this.view, useTransition), new cmd.Func(function () {
                        _this.hideCommand = null;
                        _this.isHiding = false;
                        _this.dispatchEvent(new view_1.ViewEvent(view_1.ViewEvent.HIDE_END, _this));
                    }));
                }));
                return command;
            };
            View.prototype.getIsInitializing = function () {
                return this.isInitializing;
            };
            View.prototype.getIsInitialized = function () {
                return this.isInitialized;
            };
            View.prototype.getIsReadying = function () {
                return this.isReadying;
            };
            View.prototype.getIsReadied = function () {
                return this.isReadied;
            };
            View.prototype.getIsShowing = function () {
                return this.isShowing;
            };
            View.prototype.getIsShown = function () {
                return this.isShown;
            };
            View.prototype.getIsHiding = function () {
                return this.isHiding;
            };
            View.prototype.getIsHidden = function () {
                return !this.isShown;
            };
            View.prototype.getIsFinalizing = function () {
                return this.isFinalizing;
            };
            View.prototype.getIsFinalized = function () {
                return this.isFinalized;
            };
            View.prototype.getId = function () {
                return this.id;
            };
            View.prototype.getView = function () {
                return this.view;
            };
            View.prototype.getName = function () {
                return this.name;
            };
            View.prototype.setName = function (value) {
                this.name = value;
            };
            View.prototype.getAutoHideWithInit = function () {
                return this.autoHideWithInit;
            };
            View.prototype.setAutoHideWithInit = function (value) {
                this.autoHideWithInit = value;
            };
            View.getViewById = function (id) {
                return View.viewsById[id];
            };
            View.viewCount = 0;
            View.viewsById = {};
            return View;
        }(EventDispatcher));
        view_1.View = View;
    })(view = alm.view || (alm.view = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var view;
    (function (view) {
        var ButtonBehavior = (function () {
            function ButtonBehavior(target, hitArea, isHoverCursorEnabled, isPreventDefaultEnabled, isStopPropagationEnabled) {
                var _this = this;
                if (hitArea === void 0) { hitArea = null; }
                if (isHoverCursorEnabled === void 0) { isHoverCursorEnabled = true; }
                if (isPreventDefaultEnabled === void 0) { isPreventDefaultEnabled = true; }
                if (isStopPropagationEnabled === void 0) { isStopPropagationEnabled = true; }
                this.mouseOverHandler = function (event) {
                    if (_this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (_this.isStopPropagationEnabled)
                        event.stopPropagation();
                    _this.over();
                    _this.applyMouseCursor();
                };
                this.mouseOutHandler = function (event) {
                    if (_this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (_this.isStopPropagationEnabled)
                        event.stopPropagation();
                    _this.out();
                    _this.applyMouseCursor();
                };
                this.mouseDownHandler = function (event) {
                    if (_this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (_this.isStopPropagationEnabled)
                        event.stopPropagation();
                    _this.down();
                };
                this.mouseUpHandler = function (event) {
                    if (_this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (_this.isStopPropagationEnabled)
                        event.stopPropagation();
                    _this.up();
                };
                this.clickHandler = function (event) {
                    if (_this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (_this.isStopPropagationEnabled)
                        event.stopPropagation();
                    _this.click();
                };
                this.touchStartHandler = function (event) {
                    if (_this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (_this.isStopPropagationEnabled)
                        event.stopPropagation();
                    _this.down();
                };
                this.touchEndHandler = function (event) {
                    if (_this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (_this.isStopPropagationEnabled)
                        event.stopPropagation();
                    _this.up();
                    _this.click();
                };
                this.touchCancelHandler = function (event) {
                    if (_this.isPreventDefaultEnabled)
                        event.preventDefault();
                    if (_this.isStopPropagationEnabled)
                        event.stopPropagation();
                    _this.up();
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
            ButtonBehavior.prototype.over = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                this.isOverInternal = true;
                if (this.isEnabled) {
                    if (this.isOver)
                        return;
                    this.isOver = true;
                    this.target.implButtonOver(useTransition);
                }
            };
            ButtonBehavior.prototype.out = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                this._out(true, useTransition);
            };
            ButtonBehavior.prototype._out = function (checkEnabled, useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                this.isOverInternal = false;
                if (this.isEnabled || !checkEnabled) {
                    if (!this.isOver)
                        return;
                    this.isOver = false;
                    this.target.implButtonOut(useTransition);
                }
            };
            ButtonBehavior.prototype.down = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                this.isDownInternal = true;
                if (this.isEnabled) {
                    if (this.isDown)
                        return;
                    this.isDown = true;
                    this.target.implButtonDown(useTransition);
                }
            };
            ButtonBehavior.prototype.up = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                this._up(true, useTransition);
            };
            ButtonBehavior.prototype._up = function (checkEnabled, useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                this.isDownInternal = false;
                if (this.isEnabled || !checkEnabled) {
                    if (!this.isDown)
                        return;
                    this.isDown = false;
                    this.target.implButtonUp(useTransition);
                }
            };
            ButtonBehavior.prototype.click = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                if (this.isEnabled) {
                    this.target.implButtonClick(useTransition);
                }
            };
            ButtonBehavior.prototype.on = function () {
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
            };
            ButtonBehavior.prototype.off = function () {
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
            };
            ButtonBehavior.prototype.getIsEnabled = function () {
                return this.isEnabled;
            };
            ButtonBehavior.prototype.setIsEnabled = function (value, useTransition) {
                if (useTransition === void 0) { useTransition = true; }
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
            };
            ButtonBehavior.prototype.getIsOver = function () {
                return this.isOver;
            };
            ButtonBehavior.prototype.getIsDown = function () {
                return this.isDown;
            };
            ButtonBehavior.prototype.getHitArea = function () {
                return this.hitArea;
            };
            ButtonBehavior.prototype.setHitArea = function (hitArea) {
                if (this.hitArea !== hitArea) {
                    this.off();
                    this.hitArea = hitArea;
                    this.on();
                }
            };
            ButtonBehavior.prototype.clearHitArea = function () {
                this.setHitArea(null);
            };
            ButtonBehavior.prototype.getIsPreventDefaultEnabled = function () {
                return this.isPreventDefaultEnabled;
            };
            ButtonBehavior.prototype.setIsPreventDefaultEnabled = function (enabled) {
                this.isPreventDefaultEnabled = enabled;
            };
            ButtonBehavior.prototype.getIsStopPropagationEnabled = function () {
                return this.isStopPropagationEnabled;
            };
            ButtonBehavior.prototype.setIsStopPropagationEnabled = function (enabled) {
                this.isStopPropagationEnabled = enabled;
            };
            ButtonBehavior.prototype.getIsHoverCursorEnabled = function () {
                return this.isHoverCursorEnabled;
            };
            ButtonBehavior.prototype.setIsHoverCursorEnabled = function (enabled) {
                this.isHoverCursorEnabled = enabled;
            };
            ButtonBehavior.prototype.applyMouseCursor = function () {
                if (this.isHoverCursorEnabled) {
                    if (this.isOverInternal && this.isEnabled && this.hitArea != null) {
                        this.defaultMouseCursor = this.hitArea.style.cursor;
                        this.hitArea.style.cursor = 'pointer';
                    }
                    else {
                        this.hitArea.style.cursor = this.defaultMouseCursor != '' ? this.defaultMouseCursor : 'auto';
                    }
                }
            };
            return ButtonBehavior;
        }());
        view.ButtonBehavior = ButtonBehavior;
    })(view = alm.view || (alm.view = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var view;
    (function (view) {
        var SelectionBehavior = (function () {
            function SelectionBehavior(target) {
                this.target = target;
            }
            SelectionBehavior.prototype.select = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                if (this.isSelected)
                    return;
                this.isSelected = true;
                this.target.implSelectionChanged(this.isSelected, useTransition);
            };
            SelectionBehavior.prototype.deselect = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                if (!this.isSelected)
                    return;
                this.isSelected = false;
                this.target.implSelectionChanged(this.isSelected, useTransition);
            };
            SelectionBehavior.prototype.getIsSelected = function () {
                return this.isSelected;
            };
            return SelectionBehavior;
        }());
        view.SelectionBehavior = SelectionBehavior;
    })(view = alm.view || (alm.view = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var DeviceInfo = (function () {
            function DeviceInfo() {
            }
            DeviceInfo.initialize = function () {
                if (this.isInitialized)
                    return;
                this.isInitialized = true;
                var u = window.navigator.userAgent.toLowerCase();
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
                this.isTouchEnabled = (typeof window.ontouchstart) !== 'undefined';
                this.isDownloadEnabled = !this.isIOS;
                this.devicePixelRatio = window.devicePixelRatio;
                this.isRetina = this.devicePixelRatio > 1;
            };
            DeviceInfo.getIsDesktop = function () {
                this.initialize();
                return this.isDesktop;
            };
            DeviceInfo.getIsTablet = function () {
                this.initialize();
                return this.isTablet;
            };
            DeviceInfo.getIsMobile = function () {
                this.initialize();
                return this.isMobile;
            };
            DeviceInfo.getIsIOS = function () {
                this.initialize();
                return this.isIOS;
            };
            DeviceInfo.getIsAndroid = function () {
                this.initialize();
                return this.isAndroid;
            };
            DeviceInfo.getIsIE = function () {
                this.initialize();
                return this.isIE;
            };
            DeviceInfo.getIsEdge = function () {
                this.initialize();
                return this.isEdge;
            };
            DeviceInfo.getIsChrome = function () {
                this.initialize();
                return this.isChrome;
            };
            DeviceInfo.getIsSafari = function () {
                this.initialize();
                return this.isSafari;
            };
            DeviceInfo.getIsFireFox = function () {
                this.initialize();
                return this.isFireFox;
            };
            DeviceInfo.getIsOpera = function () {
                this.initialize();
                return this.isOpera;
            };
            DeviceInfo.getIsUnknownBrowser = function () {
                this.initialize();
                return this.isUnknownBrowser;
            };
            DeviceInfo.getIsTouchEnabled = function () {
                this.initialize();
                return this.isTouchEnabled;
            };
            DeviceInfo.getIsDownloadEnabled = function () {
                this.initialize();
                return this.isDownloadEnabled;
            };
            DeviceInfo.getIsRetina = function () {
                this.initialize();
                return this.isRetina;
            };
            DeviceInfo.getDevicePixelRatio = function () {
                this.initialize();
                return this.devicePixelRatio;
            };
            DeviceInfo.getDpi = function () {
                if (this.dpi == -1) {
                    var div = document.createElement('div');
                    div.setAttribute('style', 'height:1in;left:-100%;top:-100%;position:absolute;width:1in;');
                    document.body.appendChild(div);
                    this.dpi = div.offsetHeight;
                    document.body.removeChild(div);
                }
                return this.dpi;
            };
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
            DeviceInfo.isRetina = false;
            DeviceInfo.devicePixelRatio = 1;
            DeviceInfo.dpi = -1;
            DeviceInfo.isInitialized = false;
            return DeviceInfo;
        }());
        browser.DeviceInfo = DeviceInfo;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var Time = alm.util.Time;
        var LocalStorage = (function () {
            function LocalStorage() {
            }
            LocalStorage.save = function (key, value, expiredAt) {
                if (expiredAt === void 0) { expiredAt = -1; }
                if (!LocalStorage.isAvailable())
                    return false;
                var record = { value: JSON.stringify(value), expiredAt: expiredAt };
                localStorage.setItem(key, JSON.stringify(record));
                return true;
            };
            LocalStorage.saveWithTerm = function (key, value, milliseconds) {
                if (milliseconds === void 0) { milliseconds = -1; }
                var expiredAt = milliseconds > 0 ? Time.now() + milliseconds : -1;
                return LocalStorage.save(key, value, expiredAt);
            };
            LocalStorage.load = function (key, defaultValue) {
                if (defaultValue === void 0) { defaultValue = null; }
                if (!LocalStorage.isAvailable())
                    return defaultValue;
                var record = JSON.parse(localStorage.getItem(key));
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
            };
            LocalStorage.remove = function (key) {
                if (!LocalStorage.isAvailable())
                    return;
                localStorage.removeItem(key);
            };
            LocalStorage.isAvailable = function () {
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
            };
            LocalStorage.toMilliseconds = function (dates, hours, minutes, seconds, milliseconds) {
                if (dates === void 0) { dates = 0; }
                if (hours === void 0) { hours = 0; }
                if (minutes === void 0) { minutes = 0; }
                if (seconds === void 0) { seconds = 0; }
                if (milliseconds === void 0) { milliseconds = 0; }
                return milliseconds + (seconds + (minutes + (hours + dates * 24) * 60) * 60) * 1000;
            };
            LocalStorage.isAvailable_ = null;
            return LocalStorage;
        }());
        browser.LocalStorage = LocalStorage;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var KeyCode;
        (function (KeyCode) {
            KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
            KeyCode[KeyCode["Tab"] = 9] = "Tab";
            KeyCode[KeyCode["Enter"] = 13] = "Enter";
            KeyCode[KeyCode["Shift"] = 16] = "Shift";
            KeyCode[KeyCode["Ctrl"] = 17] = "Ctrl";
            KeyCode[KeyCode["Alt"] = 18] = "Alt";
            KeyCode[KeyCode["PauseBreak"] = 19] = "PauseBreak";
            KeyCode[KeyCode["CapsLock"] = 20] = "CapsLock";
            KeyCode[KeyCode["Escape"] = 27] = "Escape";
            KeyCode[KeyCode["Space"] = 32] = "Space";
            KeyCode[KeyCode["PageUp"] = 33] = "PageUp";
            KeyCode[KeyCode["PageDown"] = 34] = "PageDown";
            KeyCode[KeyCode["End"] = 35] = "End";
            KeyCode[KeyCode["Home"] = 36] = "Home";
            KeyCode[KeyCode["LeftArrow"] = 37] = "LeftArrow";
            KeyCode[KeyCode["UpArrow"] = 38] = "UpArrow";
            KeyCode[KeyCode["RightArrow"] = 39] = "RightArrow";
            KeyCode[KeyCode["DownArrow"] = 40] = "DownArrow";
            KeyCode[KeyCode["Insert"] = 45] = "Insert";
            KeyCode[KeyCode["Delete"] = 46] = "Delete";
            KeyCode[KeyCode["Key0"] = 48] = "Key0";
            KeyCode[KeyCode["Key1"] = 49] = "Key1";
            KeyCode[KeyCode["Key2"] = 50] = "Key2";
            KeyCode[KeyCode["Key3"] = 51] = "Key3";
            KeyCode[KeyCode["Key4"] = 52] = "Key4";
            KeyCode[KeyCode["Key5"] = 53] = "Key5";
            KeyCode[KeyCode["Key6"] = 54] = "Key6";
            KeyCode[KeyCode["Key7"] = 55] = "Key7";
            KeyCode[KeyCode["Key8"] = 56] = "Key8";
            KeyCode[KeyCode["Key9"] = 57] = "Key9";
            KeyCode[KeyCode["ClosedParen"] = 48] = "ClosedParen";
            KeyCode[KeyCode["ExclamationMark"] = 49] = "ExclamationMark";
            KeyCode[KeyCode["AtSign"] = 50] = "AtSign";
            KeyCode[KeyCode["PoundSign"] = 51] = "PoundSign";
            KeyCode[KeyCode["Hash"] = 51] = "Hash";
            KeyCode[KeyCode["DollarSign"] = 52] = "DollarSign";
            KeyCode[KeyCode["PercentSign"] = 53] = "PercentSign";
            KeyCode[KeyCode["Caret"] = 54] = "Caret";
            KeyCode[KeyCode["Hat"] = 54] = "Hat";
            KeyCode[KeyCode["Ampersand"] = 55] = "Ampersand";
            KeyCode[KeyCode["Star"] = 56] = "Star";
            KeyCode[KeyCode["Asterik"] = 56] = "Asterik";
            KeyCode[KeyCode["OpenParen"] = 57] = "OpenParen";
            KeyCode[KeyCode["A"] = 65] = "A";
            KeyCode[KeyCode["B"] = 66] = "B";
            KeyCode[KeyCode["C"] = 67] = "C";
            KeyCode[KeyCode["D"] = 68] = "D";
            KeyCode[KeyCode["E"] = 69] = "E";
            KeyCode[KeyCode["F"] = 70] = "F";
            KeyCode[KeyCode["G"] = 71] = "G";
            KeyCode[KeyCode["H"] = 72] = "H";
            KeyCode[KeyCode["I"] = 73] = "I";
            KeyCode[KeyCode["J"] = 74] = "J";
            KeyCode[KeyCode["K"] = 75] = "K";
            KeyCode[KeyCode["L"] = 76] = "L";
            KeyCode[KeyCode["M"] = 77] = "M";
            KeyCode[KeyCode["N"] = 78] = "N";
            KeyCode[KeyCode["O"] = 79] = "O";
            KeyCode[KeyCode["P"] = 80] = "P";
            KeyCode[KeyCode["Q"] = 81] = "Q";
            KeyCode[KeyCode["R"] = 82] = "R";
            KeyCode[KeyCode["S"] = 83] = "S";
            KeyCode[KeyCode["T"] = 84] = "T";
            KeyCode[KeyCode["U"] = 85] = "U";
            KeyCode[KeyCode["V"] = 86] = "V";
            KeyCode[KeyCode["W"] = 87] = "W";
            KeyCode[KeyCode["X"] = 88] = "X";
            KeyCode[KeyCode["Y"] = 89] = "Y";
            KeyCode[KeyCode["Z"] = 90] = "Z";
            KeyCode[KeyCode["LeftWindowKey"] = 91] = "LeftWindowKey";
            KeyCode[KeyCode["RightWindowKey"] = 92] = "RightWindowKey";
            KeyCode[KeyCode["SelectKey"] = 93] = "SelectKey";
            KeyCode[KeyCode["Numpad0"] = 96] = "Numpad0";
            KeyCode[KeyCode["Numpad1"] = 97] = "Numpad1";
            KeyCode[KeyCode["Numpad2"] = 98] = "Numpad2";
            KeyCode[KeyCode["Numpad3"] = 99] = "Numpad3";
            KeyCode[KeyCode["Numpad4"] = 100] = "Numpad4";
            KeyCode[KeyCode["Numpad5"] = 101] = "Numpad5";
            KeyCode[KeyCode["Numpad6"] = 102] = "Numpad6";
            KeyCode[KeyCode["Numpad7"] = 103] = "Numpad7";
            KeyCode[KeyCode["Numpad8"] = 104] = "Numpad8";
            KeyCode[KeyCode["Numpad9"] = 105] = "Numpad9";
            KeyCode[KeyCode["Multiply"] = 106] = "Multiply";
            KeyCode[KeyCode["Add"] = 107] = "Add";
            KeyCode[KeyCode["Subtract"] = 109] = "Subtract";
            KeyCode[KeyCode["DecimalPoint"] = 110] = "DecimalPoint";
            KeyCode[KeyCode["Divide"] = 111] = "Divide";
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
            KeyCode[KeyCode["NumLock"] = 144] = "NumLock";
            KeyCode[KeyCode["ScrollLock"] = 145] = "ScrollLock";
            KeyCode[KeyCode["SemiColon"] = 186] = "SemiColon";
            KeyCode[KeyCode["Equals"] = 187] = "Equals";
            KeyCode[KeyCode["Comma"] = 188] = "Comma";
            KeyCode[KeyCode["Dash"] = 189] = "Dash";
            KeyCode[KeyCode["Period"] = 190] = "Period";
            KeyCode[KeyCode["UnderScore"] = 189] = "UnderScore";
            KeyCode[KeyCode["PlusSign"] = 187] = "PlusSign";
            KeyCode[KeyCode["ForwardSlash"] = 191] = "ForwardSlash";
            KeyCode[KeyCode["Tilde"] = 192] = "Tilde";
            KeyCode[KeyCode["GraveAccent"] = 192] = "GraveAccent";
            KeyCode[KeyCode["OpenBracket"] = 219] = "OpenBracket";
            KeyCode[KeyCode["ClosedBracket"] = 221] = "ClosedBracket";
            KeyCode[KeyCode["Quote"] = 222] = "Quote";
        })(KeyCode = browser.KeyCode || (browser.KeyCode = {}));
        var KeyWatcher = (function () {
            function KeyWatcher() {
            }
            KeyWatcher.initialize = function () {
                if (this.isInitialized)
                    return;
                this.isInitialized = true;
                this.eventDispatcher = new alm.event.EventDispatcher();
            };
            KeyWatcher.start = function () {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                this.initialize();
                trace('[KeyWatcher] start');
                window.addEventListener('keydown', this.windowKeyDownHandler);
                window.addEventListener('keyup', this.windowKeyUpHandler);
            };
            KeyWatcher.stop = function () {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                this.initialize();
                trace('[KeyWatcher] stop');
                window.removeEventListener('keydown', this.windowKeyDownHandler);
                window.removeEventListener('keyup', this.windowKeyUpHandler);
            };
            KeyWatcher.addEventListener = function (eventType, listener) {
                this.initialize();
                this.eventDispatcher.addEventListener(eventType, listener);
            };
            KeyWatcher.removeEventListener = function (eventType, listener) {
                this.initialize();
                this.eventDispatcher.removeEventListener(eventType, listener);
            };
            KeyWatcher.getIsRunning = function () { return this.isRunning; };
            KeyWatcher.getIsAnyKeyPressed = function () { return this.pressedKeyCount > 0; };
            KeyWatcher.getIsKeyPressed = function (keyCode) { return this.isKeyPressedByKeyCode[keyCode] != null; };
            KeyWatcher.getIsContinuousPressEnabled = function () { return this.isContinuousPressEnabled; };
            KeyWatcher.setIsContinuousPressEnabled = function (enabled) { this.isContinuousPressEnabled = enabled; };
            KeyWatcher.windowKeyDownHandler = function (event) {
                var keyCode = event.keyCode;
                if (KeyWatcher.isKeyPressedByKeyCode[keyCode] == null) {
                    KeyWatcher.isKeyPressedByKeyCode[keyCode] = true;
                    ++KeyWatcher.pressedKeyCount;
                    KeyWatcher.eventDispatcher.dispatchEvent(new browser.KeyWatcherEvent(browser.KeyWatcherEvent.KEY_DOWN, KeyWatcher, event));
                }
                else if (KeyWatcher.isContinuousPressEnabled) {
                    KeyWatcher.eventDispatcher.dispatchEvent(new browser.KeyWatcherEvent(browser.KeyWatcherEvent.KEY_DOWN, KeyWatcher, event));
                }
            };
            KeyWatcher.windowKeyUpHandler = function (event) {
                var keyCode = event.keyCode;
                if (KeyWatcher.isKeyPressedByKeyCode[keyCode] != null) {
                    delete KeyWatcher.isKeyPressedByKeyCode[keyCode];
                    --KeyWatcher.pressedKeyCount;
                    KeyWatcher.eventDispatcher.dispatchEvent(new browser.KeyWatcherEvent(browser.KeyWatcherEvent.KEY_UP, KeyWatcher, event));
                }
            };
            KeyWatcher.isRunning = false;
            KeyWatcher.pressedKeyCount = 0;
            KeyWatcher.isKeyPressedByKeyCode = {};
            KeyWatcher.isContinuousPressEnabled = false;
            KeyWatcher.isInitialized = false;
            KeyWatcher.isLongPressed = false;
            KeyWatcher.eventDispatcher = null;
            return KeyWatcher;
        }());
        browser.KeyWatcher = KeyWatcher;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var KeyWatcherEvent = (function (_super) {
            __extends(KeyWatcherEvent, _super);
            function KeyWatcherEvent(eventType, eventTarget, originalEvent) {
                if (originalEvent === void 0) { originalEvent = null; }
                var _this = _super.call(this, eventType, eventTarget) || this;
                _this.originalEvent = originalEvent;
                _this.key = _this.originalEvent.key;
                _this.keyCode = _this.originalEvent.keyCode;
                _this.altKey = _this.originalEvent.altKey;
                _this.ctrlKey = _this.originalEvent.ctrlKey;
                _this.shiftKey = _this.originalEvent.shiftKey;
                return _this;
            }
            KeyWatcherEvent.prototype.clone = function () {
                return new KeyWatcherEvent(this.type, this.target, this.originalEvent);
            };
            KeyWatcherEvent.prototype.toString = function () {
                return '[KeyWatcherEvent] type = ' + this.type + ', key = ' + this.key + ', keyCode = ' + this.keyCode + ', altKey = ' + this.altKey + ', ctrlKey = ' + this.ctrlKey + ', shiftKey = ' + this.shiftKey;
            };
            KeyWatcherEvent.KEY_UP = 'keyUp';
            KeyWatcherEvent.KEY_DOWN = 'keyDown';
            return KeyWatcherEvent;
        }(alm.event.Event));
        browser.KeyWatcherEvent = KeyWatcherEvent;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var WindowWatcher = (function () {
            function WindowWatcher() {
            }
            WindowWatcher.initialize = function () {
                if (this.isInitialized)
                    return;
                this.isInitialized = true;
                this.eventDispatcher = new alm.event.EventDispatcher();
            };
            WindowWatcher.start = function (target) {
                if (target === void 0) { target = null; }
                if (this.isRunning)
                    return;
                this.isRunning = true;
                this.initialize();
                trace('[WindowWatcher] start');
                this.window = target || window;
                this.window.addEventListener('resize', this.windowResizeHandler);
                this.window.addEventListener('orientationchange', this.windowResizeHandler);
                this.window.addEventListener('scroll', this.windowScrollHandler);
                this.apply();
            };
            WindowWatcher.stop = function () {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                this.initialize();
                trace('[WindowWatcher] stop');
                this.window.removeEventListener('resize', this.windowResizeHandler);
                this.window.removeEventListener('orientationchange', this.windowResizeHandler);
                this.window.removeEventListener('scroll', this.windowScrollHandler);
            };
            WindowWatcher.apply = function () {
                this.windowWidth = this.window.innerWidth;
                this.windowHeight = this.window.innerHeight;
                this.scrollTop = (this.window.pageYOffset !== undefined) ? this.window.pageYOffset : document.documentElement.scrollTop;
                this.scrollBottom = this.scrollTop + this.windowHeight;
            };
            WindowWatcher.addEventListener = function (eventType, listener) {
                this.initialize();
                this.eventDispatcher.addEventListener(eventType, listener);
            };
            WindowWatcher.removeEventListener = function (eventType, listener) {
                this.initialize();
                this.eventDispatcher.removeEventListener(eventType, listener);
            };
            WindowWatcher.calcScrolledPosition = function (y) {
                return y - this.scrollTop;
            };
            ;
            WindowWatcher.calcScrolledPositionRatio = function (y) {
                return this.calcScrolledPosition(y) / this.windowHeight;
            };
            WindowWatcher.resize = function (event) {
                WindowWatcher.apply();
                WindowWatcher.eventDispatcher.dispatchEvent(new browser.WindowWatcherEvent(browser.WindowWatcherEvent.RESIZE, WindowWatcher, event, WindowWatcher.scrollTop, WindowWatcher.scrollBottom, WindowWatcher.windowWidth, WindowWatcher.windowHeight));
            };
            ;
            WindowWatcher.getIsRunning = function () { return this.isRunning; };
            WindowWatcher.getWindow = function () { return this.window; };
            WindowWatcher.getScrollTop = function () { return this.scrollTop; };
            WindowWatcher.getScrollBottom = function () { return this.scrollBottom; };
            WindowWatcher.getWindowWidth = function () { return this.windowWidth; };
            WindowWatcher.getWindowHeight = function () { return this.windowHeight; };
            WindowWatcher.getIsMobileOrientationResize = function () { return this.isMobileOrientationResize; };
            WindowWatcher.setIsMobileOrientationResize = function (value) { this.isMobileOrientationResize = value; };
            WindowWatcher.windowResizeHandler = function (event) {
                if (!browser.DeviceInfo.getIsDesktop() && WindowWatcher.isMobileOrientationResize)
                    return;
                trace('[WindowWatcher] resize by window.resize');
                WindowWatcher.resize(event);
            };
            WindowWatcher.windowOrientationChangeHandler = function (event) {
                if (browser.DeviceInfo.getIsDesktop() || !WindowWatcher.isMobileOrientationResize)
                    return;
                trace('[WindowWatcher] resize by window.orientationchange');
                WindowWatcher.resize(event);
            };
            WindowWatcher.windowScrollHandler = function (event) {
                WindowWatcher.apply();
                WindowWatcher.eventDispatcher.dispatchEvent(new browser.WindowWatcherEvent(browser.WindowWatcherEvent.SCROLL, WindowWatcher, event, WindowWatcher.scrollTop, WindowWatcher.scrollBottom, WindowWatcher.windowWidth, WindowWatcher.windowHeight));
            };
            WindowWatcher.isRunning = false;
            WindowWatcher.window = null;
            WindowWatcher.windowWidth = 0;
            WindowWatcher.windowHeight = 0;
            WindowWatcher.isMobileOrientationResize = true;
            WindowWatcher.isInitialized = false;
            WindowWatcher.eventDispatcher = null;
            return WindowWatcher;
        }());
        browser.WindowWatcher = WindowWatcher;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var WindowWatcherEvent = (function (_super) {
            __extends(WindowWatcherEvent, _super);
            function WindowWatcherEvent(eventType, eventTarget, originalEvent, scrollTop, scrollBottom, windowWidth, windowHeight) {
                if (originalEvent === void 0) { originalEvent = null; }
                if (scrollTop === void 0) { scrollTop = 0; }
                if (scrollBottom === void 0) { scrollBottom = 0; }
                if (windowWidth === void 0) { windowWidth = 0; }
                if (windowHeight === void 0) { windowHeight = 0; }
                var _this = _super.call(this, eventType, eventTarget) || this;
                _this.originalEvent = originalEvent;
                _this.scrollTop = scrollTop;
                _this.scrollBottom = scrollBottom;
                _this.windowWidth = windowWidth;
                _this.windowHeight = windowHeight;
                return _this;
            }
            WindowWatcherEvent.prototype.clone = function () {
                return new WindowWatcherEvent(this.type, this.target, this.originalEvent, this.scrollTop, this.scrollBottom, this.windowWidth, this.windowHeight);
            };
            WindowWatcherEvent.prototype.toString = function () {
                return '[WindowWatcherEvent] type = ' + this.type + ', scrollTop = ' + this.scrollTop + ', scrollBottom = ' + this.scrollBottom + ', windowWidth = ' + this.windowWidth + ', windowHeight = ' + this.windowHeight;
            };
            WindowWatcherEvent.SCROLL = 'scroll';
            WindowWatcherEvent.RESIZE = 'resize';
            return WindowWatcherEvent;
        }(alm.event.Event));
        browser.WindowWatcherEvent = WindowWatcherEvent;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var ScrollSectionTriggerEvent = (function (_super) {
            __extends(ScrollSectionTriggerEvent, _super);
            function ScrollSectionTriggerEvent(eventType, target, currentSectionIndex, prevSectionIndex) {
                var _this = _super.call(this, eventType, target) || this;
                _this.currentSectionIndex = currentSectionIndex;
                _this.prevSectionIndex = prevSectionIndex;
                return _this;
            }
            ScrollSectionTriggerEvent.CHANGE = 'ScrollSectionTriggerEvent.CHANGE';
            return ScrollSectionTriggerEvent;
        }(alm.event.Event));
        browser.ScrollSectionTriggerEvent = ScrollSectionTriggerEvent;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var Logger = alm.debug.Logger;
        var WindowWatcher = alm.browser.WindowWatcher;
        var WindowWatcherEvent = alm.browser.WindowWatcherEvent;
        var EventDispatcher = alm.event.EventDispatcher;
        var ScrollSectionTrigger = (function (_super) {
            __extends(ScrollSectionTrigger, _super);
            function ScrollSectionTrigger(threshold) {
                if (threshold === void 0) { threshold = 0.5; }
                var _this = _super.call(this) || this;
                _this.windowScrollHandler = function (event) {
                    _this.updateScrollPosition();
                    _this.check();
                };
                _this.windowResizeHandler = function (event) {
                    _this.updateThresholdPosition();
                    _this.updateScrollPosition();
                    _this.check();
                };
                _this.isRunning = false;
                _this.scrollPosition = null;
                _this.triggerPositions = [];
                _this.thresholdRatio = threshold;
                _this.thresholdPosition = null;
                _this.currentSectionIndex = -1;
                _this.prevSectionIndex = -1;
                return _this;
            }
            ScrollSectionTrigger.prototype.start = function () {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                WindowWatcher.addEventListener(WindowWatcherEvent.SCROLL, this.windowScrollHandler);
                WindowWatcher.addEventListener(WindowWatcherEvent.RESIZE, this.windowResizeHandler);
                WindowWatcher.start();
                this.updateThresholdPosition();
                this.updateScrollPosition();
                this.check();
            };
            ScrollSectionTrigger.prototype.stop = function () {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                WindowWatcher.removeEventListener(WindowWatcherEvent.SCROLL, this.windowScrollHandler);
                WindowWatcher.removeEventListener(WindowWatcherEvent.RESIZE, this.windowResizeHandler);
                WindowWatcher.stop();
            };
            ScrollSectionTrigger.prototype.getIsRunning = function () {
                return this.isRunning;
            };
            ScrollSectionTrigger.prototype.getCurrentIndex = function () {
                return this.currentSectionIndex;
            };
            ScrollSectionTrigger.prototype.getPrevIndex = function () {
                return this.prevSectionIndex;
            };
            ScrollSectionTrigger.prototype.getTriggerPositions = function () {
                return this.triggerPositions.concat();
            };
            ScrollSectionTrigger.prototype.setTriggerPositions = function (positions) {
                this.triggerPositions = positions.concat();
                this.triggerPositions.sort(function (a, b) { return a - b; });
                if (this.isRunning) {
                    this.check();
                }
            };
            ScrollSectionTrigger.prototype.getThreshold = function () {
                return this.thresholdRatio;
            };
            ScrollSectionTrigger.prototype.setThreshold = function (ratio) {
                this.thresholdRatio = ratio;
                this.updateThresholdPosition();
                if (this.isRunning) {
                    this.check();
                }
            };
            ScrollSectionTrigger.prototype.check = function () {
                if (this.scrollPosition == null) {
                    Logger.warn('[RangeTrigger] current position is need set');
                    return;
                }
                var nearestTriggerIndex = -1;
                var nearestScrolledTriggerPosition = -1;
                var nearestDistance = Number.MAX_VALUE;
                var triggerPositionCount = this.triggerPositions.length;
                for (var i = 0; i < triggerPositionCount; ++i) {
                    var scrolledTriggerPosition = this.triggerPositions[i] - this.scrollPosition;
                    var distance = Math.abs(scrolledTriggerPosition - this.thresholdPosition);
                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        nearestTriggerIndex = i;
                        nearestScrolledTriggerPosition = scrolledTriggerPosition;
                    }
                }
                if (nearestTriggerIndex >= 0) {
                    var sectionIndex = -1;
                    if (nearestScrolledTriggerPosition > this.thresholdPosition) {
                        sectionIndex = nearestTriggerIndex;
                    }
                    else {
                        sectionIndex = nearestTriggerIndex + 1;
                    }
                    if (this.currentSectionIndex != sectionIndex) {
                        this.prevSectionIndex = this.currentSectionIndex;
                        this.currentSectionIndex = sectionIndex;
                        this.dispatchEvent(new browser.ScrollSectionTriggerEvent(browser.ScrollSectionTriggerEvent.CHANGE, this, this.currentSectionIndex, this.prevSectionIndex));
                    }
                }
            };
            ScrollSectionTrigger.prototype.updateThresholdPosition = function () {
                this.thresholdPosition = WindowWatcher.getWindowHeight() * this.thresholdRatio;
            };
            ScrollSectionTrigger.prototype.updateScrollPosition = function () {
                this.scrollPosition = WindowWatcher.getScrollTop();
            };
            return ScrollSectionTrigger;
        }(EventDispatcher));
        browser.ScrollSectionTrigger = ScrollSectionTrigger;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var WindowWatcher = alm.browser.WindowWatcher;
        var WindowWatcherEvent = alm.browser.WindowWatcherEvent;
        var EventDispatcher = alm.event.EventDispatcher;
        var ResponsiveObserver = (function (_super) {
            __extends(ResponsiveObserver, _super);
            function ResponsiveObserver() {
                var _this = _super.call(this) || this;
                _this.windowResizeHandler = function (event) {
                    _this.check();
                };
                _this.breakPoints = [];
                _this.breakPointCount = 0;
                _this.currentIndex = -1;
                _this.prevIndex = -1;
                return _this;
            }
            ResponsiveObserver.prototype.start = function () {
                if (this.isRunning)
                    return;
                this.isRunning = true;
                WindowWatcher.addEventListener(WindowWatcherEvent.RESIZE, this.windowResizeHandler);
                WindowWatcher.start();
                this.check();
            };
            ResponsiveObserver.prototype.stop = function () {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                WindowWatcher.removeEventListener(WindowWatcherEvent.RESIZE, this.windowResizeHandler);
                WindowWatcher.stop();
            };
            ResponsiveObserver.prototype.setBreakpoints = function (breakPoints) {
                this.breakPoints = breakPoints.concat();
                this.breakPointCount = this.breakPoints.length;
                this.breakPoints.sort(function (a, b) { return a - b; });
                if (this.isRunning) {
                    this.check();
                }
            };
            ResponsiveObserver.prototype.getIsRunning = function () {
                return this.isRunning;
            };
            ResponsiveObserver.prototype.getCurrentIndex = function () {
                return this.currentIndex;
            };
            ResponsiveObserver.prototype.getPrevIndex = function () {
                return this.prevIndex;
            };
            ResponsiveObserver.prototype.getBreakPoints = function () {
                return this.breakPoints.concat();
            };
            ResponsiveObserver.prototype.getBreakPointCount = function () {
                return this.breakPointCount;
            };
            ResponsiveObserver.prototype.check = function () {
                var windowWidth = WindowWatcher.getWindowWidth();
                var index;
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
                this.dispatchEvent(new browser.ResponsiveObserverEvent(browser.ResponsiveObserverEvent.CHANGE, this, this.currentIndex, this.prevIndex));
            };
            return ResponsiveObserver;
        }(EventDispatcher));
        browser.ResponsiveObserver = ResponsiveObserver;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var browser;
    (function (browser) {
        var ResponsiveObserverEvent = (function (_super) {
            __extends(ResponsiveObserverEvent, _super);
            function ResponsiveObserverEvent(eventType, target, currentIndex, prevIndex) {
                var _this = _super.call(this, eventType, target) || this;
                _this.currentIndex = currentIndex;
                _this.prevIndex = prevIndex;
                return _this;
            }
            ResponsiveObserverEvent.CHANGE = 'ResponsiveObserverEvent.CHANGE';
            return ResponsiveObserverEvent;
        }(alm.event.Event));
        browser.ResponsiveObserverEvent = ResponsiveObserverEvent;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var scn;
(function (scn) {
    var Logger = alm.debug.Logger;
    var EventDispatcher = alm.event.EventDispatcher;
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(name) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.state = scn.SceneState.Idling;
            _this.parent = null;
            _this.childrenByName = {};
            _this.numChildren = 0;
            _this.isEntered = false;
            _this.onLoad = null;
            _this.onUnload = null;
            _this.onArrive = null;
            _this.onLeave = null;
            _this.onAscend = null;
            _this.onDescend = null;
            return _this;
        }
        Scene.prototype.addChild = function (child) {
            if (child) {
                var childName = child.name;
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
        };
        Scene.prototype.removeChild = function (child) {
            if (child) {
                var childName = child.name;
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
        };
        Scene.prototype.addChildren = function (children) {
            var addedChildren = [];
            var n = children.length;
            var c;
            for (var i = 0; i < n; ++i) {
                c = this.addChild(children[i]);
                if (c) {
                    addedChildren.push(c);
                }
            }
            return addedChildren;
        };
        Scene.prototype.removeChildren = function (children) {
            var removedChildren = [];
            var n = children.length;
            var c;
            for (var i = 0; i < n; ++i) {
                c = this.removeChild(children[i]);
                if (c) {
                    removedChildren.push(c);
                }
            }
            return removedChildren;
        };
        Scene.prototype.removeAllChildren = function () {
            var children = [];
            var child;
            for (var name_1 in this.childrenByName) {
                child = this.childrenByName[name_1];
                child.parent = null;
                children.push(child);
            }
            this.childrenByName = {};
            this.numChildren = 0;
            return children;
        };
        Scene.prototype.contains = function (child) {
            if (child) {
                return this.childrenByName[typeof child == 'string' ? child : child.name] != null;
            }
            else {
                return false;
            }
        };
        Scene.prototype.getName = function () {
            return this.name;
        };
        Scene.prototype.getState = function () {
            return this.state;
        };
        Scene.prototype.getLastState = function () {
            return this.lastState;
        };
        Scene.prototype.getParent = function () {
            return this.parent;
        };
        Scene.prototype.getChildByName = function (name) {
            return this.childrenByName[name];
        };
        Scene.prototype.getNumChildren = function () {
            return this.numChildren;
        };
        Scene.prototype.getManager = function () {
            if (this.parent) {
                return this.parent.getManager();
            }
            else {
                Logger.warn('[Scene \'' + this.name + '\'] getManager was failed, check whether if scene is connected to root.');
            }
            return null;
        };
        Scene.prototype.getPath = function () {
            var manager = this.getManager();
            if (manager) {
                var names = [this.name];
                var scene = this;
                while (scene = scene.parent) {
                    names.unshift(scene.name);
                }
                return manager.getScenePathByNames(names);
            }
            else {
                Logger.warn('[Scene \'' + this.name + '\'] getPath was failed, check whether if scene is connected to root.');
            }
            return null;
        };
        Scene.prototype.gotoScene = function (path) {
            this.getManager().goto(path);
        };
        Scene.prototype._load = function (transferInfo) {
            var _this = this;
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.Loading;
            this.isEntered = true;
            var command = new cmd.Serial(function () {
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.LOAD, _this));
                var c = typeof (_this.onLoad) == 'function' ? _this.onLoad() : _this.implOnLoad();
                if (c)
                    command.insertCommand(c);
            }, function () {
                _this.lastState = _this.state;
                _this.state = scn.SceneState.Idling;
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.LOAD_COMPLETE, _this));
            });
            command.execute();
        };
        Scene.prototype._unload = function (transferInfo) {
            var _this = this;
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.Unloading;
            this.isEntered = false;
            var command = new cmd.Serial(function () {
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.UNLOAD, _this));
                var c = typeof (_this.onUnload) == 'function' ? _this.onUnload() : _this.implOnUnload();
                if (c)
                    command.insertCommand(c);
            }, function () {
                _this.lastState = _this.state;
                _this.state = scn.SceneState.Idling;
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.UNLOAD_COMPLETE, _this));
            });
            command.execute();
        };
        Scene.prototype._arrive = function (transferInfo) {
            var _this = this;
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.Arriving;
            this.isEntered = true;
            var command = new cmd.Serial(function () {
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.ARRIVE, _this));
                var c = typeof (_this.onArrive) == 'function' ? _this.onArrive() : _this.implOnArrive();
                if (c)
                    command.insertCommand(c);
            }, function () {
                _this.lastState = _this.state;
                _this.state = scn.SceneState.Idling;
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.ARRIVE_COMPLETE, _this));
            });
            command.execute();
        };
        Scene.prototype._leave = function (transferInfo) {
            var _this = this;
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.Leaving;
            this.isEntered = false;
            var command = new cmd.Serial(function () {
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.LEAVE, _this));
                var c = typeof (_this.onLeave) == 'function' ? _this.onLeave() : _this.implOnLeave();
                if (c)
                    command.insertCommand(c);
            }, function () {
                _this.lastState = _this.state;
                _this.state = scn.SceneState.Idling;
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.LEAVE_COMPLETE, _this));
            });
            command.execute();
        };
        Scene.prototype._ascend = function (transferInfo) {
            var _this = this;
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.Ascending;
            this.isEntered = true;
            var command = new cmd.Serial(function () {
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.ASCEND, _this));
                var c = typeof (_this.onAscend) == 'function' ? _this.onAscend() : _this.implOnAscend();
                if (c)
                    command.insertCommand(c);
            }, function () {
                _this.lastState = _this.state;
                _this.state = scn.SceneState.Idling;
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.ASCEND_COMPLETE, _this));
            });
            command.execute();
        };
        Scene.prototype._descend = function (transferInfo) {
            var _this = this;
            this.transferInfo = transferInfo;
            this.state = scn.SceneState.Descending;
            this.isEntered = false;
            var command = new cmd.Serial(function () {
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.DESCEND, _this));
                var c = typeof (_this.onDescend) == 'function' ? _this.onDescend() : _this.implOnDescend();
                if (c)
                    command.insertCommand(c);
            }, function () {
                _this.lastState = _this.state;
                _this.state = scn.SceneState.Idling;
                _this.dispatchEvent(new scn.SceneEvent(scn.SceneEvent.DESCEND_COMPLETE, _this));
            });
            command.execute();
        };
        Scene.prototype.implOnLoad = function () {
            return new cmd.Command();
        };
        Scene.prototype.implOnUnload = function () {
            return new cmd.Command();
        };
        Scene.prototype.implOnArrive = function () {
            return new cmd.Command();
        };
        Scene.prototype.implOnLeave = function () {
            return new cmd.Command();
        };
        Scene.prototype.implOnAscend = function () {
            return new cmd.Command();
        };
        Scene.prototype.implOnDescend = function () {
            return new cmd.Command();
        };
        return Scene;
    }(EventDispatcher));
    scn.Scene = Scene;
})(scn || (scn = {}));
var scn;
(function (scn) {
    var Event = alm.event.Event;
    var SceneEvent = (function (_super) {
        __extends(SceneEvent, _super);
        function SceneEvent(eventType, eventTarget) {
            return _super.call(this, eventType, eventTarget) || this;
        }
        SceneEvent.prototype.clone = function () {
            return new SceneEvent(this.type, this.target);
        };
        SceneEvent.prototype.toString = function () {
            return '[SceneEvent] type = ' + this.type;
        };
        SceneEvent.LOAD = 'load';
        SceneEvent.UNLOAD = 'unload';
        SceneEvent.ARRIVE = 'arrive';
        SceneEvent.LEAVE = 'leave';
        SceneEvent.ASCEND = 'ascend';
        SceneEvent.DESCEND = 'descend';
        SceneEvent.LOAD_COMPLETE = 'loadComplete';
        SceneEvent.UNLOAD_COMPLETE = 'unloadComplete';
        SceneEvent.ARRIVE_COMPLETE = 'arriveComplete';
        SceneEvent.LEAVE_COMPLETE = 'leaveComplete';
        SceneEvent.ASCEND_COMPLETE = 'ascendComplete';
        SceneEvent.DESCEND_COMPLETE = 'descendComplete';
        return SceneEvent;
    }(Event));
    scn.SceneEvent = SceneEvent;
})(scn || (scn = {}));
var scn;
(function (scn) {
    var Logger = alm.debug.Logger;
    var LoggerLevel = alm.debug.LoggerLevel;
    var EventDispatcher = alm.event.EventDispatcher;
    var SceneManager = (function (_super) {
        __extends(SceneManager, _super);
        function SceneManager(name) {
            if (name === void 0) { name = ''; }
            var _this = _super.call(this) || this;
            _this.sceneLoadCompleteHandler = function (event) {
                _this.currentScene.removeEventListener(scn.SceneEvent.LOAD_COMPLETE, _this.sceneLoadCompleteHandler);
                _this.lastState = scn.SceneState.Loading;
                ++_this.eventIndex;
                _this.checkState();
            };
            _this.sceneUnloadCompleteHandler = function (event) {
                _this.currentScene.removeEventListener(scn.SceneEvent.UNLOAD_COMPLETE, _this.sceneUnloadCompleteHandler);
                _this.lastState = scn.SceneState.Unloading;
                ++_this.eventIndex;
                _this.checkState();
            };
            _this.sceneArriveCompleteHandler = function (event) {
                _this.currentScene.removeEventListener(scn.SceneEvent.ARRIVE_COMPLETE, _this.sceneArriveCompleteHandler);
                _this.lastState = scn.SceneState.Arriving;
                ++_this.eventIndex;
                _this.checkState();
            };
            _this.sceneLeaveCompleteHandler = function (event) {
                _this.currentScene.removeEventListener(scn.SceneEvent.LEAVE_COMPLETE, _this.sceneLeaveCompleteHandler);
                _this.lastState = scn.SceneState.Leaving;
                ++_this.eventIndex;
                _this.checkState();
            };
            _this.sceneAscendCompleteHandler = function (event) {
                _this.currentScene.removeEventListener(scn.SceneEvent.ASCEND_COMPLETE, _this.sceneAscendCompleteHandler);
                _this.lastState = scn.SceneState.Ascending;
                ++_this.eventIndex;
                _this.checkState();
            };
            _this.sceneDescendCompleteHandler = function (event) {
                _this.currentScene.removeEventListener(scn.SceneEvent.DESCEND_COMPLETE, _this.sceneDescendCompleteHandler);
                _this.lastState = scn.SceneState.Descending;
                ++_this.eventIndex;
                _this.checkState();
            };
            _this.name = name;
            _this.root = new scn.core.RootScene(_this);
            _this.currentScene = null;
            _this.waypoints = [];
            _this.waypointIndex = -1;
            _this.lastState = scn.SceneState.Idling;
            _this.eventIndex = -1;
            _this.transferId = -1;
            _this.transferInfo = null;
            return _this;
        }
        SceneManager.prototype.start = function () {
            Logger.verbose('----- scene manager start -----');
            this.goto('/');
        };
        SceneManager.prototype.goto = function (path) {
            path = this.resolvePath(path);
            if (this.transferInfo && this.transferInfo.getDestinationPath() == path) {
                return;
            }
            var newWaypoints = [];
            if (this.waypointIndex != -1) {
                newWaypoints = this.createWaypoints(this.waypoints[this.waypointIndex].getPath(), path);
            }
            else {
                newWaypoints = [new scn.core.Waypoint('/', 0)];
            }
            if (newWaypoints.length > 0) {
                var isDestinationChanged = this.transferInfo != null;
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
                    this.printWaypoint(this.waypoints);
                }
                this.transferInfo = new scn.SceneTransferInfo(this.transferId, this.waypoints[this.waypointIndex].getPath(), this.waypoints[this.waypoints.length - 1].getPath());
                if (!isDestinationChanged) {
                    this.dispatchEvent(new scn.SceneManagerEvent(scn.SceneManagerEvent.TRANSFER_START, this));
                }
                this.checkState();
            }
        };
        SceneManager.prototype.resolvePath = function (path) {
            if (path[0] != '/') {
                if (this.currentScene) {
                    path = this.currentScene.getPath() + '/' + path;
                }
                else {
                    path = '/' + path;
                }
            }
            var names = path.split('/');
            var normalized = [];
            for (var i = 0; i < names.length; ++i) {
                var name_2 = names[i];
                if (name_2 == '')
                    continue;
                if (name_2 == '.')
                    continue;
                if (name_2 == '..') {
                    normalized.pop();
                    continue;
                }
                normalized.push(name_2);
            }
            return '/' + normalized.join('/');
        };
        SceneManager.prototype.addSceneAt = function (path, createScene) {
            if (createScene === void 0) { createScene = false; }
            var success = false;
            var names = this.getSceneNamesByPath(path);
            var n = names.length;
            var scene = this.root;
            for (var i = 1; i < n; ++i) {
                var name_3 = names[i];
                if (i == n - 1) {
                    if (scene.contains(name_3)) {
                        Logger.warn('[SceneManager \'' + this.name + '\'] addSceneAt was failed, because path \'' + path + '\' is already exist.');
                    }
                    else {
                        scene = scene.addChild(new scn.Scene(name_3));
                        success = true;
                    }
                }
                else {
                    if (scene.contains(name_3)) {
                        scene = scene.getChildByName(name_3);
                    }
                    else {
                        scene = scene.addChild(new scn.Scene(name_3));
                    }
                }
            }
            return success ? scene : null;
        };
        SceneManager.prototype.getName = function () {
            return this.name;
        };
        SceneManager.prototype.getRoot = function () {
            return this.root;
        };
        SceneManager.prototype.getSceneByPath = function (path) {
            var names = this.getSceneNamesByPath(path);
            var n = names.length;
            var scene = this.root;
            for (var i = 1; i < n; ++i) {
                scene = scene.getChildByName(names[i]);
            }
            return scene;
        };
        SceneManager.prototype.getSceneNamesByPath = function (path) {
            return path == '/' ? [''] : this.resolvePath(path).split('/');
        };
        SceneManager.prototype.getSceneLevelByNames = function (names) {
            return names.length - 1;
        };
        SceneManager.prototype.getScenePathByNames = function (names) {
            return names.length == 0 ? '/' : names.length == 1 ? ('/' + names[0]) : names.join('/');
        };
        SceneManager.prototype.createWaypoints = function (departurePath, destinationPath) {
            if (departurePath == destinationPath) {
                Logger.warn('[SceneManager] departure path and destination path is same, path = \'' + departurePath + '\'');
                return [];
            }
            Logger.verbose('----- scene flow -----');
            var waypoints = [
                new scn.core.Waypoint(departurePath, this.getSceneLevelByNames(this.getSceneNamesByPath(departurePath)))
            ];
            var departureNames = this.getSceneNamesByPath(departurePath);
            var destinationNames = this.getSceneNamesByPath(destinationPath);
            Logger.verbose('    path');
            Logger.verbose('        current    : \'' + departurePath + '\'');
            Logger.verbose('        destination: \'' + destinationPath + '\'');
            Logger.verbose('    names');
            Logger.verbose('        current(' + departureNames.length + ')    : \'' + departureNames + '\'');
            Logger.verbose('        destination(' + destinationNames.length + '): \'' + destinationNames + '\'');
            var turningLevel = 0;
            var turningNames = [];
            var turningPath;
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
                var names = departureNames.concat();
                var prevPath = departurePath;
                for (var i = departureNames.length - 1; i > turningLevel + 1; --i) {
                    names.pop();
                    var path = this.getScenePathByNames(names);
                    if (path != prevPath) {
                        var level = this.getSceneLevelByNames(names);
                        waypoints.push(new scn.core.Waypoint(path, level));
                        prevPath = path;
                    }
                }
            }
            if (turningPath == destinationPath && turningLevel > 0) {
                var from = turningLevel == waypoints[waypoints.length - 1].getLevel() ? scn.core.Direction.Sibling : scn.core.Direction.Ascend;
                waypoints.push(new scn.core.Waypoint(turningPath, turningLevel));
            }
            else {
                var names = turningNames.concat();
                var prev = waypoints[waypoints.length - 1];
                var prevPath = prev.getPath();
                var prevLevel = prev.getLevel();
                for (var i = turningLevel + 1; i < destinationNames.length; ++i) {
                    var name_4 = destinationNames[i];
                    names.push(name_4);
                    var path = this.getScenePathByNames(names);
                    if (path != prevPath) {
                        var level = this.getSceneLevelByNames(names);
                        waypoints.push(new scn.core.Waypoint(path, level));
                        prevLevel = level;
                        prevPath = path;
                    }
                }
            }
            this.setDirection(waypoints);
            if (Logger.level <= LoggerLevel.Verbose) {
                this.printWaypoint(waypoints);
            }
            return waypoints;
        };
        SceneManager.prototype.setDirection = function (waypoints) {
            var n = waypoints.length;
            var prev = null;
            var point;
            for (var i = 0; i < n; ++i) {
                point = waypoints[i];
                if (i > 0) {
                    var d = point.getLevel() - prev.getLevel();
                    point._setFrom(d > 0 ? scn.core.Direction.Descend : d < 0 ? scn.core.Direction.Ascend : scn.core.Direction.Sibling);
                    prev._setTo(point.getFrom());
                }
                prev = point;
            }
        };
        SceneManager.prototype.printWaypoint = function (waypoints) {
            Logger.verbose('    waypoints');
            var n = waypoints.length;
            for (var i = 0; i < n; ++i) {
                Logger.verbose('        [' + i + '] ' + waypoints[i]);
            }
            Logger.verbose('');
        };
        SceneManager.prototype.checkState = function () {
            trace('lastState : ' + scn.getSceneStateString(this.lastState));
            if (this.waypointIndex >= this.waypoints.length) {
                Logger.verbose('----- scene transfer complete -----');
                var tmpTransferId = this.transferInfo.getTransferId();
                this.waypointIndex = this.waypoints.length - 1;
                this.dispatchEvent(new scn.SceneManagerEvent(scn.SceneManagerEvent.TRANSFER_COMPLETE, this));
                if (tmpTransferId == this.transferInfo.getTransferId()) {
                    this.lastState = scn.SceneState.Idling;
                    this.transferInfo = null;
                }
                return;
            }
            if (this.currentScene) {
                var currentWaypoint = this.waypoints[this.waypointIndex];
                this.currentScene = this.getSceneByPath(currentWaypoint.getPath());
                if (this.waypoints.length > 1 && this.waypointIndex == 0) {
                    trace('Departure scene');
                    if (this.lastState != scn.SceneState.Leaving && this.currentScene.getLastState() == scn.SceneState.Arriving) {
                        Logger.verbose(this.eventIndex + ' Leave   : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.LEAVE_COMPLETE, this.sceneLeaveCompleteHandler);
                        this.currentScene._leave(this.transferInfo);
                        return;
                    }
                    if (this.lastState != scn.SceneState.Unloading && (currentWaypoint.getTo() == scn.core.Direction.Sibling || currentWaypoint.getTo() == scn.core.Direction.Ascend)) {
                        ++this.waypointIndex;
                        Logger.verbose(this.eventIndex + ' Unload  : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.UNLOAD_COMPLETE, this.sceneUnloadCompleteHandler);
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
                    trace('Through scene');
                    if (this.lastState != scn.SceneState.Loading && (currentWaypoint.getFrom() == scn.core.Direction.Sibling || currentWaypoint.getFrom() == scn.core.Direction.Descend)) {
                        Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.LOAD_COMPLETE, this.sceneLoadCompleteHandler);
                        this.currentScene._load(this.transferInfo);
                        return;
                    }
                    if (this.lastState != scn.SceneState.Ascending && currentWaypoint.getFrom() == scn.core.Direction.Ascend) {
                        Logger.verbose(this.eventIndex + ' Ascend  : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.ASCEND_COMPLETE, this.sceneAscendCompleteHandler);
                        this.currentScene._ascend(this.transferInfo);
                        return;
                    }
                    if (this.lastState != scn.SceneState.Unloading && (currentWaypoint.getTo() == scn.core.Direction.Sibling || currentWaypoint.getTo() == scn.core.Direction.Ascend)) {
                        ++this.waypointIndex;
                        Logger.verbose(this.eventIndex + ' Unload  : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.UNLOAD_COMPLETE, this.sceneUnloadCompleteHandler);
                        this.currentScene._unload(this.transferInfo);
                        return;
                    }
                    if (this.lastState != scn.SceneState.Descending && currentWaypoint.getTo() == scn.core.Direction.Descend) {
                        ++this.waypointIndex;
                        Logger.verbose(this.eventIndex + ' Descend : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.DESCEND_COMPLETE, this.sceneDescendCompleteHandler);
                        this.currentScene._descend(this.transferInfo);
                        return;
                    }
                }
                if (this.waypointIndex == this.waypoints.length - 1) {
                    trace('Destination scene');
                    if (this.lastState != scn.SceneState.Loading && (currentWaypoint.getFrom() == scn.core.Direction.Sibling || currentWaypoint.getFrom() == scn.core.Direction.Descend)) {
                        Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.LOAD_COMPLETE, this.sceneLoadCompleteHandler);
                        this.currentScene._load(this.transferInfo);
                        return;
                    }
                    if (this.lastState != scn.SceneState.Arriving) {
                        ++this.waypointIndex;
                        Logger.verbose(this.eventIndex + ' Arrive  : \'' + this.currentScene.getPath() + '\'');
                        this.currentScene.addEventListener(scn.SceneEvent.ARRIVE_COMPLETE, this.sceneArriveCompleteHandler);
                        this.currentScene._arrive(this.transferInfo);
                        return;
                    }
                }
            }
            else {
                trace('Init scene');
                this.lastState = scn.SceneState.Idling;
                this.currentScene = this.root;
                Logger.verbose(this.eventIndex + ' Load    : \'' + this.currentScene.getPath() + '\'');
                this.currentScene.addEventListener(scn.SceneEvent.LOAD_COMPLETE, this.sceneLoadCompleteHandler);
                this.currentScene._load(this.transferInfo);
            }
        };
        return SceneManager;
    }(EventDispatcher));
    scn.SceneManager = SceneManager;
})(scn || (scn = {}));
var scn;
(function (scn) {
    var Event = alm.event.Event;
    var SceneManagerEvent = (function (_super) {
        __extends(SceneManagerEvent, _super);
        function SceneManagerEvent(eventType, eventTarget) {
            return _super.call(this, eventType, eventTarget) || this;
        }
        SceneManagerEvent.prototype.clone = function () {
            return new SceneManagerEvent(this.type, this.target);
        };
        SceneManagerEvent.prototype.toString = function () {
            return '[SceneManagerEvent] type = ' + this.type;
        };
        SceneManagerEvent.TRANSFER_START = 'transferStart';
        SceneManagerEvent.TRANSFER_COMPLETE = 'transferComplete';
        return SceneManagerEvent;
    }(Event));
    scn.SceneManagerEvent = SceneManagerEvent;
})(scn || (scn = {}));
var scn;
(function (scn) {
    var SceneTransferInfo = (function () {
        function SceneTransferInfo(transferId, departurePath, destinationPath) {
            this.transferId = transferId;
            this.departurePath = departurePath;
            this.destinationPath = destinationPath;
            this.relay = null;
        }
        SceneTransferInfo.prototype.getTransferId = function () {
            return this.transferId;
        };
        SceneTransferInfo.prototype.getDeparturePath = function () {
            return this.departurePath;
        };
        SceneTransferInfo.prototype.getDestinationPath = function () {
            return this.destinationPath;
        };
        return SceneTransferInfo;
    }());
    scn.SceneTransferInfo = SceneTransferInfo;
})(scn || (scn = {}));
var scn;
(function (scn) {
    var SceneState;
    (function (SceneState) {
        SceneState[SceneState["Idling"] = 0] = "Idling";
        SceneState[SceneState["Loading"] = 1] = "Loading";
        SceneState[SceneState["Unloading"] = 2] = "Unloading";
        SceneState[SceneState["Arriving"] = 3] = "Arriving";
        SceneState[SceneState["Leaving"] = 4] = "Leaving";
        SceneState[SceneState["Ascending"] = 5] = "Ascending";
        SceneState[SceneState["Descending"] = 6] = "Descending";
    })(SceneState = scn.SceneState || (scn.SceneState = {}));
    function getSceneStateString(state) {
        switch (state) {
            case SceneState.Idling:
                return 'idling';
            case SceneState.Loading:
                return 'loading';
            case SceneState.Unloading:
                return 'unloading';
            case SceneState.Arriving:
                return 'arriving';
            case SceneState.Leaving:
                return 'leaving';
            case SceneState.Ascending:
                return 'ascending';
            case SceneState.Descending:
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
        var Direction;
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
        var RootScene = (function (_super) {
            __extends(RootScene, _super);
            function RootScene(manager) {
                var _this = _super.call(this, '') || this;
                _this.manager = manager;
                return _this;
            }
            RootScene.prototype.getManager = function () {
                return this.manager;
            };
            return RootScene;
        }(scn.Scene));
        core.RootScene = RootScene;
    })(core = scn.core || (scn.core = {}));
})(scn || (scn = {}));
var scn;
(function (scn) {
    var core;
    (function (core) {
        var Waypoint = (function () {
            function Waypoint(path, level) {
                this.path = path;
                this.level = level;
                this.from = core.Direction.Static;
                this.to = core.Direction.Static;
            }
            Waypoint.prototype.getPath = function () {
                return this.path;
            };
            Waypoint.prototype.getLevel = function () {
                return this.level;
            };
            Waypoint.prototype.getFrom = function () {
                return this.from;
            };
            Waypoint.prototype.getTo = function () {
                return this.to;
            };
            Waypoint.prototype._setFrom = function (from) {
                this.from = from;
            };
            Waypoint.prototype._setTo = function (to) {
                this.to = to;
            };
            Waypoint.prototype.toString = function () {
                return '[Waypoint] path = \'' + this.path + '\', level = ' + this.level + ', from = ' + core.getDirectionString(this.from) + ', to = ' + core.getDirectionString(this.to);
            };
            return Waypoint;
        }());
        core.Waypoint = Waypoint;
    })(core = scn.core || (scn.core = {}));
})(scn || (scn = {}));
var alm;
(function (alm) {
    function getVersion() {
        return '0.0.1';
    }
    alm.getVersion = getVersion;
    var style = 'color:#999;';
    var print = console.debug;
    print('%c+ + + + + + + + + + + + + + + + + + + + + + + + + +', style);
    print('%c+ alumican.js', style);
    print('%c+ version ' + getVersion(), style);
    print('%c+ http://alumican.net', style);
    print('%c+ https://github.com/alumican/alumican.js', style);
    print('%c+ + + + + + + + + + + + + + + + + + + + + + + + + +', style);
    print('');
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
