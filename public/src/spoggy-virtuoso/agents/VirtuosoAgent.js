/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function VirtuosoAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app;
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
VirtuosoAgent.prototype = Object.create(eve.Agent.prototype);
VirtuosoAgent.prototype.constructor = VirtuosoAgent;

/**
* Send a greeting to an agent
* @param {String} to
*/
VirtuosoAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};

/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use VirtuosoAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
VirtuosoAgent.prototype.receive = function(from, message) {
  console.log(from + ' said: ' + JSON.stringify(message) );
  this.app.prop1 = message;


  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }


  switch(message.type){
    /*case 'updateEndpoint':
    console.log("updateEndpoint");
    this.app.updateUrls(message.url);
    break;*/

    case 'updateUrl':
    console.log("updateUrl")
    console.log(message)
    this.app.options = {
      //  default-graph-uri:'http%3A%2F%2Fdbpedia.org',
      query: 'select distinct ?Concept where {[] a ?Concept} LIMIT 100',
      format: 'application/sparql-results+json',
      /*  CXML_redir_for_subjs: '121',
      CXML_redir_for_hrefs: '',
      timeout: 30000,
      debug: 'on',
      run: '+Run+Query+'*/
    }
    this.app.url = message.url;
    console.log(this.app.url);
    this.app.sendRequest();
    break;



    case 'describe':
    console.log("describe")
    console.log(message)
    console.log(message.resource);
      console.log(message.url);
    if(message.url!= undefined){
  //au démarrage
    this.app.url = message.url;
    this.app.resource = 'http://fr.dbpedia.org/resource/'+message.resource.trim();
  }else{
        //cas d'une demande depuis on(selectNode) de spoggy-graph --> prefix déjà présent
      this.app.resource = message.resource;
   }
    console.log(this.app.url);
    console.log(this.app.resource);

    if (this.app.resource.length>0){
      this.app.options = {
        //    query: 'DESCRIBE <http://fr.dbpedia.org/resource/'+resource+'> LIMIT 100',
        query : 'SELECT ?s ?p ?o \
        WHERE {\
          { <'+this.app.resource+'> ?p ?o } \
          UNION \
          { ?s ?p <'+this.app.resource+'> } \
        }   LIMIT 100',
        output: 'application/sparql-results+json'
      }
      this.app.sendDescribe();
    }else{
      this.app.options = {
        //  default-graph-uri:'http%3A%2F%2Fdbpedia.org',
        query: 'select distinct ?Concept where {[] a ?Concept} LIMIT 100',
        format: 'application/sparql-results+json',
        /*  CXML_redir_for_subjs: '121',
        CXML_redir_for_hrefs: '',
        timeout: 30000,
        debug: 'on',
        run: '+Run+Query+'*/
      }

      this.app.sendRequest();
    }
console.log(this.app.options)
    break;









    default:
    console.log(message);
  }


};
