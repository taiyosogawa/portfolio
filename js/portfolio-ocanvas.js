(function() {
    var canvas = document.getElementById('canvas'),
            context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})();






oCanvas.domReady(function () {
	
	var canvas = oCanvas.create({
		canvas: '#canvas',
		fps: 60
	});

	var rootNode = canvas.display.ellipse({
		x: canvas.width/2,
		y: canvas.height/2,
		radius: 70,
		fill: 'hsl(' + Math.random() * 360 + ',50%, 50%)',
		stroke: '2px #333'
	}).dragAndDrop();

	canvas.addChild(rootNode);
	console.log(rootNode);
	circles = [];

	for (i = 0; i < 8; i ++) {
		createCircle();
	}

	/*
	 *		Create text labels
	 */

	var designText = canvas.display.text({
		x: 20,
		y: 20,
		origin: {x: 0, y: 0},
		font: 'bold 30px sans-serif',
		text: 'Design',
		fill: '#555'
	});

	canvas.addChild(designText);

	var engineeringText = canvas.display.text({
		x: canvas.width - 200,
		y: 20,
		origin: {x: 0, y: 0},
		font: 'bold 30px sans-serif',
		text: 'Engineering',
		fill: '#555'
	});

	canvas.addChild(engineeringText);

	var communityText= canvas.display.text({
		x: 20,
		y: canvas.height - 50,
		origin: {x: 0, y: 0},
		font: 'bold 30px sans-serif',
		text: 'Community',
		fill: '#555'
	});

	canvas.addChild(communityText);

	var sketchingText = canvas.display.text({
		x: canvas.width - 170,
		y: canvas.height - 50,
		origin: {x: 0, y: 0},
		font: 'bold 30px sans-serif',
		text: 'Sketching',
		fill: '#555'
	});

	canvas.addChild(sketchingText);





	/*
	 *    	Handle Timeline
	 */
	canvas.setLoop(function () {
		var time = new Date();
		//rootNode.move(0, Math.sin(time.getMilliseconds() * Math.PI / 500));
		for (i = 0; i < circles.length; i ++) {
			circles[i].move((rootNode.x - circles[i].x) / 25, (rootNode.y - circles[i].y) / 25);
		}

	})

	canvas.timeline.start();




	
/*
	rectangle.bind("click tap mouseenter", function () {
	this.fill = "#0f0";
	canvas.redraw();

	this.animate({
		rotation: this.rotation + 360
	}, {
		duration: "long",
		easing: "ease-in-out-cubic",
		callback: function () {
			this.fill = "#f00";
			canvas.redraw();
		}
	}).dragAndDrop();

});

*/

	function createCircle() {
		circles.push(canvas.display.ellipse({
			x: rootNode.x,
			y: rootNode.y,
			origin: {x: 180, y: 0},
			rotation: 360/8 * i,
			radius: 40,
			fill: 'hsl(' + Math.random() * 360 + ',50%, 50%)',
			stroke: '2px #333'
		}));
		canvas.addChild(circles[i]);
	}

});


