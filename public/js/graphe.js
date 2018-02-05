 //function draw() {
// create an array with nodes
   var nodes = [
     {id: 1, label: 'Node 1'},
     {id: 2, label: 'Node 2'},
     {id: 3, label: 'Node 3'},
     {id: 4, label: 'Node 4'},
     {id: 5, label: 'Node 5'}
   ];

   // create an array with edges
   var edges = new vis.DataSet([
     {from: 1, to: 3},
     {from: 1, to: 2},
     {from: 2, to: 4},
     {from: 2, to: 5}
   ]);

   // create a network
   var container = document.getElementById('mynetwork');
   var data = {
     nodes: nodes,
     edges: edges
   };
   var options = {
    //  locale: document.getElementById('locale').value,
      edges:{
        arrows: {
          to:     {enabled: true, scaleFactor:1, type:'arrow'},
          middle: {enabled: false, scaleFactor:1, type:'arrow'},
          from:   {enabled: false, scaleFactor:1, type:'arrow'}
        }},
        interaction:{
          navigationButtons: true,
          //  keyboard: true  //incompatible avec rappel de commande en cours d'implémentation
        },
        manipulation: {
         addNode: function (data, callback) {
           // filling in the popup DOM elements
           document.getElementById('operation').innerHTML = "Add Node";
           document.getElementById('node-id').value = data.id;
           document.getElementById('node-label').value = data.label;
           document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
           document.getElementById('cancelButton').onclick = clearPopUp.bind();
           document.getElementById('network-popUp').style.display = 'block';
         },
         editNode: function (data, callback) {
           // filling in the popup DOM elements
           document.getElementById('operation').innerHTML = "Edit Node";
           document.getElementById('node-id').value = data.id;
           document.getElementById('node-label').value = data.label;
           document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
           document.getElementById('cancelButton').onclick = cancelEdit.bind(this,callback);
           document.getElementById('network-popUp').style.display = 'block';
         },
         addEdge: function (data, callback) {
           if (data.from == data.to) {
             var r = confirm("Do you want to connect the node to itself?");
             if (r == true) {
               callback(data);
             }
           }
           else {
             callback(data);
           }
         }
       },


      /*  manipulation: {
          addNode: function (data, callback) {
            // filling in the popup DOM elements
            data.label = "";
            //  console.log(this);
            graphe.editNode(data, callback);
          },
          editNode: function (data, callback) {
            // filling in the popup DOM elements
            //document.getElementById('nodeOperation').innerHTML = "Edit Node";
            graphe.$.nodeOperation.innerHTML = "Edit Node";
            graphe.editNode(data, callback);
          },
          deleteNode: function (data, callback) {
            // filling in the popup DOM elements
            graphe.deleteNode(data, callback);
          },
          addEdge: function (data, callback) {
            if (data.from == data.to) {
              var r = confirm("Êtes-vous certain de vouloir connecter le noeud à lui-même?");
              if (r != true) {
                callback(null);
                return;
              }
            }
            //document.getElementById('edgeOperation').innerHTML = "Add Edge";
            graphe.$.edgeOperation.innerHTML = "Add Edge";
            graphe.editEdgeWithoutDrag(data, callback);
          },
          editEdge: {
            editWithoutDrag: function(data, callback) {
              //document.getElementById('edgeOperation').innerHTML = "Edit Edge";
              graphe.$.edgeOperation.innerHTML = "Edit Edge";
              graphe.editEdgeWithoutDrag(data,callback);
            }
          },
          deleteEdge: function(data,callback){
            graphe.deleteEdge(data,callback);
          }
        },
      */  physics:{
          enabled: true,
          barnesHut: {
            gravitationalConstant: -1,
            centralGravity: 0.3,
            springLength: 95,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 1
          },
          forceAtlas2Based: {
            gravitationalConstant: -50,
            centralGravity: 0.01,
            springConstant: 0.08,
            springLength: 100,
            damping: 0.4,
            avoidOverlap: 0
          },
          repulsion: {
            centralGravity: 0.001, //0.001 ? A quoi sert cette valeur ?
            springLength: 220, //220 (//200 //300)
            springConstant: 0.01, //0.01
            nodeDistance: 150, //100 //350
            damping: 0.08
          },
          hierarchicalRepulsion: {
            centralGravity: 0.0,
            springLength: 100,
            springConstant: 0.01,
            nodeDistance: 120,
            damping: 0.09
          },
          maxVelocity: 500, //50
          minVelocity: 1, //0.1
          solver: 'repulsion',
          stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
          },
          timestep: 0.5,
          adaptiveTimestep: true
        }
      };
   network = new vis.Network(container, data, options);
//console.log(network);
   // add event listeners
   network.on('select', function(params) {
     document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
   });
//}
function clearPopUp() {
   document.getElementById('saveButton').onclick = null;
   document.getElementById('cancelButton').onclick = null;
   document.getElementById('network-popUp').style.display = 'none';
 }

 function cancelEdit(callback) {
   clearPopUp();
   callback(null);
 }

 function saveData(data,callback) {
   data.id = document.getElementById('node-id').value;
   data.label = document.getElementById('node-label').value;
   clearPopUp();
   callback(data);
 }


/* localisation
function setDefaultLocale() {
   var defaultLocal = navigator.language;
   var select = document.getElementById('locale');
   select.selectedIndex = 0; // set fallback value
   for (var i = 0, j = select.options.length; i < j; ++i) {
     if (select.options[i].getAttribute('value') === defaultLocal) {
       select.selectedIndex = i;
       break;
     }
   }
 }

 function initGraphe() {
    setDefaultLocale();
    draw();
  }*/
