/**
* @license
* Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* inspire de
https://www.polymer-project.org/blog/2018-03-23-polymer-3-latest-preview.html
https://github.com/PolymerLabs/start-polymer3
https://github.com/Polymer/polymer-cli
https://github.com/Polymer/polymer/tree/__auto_generated_3.0_preview
*/
// Import statements in Polymer 3.0 can now use package names.
// polymer-element.js now exports PolymerElement instead of Element,
// so no need to change the symbol.
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-button/paper-button.js';
import  './js/rdf-ext-all-latest.js';
import('./spoggy-el.js');
import('./spoggy-triplet.js');
import('./spoggy-holacracy.js');
import('./spoggy-graph.js');
import('./spoggy-options.js');
import('./spoggy-news.js');
import('./spoggy-contact.js');
import('./spoggy-about.js');


class StartSpoggy extends PolymerElement {
  static get properties () {
    return {
      page:{
        type: String,
        value: 'graph'
      }
    };
  }

  constructor() {
    // If you override the constructor, always call the
    // superconstructor first.
    super();
  }

  ready(){
    // If you override ready, always call super.ready() first.
    super.ready();
    // Output the custom element's HTML tag to the browser console.
    // Open your browser's developer tools to view the output.
    console.log(this.tagName);
    //this.testRdfExt();
    //  console.log(this.pageIs(this.page,'el'));
  }

  _selectPage(event, detail, sender){
    this.page = event.currentTarget.id;
  }
  pageIs(page, activePage){
    return page == activePage;
  }
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
    <paper-button raised id="graph"  on-tap="_selectPage">Graph</paper-button>
    <paper-button raised id="el"  on-tap="_selectPage">Expression Libre</paper-button>
    <paper-button raised id="triplet"  on-tap="_selectPage">Triplet</paper-button>
    <paper-button raised id="holacracy"  on-tap="_selectPage">Holocracy</paper-button>
    <paper-button raised id="options"  on-tap="_selectPage">Options</paper-button>
    <paper-button raised id="news"  on-tap="_selectPage">News</paper-button>
    <paper-button raised id="contact"  on-tap="_selectPage">Contact</paper-button>
    <paper-button raised id="about"  on-tap="_selectPage">About</paper-button>

    <template is="dom-if" if=[[pageIs(page,'el')]]>
    <spoggy-el><p>el loading...</p></spoggy-el>
    </template>
    <template is="dom-if" if=[[pageIs(page,'triplet')]]>
    <spoggy-triplet><p>triplet loading...</p></spoggy-triplet>
    </template>
    <template is="dom-if" if=[[pageIs(page,'holacracy')]]>
    <spoggy-holacracy><p>holacracy loading...</p></spoggy-holacracy>
    </template>
    <template is="dom-if" if=[[pageIs(page,'graph')]]>
    <spoggy-graph><p>graph loading...</p></spoggy-graph>
    </template>
    <template is="dom-if" if=[[pageIs(page,'options')]]>
    <spoggy-options><p>options loading...</p></spoggy-options>
    </template>
    <template is="dom-if" if=[[pageIs(page,'news')]]>
    <spoggy-news><p>news loading...</p></spoggy-news>
    </template>
    <template is="dom-if" if=[[pageIs(page,'contact')]]>
    <spoggy-contact><p>contact loading...</p></spoggy-contact>
    </template>
    <template is="dom-if" if=[[pageIs(page,'about')]]>
    <spoggy-about><p>about loading...</p></spoggy-about>
    </template>
    `;
  }


}

// Register the element with the browser.
customElements.define('start-spoggy', StartSpoggy);


/*  testRdfExt(){
    //https://github.com/rdf-ext/rdf-examples
    // create a new SPARQL store instance pointing to the dbpedia endpoint
    const store = new SparqlStore({
      factory: rdf,
      endpointUrl: 'https://dbpedia.org/sparql'
    })
    console.log(store);
    console.log(rdf);

    // fetch all triples for the Eiffel Tower subject and opening date predicate
    const stream = store.match(
      rdf.namedNode('http://dbpedia.org/resource/Eiffel_Tower'),
      rdf.namedNode('http://dbpedia.org/ontology/openingDate')
    )
    let test = rdf.literal('test')
    console.log(test)
    // forward errors to the console
    stream.on('error', (err) => {
      console.error(err.stack || err.message)
    })
    // write the object value of the matching triple to the console
    stream.on('data', (quad) => {
      console.log('The Eiffel Tower opened on: ' + quad.object.value)
    })
  }
  */
