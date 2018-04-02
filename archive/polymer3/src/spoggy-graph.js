/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

// Import statements in Polymer 3.0 can now use package names.
// polymer-element.js now exports PolymerElement instead of Element,
// so no need to change the symbol.
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
//import * as rdf from './js/rdf-ext-all-latest.js';
//import * as lg from './spoggy-levelgraphBehavior.js';
//import * as vis from './spoggy-visBehavior.js';
import * as sg from './spoggy-generalBehavior.js';


import '@polymer/paper-slider/paper-slider.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-dialog-behavior/paper-dialog-behavior.js';
import '@polymer/paper-dialog-behavior/paper-dialog-shared-styles.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
/*
import '@polymer/paper-swatch-picker/paper-swatch-picker.js';*/

class SpoggyGraph extends PolymerElement {
  _graphOk(date){
    console.log("le graph est ok en callback "+date);
  }

  callbackWrite(rep){
    console.log(rep);
  }

  ready(){
    // If you override ready, always call super.ready() first.
    super.ready();
    // Output the custom element's HTML tag to the browser console.
    // Open your browser's developer tools to view the output.
    console.log(this.tagName);
    let   container = this.$.mynetwork;
  //  vis.graph.init( this, container, this._graphOk);
    sg.graph.init(this, container, this._graphOk);
  }
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
    <!-- NETWORK -->
    <style include="graphe-styles"></style>
    <style include="vis-styles"></style>
    <style>

    paper-button{background-color:#0D578B;color:white}
    </style>



        <paper-dialog id="popupTtl">
          <h3>Export ttl <paper-button ontap="_pageAide">?</paper-button><paper-button dialog-dismiss raised>X</paper-button></h3>

          <paper-input id="inputFileNameToSaveAs" label="Nom du fichier à sauvegarder (.ttl)"></paper-input>
          <paper-button raised on-tap="saveTextAsFile">Exporter le fichier Ttl</paper-button>
          <paper-dialog-scrollable>
            <paper-textarea id="inputTextToSave" rows="10"></paper-textarea>
          </paper-dialog-scrollable>
        </paper-dialog>



        <paper-dialog id="nodePopUp" backdrop transition="core-transition-bottom">

          <div horizontal start-justified start layout >

            <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon>
            <div style="padding-left:20px" vertical start-justified start layout wrap>

              <!--<h1 style="margin: 0;color: #0D578B;">SUCCESS!</h1>-->
              <h2 id="nodeOperation" style="margin: 0;color: #0D578B;">Ajouter ou modifier un noeud</h2>
              <p>
                <paper-input id="nodeLabel" label="Nom du noeud"></paper-input>
                <!-- checkbox style : https://codepen.io/sevilayha/pen/jCmgE -->
              </p>


              <iron-collapse-button>
                <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Forme</h3>
                <div slot="collapse-content">
                  <fieldset>
                    <legend>Forme</legend>
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
                      <!--          <paper-checkbox name="image" disabled>Image</paper-checkbox>
                      <paper-checkbox name="circularImage" disabled>Image Cercle</paper-checkbox>
                      <paper-checkbox name="icon" disabled>Icone</paper-checkbox>-->
                    </iron-selector>
                  </fieldset>
                </div>
              </iron-collapse-button>
  <!--
              <iron-collapse-button>
                <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Couleur</h3>
                <div slot="collapse-content">
                  <fieldset>
                    <legend>Couleur</legend>
                 <paper-swatch-picker></paper-swatch-picker>
                    <color-picker  id="colorpicker" native value="{{colorValue}}" css-value="{{cssValue}}" alpha="{{alpha}}" position="right"></color-picker>
                    <div class="horizontal-section-container result">
                      <div><code>hex</code>: <b>[[colorValue]]</b></div>
                      <div><code>alpha</code>: <b>[[alpha]]</b></div>
                      <div><code>css-value</code>: <b>[[cssValue]]</b></div>
                    </div>
                  </fieldset>
                </div>
              </iron-collapse-button>
              -->


              <iron-collapse-button>
                <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Type</h3>
                <div slot="collapse-content">
                  (developpements en cours)
                  <fieldset>
                    <legend>Type</legend>
                    <iron-selector id="typeSelector" attr-for-selected="name" selected="{{selectedType}}" selected-attribute="checked">
                      <paper-checkbox name="node">Node</paper-checkbox>
                      <paper-checkbox name="url">Url</paper-checkbox>
                      <paper-checkbox name="graph">Graphe</paper-checkbox>
                      <paper-checkbox name="source">Source</paper-checkbox>
                    </iron-selector>
                  </fieldset>
                </div>
              </iron-collapse-button>

              <div style="padding-top:10px" horizontal end-justified layout self-stretch>
                <paper-button id="nodeSaveButton" raised>ok</paper-button>
                <paper-button id="nodeCancelButton" raised>Annuler</paper-button>
              </div>
            </div>
          </div>
        </paper-dialog>


        <paper-dialog id="edgePopUp" backdrop transition="core-transition-bottom">
          <div horizontal start-justified start layout >
            <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon>
            <div style="padding-left:20px" vertical start-justified start layout wrap>
              <h2 id="edgeOperation" style="margin: 0;color: #0D578B;">Ajouter ou modifier un lien</h2>
              <p >  <paper-input id="edgeLabel" label="Nom du lien"></paper-input></p>
              <div style="padding-top:10px" horizontal end-justified layout self-stretch>
                <paper-button id="edgeSaveButton" raised>ok</paper-button>
                <paper-button id="edgeCancelButton" raised>Annuler</paper-button>
              </div>
            </div>
          </div>
        </paper-dialog>

        <paper-dialog id="importPopUp" backdrop transition="core-transition-bottom">
          <div horizontal start-justified start layout >
            <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon>
            <div style="padding-left:20px" vertical start-justified start layout wrap>
              <h2 id="edgeOperation" style="margin: 0;color: #0D578B;">Import JSON</h2>
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
                  <input id="filepicker" type="file" multiple value="Importer"></input>
                </fieldset>
              </p>
              <div style="padding-top:10px" horizontal end-justified layout self-stretch>
                <paper-button id="importCancelButton" on-tap="_closeImportPopUp" raised>Annuler</paper-button>
              </div>
            </div>
          </div>
        </paper-dialog>

    <!--
    <div id="nodePopUp">
    <span id="nodeOperation">node</span> <br>
    <table style="margin:auto;">
    <tr>
    <td>id</td><td><input id="nodeId" value="new value" /></td>
    </tr>
    <tr>
    <td>label</td><td><input id="nodeLabel" value="new value" autiofocus /></td>
    </tr>
    </table>
    <input type="button" value="save" id="nodeSaveButton" />
    <input type="button" value="cancel" id="nodeCancelButton" />
    </div>

    <div id="edgePopUp">
    <span id="edgeOperation">edge</span> <br>
    <table style="margin:auto;">
    <tr>
    <td>label</td><td><input id="edgeLabel" value="new value" autofocus /></td>
    </tr></table>
    <input type="button" value="save" id="edgeSaveButton" />
    <input type="button" value="cancel" id="edgeCancelButton" />
    </div>
-->

    <div id="mynetwork"></div>
    <!-- FIN NETWORK -->
    `;
  }
}

// Register the element with the browser.
customElements.define('spoggy-graph', SpoggyGraph);
