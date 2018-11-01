/// <reference types="jquery" />
/// <reference path="alumican.d.ts" />
declare namespace alm.util {
    import EasingFunction = alm.util.EasingFunction;
    class TweenCSS {
        static scale(target: JQuery, from: number, to: number, duration?: number, easing?: EasingFunction, execute?: boolean): cmd.Tween;
        static fade(target: JQuery, from: number, to: number, duration?: number, easing?: EasingFunction, updateDisplayTo?: string, updateVisibility?: boolean, execute?: boolean): cmd.Tween;
        static fadeTo(target: JQuery, to: number, duration?: number, easing?: EasingFunction, updateDisplayTo?: string, updateVisibility?: boolean, execute?: boolean): cmd.Tween;
        static fadeIn(target: JQuery, duration?: number, easing?: EasingFunction, updateDisplayTo?: string, updateVisibility?: boolean, execute?: boolean): cmd.Tween;
        static fadeOut(target: JQuery, duration?: number, easing?: EasingFunction, updateDisplay?: boolean, updateVisibility?: boolean, execute?: boolean): cmd.Tween;
        static show(target: JQuery, updateDisplayTo?: string, updateVisibility?: boolean, execute?: boolean): cmd.Func;
        static hide(target: JQuery, updateDisplay?: boolean, updateVisibility?: boolean, execute?: boolean): cmd.Func;
        private constructor();
    }
}
declare namespace alm.loader {
    class JQueryJsonFileHandler implements IFileHandler {
        constructor();
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
        static TYPE: string;
    }
}
