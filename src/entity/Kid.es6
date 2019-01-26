import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';
import RectEntity from 'tin-engine/basic/rect';
import V2, { Zero } from 'tin-engine/geo/v2';
import names from '../config/names';

const hungerRate = 0.5;
const happinessRate = {
	idle: .2,
	learn: .4,
	walk: 0,
	play: -1
};


export default class Kid extends Entity {
	constructor() {
		super(new V2(720, -32));

		const index = (Math.random() * names.length) | 0;
		this.name = names[index];
		this.gender = index % 2;

		this.hunger = 100;
		this.happiness = 50;
		this.education = 0;
		this.activity = 'idle';

		this.add(new RectEntity(Zero(), new V2(32, 32)));
	}

	onUpdate(delta) {
		let hungerFactor = 1;
		let happinessLoss = 0;

		if (this.hunger < 25) {
			hungerFactor = .25;
			happinessLoss = 1;
		} else if (this.hunger < 50) {
			hungerFactor = .5;
			happinessLoss = .5;
		}

		this.hunger -= delta * hungerRate * hungerFactor;
		this.happiness -= delta * happinessRate[this.activity] + happinessLoss;


	}
}