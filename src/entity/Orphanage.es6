import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';

const maxSize = 20;

export default class Orphanage extends Entity {
	floors = [{left:[rooms.dorm], right:[rooms.kitchen]}];

	constructor() {
		super();
	}

	isValid(room, floor, direction) {
		if(!this.floors[floor]) {
			if (!this.floors[floor - 1])
				return false; // Skipping a floor here !?!
			else
				this.floors[floor] = {left:[], right:[]};
		}

		const current = this.floors[floor][direction];
		const width = current.reduce((a,b) => ({width: a.width+b.width})).width + room.width;

		if(width > maxSize)
			return false; // We exceed the max building size here
		if(floor > 0 && width > this.floors[floor-1][direction].reduce((a,b) => ({width: a.width+b.width})).width)
			return false; // do not build a floor larger than the previous one!

		return true;
	}

	add( room, floor, direction ) {
		if(this.isValid(room, floor, direction))
			this.floors[floor][direction].push(room);
	}

	draw() {

	}
}