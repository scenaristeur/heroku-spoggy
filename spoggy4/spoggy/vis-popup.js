
import {LitElement, html} from '@polymer/lit-element';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-dialog-behavior/paper-dialog-behavior.js';
import '@polymer/neon-animation/animations/scale-up-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';

class VisPopup extends LitElement {

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
    }
  };
}

constructor() {
  super();
  this.mood = 'vis-popup';
  this.which = "none";
}

render() {
  return html`<style> .mood { color: green; } </style>
  Web Components are <span class="mood">${this.mood}</span>!<br>
  Which : ${this.which}<br>
  <hr>

  <paper-dialog id="node-popUp"  backdrop transition="core-transition-bottom"  >
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
<paper-button id="node-saveButton" dialog-confirm  raised>ok</paper-button>
<paper-button id="node-cancelButton"  dialog-dismiss raised>Annuler</paper-button>
</div>
</div>
<!--</div>-->
</paper-dialog>







<paper-dialog id="edge-popUp"> <!--  backdrop transition="core-transition-bottom" -->
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

  `;
}


updated(changedProperties){
  super.updated(changedProperties)
  changedProperties.forEach((oldValue, propName) => {
    console.log(`${propName} changed. oldValue: ${oldValue}`);
    console.log("WHICH UPDATED: ",this.which)
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
