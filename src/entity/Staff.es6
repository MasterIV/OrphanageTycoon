import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';
import V2, {Zero} from 'tin-engine/geo/v2';
import {arrayRemove} from './../util.es6';
import Employee from './Employee';

export default class Staff extends Entity {

	constructor(orphanage) {
		super();

		this.orphanage = orphanage;
		this.available = [];
		this.hired = [];

		this.hire(new Employee(0, 'kitchen'));
		for(var i = 0; i < 5; i++)
			this.available.push(new Employee(1));
	}

	canHire(employee) {
		const current = this.entitie.filter(e => e.type == employee.type).length;
		const max = this.orphanage.counts[employee.type];
		return current < max && this.orphanage.money > employee.salary;
	}

	hire(employee) {
		if(this.canHire(employee)) {
			this.hired.push(employee);

			const room = this.orphanage.findFree(employee.type);
			room.entity.add(employee);
			room.employee = employee;
			employee.room = room;

			if(this.available.indexOf(employee) > -1)
				arrayRemove(this.available, employee);
		}
	}

	fire(employee) {
		employee.room.employee = null;
		employee.room = null;
		employee.remove();
		arrayRemove(this.hired, employee);
	}
}