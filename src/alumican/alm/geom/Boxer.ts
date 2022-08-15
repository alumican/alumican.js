/// <reference path='../../index.ts' />

namespace alm.geom {

	export enum Align {
		topLeft,
		topCenter,
		topRight,
		middleLeft,
		middleCenter,
		middleRight,
		bottomLeft,
		bottomCenter,
		bottomRight
	}

	export enum ScaleMode {
		exactFit,
		showAll,
		noBorder,
		noScale,
	}

	export class Boxer {

		public static resize(target:geom.Rectangle, bounds:geom.Rectangle, scaleMode:ScaleMode = ScaleMode.showAll, align:Align = Align.middleCenter):geom.Rectangle {
			let tx:number = target.x;
			let ty:number = target.y;
			let tw:number = target.width;
			let th:number = target.height;

			const bx:number = bounds.x;
			const by:number = bounds.y;
			const bw:number = bounds.width;
			const bh:number = bounds.height;

			switch (scaleMode) {
				case ScaleMode.showAll:
				case ScaleMode.noBorder:
					const ratioW:number = bw / tw;
					const ratioH:number = bh / th;
					const ratio:number = scaleMode == ScaleMode.showAll ? (ratioW < ratioH ? ratioW : ratioH) : (ratioW > ratioH ? ratioW : ratioH);
					tw *= ratio;
					th *= ratio;
					break;

				case ScaleMode.exactFit:
					return new geom.Rectangle(bx, by, bw, bh);
			}

			tx = bx + ((align == Align.topLeft || align == Align.middleLeft || align == Align.bottomLeft) ? 0 :
				(align == Align.topRight || align == Align.middleRight || align == Align.bottomRight) ? (bw - tw) : (bw - tw) / 2);
			ty = by + ((align == Align.topLeft || align == Align.topCenter || align == Align.topRight) ? 0 :
				(align == Align.bottomLeft || align == Align.bottomCenter || align == Align.bottomRight) ? (bh - th) : (bh - th) / 2);

			return new geom.Rectangle(tx, ty, tw, th);
		}

		private constructor() {}
	}
}
