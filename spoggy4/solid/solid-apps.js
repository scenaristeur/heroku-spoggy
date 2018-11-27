import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-item/paper-item.js';
import '../src/shared-styles.js';
/*import "../spoggy/spoggy-input.js";
import "../spoggy/spoggy-vis.js";*/
/*import "../spoggy/my-element.js";*/


class SolidApps extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    </style>

    <div class="card">
    <div class="circle">SolidApps</div>
    <div>
    <template is="dom-repeat" items="[[apps]]">
    <paper-item raised on-tap="selectApp">[[item]]</paper-item>

    </template>
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

  static get properties() {
    return {
      apps: {type: Array, value: ["spoggy", "holacratie"]},
      fetcher: Object,
      me: Object
    }
  }

  connectedCallback(){
    super.connectedCallback();
    console.log(solid)
    console.log($rdf)

    solid.auth.trackSession(session => {
      if (!session)
      console.log('The user is not logged in')
      else
      console.log(`The user is ${session.webId}`)
    })
  }

  selectApp(e){
    console.log(e)

  }
}

window.customElements.define('solid-apps', SolidApps);
