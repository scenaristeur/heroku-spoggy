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
import * as lg from './spoggy-levelgraphBehavior.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';


class SpoggyTriplet extends PolymerElement {
  callbackWrite(rep){
    console.log(rep);
  }

envoyer(){
let sujet = this.$.sujetInput.value;
let predicat = this.$.predicatInput.value;
let objet = this.$.objetInput.value;
let triple;
if (this.literal || objet.indexOf(" ")> -1){
  triple = rdf.triple(rdf.namedNode(sujet), rdf.namedNode(predicat), rdf.literal(objet, this.language));
}else{
  triple = rdf.triple(rdf.namedNode(sujet), rdf.namedNode(predicat), rdf.namedNode(objet));
}
  console.log(triple);
  lg.base.putTriplet(triple, this.callbackWrite);
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
      <paper-input id="sujetInput" label="Sujet"></paper-input>
      <paper-input id="predicatInput" label="predicat"></paper-input>
      <paper-input id="objetInput" label="Objet"></paper-input>
      <paper-checkbox
        checked={{literal}}>Literal</paper-checkbox>
        <paper-input hidden$="[[!literal]]" label="lang" value="{{language::change}}"></paper-input>
      <paper-button raised on-tap="envoyer">Envoyer</paper-button>
    `;
  }
}

// Register the element with the browser.
customElements.define('spoggy-triplet', SpoggyTriplet);
