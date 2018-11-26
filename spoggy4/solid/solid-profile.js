import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../src/shared-styles.js';
import '@polymer/paper-input/paper-input.js';
/*import "../spoggy/spoggy-input.js";
import "../spoggy/spoggy-vis.js";*/
/*import "../spoggy/my-element.js";*/


class SolidProfile extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    </style>

    <div class="card">
    <div class="circle">SolidProfile</div>
    <div>
    <paper-input id="podInput" label="POD"></paper-input>
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
    var app = this;
    console.log(solid)
    console.log($rdf)

    solid.auth.trackSession(session => {
      if (!session){
          console.log('The user is not logged in')
          app.$.podInput.value= ""
      }

      else{
        console.log(`The user is ${session.webId}`)
        app.$.podInput.value= session.webId;
      }

    })
  }
}

window.customElements.define('solid-profile', SolidProfile);
