import Entity from 'tin-engine/basic/entity';
import V2, { Zero } from 'tin-engine/geo/v2';
import names from '../config/names';
import activities from '../config/activities';
import graphics from 'tin-engine/core/graphic';
import Animation from 'tin-engine/lib/animation';
import sound from 'tin-engine/core/sound';

const hungerRate = 1.5;
const sleepCooldown = 20;
const speed = 100;
const floorOffset = 58;

const fine = 300;
const baseDonation = 160;
const educationDonation = 20;

graphics.add('img/animation/adoption.png');
graphics.add('img/animation/boy1.png');
graphics.add('img/animation/boy2.png');
graphics.add('img/animation/girl1.png');
graphics.add('img/animation/girl2.png');
const genders = ['boy', 'girl'];

export default class Kid extends Entity {
	constructor(orphanage) {
		super(new V2(720, floorOffset-96));
		this.orphanage = orphanage;

		const index = (Math.random() * names.length) | 0;
		this.name = names[index];
		this.gender = index % 2;

		this.hunger = 50 + 30 * Math.random();
		this.happiness = 40 + 20 * Math.random();
		this.education = 0;

		this.activity = 'idle';
		this.room = null;

		this.sleep = 0;
		this.destination = null;
		this.climbing = false;

		this.direction = 0;
		this.state = 1;

		const rand = Math.round(Math.random())+1;
		const url = 'img/animation/' + genders[this.gender] + rand + '.png';
		this.img = new Animation(url, Zero(), new V2(8, 6), 160, true);

		this.add(this.img);
	}

	walkTo(room) {
		const pos = room.position;
		const index = room.use(this);
		if(!index) return;

		this.destination = new V2(pos.x + index * 48 - 40, pos.y + floorOffset);
		this.activity = 'walk';

		const rand = 1 + Math.floor(Math.random()*3);
		sound.play('sound/activities/walk'+rand+'.mp3');

		//console.log(this.name + ' want\'s to ' + room.activity, this);
	}

	updateStats(delta) {
		delta /= 1000;

		let hungerFactor = 1;
		let happinessLoss = 0;

		if (this.hunger < 15) {
			hungerFactor = .25;
			happinessLoss = 2;
		} else if (this.hunger < 30) {
			hungerFactor = .5;
			happinessLoss = 1;
		}

		this.sleep += delta;
		this.hunger = Math.max(0, Math.min(100, this.hunger
			- delta * hungerRate * hungerFactor));
		this.happiness = Math.max(0, Math.min(100, this.happiness
			- delta * activities[this.activity].happiness
			- delta * happinessLoss));
	}

	floor() {
		return Math.abs(this.position.y / 96) | 0
	}

	selectActivity() {
		if(sleepCooldown < this.sleep) {
			let room = this.orphanage.findClosest(this, 'dorm');
			if(room) return this.walkTo(room);
		}

		if(Math.min(this.hunger, this.happiness) < 50) {
			if(this.hunger < this.happiness || this.hunger < 40) {
				let room = this.orphanage.findClosest(this, 'kitchen');
				if(room) return this.walkTo(room);
			} else {
				let room = this.orphanage.findClosest(this, 'playroom');
				if(room) return this.walkTo(room);
			}
		}

		let room = this.orphanage.findClosest(this, 'classroom');
		if(room) return this.walkTo(room);

		room = this.orphanage.findClosest(this, 'playroom');
		if(room) return this.walkTo(room);

		if(Math.random() > .025) {
			// walk around randomly
			const floor = this.orphanage.calcWidth(this.floor());
			this.activity = 'walk';
			this.destination = new V2((floor.x + (floor.y - floor.x - 32) * Math.random()) | 0, this.position.y);
		}
	}

	completeActivity() {
		switch(this.activity) {
			case 'eat':
				this.hunger += activities.eat.value;
				break;
			case 'play':
				this.happiness += activities.play.value;
				break;
			case 'learn':
				this.education++;
				break;
			case 'sleep':
				this.sleep = 0;
		}

		// See if you get adopted!
		const chance = this.education / 200 + this.happiness / 5000;
		if(Math.random() < chance) {
			const donation = baseDonation + educationDonation * this.education;
			window.dispatchEvent(new CustomEvent('notification', {detail: {type: 'adoption', child: this, donation: donation}}));
			this.orphanage.money += donation;
			this.parent.remove(this);
			this.parent.add(new Animation('img/animation/adoption.png', this.position.dif(new V2(48,64)), 10, 150));
		}
	}

	updateWalkAxis(speed, d, axis) {
		if(d > this.position[axis]) {
			if(axis == 'x') this.direction = 0;
			this.position[axis] = Math.min(d, this.position[axis] + speed);
		} else {
			if(axis == 'x') this.direction = 3;
			this.position[axis] = Math.max(d, this.position[axis] - speed);
		}
	}

	updateWalk(delta) {
		delta /= 1000;

		if(this.destination.y == this.position.y) {
			if(this.destination.x == this.position.x) {
				// destination reached
				if(this.room) {
					this.activity = this.room.activity;
					this.duration = this.room.duration();

					const rand = 1 + Math.floor(Math.random()*activities[this.activity].samples);
					sound.play('sound/activities/'+this.activity+rand+'.mp3');
				} else {
					this.activity = 'idle';
				}

				return;
			}

			// move to room
			this.climbing = false;
			this.updateWalkAxis(speed*delta, this.destination.x, 'x');
		} else if(this.climbing) {
			// climb stairs
			this.updateWalkAxis(speed*delta*.8, this.destination.y, 'y');
		} else {
			if(this.position.x == 720) {
				// climb the stairs
				this.climbing = true;
				return;
			}

			// move to stairs
			this.updateWalkAxis(speed*delta, 720, 'x');
		}
	}

	updateActivity(delta) {
		switch(this.activity) {
			case 'idle':
				this.state = 1;
				this.selectActivity();
				break;
			case 'walk':
				this.state = 0;
				this.updateWalk(delta);
				break;
			default:
				this.state = this.activity == 'sleep' ? 1 : 2;
				this.duration -= delta;
				if(0 > this.duration) {
					this.room.leave(this);
					this.completeActivity();
					this.activity = 'idle';
				}
		}
	}

	onUpdate(delta) {
		this.updateStats(delta);
		this.updateActivity(delta);
		this.img.state = this.direction + this.state;

		if(this.happiness < 1) {
			// Kid ran away
			window.dispatchEvent(new CustomEvent('notification', {detail: {type: 'run_away', child: this, fine: fine}}));
			this.orphanage.money -= fine;
			this.parent.remove(this);
		}
	}
}