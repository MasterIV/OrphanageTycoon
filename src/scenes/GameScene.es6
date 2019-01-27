import Scene from 'tin-engine/lib/scene';
import V2, {Zero} from 'tin-engine/geo/v2';
import config from '../config/config';
import Viewport from '../entity/Viewport';
import Menu from '../interface/Menu';
import Orphanage from '../entity/Orphanage';
import Cursor from '../entity/Cursor';
import Staff from '../entity/Staff';
import Children from '../entity/Children';
import BuildMenu from './../interface/BuildMenu';
import ChildrenMenu from './../interface/ChildrenMenu';
import EmployeeMenu from './../interface/EmployeeMenu';
import NotificationMenu from './../interface/NotificationMenu';
import ImageEntity from 'tin-engine/basic/image';

const monthEnd = 70000;
const orpandMoney = 80;

export default class GameScene extends Scene {
	constructor() {
		super();
		this.setSize(config.screen.w, config.screen.h);
		this.bg = 'img/ui/gamebg.png';
		this.supressClick = false;
		this.timer = 0;

		this.orphanage = new Orphanage();
		this.staff = new Staff(this.orphanage);
		this.children = new Children(this.orphanage);

		const cursor = new Cursor(this.orphanage);
		const viewport = new Viewport(this.orphanage);
		viewport.add(new ImageEntity(Zero(), 'img/floor.png'));
		viewport.add(cursor);
		viewport.add(this.staff);
		viewport.add(this.children);

		this.add(viewport);
		var buildMenu = new BuildMenu(cursor);
		var childrenMenu = new ChildrenMenu(this.children);
		var employeeMenu = new EmployeeMenu(this.staff);
		var notificationMenu = new NotificationMenu();
		var menu = new Menu();
		menu.addMenu(buildMenu, 0);
		menu.addMenu(childrenMenu, 1);
		menu.addMenu(employeeMenu, 2);
		menu.addMenu(notificationMenu, 3);
		
		this.add(menu);
	}

	click(pos) {
		if(this.supressClick) {
			this.supressClick = false;
		} else {
			super.click(pos);
		}
	}

	onDraw(ctx) {
		super.onDraw(ctx);
		const text = 'Beds: ' + this.children.info() + ', Money: ' + this.orphanage.money + '$';

		ctx.fillStyle = "black";
		ctx.strokeStyle = "#BBB";
		ctx.font = "16px monospace";
		ctx.strokeText(text, 630 - text.length * 10, 25);
		ctx.fillText(text, 630 - text.length * 10, 25);
	}

	onUpdate(delta) {
		this.timer += delta;
		if(this.timer >= monthEnd) {
			this.timer = 0;
			const income = this.children.entities.length * orpandMoney;
			const expenses = this.staff.costs();
			
			window.dispatchEvent(new CustomEvent('notification', {detail: {type: 'month_end', income: income, expenses: expenses}}));
			this.orphanage.money += income - expenses;
		}
	}
}
