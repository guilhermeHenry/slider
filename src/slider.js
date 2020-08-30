const {rwd, collectionsMap, encapsulation, insertAfter} = require('apps-help');

let html = null, 
	datas = null, 
	configs = null;

/** @Object element - Constructor */
module.exports = function (element) {
	html = collectionsMap(element, {
		slider:    element,
		box:       '.slider-box',
		arrows:    '.slider-arrows',
		container: '.slider-container',
		back:   '(parent:arrows).left',
		next:   '(parent:arrows).right',
		items:     '*.slider-item',
		articles:  '*(parent:items)',
		active:    null,
		paginator: '.slider-paginator',
		paginatorItems: null
	});

	datas = {
		side: null,
		lock: false, /** Acontecendo o evento de mudança de página */
		pagesTotal: null,
		index: null,
		target: null,
		perView: null,
		device: null
	}

	configs = {
		launch: false,
		itemSliderength: null,
		target: null,
		play: false,
		delay: 0,         // ms
		speed: 300,  	  // min: 100, max: 3500 ms
		timing: 'linear', // 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'
		maxPages: 5
	}

	encapsulation(html, configs, datas);

	rwd({
		800: mobile,
	    2000: desktop
	});
}

const mobile = function () {
	datas.set('target', 'articles');
	datas.set('pages.total', html.get('articles').length);

	if (!datas.index){
		init();
	}else{
		// ### UPDATE
		let index = (datas.get('index') * 3) - 2;
		let element = html.get(datas.get('target'), index - 1);
			element.classList.add('active');
		
		datas.set('index', index);
		datas.get('active').classList.remove('active');
		datas.set('active', element);

		paginator.update();
	}
}

const desktop = function () {
	datas.set('target', 'items');
	datas.set('pages.total', html.get('items').length);

	if (!datas.get('index')){
		init();
	}else{
		// ### UPDATE
		let index = Math.ceil(datas.get('index') / 3);
		let element = html.get(datas.get('target'), index - 1);
			element.classList.add('active');

		datas.set('index', index);
		datas.get('active').classList.remove('active');
		datas.set('active', element);

		paginator.update();
	}

	html.get('back').addEventListener('click', events.back);
	html.get('next').addEventListener('click', events.next);
}

const init = function (start = 1) {
	const index = pages.check(start);
	const {target} = datas;
	const element  = html.get(target)[index - 1];
		  element.classList.add('active');
	
	datas.set('index', index);
	datas.set('active', element);

	paginator.create();
}

// ### PAGINATOR
const paginator = {
	update(){
		this.destroy();
		this.create();
	},
	create(){
		html.set('paginator.items', []);

		if (pages.total() > 1){
			for (var i = 1; i <= pages.total(); i++) {
				let li = document.createElement('li');
					li.innerHTML = i;
					li.classList.add(`${i}`);

				if (i === datas.get('index')){
					li.classList.add('active');
				}

				html.get('paginator', li).appendChild(li);
				html.add('paginator.items', li);
			}
		}

		html.get('paginator.items').forEach((item, index) => {
			item.addEventListener('click', () => {
				events.move(index + 1);
			});
		});
	},
	destroy(){
		html.get('paginator').innerHTML = '';
	}
}

let pages = {};

// ### PAGES
pages.total = () => datas.get('pages.total');
pages.check = (index) => index > datas.get('pages.total') ? 1 : (index < 1 ? datas.get('pages.total') : index);

// ### EVENTS
const events = {};

events.move = index => {
	const {target, lock} = datas;

	if (!lock){
		const {speed, timing} = configs;

		const side  = Math.sign(datas.get('index') - index);
		const current = datas.get('index')  - 1;
		const next = pages.check(index) - 1;

		datas.set('index', pages.check(index));

		// ## NEXT
		html.get(target, next).style.display = 'block';
		html.get(target, next).style.top = '0px';
		html.get(target, next).style.position = 'absolute';
		html.get(target, next).style.right = side * 100 + '%';

		html.get('box').style['transition-duration'] = speed + 'ms';
		html.get('box').style['transition-timing-function'] = timing;
		html.get('box').style.left = 100 * side + '%';

		setTimeout(() => {

			// ## REMOVE ACTIVE
			html.get(target, current).classList.remove('active');

			// ## ADD ACTIVE
			html.get(target, next).classList.add('active');
			html.get(target, next).removeAttribute('style');

			html.get('box').removeAttribute('style');
			datas.set('lock', false);

			//## PAGINATOR
			html.get('paginator.items', current).classList.remove('active');
			html.get('paginator.items', next).classList.add('active');

		}, speed);
	}
}

events.back = function () {
	events.move(datas.get('index') - 1);
}

events.next = function () {
	events.move(datas.get('index') + 1);
}



























































