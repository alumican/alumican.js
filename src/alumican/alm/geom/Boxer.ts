/// <reference path='../../index.ts' />

namespace alm.geom {

	export enum Align {
		Top_Left,
		Top_Center,
		Top_Right,
		Middle_Left,
		Middle_Center,
		Middle_Right,
		Bottom_Left,
		Bottom_Center,
		Bottom_Right
	}

	export enum ScaleMode {
		ExactFit,
		ShowAll,
		NoBorder,
		NoScale,
	}

	export class Boxer {

		public static resize(target:geom.Rectangle, bounds:geom.Rectangle, scaleMode:ScaleMode = ScaleMode.ShowAll, align:Align = Align.Middle_Center):geom.Rectangle {
			let tx:number = target.x;
			let ty:number = target.y;
			let tw:number = target.width;
			let th:number = target.height;

			const bx:number = bounds.x;
			const by:number = bounds.y;
			const bw:number = bounds.width;
			const bh:number = bounds.height;

			switch (scaleMode) {
				case ScaleMode.ShowAll:
				case ScaleMode.NoBorder:
					const ratioW:number = bw / tw;
					const ratioH:number = bh / th;
					const ratio:number = scaleMode == ScaleMode.ShowAll ? (ratioW < ratioH ? ratioW : ratioH) : (ratioW > ratioH ? ratioW : ratioH);
					tw *= ratio;
					th *= ratio;
					break;

				case ScaleMode.ExactFit:
					return new geom.Rectangle(bx, by, bw, bh);
			}

			tx = bx + ((align == Align.Top_Left || align == Align.Middle_Left || align == Align.Bottom_Left) ? 0 :
				(align == Align.Top_Right || align == Align.Middle_Right || align == Align.Bottom_Right) ? (bw - tw) : (bw - tw) / 2);
			ty = by + ((align == Align.Top_Left || align == Align.Top_Center || align == Align.Top_Right) ? 0 :
				(align == Align.Bottom_Left || align == Align.Bottom_Center || align == Align.Bottom_Right) ? (bh - th) : (bh - th) / 2);

			return new geom.Rectangle(tx, ty, tw, th);
		}

		private constructor() {}
	}
}
