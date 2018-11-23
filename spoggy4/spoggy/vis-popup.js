
import {LitElement, html} from '@polymer/lit-element';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-dialog-behavior/paper-dialog-behavior.js';
import '@polymer/neon-animation/animations/scale-up-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-slider/paper-slider.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import 'paper-collapse-item/paper-collapse-item.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-swatch-picker/paper-swatch-picker.js';
import '@fooloomanzoo/color-picker/color-picker.js';
import '@fooloomanzoo/color-picker/color-element.js';

import  '/node_modules/evejs/dist/eve.custom.js';
import { PopupAgent } from './agents/PopupAgent.js'

class VisPopup extends LitElement {
  render() {
    return html`
    <style>
    .mood { color: green; }
    #operation {
      font-size:28px;
    }

    .popup {
      position: absolute;
      z-index: 99;
      top: 10%;
      left: 1vw;
      width: 99vw;

      background-color: #f9f9f9;
      border-style:solid;
      border-width:3px;
      border-color: #5394ed;
      padding:1px;
    }
    </style>
    Web Components are <span class="mood">${this.mood}</span>!<br>
    <hr>

    <paper-dialog id="node-popUp" class="popup" backdrop transition="core-transition-bottom"  >
    <!--  <div horizontal start-justified start layout > -->
    <!--  <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon> -->
    <div style="padding-left:20px" vertical start-justified start layout wrap>
    <h2 id="node-operation" style="margin: 0;color: #0D578B;">Ajouter ou modifier un noeud</h2>
    <paper-input id="node-label" label="Nom du noeud" autofocus ></paper-input>



    <!--<paper-dialog-scrollable id="scrollNode">-->
    <paper-collapse-item header="Forme">
    <!--  <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Forme</h3>-->
    <!--  <div slot="collapse-content">-->
    <!--  <fieldset>
    <legend>Forme</legend> -->
    <iron-selector id="shapeSelector" attr-for-selected="name" selected="{{selectedShape}}" selected-attribute="checked">
    <div>Label interne</div>
    <paper-checkbox name="ellipse">Ellipse</paper-checkbox>
    <paper-checkbox name="circle">Cercle</paper-checkbox>
    <paper-checkbox name="database">Database</paper-checkbox>
    <paper-checkbox name="box">Box</paper-checkbox>
    <paper-checkbox name="text">Texte</paper-checkbox>
    <hr>
    <div>Label externe</div>
    <paper-checkbox name="diamond">Diamant</paper-checkbox>
    <paper-checkbox name="star">Etoile</paper-checkbox>
    <paper-checkbox name="triangle">Triangle</paper-checkbox>
    <paper-checkbox name="triangleDown">Triangle inverse</paper-checkbox>
    <paper-checkbox name="square">Carré</paper-checkbox>
    <paper-checkbox name="image" >Image</paper-checkbox>
    <paper-checkbox name="circularImage" >Image Circulaire</paper-checkbox>
    </iron-selector>
    <div hidden$="[[shapeIsImage(selectedShape)]]">
    <paper-input id="imgUrl" label="Url de l'image (http://...)"></paper-input>
    </div>
    <!--  </fieldset>-->
    <!--</div>-->
    </paper-collapse-item>
    <paper-collapse-item header="Couleur">
    <!--  <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Couleur</h3>-->
    <!--<div slot="collapse-content">-->
    <!--  <fieldset>
    <legend>Couleur</legend>-->
    <paper-swatch-picker color="#E91E63"></paper-swatch-picker>
    <paper-swatch-picker color="{{selectedColor}}"></paper-swatch-picker>
    <color-picker  id="colorpicker" native value="{{colorValue}}"  position="right"></color-picker>
    <!--  </fieldset> -->
    <!--</div>-->
    </paper-collapse-item>
    <!--  <paper-collapse-item>
    <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Type de noeud</h3>
    <div slot="collapse-content">
    nb : ces fonctionnalités sont en cours de developpement :
    <a href="https://github.com/scenaristeur/heroku-spoggy/projects/1#card-10985683" target="_blank">kanban</a>
    <iron-selector id="typeSelector" attr-for-selected="name" selected="{{selectedType}}" selected-attribute="checked">
    <div>Noeuds particuliers</div>
    <paper-checkbox name="normal">Normal</paper-checkbox>
    <paper-checkbox name="uri">Uri</paper-checkbox>
    <paper-checkbox name="database">Database</paper-checkbox>
    <paper-checkbox name="lien">Lien</paper-checkbox>
    <paper-checkbox name="video">Video</paper-checkbox>
    <paper-checkbox name="text">Texte</paper-checkbox>
    <hr>
    <div>Noeuds programmatiques</div>
    <paper-checkbox name="variable">Variable</paper-checkbox>
    <paper-checkbox name="boucle">Boucle</paper-checkbox>
    <paper-checkbox name="condition">Condition</paper-checkbox>
    <paper-checkbox name="fonction">Fonction</paper-checkbox>
    </iron-selector>
    </div>
    </paper-collapse-item>
    -->
    <!--</paper-dialog-scrollable>-->
    </br>
    <div style="padding-top:10px" horizontal end-justified layout self-stretch>
    <paper-button id="nodeSaveButton" dialog-confirm  raised @click="${() =>  this._saveNode()}" >ok</paper-button>
    <paper-button id="nodeCancelButton"  dialog-dismiss raised>Annuler</paper-button>
    </div>
    </div>
    <!--</div>-->
    </paper-dialog>







    <paper-dialog id="edge-popUp" class="popup"> <!--  backdrop transition="core-transition-bottom" -->
    <!--  <div horizontal start-justified start layout > -->
    <!--  <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon>-->
    <div style="padding-left:20px" vertical start-justified start layout wrap>
    <h2 id="edge-operation" style="margin: 0;color: #0D578B;">Ajouter ou modifier un lien</h2>
    <paper-input id="edge-label" label="Nom du lien" autofocus></paper-input>
    <div style="padding-top:10px" horizontal end-justified layout self-stretch>
    <paper-button id="edge-saveButton"  on-tap="saveEdgeData" dialog-confirm raised>ok</paper-button>
    <paper-button id="edge-cancelButton" dialog-dismiss raised>Annuler</paper-button>
    </div>
    </div>
    <!--  </div> -->
    </paper-dialog>



    <paper-dialog
    entry-animation="scale-up-animation"
    exit-animation="fade-out-animation"
    id="import-popUp"
    class="popup"
    backdrop
    transition="core-transition-bottom"><!--  on-iron-overlay-opened="_openImport"
    on-iron-overlay-closed="_closeImport"-->
    <div horizontal start-justified start layout >
    <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon>
    <div style="padding-left:20px" vertical start-justified start layout wrap>
    <h2 id="importOperation" style="margin: 0;color: #0D578B;">Import JSON (ou ttl) <paper-icon-button icon="clear" dialog-dismiss></paper-icon-button></h2>
    <p >
    <fieldset>
    <legend>Paramètres</legend>
    <paper-checkbox id="remplaceNetwork">Remplacer Network</paper-checkbox>
    <paper-checkbox id="partageImport" disabled >Partager Import</paper-checkbox>
    </fieldset>
    </p>
    <p>
    <fieldset>
    <legend>Fichier</legend>
    <input id="filepicker"
    type="file"
    multiple value="Importer"
    @change="${(e) =>  this.handleFileSelected(e)}"></input>
    </fieldset>
    </p>
    <div style="padding-top:10px" horizontal end-justified layout self-stretch>
    <paper-button id="importCancelButton" dialog-dismiss raised>Annuler</paper-button>
    <a href="https://github.com/scenaristeur/heroku-spoggy/tree/master/public/exemple_files" target="_blank"> exemples de fichiers spoggy </a>
    </div>
    </div>
    </div>
    </paper-dialog>

    <paper-dialog
    id="export-ttl"
    entry-animation="scale-up-animation"
    exit-animation="fade-out-animation"
    class="popup"
    backdrop transition="core-transition-bottom"  iron-overlay-opened="fillTextToSave"><!-- on-iron-overlay-opened="_myOpenFunction"
    on-iron-overlay-closed="_myClosedFunction" -->
    <h2  style="margin: 0;color: #0D578B;"> Export au format turtle (RDF)
    <!--<paper-button ontap="_pageAide">?</paper-button>-->
    <!--  <paper-button dialog-dismiss raised>X</paper-button> -->
    <paper-icon-button icon="clear" dialog-dismiss></paper-icon-button></h2>

    <paper-dialog-scrollable>
    <paper-textarea id="inputTextToSave" rows="10" maxRows="15"></paper-textarea>
    </paper-dialog-scrollable>

    <div style="padding-top:10px" horizontal end-justified layout self-stretch>

    <!--<paper-button raised on-tap="creer" dialog-confirm>Créer</paper-button>
    <paper-button  dialog-dismiss raised>Fermer</paper-button>-->
    <paper-input id="inputFileNameToSaveAs" label="Nom du fichier à sauvegarder (.ttl)"></paper-input>
    <paper-button raised @click="${() =>  this.saveTextAsFile()}"  dialog-confirm>Exporter le fichier Ttl</paper-button>
    <br>
    </div>



    </paper-dialog>

    `;
  }


  static get properties() {
    var app = this;
    return {
      mood: {type: String},
    parent: {
      type: String
    },
  };
}

constructor() {
  super();
  this.mood = 'vis-popup';
  this.colorValue = "rgb(173,208,255)";
}


firstUpdated(){
  console.log( 'id : ', this.id);
  this.agentPopup = new PopupAgent(this.id, this);
  //console.log(this.agentPopup);
  //console.log("PArent",this.parent)
  this.agentPopup.send(this.parent, {type: 'dispo', name: this.id });
}



_saveNode(){
  console.log("POPUP SAVE NODE ", this.data);
  this.data = {};
  this.data.blop = "swing";
  var label = this.shadowRoot.getElementById("node-label").value;
  this.data.label = label;
  this.agentPopup.send(this.parent, {type: 'savenode', data: this.data });
}


editNode(data, callback){
console.log("POPUP EDIT NODE ", data, callback);
  if (data.title != undefined){
    this.shadowRoot.getElementById("node-label").value= data.title.replace(/<br\s*\/?>/mg,"");
  }else{
    this.shadowRoot.getElementById("node-label").value=  data.label || "";
  }
  this.selectedShape = data.shape || "ellipse";
  this.selectedType = data.type || "normal";
  this.imageUrl = data.image || "";
  if ((data.color != undefined) && (data.color.background != undefined)){
    this.colorValue = data.color.background
  }
  else{
    this.colorValue =   "rgb(173,208,255)";
  }
  this.shadowRoot.getElementById("nodeSaveButton").onclick = this.saveNodeData.bind(this, data, callback);
  this.shadowRoot.getElementById("nodeCancelButton").onclick = this.cancelNodeEdit.bind(this, callback);
  this.shadowRoot.getElementById("node-popUp").toggle(); //style.display = 'block';
}

cancelNodeEdit (callback) {
  console.log("POPUP CANCEL NODE EDIT ", callback);
  this.clearNodePopUp(this);
  callback(null);
}

clearNodePopUp () {
  console.log("POPUP CLEAR NODE POPUP ");
  this.shadowRoot.getElementById("nodeSaveButton").onclick = null;
  this.shadowRoot.getElementById("nodeCancelButton").onclick = null;
  //  this.$.nodePopUp.toggle();//style.display = 'none';
}

saveNodeData (data, callback) {
  console.log("POPUP SAVE NODE DATA", data, callback);
/*
  data et callback apparaissent comme des events ?????
  {id: "38e05a49-feb0-4d65-a35f-c7c7d973390e", x: -518.5339336634761, y: -388.3170534287593, label: ""}
  spoggy-graph.html:373 Event {isTrusted: false, detail: {…}, type: "tap", target: paper-button#nodeSaveButton, currentTarget: paper-button#nodeSaveButton, …}
  spoggy-graph.html:374 {x: 138, y: 588, sourceEvent: MouseEvent, preventer: undefined}preventer: undefinedsourceEvent: MouseEvent {isTrusted: true, __polymerGesturesHandled: {…}, screenX: 2058, screenY: 654, clientX: 138, …}x: 138y: 588__proto__: Object
  spoggy-graph.html:378 tap
  */

  data.label = this.shadowRoot.getElementById("node-label").value;
  data.shape = this.selectedShape;
  data.color = this.colorValue;
  data.image = this.shadowRoot.getElementById("imgUrl").value;

  data.type = this.selectedType;
  if (data.label.length > 40){
    var titleTemp =data.label.match(/.{1,40}/g);
    //  console.log(titleTemp);
    data.title = titleTemp.join("<br>");
    data.label = titleTemp[0]+'...';
    data.shape = "box";
    //  data.mass = 1/data.label.length
  }
  console.log(data)
  this.clearNodePopUp(this);
  callback(data);
  /*var node = this.network.body.data.nodes.get(data.id);
  console.log(node);
  var action = {};
  action.type = "newNode";
  action.data = node;
  console.log
  this.agentGraph.send('agentSocket', {type: "newActions", actions: [action]});
  this.agentGraph.send('agentSparqlUpdate', {type: "newActions", actions: [action]});
  if( data.type == "graph"){
    console.log("nodeID");
    console.log(node.id);
    var graphNode = this.network.body.data.nodes.get({
      filter: function(node){
        console.log(node);
        return (node.label == "Graph" );
      }
    });
    console.log(graphNode);
    if (graphNode.length == 0){
      console.log("creation du noeud graph");
      var nodeGraph = {};
      nodeGraph.label = "Graph";
      nodeGraph.shape = "star";
      nodeGraph.type = "node";
      nodeGraph.color= "rgb(255,0,0)";
      this.network.body.data.nodes.add(nodeGraph);
    }else{
      console.log("récupération du noeud graph");
    }
    graphNode = this.network.body.data.nodes.get({
      filter: function(node){
        console.log(node);
        return (node.label == "Graph" );
      }
    });
    var actionNodeGraph = {};
    actionNodeGraph.type = "newNode";
    actionNodeGraph.data = graphNode[0];
    //  this.addAction(actionNodeGraph);
    this.agentGraph.send('agentSocket', {type: "newActions", actions: [actionNodeGraph]});
    this.agentGraph.send('agentSparqlUpdate', {type: "newActions", actions: [actionNodeGraph]});
    console.log(graphNode);
    console.log(node.id);
    var edgeGraph = {};
    edgeGraph.from = node.id;
    edgeGraph.to = graphNode[0].id;
    edgeGraph.label = "type";
    var graphEdge = this.network.body.data.edges.get({
      filter: function(edge){
        console.log(edge);
        return (edge.from == edgeGraph.from && edge.to == edgeGraph.to && edge.label == edgeGraph.label);
      }
    });
    console.log(graphEdge);
    if(graphEdge.length == 0){
      this.network.body.data.edges.add(edgeGraph);
    }
    graphEdge = this.network.body.data.edges.get({
      filter: function(edge){
        console.log(edge);
        return (edge.from == edgeGraph.from && edge.to == edgeGraph.to && edge.label == edgeGraph.label);
      }
    });
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEee");
    console.log(graphEdge);
    var actionedgeGraph = {};
    actionedgeGraph.type = "newEdge";
    actionedgeGraph.data = graphEdge;
    //    this.addAction(actionedgeGraph);
    console.log([action]);
    this.agentPopup.send('agentSocket', {type: "newActions", actions: [action]});
    this.agentPopup.send('agentSparqlUpdate', {type: "newActions", actions: [action]});
  }*/
  /*
  if( data.type == "graph"){
  var graphNode = this.network.body.data.nodes.get({
  filter: function(node){
  console.log(node);
  return (node.label == "Graph" );
}
});
console.log(graphNode);
var n ;
if(graphNode.length==0){
console.log("creation");
// creation du noeud Graph
var nodeGraph = {};
nodeGraph.label = "Graph";
nodeGraph.shape = "star";
n= this.network.body.data.nodes.add(nodeGraph)[0];
}else{
console.log("exist");
n = graphNode[0].id;
}
console.log(n);
var actionTo = {};
actionTo.type = "newNode";
actionTo.data = this.network.body.data.nodes.get(n);
console.log(actionTo);
this.addAction(actionTo);
var edgeGraph = {};
edgeGraph.label = "type";
edgeGraph.from = data.id;
edgeGraph.to = n;
this.addEdgeIfNotExist(this.network, edgeGraph);
var edge;
var existEdge = this.network.body.data.edges.get({
filter: function(edge){
return (edge.from == edgeGraph.from && edge.to == edgeGraph.to && edge.label == edgeGraph.label);
}
});
console.log(existEdge);
if(existEdge.length == 0){
edge = this.network.body.data.edges.update(edgeGraph);
}else{
edge = existEdge[0];
}
console.log(edge);
var actionGraph = {};
actionGraph.type = "newEdge";
//var e= this.network.body.data.edges.update(edgeGraph);
var e = this.network.body.data.edges.get(edge[0]);
console.log(e);
actionGraph.data = e;
console.log(actionGraph);
this.addAction(actionGraph);
*/
//}
/*this.nodes = [];
this.nodes = this.network.body.data.nodes;*/
}

updated(changedProperties){
  super.updated(changedProperties)
  changedProperties.forEach((oldValue, propName) => {
    console.log(`${propName} changed. oldValue: ${oldValue}`);
    //  console.log("WHICH UPDATED: ",this.which)
    //  console.log("DATA UPDATED: ",this.data)
  });
}

update(changedProperties){
  super.update(changedProperties)
  /*changedProperties.forEach((oldValue, propName) => {
  console.log(`${propName} changed. oldValue: ${oldValue}`);
  console.log("WHICH UPDATE: ",this.which)
});*/
//console.log("HAS WHICH : ",changedProperties.has('which'))
//console.log("HAS MOOD : ",changedProperties.has('mood'))
/*if (changedProperties.has('which')){
  //console.log(this.which)
  let pop = this.shadowRoot.getElementById(this.which);
  if(pop != null){
    console.log(pop);
    pop.toggle();
  }
}*/
}
/*update(changedProperties) {
super.update(changedProperties);
console.log(changedProperties)
/*changedProperties.forEach((oldValue, propName) => {
console.log(`${propName} changed. oldValue: ${oldValue}`);
console.log(changedProperties.has('which'))
});

return changedProperties.has('which');
}*/
/*updated(which){
console.log("UPDATED :",which);
let pop = this.app.$[popup];
console.log(pop);
pop.toggle();
}*/

/*update(changedProps) {
super.update(changedProps);
console.log('update!', changedProps);
}*/



}

customElements.define('vis-popup', VisPopup);
