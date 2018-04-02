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
import '@polymer/paper-button/paper-button.js';

class SpoggyNews extends PolymerElement {
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
    <p>You like news.</p>
    <paper-button on-tap="dela">A</paper-button>
    <paper-button on-tap="delb">B</paper-button>
    <paper-button on-tap="delc">C</paper-button>
    <paper-button on-tap="deld">D</paper-button>

    `;
  }
  ready(){
    super.ready();
    console.log(lg);
    let db =  lg.base.init("test", function(rep){console.log(rep);});
    this.db = db;
  /*  db.put([{
      subject: "matteo",
      predicate: "friend",
      object: "daniele"
    }, {
      subject: "daniele",
      predicate: "friend",
      object: "matteo"
    }, {
      subject: "daniele",
      predicate: "friend",
      object: "marco"
    }, {
      subject: "lucio",
      predicate: "friend",
      object: "matteo"
    }, {
      subject: "lucio",
      predicate: "friend",
      object: "marco"
    }, {
      subject: "marco",
      predicate: "friend",
      object: "davide"
    }], function () {

      var stream = db.searchStream([{
        subject: "matteo",
        predicate: "friend",
        object: db.v("x")
      }, {
        subject: db.v("x"),
        predicate: "friend",
        object: db.v("y")
      }, {
        subject: db.v("y"),
        predicate: "friend",
        object: "davide"
      }]);

      stream.on("data", function(data) {
        // this will print "{ x: 'daniele', y: 'marco' }"
        console.log(data);
      });
      db.get({ }, function(err, list) {
        console.log(list);
      });

    });*/
  }
  dela(){
    var db =  this.db;
    var triple = {subject: "lucio", predicate: "friend", object: "matteo"};
db.del(triple, function(err) {
  // do something after the triple is deleted
  db.get({ }, function(err, list) {
    console.log(list);
  });
});
  }
  delb(){
    var db =  this.db;
    var triple = {subject: "lucio", predicate: "friend", object: "marco"};
db.del(triple, function(err) {
  // do something after the triple is deleted
  db.get({ }, function(err, list) {
    console.log(list);
  });
});
  }
  delc(){
    var db =  this.db;
    var triple = {subject: "daniele", predicate: "friend", object: "marco"};
db.del(triple, function(err) {
  // do something after the triple is deleted
  db.get({ }, function(err, list) {
    console.log(list);
  });
});
  }
  deld(){
    var db =  this.db;
    var triple = { subject: "matteo", predicate: "friend", object: "daniele"};
db.del(triple, function(err) {
  // do something after the triple is deleted
  db.get({ }, function(err, list) {
    console.log(list);
  });
});
  }

  /*var triple = { subject: "a", predicate: "b", object: "c" };
  db.del(triple, function(err) {
  // do something after the triple is deleted
});
*/
}

// Register the element with the browser.
customElements.define('spoggy-news', SpoggyNews);
