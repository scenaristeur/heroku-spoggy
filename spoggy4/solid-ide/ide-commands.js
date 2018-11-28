import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../src/shared-styles.js';
import '@polymer/paper-button/paper-button.js';
/*import "../spoggy/spoggy-input.js";
import "../spoggy/spoggy-vis.js";*/
/*import "../spoggy/my-element.js";*/


class IdeCommands extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    </style>

    <div class="card">
    <div class="circle">IdeCommands</div>
    <div>
    <paper-button id="save" raised>Save Edits</paper-button>
    <paper-button id="view" raised>View</paper-button>
    <paper-button id="options" raised>Options</paper-button>
    </div>
    <!--  <h1>Tutoriel</h1>
    <p>Modus commodo minimum eum te, vero utinam assueverit per eu.</p>
    <p>Ea duis bonorum nec, falli paulo aliquid ei eum.Has at minim mucius aliquam, est id tempor laoreet.Pro saepe pertinax ei, ad pri animal labores suscipiantur.</p>
    -6>    </div>

    <div class="card">
    <spoggy-input></spoggy-input><!--import "../spoggy/spoggy-input.js";-->
    <!--<solid-login id="solid-login"></solid-login>-->

    </div>
    `;
  }

  connectedCallback(){
    super.connectedCallback();

  }
}

window.customElements.define('ide-commands', IdeCommands);
