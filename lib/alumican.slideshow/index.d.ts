/// <reference types="alumican" />
/// <reference types="jquery" />
declare namespace alm.drawer.view {
    import View = alm.view.View;
    class SlideshowItem extends View<JQuery> {
        constructor(content: JQuery);
        protected implInitialize(): JQuery;
        protected implReady(): void;
        protected implFinalize(): void;
        protected implShow(view: JQuery, useTransition: boolean): cmd.Command;
        protected implHide(view: JQuery, useTransition: boolean): cmd.Command;
        getTransitionDuration(): number;
        setTransitionDuration(duration: number): void;
        private content;
        private transitionDuration;
    }
}
declare namespace alm.drawer {
    class Slideshow {
        constructor(content: JQuery, loop?: boolean, itemSelector?: string);
        play(): void;
        stop(): void;
        reset(useTransition?: boolean): void;
        resetInterval(): void;
        goto(index: number, useTransition?: boolean): boolean;
        next(useTransition?: boolean): boolean;
        prev(useTransition?: boolean): boolean;
        getIsPlaying(): boolean;
        getCurrentIndex(): number;
        getOldIndex(): number;
        getLength(): number;
        getIsLoopEnabled(): boolean;
        setIsLoopEnabled(enabled: boolean): void;
        getAutoPlayInterval(): number;
        setAutoPlayInterval(interval: number): void;
        getTransitionDuration(): number;
        setTransitionDuration(duration: number): void;
        private switcherChangeHandler;
        private autoPlayTimerTickHandler;
        private content;
        private items;
        private switcher;
        private autoPlayTimer;
        private autoPlayInterval;
        private transitionDuration;
        private isPlaying;
        private isLoopEnabled;
    }
}
