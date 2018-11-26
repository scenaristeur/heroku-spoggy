import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../src/shared-styles.js';

import '@polymer/paper-button/paper-button.js';
/*import "../spoggy/spoggy-vis.js";*/
/*import "../spoggy/my-element.js";*/


class SolidLogin extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    </style>

    <div class="card">
    <div class="circle">SolidLogin</div>
    <div>
    <p hidden$="{{connected}}">
    Pour pouvoir utiliser Solid, vous devez dans un premier temps vous connecter à votre POD.</br>
    To use Solid, you must first login to your POD.
    </p>

    <paper-button
    id="loginBtn"
    hidden$="{{connected}}"
    on-tap="popupLogin"
    raised>Login / Connection</paper-button>

    <paper-button
    id="logoutBtn"
    hidden$="{{!connected}}"
    on-tap="logout"
    raised>Logout / Deconnexion</paper-button>
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
      connected: Boolean
    }
  }

  connectedCallback(){
    super.connectedCallback();
    console.log(solid)
    console.log($rdf)
    //this.status = "inconnu"

    solid.auth.trackSession(session => {
      if (!session){
        console.log('The user is not logged in')
        this.connected = false
      }
      else{
        console.log(`The user is ${session.webId}`)
        this.connected = true
      }
    })
  }

  isconected() {
    console.log("computing...");
    return this.connected;
  }

  async popupLogin() {
    let session = await solid.auth.currentSession();
    let popupUri = 'https://solid.community/common/popup.html';
    if (!session)
    session = await solid.auth.popupLogin({ popupUri });
    alert(`Logged in as ${session.webId}`);
  }

  logout(){
    solid.auth.logout()
    .then(() => alert('Goodbye!'));
  }
}

window.customElements.define('solid-login', SolidLogin);
