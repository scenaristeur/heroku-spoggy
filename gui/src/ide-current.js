import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@next/polymer-element.js?module';

class IdeCurrent extends PolymerElement {

  static get properties() { return { mood: String }}

  static get template() {
    return html`
      <style> .mood { color: green; } </style>
      IDE CURRENT are <span class="mood">[[mood]]</span>!
    `;
  }
}

customElements.define('ide-current', IdeCurrent);
