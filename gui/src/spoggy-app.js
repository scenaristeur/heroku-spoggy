import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@next/polymer-element.js?module';

class SpoggyApp extends PolymerElement {

  static get properties() { return { mood: String }}

  static get template() {
    return html`
      <style> .mood { color: green; } </style>
      Web Components SPOGGY are <span class="mood">[[mood]]</span>!
    `;
  }
}

customElements.define('spoggy-app', SpoggyApp);
