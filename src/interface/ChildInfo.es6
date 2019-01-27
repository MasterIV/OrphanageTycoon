import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import TextEntity from 'tin-engine/basic/text';
import ImageEntity from 'tin-engine/basic/image';
import graphics from 'tin-engine/core/graphic';
import FontStyle from 'tin-engine/definition/font';

graphics.add('img/ui/bar_children.png');
graphics.add('img/ui/progressbar.png');

export default class ChildInfo extends Entity {
	constructor(pos) {
		super(pos, new V2(592, 20));
		this.add(new ImageEntity(Zero(), 'img/ui/bar_children.png'));
		this.font = new FontStyle(18, 'white');
		this.nameFont = new FontStyle(16, 'white');
		
		this.name = new TextEntity(new V2(40, 15), '', this.nameFont);
		this.happiness = new ImageEntity(new V2(215, 12), 'img/ui/progressbar.png');
		this.hunger = new ImageEntity(new V2(389, 12), 'img/ui/progressbar.png');
		this.education = new TextEntity(new V2(140, 15), '', this.font);
		//this.gender = new TextEntity(new V2(320, 10), '', this.font);

		this.add(this.name);
		this.add(this.happiness);
		this.add(this.hunger);
		this.add(this.education);
		//this.add(this.gender);
		
		this.child = null;
	}
	
	setChild(child) {
		this.child = child;
		if(child === null) {
			this.name.text = '';
			this.happiness.size.x = 0;
			this.hunger.size.x = 0;
			this.education.text = '';
			//this.gender.text = this.child.gender;
		} else {
			this.name.text = this.child.name;
			this.happiness.size.x = (this.child.happiness / 100.0 * 145) | 0;
			this.hunger.size.x = (this.child.hunger / 100.0 * 145) | 0;
			this.education.text = this.child.education;
			//this.gender.text = this.child.gender;
		}
	}
}