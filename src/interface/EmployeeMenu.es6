import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity'
import Button from 'tin-engine/basic/button';
import {HorizontalLayout} from 'tin-engine/basic/layout';
import {VerticalLayout} from 'tin-engine/basic/layout';
import EmployeeInfo from './EmployeeInfo';
import Employee from './../entity/Employee';
import {arrayRemove} from 'tin-engine/util';

class EmployeeList {
	constructor(maxDisplayed, employeeDisplay) {
		this.employees = [];
		this.currentPosition = 0;
		this.max = maxDisplayed;
		this.parent = null;
		this.employeeDisplay = employeeDisplay;
	}
	
	updateList() {
		var displayPos = 0;

		for(var i = this.currentPosition; i < this.employees.length && displayPos < 6; i++) {
			this.employeeDisplay[displayPos].setEmployee(this.employees[i]);
			displayPos++;
		}
	}
	
	scrollUp() {
		this.currentPosition = Math.max(0, this.currentPosition - 1);
		this.updateList();
	}
	
	scrollDown() {
		this.currentPosition = Math.min(this.employees.length - 1, this.currentPosition + 1);
		this.updateList();
	}
	
	add(employee) {
		this.employees.push(employee);
		this.updateList();
	}
	
	remove(employee) {
		arrayRemove(employee);
		this.updateList();
	}
}

export default class EmployeeMenu extends Entity {
	constructor(pos, size) {
		super(pos, size);
		this.employeeDisplay = [];
		for(var i = 0; i < 6; i++) {
			const info = new EmployeeInfo(new V2(0, i * 20));
			this.employeeDisplay.push(info);
			this.add(info);
		}
		
		this.employees = new EmployeeList(6, this.employeeDisplay);
	}
	
	addEmployee(employee) {
		this.employees.add(employee);
	}
	
	removeEmployee(employee) {
		this.employees.remove(employee);
	}
	
	scrollUp() {
		this.employees.scrollUp();
	}
	
	scrollDown() {
		this.employees.scrollDown();
	}
}