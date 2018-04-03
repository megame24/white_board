
// canvas stuff
var canvas = document.getElementById('white-board');
var ctx = canvas.getContext('2d');

var mouseDown = false;

// check if pen or eraser is selected
var control = document.querySelector('input[name="control"]:checked').value;

// controls font-size
var fontInput = document.getElementById('font');

// sets start point for drawing / erasing
canvas.addEventListener('mousedown', function(event) {
	mouseDown = true;
	ctx.lineWidth = fontInput.value;
	var x = event.clientX - 10;
	var y = event.clientY - 10;
	if(control === 'pen') {
		ctx.beginPath();
		ctx.moveTo(x, y);
	}
});

// calls draw / erase once
canvas.addEventListener('click', function(event) {
	if(control === 'pen') {
		ctx.fillRect(event.clientX - 10, event.clientY - 10, 3, 3);
	} else {
		ctx.clearRect(event.clientX - 20, event.clientY - 20, 50, 50);
	}
});

// stop drawing / erasing on mouseup
canvas.addEventListener('mouseup', function(event) {
	mouseDown = false;
});

// re-evaluate control
function switchControl(id) {
	document.getElementById(id).addEventListener('change', function(event) {
		control = document.querySelector('input[name="control"]:checked').value;
	});
}

switchControl('eraser');
switchControl('pen');

// draw / erase
canvas.addEventListener('mousemove', function(event) {
	if(control === 'eraser') {
		clear(event);
	} else {
		draw(event);
	}
});

// draw on board
function draw(event) {
	if(mouseDown) {
		ctx.lineTo(event.clientX - 10, event.clientY - 10);
		ctx.stroke();
	}
}

// erase drawing
function clear(event) {
	if(mouseDown) {
		ctx.clearRect(event.clientX - 20, event.clientY - 20, 50, 50);
	}
}

canvas.addEventListener('mouseout', function(event) {
	mouseDown = false;
});
