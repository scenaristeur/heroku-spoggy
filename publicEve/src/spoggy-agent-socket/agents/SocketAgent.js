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
    case 'action':
    switch(message.action){
      case 'connect':
      console.log("DEmande de connection Socket");
      this.app.connectSocket()
      break;
      case 'disconnect':
      console.log("DEmande de Deconnection Socket");
      this.app.disconnectSocket()
      break;
      case 'addUser':
      console.log("DEmande addUSer Socket");
      this.app.addUser(message.value);
      break;
      case 'switch':
      console.log("DEmande switch Socket");
      this.app.switchRoom(message.value);
      break;
      default:
      console.log("MESSAGE NON PRIS EN COMPTE")
      console.log(message);
    }
    break;
    case 'addActions':
  console.log("Add Actions Socket");
console.log(message.actions);
this.app.emitActions(message.actions)



    break;

    default:
    console.log(message);
  }




};
