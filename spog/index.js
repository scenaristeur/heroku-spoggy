var LevelUp = require('levelup'),
LevelDown = require('leveldown'),
    Sublevel = require('level-sublevel'),
    LevelGraph = require('levelgraph');



function spog(name, mode, demo) { // name,  demo or not, n3 or not,
  this.dbName = name || "smagBoose";

  this.db = Sublevel(LevelUp(LevelDown("data/"+this.dbName)));
  this.graph0 = LevelGraph(this.db.sublevel('graph0'));


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

  this.populate(this.graph0)

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
