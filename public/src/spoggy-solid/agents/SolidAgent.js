/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function SolidAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
SolidAgent.prototype = Object.create(eve.Agent.prototype);
SolidAgent.prototype.constructor = SolidAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
SolidAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use SolidAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
SolidAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );
  this.app.prop1 = message;


  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }

  switch(message.type){
    case 'toggle':
    console.log(message.popup);
    let popup = message.popup;
    let pop = this.app.$[popup];
    console.log(pop);
    pop.toggle();
    break;

    default:
    console.log(message);
  }
};
