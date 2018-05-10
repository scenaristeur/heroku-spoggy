/* CONFIG
* useLevelgraph : utilisation de levelgraph pour persistance des triplets sur le serveur nodejs (https://github.com/levelgraph/levelgraph)
*/

var useLevelgraph = false; //possibilite d'utiliser LevelGRAPH DB : opérationnel (stocké dans daossier data) ne fonctionne pas sur tous les systemes

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


if (useLevelgraph){
  ///////////////////////////////////////////////////////////
  // GESTION DE LA BASE DE DONNEES SPOG BASEE SUR LEVELGRAPH
  ///////////////////////////////////////////////////////////
  var Spog = require('./spog');
  var spog = new Spog(); // name, mode (n3 or null), demo or not
  //var db = spog.db;

  console.log(spog.graph0)
var currentGraph = spog.graph0;
  /*currentGraph.get({
    reverse: true
  }, function(err, list) {
    console.log("restit list");
      console.log(list);
      console.log(err);
    //socket.emit('initDb', list);
  });*/
//  var graph0 = spog.graph0;
  //console.log(db)
  //  console.log(graph0)
  ///////////////////////////////////////////////////////////
  // structure d'un noeud stocké dans la base LEVELGRAPH
  // un noeud possede un id, le predicat "label" et son label + un type noeud
  // c'est un triplet sujet, predicat, objet, avec une quatrième valeur, levelgraph permet de le faire
  // var triple = { subject: data.id, predicate: "label", object: data.label , type: "node"};
  //
  //un lien entre deux noeuds est definit dans la base par trois triplets :
  //var tripleLabel = { subject: edge.id, predicate: "label", object: edge.label };
  //var tripleFrom = { subject: edge.id, predicate: "from", object: edge.from };
  //var tripleTo = { subject: edge.id, predicate: "to", object: edge.to };
  ///////////////////////////////////////////////////////////
}


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
app.get('*', function(req, res){
//  console.log(req.originalUrl);
//  console.log(res);
//nécessaire pour ne pas avoir des cannot get sur http://127.0.0.1:3000/view2
  res.sendFile("/public/index.html", {root: '.'});
});







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
var numUsers = 0;
var app = this;

// rooms which are currently available in chat
var rooms = ['defaut','graph0', 'graph1','Personne','Tension', 'Organisation'];


io.sockets.on('connection', function (socket) {
  console.log("connexion")
  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username){
    console.log("adduser "+username)
    // store the username in the socket session for this client
    socket.username = username;
    // store the room name in the socket session for this client
    socket.room = rooms[0];
    // add the client's username to the global list
    usernames[username] = username;
    // send client to room 1
    socket.join(socket.room);
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, socket.room);
    initDb(socket);
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
    type: "graph"
  };
  currentGraph.put(triple, function(err,data) {
    console.log(err);
    console.log(data);
  });

  initDb(socket);
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


function initDb(socket){
  // initialisation avec base levelgraph
  if(useLevelgraph){
    console.log("LEVELGRAPH");
    if (limitInit > 0) {
      currentGraph.get({
        reverse: true,
        limit: limitInit
      }, function(err, list) {
        console.log("1list");
          console.log(list);
        socket.emit('initDb', list);
      });
    } else {
      currentGraph.get({
        reverse: true
      }, function(err, list) {
        console.log("2 list");
          console.log(list);
        socket.emit('initDb', list);
      });
    }
  }
}
