import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity'
import Button from 'tin-engine/basic/button';
import {HorizontalLayout} from 'tin-engine/basic/layout';

import rooms from './../config/rooms';

export default class BuildMenu extends Entity {
	constructor(pos, size) {
		super(pos, size);

		var buttonLayout = new HorizontalLayout(new V2(0, 14), 0, 20);
		for(var r in rooms) {
			buttonLayout.add(Button.create(Zero(), () => alert('Build ' + r)).img('img/ui/build' + r + 'button.png'));
		}

		this.center(buttonLayout);
	}
}