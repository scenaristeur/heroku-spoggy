import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@next/polymer-element.js?module';
//import './ide-current.js';
//import "https://cdn.jsdelivr.net/gh/scenaristeur/heroku-spoggy/gui/src/ide-current.js"

class SpoggyApp extends PolymerElement {

  static get properties() { return { mood: String }}

  static get template() {
    return html`
      <style> .mood { color: green; } </style>
      Web Components SPOGGY are <span class="mood">[[mood]]</span>!
      <br>

flok a blop
Blik a Blop Filk Flok
before1
  <paper-checkbox>Web Components2! CHECKBOX</paper-checkbox>
after1
    `;
  }
}

customElements.define('spoggy-app', SpoggyApp);
