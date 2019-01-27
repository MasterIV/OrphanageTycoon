import Entity from 'tin-engine/basic/entity';
import V2, { Zero } from 'tin-engine/geo/v2';
import RectEntity from 'tin-engine/basic/rect';

const cooldown = 2700;
const floorOffset = 32;

export default class Employee extends Entity {
	constructor(max, type) {
		super();

		this.type = type || ['kitchen', 'janitor', 'classroom'][(Math.random()*3)|0];
		this.level = 1+(Math.random()*max)|0;
		this.salary = 20 + this.level * 5;
		this.idle = 0;
		this.duration = 0;

		this.add(new RectEntity(Zero(), new V2(32, 64)));
	}

	work(room) {
		room.employee = this;
		this.room = room;
		this.position = new V2( room.width*32 - 48, floorOffset);
		this.room.add(this);

		if(this.type == 'janitor')
			this.duration = room.duration();
	}

	onUpdate(delta) {
		if(this.type == 'janitor') {
			this.duration -= delta;
			if(this.duration <= 0) {
				this.room.parent.repair();
				this.duration = this.room.duration();
			}
		}
	}
}