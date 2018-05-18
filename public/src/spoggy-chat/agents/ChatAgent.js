/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function ChatAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
ChatAgent.prototype = Object.create(eve.Agent.prototype);
ChatAgent.prototype.constructor = ChatAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
ChatAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use ChatAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
ChatAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );
  this.app.prop1 = message;


  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }

  switch(message.type){
    case 'updaterooms':
    console.log(message.rooms);
    console.log(message.current_room);
    this.app.$.inputMessage.label = "Mode Collab, room :"+ message.current_room;
    this.app.$.chat.push('messages',{
      author: 'Spoggy',
      text: "CONNEXION A "+message.current_room,
      created: Date.now()
    });
    break;
    this.agentDialogs.send('agentChat', {type: "changePseudo", pseudo: this.pseudo});
    case 'changePseudo':
    console.log('pseudo : '+message.pseudo);
    this.app.pseudo = message.pseudo;
    break;

    case 'updateChat':
  //  console.log("username "+message.username);
  //  console.log(message.data);
    //  console.log(this.app.socket.username)
  //  console.log("pseudo "+this.app.pseudo)
  //  console.log("author avant "+this.app.author)
    //  this.app.$.inputMessage.label = message.username +" : "+ message.data;
    this.app.$.chat.messages = this.app.messages;
    //test sur message.username
    this.app.author = message.username == this.app.pseudo ? 'me' : 'you'; // For demo
  //  console.log("author apres "+this.app.author)
    if (this.app.author != 'me'){
      message.data = message.username+": "+message.data;
      if(!this.app.visible){
        this.app.nonlu++;
          this.app.icon = "";
      }
    }
    /*if (message.data.length > 40) {
      message.data = message.data.match(/.{1,40}/g).join("\n")
    }*/
    this.app.$.chat.push('messages',{
      author: this.app.author,
      text: message.data,
      created: Date.now()
    });
    break;

    default:
    console.log(message);
  }
};
