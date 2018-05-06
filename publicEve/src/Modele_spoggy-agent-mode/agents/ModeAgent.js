/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function ModeAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;

  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
ModeAgent.prototype = Object.create(eve.Agent.prototype);
ModeAgent.prototype.constructor = ModeAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
ModeAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use ModeAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
ModeAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );
      this.app.prop1 = message;

  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }


  switch(message.type){
    case 'addActions':
    //    let commande = rdf.quad(rdf.blankNode(), rdf.namedNode('commande'),rdf.literal(chatMess))
    //  this.catchCommande(chatMess,this.network,this);
    console.log ("addActions à envoyer au levelgraph, serveurs collab et rdf, PB, les couleurs changements de couleur ne semblent pas arriver jusque là");
    console.log(message);

    break;
    default:
    console.log(message);
  }




};
