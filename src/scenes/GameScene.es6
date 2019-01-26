import Scene from 'tin-engine/lib/scene';
import V2, {Zero} from 'tin-engine/geo/v2';
import config from '../config/config';
import ViewPort from 'tin-engine/lib/viewport';

export default class GameScene extends Scene {
	constructor() {
		super();
		this.setSize(config.screen.w, config.screen.h);

		// const viewport = new ViewPort();
		// viewport.setSize(1440, 500);
		// this.add(viewport);


	}
}
