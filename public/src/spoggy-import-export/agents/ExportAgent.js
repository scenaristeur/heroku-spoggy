/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function ExportAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
ExportAgent.prototype = Object.create(eve.Agent.prototype);
ExportAgent.prototype.constructor = ExportAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
ExportAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use ExportAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
ExportAgent.prototype.receive = function(from, message) {

  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }


  switch(message.type){
    case 'catchTriplet':
    let triplet = message.triplet;
    console.log(triplet)
    this.app.catchTriplet(triplet);
    break;


    default:
    console.log(message);
  }
};
