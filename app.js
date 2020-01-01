import BP from './node_modules/callpoint/app.js';
import config from './node_modules/config/app.js';

let SL = function (conf = null) {
	this.pages    = null;
	this.maxPages = 8;
	this.perView  = null;

	this.index = 1;
	this.side  = null;
	this.lock  = false;

	this.box            = null;
	this.boxItems       = null;
	this.slider         = null;
	this.container      = null;
	this.paginator      = null;
	this.paginatorItems = null
	this.btnBack        = null;
	this.btnNext        = null;

	this.class  = {
		box: 'slider-box',
		slider: 'slider',
		btnBox: 'arrows',
		container: 'slider-container',
		paginator: 'slider-paginator',
		btnBack: 'arrow-left',
		btnNext: 'arrow-right',
	}

	this.items = null;
	this.launch = false;
	this.itemsLength = null;

	this.config = new config(conf);
	this.config.add('items');
	this.config.add('target', function (target) {
		if (!document.getElementById(target)) {
			this.msg.push('msg')
		}
	});
	this.config.add('play', false);
	this.config.add('delay', 0); // ms
	this.config.add('speed', {min: 100, max: 3500}, true); // ms
	this.config.add('timing', Array('linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'));
	
	if (this.config.msg.length > 1){
		this.config.msg.forEach(msg => console.log(msg));
	} else {
		for (let name in this.config.conf){this[name] = this.config.conf[name]}
		new BP(
			[200, this.setPages.bind(this, 1, 4)],
			[2000, this.setPages.bind(this, 3, 10)]
		);
	}
}

// view > visualização por página
// max  > Limite de páginas
SL.prototype.setPages = function(view, max) {
	this.perView = view;
	this.maxPages = max;

	const total = this.items.length;
	
	let calc = total / this.perView;
	let rest   = total % this.perView;
	let pages  = Math.floor(calc);

	pages += rest > 0 ? 1 : 0;

	if (this.checkMaxPages(pages) === false){
		let cut = this.maxPages * this.perView;
		this.items = this.items.slice(0, cut);
		this.items.length = cut;
		this.pages = this.maxPages;
	}else{
		this.pages = pages;
	}

	if (this.launch === true){
		this.index = this.setindex();
		if (this.destroyPagination()) this.paginatorCreate()
	}else{
		this.init();
	}

	this.removeActive();
	this.toActive(element => {element.classList.add('active')});
}

SL.prototype.checkMaxPages = function(total = null) {
	return this.maxPages < total ? false : true;
}

SL.prototype.init = function () {
	this.creteSlider();
	this.addEvents();
	this.launch = true;
}

SL.prototype.creteSlider = function() {
	const {box, slider, container, paginator, btnBox, btnBack, btnNext} = this.class;

	this.box       = document.createElement('div');
	this.slider    = document.createElement('div');
	this.btnBox    = document.createElement('div');
	this.container = document.createElement('div');
	this.paginator = document.createElement('ul');
	this.btnBack   = document.createElement('hr');
	this.btnNext   = document.createElement('hr');

	// add class
	this.box.classList.add(box);
	this.slider.classList.add(slider);

	this.btnBox.classList.add(btnBox);
	this.btnBack.classList.add(btnBack);
	this.btnNext.classList.add(btnNext);

	this.container.classList.add(container);
	this.paginator.classList.add(paginator);
	
	// append
	this.btnBox.appendChild(this.btnBack);
	this.btnBox.appendChild(this.btnNext);

	this.container.appendChild(this.box);
	this.slider.appendChild(this.container);
	this.slider.appendChild(this.btnBox);
	this.slider.appendChild(this.paginator);

	if (this.pages < 1){this.btnBox.style.display = 'none'}

	this.setItems();
	this.paginatorCreate();

	// show
	let insertSlider = document.getElementById('insertSlider');
	insertSlider.appendChild(this.slider);
}

SL.prototype.setItems = function() {
	this.boxItems = new Array;
	let props = ['phrase', 'title', 'subtitle', 'href', 'author', 'time', 'background'];

	this.items.forEach((item, key) => {
		props.forEach(prop => {if (prop in item === false) item[prop] = null});

		let style = '';
		let time = null;
		let title = null;
		let author = null;
		let center = null;
		let subtitle = null;

		let element = document.createElement('article');
			element.classList.add(++key);

		let link = document.createElement('a');
			link.href = item.href;

		let header = document.createElement('header');
			header.classList.add('slide-header');

		
		if (item.title){
			title = document.createElement(item.phrase ? 'strong' : 'h1');
			title.classList.add(item.phrase ? 'phrase' : 'title');
			title.innerHTML = item.phrase ? item.phrase : item.title;
			header.appendChild(title);
		}

		if (item.subtitle){
			subtitle = document.createElement(item.phrase ? 'h1' : 'p');
			subtitle.classList.add('subtitle');
			subtitle.innerHTML = item.subtitle;
			header.appendChild(subtitle);
		}

		if (item.author){
			author = document.createElement('span');
			author.classList.add('author');
			author.innerHTML = 'Por ' + item.author;
			header.appendChild(author);
		}

		if (item.time){
			time = document.createElement('time');
			time.setAttribute('datetime', item.time);
			time.classList.add('pubdate');
			time.innerHTML = 'Há 15 horas atrás';
			header.appendChild(time);
		}

		if (item.background){
			style += ` --bg: url('${item.background.path}/${item.background.img}');`;
			style += ` --bg-x: ${item.background.x};`;
			style += ` --bg-y: ${item.background.y};`;

			let hr = document.createElement('hr');
			    hr.setAttribute('style', style);
				element.appendChild(hr);
				link.appendChild(header);
		}else{
			center = document.createElement('div');
			center.classList.add('center');
			center.appendChild(header);
			link.appendChild(center);
		}

		
		element.appendChild(link);

		this.boxItems.push(element);
		this.box.appendChild(element);
	});
}

SL.prototype.toActive = function(callback) {
	let min = this.index * this.perView - this.perView;
	let max = this.index * this.perView;
	this.boxItems.filter(e => parseInt(e.classList.value) > min && parseInt(e.classList.value) <= max).forEach(e => callback(e));
}

SL.prototype.removeActive = function() {
	this.boxItems.forEach(e => {e.classList.remove('active')});
}

SL.prototype.addEvents = function () {
	['back', 'next', 'autoplay', 'resetAutoplay'].map(handler => {this[handler] = this[handler].bind(this)});
	
	//Add Events
	this.btnBack.addEventListener('click', this.back);
	this.btnNext.addEventListener('click', this.next);

	// this.box.addEventListener('mouseout',  this.autoplay);
	// this.box.addEventListener('mouseover', this.resetAutoplay);
}

SL.prototype.change = function (autoplay = false) {
	if (!this.lock){
		this.lock  = true;
		this.index = this.setindex();

		//active
		this.toActive(element => {
			element.classList.add('pre-active');
			element.style.right = this.side * 100 + '%';
		});

		if (!autoplay){
			this.resetAutoplay();
			this.autoplay();
		}

		this.box.style['transition-duration'] = this.speed + 'ms';
		this.box.style['transition-timing-function'] = this.timing;

		this.box.style.left = 100 * this.side + '%';
		
		setTimeout( () => {
			this.removeActive();

			this.toActive(element => {
				element.classList.remove('pre-active');
				element.removeAttribute('style');
				element.classList.add('active');
			});

			this.paginatorUp();

			this.lock = false;
			this.box.removeAttribute('style');
		}, this.speed);
	}
}

SL.prototype.back = function () {this.move(this.index - 1)}
SL.prototype.next = function () {this.move(this.index + 1)}

SL.prototype.move = function (index) {
	if (!this.lock){
		this.side = Math.sign(this.index - index);
		this.index = index;
		this.change();
	}
}

SL.prototype.setPeginatorItems = function (e) {
	let index = parseInt(e.target.classList.value);
	if (!this.lock && index != this.index){
		this.move(index);
		this.paginatorUp();
	}
}

SL.prototype.setindex = function () {return this.index > this.pages ? 1 : (this.index < 1 ? this.pages : this.index)}

SL.prototype.paginatorUp = function () {
	this.paginatorItems.forEach(item => { 
		if (item.classList.contains('active')) 
			item.classList.remove('active');

		if (item.classList.contains(this.index)) 
			item.classList.add('active')
	});
}

SL.prototype.destroyPagination = function () {
	if (this.paginator !== null){
		this.paginator.innerHTML = '';
		return true;
	}else{
		return false;
	}
}

SL.prototype.paginatorCreate = function () {
	this.paginatorItems = new Array;
	if (this.pages > 1)
		for (var i = 1; i <= this.pages; i++) {
			let li = document.createElement('li');
				li.innerHTML = i;
				li.classList.add(`${i}`);

				if (i === 1){li.classList.add('active')}
				li.addEventListener('click', this.setPeginatorItems.bind(this));

			this.paginatorItems.push(li);
			this.paginator.appendChild(li);
		}
}

SL.prototype.autoplay = function (e) {
	if (this.play) {
		this.timer = setTimeout(() => {
			this.increase();
			this.change('next', true);
			this.autoplay();
		}, this.speed + this.delay);
	}
}

SL.prototype.resetAutoplay = function () {clearTimeout(this.timer)}



let e = new Array;

	e.push({
		phrase: 'Horário de verão?',
		title: 'Horário de verão? Como usar hora manual no Android e corrigir erro',
		subtitle: 'Seguindo um decreto do Governo Federal, o Brasil não terá horário de verão em 2019',
		href: 'https://www.techtudo.com.br/dicas-e-tutoriais/2019/10/horario-de-verao-como-usar-hora-manual-no-android-e-corrigir-erro.ghtml',
		author: 'Rodrigo Fernandes',
		time: '20/10/2019 ás 07h00',
		background: {path: '../../help/img', img: 'marvel.jpg', y: 'center', x: 'left'}
	});

	e.push({
		// phrase: 'Horário de verão?',
		title: 'Horário de verão? Como usar hora manual no Android e corrigir erro',
		subtitle: 'Seguindo um decreto do Governo Federal, o Brasil não terá horário de verão em 2019',
		href: 'https://www.techtudo.com.br/dicas-e-tutoriais/2019/10/horario-de-verao-como-usar-hora-manual-no-android-e-corrigir-erro.ghtml',
		author: 'Rodrigo Fernandes',
		time: '20/10/2019 ás 07h00',
		background: {path: '../../help/img', img: 'marvel.jpg', y: 'center', x: 'left'}
	});

	e.push({
		phrase: 'Horário de verão?',
		title: 'Horário de verão? Como usar hora manual no Android e corrigir erro',
		subtitle: 'Seguindo um decreto do Governo Federal, o Brasil não terá horário de verão em 2019',
		href: 'https://www.techtudo.com.br/dicas-e-tutoriais/2019/10/horario-de-verao-como-usar-hora-manual-no-android-e-corrigir-erro.ghtml',
		author: 'Rodrigo Fernandes',
		time: '20/10/2019 ás 07h00'
	});

	e.push({
		title: 'Horário de verão? Como usar hora manual no Android e corrigir erro',
		subtitle: 'Seguindo um decreto do Governo Federal, o Brasil não terá horário de verão em 2019',
		href: 'https://www.techtudo.com.br/dicas-e-tutoriais/2019/10/horario-de-verao-como-usar-hora-manual-no-android-e-corrigir-erro.ghtml',
		author: 'Rodrigo Fernandes',
		time: '20/10/2019 ás 07h00'
	});

	e.push({
		title: 'Horário de verão? Como usar hora manual no Android e corrigir erro',
		subtitle: 'Seguindo um decreto do Governo Federal, o Brasil não terá horário de verão em 2019',
		href: 'https://www.techtudo.com.br/dicas-e-tutoriais/2019/10/horario-de-verao-como-usar-hora-manual-no-android-e-corrigir-erro.ghtml',
		author: 'Rodrigo Fernandes',
		time: '20/10/2019 ás 07h00'
	});

	e.push({
		// phrase: 'Horário de verão?',
		title: 'Horário de verão? Como usar hora manual no Android e corrigir erro',
		subtitle: 'Seguindo um decreto do Governo Federal, o Brasil não terá horário de verão em 2019',
		href: 'https://www.techtudo.com.br/dicas-e-tutoriais/2019/10/horario-de-verao-como-usar-hora-manual-no-android-e-corrigir-erro.ghtml',
		author: 'Rodrigo Fernandes',
		time: '20/10/2019 ás 07h00',
		background: {path: '../../help/img', img: 'marvel.jpg', y: 'center', x: 'left'}
	});

	e.push({
		// phrase: 'Horário de verão?',
		title: 'Horário de verão? Como usar hora manual no Android e corrigir erro',
		subtitle: 'Seguindo um decreto do Governo Federal, o Brasil não terá horário de verão em 2019',
		href: 'https://www.techtudo.com.br/dicas-e-tutoriais/2019/10/horario-de-verao-como-usar-hora-manual-no-android-e-corrigir-erro.ghtml',
		author: 'Rodrigo Fernandes',
		time: '20/10/2019 ás 07h00',
		background: {path: '../../help/img', img: 'marvel.jpg', y: 'center', x: 'left'}
	});

	e.push({
		// phrase: 'Horário de verão?',
		title: 'Horário de verão? Como usar hora manual no Android e corrigir erro',
		subtitle: 'Seguindo um decreto do Governo Federal, o Brasil não terá horário de verão em 2019',
		href: 'https://www.techtudo.com.br/dicas-e-tutoriais/2019/10/horario-de-verao-como-usar-hora-manual-no-android-e-corrigir-erro.ghtml',
		author: 'Rodrigo Fernandes',
		time: '20/10/2019 ás 07h00'
	});

	e.push({
		title: 'Horário de verão? Como usar hora manual no Android e corrigir erro',
		subtitle: 'Seguindo um decreto do Governo Federal, o Brasil não terá horário de verão em 2019',
		href: 'https://www.techtudo.com.br/dicas-e-tutoriais/2019/10/horario-de-verao-como-usar-hora-manual-no-android-e-corrigir-erro.ghtml',
		author: 'Rodrigo Fernandes',
		time: '20/10/2019 ás 07h00'
	});

	e.push({
		title: 'Horário de verão? Como usar hora manual no Android e corrigir erro',
		subtitle: 'Seguindo um decreto do Governo Federal, o Brasil não terá horário de verão em 2019',
		href: 'https://www.techtudo.com.br/dicas-e-tutoriais/2019/10/horario-de-verao-como-usar-hora-manual-no-android-e-corrigir-erro.ghtml',
		author: 'Rodrigo Fernandes',
		time: '20/10/2019 ás 07h00'
	});
	

	new SL({
		play: false,
		speed: 500,
		target: 'insertSlider1',
		timing: 'ease',
		items: e.slice(0, 14)
	})




























































