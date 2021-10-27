/// <reference types="alumican" />
declare namespace alm.util {
    class ThreeUtil {
        static getEmbeddedShader(shaderId: string): {
            vertexShader: string;
            fragmentShader: string;
        };
        static setEmission(model: THREE.Object3D, color: THREE.Color): void;
        private constructor();
    }
}
declare namespace alm.util {
    import EasingValue = math.EasingValue;
    class EasingThreeVector3 {
        constructor(initValue: THREE.Vector3, easing?: number, tolerance?: number);
        update(useTransition?: boolean): void;
        setTarget(x: number, y: number, z: number): void;
        setEasing(easing: number): void;
        x: EasingValue;
        y: EasingValue;
        z: EasingValue;
    }
}
declare namespace alm.io {
    class ThreeTextureFileHandler implements IFileHandler {
        constructor();
        getType(): string;
        load(url: string, onComplete: CompleteFunction, onError: ErrorFunction): void;
        static TYPE: string;
    }
}
