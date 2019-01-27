import Entity from 'tin-engine/basic/entity';
import V2, { Zero } from 'tin-engine/geo/v2';
import RectEntity from 'tin-engine/basic/rect';
import names from '../config/names';
import graphics from 'tin-engine/core/graphic';
import Animation from 'tin-engine/lib/animation';

graphics.add('img/animation/janitor.png');
graphics.add('img/animation/classroom.png');
graphics.add('img/animation/kitchen.png');

const floorOffset = 26;

export default class Employee extends Entity {
	constructor(max, type) {
		super();

		const index = (Math.random() * names.length) | 0;
		this.name = names[index];
		this.gender = index % 2;

		this.type = type || ['kitchen', 'janitor', 'classroom'][(Math.random()*3)|0];
		this.level = 1+Math.round(Math.random()*max);
		this.salary = 30 + this.level * 5;
		this.idle = 0;
		this.duration = 0;
		this.room = null;

		this.add(new Animation('img/animation/'+this.type+'.png', Zero(), 4, 300, true));
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
				this.room.damage++;
				this.room.parent.repair();
				this.duration = this.room.duration();
			}
		}
	}
}