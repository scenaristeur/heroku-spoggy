/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function DialogsAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
DialogsAgent.prototype = Object.create(eve.Agent.prototype);
DialogsAgent.prototype.constructor = DialogsAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
DialogsAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use DialogsAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
DialogsAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );
  this.app.prop1 = message;


  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }


  switch(message.type){
    case 'updaterooms':
    this.app.rooms = message.rooms;
    this.app.current_room = message.current_room;
    console.log("update");
    break;

    case 'initrooms':
    this.app.rooms = message.rooms;

    console.log("init rooms ");
    console.log(message.rooms);
    break;
    case 'toggle':
  //  console.log(message.popup);
    let popup = message.popup;
    let pop = this.app.$[popup];
  //  console.log(pop);
    pop.toggle();
    break;

    case 'updateValueById':
    console.log(message.id + message.value);
    var id = message.id;
    var element = this.app.$[id];
    var value = message.value;
    console.log(element);
    console.log(value);
    element = value;
    console.log(element);
    break;

    case 'setFocus':
    console.log(message.id );
    var id = message.id;
    var element = this.app.$[id];
    var value = message.value;
    element.focus();
    console.log(element);
    break;

    case 'initOptions':
    //      app.agentGraph.send('agentDialogs', {type:'initOptions', repulsion : this.network.physics.options.repulsion});
    console.log(message.repulsion);
    this.app.initOptions(message.repulsion)
    break;

    case 'exportTtl':
    //  this.app.agentGraph.send('agentDialogs', {type:'exportTtl', ttlData : output});
    //  console.log(message);
    this.app.$.popupTtl.toggle();
    this.app.$.inputTextToSave.value = message.ttlData;
    this.app.$.inputFileNameToSaveAs.value ="Spoggy-exportTTL_"+Date.now();
    break;

    case 'exportJsonSolid':
    //  this.app.agentGraph.send('agentDialogs', {type:'exportTtl', ttlData : output});
    //  console.log(message);
    //  this.app.$.popupTtl.toggle();
    //this.app.$.inputTextToSaveJSON.value = message.jsonData;
    this.app.$.inputTextToSaveJSON.value =  JSON.stringify(JSON.parse(message.jsonData), undefined, 4);
    this.app.$.inputFileNameToSaveAsJSON.value ="Spoggy-exportJSON_"+Date.now();
    break;
    default:
    console.log(message);
  }


};
