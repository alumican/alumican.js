/// <reference types="alumican" />
declare namespace alm.io {
    class ThreeTextureFileHandler implements IFileHandler {
        constructor();
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
        static TYPE: string;
    }
}
