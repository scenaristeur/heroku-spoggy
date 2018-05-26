/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function SparqlAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
SparqlAgent.prototype = Object.create(eve.Agent.prototype);
SparqlAgent.prototype.constructor = SparqlAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
SparqlAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use SparqlAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
SparqlAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );
  this.app.prop1 = message;


  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }


  switch(message.type){
  /*  case 'updateEndpoint':
    console.log("updateEndpoint");
    this.app.updateUrls(message.url);
    break;*/

  //  this.agentMode.send('agentSparql', {type: 'testEndpoint', endpoint: this.endpoint});
    case 'updateEndpoints':
    console.log("updateEndpoints");
    console.log(message)
      this.app.testEndpoints(message.endpoints);
  /*  if (message.endpointType == 'fuseki'){
        this.app.testFuseki(message);
    }else if (message.endpointType == 'virtuoso'){
        this.app.testVirtuoso(message);
    }else {
      console.log("Je ne connais pas ce type de endpoint : "+message.endpointType);
    }*/
    break;

    default:
    console.log(message);
  }


};
