const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
    });

function get_random_color() {
	function c() {
		var hex = Math.floor(Math.random()*256).toString(16);
		return ("0"+String(hex)).substr(-2); // pad with zero
	}
	return "#"+c()+c()+c();
}

io.on('connection', (socket) => {
	socket.on('newplayer', (msg) => {
		socket.emit('size', [Math.floor(Math.random() * 20) + 1, get_random_color()]);
	});

	console.log('a user connected');
	socket.on('drawn', (msg) => {
		socket.broadcast.emit('updateall', msg);
	});
	socket.on('ready', (msg) => {
		socket.emit('begin', true);
	})
});


http.listen(process.env.PORT || 7000, () => {
	console.log('listening on *:7000');
    });
