//https://github.com/levelgraph/levelgraph
var level = require("level-browserify");
var levelgraph = require("levelgraph");

// just use this in the browser with the provided bundle
var db = levelgraph(level("data/testyourdb"));

//console.log(db);

//Inserting a triple in the database is extremely easy:

var triple = { subject: "David", predicate: "type", object: "Personne" };
db.put(triple, function(err) {
  console.log("0, triplet ajouté");
  // do something after the triple is inserted
});

var triple = { subject: "David", predicate: "developpeurDe", object: "Smag0", "graphe": "Projet" };
db.put(triple, function() {
  db.get({ subject: "David" }, function(err, list) {
    console.log("1");
    console.log(list);
  });
});

//Retrieving it through pattern-matching is extremely easy:

db.get({ subject: "David" }, function(err, list) {
    console.log("2");
  console.log(list);
});


db.get({ predicate: "type", object:"Personne" }, function(err, list) {
      console.log("3");
  console.log(list);
});

//It even supports a Stream interface:

var stream = db.getStream({ predicate: "b" });
stream.on("data", function(data) {
        console.log("4");
  console.log(data);
});


db.get({ subject: "a" }, function(err, list) {
  console.log("5");
  console.log(list);

});
