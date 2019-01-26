import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';
import ImageEntity from 'tin-engine/basic/image';
import V2, {Zero} from 'tin-engine/geo/v2';

export default class Cursor extends Entity {
	orphanage = null;
	selected = null;

	constructor(orphanage) {
		super();
		this.orphanage = orphanage;
	}

	select(room) {

	}
}