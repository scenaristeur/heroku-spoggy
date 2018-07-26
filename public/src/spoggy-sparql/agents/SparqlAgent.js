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

  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }


  switch(message.type){
    case 'updateEndpoints':
    console.log("updateEndpoints");
    console.log(message)
    this.app.testEndpoints(message.endpoints);
    break;
    case 'recherche':
    this.app.recherche(message);
    break;

    case 'explore':
    console.log("explore");
    console.log(message.endpoint)
    this.app.explore(message.endpoint)
    break;
    case 'create_ds':
    //this.agentGlobal.send('agentSparql', {type: 'create_ds', endpoint: this.endpoint, ds_name: ds_name });
    console.log(message);
    this.app.create_ds(message.endpoint, message.ds_name, message.ds_type)
    break;
    case 'clickon':
    //    app.agentGraph.send('agentVirtuoso', {type:'clickon', node : node});
    this.app.clickon(message);
    break;

    default:
    console.log(message);
  }


};
