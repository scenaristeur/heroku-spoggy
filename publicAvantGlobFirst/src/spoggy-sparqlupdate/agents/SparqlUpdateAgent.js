/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function SparqlUpdateAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
SparqlUpdateAgent.prototype = Object.create(eve.Agent.prototype);
SparqlUpdateAgent.prototype.constructor = SparqlUpdateAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
SparqlUpdateAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use SparqlUpdateAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
SparqlUpdateAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );
  this.app.prop1 = message;


  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }


  switch(message.type){
      case 'newGraph':
      console.log("Action NEW GRAPH")
      break;

      case 'catchTriplet':
      console.log("Actions catchTriplet from input")
      let triplet = message.triplet;
      if (this.app.url != undefined){
      console.log(this.app.url);
        this.app.sendTripletToEndpoint(triplet);
      }else{
        console.log("Endpoint non défini");
      }
      break;
    
      case 'updateUrl':
      console.log("updateUrl")
      this.app.url = message.url;
      console.log(this.app.url);
      break;



    case 'newActions':
    console.log("Actions from graph")
    let actions = message.actions;
    if (this.app.url != undefined){
    console.log(this.app.url);
      this.app.sendToEndpoint(actions);
    }else{
      console.log("Endpoint non défini");
    }
    break;
    default:
    console.log(message);
  }


};
