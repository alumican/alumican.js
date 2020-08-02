/// <reference types="alumican" />
/// <reference types="jquery" />
declare namespace alm.drawer.view {
    import View = alm.view.View;
    class DrawerBackground extends View<JQuery> {
        constructor();
        protected implInitialize(): JQuery;
        protected implReady(): void;
        protected implFinalize(): void;
        protected implShow(view: JQuery, useTransition: boolean): cmd.Command;
        protected implHide(view: JQuery, useTransition: boolean): cmd.Command;
        private clickHandler;
    }
}
declare namespace alm.drawer.view {
    import View = alm.view.View;
    class DrawerForeground extends View<JQuery> {
        constructor(content: JQuery, position: DrawerPosition);
        protected implInitialize(): JQuery;
        protected implReady(): void;
        protected implFinalize(): void;
        protected implShow(view: JQuery, useTransition: boolean): cmd.Command;
        protected implHide(view: JQuery, useTransition: boolean): cmd.Command;
        private move;
        private getWidth;
        private getHeight;
        private content;
        private position;
    }
}
declare namespace alm.drawer.view {
    import View = alm.view.View;
    class DrawerContainer extends View<JQuery> {
        constructor(content: JQuery, position: DrawerPosition, drawerId?: string);
        protected implInitialize(): JQuery;
        protected implReady(): void;
        protected implFinalize(): void;
        protected implShow(view: JQuery, useTransition: boolean): cmd.Command;
        protected implHide(view: JQuery, useTransition: boolean): cmd.Command;
        getContent(): JQuery;
        getDrawerId(): string;
        private background;
        private foreground;
        private content;
        private position;
        private drawerId;
    }
}
declare namespace alm.drawer {
    enum DrawerPosition {
        left = "left",
        right = "right",
        top = "top",
        bottom = "bottom"
    }
}
declare namespace alm.drawer {
    class Drawer {
        constructor(content: JQuery, position: DrawerPosition, drawerId?: string);
        open(useTransition: boolean): void;
        close(useTransition: boolean): void;
        dispose(): void;
        getView(): JQuery;
        getContentView(): JQuery;
        getDrawerId(): string;
        private container;
    }
}
