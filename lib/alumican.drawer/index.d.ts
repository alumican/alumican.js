/// <reference types="alumican" />
/// <reference types="jquery" />
/// <reference types="jquery" />
declare namespace alm.drawer.view {
    import View = alm.view.View;
    class DrawerBackground extends View<JQuery> {
        constructor(transition: DrawerTransition);
        protected implInitialize(): JQuery;
        protected implReady(): void;
        protected implFinalize(): void;
        protected implShow(view: JQuery, useTransition: boolean): cmd.Command;
        protected implHide(view: JQuery, useTransition: boolean): cmd.Command;
        setCustomTransition(customShowTransition: cmd.Serial, customHideTransition: cmd.Serial): void;
        private clickHandler;
        private transition;
        private customShowTransition;
        private customHideTransition;
    }
}
declare namespace alm.drawer.view {
    import View = alm.view.View;
    class DrawerForeground extends View<JQuery> {
        constructor(content: JQuery, transition: DrawerTransition);
        protected implInitialize(): JQuery;
        protected implReady(): void;
        protected implFinalize(): void;
        protected implShow(view: JQuery, useTransition: boolean): cmd.Command;
        protected implHide(view: JQuery, useTransition: boolean): cmd.Command;
        private move;
        private getWidth;
        private getHeight;
        setCustomTransition(customShowTransition: cmd.Serial, customHideTransition: cmd.Serial): void;
        private content;
        private transition;
        private customShowTransition;
        private customHideTransition;
    }
}
declare namespace alm.drawer.view {
    import View = alm.view.View;
    class DrawerContainer extends View<JQuery> {
        constructor(content: JQuery, transition: DrawerTransition, drawerId?: string);
        protected implInitialize(): JQuery;
        protected implReady(): void;
        protected implFinalize(): void;
        protected implShow(view: JQuery, useTransition: boolean): cmd.Command;
        protected implHide(view: JQuery, useTransition: boolean): cmd.Command;
        getContent(): JQuery;
        getDrawerId(): string;
        setBackgroundCustomTransition(showCommand: cmd.Serial, hideCommand: cmd.Serial): void;
        setForegroundCustomTransition(showCommand: cmd.Serial, hideCommand: cmd.Serial): void;
        private background;
        private foreground;
        private content;
        private transition;
        private drawerId;
    }
}
declare namespace alm.drawer {
    enum DrawerTransition {
        none = "none",
        fade = "fade",
        left = "left",
        right = "right",
        top = "top",
        bottom = "bottom"
    }
}
declare namespace alm.drawer {
    class Drawer {
        constructor(content: JQuery, transition: DrawerTransition, drawerId?: string);
        open(useTransition?: boolean): void;
        close(useTransition?: boolean): void;
        dispose(): void;
        getView(): JQuery;
        getContentView(): JQuery;
        getDrawerId(): string;
        setBackgroundCustomTransition(showCommand: cmd.Serial, hideCommand: cmd.Serial): void;
        setForegroundCustomTransition(showCommand: cmd.Serial, hideCommand: cmd.Serial): void;
        private container;
    }
}
