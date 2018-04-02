//inspire de node_modules/@polymer/lib/utils/async.js

import './js/rdf-ext-all-latest.js';
import * as lg from './spoggy-levelgraphBehavior.js';
import * as vis from './spoggy-visBehavior.js';

let app;
let db;
let network;



export const graph = {
  init(_app,   container, callback){
    app = _app;
    console.log("init rdf-ext");
    let test = rdf.namedNode("RDF-EXT ok")
    console.log(test);
    console.log("init vis");
    //  vis.graph.init( this, container, this._graphOk);
    network =   vis.graph.init( app, container, callback);
    console.log("init levelgraph");
    //  lg.base.init("spoggy", this._baseOk);
    db = lg.base.init("spoggy");
    console.log(db);
    var stream = db.getStream({ });

    stream.on("data", function(data) {
      var visTriplet = transform.level_to_Vis_Triplet(data);
      //  console.log(visTriplet);
      //  console.log(visTriplet.node);
      //  console.log(visTriplet.edge);
      if (visTriplet.node != undefined){
        operation.addNodeToVis(visTriplet.node);
      }
      if (visTriplet.edge != undefined){
        operation.addEdgeToVis(visTriplet.edge);
      }
      //    console.log(data);
      /*  let subject = data.subject;
      let predicate = data.predicate;
      let object = data.object;
      let graph = data.graph;
      //    console.log(subject);
      //  console.log(predicate);
      //  console.log(object);
      let subjectVis = transform.level_to_Vis_Node(subject);
      let objectVis = transform.level_to_Vis_Node(object);
      let predicateVis = transform.level_to_Vis_Edge(predicate);
      console.log("#############")
      console.log("#############")
      console.log(subjectVis);
      console.log(predicateVis);
      console.log(objectVis);
      console.log("|||||||||||||")
      console.log("||||||||||||")*/
      //operation.addNodeToVis()
      /*  let subjectNode = operation.addNodeIfNotExist(subject);
      let objectNode = operation.addNodeIfNotExist(object);
      let predicateEdge = operation.addEdgeIfNotExist(predicate);*/
      //    console.log("must update network")

    });
    //  console.log("init sparql");
    //  console.log("init socket");
  }
};

export const transform = {
  level_to_Vis_Triplet(triplet){
    // determiner si c'est un edge ou node pour Vis , par defaut node
    let result = {};
    console.log(triplet);

    if (triplet.subject.termType == "BlankNode" && triplet.object.termType == "Literal"){

      let node = {};
      node.id = triplet.subject.value;
      node.label = triplet.object.value;
      result.node = node;
    }
    else{
      console.log("triplet de type edge");
      let edge = {};
      console.log(triplet);
      edge.from = triplet.subject.value;
      edge.label = triplet.predicate.value;
      edge.to = triplet.object.value;
      console.log(edge);
      result.edge = edge;
    }
    console.log(result);
    return result;
  },
  vis_to_level_Node(nodeVis){
    let nodeLevel = nodeVis ;
    return nodeLevel;
  },
  vis_to_level_Edge(edgeVis){
    let edgeLevel = edgeVis;
    return edgeLevel;
  },
  level_to_Vis_Node(nodeLevel){
    let nodeVis = {}
    nodeVis.label = nodeLevel.value;
    return nodeVis;
  },
  level_to_Vis_Edge(edgeLevel){
    let edgeVis = {}
    edgeVis.label = edgeLevel.value;
    return edgeVis;
  }
};

export const operation = {
  addNodeToVis(data){
    console.log("add node to vis");
    console.log(data);
    var existVisNode = false;
    existVisNode = network.body.data.nodes.get({
      filter: function(node){
        //    console.log(node);
        return (node.id == data.id || node.label == data.label);
      }
    });
    console.log(existVisNode);
    try{
      if (existVisNode.length == 0){
        console.log("n'existe pas")
        network.body.data.nodes.add(data);

      }else{
        console.log("existe")
        //s'il existe déjà, ne serait-ce pas un renommage ?
        //  console.log("renomme");
        //  console.log(data);
        //existNode[0].label = data.label;
        //  editNode(data, null);
        //  console.log(network.body.data.nodes);
        delete data.x;
        delete data.y
        //  network.body.data.nodes.update(data);
      }
    }
    catch (err){
      console.log(err);
    }
  },

  addEdgeToVis(data){
    console.log("add edge to vis");
    console.log(data);
    var existEdge = false;
    var voisins = [];
    //console.log(network);

    console.log("verification dans les differents stores accessibles pour savoir si un edge identique ou voisins existe");
    console.log("test vis Edge");
    try {
      existEdge = network.body.data.edges.get({
        filter: function(edge){
          if (data[0] != undefined){ // parfois edges.get retourne un tableau, parfois directement l'objet
          return (edge.id == data[0].id);
        }
        else{
          return (  edge.id == data.id);
        }
      }
    });
    console.log(existEdge);
    if (existEdge.length == 0){
      if (data[0] != undefined){ // parfois edges.get retourne un tableau, parfois directement l'objet
      network.body.data.edges.add(data[0]);
    }
    else{
      network.body.data.edges.add(data);
    }
  }else{
    //s'il existe déjà, ne serait-ce pas un renommage ?
    //  console.log("renomme");
    //  console.log(data);
    //existNode[0].label = data.label;
    //  editNode(data, null);
    //    console.log(network.body.data.edges);
    if (data[0] != undefined){ // parfois edges.get retourne un tableau, parfois directement l'objet
    network.body.data.edges.update({id: data[0].id, label: data[0].label});
  }
  else{
    network.body.data.edges.update({id: data.id, label: data.label});
  }
  //  console.log(network.body.data.edges);
}
}
catch (err) {
  console.log(err);
}
},
addNodeIfNotExist( data, callback) {
  console.log(data);
  var existInLevelNode = nodeExistInLevel(vis_to_level_Node(data);
  var existInVisNode = nodeExistInVis(data);
  console.log("recherche Node dans level");

  console.log("recherche node dans vis");


  console.log(callback);

}
addEdgeIfNotExist( data, callback) {
  console.log(data);
  var existInLevelEdge = edgeExistInLevel(vis_to_level_Edge(data));
  var existInVisEdge = edgeExistInVis(data);


  console.log(callback);
}
/*
addNodeIfNotExist( data) {
console.log(data);

var existVisNode = false;
let existLevelNode = false;
var voisinsVis = [];
let voisinsLevel = [];

console.log("verification dans les differents stores accessibles pour savoir si un noeud identique ou voisins existe");
console.log("test vis Node");
//  console.log(network)

existVisNode = network.body.data.nodes.get({
filter: function(node){
//    console.log(node);
return (node.id == data.id || node.label == data.label);
}
});
console.log(existVisNode);
console.log("test levelgraph Node");
db.get({object: data.label}, function(err, list) {
//  db.get({  }, function(err, list) {

if(list.length == 0){
console.log("ecriture level Node");

lg.base.putNode(data, function(){console.log(data.id+"->"+data.label+" : ajouté à LEVEL");});
}else{
console.log("Level Node existe déjà");
console.log(list);
}
});

console.log("ecriture vis Node");
/*   try{
if (existNodeVis.length == 0){
console.log("n'existe pas")
// network.body.data.nodes.add(data);

}else{
console.log("existe")
//s'il existe déjà, ne serait-ce pas un renommage ?
//  console.log("renomme");
//  console.log(data);
//existNode[0].label = data.label;
//  editNode(data, null);
//  console.log(network.body.data.nodes);
delete data.x;
delete data.y
// network.body.data.nodes.update(data);
}
}
catch (err){
console.log(err);
}*/


/*  this.nodes = [];
this.nodes = network.body.data.nodes;*/

/*

console.log("test sparql Node");
console.log("test socket Node");
console.log("test http://lov.okfn.org/dataset/lov/");
console.log("test dbpedia");
}

addEdgeIfNotExist(data) {
console.log(data);

console.log("test levelgraph Edge");
console.log(data);

db.get({subject:data.from, predicate: data.label, object: data.to}, function(err, list) {
//  db.get({  }, function(err, list) {

if(list.length == 0){
console.log("ecriture level Edge");

lg.base.putEdge(data, function(){console.log(data.from+"->"+data.label+" "+data.to+" : ajouté à LEVEL");});
}else{
console.log("Level Edge existe déjà");
console.log(list);
}
});

console.log("test sparql Edge");
console.log("test socket Edge");
console.log("test http://lov.okfn.org/dataset/lov/");
console.log("test dbpedia");
}*/
};

/*export const operation = {
addNodeIfNotExist(data) = {
console.log(data);
},
addEdgeIfNotExist(data) = {
console.log(data);
}
};
*/
export const test = {
  nodeExistInLevel(data){
    let exist = false;

    return exist;
  },
  edgeExistInLevel(data){
    let exist = false;

    return exist;
  },
  nodeExistInVis(data){
    let exist = false;

    return exist;
  },
  edgeExistInVis(data){
    let exist = false;

    return exist;
  }

};


export const store = {
  /**
  * Init levelgraph database.
  *
  * @memberof Polymer.levelgraphBehavior.base
  * @param {!Function=} callback Callback to run
  * @return {number} Handle used for canceling task
  */
  init(name, callback){
    db = levelgraph(level(name));
    var stream = db.getStream({ });
    stream.on("data", function(data) {
      console.log(data);
      console.log("must update network")
    });
    let d=Date.now();
    callback(d);
    return;
  },

  /**
  * put triplet to levelgraph database.
  *
  * @memberof Polymer.levelgraphBehavior.base
  * @param {!Function=} callback Callback to run
  * @return {number} Handle used for canceling task
  */
  putNode(node, callback){

    let triple = rdf.triple(rdf.blankNode(node.id), rdf.namedNode("label"), rdf.literal(node.label,this.language));
    console.log(triple);
    db.put(triple, function() {
      db.get({}, function(err, list) {
        callback(list);
      });
    });
  },
  /**
  * put edge to levelgraph database.
  *
  * @memberof Polymer.levelgraphBehavior.base
  * @param {!Function=} callback Callback to run
  * @return {number} Handle used for canceling task
  */
  putEdge(edge, callback){
    let triple = rdf.triple(rdf.namedNode(edge.from), rdf.namedNode(edge.label), rdf.namedNode(edge.to));
    console.log(triple);
    db.put(triple, function() {
      db.get({}, function(err, list) {
        callback(list);
      });
    });
  },
  /**
  * put triplet to levelgraph database.
  *
  * @memberof Polymer.levelgraphBehavior.base
  * @param {!Function=} callback Callback to run
  * @return {number} Handle used for canceling task
  */
  putTriplet(triple, callback){
    console.log(triple);
    db.put(triple, function() {
      db.get({}, function(err, list) {
        //  db.get({  }, function(err, list) {
        callback(list);
      });

    });
  },

};
