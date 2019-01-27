import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';
import ImageEntity from 'tin-engine/basic/image';
import V2, {Zero} from 'tin-engine/geo/v2';
import {arrayRemove} from 'tin-engine/util';
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

		this.add(new RectEntity(Zero(), new V2(32, 64)));
	}

	work(room) {
		room.employee = this;
		this.room = room;
		this.position = new V2( room.width*32 - 48, floorOffset);
		this.room.entity.add(this);
	}
}