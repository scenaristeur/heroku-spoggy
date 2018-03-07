// recupere du projet Github/scenaristeur/Spog

function exportJson(network,app) {
  var filename = prompt("Sous quel nom sauvegarder ce graphe ?", "Spoggy");
  app.$.inputMessage.value = '';
  if (filename == null || filename == "") {
    txt = "User cancelled the prompt.";
    return;
  }
  var textToWrite = "";
  var fileNameToSaveAs = filename+"_spoggy_nodes_edges_" + Date.now() + ".json";
  var textFileAsBlob = "";

  console.log("export Json");
  console.log(network.body.data);
  var nodes_edges = { nodes: network.body.data.nodes.get(), edges: network.body.data.edges.get() };
  console.log(nodes_edges);
  var nodes_edgesJSON = JSON.stringify(nodes_edges);
  console.log(nodes_edgesJSON);
  textFileAsBlob = new Blob([nodes_edgesJSON], {
    type:
    'application/json'
  }
);
var downloadLink = document.createElement("a");
downloadLink.download = fileNameToSaveAs;
downloadLink.innerHTML = "Download File";
if(navigator.userAgent.indexOf("Chrome") != -1)
{
  // Chrome allows the link to be clicked
  // without actually adding it to the DOM.
  console.log("CHROME");
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
} else
{
  // Firefox requires the link to be added to the DOM
  // before it can be clicked.
  console.log("FF");
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  downloadLink.target="_blank";
  //downloadLink.onclick = destroyClickedElement;
  //downloadLink.onclick = window.URL.revokeObjectURL(downloadLink);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  console.log(app.$.popupTtl);
}
console.log(downloadLink);
/*downloadLink.click();*/
/* creation d'un event car download.click() ne fonctionne pas sous Firefox */
var event = document.createEvent("MouseEvents");
event.initMouseEvent(
  "click", true, false, window, 0, 0, 0, 0, 0
  , false, false, false, false, 0, null
);
downloadLink.dispatchEvent(event);
var app = this;
setTimeout(function(){
  console.log(downloadLink.parentNode);
  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(downloadLink);
}, 1000);
/*if (window.URL != null) {
// Chrome allows the link to be clicked
// without actually adding it to the DOM.
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
} else {
// Firefox requires the link to be added to the DOM
// before it can be clicked.
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
downloadLink.onclick = destroyClickedElement;
downloadLink.style.display = "none";
document.body.appendChild(downloadLink);
}
downloadLink.click();*/
}
function exportTtl(network, app) {
  /* source https://github.com/scenaristeur/dreamcatcherAutonome/blob/master/autonome/public/agents/ExportAgent.js */
  app.$.inputMessage.value = '';
  var nodes = network.body.data.nodes.get();
  var edges = network.body.data.edges.get();
  console.log("exportation");
  console.log(nodes);
  console.log(edges);
  //creation des statements (triplets)
  /*var statements = [];
  for (var j = 0; j < edges.length; j++){
  var edge = edges[j];
  console.log(edge);
  statements.push({sujet: node.id, propriete: "rdfs:label", objet: node.label});
}
console.log(statements);*/

var output = "@prefix : <http://smag0.blogspot.fr/spoggy#> . \n";
output += "@prefix owl: <http://www.w3.org/2002/07/owl#> . \n";
output += "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> . \n";
output += "@prefix xml: <http://www.w3.org/XML/1998/namespace> . \n";
output += "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> . \n";
output += "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> . \n";
output += "@prefix smag: <http://smag0.blogspot.fr/spoggy#> . \n";
output += "@base <http://smag0.blogspot.fr/spoggy> . \n";
output += "<http://smag0.blogspot.fr/spoggy> rdf:type owl:Ontology ;  \n";
output += "                    owl:versionIRI <http://smag0.blogspot.fr/spoggy/1.0.0> . \n";
output += " \n";
output += "owl:Class rdfs:subClassOf owl:Thing .  \n";

var listeInfos = new Array();
var listeComplementaire = new Array();

for (var i = 0; i < edges.length; i++) {
  var edge = edges[i];

  var sujet = edge.from;
  var propriete = edge.label;
  var objet = edge.to;


  //string.indexOf(substring) > -1
  //console.log(sujet);
  //console.log(propriete);
  //  console.log(objet);

  // AJOUTER EVENTUELLEMENT LA RECUPERATION DE SHAPE, COLOR, pour l'export RDF
  var sujetLabel = network.body.data.nodes.get(sujet).label;
  var objetLabel = network.body.data.nodes.get(objet).label;
  //console.log("#########################");
  //console.log(sujetLabel);
  //console.log(objetLabel)
  //console.log("#########################");

  var sujetWithPrefix = this.validRdf(network, sujet);
  var proprieteWithPrefix = this.validRdf(network, propriete);
  var objetWithPrefix = this.validRdf(network, objet);

  if (sujetWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
  sujetWithPrefix = ':' + sujetWithPrefix;
}

if (proprieteWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
proprieteWithPrefix = ':' + proprieteWithPrefix;

}

if (objetWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
objetWithPrefix = ':' + objetWithPrefix;
}


var typedeProp = ["owl:AnnotationProperty", "owl:ObjectProperty", "owl:DatatypeProperty"];
var indiceTypeDeProp = 1; // -1 pour ne pas ajouter la prop, sinon par defaut en annotationProperty, 1 pour Object, 2 pour Datatype --> revoir pour les datatypes

if ((proprieteWithPrefix == "type") || (proprieteWithPrefix == ":type") || (proprieteWithPrefix == "rdf:type")) {
  proprieteWithPrefix = "rdf:type";
  listeComplementaire.push(objetWithPrefix + " rdf:type owl:Class . \n");
  indiceTypeDeProp = 1;


} else if ((proprieteWithPrefix == "subClassOf") || (proprieteWithPrefix == ":subClassOf") || (proprieteWithPrefix == "rdfs:subClassOf")) {
  proprieteWithPrefix = "rdfs:subClassOf";

}
else if ((proprieteWithPrefix == "sameAs") || (proprieteWithPrefix == ":sameAs")) {
  proprieteWithPrefix = "owl:sameAs";
  indiceTypeDeProp = -1;
}
else if ((proprieteWithPrefix.toLowerCase() == "ispartof") || (proprieteWithPrefix.toLowerCase() == "partof") || (proprieteWithPrefix.toLowerCase() == ":ispartof") || (proprieteWithPrefix.toLowerCase() == ":partof") || (proprieteWithPrefix.toLowerCase() == ":ispartof")) {
  proprieteWithPrefix = "smag:partOf";
  indiceTypeDeProp = 1;

} else if ((proprieteWithPrefix.toLowerCase() == "comment") || (proprieteWithPrefix.toLowerCase() == "commentaire") || (proprieteWithPrefix.toLowerCase() == "//") || (proprieteWithPrefix.toLowerCase() == "#")) {
  proprieteWithPrefix = "rdfs:comment";
  indiceTypeDeProp = -1;

}


if (indiceTypeDeProp >= 0) {
  listeComplementaire.push(proprieteWithPrefix + " rdf:type " + typedeProp[indiceTypeDeProp] + " . \n");
}
var data = sujetWithPrefix + " " + proprieteWithPrefix + " " + objetWithPrefix + " . \n";
data += sujetWithPrefix + " " + "rdfs:label \"" + sujetLabel + "\" . \n";
data += objetWithPrefix + " " + "rdfs:label \"" + objetLabel + "\" . \n";
listeInfos[i] = data;
console.log(data);
console.log("||||||||||||||||||||||--");
}
//console.log(listeInfos);
//console.log(listeComplementaire);
//suppression des doublons
listeInfos = uniq_fast(listeInfos.sort());
listeComplementaire = uniq_fast(listeComplementaire.sort());
// console.log (listeInfos);
for (var k = 0; k < listeInfos.length; k++) {
  output = output + listeInfos[k];
  //  console.log(output);
}

for (var l = 0; l < listeComplementaire.length; l++) {
  output = output + listeComplementaire[l];
  //  console.log(output);
}


app.$.inputTextToSave.value = output; //     document.getElementById("inputTextToSave").value =output;
/*this.$.popupTtl.fitInto = this.$.menu;*/
app.$.popupTtl.toggle();
}
/*
function saveTextAsFile(){
var textToWrite="";
var fileNameToSaveAs="";
var textFileAsBlob="";
var extension="ttl";
var nomFichier="";

console.log(data);

if((typeof data != "undefined")&& (data.length>0)){
textToWrite=data;
}else{

textToWrite = this.$.inputTextToSave.value;    //textToWrite = document.getElementById("inputTextToSave").value;
}

if ((typeof nomFichier != "undefined") && (nomFichier.length>0)){
fileNameToSaveAs = nomFichier+"."+extension;
}else{
fileNameToSaveAs = this.$.inputFileNameToSaveAs.value+"."+extension; // fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value+"."+extension;
}


if ((typeof extension != "undefined") && (extension.length>0)){
switch(extension){
case "ttl" :
textFileAsBlob = new Blob([textToWrite], {
type:
'text/turtle'
}
);
break;
case "rdf" :
//pas implementé pour l'instant
textFileAsBlob = new Blob([textToWrite], {
type:
'application/rdf+xml'
}
);
break;
default :
console.log("non traite  , extension : "+extension);
break;
}
}


console.log(nomFichier+" : "+extension);



var downloadLink = document.createElement("a");
downloadLink.download = fileNameToSaveAs;
downloadLink.innerHTML = "Download File";
//console.log(window.URL);
//if (window.URL != null)
if(navigator.userAgent.indexOf("Chrome") != -1)
{
// Chrome allows the link to be clicked
// without actually adding it to the DOM.
console.log("CHROME");
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
} else
{
// Firefox requires the link to be added to the DOM
// before it can be clicked.
console.log("FF");
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
downloadLink.target="_blank";
//downloadLink.onclick = destroyClickedElement;
//downloadLink.onclick = window.URL.revokeObjectURL(downloadLink);
downloadLink.style.display = "none";
document.body.appendChild(downloadLink);
console.log(this.$.popupTtl);
}
console.log(downloadLink);
//downloadLink.click();
// creation d'un event car download.click() ne fonctionne pas sous Firefox
var event = document.createEvent("MouseEvents");
event.initMouseEvent(
"click", true, false, window, 0, 0, 0, 0, 0
, false, false, false, false, 0, null
);
downloadLink.dispatchEvent(event);
var app = this;
setTimeout(function(){
document.body.removeChild(downloadLink);
window.URL.revokeObjectURL(downloadLink);
}, 100);
}*/

function validRdf(network, string){
  // A REVOIR
  console.log(network.body.data.nodes.get(string));
  console.log("nettoyage "+ string);
  // transformer le noeud en noeud rdf (resource ou literal)
  // ajouter la construction du noeud, son uri, prefix, localname, type...
  var valid = "";
  valid.type = "uri";
  if (string.indexOf(" ") !== -1){
    valid.type = "literal";
  }else{
    /*
    replaceAll(string, " ","_");
    replaceAll(string, "","_");
    replaceAll(string, ",","_");
    replaceAll(string, ";","_");
    replaceAll(string, " ","_");*/
  }

  return string;
}

function importJson(network,app){
  //app = app;
  //document.getElementById('importPopUp').style.display = 'block';
  app.$.importPopUp.style.display = 'block';

  var filepicker = app.$.filepicker;
  filepicker.addEventListener('change', handleFileSelect.bind(app), false);
  filepicker.network = network;
}

function connectBase(network,app){
  console.log(app.socket);
  app.socket.emit('initDb');
  app.$.inputMessage.value = "";

  /*  //document.getElementById('importPopUp').style.display = 'block';
  app.$.importPopUp.style.display = 'block';

  var filepicker = app.$.filepicker;
  filepicker.addEventListener('change', handleFileSelect.bind(app), false);
  filepicker.network = network;*/
}

function newGraph(network,app){
  //network.body.data.nodes.clear();
  //network.body.data.edges.clear();
  app.$.inputMessage.value = "";

  var graphname = prompt("Comment nommer ce nouveau graphe ?", "Spoggy-Graph_"+Date.now());
  var nodeName = {
    label: graphname,
    shape: "star",
    color: "green",
    type: "node"
  };
  var nodeGraph = {
    label: "Graph",
    /*    shape: "star",
    color: "red",*/
    type: "node"
  };
  network.body.data.nodes.clear();
  network.body.data.edges.clear();
  var nodes = network.body.data.nodes.add([nodeName, nodeGraph]);

  var edge = {
    from: nodes[0],
    to: nodes[1],
    arrows: "to",
    label: "type"
  }
  network.body.data.edges.add(edge);

  var action = {};
  action.type = "newNode";
  action.data = nodeName;
  app.addAction(action);

  action = {};
  action.type = "newNode";
  action.data = nodeGraph;
  app.addAction(action);

  action = {};
  action.type = "newEdge";
  action.data = edge;
  app.addAction(action);

  action = {};
  action.type = "changeGraph";
  action.data = graphname;
  app.addAction(action);
  app.socket.graph = graphname;
  console.log(app.socket);

  //app.socket.emit('newGraph', graphname);
  /*
  //document.getElementById('importPopUp').style.display = 'block';
  app.$.importPopUp.style.display = 'block';

  var filepicker = app.$.filepicker;
  filepicker.addEventListener('change', handleFileSelect.bind(app), false);
  filepicker.network = network;*/
}

function importFromParam(params, network, app){
  var source = params.source;
  console.log(source);
  console.log(network);

  var output = [];

  console.log(source);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', source, true);
  xhr.responseType = 'blob';

  xhr.onload = function(e) {
    console.log(e);
    var reponse = e.target.response;

    console.log(reponse);
    var reader = new FileReader(); //https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/l-api-file
    reader.addEventListener('load', function () {
      console.log(reader.result);
      var nodes = JSON.parse(reader.result).nodes;
      //    console.log(nodes);
      var edges = JSON.parse(reader.result).edges;
      //    console.log(edges);
      network.beforeImport = [];
      network.beforeImport.nodes = network.body.data.nodes.get();
      network.beforeImport.edges = network.body.data.edges.get();
      network.body.data.nodes.update(nodes);
      network.body.data.edges.update(edges);

      try{
        network.body.data.nodes.update(nodes);
        network.body.data.edges.update(edges);
      }
      catch(e){
        console.log(e);
      }

      //  console.log(network);
      //  console.log(partageImport);
    });
    reader.readAsText(reponse);
  };
  xhr.send();
}

function handleFileSelect(evt) {
  var app = this;
  var network = evt.target.network;
  var partageImport = app.$.partageImport.checked;
  var remplaceNetwork = app.$.remplaceNetwork.checked;
  var files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0; i < files.length; i++) {
    // Code to execute for every file selected
    var fichier = files[i];
    console.log(fichier);



    decortiqueFile(fichier, network, remplaceNetwork);
  }
  console.log("fin");
  // Code to execute after that
  evt.target.files = null;
  app.$.importPopUp.style.display = 'none';
  app.$.inputMessage.value = '';
}

function decortiqueFile(fichier, network, remplaceNetwork){
  //  var network = network;
  //  console.log(network);

  //  console.log(fichier);
  var reader = new FileReader(); //https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/l-api-file
  reader.addEventListener('load', function () {
    //  console.log(fichier);
    /*loadstart : La lecture vient de commencer.
    progress : Tout comme avec les objets XHR, l'événement progress se déclenche à intervalles réguliers durant la progression de la lecture. Il fournit, lui aussi, un objet en paramètre possédant deux propriétés, loaded et total, indiquant respectivement le nombre d'octets lus et le nombre d'octets à lire en tout.
    load : La lecture vient de se terminer avec succès.
    loadend : La lecture vient de se terminer (avec ou sans succès).
    abort : Se déclenche quand la lecture est interrompue (avec la méthode abort() par exemple).
    error : Se déclenche quand une erreur a été rencontrée. La propriété error contiendra alors un objet de type FileError pouvant vous fournir plus d'informations.*/
    //    console.log(this.result);
    //alert('Contenu du fichier "' + fichier.name + '" :\n\n' + reader.result);


    switch (fichier.type) {
      case "":
      case "text/plain":
      case "application/json":
      //    console.log("JSON");
      //  thisElement.dispatch('addNodesEdgesJSON', JSON.parse(reader.result));
      //    console.log(network);
      var nodes = JSON.parse(reader.result).nodes;
      //    console.log(nodes);
      var edges = JSON.parse(reader.result).edges;
      //    console.log(edges);
      network.beforeImport = [];
      network.beforeImport.nodes = network.body.data.nodes.get();
      network.beforeImport.edges = network.body.data.edges.get();
      network.body.data.nodes.update(nodes);
      network.body.data.edges.update(edges);
      if(remplaceNetwork){
        console.log(remplaceNetwork);
        network.body.data.nodes.clear();
        network.body.data.edges.clear();
        console.log("clear");
        network.body.data.nodes.add(nodes); // clear() ne semble pas fonctionner, à revoir
        network.body.data.edges.add(edges);
        console.log(network);
      }else{

        try{
          network.body.data.nodes.update(nodes);
          network.body.data.edges.update(edges);
        }
        catch(e){
          console.log(e);
        }
      }
      console.log(network);
      //  console.log(partageImport);
      break;
      case "rdf+xml":
      case "application/rdf+xml":
      console.log("fichier RDF"); //https://github.com/scenaristeur/dreamcatcherAutonome/blob/8376cb5211095a90314e34e9d286b820fbed335b/autonome1/public/agents/FichierAgent.js
      rdf2Xml(reader.result, network);
      //  network.dispatch('addTriplets', network.triplets);// CREER UNE NOUVELLE ACTION POUR ENVOYER TS LES TRIPLETS
      break;
      case "turtle":
      case "text/turtle":
      case "application/turtle":
      console.log("fichier turtle");
      console.log("ce type de fichier n'est pas pris en compte (" + fichier.type + ")");
      ttl2Xml(reader.result, network);
      //network.dispatch('addTriplets', network.triplets);
      break;
      default:
      console.log("ce type de fichier n'est pas pris en compte (" + fichier.type + ")");
      var extension = fichier.name.split('.').pop();
      console.log(extension);
      console.log(fichier);
      //  console.log(reader.result);
      if ((extension == "ttl") || (extension == "n3") || (extension == "n3t")) {
        //   sketch.ttl2Xml(reader.result);
        ttl2Xml(reader.result, network);
        //  network.dispatch('addTriplets', network.triplets);
      } else if ((extension == "rdf") || (extension == "owl")) {
        //  sketch.data2Xml(reader.result); //if srdf
        rdf2Xml(reader.result, network);
        //  network.dispatch('addTriplets', network.triplets);
      }
      else if ((extension == "json") || (reader.result.startsWith("[{"))) {
        // json2Xml(reader.result);
        //  network.dispatch('addNodesEdgesJSON', JSON.parse(reader.result));
      } else {
        data2Xml(reader.result, network);
      }
      console.log("fichier lu");
    }

    // thisApp.dispatch('update_triplets2add', this.triplets2add);

  });
  console.log(fichier);

  reader.readAsText(fichier);


}

function uniq_fast(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for(var i = 0; i < len; i++) {
    var item = a[i];
    if(seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}


function rdf2Xml(data, network){
  // reprise de https://github.com/scenaristeur/graphe/blob/master/js/conversion.js
  console.log(data);
  var triplets = [];

  if (window.DOMParser)
  {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(data, "text/xml");
  }
  else // Internet Explorer
  {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    xmlDoc.loadXML(data);
  }
  //  console.log(xmlDoc.childNodes);

  for(var i = 0; i< xmlDoc.childNodes.length; i++){
    var element = xmlDoc.childNodes[i];
    //    console.log(element);
    var name = element.nodeName;
    var type = element.nodeType;
    var value = element.nodeValue;

    switch(type){
      case 1 :
      triplets = parseRdfNode(element, triplets);
      break;
      case 8 :
      //   console.log("Commentaire");
      //   console.log(element);
      break;
      case 10 :
      //   console.log("DOCTYPE");
      //   console.log(element);
      break;
      default :
      console.log("non traite 1 , type : "+type);
      //  console.log(type +" "+name+" "+value);
      //    console.log(element);
      break;
    }
  }

  console.log(triplets);
  //destinataire.triplets=triplets;
  if(remplaceNetwork.checked){
    console.log(remplaceNetwork.checked);
    network.body.data.nodes.clear();
    network.body.data.edges.clear();
    console.log("clear");

    var nodes =[];
    var edges = [];
    triplets.forEach(function(t){
      console.log(t);

      var nS = {};
      nS.label = t.sujet;
      //network.body.data.nodes.add(nS);
      var nO = {};
      nO.label = t.objet;
      //  network.body.data.nodes.add(nO);
      //  addNodeIfNotExist(network, nS);
      //  addNodeIfNotExist(network, nO);
      var nodeSujet = [] , nodeObjet =[] ;
      var existSujet = false;
      var existObjet = false;
      try{
        existSujet = network.body.data.nodes.get({
          filter: function(node){
            //    console.log(node);
            return (node.label == nS.label);
          }
        });
        console.log(existSujet);
        if (existSujet.length == 0){
          console.log("n'existe pas")
          nodeSujet = network.body.data.nodes.add(nS);
        }else{
          console.log("existe")
          //s'il existe déjà, ne serait-ce pas un renommage ?
          //  console.log("renomme");
          //  console.log(data);
          //existNode[0].label = data.label;
          //  editNode(data, null);
          //  console.log(this.network.body.data.nodes);
          //  nodeSujet =   network.body.data.nodes.update(nS);
          nodeSujet[0] = existSujet[0].id;
        }
      }
      catch (err){
        console.log(err);
      }
      try{
        existObjet = network.body.data.nodes.get({
          filter: function(node){
            //    console.log(node);
            return (node.label == nO.label);
          }
        });
        console.log(existObjet);
        if (existObjet.length == 0){
          console.log("n'existe pas")
          nodeObjet = network.body.data.nodes.add(nO);
        }else{
          console.log("existe")
          //s'il existe déjà, ne serait-ce pas un renommage ?
          //  console.log("renomme");
          //  console.log(data);
          //existNode[0].label = data.label;
          //  editNode(data, null);
          //  console.log(this.network.body.data.nodes);
          //nodeObjet =   network.body.data.nodes.update(nO);
          nodeObjet[0] = existObjet[0].id;
        }
      }
      catch (err){
        console.log(err);
      }

      console.log(nodeSujet);
      console.log(nodeObjet);
      var edge = {};
      edge.from = nodeSujet[0];
      edge.to = nodeObjet[0];
      edge.label = t.propriete;
      console.log(edge);


      //  addEdgeIfNotExist(network, edge)
      network.body.data.edges.add(edge);
    });


    //  network.body.data.nodes.add(nodes); // clear() ne semble pas fonctionner, à revoir
    //  network.body.data.edges.add(edges);
    console.log(network);
  }else{

    try{
      network.body.data.nodes.update(nodes);
      network.body.data.edges.update(edges);
    }
    catch(e){
      console.log(e);
    }
  }
  console.log(network);


}


function ttl2Xml(data,network){
  // reprise de https://github.com/scenaristeur/graphe/blob/master/js/conversion.js
  console.log(data);
  var triplets = [];
  var prefixes=[];
  var base="";
  var separateur="";
  var lignes=data.split("\n");
  for (var i=0; i<lignes.length; i++){
    var ligne=lignes[i];
    //  console.log("--> "+ligne);
    if (ligne.startsWith("@prefix ")) {

      var lignePrefix=ligne.split("@prefix ");
      var lignePrefixCuted=lignePrefix[1].split(": ");
      var prefix=lignePrefixCuted[0].trim();
      var vpWithPoint=lignePrefixCuted[1].trim();
      var valeurPrefix = vpWithPoint.substring(0, vpWithPoint.length-1).trim();
      //   console.log(prefix+" --> "+valeurPrefix);

      if(prefix==""){
        prefix=":";
      }
      prefixes.push(prefix, valeurPrefix);

    }
    else if (ligne.startsWith("@base ")) {
      // console.log(ligne);
      base=ligne.split("@base ")[1].trim();
      base=base.substring(0, base.length-1).trim();
      // console.log("BASE => "+base);
    }else {
      ligne=ligne.trim();
      var ligneSplit=ligne.split(" ");

      if(ligneSplit.length>1){
        //   console.log(ligneSplit.length);
        //   console.log(ligneSplit);

        var ligneValide=false;
        switch(ligneSplit.length) {
          case 5:
          //   console.log("A g�rer, import avec graphe ?");
          ligneValide=false;
          break;
          case 4:
          sujet=ligneSplit[0];
          propriete=ligneSplit[1];
          objet=ligneSplit[2];
          separateur=ligneSplit[3];
          ligneValide=true;
          break;
          case 3 :
          if (separateur==";") {
            propriete=ligneSplit[0];
            objet=ligneSplit[1];
            separateur=ligneSplit[2];
            ligneValide=true;
          } else {
            ligneValide=false;
            //     console.log("PB avec ligneSplit 3");
          }
          break;
          case 2:
          if (separateur==",") {
            objet=ligneSplit[0];
            separateur=ligneSplit[1];
            ligneValide=true;
          } else {
            ligneValide=false;
            //   console.log("PB avec ligneSplit2");
          }
          break;
          case 1:
          ligneValide=false;
          // console.log("un seul champ pour ligneSplit -> pas d'info");
          break;
          default :
          ligneValide=false;
          //   console.log("pb de ligne");
          //   sketch.ajouteInformation("smag:"+sujet, "rdf:type", "smag:"+message);
        }
      }


      if (ligneValide) {
        if (sujet.indexOf(":")  == 0 ){
          sujet=sujet.substring(1);
        }
        if (propriete.indexOf(":")  == 0 ){
          propriete=propriete.substring(1);
        }
        if (objet.indexOf(":")  == 0 ){
          objet=objet.substring(1);
        }

        //   console.log(" => "+sujet+" "+propriete+" "+objet);
        //ajouteInformation(sujet, propriete, objet);
        //  var newStatement = new Statement(sujet, propriete,objet);
        //  newStatement.add2Statements();
        var triplet = {sujet: sujet, propriete:propriete, objet:objet};
        // this.push('triplets', triplet);
        triplets.push(triplet);
      }
      ligneValide=false;
    }

  }
  console.log(triplets);

  triplets.forEach(function(t) {
    console.log(t);
    var s = t.sujet;
    var p = t.propriete;
    var o = t.objet;

    var nodeSujetTemp = {
      label: s,

      type: "node"
    };
    var nodeObjetTemp = {
      label: o,

      type: "node"
    };

    addNodeIfNotExist(network, nodeSujetTemp);
    addNodeIfNotExist(network, nodeObjetTemp);

    var nodeSujet = network.body.data.nodes.get({
      filter: function(node){
        //    console.log(node);
        return (node.label == s );
      }
    });
    var nodeObjet = network.body.data.nodes.get({
      filter: function(node){
        //    console.log(node);
        return (node.label == o );
      }
    });

    var sujetId , objetId;
    //  console.log("8888888888888888888888888888888888888");
    if(nodeSujet.length>0){
      console.log("sujet exist "+s);
      nodeSujet = nodeSujet[0];
      sujetId = nodeSujet.id;
    }
    if(nodeObjet.length>0){
      console.log("objet exist "+o);
      nodeObjet = nodeObjet[0];
      objetId = nodeObjet.id;
    }
    console.log(nodeSujet);
    console.log(nodeObjet);
    //console.log("8888888888888888888888888888888888888");


    var edge = {
      from: sujetId,
      to: objetId,
      arrows: "to",
      label: p
    }
    network.body.data.edges.add(edge);

    //  addEdgeIfNotExist(network, edge);
    /*

    var nodeSujet = network.body.data.nodes.get({
    filter: function(node){
    //    console.log(node);
    return (node.label == s );
  }
});
var nodeObjet = network.body.data.nodes.get({
filter: function(node){
//    console.log(node);
return (node.label == o );
}
});
console.log("8888888888888888888888888888888888888");
if(nodeSujet.length>0){
console.log("sujet exist "+s);
nodeSujet = nodeSujet[0];
}
if(nodeObjet.length>0){
console.log("objet exist "+o);
nodeObjet = nodeObjet[0];
}
console.log(nodeSujet);
console.log(nodeObjet);
console.log("8888888888888888888888888888888888888");


addNodeIfNotExist(network, nodeSujetTemp);
addNodeIfNotExist(network, nodeObjetTemp);




var edge = {
from: nodeSujet.id,
to: nodeObjet.id,
arrows: "to",
label: p
}
addEdgeIfNotExist(network, edge);*/
/*******************************************************
var nodeSujetTemp = {
label: s,

type: "node"
};
var nodeObjetTemp = {
label: o,

type: "node"
};

network.body.data.nodes.add(nodeSujetTemp);
network.body.data.edges.add(nodeObjetTemp);
//  var nodes = network.body.data.nodes.add([nodeName, nodeGraph]);
//  console.log(nodes);
var nodeSujet = network.body.data.nodes.get({
filter: function(node){
//    console.log(node);
return (node.label == s );
}
});
var nodeObjet = network.body.data.nodes.get({
filter: function(node){
//    console.log(node);
return (node.label == o );
}
});

var edge = {
from: nodeSujet.id,
to: nodeObjet.id,
arrows: "to",
label: p
}
network.body.data.edges.add(edge);*//////////////////////////////////

/*
var action = {};
action.type = "newNode";
action.data = nodeName;
app.addAction(action);

action = {};
action.type = "newNode";
action.data = nodeGraph;
app.addAction(action);

action = {};
action.type = "newEdge";
action.data = edge;
app.addAction(action);*/




});
console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& MISE A JOUR DU GRAPHE TTL 2 XML 1");
var nodes = new vis.DataSet([
  {id: "whd", label: 'whd', color: 'rgb(195,238,0)'},
  {id: "wfd", label: 'wfd', color: 'rgba(97,238,195,0.5)'}/*,
  {id: "node3", label: 'David'},
  {id: "node4", label: 'Bob'},
  {id: "node5", label: 'Graph', color: 'rgba(195,238,97,0.5)', cid:2},
  {id: "node6", label: 'Spoggy est une application multiutilisateurs\n permettant la création de graphes de connaissance.\n Cliquez sur le bouton Edit\n pour ajouter / modifier un noeud ou un lien.', color: 'rgba(238,97,195,0.5)', shape: 'box', cid:1},
  {id: "node7", label: 'Description', color: 'rgba(238,97,195,0.5)', cid:1},
  {id: "node8", label: 'Un graphe est un ensemble de noeuds\n et de liens entre ces noeuds.', color: 'rgba(238,97,195,0.5)', shape: 'box', cid:1},
  {id: "node9", label: 'graph0', color: 'rgba(238,97,195,0.5)', type: 'graph', name: 'graph0'},
  {id: "node10", label: 'graph1', color: 'rgba(238,97,195,0.5)', type: 'graph', name: 'graph1'},
  {id: "node11", label: 'graph2', color: 'rgba(238,97,195,0.5)', type: 'graph', name: 'graph2'},*/
]);

// create an array with edges
var edges = new vis.DataSet([
  {from: "whd", to: "wfd", label: "type", array:"to"}/*,
  {from: "node1", to: "node3", label: "developpeur", array:"to"},
  {from: "node3", to: "node4", label: "connait", array:"to"},
  {from: "node1", to: "node5", label: "hasPart", array:"to"},
  {from: "node1", to: "node6", label: "description", array:"to"},
  {from: "node6", to: "node7", label: "type", array:"to"},
  {from: "node5", to: "node8", label: "description", array:"to"},
  {from: "node8", to: "node7", label: "type", array:"to"},
  {from: "node9", to: "node5", label: "type", array:"to"},
  {from: "node10", to: "node5", label: "type", array:"to"},
  {from: "node11", to: "node5", label: "type", array:"to"},
  {from: "node1", to: "node9", label: "first", array:"to"},*/

]);


network.body.data.nodes.update(nodes);
network.body.data.edges.update(edges);
//  destinataire.triplets=this.triplets;
}

/////////////////////////////////////////
// OUTILS PARSING
////////////////////////////////////////


function parseRdfNode(data, triplets){
  var parsingMethod=["owl","rdf"];
  var pMi=0; //Parsing Method indice owl /rdf...
  var ontologie="";
  var title="";
  var description="";
  var classes=[];
  var namedIndividuals=[];
  var objectProperties=[];
  var datatypeProperties=[];
  var comments=[];
  //    console.log(data.childNodes);
  for(var i = 0; i< data.childNodes.length; i++){
    var element = data.childNodes[i];
    var name = element.nodeName;
    var type = element.nodeType;
    var value = element.nodeValue;

    console.log(element);

    switch(type){
      case 1 :
      switch (name){
        case "owl:Ontology" :
        try{
          ontologie=element.getAttribute("rdf:about");
          title=element.getAttribute("dc:title");
          description=element.getAttribute("dc:description");
        }
        catch(err)
        {
          pMi++;
          console.log("changement parsing method : "+parsingMethod[pMi]+" "+err);
          element.attributes["rdf:about"].nodeValue;

        }

        console.log(ontologie);

        break;
        case "owl:AnnotationProperty" :
        //    console.log(type +" "+name+" "+value);
        //    console.log(element);
        console.log("non traite 7 ");
        break;
        case "owl:Class" :
        // console.log(type +" "+name+" "+value);
        // console.log("non traite 8 ");
        // console.log(element);
        triplets = parseRdfsClass(element, triplets);
        break;
        case "rdfs:Class" :
        triplets = parseRdfsClass(element, triplets);
        break;
        case "rdf:Property" :
        //      console.log(type +" "+name+" "+value);
        //    console.log(element);
        console.log("non traite 5 ");
        break;
        case "owl:ObjectProperty" :
        // console.log(type +" "+name+" "+value);
        // console.log("non traite 4 ");
        // console.log(element);
        triplets = parseObjectProperty(element, triplets);
        break;
        case "owl:DatatypeProperty" :
        //    console.log(type +" "+name+" "+value);
        console.log("non traite 9 ");
        //    console.log(element);
        break;

        case "owl:NamedIndividual" :
        // console.log(type +" "+name+" "+value);
        // console.log("non traite 8 ");
        // console.log(element);
        triplets = parseOwlNamedIndividual(element, triplets);
        break;
        default :
        console.log("traitement parseRdfOther : "+name);
        console.log(type +" "+name+" "+value);
        console.log(element);
        triplets = parseRdfOther(element, triplets);
        break;
      }
      break;
      case 3 :
      if(value.trim() != ""){
        //  console.log(type +" "+name+" "+value);
      }
      break;
      case 8 :
      // console.log("Commentaire");
      // console.log(element);
      break;
      default :
      console.log("non traite 2 , type : "+type);

      //  console.log(type +" "+name+" "+value);
      //  console.log(element);
      break;
    }



  }

  console.log(ontologie);
  console.log(title);
  console.log(description);
  return triplets;
}

function parseObjectProperty(data, triplets){
  var propertyUri=data.getAttribute("rdf:about");
  var propertyLabel=data.getAttribute("rdfs:label");
  var propertyComment=data.getAttribute("rdfs:comment");
  var laClasse=data.nodeName;

  if (propertyUri.indexOf("#")>0){
    sujetPrefix=propertyUri.split("#")[0];
    sujet=propertyUri.split("#")[1];
  }
  if (laClasse.indexOf(":")>0){
    objetPrefix=laClasse.split(":")[0];
    objet=laClasse.split(":")[1];
  }

  if (data.childNodes.length>0){
    for(var i = 0; i< data.childNodes.length; i++){
      var element = data.childNodes[i];
      var nodeType= element.nodeType;
      //  console.log(element);
      var propriete=element.localName;
      if (nodeType==1){
        //  console.log(sujet+" "+propriete+" "+objet);
        //  var newStatement = new Statement(sujet, propriete,objet);
        //  newStatement.add2Statements();
        var triplet = {sujet: sujet, propriete: propriete, objet:objet};
        //this.push('triplets', triplet);
        triplets.push(triplet);
      }
    }
  }
  return triplets;
}

function parseOwlNamedIndividual(data, triplets){
  //  console.log("-----------------------------\n--------------------\n");
  //  console.log(data);
  var individualUri=data.getAttribute("rdf:about");
  var individualLabel=data.getAttribute("rdfs:label");
  var individualComment=data.getAttribute("rdfs:comment");
  var laClasse=data.nodeName;
  // console.log(data.childNodes);
  //  console.log("traitement de "+individualUri);

  if (individualUri.indexOf("#")>0){
    sujetPrefix=individualUri.split("#")[0];
    sujet=individualUri.split("#")[1];
  }
  if (laClasse.indexOf(":")>0){
    objetPrefix=laClasse.split(":")[0];
    objet=laClasse.split(":")[1];
  }
  // creation du sujet en tant qu'individual
  //  var newStatement = new Statement(sujet, "type", laClasse);
  //  newStatement.add2Statements();

  if (data.childNodes.length>0){
    for(var i = 0; i< data.childNodes.length; i++){
      var element = data.childNodes[i];
      var nodeType= element.nodeType;

      if (nodeType!=3){
        //   console.log(element);
        var propriete=element.localName;
        var objetInside="";
        if (typeof element.attributes["rdf:resource"] !="undefined"){
          objetInside=element.attributes["rdf:resource"].value;
          var objetInsidePrefix="";
          if (objetInside.indexOf("#")>0){
            objetInsidePrefix=objetInside.split("#")[0];
            objetInside=objetInside.split("#")[1];
          }
        }else{
          objetInside=element.innerHTML;
        }
        //  console.log(sujet+" "+propriete+" "+objetInside);
        //  var newStatement = new Statement(sujet, propriete, objetInside);
        //  newStatement.add2Statements();
        //var triplet = new Triplet(sujet, propriete,objetInside);
        var triplet = {sujet: sujet, propriete: propriete, objet: objetInside};
        //  this.push('triplets', triplet);
        triplets.push(triplet);
      }
    }
  }
  return triplets;
}


function parseRdfOther(data, triplets){
  console.log("RDF PARSE OTHER");
  console.log(data);
  if (data.attributes.length > 0){
    //  console.log("ATTRIBUTS :"+data.attributes.length);
    //  console.log(data.attributes);
    Array.prototype.slice.call(data.attributes).forEach(function(item) { //https://davidwalsh.name/javascript-attributes
      //    console.log("traitement : "+data.nodeName+" -> "+item.name + '= '+ item.value);
      if (item.value.trim() !="" && (item.name == "rdf:about" || item.name == "rdf:resource")){
        var t1 = {sujet: item.value, propriete: "rdf:type", objet: data.nodeName};
        triplets.push(t1);
/*
        var t2 = {sujet: data.nodeName, propriete: item.name, objet: item.value};
        triplets.push(t2);*/

      }else{
        var triplet = {sujet: data.nodeName, propriete: item.name, objet: item.value};
        triplets.push(triplet);
      }


    });

  }
  if (data.childNodes.length > 0){
    console.log("CHILDS :");
    data.childNodes.forEach(function(c) {
    //  if(c.nodeValue!= undefined && c.nodeValue.trim().length>0){
        console.log(data.nodeName);
        console.log(c);
        console.log("########################## "+data.nodeName +" -> "+ c.nodeName+ " -> "+c.nodeValue );
        var triplet = {sujet: data.nodeName, propriete: c.nodeName, objet: c.nodeValue};
        triplets.push(triplet);
    //  }



      /*var triplet = {sujet: data.nodeName, propriete: c.nodeName, objet: item.value};
      triplets.push(triplet);*/

      //  parseRdfNode(c, triplets) ou //  parseRdfOther(c, triplets); //recuperer les ATTRIBUTS
    });
  }
  triplets = parseRdfNode(data, triplets)
  //var triplet = {sujet: sujet, propriete: propriete, objet: objet};

  //triplets.push(triplet);
  // nécessaire pour continuer à descendre ? ou intégrer dans parseRdfOther ? parseRdfNode(element, triplets)

  console.log(triplets);

  return triplets;
}

function parseRdfsClass(data, triplets){
  //  console.log("-----------------------------\n--------------------\n");
  //  console.log(data);
  var classUri=data.getAttribute("rdf:about");
  var classLabel=data.getAttribute("rdfs:label");
  var classComment=data.getAttribute("rdfs:comment");
  var laClasse=data.nodeName;
  //  console.log(data.childNodes);
  if (data.childNodes.length>0){
    for(var i = 0; i< data.childNodes.length; i++){
      var element = data.childNodes[i];
      var name = element.nodeName;
      var localName= element.localName;
      var type = element.nodeType;
      var innerhtml=element.innerHTML;
      var value = element.nodeValue;
      var statementSujet="";
      var statementPropriete="";
      var statementObjet="";


      switch(type){
        case 1 :
        if ((typeof classLaber != "undefined") && (classLabel!="")&&(classLabel.trim()=="")){
          statementSujet=classLabel ;
        }else{
          statementSujet=classUri;
        }
        statementPropriete=localName;
        statementObjet=innerhtml;
        //    console.log(statementSujet+" -> "+statementPropriete+" -> "+statementObjet);
        //  var newStatement = new Statement(statementSujet, statementPropriete,statementObjet);
        //  newStatement.add2Statements();
        //  var triplet = new Triplet(statementSujet, statementPropriete,statementObjet);
        var triplet = {sujet: statementSujet, propriete: statementPropriete, objet: statementObjet};
        //  this.push('triplets', triplet);
        triplets.push(triplet);
        break;
        case 3 :
        if(value.trim() != ""){
          console.log(type +" "+name+" "+value);
        }
        break;
        // case 8 :
        // console.log("Commentaire");
        // console.log(element);
        // break;
        default :
        console.log("non traite 4 , type : "+type);
        console.log(type +" "+name+" "+value);
        console.log(element);
        break;
      }
    }
  }
  else{
    //  console.log("traitement de "+classUri);
    var sujet ="";
    var sujetPrefix = "";
    var objet="";
    var objetPrefix="";
    var propriete = "type";
    if (classUri.indexOf("#")>0){
      sujetPrefix=classUri.split("#")[0];
      sujet=classUri.split("#")[1];
    }
    if (laClasse.indexOf(":")>0){
      objetPrefix=laClasse.split(":")[0];
      objet=laClasse.split(":")[1];
    }
    //  console.log(sujet+" "+propriete+" "+objet);
    //  var newStatement = new Statement(sujet, propriete,objet);
    //  newStatement.add2Statements();
    var triplet = {sujet: sujet, propriete: propriete, objet: objet};
    //this.push('triplets', triplet);
    triplets.push(triplet);
  }
  console.log(triplets);

  return triplets;
}

function addNodeIfNotExist(network, data){
  var existNode = false;
  //  console.log(data);
  try{
    existNode = network.body.data.nodes.get({
      filter: function(node){
        //    console.log(node);
        return (node.id == data.id );
      }
    });
    //  console.log(existNode);
    if (existNode.length == 0){
      network.body.data.nodes.add(data);
    }else{
      //s'il existe déjà, ne serait-ce pas un renommage ?
      //  console.log("renomme");
      //  console.log(data);
      //existNode[0].label = data.label;
      //  editNode(data, null);
      //  console.log(this.network.body.data.nodes);
      network.body.data.nodes.update(data);
    }
  }
  catch (err){
    console.log(err);
  }
  /*  this.nodes = [];
  this.nodes = this.network.body.data.nodes;*/
}

function addEdgeIfNotExist (network, data){
  var existEdge = false;
  try {
    existEdge = network.body.data.edges.get({
      filter: function(edge){
        return (edge.id == data[0].id);
      }
    });
    if (existEdge.length == 0){
      network.body.data.edges.add(data[0]);
    }else{
      //s'il existe déjà, ne serait-ce pas un renommage ?
      //  console.log("renomme");
      //  console.log(data);
      //existNode[0].label = data.label;
      //  editNode(data, null);
      //    console.log(this.network.body.data.edges);
      network.body.data.edges.update({id: data[0].id, label: data[0].label});
      //  console.log(this.network.body.data.edges);
    }
  }
  catch (err) {
    console.log(err);
  }
}
