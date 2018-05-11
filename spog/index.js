var LevelUp = require('levelup'),
LevelDown = require('leveldown'),
Sublevel = require('level-sublevel'),
LevelGraph = require('levelgraph');



function spog(name, mode, demo) { // name,  demo or not, n3 or not,
  this.dbName = name || "smagBoose";

  this.db = Sublevel(LevelUp(LevelDown("data/"+this.dbName)));
  this.graph0 = LevelGraph(this.db.sublevel('graph0'));
    this.test = LevelGraph(this.db.sublevel('test'));

  /*
  var triple = { subject: "a", predicate: "b", object: "c" };
  this.graph0.put(triple, function(err) {
  // do something after the triple is inserted
});


this.graph0.get({ subject: "a" }, function(err, list) {
console.log(list);
});

var stream = this.graph0.getStream({ predicate: "b" });
stream.on("data", function(data) {
console.log(data);
});

this.populate(this.graph0)*/

}

/* FONCTIONS A IMPLEMENTER
A. inscrire dans le graphe courant
B. lister les graphes, les sous graphes
C. créer un sous graphe --> 1 créer le sous graph --> 2 le recenser dans le graph parent
D. changer de graph
E.--> 3 le modifier, le déplacer, le supprimer ...
*/

spog.prototype.listGraphs = function (graph, level, fct_retour){
  //B. lister les graphes, les sous graphes recursif pour suivre les graphes , si level = null -> infini ? , sinon, on decremente
//  console.log("#######################liste graphes");
  //console.log(graph);
  //console.log(level)
  graph.get({
    predicate: 'type',
    object: 'Graphe',
    type: 'graph',
    reverse: true
  }, function(err, liste) {
  //  console.log("2 liste dans spog.proto.listGraphs");
  //    console.log(liste);
      fct_retour(liste);
//  return liste;
  });
  // if level > 0 || level == null foreach g list.push (this.list(g, level-1)
}

spog.prototype.read = function(graph, requete){
  //. lire dans le graphe courant selon une requete
  let result = ["pseudo","result"];
  console.log("READ");
  console.log(graph);
  console.log(requete);
  return result;
}

spog.prototype.write = function(graph, data){
  //A. inscrire dans le graphe courant
  let result = ["message ok","message erreur"];
  console.log("WRITE");
  console.log(graph);
  console.log(data);
  return result;
}

spog.prototype.switchGraph = function(newGraph, fct_retour){
  //D. changer de graph
  let result = ["pseudo","result"];

  console.log("Switch");
  console.log(newGraph);
    let graph = LevelGraph(this.db.sublevel(newGraph));
    result.push(graph);
    console.log(this.db.sublevels)
  //return result;
  fct_retour(this.db.sublevels, graph);
}


spog.prototype.move = function(graph, oldParent, newParent){
  //D. changer de graph
  let result = ["message ok","message erreur"];
  console.log("Move");
  console.log(graph);
  console.log(oldParent);
  return result;
}


spog.prototype.populate = function (graph) {
  var g = graph;
  var t1 = { subject: "David", predicate: "type", object: "SpogUser" };
  var t2 = { subject: "Smag0", predicate: "type", object: "Projet" };
  var t3 = { subject: "SmagYun", predicate: "type", object: "Projet" };
  var t4 = { subject: "David", predicate: "developpeurDe", object: "Smag0" };
  var t5 = { subject: "David", predicate: "developpeurDe", object: "SmagYun" };
  var t4 = { subject: "LesBricodeurs", predicate: "hasPart", object: "David" };
  var t5 = { subject: "SmagYun", predicate: "hasDeveloppeur", object: "David" };
  var t6 = { subject: "SpogUser", predicate: "subClassOf", object: "Personne" };
  var t7 = { subject: "LesBricodeurs", predicate: "type", object: "Association" };
  graph.put([t1, t2, t3, t4, t5, t6, t7],  function(err) {
    // do something after the triples are inserted
    console.log("le graphe est populaté ;-)");
    console.log(g);
    g.get({
      reverse: true
    }, function(err, list) {
      console.log("populate list");
      console.log(list);
      console.log(err);
      //socket.emit('initDb', list);
    });

  });
}

module.exports = spog;
