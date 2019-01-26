import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';
import ImageEntity from 'tin-engine/basic/image';
import V2, {Zero} from 'tin-engine/geo/v2';
import names from '../config/names';


export default class Kid extends Entity {
	constructor() {
		super(new V2(720, -32));
		const index = (Math.random() * names.length) | 0;
		this.name = names[index];
		this.gender = index%2;
	}
}