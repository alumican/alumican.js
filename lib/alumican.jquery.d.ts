/// <reference types="jquery" />
/// <reference path="alumican.d.ts" />
declare namespace alm.util {
    class JQueryUtil {
        static fadeTo(target: JQuery, opacity: number, duration: number, easing: EasingFunction, switchDisplayTo?: string, switchVisibility?: boolean, execute?: boolean): cmd.Tween;
        static fadeInJquery(target: JQuery, duration: number, easing: EasingFunction, switchDisplayTo?: string, switchVisibility?: boolean, execute?: boolean): cmd.Tween;
        static fadeOutJquery(target: JQuery, duration: number, easing: EasingFunction, switchDisplayTo?: string, switchVisibility?: boolean, execute?: boolean): cmd.Tween;
        static getQuery(): Hash<string>;
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
