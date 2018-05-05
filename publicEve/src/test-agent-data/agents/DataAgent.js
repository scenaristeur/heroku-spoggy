/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function DataAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;

  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
DataAgent.prototype = Object.create(eve.Agent.prototype);
DataAgent.prototype.constructor = DataAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
DataAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use DataAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
DataAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );

  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }


  if (message.type == "chat"){
    this.app.prop1 = message.data;
    let  chatMess=message.data.trim();
    let firstChar = chatMess.charAt(0);
    let inputNewValue = {
      type : "inputNewValue",
      value : ""
    };

    switch(firstChar){
      case '/':
      //    let commande = rdf.quad(rdf.blankNode(), rdf.namedNode('commande'),rdf.literal(chatMess))
      //  this.catchCommande(chatMess,this.network,this);
      this.app.catchCommande(chatMess);
      inputNewValue.value = "";
      break;
      case '.':
      var last = this.app.commandHistory[this.app.commandHistory.length-1];
      inputNewValue.value = last.s+" "+last.p+" "+last.o;
      break;
      case ';':
      var last = this.app.commandHistory[this.app.commandHistory.length-1];
      inputNewValue.value = last.s+" "+last.p+" ";
      break;
      case ',':
      var last = this.app.commandHistory[this.app.commandHistory.length-1];
      inputNewValue.value = last.s+" ";
      break;
      default:
      let lastChar = chatMess.slice(-1);
      let chatMessCut = chatMess.slice(0,-1).split(" ");
      let isTriplet = true;
      switch(lastChar){
        case ';':
        inputNewValue.value = chatMessCut[0]+" ";
        break;
        case ',':
        inputNewValue.value = chatMessCut[0]+" "+chatMessCut[1]+" ";
        break;
        case '-':
        inputNewValue.value = chatMessCut[2]+" ";
        break;
        case '.':
        default:
        console.log("chatMess to chat "+chatMess)
        // this.sendMessage(chatMess);
        this.send('agentComm', 'Hello agentComm! Pourrais -tu transmettre ce chatMess au serveur de chat STP :: ' + chatMess);
        //  this.catchTriplet(chatMess.slice(0,-1), this.network); // A REMPLACER PAR CATCHTRIPLETS V2
        //   this.$.inputMessage.value = "";
        isTriplet = false;
      }

      if (isTriplet){
        let t = {}
        t.s = chatMessCut.shift();
        t.p = chatMessCut.shift();
        t.o = chatMessCut.join(" ");
        if (this.app.commandHistory.length > 10){
          this.app.shift('commandHistory');
        }
        this.app.push('commandHistory',t);
        let triplets = [];
        triplets.push(t)
        // utiliser addActions
        //  this.catchTripletsV2(triplets, this.network);
      //  this.app.catchTriplet(chatMess.slice(0,-1), this.network);
      let catchTriplet = {
        type: 'catchTriplet',
        value: chatMess.slice(0,-1)
      };
      console.log(catchTriplet)
      this.send('agentGraph', catchTriplet);
      }
    }
    this.send('agentInput', inputNewValue);
  }


};
