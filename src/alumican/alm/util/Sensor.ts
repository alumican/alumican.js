/// <reference path='../../index.ts' />

namespace alm.util {

	export class Sensor {

		public static wakeUpDeviceMotion():Promise<void> {
			return new Promise((resolve, reject) => {
				console.debug('[DeviceMotion] check');
				if (DeviceMotionEvent) {
					if (typeof DeviceMotionEvent['requestPermission'] === 'function') {
						console.debug('[DeviceMotion] iOS');
						DeviceMotionEvent['requestPermission']()
							.then(permissionState => {
								if (permissionState === 'granted') {
									console.debug('[DeviceMotion] allowed on iOS');
									resolve();
								} else {
									console.debug('[DeviceMotion] not allowed, state :', permissionState);
									reject();
								}
							})
							.catch((error) => {
								console.error('[DeviceMotion] error', error);
								reject();
							});
					} else {
						console.debug('[DeviceMotion] allowed on PC / Android');
						resolve();
					}
				} else {
					console.debug('[DeviceMotion] not available');
					reject();
				}
			});
		}

		public static wakeUpDeviceOrientation():Promise<void> {
			return new Promise((resolve, reject) => {
				console.debug('[DeviceOrientation] check');
				if (DeviceOrientationEvent) {
					if (typeof DeviceOrientationEvent['requestPermission'] === 'function') {
						console.debug('[checkDeviceOrientation] iOS');
						DeviceOrientationEvent['requestPermission']()
							.then(permissionState => {
								if (permissionState === 'granted') {
									console.debug('[DeviceOrientation] allowed on iOS');
									resolve();
								} else {
									console.debug('[DeviceOrientation] not allowed, state :', permissionState);
									reject();
								}
							})
							.catch((error) => {
								console.error('[DeviceOrientation] error', error);
								reject();
							});
					} else {
						console.debug('[DeviceOrientation] allowed on PC / Android');
						resolve();
					}
				} else {
					console.debug('[DeviceOrientation] not available');
					reject();
				}
			});
		}





		private constructor() {
		}
	}
}
