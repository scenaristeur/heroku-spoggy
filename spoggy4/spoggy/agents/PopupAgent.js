/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
export function PopupAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
PopupAgent.prototype = Object.create(eve.Agent.prototype);
PopupAgent.prototype.constructor = PopupAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
PopupAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use PopupAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
PopupAgent.prototype.receive = function(from, message) {

  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }


  switch(message.type){
    case 'visresults':
    console.log("visresults", message.visresults);
    this.app.updateNetwork(message.visresults);
    break;

    case 'addNode':
    console.log("editNode", message.data);
    this.app.addNode(message.data, message.callback, message.callback2);
    break;
    case 'editNode':
    console.log("editNode", message.data);
    this.app.editNode(message.data, message.callback, message.callback2);
    break;
    case 'addEdge':
    console.log("addEdge", message.data);
    this.app.addEdge(message.data, message.callback, message.callback2);
    break;
    case 'editEdgeWithoutDrag':
    console.log("editEdgeWithoutDrag", message.data);
    this.app.editEdgeWithoutDrag(message.data, message.callback, message.callback2);
    break;


    default:
    console.log(message);
  }
};
