import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@next/polymer-element.js?module';
import 'https://cdn.jsdelivr.net/gh/scenaristeur/heroku-spoggy/gui/src/ide-current.js';

class SpoggyApp extends PolymerElement {

  static get properties() { return { mood: String }}

  static get template() {
    return html`
      <style> .mood { color: green; } </style>
      Web Components SPOGGY are <span class="mood">[[mood]]</span>!
      <br>
      <ide-current>ide-current chargement</ide-current>

    `;
  }
}

customElements.define('spoggy-app', SpoggyApp);
