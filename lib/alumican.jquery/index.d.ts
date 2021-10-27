/// <reference types="alumican" />
/// <reference types="jquery" />
declare namespace alm.io {
    class JQueryTextFileHandler implements IFileHandler {
        constructor(headers?: any);
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
        static TYPE: string;
        private headers;
    }
}
declare namespace alm.io {
    class JQueryJsonFileHandler implements IFileHandler {
        constructor(headers?: any);
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
        static TYPE: string;
        private headers;
    }
}
declare namespace alm.util {
    import EasingFunction = alm.math.EasingFunction;
    class TweenCSS {
        static scale(target: JQuery, from: number, to: number, duration?: number, easing?: EasingFunction): cmd.Tween;
        static fade(target: JQuery, from: number, to: number, duration?: number, easing?: EasingFunction, updateDisplayTo?: string, updateVisibility?: boolean): cmd.Tween;
        static fadeTo(target: JQuery, to: number, duration?: number, easing?: EasingFunction, updateDisplayTo?: string, updateVisibility?: boolean): cmd.Tween;
        static fadeIn(target: JQuery, duration?: number, easing?: EasingFunction, updateDisplayTo?: string, updateVisibility?: boolean): cmd.Tween;
        static fadeOut(target: JQuery, duration?: number, easing?: EasingFunction, updateDisplay?: boolean, updateVisibility?: boolean): cmd.Tween;
        private static movePosition;
        static moveLeft(target: JQuery, from: number, to: number, duration?: number, easing?: EasingFunction): cmd.Tween;
        static moveRight(target: JQuery, from: number, to: number, duration?: number, easing?: EasingFunction): cmd.Tween;
        static moveTop(target: JQuery, from: number, to: number, duration?: number, easing?: EasingFunction): cmd.Tween;
        static moveBottom(target: JQuery, from: number, to: number, duration?: number, easing?: EasingFunction): cmd.Tween;
        static show(target: JQuery, updateDisplayTo?: string, updateVisibility?: boolean): cmd.Func;
        static hide(target: JQuery, updateDisplay?: boolean, updateVisibility?: boolean): cmd.Func;
        private constructor();
    }
}
