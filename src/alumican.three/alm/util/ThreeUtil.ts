/// <reference path='../../index.ts' />

namespace alm.util {

	export class ThreeUtil {

		public static getEmbeddedShader(shaderId:string):{ vertexShader:string, fragmentShader:string } {
			return {
				vertexShader: document.getElementById(shaderId + '.vert').textContent,
				fragmentShader: document.getElementById(shaderId + '.frag').textContent
			};
		}

		public static setEmission(model:THREE.Object3D, color:THREE.Color):void {
			model.traverse((o:any):any => {
				if (o.isMesh) {
					o.material.emissive = color;
				}
			});
		}

		private constructor() {}
	}
}
