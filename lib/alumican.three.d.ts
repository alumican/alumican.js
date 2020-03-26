/// <reference path="../src/@types/three/0.93/index.d.ts" />
/// <reference path="../lib/alumican.d.ts" />
declare namespace alm.io {
    class ThreeTextureFileHandler implements IFileHandler {
        constructor();
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
        static TYPE: string;
    }
}
