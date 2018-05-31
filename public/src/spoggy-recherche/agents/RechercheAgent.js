/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function RechercheAgent(id, app) {
  // execute super constructor
  // eve.system.init({transports: [{type: 'local'}]});
  /*eve.system.init({
  transports: [
  {
  type: 'local',
  id: 'myLocalTransport', // optional identifier for the transport
}
]
});*/
eve.Agent.call(this, id);

this.app = app;
// connect to all transports configured by the system
this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
RechercheAgent.prototype = Object.create(eve.Agent.prototype);
RechercheAgent.prototype.constructor = RechercheAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
RechercheAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use RechercheAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
RechercheAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );
  this.app.prop1 = message;


  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }



  switch(message.type){
    case 'blabla':
  //  this.app.updateInput(message.resource.trim());
    break;
    default:
    console.log ('non pris en compte : ')
    console.log(message);
  }


};
