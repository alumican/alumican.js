var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var alm;
(function (alm) {
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
    alm.Arr = Arr;
})(alm || (alm = {}));
var alm;
(function (alm) {
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
    })(Align = alm.Align || (alm.Align = {}));
    var ScaleMode;
    (function (ScaleMode) {
        ScaleMode[ScaleMode["ExactFit"] = 0] = "ExactFit";
        ScaleMode[ScaleMode["ShowAll"] = 1] = "ShowAll";
        ScaleMode[ScaleMode["NoBorder"] = 2] = "NoBorder";
        ScaleMode[ScaleMode["NoScale"] = 3] = "NoScale";
    })(ScaleMode = alm.ScaleMode || (alm.ScaleMode = {}));
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
                    return new alm.Rectangle(bx, by, bw, bh);
            }
            tx = bx + ((align == Align.Top_Left || align == Align.Middle_Left || align == Align.Bottom_Left) ? 0 :
                (align == Align.Top_Right || align == Align.Middle_Right || align == Align.Bottom_Right) ? (bw - tw) : (bw - tw) / 2);
            ty = by + ((align == Align.Top_Left || align == Align.Top_Center || align == Align.Top_Right) ? 0 :
                (align == Align.Bottom_Left || align == Align.Bottom_Center || align == Align.Bottom_Right) ? (bh - th) : (bh - th) / 2);
            return new alm.Rectangle(tx, ty, tw, th);
        };
        return Boxer;
    }());
    alm.Boxer = Boxer;
})(alm || (alm = {}));
var alm;
(function (alm) {
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
        return CommandUtil;
    }());
    alm.CommandUtil = CommandUtil;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var DeviceInfo = (function () {
        function DeviceInfo() {
        }
        DeviceInfo.initialize = function () {
            if (this.isInitialized)
                return;
            this.isInitialized = true;
            var u = window.navigator.userAgent.toLowerCase();
            this.isTablet = (u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
                || u.indexOf("ipad") != -1
                || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
                || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
                || u.indexOf("kindle") != -1
                || u.indexOf("silk") != -1
                || u.indexOf("playbook") != -1;
            this.isMobile = (u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
                || u.indexOf("iphone") != -1
                || u.indexOf("ipod") != -1
                || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
                || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
                || u.indexOf("blackberry") != -1;
            this.isDesktop = !this.isTablet && !this.isMobile;
            this.isIOS = u.indexOf("ipad") != -1 || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1;
            this.isAndroid = u.indexOf("android") != -1 && u.indexOf("mobile") != -1;
            this.isRetina = Math.round(window.devicePixelRatio) == 2;
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
        DeviceInfo.getIsRetina = function () {
            this.initialize();
            return this.isRetina;
        };
        DeviceInfo.isInitialized = false;
        return DeviceInfo;
    }());
    alm.DeviceInfo = DeviceInfo;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var JQueryUtil = (function () {
        function JQueryUtil() {
        }
        JQueryUtil.fadeTo = function (target, opacity, duration, easing, switchDisplayTo, switchVisibility, execute) {
            if (switchDisplayTo === void 0) { switchDisplayTo = ""; }
            if (switchVisibility === void 0) { switchVisibility = false; }
            if (execute === void 0) { execute = true; }
            var o = { value: parseInt(target.css("opacity")) };
            var tween = new cmd.Tween(o, { value: opacity }, null, duration, easing, function () {
                if (opacity > 0) {
                    if (switchDisplayTo != "")
                        target.css("display", switchDisplayTo);
                    if (switchVisibility)
                        target.css("visibility", "visible");
                }
            }, function () {
                target.css("opacity", o["value"]);
            }, function () {
                if (opacity <= 0) {
                    if (switchDisplayTo != "")
                        target.css("display", "none");
                    if (switchVisibility)
                        target.css("visibility", "hidden");
                }
            });
            if (execute)
                tween.execute();
            return tween;
        };
        JQueryUtil.fadeInJquery = function (target, duration, easing, switchDisplayTo, switchVisibility, execute) {
            if (switchDisplayTo === void 0) { switchDisplayTo = ""; }
            if (switchVisibility === void 0) { switchVisibility = false; }
            if (execute === void 0) { execute = true; }
            return JQueryUtil.fadeTo(target, 1, duration, easing, switchDisplayTo, switchVisibility, execute);
        };
        JQueryUtil.fadeOutJquery = function (target, duration, easing, switchDisplayTo, switchVisibility, execute) {
            if (switchDisplayTo === void 0) { switchDisplayTo = ""; }
            if (switchVisibility === void 0) { switchVisibility = false; }
            if (execute === void 0) { execute = true; }
            return JQueryUtil.fadeTo(target, 0, duration, easing, switchDisplayTo, switchVisibility, execute);
        };
        return JQueryUtil;
    }());
    alm.JQueryUtil = JQueryUtil;
})(alm || (alm = {}));
var alm;
(function (alm) {
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
                    localStorage.setItem("__CKECK__", "__CKECK__");
                    localStorage.removeItem("__CKECK__");
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
    alm.LocalStorage = LocalStorage;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var LoggerLevel;
    (function (LoggerLevel) {
        LoggerLevel[LoggerLevel["Verbose"] = 0] = "Verbose";
        LoggerLevel[LoggerLevel["Info"] = 1] = "Info";
        LoggerLevel[LoggerLevel["Warn"] = 2] = "Warn";
        LoggerLevel[LoggerLevel["Error"] = 3] = "Error";
        LoggerLevel[LoggerLevel["Silent"] = 4] = "Silent";
    })(LoggerLevel = alm.LoggerLevel || (alm.LoggerLevel = {}));
    var Logger = (function () {
        function Logger() {
        }
        Logger.verbose = function () {
            var messages = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                messages[_i] = arguments[_i];
            }
            if (Logger.level <= LoggerLevel.Verbose)
                console.debug.apply(console, Array.prototype.slice.call(["Verbose: "].concat(messages)));
        };
        Logger.info = function () {
            var messages = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                messages[_i] = arguments[_i];
            }
            if (Logger.level <= LoggerLevel.Info)
                console.log.apply(console, Array.prototype.slice.call(["Info   : "].concat(messages)));
        };
        Logger.warn = function () {
            var messages = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                messages[_i] = arguments[_i];
            }
            if (Logger.level <= LoggerLevel.Warn)
                console.warn.apply(console, Array.prototype.slice.call(["Warn   : "].concat(messages)));
        };
        Logger.error = function () {
            var messages = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                messages[_i] = arguments[_i];
            }
            if (Logger.level <= LoggerLevel.Error)
                console.error.apply(console, Array.prototype.slice.call(["Error  : "].concat(messages)));
        };
        Logger.warnIf = function (target, message, condition) {
            if (condition === void 0) { condition = true; }
            if (Logger.level <= LoggerLevel.Warn && condition)
                Logger.warn(message + " : ", target);
        };
        Logger.errorIf = function (target, message, condition) {
            if (condition === void 0) { condition = true; }
            if (Logger.level <= LoggerLevel.Error && condition)
                Logger.error(message + " : ", target);
        };
        Logger.level = LoggerLevel.Verbose;
        return Logger;
    }());
    alm.Logger = Logger;
})(alm || (alm = {}));
function trace() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    alm.Logger.info.apply(trace.caller, arguments);
}
function throwWarn(target, message, condition) {
    if (condition === void 0) { condition = true; }
    alm.Logger.warnIf.apply(null, arguments);
}
function throwError(target, message, condition) {
    if (condition === void 0) { condition = true; }
    alm.Logger.errorIf.apply(null, arguments);
}
var alm;
(function (alm) {
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
    alm.Num = Num;
})(alm || (alm = {}));
var alm;
(function (alm) {
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
    alm.Raffle = Raffle;
})(alm || (alm = {}));
var alm;
(function (alm) {
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
    alm.Rotator = Rotator;
})(alm || (alm = {}));
var project;
(function (project) {
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
            var s = ("0" + Math.floor(seconds % 60)).substr(-2, 2);
            if (h != "0") {
                return h + ":" + ("0" + m).substr(-2, 2) + ":" + s;
            }
            else {
                return m + ":" + s;
            }
        };
        return Str;
    }());
    project.Str = Str;
})(project || (project = {}));
var alm;
(function (alm) {
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
    alm.Vector2 = Vector2;
})(alm || (alm = {}));
var alm;
(function (alm) {
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
    alm.Vector3 = Vector3;
})(alm || (alm = {}));
var alm;
(function (alm) {
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
            return new alm.Vector2(this.getLeft(), this.getTop());
        };
        Rectangle.prototype.getTopRight = function () {
            return new alm.Vector2(this.getRight(), this.getTop());
        };
        Rectangle.prototype.getBottomLeft = function () {
            return new alm.Vector2(this.getLeft(), this.getBottom());
        };
        Rectangle.prototype.getBottomRight = function () {
            return new alm.Vector2(this.getRight(), this.getBottom());
        };
        return Rectangle;
    }());
    alm.Rectangle = Rectangle;
})(alm || (alm = {}));
var alm;
(function (alm) {
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
                _this.dispatch(alm.TimerEvent.TICK);
                if (isCompleted) {
                    _this.dispatch(alm.TimerEvent.COMPLETE);
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
            this.dispatchEvent(new alm.TimerEvent(eventType, this, this.elapsedCount, this.repeatCount, this.getRestCount()));
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
    }(cmd.EventDispatcher));
    alm.Timer = Timer;
})(alm || (alm = {}));
var alm;
(function (alm) {
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
            return "[TimerEvent] type = " + this.getType() + ", elapsedCount = " + this.elapsedCount + ", repeatCount=" + this.repeatCount + ", restCount=" + this.restCount;
        };
        TimerEvent.TICK = "tick";
        TimerEvent.COMPLETE = "complete";
        return TimerEvent;
    }(cmd.Event));
    alm.TimerEvent = TimerEvent;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var KeyWatcher = (function () {
        function KeyWatcher() {
        }
        KeyWatcher.initialize = function () {
            if (this.isInitialized)
                return;
            this.isInitialized = true;
            this.eventDispatcher = new cmd.EventDispatcher();
        };
        KeyWatcher.start = function () {
            if (this.isRunning)
                return;
            this.isRunning = true;
            this.initialize();
            trace("[KeyWatcher] start");
            var $window = jQuery(window);
            $window.on("keydown", this.windowKeyDownHandler);
            $window.on("keyup", this.windowKeyUpHandler);
        };
        KeyWatcher.stop = function () {
            if (!this.isRunning)
                return;
            this.isRunning = false;
            this.initialize();
            trace("[KeyWatcher] stop");
            var $window = jQuery(window);
            $window.off("keydown", this.windowKeyDownHandler);
            $window.off("keyup", this.windowKeyUpHandler);
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
                KeyWatcher.eventDispatcher.dispatchEvent(new alm.KeyWatcherEvent(alm.KeyWatcherEvent.KEY_DOWN, KeyWatcher, event));
            }
            else if (KeyWatcher.isContinuousPressEnabled) {
                KeyWatcher.eventDispatcher.dispatchEvent(new alm.KeyWatcherEvent(alm.KeyWatcherEvent.KEY_DOWN, KeyWatcher, event));
            }
        };
        KeyWatcher.windowKeyUpHandler = function (event) {
            var keyCode = event.keyCode;
            if (KeyWatcher.isKeyPressedByKeyCode[keyCode] != null) {
                delete KeyWatcher.isKeyPressedByKeyCode[keyCode];
                --KeyWatcher.pressedKeyCount;
                KeyWatcher.eventDispatcher.dispatchEvent(new alm.KeyWatcherEvent(alm.KeyWatcherEvent.KEY_UP, KeyWatcher, event));
            }
        };
        KeyWatcher.isRunning = false;
        KeyWatcher.pressedKeyCount = 0;
        KeyWatcher.isKeyPressedByKeyCode = {};
        KeyWatcher.isContinuousPressEnabled = false;
        KeyWatcher.isInitialized = false;
        KeyWatcher.pressTimer = null;
        KeyWatcher.isLongPressed = false;
        KeyWatcher.eventDispatcher = null;
        return KeyWatcher;
    }());
    alm.KeyWatcher = KeyWatcher;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var KeyWatcherEvent = (function (_super) {
        __extends(KeyWatcherEvent, _super);
        function KeyWatcherEvent(eventType, eventTarget, jqueryEvent) {
            if (eventTarget === void 0) { eventTarget = null; }
            if (jqueryEvent === void 0) { jqueryEvent = null; }
            var _this = _super.call(this, eventType, eventTarget) || this;
            _this.jqueryEvent = jqueryEvent;
            _this.key = _this.jqueryEvent.key;
            _this.keyCode = _this.jqueryEvent.keyCode;
            _this.altKey = _this.jqueryEvent.altKey;
            _this.ctrlKey = _this.jqueryEvent.ctrlKey;
            _this.shiftKey = _this.jqueryEvent.shiftKey;
            return _this;
        }
        KeyWatcherEvent.prototype.clone = function () {
            return new KeyWatcherEvent(this.getType(), this.getTarget(), this.jqueryEvent);
        };
        KeyWatcherEvent.prototype.toString = function () {
            return "[KeyWatcherEvent] type = " + this.getType() + ", key = " + this.key + ", keyCode = " + this.keyCode + ", altKey = " + this.altKey + ", ctrlKey = " + this.ctrlKey + ", shiftKey = " + this.shiftKey;
        };
        KeyWatcherEvent.KEY_UP = "keyUp";
        KeyWatcherEvent.KEY_DOWN = "keyDown";
        return KeyWatcherEvent;
    }(cmd.Event));
    alm.KeyWatcherEvent = KeyWatcherEvent;
})(alm || (alm = {}));
var alm;
(function (alm) {
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
    })(KeyCode = alm.KeyCode || (alm.KeyCode = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var ResizeWatcher = (function () {
        function ResizeWatcher() {
        }
        ResizeWatcher.initialize = function () {
            if (this.isInitialized)
                return;
            this.isInitialized = true;
            this.eventDispatcher = new cmd.EventDispatcher();
        };
        ResizeWatcher.start = function () {
            if (this.isRunning)
                return;
            this.isRunning = true;
            this.initialize();
            trace("[ResizeWatcher] start");
            jQuery(window).on("resize", this.windowResizeHandler);
            this.apply();
        };
        ResizeWatcher.stop = function () {
            if (!this.isRunning)
                return;
            this.isRunning = false;
            this.initialize();
            trace("[ResizeWatcher] stop");
            jQuery(window).off("resize", this.windowResizeHandler);
        };
        ResizeWatcher.apply = function () {
            var $window = jQuery(window);
            ResizeWatcher.windowWidth = $window.width();
            ResizeWatcher.windowHeight = $window.height();
        };
        ResizeWatcher.addEventListener = function (eventType, listener) {
            this.initialize();
            this.eventDispatcher.addEventListener(eventType, listener);
        };
        ResizeWatcher.removeEventListener = function (eventType, listener) {
            this.initialize();
            this.eventDispatcher.removeEventListener(eventType, listener);
        };
        ResizeWatcher.getIsRunning = function () { return this.isRunning; };
        ResizeWatcher.getWindowWidth = function () { return this.windowWidth; };
        ResizeWatcher.getWindowHeight = function () { return this.windowHeight; };
        ResizeWatcher.windowResizeHandler = function (event) {
            ResizeWatcher.apply();
            ResizeWatcher.eventDispatcher.dispatchEvent(new alm.ResizeWatcherEvent(alm.ResizeWatcherEvent.RESIZE, ResizeWatcher, event, ResizeWatcher.windowWidth, ResizeWatcher.windowHeight));
        };
        ResizeWatcher.isRunning = false;
        ResizeWatcher.windowWidth = 0;
        ResizeWatcher.windowHeight = 0;
        ResizeWatcher.isInitialized = false;
        ResizeWatcher.eventDispatcher = null;
        return ResizeWatcher;
    }());
    alm.ResizeWatcher = ResizeWatcher;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var ResizeWatcherEvent = (function (_super) {
        __extends(ResizeWatcherEvent, _super);
        function ResizeWatcherEvent(eventType, eventTarget, jqueryEvent, windowWidth, windowHeight) {
            if (eventTarget === void 0) { eventTarget = null; }
            if (jqueryEvent === void 0) { jqueryEvent = null; }
            if (windowWidth === void 0) { windowWidth = 0; }
            if (windowHeight === void 0) { windowHeight = 0; }
            var _this = _super.call(this, eventType, eventTarget) || this;
            _this.jqueryEvent = jqueryEvent;
            _this.windowWidth = windowWidth;
            _this.windowHeight = windowHeight;
            return _this;
        }
        ResizeWatcherEvent.prototype.clone = function () {
            return new ResizeWatcherEvent(this.getType(), this.getTarget(), this.jqueryEvent, this.windowWidth, this.windowHeight);
        };
        ResizeWatcherEvent.prototype.toString = function () {
            return "[ResizeWatcherEvent] type = " + this.getType() + ", windowWidth = " + this.windowWidth + ", windowHeight = " + this.windowHeight;
        };
        ResizeWatcherEvent.RESIZE = "resize";
        return ResizeWatcherEvent;
    }(cmd.Event));
    alm.ResizeWatcherEvent = ResizeWatcherEvent;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var ScrollWatcher = (function () {
        function ScrollWatcher() {
        }
        ScrollWatcher.initialize = function () {
            if (this.isInitialized)
                return;
            this.isInitialized = true;
            this.eventDispatcher = new cmd.EventDispatcher();
        };
        ScrollWatcher.start = function () {
            if (this.isRunning)
                return;
            this.isRunning = true;
            this.initialize();
            trace("[ScrollWatcher] start");
            jQuery(window).on("resize", this.windowScrollHandler);
            jQuery(window).on("scroll", this.windowScrollHandler);
            this.apply();
        };
        ScrollWatcher.stop = function () {
            if (!this.isRunning)
                return;
            this.isRunning = false;
            this.initialize();
            trace("[ScrollWatcher] stop");
            jQuery(window).off("resize", this.windowScrollHandler);
            jQuery(window).off("scroll", this.windowScrollHandler);
        };
        ScrollWatcher.apply = function () {
            var $window = jQuery(window);
            this.windowHeight = $window.height();
            this.scrollTop = $window.scrollTop();
            this.scrollBottom = this.scrollTop + this.windowHeight;
        };
        ScrollWatcher.addEventListener = function (eventType, listener) {
            this.initialize();
            this.eventDispatcher.addEventListener(eventType, listener);
        };
        ScrollWatcher.removeEventListener = function (eventType, listener) {
            this.initialize();
            this.eventDispatcher.removeEventListener(eventType, listener);
        };
        ScrollWatcher.calcScrolledPosition = function (y) {
            return y - this.scrollTop;
        };
        ;
        ScrollWatcher.calcScrolledPositionRatio = function (y) {
            return this.calcScrolledPosition(y) / this.windowHeight;
        };
        ScrollWatcher.getIsRunning = function () { return this.isRunning; };
        ScrollWatcher.getScrollTop = function () { return this.scrollTop; };
        ScrollWatcher.getScrollBottom = function () { return this.scrollBottom; };
        ScrollWatcher.getWindowHeight = function () { return this.windowHeight; };
        ScrollWatcher.windowScrollHandler = function (event) {
            ScrollWatcher.apply();
            ScrollWatcher.eventDispatcher.dispatchEvent(new alm.ScrollWatcherEvent(alm.ScrollWatcherEvent.SCROLL, ScrollWatcher, event, ScrollWatcher.scrollTop, ScrollWatcher.scrollBottom, ScrollWatcher.windowHeight));
        };
        ScrollWatcher.windowResizeHandler = function (event) {
            ScrollWatcher.apply();
        };
        ScrollWatcher.isRunning = false;
        ScrollWatcher.windowHeight = 0;
        ScrollWatcher.isInitialized = false;
        ScrollWatcher.eventDispatcher = null;
        return ScrollWatcher;
    }());
    alm.ScrollWatcher = ScrollWatcher;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var ScrollWatcherEvent = (function (_super) {
        __extends(ScrollWatcherEvent, _super);
        function ScrollWatcherEvent(eventType, eventTarget, jqueryEvent, scrollTop, scrollBottom, windowHeight) {
            if (eventTarget === void 0) { eventTarget = null; }
            if (jqueryEvent === void 0) { jqueryEvent = null; }
            if (scrollTop === void 0) { scrollTop = 0; }
            if (scrollBottom === void 0) { scrollBottom = 0; }
            if (windowHeight === void 0) { windowHeight = 0; }
            var _this = _super.call(this, eventType, eventTarget) || this;
            _this.jqueryEvent = jqueryEvent;
            _this.scrollTop = scrollTop;
            _this.scrollBottom = scrollBottom;
            _this.windowHeight = windowHeight;
            return _this;
        }
        ScrollWatcherEvent.prototype.clone = function () {
            return new ScrollWatcherEvent(this.getType(), this.getTarget(), this.jqueryEvent, this.scrollTop, this.scrollBottom, this.windowHeight);
        };
        ScrollWatcherEvent.prototype.toString = function () {
            return "[ScrollWatcherEvent] type = " + this.getType() + ", scrollTop = " + this.scrollTop + ", scrollBottom = " + this.scrollBottom + ", windowHeight = " + this.windowHeight;
        };
        ScrollWatcherEvent.SCROLL = "scroll";
        return ScrollWatcherEvent;
    }(cmd.Event));
    alm.ScrollWatcherEvent = ScrollWatcherEvent;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var AssetLoader = (function () {
        function AssetLoader() {
            this.isLoading_ = false;
            this.currentCount = 0;
            this.totalCount = 0;
            this.loadingQueries = [];
            this.loadingQueryIndex = -1;
            this.queriesByQueryId = {};
            this.queriesByUrl = {};
            this.texturesByUrl = {};
            this.texturesByQueryId = {};
            this.eventDispatcher = new cmd.EventDispatcher();
        }
        AssetLoader.prototype.requireJQueryJson = function (url) {
            return this.addQuery("jQuery.JSON", url, {});
        };
        AssetLoader.prototype.requireThreeTexture = function (url) {
            return this.addQuery("THREE.Texture", url, {});
        };
        AssetLoader.prototype.addQuery = function (type, url, param) {
            if (this.queriesByUrl[url])
                return this.queriesByUrl[url].id;
            var query = new LoaderQuery();
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
                this.eventDispatcher.dispatchEvent(new alm.AssetLoaderEvent(alm.AssetLoaderEvent.PROGRESS, this, this.currentCount / this.totalCount, this.currentCount, this.totalCount));
            }
            if (this.currentCount < this.totalCount) {
                this.loadingQueryIndex++;
                var query_1 = this.loadingQueries[this.loadingQueryIndex];
                query_1.isLoading = true;
                query_1.isLoadComplete = false;
                trace("[AssetLoader] loading... " + "'" + query_1.url + "' as '" + query_1.type + "'");
                switch (query_1.type) {
                    case "jQuery.JSON":
                        jQuery.getJSON(query_1.url, function (data) {
                            query_1.isLoading = false;
                            query_1.isLoadComplete = true;
                            query_1.content = data;
                            if (query_1.param.onLoad)
                                query_1.param.onLoad(data);
                            _this.next();
                        });
                        break;
                    case "THREE.Texture":
                        var url = query_1.url;
                        var loader = new THREE.TextureLoader();
                        var texture = loader.load(url, function (texture) {
                            query_1.isLoading = false;
                            query_1.isLoadComplete = true;
                            query_1.content = texture;
                            if (query_1.param.onLoad)
                                query_1.param.onLoad(texture);
                            _this.next();
                        }, function (event) {
                        }, function (event) {
                            query_1.isLoading = false;
                            query_1.isLoadComplete = true;
                            if (query_1.param.onError)
                                query_1.param.onError(event.type + " : " + event.message);
                            _this.next();
                        });
                        this.texturesByUrl[query_1.url] = texture;
                        this.texturesByQueryId[query_1.id] = texture;
                        break;
                    default:
                        this.next();
                }
            }
            else {
                this.isLoading_ = false;
                this.loadingQueries = [];
                this.loadingQueryIndex = -1;
                this.eventDispatcher.dispatchEvent(new alm.AssetLoaderEvent(alm.AssetLoaderEvent.COMPLETE, this, this.currentCount / this.totalCount, this.currentCount, this.totalCount));
            }
        };
        AssetLoader.prototype.addLoadUpdateListener = function (listener) {
            this.eventDispatcher.addEventListener(alm.AssetLoaderEvent.PROGRESS, listener);
        };
        AssetLoader.prototype.removeLoadUpdateListener = function (listener) {
            this.eventDispatcher.removeEventListener(alm.AssetLoaderEvent.PROGRESS, listener);
        };
        AssetLoader.prototype.addLoadCompleteListener = function (listener) {
            this.eventDispatcher.addEventListener(alm.AssetLoaderEvent.COMPLETE, listener);
        };
        AssetLoader.prototype.removeLoadCompleteListener = function (listener) {
            this.eventDispatcher.removeEventListener(alm.AssetLoaderEvent.COMPLETE, listener);
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
        AssetLoader.prototype.getTexturesByUrl = function (url) { return this.texturesByUrl[url]; };
        AssetLoader.prototype.getTexturesByQueryId = function (textureId) { return this.texturesByQueryId[textureId]; };
        AssetLoader.id = 0;
        return AssetLoader;
    }());
    alm.AssetLoader = AssetLoader;
    var LoaderQuery = (function () {
        function LoaderQuery() {
            this.isLoading = false;
            this.isLoadComplete = false;
        }
        return LoaderQuery;
    }());
    alm.LoaderQuery = LoaderQuery;
})(alm || (alm = {}));
var alm;
(function (alm) {
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
            return "[AssetLoaderEvent] type = " + this.getType() + ", progress = " + this.progress + ", loadedCount = " + this.loadedCount + ", totalCount = " + this.totalCount;
        };
        AssetLoaderEvent.PROGRESS = "progress";
        AssetLoaderEvent.COMPLETE = "complete";
        AssetLoaderEvent.ERROR = "error";
        return AssetLoaderEvent;
    }(cmd.Event));
    alm.AssetLoaderEvent = AssetLoaderEvent;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var View = (function (_super) {
        __extends(View, _super);
        function View(view) {
            if (view === void 0) { view = null; }
            var _this = _super.call(this) || this;
            _this.view = view;
            _this.isInitializing = false;
            _this.isInitialized = false;
            _this.isReady = false;
            _this.isShowing = false;
            _this.isShown = true;
            _this.isHiding = false;
            _this.autoHideWithInit = true;
            _this.name = "";
            return _this;
        }
        View.prototype.initialize = function () {
            if (this.isInitializing || this.isInitialized)
                return;
            this.isInitializing = true;
            this.view = this.implInitialize();
            throwError(this.name || this, "view is null", !this.view);
            this.hide(false);
            this.isInitializing = false;
            this.isInitialized = true;
        };
        View.prototype.ready = function () {
            if (this.isReady)
                return;
            throwError(this.name || this, "ready() was called without being initialized", !this.isInitialized);
            this.implReady();
            this.isReady = true;
        };
        View.prototype.finalize = function () {
            this.implFinalize();
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
                throwError(_this.name || _this, "getShowCommand() was called without being initialized", !_this.isInitialized);
                throwWarn(_this.name || _this, "getShowCommand() was called without being ready", !_this.isReady);
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
                    throwError(_this.name || _this, "getHideCommand() was called without being initialized", !_this.isInitialized);
                    throwWarn(_this.name || _this, "getHideCommand() was called without being ready", !_this.isReady);
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
        View.prototype.getIsInitializing = function () { return this.isInitializing; };
        View.prototype.getIsInitialized = function () { return this.isInitialized; };
        View.prototype.getIsReady = function () { return this.isReady; };
        View.prototype.getIsShowing = function () { return this.isShowing; };
        View.prototype.getIsShown = function () { return this.isShown; };
        View.prototype.getIsHiding = function () { return this.isHiding; };
        View.prototype.getIsHidden = function () { return !this.isShown; };
        View.prototype.getView = function () { return this.view; };
        View.prototype.getAutoHideWithInit = function () { return this.autoHideWithInit; };
        View.prototype.setAutoHideWithInit = function (value) { this.autoHideWithInit = value; };
        View.prototype.getName = function () { return this.name; };
        View.prototype.setName = function (value) { this.name = value; };
        return View;
    }(cmd.EventDispatcher));
    alm.View = View;
})(alm || (alm = {}));

//# sourceMappingURL=alumican.js.map
