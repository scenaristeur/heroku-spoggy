/* CONFIG
* useLevelgraph : utilisation de levelgraph pour persistance des triplets sur le serveur nodejs (https://github.com/levelgraph/levelgraph)
*/

var useLevelgraph = true; //possibilite d'utiliser LevelGRAPH DB : opérationnel (stocké dans daossier data) ne fonctionne pas sur tous les systemes

/* IMPORTS NODE_MODULES  */

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//https://github.com/scenaristeur/spoggy/blob/master/public/src/spog-socket/spog-socket.html
//http://psitsmike.com/2011/10/node-js-and-socket-io-multiroom-chat-tutorial/
//https://www.codementor.io/codementorteam/socketio-player-matchmaking-system-pdxz4apty


/* CONFIGURATION DU SERVEUR WEB */
var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));
app.get('*', function(req, res){
//  console.log(req.originalUrl);
//  console.log(res);
//nécessaire pour ne pas avoir des cannot get sur http://127.0.0.1:3000/view2
  res.sendFile("/public/index.html", {root: '.'});
});


///////////////////////////////////////////////////////////
// GESTION DE LA BASE DE DONNEES SPOG BASEE SUR LEVELGRAPH
///////////////////////////////////////////////////////////
var Spog = require('./spog');
var spog = new Spog(); // name, mode (n3 or null), demo or not
var currentGraph;
var rooms = [];
var usernames = {};
var limitInit = 0



io.sockets.on('connection', function (socket) {
  console.log("connexion");
  console.log("TODO:lister les graphs")
  console.log(spog.db.sublevels)
  rooms = Object.keys(spog.db.sublevels);
  console.log(rooms);
  currentGraph = spog.db.sublevels.graph0;
  console.log(currentGraph);
  socket.emit('updaterooms', rooms, rooms[0]);


  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username){
    console.log("adduser "+username)
    // store the username in the socket session for this client
    socket.username = username;
    // store the room name in the socket session for this client
    socket.room = rooms[0];
    socket.currentGraph = spog.db.sublevels.graph0;
      console.log(socket);
    // add the client's username to the global list
    usernames[username] = username;
    // send client to room 1
    socket.join(socket.room);
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected to '+socket.room);
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, socket.room);
  //  initDb(socket);
  sendGraphData(socket);
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
    console.log("newActions");
    // on ajoute à snapshot.Actions les actions reçues par le client
  /*  var snapActions = snapshot.actions;
    var newActions = snapActions.concat(actions);
    snapshot.actions = newActions;*/
    console.log(actions);
    // RACCOURCIS POUR METTRE A JOUR LA ROOM SANS PASSER PAR LG
    var data = {};
    data.actions = actions;
        io.sockets.in(socket.room).emit('tick', data);
        data.actions = [];

  if (useLevelgraph){
  console.log(actions);
  actions.forEach(function(action) {
    //pour chaque action reçue on effectue le boulot necéssaire selon son type
    switch (action.type) {
      case "newNode":
      //nouveau node du graphe ou modification
      console.log("newNode");
      var data = action.data;
      console.log(data);
      //si newNode mais qu'il existe, c'est un renommage  donc on regarde s'il existe dans la base
      var triple = {
        subject: data.id,
        predicate: "label",
        object: data.label,
        type: "node"
      };
      var triples = [];
      triples.push(triple);
      if(data.shape != undefined){
        var tripleShape = {
          subject: data.id,
          predicate: "shape",
          object: data.shape,
          type: "shape"
        };
        triples.push(tripleShape);
      }
      if (data.color != undefined){
        var tripleColor = {
          subject: data.id,
          predicate: "color",
          object: data.color,
          type: "color"
        };
        triples.push(tripleColor);
      }
      console.log(triples);
      currentGraph.get({
        subject: data.id,
        predicate: "label",
        type: "node"
      }, function(err, list) {
        if (list.length == 0) {
          //console.log("ajoute");
          currentGraph.put(triples, function(err) {
            console.log("added");
          });
        } else {
          // si le noeud existe, on le supprime et le recréé avec les nouvelles valeurs, c'est la méthode pour modifier
          currentGraph.del(list[0], function(err, deleted) {
            console.log("deleted");
          });
          currentGraph.put(triples, function(err, putted) {
            console.log("added");
          });
        }
      });
      break;
      case "deleteNode":
      var nodeId = action.data.nodes;
      var edges = action.data.edges;
      currentGraph.get({
        subject: nodeId
      }, function(err, list) {
        currentGraph.del(list, function(err, deleted) {});
      });
      edges.forEach(function(edgeId) {
        currentGraph.get({
          subject: edgeId
        }, function(err, list) {
          console.log("3 list");
          currentGraph.del(list, function(err, deleted) {});
        });
      });
      break;
      case "newEdge":
      console.log(action);
      //maj de la base
      var edge = action.data[0] || action.data;
      if (edge != undefined) {
        currentGraph.get({
          subject: edge.id
        }, function(err, list) {
          if (list.length == 0) {
            var tripleLabel = {
              subject: edge.id,
              predicate: "label",
              object: edge.label
            };
            var tripleFrom = {
              subject: edge.id,
              predicate: "from",
              object: edge.from
            };
            var tripleTo = {
              subject: edge.id,
              predicate: "to",
              object: edge.to
            };
            currentGraph.put([tripleLabel, tripleFrom, tripleTo], function(err) {
              console.log("added");
            });
          } else {
            var tripleLabel = {
              subject: edge.id,
              predicate: "label",
              object: edge.label
            };
            currentGraph.get({
              subject: edge.id,
              predicate: "label"
            }, function(err, listLabel) {
              currentGraph.del(listLabel[0], function(err, deleted) {
                console.log("deleted");
              });
              currentGraph.put(tripleLabel, function(err, putted) {
                console.log("added");
              });
            });
          }
        });
      } else {
        console.log("pb pour creer le edge, quel id ?")
      }
      break;
      case "editEdge":
      //non utilisé , regroupé avec newEdge
      console.log(action);
      break;
      case "deleteEdge":
      console.log(action);
      var edgeId = action.data.edges[0];
      console.log(edgeId);
      currentGraph.get({
        subject: edgeId
      }, function(err, list) {
        console.log(" 4 list");
        currentGraph.del(list, function(err, deleted) {
          console.log("deleted");
        });
      });
      break;
      default:
      console.log("action non reconnue");
      console.log(action);
    }
  });
  }

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
  if (useLevelgraph){
  console.log('new graph '+socket.room);
  var triple = {
    subject: socket.room,
    predicate: "type",
    object: "Graphe",
    type: "graph",

  };

  ///////////////////////////////////////////////
  // Création et Bascule de Graph
  ////////////////////////
  let newGraph = spog.switchGraph(socket.room, switchSubLevel);

  }


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

function switchSubLevel(sublevels, currentGraph ){

}

function sendGraphData(socket){
  console.log(socket.currentGraph);
  if (limitInit > 0) {
    socket.currentGraph.get({
      reverse: true,
      limit: limitInit
    }, function(err, list) {
      console.log("1list");
        console.log(list);
      socket.emit('initDb', list);
    });
  } else {
    socket.currentGraph.get({
      reverse: true
    }, function(err, list) {
      console.log("2 list");
        console.log(list);
      socket.emit('initDb', list);
    });
  }
}
