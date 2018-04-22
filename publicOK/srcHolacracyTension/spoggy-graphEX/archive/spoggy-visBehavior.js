import * as sg from './spoggy-generalBehavior.js';


let network;
let app;


export const graph = {
  init(_app,   container, callback){
    app = _app;

    // create an array with nodes
    var nodes = new vis.DataSet([
      {id: 1, label: 'Node 1'},
      {id: 2, label: 'Node 2'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'},
      {id: 6, label: 'Node 6'},
      {id: 7, label: 'Node 7'},
      {id: 8, label: 'Node 8'}
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
      {from: 1, to: 8, arrows:'to', dashes:true},
      {from: 1, to: 3, arrows:'to'},
      {from: 1, to: 2, arrows:'to, from'},
      {from: 2, to: 4, arrows:'to, middle'},
      {from: 2, to: 5, arrows:'to, middle, from'},
      {from: 5, to: 6, arrows:{to:{scaleFactor:2}}},
      {from: 6, to: 7, arrows:{middle:{scaleFactor:0.5},from:true}}
    ]);

    // create a network

    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      edges:{
        arrows: 'to'
      },
      interaction: {
        dragNodes:true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideNodesOnDrag: false,
        hover: false,
        hoverConnectedEdges: true,
        keyboard: {
          enabled: true,
          speed: {x: 10, y: 10, zoom: 0.02},
          bindToWindow: true
        },
        multiselect: false,
        navigationButtons: true,
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300,
        zoomView: true

      },

      manipulation: {
        addNode: function (data, callback) {
          // filling in the popup DOM elements
          app.$.nodeOperation.innerHTML = "Add Node";
          editNode(data, clearNodePopUp, callback);
        },
        editNode: function (data, callback) {
          // filling in the popup DOM elements
          app.$.nodeOperation.innerHTML = "Edit Node";
          editNode(data, cancelNodeEdit, callback);
        },
        addEdge: function (data, callback) {
          if (data.from == data.to) {
            var r = confirm("Do you want to connect the node to itself?");
            if (r != true) {
              callback(null);
              return;
            }
          }
          app.$.edgeOperation.innerHTML = "Add Edge";
          editEdgeWithoutDrag(data, callback);
        },
        editEdge: {
          editWithoutDrag: function(data, callback) {
            app.$.edgeOperation.innerHTML = "Edit Edge";
            editEdgeWithoutDrag(data,callback);
          }
        },
        deleteNode: function (data, callback) {
          // filling in the popup DOM elements
          deleteNode(data, callback);
        },
        deleteEdge: function(data,callback){
          deleteEdge(data,callback);
        }
      }
    }

    network = new vis.Network(container, data, options);
    callback(network);
    //
    let d=Date.now();
    //  console.log(d);
    callback(d);
    return network;
  },
  write(dataRaw) {
    console.log(dataRaw);
  }
};



/* fonctionnalités VIS JS  http://visjs.org/examples/network/other/manipulationEditEdgeNoDrag.html*/
function editNode(data, cancelAction, callback) {
  app.$.nodeLabel.value = data.label;
  app.$.nodeSaveButton.onclick = saveNodeData.bind(this, data, callback);
  app.$.nodeCancelButton.onclick = cancelAction.bind(this, callback);
  app.$.nodePopUp.style.display = 'block';
}

// Callback passed as parameter is ignored
function clearNodePopUp() {
  app.$.nodeSaveButton.onclick = null;
  app.$.nodeCancelButton.onclick = null;
  app.$.nodePopUp.style.display = 'none';
}

function cancelNodeEdit(callback) {
  clearNodePopUp();
  callback(null);
}

function saveNodeData(data, callback) {
  data.label = app.$.nodeLabel.value;
  console.log(data);
  clearNodePopUp();
  data.format = "vis" // pour identifier l'origine et le format de l'info
  sg.action.addNode(data,  callback);
  //  callback(data);
}



function editEdgeWithoutDrag(data, callback) {
  // filling in the popup DOM elements
  app.$.edgeLabel.value = data.label;
  app.$.edgeSaveButton.onclick = saveEdgeData.bind(this, data, callback);
  app.$.edgeCancelButton.onclick = cancelEdgeEdit.bind(this,callback);
  app.$.edgePopUp.style.display = 'block';
}

function clearEdgePopUp() {
  app.$.edgeSaveButton.onclick = null;
  app.$.edgeCancelButton.onclick = null;
  app.$.edgePopUp.style.display = 'none';
}

function cancelEdgeEdit(callback) {
  clearEdgePopUp();
  callback(null);
}

function saveEdgeData(data, callback) {
  if (typeof data.to === 'object')
  data.to = data.to.id
  if (typeof data.from === 'object')
  data.from = data.from.id
  data.label = app.$.edgeLabel.value;
  data.format = "vis" // pour identifier l'origine et le format de l'info
  console.log(data);
  sg.action.addEdge(data, callback);
  clearEdgePopUp();
  //  callback(data);
}

function deleteNode (data, callback){
  console.log(data);
  sg.action.delete(data, callback);
}
function deleteEdge (data, callback){
  console.log(data);
  sg.action.delete(data, callback);
}
/* FIN FONCTIONNALITES VIS JS */
