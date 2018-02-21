//https://github.com/levelgraph/levelgraph
var level = require("level");
var sublevel = require("level-sublevel");
var levelgraph = require("levelgraph");


function spoglevel(name, mode, demo) { // name,  demo or not, n3 or not,
  this.dbName = name || "smagBoose";
  this.graphListe = [];
  //this.db = levelgraph(level("data/"+this.dbName));
  this.db = sublevel(level("data/"+this.dbName));
  this.graph0 = this.createGraph('graph0');
  this.createGraph('test');

}

spoglevel.prototype.createGraph =function(name){
  var graph = levelgraph(this.db.sublevel(name));
  this.graphListe.push(name);
  graph.name = name;
  return graph;
}
spoglevel.prototype.getDb =function(){
  return this.dbName;
}
spoglevel.prototype.getDefaultGraphName =function(){
  return this.graph0.name;
}
spoglevel.prototype.getGraphs =function(){
  return this.db.sublevels;
}
spoglevel.prototype.getGraphListe =function(){
  return this.graphListe;
}

module.exports = spoglevel;
