var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//https://github.com/scenaristeur/spoggy/blob/master/public/src/spog-socket/spog-socket.html
//http://psitsmike.com/2011/10/node-js-and-socket-io-multiroom-chat-tutorial/
//https://www.codementor.io/codementorteam/socketio-player-matchmaking-system-pdxz4apty
var port = process.env.PORT || 3000;


///////////////////////////////////////////////
// GESTION MULTIUSER TICK, SNAPSHOT, HISTORIQUE
///////////////////////////////////////////////
var numUsers = 0;
var tickDelay = 1000; // 15ms selon source, tempo pour envoi du snapshot par le serveur
var snapshot = {
  actions: []
}; // l'etat dans lequel le monde se trouve
var snapshotTemp = {
  messages: []
}; // un snapshot temporaire incluant les derniers messages
var nbLastMessages = 10; // nombre de messages à afficher pour les nouveaux connectes
var limitInit = 0 // nbre d'elements à recuperer dans la base lors du login d'un user, 0 pour sans limite



server.listen(port, function() {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));







///////////////////////////////////////////////
// ENVOI REGULIER DES MODIFICATIONS A TOUT UTILISATEUR CONNECTE
///////////////////////////////////////////////
tickInterval = setInterval(function() {
  //A intervalles réguliers, on envoie à tout utilisateur connecté, un snapshot des dernières modifications et on réinitialise les actions stockées dans le snapshot
  // console.log("tick");
  //  console.log(snapshot);

  if(snapshot.actions.length >0){
    updateSnapshot();
    console.log("tock");
    io.emit('tick', snapshot);
    snapshot.actions = new Array();
  }
}, tickDelay);

function updateSnapshot() {
  //console.log("update");
  snapshot.numUsers = numUsers;
  //console.log(snapshot);
  var d = new Date();
  var n = d.getSeconds();
  snapshot.tick = n;
}



// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];


io.sockets.on('connection', function (socket) {
  console.log("connexion")
  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username){
    console.log("adduser "+username)
    // store the username in the socket session for this client
    socket.username = username;
    // store the room name in the socket session for this client
    socket.room = 'room1';
    // add the client's username to the global list
    usernames[username] = username;
    // send client to room 1
    socket.join('room1');
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'room1');
  });

  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (data) {
    console.log('sendchat');
    console.log(data);
    console.log(socket.room);
    console.log(socket.username);
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.in(socket.room).emit('updatechat', socket.username, data);
  });

  // de nouvelles actions à executer sont reçues d'un client
  socket.on('newActions', function(actions) {
    //console.log("newActions");
    // on ajoute à snapshot.Actions les actions reçues par le client
    var snapActions = snapshot.actions;
    var newActions = snapActions.concat(actions);
    snapshot.actions = newActions;
    console.log(actions);
  });

  socket.on('switchRoom', function(newroom){
    console.log('switchroom '+ newroom)
    if (!rooms.includes(newroom)){
      rooms.push(newroom)
    }
    // leave the current room (stored in session)
    socket.leave(socket.room);
    // join new room, received as function parameter
    socket.join(newroom);
    socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
    // sent message to OLD room
    socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
    // update socket session room title
    socket.room = newroom;
    socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
    socket.emit('updaterooms', rooms, newroom);
  //  io.sockets.emit('updaterooms', rooms, null);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });
});
