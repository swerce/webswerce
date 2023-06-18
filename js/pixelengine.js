var maintext = "This is a text animation with pixelated texture. It uses Image Data from canvas. The image data on the canvas allows us to manipulate and change the pixels.";


		"use strict"
		var stage = {
			w:1280,
			h:400
		}

		var _pexcanvas = document.getElementById("canvas");
		_pexcanvas.width = stage.w;
		_pexcanvas.height = stage.h;
		var ctx = _pexcanvas.getContext("2d");




		var pointer = {
			x:0,
			y:0
		}

		var scale = 1;
		var portrait = true;
		var loffset = 0;
		var toffset = 0;
		var mxpos = 0;
		var mypos = 0;


// ------------------------------------------------------------------------------- Gamy

var colors = ['#1abc9c','#1abc9c','#3498db','#9b59b6','#34495e','#16a085','#27ae60','#2980b9','#8e44ad','#2c3e50','#f1c40f','#e67e22','#e74c3c','#95a5a6','#f39c12','#d35400','#c0392b','#bdc3c7','#7f8c8d'];


var colors = ['#dd00a7','#c20192','#de47ba','#e319b8'];

function gcol(x, y, width) {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

var ga =0;

ctx.fillStyle='#00ff00';
ctx.font = "bold 20px 'consolas'";
ctx.textAlign = "left"; 
ctx.textBaseline = "top"; 
ctx.fillText(maintext,20,0);
var img = ctx.getImageData(0,0,1280,20);
console.log(img.data.length);

var tm=0;
var delta=0;


function enginestep() {
	ctx.clearRect(0,0,stage.w,stage.h);
	ga += 0.01;
	for (var r=0;r<64;r++) {
		for (var c=0;c<20;c++) {
			var myx = r*20+1;
			var myy = c*20+1;
			ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
			ctx.fillRect(myx,myy,20,20);
			// ctx.strokeStyle = colors[Math.floor(Math.random()*colors.length)];
			// ctx.lineWidth = 3;
			// ctx.beginPath();
			// ctx.moveTo(myx+19+Math.sin(ga)*28,myy+19+Math.cos(ga)*28);
			// ctx.lineTo(myx+19-Math.sin(ga)*28,myy+19-Math.cos(ga)*28);
			// ctx.stroke();
		}
	}

	tm++;
	if (tm>0) {
		tm=0;
		delta++;
		if (delta>img.width-32) {
			delta=0;
		}
	}
	for (var w=0;w<64;w++) {
		for (var h=0;h<img.height;h++) {
			var mycol = gcol(w+delta,h,img.width);
			var alpha = img.data[mycol[3]]/255;
			if (alpha>0) {
			ctx.fillStyle = "rgba("+img.data[mycol[0]]+","+img.data[mycol[1]]+","+img.data[mycol[2]]+","+alpha+")";
			var mred = (Math.random()*64)+191;
			var mgre = (Math.random()*64)+191;
			var mblu = (Math.random()*64)+191;
			ctx.fillStyle = "rgba("+mred+","+mgre+","+mblu+","+alpha+")";
			ctx.fillRect(w*20,h*20,20,20);
			} else {

			}
		}
	}

	// ctx.putImageData(img,0,700);
	// var data = ctx.getImageData(0,0,200,200);

	// for (var i=0;i<2;i++)  {
	// 	for (var b=0;b<2;b++)  {
	// 		if (i==0&&b==0) {
	// 		} else {
	// 			ctx.putImageData(data,i*200,b*200);
	// 		}
	// 	}
	// }

}


// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events

function toggleFullScreen() {
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);

	}
	else {
		cancelFullScreen.call(doc);

	}
}


var ox = 0;
var oy = 0;
function mousestart(e) {
	mxpos = (e.pageX-loffset)*scale;
	mypos = (e.pageY-toffset)*scale;


}
function mousemove(e) {
	mxpos = (e.pageX-loffset)*scale;
	mypos = (e.pageY-toffset)*scale;
	pointer.x = mxpos;
	pointer.y = mypos;

	// ball.vY += (mxpos-ox)/15*line.d;

	ox = mxpos;
}

function mouseend(e) {

}






window.addEventListener('mousedown', function(e) {
	mousestart(e);
}, false);
window.addEventListener('mousemove', function(e) {
	mousemove(e);
}, false);
window.addEventListener('mouseup', function(e) {
	mouseend(e);
}, false);
window.addEventListener('touchstart', function(e) {
	e.preventDefault();
	mousestart(e.touches[0]);
}, false);
window.addEventListener('touchmove', function(e) {
	e.preventDefault();
	mousemove(e.touches[0]);
}, false);
window.addEventListener('touchend', function(e) {
	e.preventDefault();
	mouseend(e.touches[0]);
}, false);



// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
function _pexresize() {
	var cw = window.innerWidth;
	var ch = window.innerHeight;
	if (cw<=ch*stage.w/stage.h) {
		portrait = true;
		scale = stage.w/cw;
		loffset = 0;
		toffset = Math.floor(ch-(cw*stage.h/stage.w))/2;
		_pexcanvas.style.width = cw + "px";
		_pexcanvas.style.height = Math.floor(cw*stage.h/stage.w) + "px";
	} else {
		scale = stage.h/ch;
		portrait = false;
		loffset = Math.floor(cw-(ch*stage.w/stage.h))/2;
		toffset = 0;
		_pexcanvas.style.height = ch + "px";
		_pexcanvas.style.width = Math.floor(ch*stage.w/stage.h) + "px";
	}
	_pexcanvas.style.marginLeft = loffset +"px";
	_pexcanvas.style.marginTop = toffset +"px";
}


window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	window.oRequestAnimationFrame      ||
	window.msRequestAnimationFrame     ||
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};})();



	var fps = 60;


	var nfcount = 0;

function animated() {
	requestAnimFrame(animated);
	enginestep();

   	nfcount++;
    ctx.fillStyle='#2c3e50';
    ctx.font = "14px arial";
    ctx.textAlign = "left"; 
    // ctx.fillText("FPS: "+Math.floor(fps),stage.w-100,stage.h-100);
}

_pexresize();
animated();


function countfps() {
	fps = nfcount;
	nfcount = 0;
}
setInterval(countfps,1000);