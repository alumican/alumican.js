/// <reference path='../../index.ts' />

namespace scn.core {

	export enum Direction {
		Static,
		Sibling,
		Ascend,
		Descend,
	}

	export function getDirectionString(direction:Direction):string {
		switch (direction) {
			case Direction.Static:
				return 'static';
			case Direction.Sibling:
				return 'sibling';
			case Direction.Ascend:
				return 'ascend';
			case Direction.Descend:
				return 'descend';
		}
		return '';
	}
}
