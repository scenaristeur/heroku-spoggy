import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../src/shared-styles.js';
import "../spoggy/spoggy-input.js";
import "../spoggy/spoggy-vis.js";
/*import "../spoggy/my-element.js";*/


class SpoggyGraph extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    </style>

    <div class="card">
    <div class="circle">Spoggy-graph</div>
    <h1>Tutoriel</h1>
    <p>Modus commodo minimum eum te, vero utinam assueverit per eu.</p>
    <p>Ea duis bonorum nec, falli paulo aliquid ei eum.Has at minim mucius aliquam, est id tempor laoreet.Pro saepe pertinax ei, ad pri animal labores suscipiantur.</p>
    </div>

    <div class="card">
    <spoggy-input></spoggy-input><!--import "../spoggy/spoggy-input.js";-->
    <spoggy-vis></spoggy-vis>

    </div>
    `;
  }
}

window.customElements.define('spoggy-graph', SpoggyGraph);
