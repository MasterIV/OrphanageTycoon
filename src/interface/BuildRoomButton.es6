import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity'
import Button from 'tin-engine/basic/button';
import graphics from 'tin-engine/core/graphic';
import ImageEntity from 'tin-engine/basic/image';

graphics.add('img/ui/buildbuttonbg.png');

export default class BuildRoomButton extends Button {
	constructor(pos, callback) {
		super(pos, callback);
		this.size =  new V2(graphics['img/ui/buildbuttonbg.png'].width, graphics['img/ui/buildbuttonbg.png'].height);
		this.add(new ImageEntity(Zero(), 'img/ui/buildbuttonbg.png'));
	}
	
	static create(pos, callback) {
		return new BuildRoomButton(pos, callback);
	}
	
	img(src, scale) {
		var img = new ImageEntity(new V2(0, 0), src, scale);
		img.position.x = (this.size.x - img.size.x * scale) / 2.0;
		img.position.y = (this.size.y - img.size.y * scale) / 2.0;
		this.add(img);
		return this;
	}
}