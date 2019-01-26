import BaseViewport from 'tin-engine/lib/viewport';
import V2 from 'tin-engine/geo/v2';

const maxY = 340;

export default class Viewport extends BaseViewport {
	constructor(orphanage) {
		super(true);
		this.add(orphanage);
		this.orphanage = orphanage;
		this.size = new V2(1440, 100);
		this.position = new V2(-400, maxY);
		this.dragable(true);
	}

	setPosition(x, y) {
		this.position.x = Math.max(Math.min(0, x), this.visible.x - this.size.x);
		this.position.y = Math.max(Math.min(this.orphanage.floors.length * 96 + 112, y), maxY);
	}

	mousedown(pos) {
		pos = pos.dif(this.position);
		if (this.onMouseDown && this.onMouseDown(pos)) return true;
		return this.dispatchReverse(this.entities, 'mousedown', pos);
	}

	mouseup(pos) {
		pos = pos.dif(this.position);
		if (this.onMouseUp && this.onMouseUp(pos)) return true;
		return this.dispatchReverse(this.entities, 'mouseup', pos);
	}


	click(pos) {
		pos = pos.dif(this.position);

		if (this.blocking.length) {
			return this.dispatchReverse(this.blocking, 'click', pos);
		} else {
			return this.dispatchReverse(this.entities, 'click', pos);
		}
	}
}