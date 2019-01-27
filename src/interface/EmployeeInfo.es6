import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import TextEntity from 'tin-engine/basic/text';
import Employee from './../entity/Employee';

export default class EmployeeInfo extends Entity {
	constructor(pos) {
		super(pos, new V2(592, 20));
		this.type = new TextEntity(new V2(148, 10), '');
		//this.name = new TextEntity(new V2(240, 10), '');
		this.level = new TextEntity(new V2(360, 10), '');
		this.add(this.type);
		//this.add(this.name);
		this.add(this.level);
	}
	
	setEmployee(employee) {
		if(employee != null) {
			this.type.text = employee.type;
			//this.name.text = employee.name;
			this.level.text = employee.level;
		}
		else {
			
		}
	}
}