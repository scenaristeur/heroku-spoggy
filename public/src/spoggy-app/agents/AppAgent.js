/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function AppAgent(id, app) {
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
AppAgent.prototype = Object.create(eve.Agent.prototype);
AppAgent.prototype.constructor = AppAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
AppAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use AppAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
AppAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );
  this.app.prop1 = message;


  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }

  switch(message.type){
    case 'closeDrawer':
    this.app.closeDrawer();
    break;
    case 'changeMode':
      console.log(message)
    this.app.changeMode(message.mode);
    break;
    case 'setMode':
    console.log(message)

    if (this.app.mode == ""){
      this.app.mode = message.value;
    }

    //  this.agentInput.send('agentApp', {type: "setMode", value: "solo"});
    break;
    //this.agentGlobal.send('agentApp', {type: 'setEndpoint', endpoint: this.endpoint.name });
    case 'setEndpoint' :

    this.app.endpointName = message.value.name;
    break;
    /*  case 'show':
    //    this.agentRecherche.send('agentEndpoints', {type: 'show', element: 'endpointsList' });
    var el = message.element;
    var element = this.app.$[el];
    this.app.showEndpointsList(element);
    break;
    case 'hide':
    //    this.agentRecherche.send('agentEndpoints', {type: 'show', element: 'endpointsList' });
    var el = message.element;
    var element = this.app.$[el];
    this.app.hideEndpointsList(element);
    break; */
    default:
    console.log(message);
  }


};
