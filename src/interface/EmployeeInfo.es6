import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import TextEntity from 'tin-engine/basic/text';
import ImageEntity from 'tin-engine/basic/image';
import Employee from './../entity/Employee';
import graphics from 'tin-engine/core/graphic';
import FontStyle from 'tin-engine/definition/font';
import Button from 'tin-engine/basic/button';
import Staff from '../entity/Staff';

graphics.add('img/ui/baremployee.png');
graphics.add('img/ui/baremployeefaded.png');
graphics.add('img/ui/hirebutton.png');
graphics.add('img/ui/hirebuttonfaded.png');
graphics.add('img/ui/firebutton.png');

export default class EmployeeInfo extends Entity {
	constructor(pos, staff) {
		super(pos, new V2(592, 20));
		this.staff = staff;
		this.font = new FontStyle(18, 'white');
		this.nameFont = new FontStyle(16, 'white');
		this.bg = new ImageEntity(Zero(), 'img/ui/baremployeefaded.png');
		this.add(this.bg);
		this.name = new TextEntity(new V2(50, 15), '', this.nameFont);
		this.type = new TextEntity(new V2(130, 15), '', this.nameFont);
		this.level = new TextEntity(new V2(230, 15), '', this.font);
		this.salary = new TextEntity(new V2(362, 15), '', this.font);
		this.add(this.name);
		this.add(this.type);
		this.add(this.level);
		this.add(this.salary);
		this.hireBlocked = false;
		this.fireBlocked = false;
		this.jobStatusChanged = false;
		this.hireButton = Button.create(new V2(444, 2), () => this.hire()).img('img/ui/hirebutton.png');
		this.fireButton = Button.create(new V2(496, 2), () => this.fire()).img('img/ui/firebutton.png');
		
		this.add(this.hireButton);
		this.add(this.fireButton);
		this.curEmployee = null;
	}
	
	hire() {
		if(!this.hireBlocked) {
			this.hireBlocked = true;
			this.staff.hire(this.curEmployee);
			this.hireBlocked = false;
			this.jobStatusChanged = true;
		}
	}
	
	fire() {
		if(!this.fireBlocked) {
			this.fireBlocked = true;
			this.staff.fire(this.curEmployee);
			this.fireBlocked = false;
			this.jobStatusChanged = true;
		}
	}
	
	setEmployee(employee, hirable) {
		if(employee != null) {
			if(this.jobStatusChanged) {
				if(hirable) {
					this.hireButton.visible = true;
					this.fireButton.visible = false;
				}
				else {
					this.hireButton.visible = false;				
					this.fireButton.visible = true;
				}
				this.jobStatusChanged = false;
			}
			if(this.staff.canHire(employee)) {
					this.hireButton.img('img/ui/hirebutton.png');
			} else {
					this.hireButton.img('img/ui/hirebuttonfaded.png');
			}
			if(!(this.curEmployee === employee)) {
				this.name.text = employee.name;
				this.type.text = employee.type;
				this.level.text = employee.level;
				this.salary.text = employee.salary;
				
				if(hirable) {
					this.hireButton.visible = true;
					this.fireButton.visible = false;
				}
				else {
					this.hireButton.visible = false;				
					this.fireButton.visible = true;
				}
				
				if(this.curEmployee === null) {
					this.bg.img = graphics['img/ui/baremployee.png'];
				}
				this.curEmployee = employee;
			}
		} else {
			this.bg.img = graphics['img/ui/baremployeefaded.png'];
			this.name.text = '';
			this.type.text = '';
			this.level.text = '';
			this.salary.text = '';
			this.hireButton.visible = false;				
			this.fireButton.visible = false;
			this.curEmployee = null;
		}
	}
}