/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function FoldermenuAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
FoldermenuAgent.prototype = Object.create(eve.Agent.prototype);
FoldermenuAgent.prototype.constructor = FoldermenuAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
FoldermenuAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use FoldermenuAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
FoldermenuAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );
  this.app.prop1 = message;


  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }

  switch(message.type){
    case 'updaterooms':
    this.app.rooms = message.rooms;
    this.app.current_room = message.current_room;
    console.log("update");
    break;

    default:
    console.log(message);
  }
};
