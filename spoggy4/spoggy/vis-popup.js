
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
    Which : ${this.which}<br>
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
    <paper-button id="node-saveButton" dialog-confirm  raised @click="${() =>  this._saveNode()}" >ok</paper-button>
    <paper-button id="node-cancelButton"  dialog-dismiss raised>Annuler</paper-button>
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
      which: {
        type: String,
        reflect: true,
        /*hasChanged(newVal, oldVal) {
        console.log(newVal,oldVal)
      }*/
    },
    parent: {
      type: String
    },
  };
}

constructor() {
  super();
  this.mood = 'vis-popup';
  this.which = "none";

}


firstUpdated(){
  console.log( 'id : ', this.id);
  this.agentPopup = new PopupAgent(this.id, this);
  //console.log(this.agentPopup);
  //console.log("PArent",this.parent)
  this.agentPopup.send(this.parent, {type: 'dispo', name: this.id });
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
if (changedProperties.has('which')){
  //console.log(this.which)
  let pop = this.shadowRoot.getElementById(this.which);
  if(pop != null){
    console.log(pop);
    pop.toggle();
  }
}
}

_saveNode(){
  this.data = {};
  this.data.blop = "swing";
  var label = this.shadowRoot.getElementById("node-label").value;
  this.data.label = label;
  this.agentPopup.send(this.parent, {type: 'savenode', data: this.data });
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
