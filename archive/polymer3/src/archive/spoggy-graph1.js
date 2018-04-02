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
import * as vis from './spoggy-visBehavior.js';
import * as lg from './spoggy-levelgraphBehavior.js';

class SpoggyGraph extends PolymerElement {


  _graphOk(date){
    console.log("lle graph est ok en callback "+date);
  }

  ready(){
    // If you override ready, always call super.ready() first.
    super.ready();
    // Output the custom element's HTML tag to the browser console.
    // Open your browser's developer tools to view the output.
    console.log(this.tagName);
    let   container = this.$.mynetwork;
    vis.graph.init( container, this._graphOk);
  }




  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`

    <style>
    #mynetwork {
    width: 1000px;
    height: 500px;
    border: 1px solid lightgray;
  }
  #operation {
    font-size:28px;
  }
  #node-popUp {
    display:none;
    position:absolute;
    top:350px;
    left:170px;
    z-index:299;
    width:250px;
    height:120px;
    background-color: #f9f9f9;
    border-style:solid;
    border-width:3px;
    border-color: #5394ed;
    padding:10px;
    text-align: center;
  }
  #edge-popUp {
    display:none;
    position:absolute;
    top:350px;
    left:170px;
    z-index:299;
    width:250px;
    height:90px;
    background-color: #f9f9f9;
    border-style:solid;
    border-width:3px;
    border-color: #5394ed;
    padding:10px;
    text-align: center;
  }

    </style>


    <p class="test">You like graph.</p>
    <!-- NETWORK -->
    <div id="node-popUp">
    <span id="node-operation">node</span> <br>
    <table style="margin:auto;">
    <tr>
    <td>id</td><td><input id="node-id" value="new value" /></td>
    </tr>
    <tr>
    <td>label</td><td><input id="node-label" value="new value" autiofocus /></td>
    </tr>
    </table>
    <input type="button" value="save" id="node-saveButton" />
    <input type="button" value="cancel" id="node-cancelButton" />
    </div>

    <div id="edge-popUp">
    <span id="edge-operation">edge</span> <br>
    <table style="margin:auto;">
    <tr>
    <td>label</td><td><input id="edge-label" value="new value" autofocus /></td>
    </tr></table>
    <input type="button" value="save" id="edge-saveButton" />
    <input type="button" value="cancel" id="edge-cancelButton" />
    </div>

    <br />
    <div id="mynetwork"></div>
    <!-- FIN NETWORK -->

    `;
  }
}

// Register the element with the browser.
customElements.define('spoggy-graph', SpoggyGraph);
