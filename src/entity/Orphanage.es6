import Entity from 'tin-engine/basic/entity';
import rooms from '../config/rooms';
import ImageEntity from 'tin-engine/basic/image';
import V2, {Zero} from 'tin-engine/geo/v2';


const maxSize = 20;
const stairsX = 688;

function calcWidth(floor) {
	return floor.reduce((a,b) => ({width: a.width+b.width}), {width: 0}).width;
}

export default class Orphanage extends Entity {
	constructor() {
		super();
		this.floors = [];
		this.addFloor();
		this.addRoom('kitchen', 0, 'left');
		this.addRoom('dorm', 0, 'right');
	}

	isValid(room, floor, direction) {
		if(!rooms[room])
			return false;

		if(!this.floors[floor] && !this.floors[floor - 1])
			return false; // Skipping a floor here !?!

		const current = this.floors[floor] ? this.floors[floor][direction] : [];
		const width = calcWidth(current) + rooms[room].width;

		if(width > maxSize)
			return false; // We exceed the max building size here
		if(floor > 0 && width > width(this.floors[floor-1][direction]))
			return false; // do not build a floor larger than the previous one!

		return true;
	}

	addFloor() {
		this.add(new ImageEntity(new V2( stairsX, -96*this.floors.length), 'img/rooms/stairs.png'));
		this.floors.push({left:[], right:[]});
	}

	addRoom( room, floor, direction ) {
		if(this.isValid(room, floor, direction)) {
			if(!this.floors[floor]) this.addFloor();
			const width = calcWidth(this.floors[floor][direction]) * 32;
			const x = direction == 'left' ? stairsX - width - rooms[room].width * 32 :  stairsX + width + 96;
			const img = new ImageEntity(new V2(x , -96*floor), 'img/rooms/'+room+'.png')
			this.add(img);
			this.floors[floor][direction].push({...rooms[room], employee: null, entity: img});
		}
	}
}