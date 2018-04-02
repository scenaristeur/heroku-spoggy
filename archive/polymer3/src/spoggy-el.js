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
import  './js/rdf-ext-all-latest.js';
import * as lg from './spoggy-levelgraphBehavior.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';


class SpoggyEl extends PolymerElement {
  static get properties () {
    return {
      text:{
        type: String,
        value: ''
      }
    };
  }
  callbackWrite(rep){
    console.log(rep);
  }
  _baseOk(date){
    console.log("la base est ok en callback "+date);
  }
  _newEl(){
    if (this.$.zone_texte.value != undefined){
      this.text = this.$.zone_texte.value.trim();

      //pb blanknode initialise toujours à b1, envoyer d'abord à vis pour id unique
      let triple = rdf.triple(rdf.blankNode(), rdf.namedNode("label"), rdf.literal(this.text,this.language));
      console.log(triple);
      lg.base.putTriplet(triple, this.callbackWrite);
      this.$.zone_texte.value="";
      this.$.zone_texte.focus();
    }
  }
  ready(){
    // If you override ready, always call super.ready() first.
    super.ready();
    // Output the custom element's HTML tag to the browser console.
    // Open your browser's developer tools to view the output.
    console.log(this.tagName);
    this.language = window.navigator.userLanguage || window.navigator.language; //works IE/SAFARI/CHROME/FF
  
  }


  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
    <paper-textarea rows="4" cols="50" id="zone_texte" autofocus label="Ici c'est l'espace 'Expression Libre' "></paper-textarea>
    <paper-button raised on-tap="_newEl">Envoyer</paper-button><paper-input label="lang" value="[[language]]"></paper-input>
    `;
  }
}

// Register the element with the browser.
customElements.define('spoggy-el', SpoggyEl);
