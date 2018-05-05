/**
  * Custom agent prototype
  * @param {String} id
  * @constructor
  * @extend eve.Agent
  */
 function DialogAgent(id, app) {
   // execute super constructor
   eve.Agent.call(this, id);
   this.app = app;
   // connect to all transports configured by the system
   this.connect(eve.system.transports.getAll());
 }

 // extend the eve.Agent prototype
 DialogAgent.prototype = Object.create(eve.Agent.prototype);
 DialogAgent.prototype.constructor = DialogAgent;

 /**
  * Send a greeting to an agent
  * @param {String} to
  */
 DialogAgent.prototype.sayHello = function(to) {
   this.send(to, 'Hello ' + to + '!');
 };

 /**
  * Handle incoming greetings. This overloads the default receive,
  * so we can't use DialogAgent.on(pattern, listener) anymore
  * @param {String} from     Id of the sender
  * @param {*} message       Received message, a JSON object (often a string)
  */
 DialogAgent.prototype.receive = function(from, message) {
   console.log(from + ' said: ' + JSON.stringify(message) );
      this.app.prop1 = message;

   if (typeof message == String && message.indexOf('Hello') === 0) {
     // reply to the greeting
     this.send(from, 'Hi ' + from + ', nice to meet you!');
   }

   switch(message.type){
     case 'toggle':
 //    let commande = rdf.quad(rdf.blankNode(), rdf.namedNode('commande'),rdf.literal(chatMess))
     //  this.catchCommande(chatMess,this.network,this);
     console.log("toogle "+ message.dialog)
     break;
     default:
     console.log(message);
   }

 };
