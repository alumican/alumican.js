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
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Loc = (function () {
            function Loc() {
            }
            Loc.getQuery = function () {
                var query = {};
                var pairs = location.search.substring(1).split('&');
                var pair;
                for (var i = 0; pairs[i]; ++i) {
                    pair = pairs[i].split('=');
                    query[pair[0]] = pair[1];
                }
                return query;
            };
            return Loc;
        }());
        util.Loc = Loc;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var LoggerLevel;
        (function (LoggerLevel) {
            LoggerLevel[LoggerLevel["Verbose"] = 0] = "Verbose";
            LoggerLevel[LoggerLevel["Info"] = 1] = "Info";
            LoggerLevel[LoggerLevel["Warn"] = 2] = "Warn";
            LoggerLevel[LoggerLevel["Error"] = 3] = "Error";
            LoggerLevel[LoggerLevel["Silent"] = 4] = "Silent";
        })(LoggerLevel = util.LoggerLevel || (util.LoggerLevel = {}));
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
        util.NullLogging = NullLogging;
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
        util.ConsoleLogging = ConsoleLogging;
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
                var line = prefix + messages.join(', ') + '\n';
                if (this.html) {
                    this.dom.innerHTML = line + this.dom.innerHTML;
                }
                else {
                    this.dom.innerText = line + this.dom.innerText;
                }
            };
            return DOMLogging;
        }());
        util.DOMLogging = DOMLogging;
        var ParallelLogging = (function () {
            function ParallelLogging(loggers) {
                this.loggers = loggers;
            }
            ParallelLogging.prototype.verbose = function (prefix, messages) {
                var n = this.loggers.length;
                for (var i = 0; i < n; ++i) {
                    this.loggers[i].verbose.apply(this, messages);
                }
            };
            ParallelLogging.prototype.info = function (prefix, messages) {
                var n = this.loggers.length;
                for (var i = 0; i < n; ++i) {
                    this.loggers[i].info.apply(this, messages);
                }
            };
            ParallelLogging.prototype.warn = function (prefix, messages) {
                var n = this.loggers.length;
                for (var i = 0; i < n; ++i) {
                    this.loggers[i].warn.apply(this, messages);
                }
            };
            ParallelLogging.prototype.error = function (prefix, messages) {
                var n = this.loggers.length;
                for (var i = 0; i < n; ++i) {
                    this.loggers[i].error.apply(this, messages);
                }
            };
            return ParallelLogging;
        }());
        util.ParallelLogging = ParallelLogging;
        var Logger = (function () {
            function Logger() {
            }
            Logger.setLevelByQuery = function (key) {
                var level = parseInt(util.Loc.getQuery()[key]);
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
                if (Logger.level <= LoggerLevel.Verbose)
                    Logger.logger.verbose('[' + Logger.namespace + 'Verbose] ', messages);
            };
            Logger.info = function () {
                var messages = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    messages[_i] = arguments[_i];
                }
                if (Logger.level <= LoggerLevel.Info)
                    Logger.logger.info('[' + Logger.namespace + 'Info   ] ', messages);
            };
            Logger.warn = function () {
                var messages = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    messages[_i] = arguments[_i];
                }
                if (Logger.level <= LoggerLevel.Warn)
                    Logger.logger.warn('[' + Logger.namespace + 'Warn   ] ', messages);
            };
            Logger.error = function () {
                var messages = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    messages[_i] = arguments[_i];
                }
                if (Logger.level <= LoggerLevel.Error)
                    Logger.logger.error('[' + Logger.namespace + 'Error  ] ', messages);
            };
            Logger.warnIf = function (target, message, condition) {
                if (condition === void 0) { condition = true; }
                if (Logger.level <= LoggerLevel.Warn && condition)
                    Logger.logger.warn('[' + Logger.namespace + 'Warn   ] ', [message + ' : ' + target]);
            };
            Logger.errorIf = function (target, message, condition) {
                if (condition === void 0) { condition = true; }
                if (Logger.level <= LoggerLevel.Error && condition)
                    Logger.logger.error('[' + Logger.namespace + 'Error  ] ', [message + ' : ' + target]);
            };
            Logger.level = LoggerLevel.Verbose;
            Logger.logger = new ConsoleLogging();
            Logger.namespace = '';
            return Logger;
        }());
        util.Logger = Logger;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
function trace() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    alm.util.Logger.info.apply(trace.caller, arguments);
}
function throwWarn(target, message, condition) {
    if (condition === void 0) { condition = true; }
    alm.util.Logger.warnIf.apply(null, arguments);
}
function throwError(target, message, condition) {
    if (condition === void 0) { condition = true; }
    alm.util.Logger.errorIf.apply(null, arguments);
}
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Easing = (function () {
            function Easing() {
            }
            Easing.linear = function (t, b, c, d) {
                return c * t / d + b;
            };
            Easing.easeInQuad = function (t, b, c, d) {
                return c * (t /= d) * t + b;
            };
            Easing.easeOutQuad = function (t, b, c, d) {
                return (-c) * (t /= d) * (t - 2) + b;
            };
            Easing.easeInOutQuad = function (t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t + b;
                return (-c) / 2 * ((--t) * (t - 2) - 1) + b;
            };
            Easing.easeInCubic = function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            };
            Easing.easeOutCubic = function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            };
            Easing.easeInOutCubic = function (t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            };
            Easing.easeInQuart = function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            };
            Easing.easeOutQuart = function (t, b, c, d) {
                return (-c) * ((t = t / d - 1) * t * t * t - 1) + b;
            };
            Easing.easeInOutQuart = function (t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t * t * t + b;
                return (-c) / 2 * ((t -= 2) * t * t * t - 2) + b;
            };
            Easing.easeInQuint = function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            };
            Easing.easeOutQuint = function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            };
            Easing.easeInOutQuint = function (t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            };
            Easing.easeInSine = function (t, b, c, d) {
                return (-c) * Math.cos(t / d * (Math.PI / 2)) + c + b;
            };
            Easing.easeOutSine = function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            };
            Easing.easeInOutSine = function (t, b, c, d) {
                return (-c) / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            };
            Easing.easeInExpo = function (t, b, c, d) {
                if (t == 0)
                    return b;
                return c * Math.pow(2, 10 * (t / d - 1)) + b;
            };
            Easing.easeOutExpo = function (t, b, c, d) {
                if (t == d)
                    return b + c;
                return c * (-Math.pow(2, -10 * t / d) + 1) + b;
            };
            Easing.easeInOutExpo = function (t, b, c, d) {
                if (t == 0)
                    return b;
                if (t == d)
                    return b + c;
                if ((t /= d / 2) < 1)
                    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            };
            Easing.easeInCirc = function (t, b, c, d) {
                return (-c) * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            };
            Easing.easeOutCirc = function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            };
            Easing.easeInOutCirc = function (t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return (-c) / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            };
            Easing.createEaseInElastic = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t, b, c, d) {
                    var p = 0;
                    var a = c;
                    if (t == 0)
                        return b;
                    if ((t /= d) == 1)
                        return b + c;
                    if (p == 0)
                        p = d * 0.3;
                    if (a < Math.abs(c)) {
                        a = c;
                        s = p / 4;
                    }
                    else {
                        s = p / (2 * Math.PI) * Math.asin(c / a);
                    }
                    return (-a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                };
            };
            Easing.createEaseOutElastic = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t, b, c, d) {
                    var p = 0;
                    var a = c;
                    if (t == 0)
                        return b;
                    if ((t /= d) == 1)
                        return b + c;
                    if (p == 0)
                        p = d * 0.3;
                    if (a < Math.abs(c)) {
                        a = c;
                        s = p / 4;
                    }
                    else {
                        s = p / (2 * Math.PI) * Math.asin(c / a);
                    }
                    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
                };
            };
            Easing.createEaseInOutElastic = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t, b, c, d) {
                    var p = 0;
                    var a = c;
                    if (t == 0)
                        return b;
                    if ((t /= d / 2) == 2)
                        return b + c;
                    if (p == 0)
                        p = d * (0.3 * 1.5);
                    if (a < Math.abs(c)) {
                        a = c;
                        s = p / 4;
                    }
                    else {
                        s = p / (2 * Math.PI) * Math.asin(c / a);
                    }
                    if (t < 1)
                        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
                };
            };
            Easing.easeInElastic = function (t, b, c, d) {
                return Easing.defaultEaseInElastic(t, b, c, d);
            };
            Easing.easeOutElastic = function (t, b, c, d) {
                return Easing.defaultEaseOutElastic(t, b, c, d);
            };
            Easing.easeInOutElastic = function (t, b, c, d) {
                return Easing.defaultEaseInOutElastic(t, b, c, d);
            };
            Easing.createEaseInBack = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t, b, c, d) {
                    return c * (t /= d) * t * ((s + 1) * t - s) + b;
                };
            };
            Easing.createEaseOutBack = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t, b, c, d) {
                    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                };
            };
            Easing.createEaseInOutBack = function (s) {
                if (s === void 0) { s = 1.70158; }
                return function (t, b, c, d) {
                    if ((t /= d / 2) < 1)
                        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
                    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
                };
            };
            Easing.easeInBack = function (t, b, c, d) {
                return Easing.defaultEaseInElastic(t, b, c, d);
            };
            Easing.easeOutBack = function (t, b, c, d) {
                return Easing.defaultEaseOutBack(t, b, c, d);
            };
            Easing.easeInOutBack = function (t, b, c, d) {
                return Easing.defaultEaseInOutBack(t, b, c, d);
            };
            Easing.easeInBounce = function (t, b, c, d) {
                return c - Easing.easeOutBounce(d - t, 0, c, d) + b;
            };
            Easing.easeOutBounce = function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                }
                else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
                }
                else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
                }
                else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
                }
            };
            Easing.easeInOutBounce = function (t, b, c, d) {
                if (t < d / 2)
                    return Easing.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
                return Easing.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
            };
            Easing.defaultEaseInElastic = Easing.createEaseInElastic();
            Easing.defaultEaseOutElastic = Easing.createEaseOutElastic();
            Easing.defaultEaseInOutElastic = Easing.createEaseInOutElastic();
            Easing.defaultEaseInBack = Easing.createEaseInBack();
            Easing.defaultEaseOutBack = Easing.createEaseOutBack();
            Easing.defaultEaseInOutBack = Easing.createEaseInOutBack();
            return Easing;
        }());
        util.Easing = Easing;
    })(util = alm.util || (alm.util = {}));
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
            Event.prototype.getType = function () {
                return this.type;
            };
            Event.prototype.getTarget = function () {
                return this.target;
            };
            Event.prototype.getData = function () {
                return this.data;
            };
            Event.prototype.setData = function (data) {
                this.data = data;
            };
            return Event;
        }());
        event.Event = Event;
    })(event = alm.event || (alm.event = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var event;
    (function (event_1) {
        var Logger = alm.util.Logger;
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
                var listeners = this.listeners[event.getType()];
                if (listeners) {
                    var numListeners = listeners.length;
                    for (var i = 0; i < numListeners; ++i) {
                        listeners[i].call(this.target, event);
                    }
                }
            };
            EventDispatcher.prototype.dispatchEventType = function (eventType, target, data) {
                if (target === void 0) { target = null; }
                if (data === void 0) { data = null; }
                this.dispatchEvent(new event_1.Event(eventType, target, data));
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
            if (eventTarget === void 0) { eventTarget = null; }
            return _super.call(this, eventType, eventTarget) || this;
        }
        CommandEvent.prototype.clone = function () {
            return new CommandEvent(this.getType(), this.getTarget());
        };
        CommandEvent.prototype.toString = function () {
            return '[CommandEvent] type = ' + this.getType();
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
            this.insertCommandAt.apply(this, [0].concat(commands));
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
            this.insertCommandAt.apply(this, [index].concat(commands));
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
            _this.completeHandler = function (event) {
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
    var Easing = alm.util.Easing;
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
                var elapsedTime = new Date().getTime() - _this.startTime;
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
                this.startTime = new Date().getTime();
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
            this.progressValue = this.easing(this.progressTime, 0, 1, 1);
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
            _super.prototype.insertCommandAt.apply(this, [this.position + 1].concat(commands));
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
            Num.map = function (value, srcMin, srcMax, dstMin, dstMax, clamp) {
                if (clamp === void 0) { clamp = true; }
                if (srcMin == srcMax)
                    return dstMin;
                if (clamp) {
                    if (srcMin < srcMax) {
                        if (value < srcMin)
                            value = srcMin;
                        else if (value > srcMax)
                            value = srcMax;
                    }
                    else {
                        if (value < srcMax)
                            value = srcMax;
                        else if (value > srcMin)
                            value = srcMin;
                    }
                }
                return (value - srcMin) * (dstMax - dstMin) / (srcMax - srcMin) + dstMin;
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
        })(Align = util.Align || (util.Align = {}));
        var ScaleMode;
        (function (ScaleMode) {
            ScaleMode[ScaleMode["ExactFit"] = 0] = "ExactFit";
            ScaleMode[ScaleMode["ShowAll"] = 1] = "ShowAll";
            ScaleMode[ScaleMode["NoBorder"] = 2] = "NoBorder";
            ScaleMode[ScaleMode["NoScale"] = 3] = "NoScale";
        })(ScaleMode = util.ScaleMode || (util.ScaleMode = {}));
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
                        return new alm.geom.Rectangle(bx, by, bw, bh);
                }
                tx = bx + ((align == Align.Top_Left || align == Align.Middle_Left || align == Align.Bottom_Left) ? 0 :
                    (align == Align.Top_Right || align == Align.Middle_Right || align == Align.Bottom_Right) ? (bw - tw) : (bw - tw) / 2);
                ty = by + ((align == Align.Top_Left || align == Align.Top_Center || align == Align.Top_Right) ? 0 :
                    (align == Align.Bottom_Left || align == Align.Bottom_Center || align == Align.Bottom_Right) ? (bh - th) : (bh - th) / 2);
                return new alm.geom.Rectangle(tx, ty, tw, th);
            };
            return Boxer;
        }());
        util.Boxer = Boxer;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Raffle = (function () {
            function Raffle(values) {
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
            Raffle.prototype.set = function (values) {
                this.initValues = values.concat();
                this.reset();
            };
            Raffle.prototype.get = function () {
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
            Raffle.prototype.add = function (value, reset) {
                if (reset === void 0) { reset = false; }
                this.initValues.push(value);
                this.restValues.push(value);
                this.restCount = this.restValues.length;
                this.isEmpty = this.restCount == 0;
                if (reset) {
                    this.reset();
                }
            };
            Raffle.prototype.reset = function () {
                this.restValues = this.initValues.concat();
                this.restCount = this.restValues.length;
                this.isEmpty = this.restCount == 0;
            };
            Raffle.prototype.getRestCount = function () {
                return this.restCount;
            };
            Raffle.prototype.getIsEmply = function () {
                return this.isEmpty;
            };
            Raffle.prototype.getIsAutoResetEnabled = function () {
                return this.isAutoResetEnabled;
            };
            Raffle.prototype.setIsAutoResetEnabled = function (enabled) {
                this.isAutoResetEnabled = enabled;
            };
            Raffle.createIndices = function (count) {
                var values = new Array(count);
                for (var i = 0; i < count; ++i)
                    values[i] = i;
                return new Raffle(values);
            };
            return Raffle;
        }());
        util.Raffle = Raffle;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Rotator = (function () {
            function Rotator(angle, velocity, radian) {
                if (angle === void 0) { angle = 0; }
                if (velocity === void 0) { velocity = 0; }
                if (radian === void 0) { radian = true; }
                this.setAngle(angle, radian);
                this.setVelocity(velocity, radian);
            }
            Rotator.prototype.getAngle = function (radian) {
                if (radian === void 0) { radian = true; }
                return radian ? this.angle : (this.angle * 180 / Math.PI);
            };
            Rotator.prototype.setAngle = function (angle, radian) {
                if (radian === void 0) { radian = true; }
                this.angle = radian ? angle : (angle * Math.PI / 180);
            };
            Rotator.prototype.getVelocity = function (radian) {
                if (radian === void 0) { radian = true; }
                return radian ? this.velocity : (this.velocity * 180 / Math.PI);
            };
            Rotator.prototype.setVelocity = function (velocity, radian) {
                if (radian === void 0) { radian = true; }
                this.velocity = radian ? velocity : (velocity * Math.PI / 180);
            };
            Rotator.prototype.update = function () {
                this.angle += this.velocity;
            };
            Rotator.prototype.getSin = function (length) {
                if (length === void 0) { length = 1; }
                return length * Math.sin(this.angle);
            };
            Rotator.prototype.getCos = function (length) {
                if (length === void 0) { length = 1; }
                return length * Math.cos(this.angle);
            };
            Rotator.prototype.getTan = function (length) {
                if (length === void 0) { length = 1; }
                return length * Math.tan(this.angle);
            };
            Rotator.prototype.getMagnitude = function (length) {
                if (length === void 0) { length = 1; }
                return length * (1 + Math.sin(this.angle)) / 2;
            };
            Rotator.prototype.getVector = function (length, xy) {
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
            return Rotator;
        }());
        util.Rotator = Rotator;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Pager = (function (_super) {
            __extends(Pager, _super);
            function Pager() {
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
            Pager.prototype.setupById = function (ids) {
                this.itemCount = ids.length;
                this.itemIds = ids;
                this.itemIndexById = {};
                for (var i = 0; i < this.itemCount; ++i) {
                    this.itemIndexById[this.itemIds[i]] = i;
                }
                this.setup();
            };
            Pager.prototype.setupByCount = function (itemCount) {
                this.itemCount = itemCount;
                this.itemIds = null;
                this.itemIndexById = null;
                this.setup();
            };
            Pager.prototype.setup = function () {
                this.newItemIndex = -1;
                this.oldItemIndex = -1;
                this.newItemId = null;
                this.oldItemId = null;
            };
            Pager.prototype.gotoByIndex = function (itemIndex, useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                if (itemIndex < 0 || itemIndex >= this.itemCount)
                    itemIndex = -1;
                if (itemIndex == this.newItemIndex)
                    return false;
                this.oldItemIndex = this.newItemIndex;
                this.newItemIndex = itemIndex;
                if (this.itemIds) {
                    this.oldItemId = this.oldItemIndex != -1 ? this.itemIds[this.oldItemIndex] : null;
                    this.newItemId = this.newItemIndex != -1 ? this.itemIds[this.newItemIndex] : null;
                }
                this.dispatchPagerEvent(util.PagerEvent.CHANGE, this.onChange, useTransition);
                return true;
            };
            Pager.prototype.gotoById = function (itemId, useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                var itemIndex = this.itemIndexById.hasOwnProperty(itemId) ? this.itemIndexById[itemId] : -1;
                return this.gotoByIndex(itemIndex, useTransition);
            };
            Pager.prototype.prev = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                var itemIndex = this.newItemIndex - 1;
                if (this.isLoopEnabled && itemIndex < 0)
                    itemIndex = this.itemCount - 1;
                var result = this.gotoByIndex(itemIndex, useTransition);
                if (result) {
                    this.dispatchPagerEvent(util.PagerEvent.PREV, this.onPrev, useTransition);
                }
                return result;
            };
            Pager.prototype.next = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                var itemIndex = this.newItemIndex + 1;
                if (this.isLoopEnabled && itemIndex >= this.itemCount)
                    itemIndex = 0;
                var result = this.gotoByIndex(itemIndex, useTransition);
                if (result) {
                    this.dispatchPagerEvent(util.PagerEvent.NEXT, this.onNext, useTransition);
                }
                return result;
            };
            Pager.prototype.dispatchPagerEvent = function (eventType, callback, useTransition) {
                var oldItemId = (this.itemIds && this.oldItemIndex != -1) ? this.itemIds[this.oldItemIndex] : null;
                var newItemId = (this.itemIds && this.newItemIndex != -1) ? this.itemIds[this.newItemIndex] : null;
                var event = new util.PagerEvent(eventType, this, this.newItemIndex, this.oldItemIndex, this.newItemId, this.oldItemId, useTransition);
                if (callback) {
                    callback(event);
                }
                this.dispatchEvent(event);
            };
            Pager.prototype.getIsLoopEnabled = function () { return this.isLoopEnabled; };
            Pager.prototype.setIsLoopEnabled = function (value) { this.isLoopEnabled = value; };
            Pager.prototype.getNewItemIndex = function () { return this.newItemIndex; };
            Pager.prototype.getOldItemIndex = function () { return this.oldItemIndex; };
            Pager.prototype.getItemCount = function () { return this.itemCount; };
            Pager.prototype.getNewItemId = function () { return this.newItemId; };
            Pager.prototype.getOldItemId = function () { return this.oldItemId; };
            Pager.prototype.getItemIds = function () { return this.itemIds; };
            return Pager;
        }(alm.event.EventDispatcher));
        util.Pager = Pager;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var PagerEvent = (function (_super) {
            __extends(PagerEvent, _super);
            function PagerEvent(eventType, eventTarget, newItemIndex, oldItemIndex, newItemId, oldItemId, useTransition) {
                var _this = _super.call(this, eventType, eventTarget) || this;
                _this.newItemIndex = newItemIndex;
                _this.oldItemIndex = oldItemIndex;
                _this.newItemId = newItemId;
                _this.oldItemId = oldItemId;
                _this.useTransition = useTransition;
                return _this;
            }
            PagerEvent.prototype.clone = function () {
                return new PagerEvent(this.getType(), this.getTarget(), this.newItemIndex, this.oldItemIndex, this.newItemId, this.oldItemId, this.useTransition);
            };
            PagerEvent.prototype.toString = function () {
                return '[PagerEvent] type = ' + this.getType() + ', ' + this.oldItemIndex + ' -> ' + this.newItemIndex + ', transition = ' + this.useTransition;
            };
            PagerEvent.CHANGE = 'change';
            PagerEvent.PREV = 'prev';
            PagerEvent.NEXT = 'next';
            return PagerEvent;
        }(alm.event.Event));
        util.PagerEvent = PagerEvent;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var EventDispatcher = alm.event.EventDispatcher;
        var Timer = (function (_super) {
            __extends(Timer, _super);
            function Timer(interval, repeatCount) {
                if (interval === void 0) { interval = 1000; }
                if (repeatCount === void 0) { repeatCount = 0; }
                var _this = _super.call(this) || this;
                _this.timerHandler = function () {
                    _this.tStartTime = _this.getCurrentTime();
                    ++_this.elapsedCount;
                    var isCompleted = false;
                    if (_this.repeatCount > 0 && _this.elapsedCount >= _this.repeatCount) {
                        isCompleted = true;
                        _this.stop();
                    }
                    else if (_this.tInterval != _this.interval) {
                        _this.startInterval(_this.interval);
                    }
                    _this.dispatch(util.TimerEvent.TICK);
                    if (isCompleted) {
                        _this.dispatch(util.TimerEvent.COMPLETE);
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
                this.tStartTime = this.getCurrentTime();
                this.startInterval(this.tRestTime != -1 ? this.tRestTime : this.interval);
            };
            Timer.prototype.stop = function () {
                if (!this.isRunning)
                    return;
                this.isRunning = false;
                this.tRestTime = this.getCurrentTime() - this.tStartTime;
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
            Timer.prototype.getCurrentTime = function () {
                return new Date().valueOf();
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
                this.dispatchEvent(new util.TimerEvent(eventType, this, this.elapsedCount, this.repeatCount, this.getRestCount()));
            };
            Timer.prototype.getIsRunning = function () { return this.isRunning; };
            Timer.prototype.getInterval = function () { return this.interval; };
            Timer.prototype.setInterval = function (interval) { this.interval = interval; };
            Timer.prototype.getElapsedTime = function () { return this.getCurrentTime() - this.tStartTime; };
            Timer.prototype.getRestTime = function () { return this.interval - this.getElapsedTime(); };
            Timer.prototype.getElapsedCount = function () { return this.elapsedCount; };
            Timer.prototype.getRepeatCount = function () { return this.repeatCount; };
            Timer.prototype.setRepeatCount = function (count) { this.repeatCount = count; };
            Timer.prototype.getRestCount = function () { return this.repeatCount - this.elapsedCount; };
            return Timer;
        }(EventDispatcher));
        util.Timer = Timer;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var Event = alm.event.Event;
        var TimerEvent = (function (_super) {
            __extends(TimerEvent, _super);
            function TimerEvent(eventType, eventTarget, elapsedCount, repeatCount, restCount) {
                if (eventTarget === void 0) { eventTarget = null; }
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
                return new TimerEvent(this.getType(), this.getTarget(), this.elapsedCount, this.repeatCount, this.restCount);
            };
            TimerEvent.prototype.toString = function () {
                return '[TimerEvent] type = ' + this.getType() + ', elapsedCount = ' + this.elapsedCount + ', repeatCount=' + this.repeatCount + ', restCount=' + this.restCount;
            };
            TimerEvent.TICK = 'tick';
            TimerEvent.COMPLETE = 'complete';
            return TimerEvent;
        }(Event));
        util.TimerEvent = TimerEvent;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
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
        util.ObjectPool = ObjectPool;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var CommandUtil = (function () {
            function CommandUtil() {
            }
            CommandUtil.stop = function (command) {
                if (command)
                    command.interrupt();
                return null;
            };
            CommandUtil.sequence = function (execute) {
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
            CommandUtil.single = function (execute, command) {
                if (execute && command)
                    command.execute();
                return command;
            };
            return CommandUtil;
        }());
        util.CommandUtil = CommandUtil;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var loader;
    (function (loader) {
        var AssetLoader = (function () {
            function AssetLoader() {
                var _this = this;
                this.fileLoadCompleteHandler = function (query, content) {
                    query.isLoading = false;
                    query.isLoadComplete = true;
                    query.content = content;
                    if (query.param.onLoad) {
                        query.param.onLoad(content);
                    }
                    _this.next();
                };
                this.fileLoadErrorHandler = function (query, message) {
                    query.isLoading = false;
                    query.isLoadComplete = true;
                    if (query.param.onError) {
                        query.param.onError(message);
                    }
                    _this.next();
                };
                this.isLoading_ = false;
                this.currentCount = 0;
                this.totalCount = 0;
                this.loadingQueries = [];
                this.loadingQueryIndex = -1;
                this.queriesByQueryId = {};
                this.queriesByUrl = {};
                this.handlersByType = {};
                this.eventDispatcher = new alm.event.EventDispatcher();
            }
            AssetLoader.prototype.require = function (url, type) {
                return this.addQuery(type, url, {});
            };
            AssetLoader.prototype.addQuery = function (type, url, param) {
                if (this.queriesByUrl[url])
                    return this.queriesByUrl[url].id;
                var query = new loader.FileQuery();
                query.id = String(AssetLoader.id);
                query.type = type;
                query.url = url;
                query.param = param;
                this.loadingQueries.push(query);
                this.queriesByQueryId[query.id] = query;
                this.queriesByUrl[query.url] = query;
                ++AssetLoader.id;
                return query.id;
            };
            AssetLoader.prototype.load = function () {
                if (this.isLoading_)
                    return;
                this.isLoading_ = true;
                this.loadingQueryIndex = -1;
                this.next();
            };
            AssetLoader.prototype.next = function () {
                var _this = this;
                this.currentCount = this.loadingQueryIndex + 1;
                this.totalCount = this.loadingQueries.length;
                if (this.currentCount > 0) {
                    this.eventDispatcher.dispatchEvent(new loader.AssetLoaderEvent(loader.AssetLoaderEvent.PROGRESS, this, this.currentCount / this.totalCount, this.currentCount, this.totalCount));
                }
                if (this.currentCount < this.totalCount) {
                    this.loadingQueryIndex++;
                    var query_1 = this.loadingQueries[this.loadingQueryIndex];
                    query_1.isLoading = true;
                    query_1.isLoadComplete = false;
                    trace('[AssetLoader] loading... ' + '\'' + query_1.url + '' + query_1.type + '\'');
                    var handler = this.handlersByType[query_1.type];
                    if (handler) {
                        handler.load(query_1.url, function (content) {
                            _this.fileLoadCompleteHandler(query_1, content);
                        }, function (message) {
                            if (message === void 0) { message = ''; }
                            _this.fileLoadErrorHandler(query_1, message);
                        });
                    }
                    else {
                        trace('[AssetLoader] handler is not found \'' + query_1.type + '\'');
                        this.next();
                    }
                }
                else {
                    this.isLoading_ = false;
                    this.loadingQueries = [];
                    this.loadingQueryIndex = -1;
                    this.eventDispatcher.dispatchEvent(new loader.AssetLoaderEvent(loader.AssetLoaderEvent.COMPLETE, this, this.currentCount / this.totalCount, this.currentCount, this.totalCount));
                }
            };
            AssetLoader.prototype.addHandler = function (handler) {
                this.handlersByType[handler.getType()] = handler;
            };
            AssetLoader.prototype.addLoadUpdateListener = function (listener) {
                this.eventDispatcher.addEventListener(loader.AssetLoaderEvent.PROGRESS, listener);
            };
            AssetLoader.prototype.removeLoadUpdateListener = function (listener) {
                this.eventDispatcher.removeEventListener(loader.AssetLoaderEvent.PROGRESS, listener);
            };
            AssetLoader.prototype.addLoadCompleteListener = function (listener) {
                this.eventDispatcher.addEventListener(loader.AssetLoaderEvent.COMPLETE, listener);
            };
            AssetLoader.prototype.removeLoadCompleteListener = function (listener) {
                this.eventDispatcher.removeEventListener(loader.AssetLoaderEvent.COMPLETE, listener);
            };
            AssetLoader.prototype.getQueryByQueryId = function (queryId) {
                return this.queriesByQueryId[queryId];
            };
            AssetLoader.prototype.getQueryByUrl = function (url) {
                return this.queriesByUrl[url];
            };
            AssetLoader.prototype.isLoading = function () { return this.isLoading_; };
            AssetLoader.prototype.getCurrentCount = function () { return this.currentCount; };
            AssetLoader.prototype.getTotalCount = function () { return this.totalCount; };
            AssetLoader.prototype.getContentByUrl = function (url) { return this.queriesByUrl[url].content; };
            AssetLoader.prototype.getContentByQueryId = function (textureId) { return this.queriesByQueryId[textureId].content; };
            AssetLoader.id = 0;
            return AssetLoader;
        }());
        loader.AssetLoader = AssetLoader;
    })(loader = alm.loader || (alm.loader = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var loader;
    (function (loader) {
        var AssetLoaderEvent = (function (_super) {
            __extends(AssetLoaderEvent, _super);
            function AssetLoaderEvent(eventType, eventTarget, progress, loadedCount, totalCount, content) {
                if (eventTarget === void 0) { eventTarget = null; }
                if (progress === void 0) { progress = 0; }
                if (loadedCount === void 0) { loadedCount = 0; }
                if (totalCount === void 0) { totalCount = 0; }
                if (content === void 0) { content = null; }
                var _this = _super.call(this, eventType, eventTarget) || this;
                _this.progress = progress;
                _this.loadedCount = loadedCount;
                _this.totalCount = totalCount;
                _this.content = content;
                return _this;
            }
            AssetLoaderEvent.prototype.clone = function () {
                return new AssetLoaderEvent(this.getType(), this.getTarget(), this.progress, this.loadedCount, this.totalCount, this.content);
            };
            AssetLoaderEvent.prototype.toString = function () {
                return '[AssetLoaderEvent] type = ' + this.getType() + ', progress = ' + this.progress + ', loadedCount = ' + this.loadedCount + ', totalCount = ' + this.totalCount;
            };
            AssetLoaderEvent.PROGRESS = 'progress';
            AssetLoaderEvent.COMPLETE = 'complete';
            AssetLoaderEvent.ERROR = 'error';
            return AssetLoaderEvent;
        }(alm.event.Event));
        loader.AssetLoaderEvent = AssetLoaderEvent;
    })(loader = alm.loader || (alm.loader = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var loader;
    (function (loader) {
        var FileQuery = (function () {
            function FileQuery() {
                this.isLoading = false;
                this.isLoadComplete = false;
            }
            return FileQuery;
        }());
        loader.FileQuery = FileQuery;
    })(loader = alm.loader || (alm.loader = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var view;
    (function (view_1) {
        var EventDispatcher = alm.event.EventDispatcher;
        var Logger = alm.util.Logger;
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
                _this.isReadying = false;
                _this.isReadied = false;
                _this.isShowing = false;
                _this.isShown = true;
                _this.isHiding = false;
                if (View.viewsById[_this.id]) {
                    Logger.warn('View id \'' + _this.id + '\' is already exists.');
                }
                View.viewsById[_this.id] = _this;
                ++View.viewCount;
                return _this;
            }
            View.prototype.initialize = function () {
                if (this.isInitializing || this.isInitialized)
                    return;
                this.isInitializing = true;
                this.view = this.implInitialize();
                if (this.isInitializing) {
                    throwError(this.name || this, 'view is null', !this.view);
                    this.hide(false);
                    this.isInitializing = false;
                    this.isInitialized = true;
                }
                else {
                    this.view = null;
                }
            };
            View.prototype.ready = function () {
                if (this.isReadying || this.isReadied)
                    return;
                this.isReadying = true;
                throwError(this.name || this, 'ready() was called without being initialized', !this.isInitialized);
                this.implReady();
                this.isReadying = false;
                this.isReadied = true;
            };
            View.prototype.finalize = function () {
                if (!this.isInitializing && !this.isInitialized)
                    return;
                this.implFinalize();
                this.isInitializing = false;
                this.isInitialized = false;
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
                    throwError(_this.name || _this, 'getShowCommand() was called without being initialized', _this.isInitializing || !_this.isInitialized);
                    throwWarn(_this.name || _this, 'getShowCommand() was called without being ready', _this.isReadying || !_this.isReadied);
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
                    command.insertCommand(_this.implShow(_this.view, useTransition), new cmd.Func(function () {
                        _this.showCommand = null;
                        _this.isShowing = false;
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
                        throwError(_this.name || _this, 'getHideCommand() was called without being initialized', _this.isInitializing || !_this.isInitialized);
                        throwWarn(_this.name || _this, 'getHideCommand() was called without being ready', _this.isReadying || !_this.isReadied);
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
                    command.insertCommand(_this.implHide(_this.view, useTransition), new cmd.Func(function () {
                        _this.hideCommand = null;
                        _this.isHiding = false;
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
                if (hitArea === void 0) { hitArea = null; }
                if (isHoverCursorEnabled === void 0) { isHoverCursorEnabled = true; }
                if (isPreventDefaultEnabled === void 0) { isPreventDefaultEnabled = true; }
                if (isStopPropagationEnabled === void 0) { isStopPropagationEnabled = true; }
                var _this = this;
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
            };
            ButtonBehavior.prototype.off = function () {
                if (this.hitArea == null)
                    return;
                this.hitArea.removeEventListener('mouseover', this.mouseOverHandler);
                this.hitArea.removeEventListener('mouseout', this.mouseOutHandler);
                this.hitArea.removeEventListener('mousedown', this.mouseDownHandler);
                this.hitArea.removeEventListener('mouseup', this.mouseUpHandler);
                this.hitArea.removeEventListener('click', this.clickHandler);
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
                var expiredAt = milliseconds > 0 ? new Date().getTime() + milliseconds : -1;
                return LocalStorage.save(key, value, expiredAt);
            };
            LocalStorage.load = function (key, defaultValue) {
                if (defaultValue === void 0) { defaultValue = null; }
                if (!LocalStorage.isAvailable())
                    return defaultValue;
                var record = JSON.parse(localStorage.getItem(key));
                if (record) {
                    if (record.expiredAt > 0) {
                        if (new Date().getTime() < record.expiredAt) {
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
                if (eventTarget === void 0) { eventTarget = null; }
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
                return new KeyWatcherEvent(this.getType(), this.getTarget(), this.originalEvent);
            };
            KeyWatcherEvent.prototype.toString = function () {
                return '[KeyWatcherEvent] type = ' + this.getType() + ', key = ' + this.key + ', keyCode = ' + this.keyCode + ', altKey = ' + this.altKey + ', ctrlKey = ' + this.ctrlKey + ', shiftKey = ' + this.shiftKey;
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
                if (eventTarget === void 0) { eventTarget = null; }
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
                return new WindowWatcherEvent(this.getType(), this.getTarget(), this.originalEvent, this.scrollTop, this.scrollBottom, this.windowWidth, this.windowHeight);
            };
            WindowWatcherEvent.prototype.toString = function () {
                return '[WindowWatcherEvent] type = ' + this.getType() + ', scrollTop = ' + this.scrollTop + ', scrollBottom = ' + this.scrollBottom + ', windowWidth = ' + this.windowWidth + ', windowHeight = ' + this.windowHeight;
            };
            WindowWatcherEvent.SCROLL = 'scroll';
            WindowWatcherEvent.RESIZE = 'resize';
            return WindowWatcherEvent;
        }(alm.event.Event));
        browser.WindowWatcherEvent = WindowWatcherEvent;
    })(browser = alm.browser || (alm.browser = {}));
})(alm || (alm = {}));
var scn;
(function (scn) {
    var Logger = alm.util.Logger;
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
            if (eventTarget === void 0) { eventTarget = null; }
            return _super.call(this, eventType, eventTarget) || this;
        }
        SceneEvent.prototype.clone = function () {
            return new SceneEvent(this.getType(), this.getTarget());
        };
        SceneEvent.prototype.toString = function () {
            return '[SceneEvent] type = ' + this.getType();
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
    var Logger = alm.util.Logger;
    var LoggerLevel = alm.util.LoggerLevel;
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
            if (eventTarget === void 0) { eventTarget = null; }
            return _super.call(this, eventType, eventTarget) || this;
        }
        SceneManagerEvent.prototype.clone = function () {
            return new SceneManagerEvent(this.getType(), this.getTarget());
        };
        SceneManagerEvent.prototype.toString = function () {
            return '[SceneManagerEvent] type = ' + this.getType();
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

//# sourceMappingURL=alumican.js.map
