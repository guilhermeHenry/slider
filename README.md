# SliderShow
SliderShow

## RWD

- **DESKTOP**
![Desktop](./screenshots/desktop.png)

- **TABLET**
![Desktop](./screenshots/tablet.png)

- **MOBILE**
![Desktop](./screenshots/mobile.png)

## EXEMPLE
```javascript
new SL({
	play: false,
	speed: 500,
	target: 'body',
	timing: 'ease',
	items: e.slice(0, 14)
});
```

## Item
```javascript
e.push({
	phrase: 'Horário de verão?',
	title: 'Título: Horário de verão? Como usar hora manual no Android e corrigir erro',
	subtitle: 'Seguindo um decreto do Governo Federal, o Brasil não terá horário de verão em 2019',
	href: 'Endereço do artigo completo',
	author: 'Nome do autor: Rodrigo Fernandes',
	time: 'Data de publicação: 20/10/2019 ás 07h00',
	background: {path: '../../help/img', img: 'marvel.jpg', y: 'center', x: 'left'}
});
```

## Referências
[SimpleSlider](https://github.com/michu2k/SimpleSlider)  
[SlidesJS-3](https://github.com/nathansearles/Slides/tree/SlidesJS-3)