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
    //  let test = rdf.namedNode("RDF-EXT ok")
    //  console.log(test);
    console.log("init vis");
    //  vis.graph.init( this, container, this._graphOk);
    network =   vis.graph.init( app, container, callback);
    console.log("init levelgraph");
    //  lg.base.init("spoggy", this._baseOk);
    db = lg.base.init("spoggy");
    //  console.log(db);
    var stream = db.getStream({ });

    stream.on("data", function(data) {
      console.log(data);
      var visTriplet = transform.level_to_Vis_Triplet(data);
      if (visTriplet.node != undefined){
        action.addNodeToVis(visTriplet.node);
      }
      if (visTriplet.edge != undefined){
        action.addEdgeToVis(visTriplet.edge);
      }
    });
    //  console.log("init sparql");
    //  console.log("init socket");
  }
};

export const action = {
  addNode(data, callback){
    console.log(data);
    let dataVis;
    let dataRdf;
    var nodeCree;
    if (data.format = "vis"){
      dataVis = data;
      dataRdf = transform.vis_To_Rdf_Node(data);
    }else{
      dataVis = transform.rdf_To_Vis_Node(data);
      dataRdf = data;
    }
    let nodeInVis = test.nodeInVis(dataVis);
    let nodeInLevel = test.nodeInLevel(dataRdf);


    if (nodeInVis.length == 0){
      console.log("node VIS n'existe pas");
      nodeCree = callback(data);
      console.log(nodeCree);
    }else{
      console.log("node VIS existe");
      nodeCree = nodeInVis[0];
      network.body.data.nodes.update(data);
      action.nodeUpdateInLevel(data);
      console.log(nodeCree);
    }

  },
  addEdge (data, callback){
    console.log(data);
    let dataVis;
    let dataRdf;
    var edgeCree;
    if (data.format = "vis"){
      dataVis = data;
      dataRdf = transform.vis_To_Rdf_Edge(data);
    }else{
      dataVis = transform.rdf_To_Vis_Edge(data);
      dataRdf = data;
    }
    let edgeInVis = test.edgeInVis(dataVis);
    let edgeInLevel = test.edgeInLevel(dataRdf);
    console.log(edgeInVis);
    if (edgeInVis.length == 0){
      console.log("edge VIS n'existe pas");
      edgeCree = callback(data);
      console.log(edgeCree);
    }else{
      console.log("edge VIS existe");
      edgeCree = edgeInVis[0];
      console.log(edgeCree);
    }
    //    callback(data);
  },
  addNodeToVis(data){
    // a fusionnner avec addnode, mais pb du callback
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
        network.body.data.nodes.update(data);
      }
    }
    catch (err){
      console.log(err);
    }
  },

  addEdgeToVis(data){
    // a fusionner avec addedge, mais pb de callback
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
nodeUpdateInLevel(data){
  console.log(data);
  let dataVis;
  let dataRdf;
  if (data.format = "vis"){
    dataVis = data;
    dataRdf = transform.vis_To_Rdf_Node(data);
  }else{
    dataVis = transform.rdf_To_Vis_Node(data);
    dataRdf = data;
  }
  let oldNode = test.nodeInLevel(dataRdf);
  console.log(oldNode);
},
delete(data, callback){
  console.log(data);
  //delete vis;
  callback(data);
  let nodes = data.nodes;
  let edges = data.edges;
  //delete levelgraph


nodes.forEach(function(n){
let  blankN = rdf.blankNode(n);
let NamedN = rdf.namedNode(n);
  console.log(blankN);
  console.log(NamedN);

  var stream = db.searchStream([{
      subject: blankN
    }]);

    stream.on("data", function(data) {
      // this will print "{ x: 'daniele', y: 'marco' }"
      console.log(data);
    });

    var stream2 = db.searchStream([{
        subject: NamedN
      }]);

      stream2.on("data", function(data) {
        // this will print "{ x: 'daniele', y: 'marco' }"
        console.log(data);
      });

})
/*
  base.get({}, function(err, list) {
    console.log(list)
    base.del(list, function(err, result) {
      // do something after the triple is deleted
      console.log(result);
      if(err){
        console.log(err);
      }
    });

    let toDelete = [];
    nodes.forEach(function(n){
      list.forEach(function(t){
        let id = t.subject.value;
        console.log(id);
        if(id == n){
          console.log("del N");
          console.log(n);
          base.del(t, function(err) {
            // do something after the triple is deleted
            console.log(t);
            base.get({ }, function(err, list) {
              console.log(list);
            });
            if(err){
              console.log(err);
            }
          });
        }
      });

    });
    edges.forEach(function(e){
      list.forEach(function(t){
        let id = t.subject.value;
        console.log(id);
        if(id == e){
          console.log("del E");
          console.log(n);
          base.del(t, function(err) {
            // do something after the triple is deleted
            console.log(t);
            base.get({ }, function(err, list) {
              console.log(list);
            });
            if(err){
              console.log(err);
            }
          });
        }
      });
    });
  })*/
}


};
export const test = {
  nodeInVis(data){
    let existVisNode = false;
    existVisNode = network.body.data.nodes.get({
      filter: function(node){
        return (node.id == data.id || node.label == data.label);
      }
    });
    console.log(existVisNode);
    return existVisNode;
  },
  nodeInLevel (data){
    console.log("test node in level");
    console.log(data);
    db.get({predicate: data.predicate, object:data.object}, function(err, list) {
      //  db.get({  }, function(err, list) {

      if(list.length == 0){
        console.log("ecriture level Node");
        console.log(data);
        db.put({subject: data.subject.value, predicate: data.predicate.value, object: data.object.value, graph: data.graph.value, type: "node"});
        //  lg.base.putNode(data, function(){console.log(data.id+"->"+data.label+" : ajouté à LEVEL");});
      }else{
        console.log("Level Node existe déjà");
        console.log(list);
      }
    });

  },
  edgeInVis(data){
    var existEdge = false;
    var voisins = [];
    //console.log(network);

    console.log("verification dans les differents stores accessibles pour savoir si un edge identique ou voisins existe");
    console.log("test vis Edge");
    console.log(data);
    existEdge = network.body.data.edges.get({
      filter: function(edge){
        if (data[0] != undefined){ // parfois edges.get retourne un tableau, parfois directement l'objet
        //  return (edge.id == data[0].id);
        return ((edge.id == data[0].id) || (edge.from == data[0].from && edge.to == data[0].to && edge.label == data[0].label));
      }
      else{
        return ( (edge.id == data.id) ||  (edge.from == data.from && edge.to == data.to && edge.label == data.label));
      }
    }
  });
  console.log(existEdge);
  return existEdge;

},
edgeInLevel(data){
  console.log("test edge in level");
  console.log(data);
  db.get({subject:data.subject.value, predicate: data.predicate.value, object: data.object.value}, function(err, list) {
    //  db.get({  }, function(err, list) {
    console.log(list)
    if(list.length == 0){
      console.log("ecriture level Edge");
      db.put(data);
      console.log(data);
      db.put({subject: data.subject.value, predicate: data.predicate.value, object: data.object.value, graph: data.graph.value, type: "edge"});
      //  lg.base.putEdge(data, function(){console.log(data.from+"->"+data.label+" "+data.to+" : ajouté à LEVEL");});
    }else{
      console.log("Level Edge existe déjà");
      console.log(list);
    }
  })

}
};

export const transform = {
  vis_To_Rdf_Node(node){
    let triple = rdf.triple(rdf.blankNode(node.id), rdf.namedNode("label"), rdf.literal(node.label)); //,this.language
    console.log(triple);
    return triple;
  },
  vis_To_Rdf_Edge(edge){
    let triple = rdf.triple(rdf.namedNode(edge.from), rdf.namedNode(edge.label), rdf.namedNode(edge.to));
    console.log(triple);
    return triple;
  },
  rdf_To_Vis_Node(node){

  },
  rdf_To_Vis_Edge(edge){

  },
  level_to_Vis_Triplet(triplet){
    // determiner si c'est un edge ou node pour Vis , par defaut node
    let result = {};
    console.log(triplet);

    if (triplet.type == "node"){

      let node = {};
      node.id = triplet.subject;
      node.label = triplet.object;
      result.node = node;
    }
    else{
      console.log("triplet de type edge");
      let edge = {};
      console.log(triplet);
      edge.from = triplet.subject;
      edge.label = triplet.predicate;
      edge.to = triplet.object;
      console.log(edge);
      result.edge = edge;
    }
    console.log(result);
    return result;
  }
}
