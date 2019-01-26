import Scene from 'tin-engine/lib/scene';
import V2, {Zero} from 'tin-engine/geo/v2';
import config from '../config/config';
import Viewport from '../entity/Viewport';
import Menu from '../interface/Menu';
import Orphanage from '../entity/Orphanage';
import Cursor from '../entity/Cursor';
import Staff from '../entity/Staff';

export default class GameScene extends Scene {
	constructor() {
		super();
		this.setSize(config.screen.w, config.screen.h);
		this.bg = 'img/ui/gamebg.png';
		this.supressClick = false;

		const orphanage = new Orphanage();
		const cursor = new Cursor(orphanage);
		const staff = new Staff(orphanage);
		const viewport = new Viewport(orphanage);
		viewport.add(cursor);

		this.add(staff);
		this.add(viewport);
		this.add(new Menu(cursor));
	}

	click(pos) {
		if(this.supressClick) {
			this.supressClick = false;
		} else {
			super.click(pos);
		}
	}
}
