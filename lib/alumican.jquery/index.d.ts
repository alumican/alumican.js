/// <reference types="alumican" />
/// <reference types="jquery" />
/// <reference types="jquery" />
declare namespace alm.io {
    class JQueryTextFileHandler implements IFileHandler {
        constructor(headers?: any);
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
        static type: string;
        private headers;
    }
}
declare namespace alm.io {
    class JQueryJsonFileHandler implements IFileHandler {
        constructor(headers?: any);
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
        static type: string;
        private headers;
    }
}
declare namespace alm.util {
    class ViewUtil {
        static setTransform(target: JQuery, x: number, y: number, rotation: number, scale: number, xSuffix?: string, ySuffix?: string): void;
        static setTransformByPixel(target: JQuery, x: number, y: number, rotation: number, scale: number): void;
        static setTransformByPercent(target: JQuery, x: number, y: number, rotation: number, scale: number): void;
        static setTransformByViewport(target: JQuery, x: number, y: number, rotation: number, scale: number): void;
        static setOpacity(target: JQuery, opacity: number): void;
        private constructor();
    }
}
declare namespace alm.util {
    import EasingFunction = alm.math.EasingFunction;
    interface TweenViewParam {
        x?: number;
        y?: number;
        rotation?: number;
        scale?: number;
        opacity?: number;
    }
    class TweenView {
        constructor(target: JQuery, xSuffix?: string, ySuffix?: string);
        dispose(): void;
        set(p: TweenViewParam): void;
        tween(p: TweenViewParam, duration: number, easing: EasingFunction): void;
        stop(): void;
        private apply;
        private target;
        private command;
        private x;
        private y;
        private rotation;
        private scale;
        private opacity;
        private isNeedUpdateTransform;
        private isNeedUpdateOpacity;
        xSuffix: string;
        ySuffix: string;
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
