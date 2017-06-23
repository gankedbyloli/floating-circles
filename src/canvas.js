// Initial Setup
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Variables
let mouse = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2 
};

const maxRadius = 40;
const responseDistance = 120;

// Event Listeners
addEventListener("mousemove", function (event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function () {
	canvas.width = window.innerWidth;	
	canvas.height = window.innerHeight;

	init();
});


// Utility Functions
function randomIntFromRange (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomSign () {
	return Math.floor(Math.random() * 2) === 0 ? 1 : -1;
}

function randomColor (colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Circle(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = color;

	this.update = function () {

		// interactivity
		if (mouse.x - this.x < responseDistance && mouse.x - this.x > -responseDistance
			&& mouse.y - this.y < responseDistance && mouse.y - this.y > -responseDistance) {
			if (this.radius < maxRadius) {
				this.radius += 1;
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
		
		this.draw();
	};

	this.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	};
}


// Implementation
const colors = [
	'#FF6138',
	'#FFFF9D',
	'#BEEB9F',
	'#79BD8F',
	'#00A388'
];

let circleArray = [];

function init () {
	circleArray = [];
	for (var i = 0; i < 800; i++) {
		var radius = randomIntFromRange(1, 5);
		var x = randomIntFromRange(radius, canvasWidth - radius);
		var y = randomIntFromRange(radius, canvasHeight - radius);
		var dx = Math.random() * randomSign();
		var dy = Math.random() * randomSign();
		var color = randomColor(colors);
		circleArray.push(new Circle(x, y, dx, dy, radius, color));	
	}
}

// Animation Loop
function animate() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
	window.requestAnimationFrame(animate);
}

init();
animate();