import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import TextEntity from 'tin-engine/basic/text';

export default class Notification extends Entity {
	constructor(text, font) {
		super(Zero(), new V2(592, 16));
		this.add(new TextEntity(Zero(), text, font));
	}
}