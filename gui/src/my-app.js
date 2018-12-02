import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@next/polymer-element.js?module';

class MyApp extends PolymerElement {

  static get properties() { return { mood: String }}

  static get template() {
    return html`
      <style> .mood { color: green; } </style>
      Web Components APP are <span class="mood">[[mood]]</span>!
    `;
  }
}

customElements.define('my-app', MyApp);
