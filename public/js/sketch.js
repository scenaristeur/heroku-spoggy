
function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	slider = createSlider(40, 220, 70);
	slider.position(10, 10);
	slider.style('width', width/2+'px');

	slider2 = createSlider(990, 1050, 1000);
	slider2.position(10, 40);
	slider2.style('width', width/2+'px');

  	socket.on('update', function (data) {
		console.log(data);
	});
}

function draw() {

	background(255,255,0);



	}
