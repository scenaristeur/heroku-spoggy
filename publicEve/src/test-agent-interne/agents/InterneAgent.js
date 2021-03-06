/**
  * Custom agent prototype
  * @param {String} id
  * @constructor
  * @extend eve.Agent
  */
 function InterneAgent(id, app) {
   // execute super constructor
   eve.Agent.call(this, id);
      this.app = app;

   // connect to all transports configured by the system
   this.connect(eve.system.transports.getAll());
 }

 // extend the eve.Agent prototype
 InterneAgent.prototype = Object.create(eve.Agent.prototype);
 InterneAgent.prototype.constructor = InterneAgent;

 /**
  * Send a greeting to an agent
  * @param {String} to
  */
 InterneAgent.prototype.sayHello = function(to) {
   this.send(to, 'Hello ' + to + '!');
 };

 /**
  * Handle incoming greetings. This overloads the default receive,
  * so we can't use InterneAgent.on(pattern, listener) anymore
  * @param {String} from     Id of the sender
  * @param {*} message       Received message, a JSON object (often a string)
  */
 InterneAgent.prototype.receive = function(from, message) {
   console.log(from + ' said: ' + JSON.stringify(message) );
      this.app.prop1 = message;

   if (message.indexOf('Hello') === 0) {
     // reply to the greeting
     this.send(from, 'Hi ' + from + ', nice to meet you!');
   }


 };
