const slider  = require('./slider');
const sliderElements = document.getElementsByClassName('slider');

for (var i = sliderElements.length - 1; i >= 0; i--) {
	slider(sliderElements[i]);
}





