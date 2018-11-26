import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../src/shared-styles.js';
import  '/node_modules/solid-auth-client/dist-lib/solid-auth-client.bundle.js';
import  '/node_modules/rdflib/dist/rdflib.min.js';
import "./solid-login.js";
import "./solid-profile.js";
import "./solid-browser.js";
import "./solid-friends.js";
import "./solid-apps.js";
import "./solid-spoggy.js";
/*import "../spoggy/my-element.js";*/


class SpoggySolid extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    </style>

    <div class="card">
    <div class="circle">Solid</div>
    <p> status : {{status}}</p>
    <!--  <h1>Tutoriel</h1>
    <p>Modus commodo minimum eum te, vero utinam assueverit per eu.</p>
    <p>Ea duis bonorum nec, falli paulo aliquid ei eum.Has at minim mucius aliquam, est id tempor laoreet.Pro saepe pertinax ei, ad pri animal labores suscipiantur.</p>
    -6>    </div>

    <div class="card">
    <spoggy-input></spoggy-input><!--import "../spoggy/spoggy-input.js";-->
    <solid-login id="solid-login"></solid-login>
    <solid-profile id="solid-profile"></solid-profile>
    <solid-browser id="solid-browser"></solid-browser>
    <solid-friends id="solid-friends"></solid-friends>
    <solid-apps id="solid-apps"></solid-apps>
    <solid-spoggy id="solid-spoggy"></solid-spoggy>




    </div>
    `;
  }

  static get properties() {
   return {
     status: String
   }
 }

  connectedCallback(){
    super.connectedCallback();
    console.log(solid)
    console.log($rdf)
    this.status = "inconnu"

    solid.auth.trackSession(session => {
      if (!session){
      console.log('The user is not logged in')
      this.status = "deconnecté"
    }
      else{
      console.log(`The user is ${session.webId}`)
      this.status = "connecté"
    }
    })
  }
}

window.customElements.define('spoggy-solid', SpoggySolid);
