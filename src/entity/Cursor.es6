import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';
import ImageEntity from 'tin-engine/basic/image';
import V2, {Zero} from 'tin-engine/geo/v2';

export default class Cursor extends Entity {
	constructor(orphanage) {
		super();
		this.orphanage = orphanage;
		this.selected = null;
	}

	select(room) {
		this.selected = room;
		this.floor = 0;
		this.direction = null;
		this.update();
	}

	update() {
		if (this.selected) {
			const pos = this.parent.relativeMouse();
			const direction = pos.x > 720 ? 'right' : 'left';
			const floor = Math.max(0, Math.min(this.orphanage.floors.length, Math.abs( pos.y / 96 )|0));

			if(this.direction != direction || this.floor != floor) {
				this.floor = floor;
				this.direction = direction;
				this.error = this.orphanage.isValid(this.selected, floor, direction);
				this.position = this.orphanage.getPosition(this.selected, floor, direction);
			}
		}
	}

	draw(ctx) {
		ctx.fillStyle = this.error ? 'rgba(150,255,150, .5)' : 'rgba(255,150,150, .5)';
		ctx.fillRect(this.position.x, this.position.y, rooms[this.selected].width*32, 96);
	}


	click(pos) {
		if (this.selected) {
			this.orphanage.addRoom(this.selected, this.floor, this.direction);
			this.selected = null;
		}

	}
}