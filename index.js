const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
    });

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('drawn', (msg) => {
		socket.broadcast.emit('updateall', msg);
	});
});


http.listen(process.env.PORT || 8000, () => {
	console.log('listening on *:8000');
    });
