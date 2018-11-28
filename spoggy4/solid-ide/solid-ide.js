import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../src/shared-styles.js';
import "./ide-current.js";
import "./ide-commands.js";
import "./ide-foldermenu.js";
import "./ide-filemanager.js";
import "./ide-foldermanager.js";
import "./ide-optionsmanager.js";
import "./ide-filedisplay.js";
/*import "../spoggy/spoggy-vis.js";*/
/*import "../spoggy/my-element.js";*/


class SolidIde extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    </style>

    <div class="card">
    <div class="circle">SolidIde</div>
    <!--  <h1>Tutoriel</h1>
    <p>Modus commodo minimum eum te, vero utinam assueverit per eu.</p>
    <p>Ea duis bonorum nec, falli paulo aliquid ei eum.Has at minim mucius aliquam, est id tempor laoreet.Pro saepe pertinax ei, ad pri animal labores suscipiantur.</p>
    -6>    </div>

    <div class="card">
    <spoggy-input></spoggy-input><!--import "../spoggy/spoggy-input.js";-->
    <!--<solid-login id="solid-login"></solid-login>-->
  <div>  Current : {{current}}
  </div>
    <ide-current current={{current}}></ide-current>
    <ide-commands></ide-commands>
    <ide-foldermenu current={{current}}></ide-foldermenu>
    <ide-filemanager current={{current}}></ide-filemanager>
    <ide-foldermanager current={{current}}></ide-foldermanager>
    <ide-optionsmanager></ide-optionsmanager>
    <ide-filedisplay current={{current}}></ide-filedisplay>
    </div>
    `;
  }

  connectedCallback(){
    super.connectedCallback();

  }
}

window.customElements.define('solid-ide', SolidIde);
