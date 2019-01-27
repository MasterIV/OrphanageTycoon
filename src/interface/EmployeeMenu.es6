import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity'
import Button from 'tin-engine/basic/button';
import EmployeeInfo from './EmployeeInfo';
import {arrayRemove} from 'tin-engine/util';
import config from './../config/config';


export default class EmployeeMenu extends Entity {
	constructor(staff) {
		super(new V2(48, 0),  new V2(config.screen.w - 48, 128));
		this.staff = staff;
		
		this.employeeDisplay = [];
		for(var i = 0; i < 3; i++) {
			const info = new EmployeeInfo(new V2(0, i * 40 + 8), staff);
			this.employeeDisplay.push(info);
			this.add(info);
		}
		
		this.scrollOffset = 0;
	}
	
	update(delta) {
		var displayPos = 0;
		for(var i = this.scrollOffset; displayPos < 3; i++) {
			const employee = i >= this.staff.hired.length ? ((i - this.staff.hired.length) >= this.staff.available.length ? null : this.staff.available[i - this.staff.hired.length]) : this.staff.hired[i];
			this.employeeDisplay[displayPos].setEmployee(employee, (i >= this.staff.hired.length));
			displayPos++;
		}
	}
	
	scrollUp() {
		scrollOffset = Math.max(0, scrollOffset - 1);
	}
	
	scrollDown() {
		scrollOffset = Math.min(staff.available.length + staff.hired.length - 1, scrollOffset + 1);
	}
}