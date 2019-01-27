import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity'
import Button from 'tin-engine/basic/button';
import graphics from 'tin-engine/core/graphic';
import ImageEntity from 'tin-engine/basic/image';
import TextEntity from 'tin-engine/basic/text';
import rooms from './../config/rooms';

graphics.add('img/ui/buildbuttonbg.png');
graphics.add('img/ui/buildbuttonbgcover.png');

export default class BuildRoomButton extends Button {
	constructor(pos, callback, font, orphanage) {
		super(pos, callback);
		this.size =  new V2(graphics['img/ui/buildbuttonbg.png'].width, graphics['img/ui/buildbuttonbg.png'].height);
		this.add(new ImageEntity(Zero(), 'img/ui/buildbuttonbg.png'));
		this.roomType = null;
		this.font = font;
		this.cover = new ImageEntity(Zero(), 'img/ui/buildbuttonbgcover.png');
		this.covered = false;
		this.price = 0;
		this.orphanage = orphanage;
		if(orphanage == null) {
			alert('null');
		}
	}
	
	static create(pos, callback, font, orphanage) {
		return new BuildRoomButton(pos, callback, font, orphanage);
	}
	
	img(src, scale) {
		var img = new ImageEntity(new V2(0, 0), src, scale);
		img.position.x = (this.size.x - img.size.x * scale) / 2.0;
		img.position.y = (this.size.y - img.size.y * scale) / 2.0;
		this.add(img);
		return this;
	}
	
	type(roomType) {
		this.roomType = roomType;
		var roomName = roomType[0].toUpperCase() + roomType.substr(1);
		this.add(new TextEntity(new V2(this.size.x / 2, 15), roomName, this.font));
		this.add(new TextEntity(new V2(this.size.x / 2, 83), '$' + rooms[this.roomType].price, this.font));
		this.price = rooms[this.roomType].price;
		return this;
	}
	
	setCover(on) {
		if(on) {
			if(!this.covered) {
				this.add(this.cover);
			}
		} else {
			if(this.covered) {
				this.remove(this.cover);
			}
		}
	}
	
	update(delta) {
		if(this.covered) {
			if(this.orphanage.money >= this.price) {
				this.setCover(false);
				this.covered = false;
			}
		} else {
			if(this.orphanage.money < this.price) {
				this.setCover(true);
				this.covered = true;
			}
		}
	}
}