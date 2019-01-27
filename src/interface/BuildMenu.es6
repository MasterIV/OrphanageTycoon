import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity'
import Button from 'tin-engine/basic/button';
import graphics from 'tin-engine/core/graphic';
import {HorizontalLayout} from 'tin-engine/basic/layout';
import BuildRoomButton from './BuildRoomButton';
import FontStyle from 'tin-engine/definition/font';

import rooms from './../config/rooms';
import config from './../config/config';

export default class BuildMenu extends Entity {
	constructor(cursor) {
		super(new V2(48, 0),  new V2(config.screen.w - 48, 128));
		this.font = new FontStyle(15, '#5e4e4e');
		this.cursor = cursor;
		var buttonLayout = new HorizontalLayout(new V2(0, 14), 0, 16);
		for(var r in rooms) {
			const room = r;
			//buttonLayout.add(BuildRoomButton.create(Zero(), () => alert('Build ' + r)).img('img/rooms/' + r + '.png', 72.0 / (rooms[r].width * 32.0)));
			buttonLayout.add(BuildRoomButton.create(Zero(), () => this.cursor.select(room), this.font).img('img/rooms/' + r + '.png', 72.0 / (7 * 32.0)).type(r));
		}

		this.center(buttonLayout);
	}
}