import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import TextEntity from 'tin-engine/basic/text';
import ImageEntity from 'tin-engine/basic/image';
import graphics from 'tin-engine/core/graphic';

graphics.add('img/ui/bar_children.png');

export default class ChildInfo extends Entity {
	constructor(pos) {
		super(pos, new V2(592, 20));
		this.add(new ImageEntity(Zero(), 'img/ui/bar_children.png'));
		this.name = new TextEntity(new V2(140, 10), '');
		this.hunger = new TextEntity(new V2(200, 10), '');
		this.happiness = new TextEntity(new V2(240, 10), '');
		this.education = new TextEntity(new V2(280, 10), '');
		this.gender = new TextEntity(new V2(320, 10), '');

		this.add(this.name);
		this.add(this.hunger);
		this.add(this.happiness);
		this.add(this.education);
		this.add(this.gender);
		
		this.child = null;
	}
	
	setChild(child) {
		this.child = child;
	}
	
	update(delta) {
		this.name.text = this.child.name;
		this.hunger.text = this.child.hunger;
		this.happiness.text = this.child.happiness;
		this.education.text = this.child.education;
		this.gender.text = this.child.gender;
	}
}