// voir avec levelgrap-jsonld pour stocker les noeuds sous forme d'objet json
// Setup basic express server
//https://socket.io/docs/emit-cheatsheet/#
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var useLevelgraph = true; //possibilite d'utiliser LevelGRAPH DB : opérationnel (stocké dans daossier data)
var useFuseki = false; //possibilité d'utiliser un serveur fuseki sur http://127.0.0.1:3000

var currentDb, graphs, currentGraph;
var currentGraph = "graph0";


if (useLevelgraph){
  ///////////////////////////////////////////////////////////
  // GESTION DE LA BASE DE DONNEES SPOG BASEE SUR LEVELGRAPH
  ///////////////////////////////////////////////////////////
  var Spog = require('./spog');
  var spog = new Spog(); // name, mode (n3 or null), demo or not

  currentDb = spog.db;
  graphs = currentDb.sublevels;
  currentGraph = spog.graph0;
  //var graph0 =  db.graph0;
  //console.log(currentGraph);
  /*var triple = {
  subject: "graph0",
  predicate: "type",
  object: "Graphe",
  type: "graph"
};
currentGraph.put(triple, function(err,data) {
console.log(err);
console.log(data);
});

triple = {
subject: "graphAdmin",
predicate: "type",
object: "Graphe",
type: "graph"
};
currentGraph.put(triple, function(err,data) {
console.log(err);
console.log(data);
});*/

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

if (useFuseki){
  var SpogSparql = require('./spogsparql');
  var sparql = new SpogSparql();
  console.log(sparql.getEndpoint());
  console.log(sparql.getDataset());
}



///////////////////////////////////////////////
// GESTION MULTIUSER TICK, SNAPSHOT, HISTORIQUE
///////////////////////////////////////////////
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
app.use(express.static(__dirname + '/EyeClient'));

///////////////////////////////////////////////
// ENVOI REGULIER DES MODIFICATIONS A TOUT UTILISATEUR CONNECTE
///////////////////////////////////////////////
tickInterval = setInterval(function() {
  //A intervalles réguliers, on envoie à tout utilisateur connecté, un snapshot des dernières modifications et on réinitialise les actions stockées dans le snapshot
  //  console.log("tick");
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

///////////////////////////////////////////////
// UTILISATION DE SOCKET.IO POUR SYNCHRO basé sur le chat
///////////////////////////////////////////////


// Chatroom

var numUsers = 0;
var app = this;

io.on('connection', function (socket) {
  console.log("connection");
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    console.log("new message");
    console.log(data);
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    console.log("add user "+username);
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
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
    initGraphs(socket);

  });

  socket.on('initDb', function(){
    console.log('reinit');
    initDb(socket);
  });

  socket.on('newGraph', function(graphname){
    console.log('new graph '+graphname);
    var triple = {
      subject: graphname,
      predicate: "type",
      object: "Graphe",
      type: "graph"
    };
    currentGraph.put(triple, function(err,data) {
      console.log(err);
      console.log(data);
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    console.log("typing");
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    console.log("stop typing");
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    console.log("disconnect");
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
      console.log(socket.username + " left");
    }
  });

  socket.on("changeGraph", function(name){
  console.log("CHANGE GRAPH "+name);
  //cherche si le graph existe, si oui le renvoyer, sinon le créer
  if (!spog.graphs.includes(name)){
  spog.createGraph(name);
}
console.log(spog.graphs);
console.log(spog.graphs.includes(name));
currentGraph = name;
});
// de nouvelles actions à executer sont reçues d'un client
socket.on('newActions', function(actions) {
  //console.log("newActions");
  // on ajoute à snapshot.Actions les actions reçues par le client
  var snapActions = snapshot.actions;
  var newActions = snapActions.concat(actions);
  snapshot.actions = newActions;
  console.log(actions);
  actions.forEach(function(action) {
    //pour chaque action reçue on effectue le boulot necéssaire selon son type
    switch (action.type) {
      case "newNode":
      //nouveau node du graphe ou modification
      console.log("newNode");
      var data = action.data;
      console.log(data);
      var triples = [];
      // si data.type == "graph" on créé un nouveau graphe
  /*    if (data.type == "graph"){
        console.log("CREATION d'un graphe");
        spog.createGraph(data.id);
        console.log(spog.graphs);
        var tripleGraph = {
          subject: data.id,
          predicate: "type",
          object: "Graph",
          type: "edge"
        };

        triples.push(tripleGraph);
        updateGraphs(socket);
      }*/



      //si newNode mais qu'il existe, c'est un renommage  donc on regarde s'il existe dans la base
      var triple = {
        subject: data.id,
        predicate: "label",
        object: data.label,
        type: data.type
      };

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
        /*          predicate: "label",
        object: data.label,*/
      }, function(err, list) {
        if (list.length == 0) {
          //console.log("ajoute");
          currentGraph.put(triples, function(err) {
            console.log("added");
          });
        } else {
          // si le noeud existe, on le supprime et le recréé avec les nouvelles valeurs, c'est la méthode pour modifier
          currentGraph.del(list, function(err, deleted) {
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
      // PAS CERTAIN QUE LES LIENS SOIENT BIEN SUPPRIMES DU GRAPHE lorsque l'on supprime un noeud, A REVOIR
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
});



//});



});


function zeCallback(socket, initFuz){
  //  console.log(initFuz);
  socket.emit('initFuz', initFuz);

}

function initGraphs(socket){
  if(useLevelgraph){
    console.log("LEVELGRAPH + SUBLEVEL");
    console.log(socket.currentGraph);
    //  socket.emit('initDb', currentDb.graphs);
    currentGraph.get({
      reverse: true,
      limit: limitInit
    }, function(err, list) {
      console.log("1list");
      console.log(list);
      socket.emit('initDb', list);
    });
  }
}

function updateGraphs(socket){
  currentGraph.get({
    /*subject: data.id,*/
    predicate: "type",
    object: "Graph",
  }, function(err, list) {
    if (list.length == 0) {
      //console.log("ajoute");
      //  currentGraph.put(triples, function(err) {
      console.log("pas de liste de graphs");
      //});
    } else {
      console.log(" liste de graphs");
      console.log(list);
      socket.emit('initDb', list);
      // si le noeud existe, on le supprime et le recréé avec les nouvelles valeurs, c'est la méthode pour modifier
      /*  currentGraph.del(list, function(err, deleted) {
      console.log("deleted");
    });
    currentGraph.put(triples, function(err, putted) {
    console.log("added");
  });*/
}
});
}

/*
function initDb(socket){
// initialisation avec base levelgraph
if(useLevelgraph){
console.log("LEVELGRAPH");
if (limitInit > 0) {
db.get({
reverse: true,
limit: limitInit
}, function(err, list) {
console.log("1list");
socket.emit('initDb', list);
});
} else {
db.get({
reverse: true
}, function(err, list) {
console.log("2 list");
socket.emit('initDb', list);
});
}
}else if(useFuseki){
console.log("FUSEKI");
//sendFusekiInit(socket, zeCallback);
var initFuz = sparql.getCentPremiers(socket, zeCallback);

}
}*/

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// avec GESTION DE LA BDD
//////////////////////////


//var numUsers = 0;

/*
io.on('event', function(data) {
console.log(data);
});

io.on('disconnect', function() {
console.log("deconnecte");
});*/
//Socket.IO
//var rooms = ["index", "tension","blip", "blop"];
/*
io.on('connect', function(socket) {
console.log("connecte");
var addedUser = false;
// si le client emet 'add user', on l'ajoute aux utilisateurs connectes, on emet un login avec le nombre d'utilisateurs connectes et les derniers messages
socket.on('add user', function(username) {
if (addedUser) return;
console.log("ADD USER :"+username);
// we store the username in the socket session for this client
socket.username = username;
++numUsers;
addedUser = true;

socket.emit('login', {
numUsers: numUsers,
lastMessages: snapshotTemp.messages
});

// On envoie au nouvel utilisateur les informations contenues dans la base db
if (limitInit > 0) {
db.get({
reverse: true,
limit: limitInit
}, function(err, list) {
console.log("1list");
socket.emit('initDb', list);
});
} else {
db.get({
reverse: true
}, function(err, list) {
console.log("2 list");
socket.emit('initDb', list);
});
}



});




socket.on('new message', function(data) {
console.log(data);
// si reception d'un message 'new message', on rediffuse à tous les users connectés
socket.broadcast.emit('new message', {
username: socket.username,
message: data
});

// lorsqu'un utilisateur se connecte, on nettoie les messages du chat et on ajoute son message
while (snapshotTemp.messages.length > nbLastMessages) {
var deletedMsg = snapshotTemp.messages.shift();
}
snapshotTemp.messages.push({
username: socket.username,
message: data
});
});
*/


/*

*/



// On envoie au nouvel utilisateur les informations contenues dans la base db
/*if (limitInit > 0) {
db.get({
reverse: true,
limit: limitInit
}, function(err, list) {
socket.emit('initDb', list);
});
} else {
db.get({
reverse: true
}, function(err, list) {
socket.emit('initDb', list);
});
}*/
/*
// echo globally (all clients) that a person has connected
socket.broadcast.emit('user joined', {
username: socket.username,
numUsers: numUsers
});*/
//});


/*socket.emit("rooms", rooms);
var room = rooms[0];
updateRoom(socket,room);


socket.on('create', function(room) {
rooms.push(room);
console.log(socket.room);
io.emit("rooms", rooms);
updateRoom(this, room);
});
socket.on('join', function(room) {
updateRoom(this, room);
});

socket.on('new message', function (data) {
console.log(data);
// si reception d'un message 'new message', on rediffuse à tous les users connectés
socket.broadcast.emit('new message', {
username: socket.username,
message: data
});
});*/



/*
updateRoom = function(socket,room){
if(socket.room){
socket.leave(socket.room);
}
socket.room = room;
socket.join(room);
io.in(room).emit('joined', {username: socket.id, message: room });
}
*/
