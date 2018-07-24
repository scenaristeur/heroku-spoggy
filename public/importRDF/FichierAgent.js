/**
 * Custom agent prototype
 * @param {String} id
 * @constructor
 * @extend eve.Agent
 */
function FichierAgent(id) {
  // execute super constructor
  eve.Agent.call(this, id);

  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
FichierAgent.prototype = Object.create(eve.Agent.prototype);
FichierAgent.prototype.constructor = FichierAgent;

/**
 * Send a greeting to an agent
 * @param {String} to
 */
FichierAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
 * Handle incoming greetings. This overloads the default receive,
 * so we can't use SourceAgent.on(pattern, listener) anymore
 * @param {String} from     Id of the sender
 * @param {*} message       Received message, a JSON object (often a string)
 */
FichierAgent.prototype.receive = function(from, message) {
  // document.write(from + ' said: ' + JSON.stringify(message) + '<br>');
  console.log(from + ' said: ' + JSON.stringify(message) );

  if (message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
  }
};

FichierAgent.prototype.setFile = function(fichier) {
  console.log(this.id +" s'occupe du fichier : "+fichier.name+"\t de type : "+fichier.type);
  var reader = new FileReader();
  reader.addEventListener('load', function() {
  //  console.log(reader.result);
    var extension=fichier.name.split('.').pop();
 //  console.log(reader.result);
    if ((extension=="ttl")||(extension=="n3")||(extension=="n3t")) {
   //   sketch.ttl2Xml(reader.result);
  ttl2Xml(reader.result);
    } else {
    //  sketch.data2Xml(reader.result); //if srdf
    data2Xml(reader.result);
    }
  }
  , false);
  reader.readAsText(fichier);
};
