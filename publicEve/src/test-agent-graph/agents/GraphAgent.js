/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function GraphAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  // extend the agent with support for requests
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
GraphAgent.prototype = Object.create(eve.Agent.prototype);
GraphAgent.prototype.constructor = GraphAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
GraphAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use GraphAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
GraphAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) + '<br>');
  this.app.prop1 = message;

  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
  }


  switch(message.type){
    case 'catchTriplet':
    //    let commande = rdf.quad(rdf.blankNode(), rdf.namedNode('commande'),rdf.literal(chatMess))
    //  this.catchCommande(chatMess,this.network,this);
    console.log ("catchtriplet voir plus bas");
    console.log(message);
    catchTriplet(message.value)
    break;
    default:
    console.log(message);
  }

};

function catchTriplet(message){
  // A REVOIR ET REMPLACER PAR
  /*  console.log( "test pour voir si c'est une query ou une update");
  let sens = "update";
  if(triplets[0].s.startsWith('?') || triplets[0].p.startsWith('?') || triplets[0].o.startsWith('?')  ){
  sens = "query";
}else{
this.catchTriplet(triplets[0], network)
}
*/
console.log(message.length);
message=message.trim();

//  var tripletString = message.substring(2).trim().split(" ");
var tripletString = message.trim().split(" ");
// les noeuds existent-ils ?

var sujetNode = network.body.data.nodes.get({
  filter: function(node){
    //    console.log(node);
    return (node.label == tripletString[0] );
  }
});
var objetNode = network.body.data.nodes.get({
  filter: function(node){
    //    console.log(node);
    return (node.label == tripletString[2]);
  }
});
console.log(sujetNode);
console.log(objetNode);
// sinon, on les créé
if (sujetNode.length == 0){
  network.body.data.nodes.add({label: tripletString[0] });
}
if (objetNode.length == 0){
  network.body.data.nodes.add({ label: tripletString[2] });
}
// maintenant ils doivent exister, pas très po=ropre comme méthode , à revoir
sujetNode = network.body.data.nodes.get({
  filter: function(node){
    console.log(node);
    return (node.label == tripletString[0] );
  }
});
objetNode = network.body.data.nodes.get({
  filter: function(node){
    console.log(node);
    return (node.label == tripletString[2]);
  }
});
var actionSujet = {};
actionSujet.type = "newNode";
actionSujet.data = sujetNode[0];
//  actionsToSendTemp.push(actionSujet);
this.addAction(actionSujet);
var actionObjet = {};
actionObjet.type = "newNode";
actionObjet.data = objetNode[0];
//  actionsToSendTemp.push(actionObjet);
this.addAction(actionObjet);

// maintenant, on peut ajouter l'edge
network.body.data.edges.add({
  label: tripletString[1],
  from : sujetNode[0].id,
  to : objetNode[0].id
});

//on récupère ce edge pour l'envoyer au serveur
var edge = network.body.data.edges.get({
  filter: function(edge) {
    return (edge.from == sujetNode[0].id && edge.to == objetNode[0].id && edge.label == tripletString[1]);
  }
});
var actionEdge = {};
actionEdge.type = "newEdge";
actionEdge.data = edge;
this.addAction(actionEdge);

//  actionsToSendTemp.push(actionEdge);
//console.log(actionsToSendTemp);
//  return actionsToSendTemp;

}
