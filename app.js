import BP from './node_modules/callpoint/app.js';
import config from './node_modules/config/app.js';
import strutureDatas from './../../app/helpers/strutureDatas.js';
import factory from './factory/factory.js';

let Slider = function () {
	this.datas = {
		pages: {
			max: 8,
			total: null,
			view: null
		},
		index: 1,
		side: null,
		lock: false,
		class: {
			box: 'Sliderider-box',
			Sliderider: 'Sliderider',
			btnBox: 'arrows',
			container: 'Sliderider-container',
			paginator: 'Sliderider-paginator',
			btnBack: 'arrow-left',
			btnNext: 'arrow-right',
		}

	}

	this.elements = {
		box: null,
		boxItems: null,
		Sliderider: null,
		container: null,
		paginator: null,
		paginatorItems: null,
		btnBack: null,
		btnNext: null
	}

	this.config = {
		items: null,
		launch: false,
		itemSliderength: null,
		target: null,
		play: false,
		delay: 0,
		speed: 300,
		timing: 'linear'
	}

	this.strutureDatas(
		{index: 'datas', 'as': 'data'},
		{index: 'elements', 'as': 'element'},
		'config'
	);

	new BP(
		[700, this.setPages.bind(this, 1, 4)],
		[2000, this.setPages.bind(this, 3, 10)]
	);
}

Slider.prototype.setPages = function(view, max) {
	this.setData('pages.max', max);
	this.setData('pages.view', view);
}

// ## HELPERS
Slider.prototype.strutureDatas = strutureDatas;

export default Slider;



// let Slider = function (callback = null) {
// 	this.pages    = null;
// 	this.maxPages = 8;
// 	this.perView  = null;
// 	this.index = 1;
// 	this.side  = null;
// 	this.lock  = false;



// 	this.class  = {
// 		box: 'Sliderider-box',
// 		Sliderider: 'Sliderider',
// 		btnBox: 'arrows',
// 		container: 'Sliderider-container',
// 		paginator: 'Sliderider-paginator',
// 		btnBack: 'arrow-left',
// 		btnNext: 'arrow-right',
// 	}

// 	this.items = null;
// 	this.launch = false;
// 	this.itemSliderength = null;

// 	this.config = new config(conf);
// 	this.config.add('items');
// 	this.config.add('target', function (target) {
// 		if (!document.getElementById(target)) {
// 			this.msg.push('msg')
// 		}
// 	});
// 	this.config.add('play', false);
// 	this.config.add('delay', 0); // ms
// 	this.config.add('speed', {min: 100, max: 3500}, true); // ms
// 	this.config.add('timing', Array('linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'));
	
// 	if (this.config.msg.length > 1){
// 		this.config.msg.forEach(msg => console.log(msg));
// 	} else {
// 		for (let name in this.config.conf){this[name] = this.config.conf[name]}
		
// 	}
// }

// view > visualização por página
// max  > Limite de páginas
// Slider.prototype.setPages = function(view, max) {
// 	this.perView = view;
// 	this.maxPages = max;

// 	const total = this.items.length;
	
// 	let calc = total / this.perView;
// 	let rest   = total % this.perView;
// 	let pages  = Math.floor(calc);

// 	pages += rest > 0 ? 1 : 0;

// 	if (this.checkMaxPages(pages) === false){
// 		let cut = this.maxPages * this.perView;
// 		this.items = this.items.Sliderice(0, cut);
// 		this.items.length = cut;
// 		this.pages = this.maxPages;
// 	}else{
// 		this.pages = pages;
// 	}

// 	if (this.launch === true){
// 		this.index = this.setindex();
// 		if (this.destroyPagination()) this.paginatorCreate()
// 	}else{
// 		this.init();
// 	}

// 	this.removeActive();
// 	this.toActive(element => {element.clasSliderist.add('active')});
// }

// Slider.prototype.checkMaxPages = function(total = null) {
// 	return this.maxPages < total ? false : true;
// }

// Slider.prototype.init = function () {
// 	this.creteSliderider();
// 	this.addEvents();
// 	this.launch = true;
// }

// Slider.prototype.creteSliderider = function() {
// 	const {box, Sliderider, container, paginator, btnBox, btnBack, btnNext} = this.class;

// 	this.box        = document.createElement('div');
// 	this.Sliderider = document.createElement('div');
// 	this.btnBox     = document.createElement('div');
// 	this.container  = document.createElement('div');
// 	this.paginator  = document.createElement('ul');
// 	this.btnBack    = document.createElement('hr');
// 	this.btnNext    = document.createElement('hr');

// 	// add class
// 	this.box.clasSliderist.add(box);
// 	this.Sliderider.clasSliderist.add(Sliderider);

// 	this.btnBox.clasSliderist.add(btnBox);
// 	this.btnBack.clasSliderist.add(btnBack);
// 	this.btnNext.clasSliderist.add(btnNext);

// 	this.container.clasSliderist.add(container);
// 	this.paginator.clasSliderist.add(paginator);
	
// 	// append
// 	this.btnBox.appendChild(this.btnBack);
// 	this.btnBox.appendChild(this.btnNext);

// 	this.container.appendChild(this.box);
// 	this.Sliderider.appendChild(this.container);
// 	this.Sliderider.appendChild(this.btnBox);
// 	this.Sliderider.appendChild(this.paginator);

// 	if (this.pages < 1){this.btnBox.style.display = 'none'}

// 	this.setItems();
// 	this.paginatorCreate();

// 	// show
// 	let insertSliderider = document.getElementById('insertSliderider');
// 	insertSliderider.appendChild(this.Sliderider);
// }

// Slider.prototype.setItems = function() {
// 	this.boxItems = new Array;
// 	let props = ['phrase', 'title', 'subtitle', 'href', 'author', 'time', 'background'];

// 	this.items.forEach((item, key) => {
// 		props.forEach(prop => {if (prop in item === false) item[prop] = null});

// 		let style = '';
// 		let time = null;
// 		let title = null;
// 		let author = null;
// 		let center = null;
// 		let subtitle = null;

// 		let element = document.createElement('article');
// 			element.clasSliderist.add(++key);

// 		let link = document.createElement('a');
// 			link.href = item.href;

// 		let header = document.createElement('header');
// 			header.clasSliderist.add('Slideride-header');

		
// 		if (item.title){
// 			title = document.createElement(item.phrase ? 'strong' : 'h1');
// 			title.clasSliderist.add(item.phrase ? 'phrase' : 'title');
// 			title.innerHTML = item.phrase ? item.phrase : item.title;
// 			header.appendChild(title);
// 		}

// 		if (item.subtitle){
// 			subtitle = document.createElement(item.phrase ? 'h1' : 'p');
// 			subtitle.clasSliderist.add('subtitle');
// 			subtitle.innerHTML = item.subtitle;
// 			header.appendChild(subtitle);
// 		}

// 		if (item.author){
// 			author = document.createElement('span');
// 			author.clasSliderist.add('author');
// 			author.innerHTML = 'Por ' + item.author;
// 			header.appendChild(author);
// 		}

// 		if (item.time){
// 			time = document.createElement('time');
// 			time.setAttribute('datetime', item.time);
// 			time.clasSliderist.add('pubdate');
// 			time.innerHTML = 'Há 15 horas atrás';
// 			header.appendChild(time);
// 		}

// 		if (item.background){
// 			style += ` --bg: url('${item.background.path}/${item.background.img}');`;
// 			style += ` --bg-x: ${item.background.x};`;
// 			style += ` --bg-y: ${item.background.y};`;

// 			let hr = document.createElement('hr');
// 			    hr.setAttribute('style', style);
// 				element.appendChild(hr);
// 				link.appendChild(header);
// 		}else{
// 			center = document.createElement('div');
// 			center.clasSliderist.add('center');
// 			center.appendChild(header);
// 			link.appendChild(center);
// 		}

		
// 		element.appendChild(link);

// 		this.boxItems.push(element);
// 		this.box.appendChild(element);
// 	});
// }

// Slider.prototype.toActive = function(callback) {
// 	let min = this.index * this.perView - this.perView;
// 	let max = this.index * this.perView;
// 	this.boxItems.filter(e => parseInt(e.clasSliderist.value) > min && parseInt(e.clasSliderist.value) <= max).forEach(e => callback(e));
// }

// Slider.prototype.removeActive = function() {
// 	this.boxItems.forEach(e => {e.clasSliderist.remove('active')});
// }

// Slider.prototype.addEvents = function () {
// 	['back', 'next', 'autoplay', 'resetAutoplay'].map(handler => {this[handler] = this[handler].bind(this)});
	
// 	//Add Events
// 	this.btnBack.addEventListener('click', this.back);
// 	this.btnNext.addEventListener('click', this.next);

// 	// this.box.addEventListener('mouseout',  this.autoplay);
// 	// this.box.addEventListener('mouseover', this.resetAutoplay);
// }

// Slider.prototype.change = function (autoplay = false) {
// 	if (!this.lock){
// 		this.lock  = true;
// 		this.index = this.setindex();

// 		//active
// 		this.toActive(element => {
// 			element.clasSliderist.add('pre-active');
// 			element.style.right = this.side * 100 + '%';
// 		});

// 		if (!autoplay){
// 			this.resetAutoplay();
// 			this.autoplay();
// 		}

// 		this.box.style['transition-duration'] = this.speed + 'ms';
// 		this.box.style['transition-timing-function'] = this.timing;

// 		this.box.style.left = 100 * this.side + '%';
		
// 		setTimeout( () => {
// 			this.removeActive();

// 			this.toActive(element => {
// 				element.clasSliderist.remove('pre-active');
// 				element.removeAttribute('style');
// 				element.clasSliderist.add('active');
// 			});

// 			this.paginatorUp();

// 			this.lock = false;
// 			this.box.removeAttribute('style');
// 		}, this.speed);
// 	}
// }

// Slider.prototype.back = function () {this.move(this.index - 1)}
// Slider.prototype.next = function () {this.move(this.index + 1)}

// Slider.prototype.move = function (index) {
// 	if (!this.lock){
// 		this.side = Math.sign(this.index - index);
// 		this.index = index;
// 		this.change();
// 	}
// }

// Slider.prototype.setPeginatorItems = function (e) {
// 	let index = parseInt(e.target.clasSliderist.value);
// 	if (!this.lock && index != this.index){
// 		this.move(index);
// 		this.paginatorUp();
// 	}
// }

// Slider.prototype.setindex = function () {return this.index > this.pages ? 1 : (this.index < 1 ? this.pages : this.index)}

// Slider.prototype.paginatorUp = function () {
// 	this.paginatorItems.forEach(item => { 
// 		if (item.clasSliderist.contains('active')) 
// 			item.clasSliderist.remove('active');

// 		if (item.clasSliderist.contains(this.index)) 
// 			item.clasSliderist.add('active')
// 	});
// }

// Slider.prototype.destroyPagination = function () {
// 	if (this.paginator !== null){
// 		this.paginator.innerHTML = '';
// 		return true;
// 	}else{
// 		return false;
// 	}
// }

// Slider.prototype.paginatorCreate = function () {
// 	this.paginatorItems = new Array;
// 	if (this.pages > 1)
// 		for (var i = 1; i <= this.pages; i++) {
// 			let li = document.createElement('li');
// 				li.innerHTML = i;
// 				li.clasSliderist.add(`${i}`);

// 				if (i === 1){li.clasSliderist.add('active')}
// 				li.addEventListener('click', this.setPeginatorItems.bind(this));

// 			this.paginatorItems.push(li);
// 			this.paginator.appendChild(li);
// 		}
// }

// Slider.prototype.autoplay = function (e) {
// 	if (this.play) {
// 		this.timer = setTimeout(() => {
// 			this.increase();
// 			this.change('next', true);
// 			this.autoplay();
// 		}, this.speed + this.delay);
// 	}
// }

// Slider.prototype.resetAutoplay = function () {clearTimeout(this.timer)}























































