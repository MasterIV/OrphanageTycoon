import rooms from '../config/rooms';
import activities from '../config/activities';
import Entity from 'tin-engine/basic/entity';
import ImageEntity from 'tin-engine/basic/image';
import V2, {Zero} from 'tin-engine/geo/v2';

const employeeFactor = .1;
const damageIncrease = 100;

export default class Room extends Entity {
	constructor(pos, type, floor) {
		super(pos);
		this.add(new ImageEntity(Zero(), 'img/rooms/'+type+'.png'));

		for(var i in rooms[type])
			this[i] = rooms[type][i];

		this.type = type;
		this.floor = floor;

		this.kids = [];
		this.damage = 0;

	}

	duration() {
		const factor = this.employee.level ? 1 - (this.employee.level - 1) * employeeFactor : 1;
		return ( activities[this.activity].duration + this.damage * damageIncrease ) * factor;
	}

	free() {
		return this.use(null);
	}

	use(child) {
		for(var i = 0; i < this.slots; i++)
			if(!this.kids[i]) {
				this.kids[i] = child;
				if(child) child.room = this;
				return i+1;
			}

		return false;
	}

	leave(child) {
		this.damage++;
		for(var i = 0; i < this.slots; i++)
			if(this.kids[i] === child)
				this.kids[i] = null;
		child.room = null;
	}

	postDraw(ctx) {
		ctx.fillStyle = "red";
		ctx.strokeStyle = "black";
		ctx.font = "14px monospace";
		ctx.strokeText(this.damage, 10, 20);
		ctx.fillText(this.damage, 10, 20);
	}
}