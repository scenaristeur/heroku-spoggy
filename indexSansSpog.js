'use strict';
///////////////////////////////////////////////////////////
// GESTION NODE EXPRESS SERVEUR
///////////////////////////////////////////////////////////
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

// Routing
app.use(express.static(__dirname + '/public'));

//LANCEMENT SERVEUR
server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

// usernames which are currently connected to the chat
var usernames = {};

// graphs which are currently available in chat
var graphs = ['graph0','room1','room2','room3'];

// Chatroom

var numUsers = 0;
var app = this;

io.on('connection', (socket) => {
  console.log('Client connected');
	var addedUser = false;
  socket.on('disconnect', () => console.log('Client disconnected'));


	// when the client emits 'add user', this listens and executes
	socket.on('add user', function (username) {
		console.log("add user "+username);
		if (addedUser) return;

		// we store the username in the socket session for this client
		socket.username = username;

		//GESTION MULTIROOM
		// store the room name in the socket session for this client
		socket.graph = 'graph0';
		// add the client's username to the global list
		usernames[username] = username;
		// send client to room 1
		socket.join('graph0');
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected to graph0');
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to('graph0').emit('updatechat', 'SERVER', username + ' has connected to this graph');
		socket.emit('updategraphs', graphs, 'graph0');

		// FIN GESTION MULTIROOM

		++numUsers;
		addedUser = true;
		socket.emit('login', {
			numUsers: numUsers
		});
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit('user joined', {
			username: socket.username,
			numUsers: numUsers
		});
		console.log(socket.username+" joined");

		//  initDb(socket);
		console.log("initGraphs(socket);");

	});



});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
