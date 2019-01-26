import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';
import ImageEntity from 'tin-engine/basic/image';
import V2, {Zero} from 'tin-engine/geo/v2';
import {arrayRemove} from 'tin-engine/util';

export default class Employee extends Entity {
	constructor(max, type) {
		super(new V2(96, 32));

		this.type = type || ['kitchen', 'janitor', 'classroom'][(Math.random()*3)|0];
		this.level = 1+(Math.random()*max)|0;
		this.salary = 20 + this.level * 5;
		this.timer = 0;
	}

	update(timer) {
		this.timer += delta;
	}
}