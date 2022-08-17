const screensaver = document.getElementById('screensaver');
const icon = document.getElementById('screensaver-icon');

const speed = 2;
const pallete = [
	'#db0032',
	'#f4436c',
	'#ff8672',
	'#ff8300',
	'#ffc600',
	'#ffd720',
	'#93d500',
	'#4a9462',
	'#006098',
	'#dcc7b7',
	'#ddb5c8',
	'#752e4a',
];

let shouldShow = false;
let lastInteraction = new Date();
let prevColorChoiceIndex = 0;
let x = 40;
let y = 10;
let dirX = 1;
let dirY = 1;

const fn = {
	init: () => {
		fn.setup();
		window.requestAnimationFrame(fn.animate);
	},

	setup: () => {
		icon.style.color = 'black';

		window.addEventListener('mousemove', fn.updateLastInteraction);
		window.addEventListener('scroll', fn.updateLastInteraction);
		window.addEventListener('keydown', fn.updateLastInteraction);
		window.addEventListener('click', fn.updateLastInteraction);
		window.addEventListener('touchstart', fn.updateLastInteraction);
	},

	updateLastInteraction: () => {
		lastInteraction = new Date();
	},

	getRandomColor: () => {
		const currentPallete = [...pallete];
		currentPallete.splice(prevColorChoiceIndex, 1);

		const colorChoiceIndex = Math.floor(Math.random() * currentPallete.length);

		prevColorChoiceIndex = colorChoiceIndex < prevColorChoiceIndex ? colorChoiceIndex : colorChoiceIndex + 1;

		const colorChoice = currentPallete[colorChoiceIndex];

		return colorChoice;
	},

	animate: () => {
		const dvdWidth = icon.clientWidth;
		const dvdHeight = icon.clientHeight;

		const screenHeight = screensaver.offsetHeight;
		const screenWidth = screensaver.offsetWidth;

		const secondsSinceInteraction = (new Date().getTime() - lastInteraction.getTime()) / 1000;

		shouldShow = secondsSinceInteraction >= 20;

		if (shouldShow) {
			document.documentElement.classList.add('has-active-screensaver');
		} else {
			document.documentElement.classList.remove('has-active-screensaver');
		}

		if (shouldShow) {
			if (y + dvdHeight >= screenHeight || y < 0) {
				dirY *= -1;
				screensaver.style.backgroundColor = fn.getRandomColor();
				icon.style.color = 'white';
			}

			if (x + dvdWidth >= screenWidth || x < 0) {
				dirX *= -1;
				screensaver.style.backgroundColor = fn.getRandomColor();
				icon.style.color = 'white';
			}

			x += dirX * speed;
			y += dirY * speed;

			icon.style.left = x + 'px';
			icon.style.top = y + 'px';
		}

		window.requestAnimationFrame(fn.animate);
	},
}

fn.init();
