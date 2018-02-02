//general
var canvas = document.getElementById('canvas'),
    ctx;
    center = new Point(),
    r = 0,
    newScrollTop = 0;

var circles = [];
var circleSize = 120; // the space between dots, roughly, in pixels
var dotOpacity = 0.5;

// speed of orbit, if dotSpeedX = dotSpeedY you get a perfect circle
//   larger number = slower orbit
var dotSpeedX = 460,
    dotSpeedY = 460;

var placeRfactor = .8; // amount of randomization to original dot placement
var sizeRfactor = .9; // amount of randomization to original dot placement

var DAMPING = .93;

var cId = 0;

function initCanvas() {
			canvas.w = canvas.width = window.innerWidth;
			canvas.h = canvas.height = window.innerHeight;

			center.x = canvas.w / 2;
			center.y = canvas.h / 2; 

			ctx = canvas.getContext('2d');

			ctx.fillStyle = 'rgba(255,255,255,0.2)';
}

function createCircleArray(dotSize, speed, circSizeFactor) {
		var halfCircle = circleSize/2;
		for (var x = halfCircle; x < canvas.w-halfCircle; x += circleSize) {
				for (var y = halfCircle; y < canvas.h-halfCircle; y += circleSize) { 
						 var randX = Math.abs( getRandomInt((x - x*placeRfactor), (x + x*placeRfactor)) ),
								 randY = Math.abs( getRandomInt((y - y*placeRfactor), (y + y*placeRfactor)) );
								if(randX > canvas.w){ randX -= (randX-canvas.w)*2; }
								if(randY > canvas.h){ randY -= (randY-canvas.h)*2; }
						 var startAngle = (randX + randY) / 2.5;
						 var randRadius = getRandomArbitrary((dotSize*(1-sizeRfactor)), (dotSize*(1+sizeRfactor)));
						 var circle = new Circle(randX, randY, randRadius, speed, startAngle, circSizeFactor, cId);
						 circles.push(circle);
					cId++;
				}
		}
}

window.requestAnimFrame = (function(){ 
return  window.requestAnimationFrame   ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();

window.onload = function() {
     initCanvas();
		// 	dotSize, speed, circSizeFactor
     // createCircleArray(.4, .3, .3);
     // createCircleArray(.4, .4, .2);
     createCircleArray(.8, .8, .4);
     requestAnimFrame(loop);    
};

function draw() {
     ctx.clearRect(0, 0, canvas.w, canvas.h);

     circles.forEach(function(o) {
			 		o.draw();
     });
}

function update() {
     var o;
 
     for (var i = 0; i < circles.length; i++) {
          o = circles[i];
          o.update();
     }
     
}

function loop() {
     update();
     draw();
     requestAnimFrame(loop);
}

function calcDistance(dx,dy) {
	return Math.sqrt(dx * dx + dy * dy);
}

function Circle(x, y, dotSize, speed, angle, circSizeFactor, cId) {
			
			this.cId = cId;

			// dot placement	
			this.dotPosition = new Point(x, y);
			this.pathSize = circSizeFactor*circleSize || .8*circleSize;
			this.sizeFactor = circSizeFactor || 1;
			this.oldX = this.centerX = this.originalX = x;
			this.permY = this.storeY = this.centerY = this.oldY = this.originalY = y || 0;

			//dot style
			this.ogDotOpacity = this.dotOpacity = dotOpacity;
			this.centerColor= 'rgba(255,0,255,1)';

			// dot motion
			this.angle = angle || 0;
			this.speed = speed || 2;
			this.originalDotRadius = this.dotRadius = dotSize || .5;
			this.responseTime = getRandomArbitrary(50, canvas.w * (1-circSizeFactor));
			
			// tracking vars
			this.xloop1 = this.scrollTop = this.traveling = this.outSide = this.outVert = 0;
			
}

Circle.prototype = {
    update:function() {
          this.angle += this.speed;	
			 	
			 	if(this.traveling) {
					
					// dist of current center from canvas center
					var dx = center.x - this.centerX;
					var dy = center.y - this.centerY;
					var distance = calcDistance(dx, dy);
					
					// dist of current center from saved center
					var dotDist = calcDistance((this.originalX - this.centerX), (this.storeY - this.centerY));

					
					// var bounceFactor = 8*((dotDist+(canvas.w*.003))/(center.x+(canvas.w*.003)));
					var bounceFactor = 10*((dotDist+((canvas.w+canvas.h)*.03))/(center.x+center.y+((canvas.w+canvas.h)*.03)));
					
					this.centerX -= (dx / distance)*bounceFactor  || 0;
					this.centerY -= (dy / distance)*bounceFactor || 0;
					
					//distance of saved center from canvas center
					var cDist = calcDistance((center.x - this.originalX), (center.y - this.storeY));
					
					if(this.xloop){
						this.centerColor= 'rgba(255,255,0,1)';
						
						var closeness = dotDist/cDist;
						
						this.dotRadius = this.originalDotRadius * (1-closeness);
						
						
						if( Math.abs(this.centerX-center.x) > Math.abs(this.originalX-center.x) ){
							this.dotRadius = this.originalDotRadius;
							this.traveling = this.xloop = 0;
							this.centerX = this.oldX = this.originalX;
							this.centerY = this.oldY = this.storeY;
							this.scrollTop = (newScrollTop*this.sizeFactor)-(this.permY-this.storeY);
							
							this.scrollTop = this.scrollTop % canvas.h;
							// console.log(this.scrollTop+'-'+canvas.h);
							
							this.tdone = 1;
							
							this.centerColor= 'rgba(0,255,0,1)';
						}
						
					}else{
						// handle the growing dot gradient
						var farness = dotDist/center.y;
						this.dotRadius = this.originalDotRadius + ( (30*this.originalDotRadius) * (farness) );
						
						this.dotOpacity = this.ogDotOpacity * (1-farness);
				
						// flip dot to center if it gets too big
						if(dotDist > center.y){
							this.travelDotToCenter();
						}
					}
								
					//  INTEGRATE
				
					var velocityX = (this.centerX - this.oldX) * DAMPING;
					this.centerX += velocityX;
					
					var velocityY = (this.centerY - this.oldY) * DAMPING;
					this.centerY += velocityY;
				
					if(!this.xloop){
						if(this.centerX > canvas.w || this.centerX < 0){
							this.outSide = 1;
						}
						if(this.centerY > canvas.h || this.centerY < 0){
							this.outVert = 1;
						}
						var isout = this.outSide + this.outVert;
						if( isout > 0){
							isout = 0;
							this.travelDotToCenter();

						}
					}
				
		 			this.oldX = this.centerX;
		 			this.oldY = this.centerY;
					
				}		
		 
		 		if(!this.traveling){		
					
					// 	ATTRACT
					var dx = this.responseTime;						
					var dy = this.originalY - this.centerY - ((newScrollTop*this.sizeFactor)-this.scrollTop);
					// sizeFactor creates parallax 
					
					if(this.tdone){	// checks if we just wrapped up the traveling animation
						this.tdone = 0;

						if( Math.abs(dy) > 0){
							// if at the end of the traveling animation, the dot is in a different location than when it started, overwrite the old location with the new to prevent scroll animation
							this.originalY = 0 + ((newScrollTop*this.sizeFactor)-this.scrollTop) + this.centerY
						}

					}
					
					var distance = calcDistance(dx, dy);
					this.centerY += dy / distance;

					//  INTEGRATE
					var velocityY = (this.centerY - this.oldY) * DAMPING;
					this.storeY = this.oldY = this.centerY;

					this.centerY += velocityY;
				}
		 		
				if(this.centerY < 0){
					this.centerY += canvas.h;
					this.storeY += canvas.h;
					this.oldY += canvas.h;
					this.originalY += canvas.h;
				}	
				if(this.centerY > canvas.h){
					this.centerY -= canvas.h;
					this.storeY -= canvas.h;
					this.oldY -= canvas.h;
					this.originalY -= canvas.h;
				}	
				
				var circRad = (this.pathSize - this.dotRadius*4);
				this.dotPosition.x = circRad * Math.cos(this.angle * Math.PI / dotSpeedX) + this.centerX;
				this.dotPosition.y = circRad * Math.sin(this.angle * Math.PI / dotSpeedY) + this.centerY;	 
			 
    },
		draw:function() {

				ctx.fillStyle = 'rgba(0,0,0,'+ this.dotOpacity +')';

			
				if(this.traveling && !this.xloop){
						// Create gradient
					var grd = 
							ctx.createRadialGradient(
								this.dotPosition.x, this.dotPosition.y, this.originalDotRadius * 2, 
								this.dotPosition.x, this.dotPosition.y, this.dotRadius * 2
							);

					// Add colors
					grd.addColorStop(0, 'rgba(255,255,255,'+ this.dotOpacity +')');
					grd.addColorStop(0.8, 'rgba(255, 255, 255, 0)');

					// Fill with gradient
					ctx.fillStyle = grd;
					// ctx.fillRect(0, 0, 300.000, 300.000);
				}
			
				fillCircle(this.dotPosition.x, this.dotPosition.y, this.dotRadius * 2);
		},
		travelDotToCenter:function() {
			this.centerColor= 'rgba(0,0,255,1)';
			if(this.originalX > canvas.w){
				this.centerColor= 'rgba(0,255,255,1)';
			}
			this.centerY = ((this.storeY - center.y)*.1)+center.y;
			this.centerX = ((this.originalX - center.x)*.1) + center.x;
			this.xloop = 1;
			this.outSide = this.outVert = 0;
			this.dotRadius = 0;
			this.dotOpacity = this.ogDotOpacity;
		}
};

function Point(x, y) {
     this.x = x || null;
     this.y = y || null;
}

function fillCircle(x, y, r) {
     ctx.beginPath();
     ctx.arc(x, y, r, 0, Math.PI * 2);
     ctx.fill();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function onScroll(e) {
	newScrollTop = window.pageYOffset || document.documentElement.scrollTop;
}

function travel(e) {
	for (var i = 0; i < circles.length; i++) {
				circles[i].traveling = 1;
	 }
	console.log('!!!');
}

document.addEventListener('scroll', onScroll);
// document.addEventListener('click', travel);