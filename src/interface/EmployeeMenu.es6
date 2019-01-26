import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity'
import Button from 'tin-engine/basic/button';
import {HorizontalLayout} from 'tin-engine/basic/layout';
import {VerticalLayout} from 'tin-engine/basic/layout';
import EmployeeInfo from './EmployeeInfo';

export default class EmployeeMenu extends Entity {
	constructor(pos, size) {
		super(pos, size);
		this.employees = new VerticalLayout(Zero(), 0, 0);
		this.add(this.employees);
	}
	
	addEmployee(employee) {
		this.employees.add(employee);
	}
}