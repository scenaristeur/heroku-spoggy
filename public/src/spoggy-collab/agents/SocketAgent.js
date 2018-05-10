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

   if (message.indexOf('Hello') === 0) {
     // reply to the greeting
     this.send(from, 'Hi ' + from + ', nice to meet you!');
   }


 };
