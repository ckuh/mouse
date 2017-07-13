// Move the mouse across the screen as a sine wave.
import express from 'express';
import robot from 'robotjs';
import readline from 'readline';
import http from 'http';
import path from 'path';

const app = express()
const server = http.Server(app);
const io = require('socket.io')(server);
// Speed up the mouse.
robot.setMouseDelay(0);
const screenSize = robot.getScreenSize();
const height = screenSize.height;
const width = screenSize.width;
const initMousePos = robot.getMousePos();
let x = initMousePos.x;
let y = initMousePos.y;
robot.moveMouseSmooth(x,y);

function updateCurMousePos () {
	const curMousePos = robot.getMousePos();
	x = curMousePos.x;
	y = curMousePos.y;
}

io.on('connection', socket => {
	console.log('connected')
	socket.on('key press', event => {
		switch (event.name) {
			case 'ArrowUp':
			console.log('cur pos: ', y);
			updateCurMousePos()
				if(y-10 >= 0) {
					robot.moveMouseSmooth(x, y-=10);
				}
				break;
			case 'ArrowDown':
			console.log('cur pos: ', y)
			updateCurMousePos()
				if(y+10 < height) {
					robot.moveMouseSmooth(x, y+=10);
				}
				break;
			case 'ArrowLeft':
			console.log('cur pos: ', x)
			updateCurMousePos()
				if(x-10 >= 0) {
					robot.moveMouseSmooth(x-=10, y);
				}
				break;
			case 'ArrowRight':
			console.log('cur pos: ', x)
			updateCurMousePos()
				if(x+10 < width) {
					robot.moveMouseSmooth(x+=10, y);
				}
				break;
			case 'DiagUpLeft':
			updateCurMousePos()
				if(y-10 >= 0 && x-10 >= 0) {
					robot.moveMouseSmooth(x-=10, y-=10);
				}
				break;
			case 'DiagUpRight':
			updateCurMousePos()
				if(x+10 < width && y-10 >= 0) {
					robot.moveMouseSmooth(x+=10, y-=10);
				}
				break;
			case 'DiagDownLeft':
			updateCurMousePos()
				if(x-10 >= 0 && y+10 < height) {
					robot.moveMouseSmooth(x-=10, y+=10);
				}
				break;
			case 'DiagDownRight':
			updateCurMousePos()
				if(x+10 < width && y+10 < height) {
					robot.moveMouseSmooth(x+=10, y+=10);
				}
				break;
			default:

		}
	})
})

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.use('/static', express.static(path.join(__dirname, '/../node_modules')));

server.listen(3000, () => {
	console.log('listening on port: 3000');
})
