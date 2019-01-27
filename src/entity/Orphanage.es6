import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';
import ImageEntity from 'tin-engine/basic/image';
import V2, {Zero} from 'tin-engine/geo/v2';
import Room from './Room';

const maxSize = 20;
const stairsX = 688;
const floorPrice = 20;

function calcWidth(floor) {
	return floor.reduce((a,b) => ({width: a.width+b.width}), {width: 0}).width;
}

export default class Orphanage extends Entity {
	constructor() {
		super();
		this.floors = [];

		this.money = 2500;
		this.counts = {};
		for(var i in rooms)
			this.counts[i] = 0;

		this.addFloor();
		this.addRoom('kitchen', 0, 'left');
		this.addRoom('dorm', 0, 'right');
	}

	calcWidth(floor) {
		return new V2(
			720 - 48 - calcWidth(this.floors[floor].left) * 32,
			720 + 48 + calcWidth(this.floors[floor].left) * 32
		)
	}

	isValid(room, floor, direction) {
		const price = rooms[room].price + floorPrice * floor;

		if(!rooms[room])
			return false;
		if(this.money < price)
			return false;
		if(!this.floors[floor] && !this.floors[floor - 1])
			return false; // Skipping a floor here !?!

		const current = this.floors[floor] ? this.floors[floor][direction] : [];
		const width = calcWidth(current) + rooms[room].width;

		if(width > maxSize)
			return false; // We exceed the max building size here
		if(floor > 0 && width > calcWidth(this.floors[floor-1][direction]))
			return false; // do not build a floor larger than the previous one!

		return true;
	}

	addFloor() {
		this.add(new ImageEntity(new V2( stairsX, -96*this.floors.length-96), 'img/rooms/stairs.png'));
		this.floors.push({left:[], right:[]});
	}

	addRoom( room, floor, direction ) {
		if(this.isValid(room, floor, direction)) {
			if(!this.floors[floor]) this.addFloor();
			const img = new ImageEntity(this.getPosition(room, floor, direction), 'img/rooms/'+room+'.png');
			const price = rooms[room].price + floorPrice * floor;

			this.add(img);
			this.floors[floor][direction].push(new Room(room, floor, img));
			this.counts[room]++;
			this.money -= price;
		}
	}

	getPosition( room, floor, direction ) {
		const width = calcWidth(this.floors[floor] ? this.floors[floor][direction] : []) * 32;
		const x = direction == 'left' ? stairsX - width - rooms[room].width * 32 :  stairsX + width + 96;
		return new V2(x , -96*floor-96);
	}

	forEach(callback) {
		for(var i in this.floors) {
			for (var j in this.floors[i].left)
				callback(this.floors[i].left[j])
			for (var j in this.floors[i].right)
				callback(this.floors[i].right[j])
		}
	}

	findFree(room) {
		let result = null;

		this.forEach(r => {
			if(r.type == room && !r.employee)
				result = r;
		});

		return result;
	}

	repair() {
		let room = null;

		this.forEach(r => {
			if(!room || r.damage >= room.damage) room = r;
		});

		room.damage = 0;
	}

	findClosest(child, room) {
		const floor = child.floor();
		let best = null;
		let result = null;

		this.forEach(r => {
			if(r.type == room && r.employee && r.free()) {
				const e = r.entity;

				const dist = r.floor == floor
					? Math.abs(e.position.x + e.width * 16 - child.position.x)
					: Math.abs(e.position.x + e.width * 16 - 720) + 96 * Math.abs(r.floor - floor) + Math.abs(720 - child.position.x);

				if(best === null || best > dist) {
					best = dist;
					result = r;
				}
			}
		});

		return result;
	}
}