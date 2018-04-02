let db;

export const base = {
  /**
  * Init levelgraph database.
  *
  * @memberof Polymer.levelgraphBehavior.base
  * @param {!Function=} callback Callback to run
  * @return {number} Handle used for canceling task
  */
  init(name, callback){
    db = levelgraph(level(name));

  let d=Date.now();
//  callback(d);
  return db;
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
putLiteral(literalNode, callback){
  console.log(literalNode);
  db.put(literalNode, function() {
    db.get({}, function(err, list) {
      //  db.get({  }, function(err, list) {
console.log(list);
    //  callback(list);
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
/**
* write data to levelgraph database.
*
* @memberof Polymer.levelgraphBehavior.base
* @param {!Function=} callback Callback to run
* @return {number} Handle used for canceling task
*/
/*write(lit) {
console.log(lit);
//let text = dataRaw.replace(/(?:\r\n|\r|\n)/g, '\\n'); //replace(/\n/g, '\\n');
if (text.length > 0){
let triple = {
subject: text,
predicate: "type",
object: "LiteralNoeud",
"graph": "DefaultGraph"
};
db.put(triple, function() {
db.get({ subject: text }, function(err, list) {
//  db.get({  }, function(err, list) {
console.log(list);
});
//affiche timeout
db.get({  }, function(err, list) {
console.log(list);
});
});
}
}*/
/*write(dataRaw) {
console.log(dataRaw);
let text = dataRaw.replace(/(?:\r\n|\r|\n)/g, '\\n'); //replace(/\n/g, '\\n');
if (text.length > 0){

let triple = {
subject: text,
predicate: "type",
object: "LiteralNoeud",
"graph": "DefaultGraph"
};
db.put(triple, function() {
db.get({ subject: text }, function(err, list) {
//  db.get({  }, function(err, list) {
console.log(list);
});
//affiche timeout
db.get({  }, function(err, list) {
console.log(list);
});
});
}
}*/
};

/*    db.put([{
subject: "matteo",
predicate: "friend",
object: "daniele"
}, {
subject: "daniele",
predicate: "friend",
object: "matteo"
}, {
subject: "daniele",
predicate: "friend",
object: "marco"
}, {
subject: "lucio",
predicate: "friend",
object: "matteo"
}, {
subject: "lucio",
predicate: "friend",
object: "marco"
}, {
subject: "marco",
predicate: "friend",
object: "davide"
}], function () {
var stream = db.searchStream([{
subject: "matteo",
predicate: "friend",
object: db.v("x")
}, {
subject: db.v("x"),
predicate: "friend",
object: db.v("y")
}, {
subject: db.v("y"),
predicate: "friend",
object: "davide"
}]);
stream.on("data", function(data) {
console.log(data);
callback(data);
});
});*/
