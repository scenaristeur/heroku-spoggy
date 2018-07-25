/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function GraphReglagesAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
GraphReglagesAgent.prototype = Object.create(eve.Agent.prototype);
GraphReglagesAgent.prototype.constructor = GraphReglagesAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
GraphReglagesAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use GraphReglagesAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
GraphReglagesAgent.prototype.receive = function(from, message) {

  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }

console.log(message)
  switch(message.type){

    case 'initOptions':
    //      app.agentGraph.send('agentDialogs', {type:'initOptions', repulsion : this.network.physics.options.repulsion});
    console.log(message.repulsion);
    this.app.initOptions(message.repulsion)
    break;


    default:
    console.log(message);
  }
};
