import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';

const maxSize = 20;

export default class Orphanage extends Entity {
	floors = [];

	constructor() {
		super();
		this.addFloor();
		this.addRoom('kitchen', 0, 'left');
		this.addRoom('dorm', 0, 'right');
	}

	isValid(room, floor, direction) {
		if(!this.floors[floor]) {
			if (!this.floors[floor - 1])
				return false; // Skipping a floor here !?!
			else
				this.addFloor();
		}

		const current = this.floors[floor][direction];
		const width = current.reduce((a,b) => ({width: a.width+b.width})).width + rooms[room].width;

		if(width > maxSize)
			return false; // We exceed the max building size here
		if(floor > 0 && width > this.floors[floor-1][direction].reduce((a,b) => ({width: a.width+b.width})).width)
			return false; // do not build a floor larger than the previous one!

		return true;
	}

	addFloor() {
		this.floors.push({left:[], right:[]});
	}

	addRoom( room, floor, direction ) {
		if(this.isValid(room, floor, direction)) {
			this.floors[floor][direction].push({...rooms[room], employee: null});
			this.add(nee)
		}
	}

	draw() {

	}
}