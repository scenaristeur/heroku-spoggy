/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function SocketAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
SocketAgent.prototype = Object.create(eve.Agent.prototype);
SocketAgent.prototype.constructor = SocketAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
SocketAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use SocketAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
SocketAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );
  this.app.prop1 = message;

  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }


  switch(message.type){
    case 'disconnect':
    this.app.socket.disconnect();
    break;
    case 'connect':
    let graph = message.graph;
    let node = message.node;
    this.app.connectSocket();
    let pseudo = message.pseudo;
    if (pseudo == "anonyme"){
      console.log("tentative de connexion au graph "+graph+" centré sur le noeud "+node);
      pseudo = "anonyme_"+Date.now();
      pseudo = prompt("Entrez un pseudo pour entrer dans le mode Collaboratif", pseudo);
      this.app.socket.emit('adduser', pseudo);
      this.app.switchRoom(graph);
    }
    break;
    case 'adduser':
    this.app.socket.emit('adduser', message.pseudo);
    break;
    case 'switchRoom':
    this.app.switchRoom(message.graph);
    break;
    case 'sendMessage':
    this.app.sendMessage(message.message);
    break;
    case 'newActions':
    let actions = message.actions;
    if(this.app.socket != undefined){
      this.app.socket.emit('newActions', actions);
    }else{
      console.log("Socket undefined");
    }
    break;
    /*case 'connect':
    switch(message.action){
    case 'updateRooms':
    //    let commande = rdf.quad(rdf.blankNode(), rdf.namedNode('commande'),rdf.literal(chatMess))
    //  this.catchCommande(chatMess,this.network,this);
    console.log ("updateRooms");
    console.log(message.value);
    this.app.rooms = message.value.rooms;
    this.app.current_room  = message.value.current_room;

    break;
    default:
    console.log(message);
  }

  break;*/
  default:
  console.log(message);
}



};
