/* CONFIG
* useLevelgraph : utilisation de levelgraph pour persistance des triplets sur le serveur nodejs (https://github.com/levelgraph/levelgraph)
*/

var useLevelgraph = true; //possibilite d'utiliser LevelGRAPH DB : opérationnel (stocké dans daossier data) ne fonctionne pas sur tous les systemes

/* IMPORTS NODE_MODULES  */
var compression = require('compression')
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
  var currentGraph = spog.graph0;

  //var currentGraph = spog.graph0;
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
app.use(compression({filter: shouldCompress}))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}
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
//var rooms = ['Agora','graph0', 'graph1','Personne','Tension', 'Organisation'];
var freq = [{name: 'Agora', count: 0}, {name: 'Tension', count: 0}, {name: 'Organisation', count: 0}];
var users = [];

io.sockets.on('connection', function (socket) {
  console.log("connexion de "+socket.id)
  users.push(socket.id);
//  socket.room = rooms[0];
  // send client to room 1
//  socket.join(socket.room);

console.log(io.sockets.adapter.rooms)

var ioRooms = io.sockets.adapter.rooms;
for (var k in ioRooms) {
  if(!users.includes(k)){
    var count = ioRooms[k].length;
    console.log(k+ " : "+count);
    var f = {name:k, count:count};
    freq.push(f);  // ou update
  }else{
    console.log("User "+ k+ " : "+ioRooms[k]);
  }

}
console.log(freq)
  socket.emit('initrooms', freq);

  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username, newroom){
    username = username.trim();
    newroom = newroom.trim();
    console.log("adduser "+username)
    console.log("Room lors de l'adduser : "+newroom);

    /*if (!rooms.includes(newroom)){
      rooms.push(newroom)
    }*/

    // leave the current room (stored in session)
    socket.leave(socket.room);
    // join new room, received as function parameter
    socket.join(newroom);

    // store the username in the socket session for this client
    socket.username = username;
    // store the room name in the socket session for this client
    socket.room = newroom;
    // add the client's username to the global list
    usernames[username] = username;
    //    socket.room = rooms[0];
    // send client to room 1
console.log(freq)
    socket.emit('updaterooms', freq, socket.room);
    // echo to client they've connected
    socket.emit('updatechat', 'Spoggy', 'Vous êtes connecté au graphe '+socket.room);
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to(socket.room).emit('updatechat', 'Spoggy', username + ' vient de se connecter au graphe '+socket.room);

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

    console.log("ROOM & CURrent graph")
    let room = socket.room;
    console.log(room);
    //console.log(currentGraph);
    console.log(" FIN ROOM & CURrent graph")

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
          var triples = [];
          var triple = {
            subject: data.id,
            predicate: "label",
            object: data.label,
          };
          triples.push(triple);
          var tripleG = {
            subject: data.id,
            predicate: 'graph',
            object: room
          };
          triples.push(tripleG);
          var tripleT = {
            subject: data.id,
            predicate: 'type',
            object: "node"
          };
          triples.push(tripleT);
          if(data.shape != undefined){
            var tripleShape = {
              subject: data.id,
              predicate: "shape",
              object: data.shape
            };
            triples.push(tripleShape);
          }
          if (data.color != undefined){
            var tripleColor = {
              subject: data.id,
              predicate: "color",
              object: data.color
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
                console.log("added node 1");
              });
            } else {
              // si le noeud existe, on le supprime et le recréé avec les nouvelles valeurs, c'est la méthode pour modifier
              currentGraph.del(list[0], function(err, deleted) {
                console.log("deleted");
              });
              currentGraph.put(triples, function(err, putted) {
                console.log("added node 2");
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
            currentGraph.del(list, function(err, deleted) {

              if(err){console.log(err)}else{
                console.log("del list 1");
                console.log(deleted)
              }
            });
          });
          edges.forEach(function(edgeId) {
            currentGraph.get({
              subject: edgeId
            }, function(err, list) {
              if(err){console.log(err)}else{
                console.log("3 list");
                console.log(list)
              }
              currentGraph.del(list, function(err, deleted) {

                if(err){console.log(err)}else{
                  console.log("del list 2");
                  console.log(deleted)
                }
              });
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
              if(err){console.log(err)}else{
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
                  var tripleG = {
                    subject: edge.id,
                    predicate: 'graph',
                    object: room
                  };
                  var tripleT = {
                    subject: edge.id,
                    predicate: 'type',
                    object: 'edge'
                  };
                  var triples = [tripleLabel, tripleFrom, tripleTo, tripleG, tripleT];
                  console.log(triples);
                  currentGraph.put(triples, function(err) {
                    if(err){console.log(err)}else{console.log("added edge 1");}
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
                      if(err){console.log(err)}else{console.log("deleted");}

                    });
                    currentGraph.put(tripleLabel, function(err, putted) {

                      if(err){console.log(err)}else{console.log("added 2");}
                    });
                  });
                }
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
              console.log("4  deleted");
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
    /*if (!rooms.includes(newroom)){
      rooms.push(newroom)
    }*/
    // leave the current room (stored in session)
    socket.leave(socket.room);
    // join new room, received as function parameter
    socket.join(newroom);
    socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
    // sent message to OLD room
    socket.broadcast.to(socket.room).emit('updatechat', 'Spoggy', socket.username+' a quitté ce graphe');
    // update socket session room title
    socket.room = newroom;
    socket.broadcast.to(newroom).emit('updatechat', 'Spoggy', socket.username+' a rejoint ce graphe');
  // mise a jour de la socket   socket.emit('updaterooms', freq, newroom);
    io.sockets.emit('updaterooms', freq, newroom); //mise à jour de tous les clients avec rooms et frequentation
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
    console.log("deconnecte "+socket.username)
    for (var i=users.length-1; i>=0; i--) {
    if (users[i] === socket.id) {
        users.splice(i, 1);
         break;       //<-- Uncomment  if only the first term has to be removed
    }
}
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'Spoggy', socket.username + ' est déconnecté');
    socket.leave(socket.room);
  });
});


function initDb(socket){
  // initialisation avec base levelgraph
  console.log( "recherche des infos dans le graphe " +socket.room);
  let room = socket.room;
  if(useLevelgraph){
    console.log("LEVELGRAPH");
    if (limitInit > 0) {
      currentGraph.get({
        predicate: "graph",
        object: room,
        reverse: true,
        limit: limitInit
      }, function(err, list) {
        if(err){console.log(err)}else{  console.log("1list");
        console.log(list);}

        socket.emit('initDb', list);
      });
    } else {
      currentGraph.search([{
        subject: currentGraph.v("subject"),
        predicate: "graph",
        object: room,

      }, {
        subject: currentGraph.v("subject"),
        predicate: currentGraph.v("predicate"),
        object: currentGraph.v("object"),
        type: currentGraph.v("type")
      }], function(err, results) {
        // this will print "[{ x: 'daniele', y: 'marco' }]"
        console.log(results);
        socket.emit('initDb', results);
      });




      currentGraph.get({
        predicate: "graph",
        object: room,
        reverse: true,
      }, function(err, list) {
        if(err){console.log(err)}else{ console.log("2 list");
        console.log(list);}

        socket.emit('initDb', list);
      });
    }
  }
}
