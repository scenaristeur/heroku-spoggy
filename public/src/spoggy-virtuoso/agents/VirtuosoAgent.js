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

  if (!this.app.virtuosoActif){
    console.log("VIRTUOSO ACTIF = FALSE DANS VIRTUOSO BEHAVIOR A REVOIR ! ")
    return
  }

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
    case 'recherche':
    this.app.recherche(message);
    break;
    case 'testEndpoint':
    this.app.endpoints = message.endpoints;
    this.app.sendPingRequest(message.endpoint);
    break;
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
    //        this.agentGraph.send('agentVirtuoso', {type: "uriEndpoint", params:params});

case 'uriEndpoint':
console.log(message)
this.app.urlEndpoint(message.params)
this.app.endpoint = message.endpoint;
break;
    this.app.url = message.url;
    console.log(this.app.url);
    this.app.sendRequest();
    break;

    case 'explorePersee':
    console.log('explore Persee')
    console.log(message)
    console.log(message.resource);
    console.log(message.url);
    //    this.app.typeResource ='bibo:Collection'
    this.app.url = message.url;


    if (this.app.typeResource =='bibo:Collection'){
      // test de parcours des collections
      this.app.options = {
        query: 'select distinct ?p where {?p a '+this.app.typeResource+' }',
        // SELECT ?s ?p ?o  WHERE { ?s ?p ?o .FILTER regex(str(?s), "alice") .}

        format: 'application/sparql-results+json',
      }
    }else{
      //test sur les documents
      /*  let query =['select distinct ?t ?pO ?tP ?s ?sub ?r',
      'where {',
      '  ?s ?p bibo:Document.',
      '  ?s dcterms:subject ?sub.',
      '  ?s dcterms:abstract ?r.',
      '  ?s dcterms:title ?t.',
      '  ?s dcterms:isPartOf ?pO.',
      '  ?pO dcterms:title ?tP',
      '  filter (lang(?r) = "" || langMatches(lang(?r), "fr"))',
      '  filter (lang(?sub) = "" || langMatches(lang(?sub), "fr"))',
      '}'
    ].join("\n");*/
    /*  let query =['select distinct ?t  ?s ?sub ', //?pO ?tP ?r
    'where {',
    '  ?s ?p bibo:Document.',
    '  ?s dcterms:title ?t.',
    '  ?s dcterms:subject ?sub.',
    //'  ?s dcterms:abstract ?r.',

    //'  ?s dcterms:isPartOf ?pO.',
    //'  ?pO dcterms:title ?tP',
    '  filter (lang(?t) = "" || langMatches(lang(?t), "fr"))',
    // '  filter (lang(?r) = "" || langMatches(lang(?r), "fr"))',
    '  filter (lang(?sub) = "" || langMatches(lang(?sub), "fr"))',
    '} LIMIT 100'
  ].join("\n");*/


  let query = 'select distinct ?s ?t ?sub \
  Where {\
    ?s ?p bibo:Document.\
    ?s dcterms:title ?t.\
    ?s dcterms:subject ?sub.\
    filter (lang(?sub) = "" || langMatches(lang(?sub), "fr"))\
  } LIMIT 100';

  console.log(query)
  this.app.options = {
    //  query: 'select distinct ?p where {?p a '+this.app.typeResource+' }',
    // SELECT ?s ?p ?o  WHERE { ?s ?p ?o .FILTER regex(str(?s), "alice") .}
    query: query,
    format: 'application/sparql-results+json',
  }
}


console.log("sendRequest")
this.app.sendRequestPersee();
break;
case 'clickon':
console.log(message);
//this.app.clickonNode(message.node);
//console.log(this.app.endpoint);
//console.log(message)
this.app.urlEndpoint(message.node)
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

// A REVOIR , test rapide
if (this.app.url == "http://data.persee.fr/sparql"){
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
  console.log("getPerseeDetails")
  this.app.getPerseeDetails();
}else{
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
    console.log("sendRDescribe")
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
    console.log("sendRequest")
    this.app.sendRequest();
  }}
  console.log(this.app.options)
  break;
  default:
  console.log(message);
}


};
