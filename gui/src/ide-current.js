import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@next/polymer-element.js?module';
import 'https://unpkg.com/@polymer/polymer@next/polymer-legacy.js?module';

/*import "https://unpkg.com/@polymer/paper-input/paper-input.js";*/
/*import "https://unpkg.com/@polymer/paper-button@next/paper-button.js?module";*/

class IdeCurrent extends PolymerElement {

  static get properties() { return { mood: String }}

  static get template() {
    return html`
      <style> .mood { color: green; } </style>
      IDE CURRENT are <span class="mood">[[mood]]</span>!<br>

    33  <paper-checkbox>Web Components 3!</paper-checkbox> 33
    `;
  }
}

customElements.define('ide-current', IdeCurrent);
