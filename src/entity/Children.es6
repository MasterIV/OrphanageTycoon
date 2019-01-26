import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';
import ImageEntity from 'tin-engine/basic/image';
import V2, {Zero} from 'tin-engine/geo/v2';
import Kid from './Kid';

const cooldown = 2000;
const chance = .3;

export default class Children extends Entity {
	constructor(orphanage) {
		super();

		this.orphanage = orphanage;
		this.addChild();
		this.addChild();
		this.addChild();

		this.time = 0;
	}

	addChild() {
		const kid = new Kid();
		this.add(kid);
		window.dispatchEvent(new CustomEvent('notification', {detail: {type: 'new_child', child: kid}}));
	}

	onUpdate(delta) {
		this.time += delta;
		if(this.time > cooldown) {
			this.time = 0;
			const open = this.orphanage.counts.dorm * 4 - this.entities.length;
			for(var i = 0; i < open; i++)
				if(Math.random() < chance)
					this.addChild();
		}
	}
}