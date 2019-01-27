import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import TextEntity from 'tin-engine/basic/text';
import ImageEntity from 'tin-engine/basic/image';
import graphics from 'tin-engine/core/graphic';

graphics.add('img/ui/notificationbarbg.png');


export default class Notification extends Entity {
	constructor(pos, font) {
		super(pos, new V2(592, 16));
		this.bg = new ImageEntity(Zero(), 'img/ui/notificationbarbg.png');
		this.bg.visible = false;
		this.add(this.bg);
		this.add(new TextEntity(new V2(592 / 2 - 32, 10), '', font));
	}
	
	text(string, index) {
		this.entities[1].text = string;
		if(string == '') {
			this.bg.visible = false;
		} else {
			this.bg.visible = index % 2 == 1;
		}
	}
}