const opts = {};
opts.db = require('leveldown');   // Levelup's backend
opts.contextKey = 'graph';        // Name of fourth term
const QuadStore = require('quadstore').QuadStore;
const store = new QuadStore('./data/quadtest', opts);



//getDataFromGraph('g');


function getDataFromGraph(graph){
  const matchTerms = {graph: graph};
  store.get(matchTerms).then((matchingQuads) => {
    console.log(matchingQuads);
  }); // promise
}



//tests
//lecture graph g
//getDataFromGraph('g');
let graph = "";
let s = Date.now();
 if (s%2 == 0){
   graph = 'pair';
 }else{
   graph = 'impair'
 }
const quads = [
    {subject: Date.now(), predicate: 'p', object: 'o', graph: graph}
];

store.put(quads).then(() => {
  console.log("ok");
  console.log("lecture In")
  getDataFromGraph(graph);
}); // promise

//lecture graph g
//console.log("lecture fin")
//getDataFromGraph('g');

  //getDataFromGraph();
