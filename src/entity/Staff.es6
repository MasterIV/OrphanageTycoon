import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';
import V2, {Zero} from 'tin-engine/geo/v2';
import {arrayRemove} from 'tin-engine/util';
import Employee from './Employee';

const cooldown = 1000;

export default class Staff extends Entity {

	constructor(orphanage) {
		super();

		this.timer = 0;
		this.orphanage = orphanage;
		this.available = [];
		this.hired = [];

		this.hire(new Employee(0, 'kitchen'));
		for(var i = 0; i < 5; i++)
			this.available.push(new Employee(1));
	}

	canHire(employee) {
		const current = this.hired.filter(e => e.type == employee.type).length;
		const max = this.orphanage.counts[employee.type];
		return current < max && this.orphanage.money > employee.salary && this.available.includes(employee);
	}

	costs() {
		let r = 0;
		for(var i in this.hired)
			r += this.hired[i].salary;
		return r;
	}

	hire(employee) {
		if(this.canHire(employee)) {
			this.hired.push(employee);

			const room = this.orphanage.findFree(employee.type);
			employee.work(room);
			this.orphanage.money -= employee.salary;

			if(this.available.indexOf(employee) > -1)
				arrayRemove(this.available, employee);
		}
	}

	fire(employee) {
		if(this.hired.includes(employee)) {
			employee.room.employee = null;
			employee.room = null;
			employee.remove();
			arrayRemove(this.hired, employee);
		}
	}

	update(delta) {
		this.timer += delta;
		if(this.timer > cooldown) {
			this.timer = 0;

			for(var i in this.available ) {
				const e = this.available[i];
				e.idle++;

				if(Math.random() < e.idle/500)
					arrayRemove(this.available, e);
			}

			if(Math.random() < .5 / this.available.length) {
				let rooms = 0;
				for(var i in this.orphanage.counts)
					rooms += this.orphanage.counts[i];
				this.available.push(new Employee(Math.min(10, Math.round(rooms/ 10))));
			}
		}
	}
}