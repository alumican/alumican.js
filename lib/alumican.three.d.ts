/// <reference types="three" />
/// <reference path="alumican.d.ts" />
declare namespace alm.loader {
    class ThreeTextureFileHandler implements IFileHandler {
        constructor();
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
        static TYPE: string;
    }
}
