import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity'
import Button from 'tin-engine/basic/button';
import graphics from 'tin-engine/core/graphic';
import {HorizontalLayout} from 'tin-engine/basic/layout';
import BuildRoomButton from './BuildRoomButton';

import rooms from './../config/rooms';

export default class BuildMenu extends Entity {
	constructor(cursor, pos, size) {
		super(pos, size);
		this.cursor = cursor;
		var buttonLayout = new HorizontalLayout(new V2(0, 14), 0, 16);
		for(var r in rooms) {
			const room = r;
			//buttonLayout.add(BuildRoomButton.create(Zero(), () => alert('Build ' + r)).img('img/rooms/' + r + '.png', 72.0 / (rooms[r].width * 32.0)));
			buttonLayout.add(BuildRoomButton.create(Zero(), () => this.cursor.select(room)).img('img/rooms/' + r + '.png', 72.0 / (7 * 32.0)));
		}

		this.center(buttonLayout);
	}
}