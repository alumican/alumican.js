declare namespace alm.util {
    class GoogleMapsUtil {
        static loadScript(apiKey: string): Promise<void>;
        private constructor();
    }
}
