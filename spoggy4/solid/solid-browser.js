import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../src/shared-styles.js';
/*import "../spoggy/spoggy-input.js";
import "../spoggy/spoggy-vis.js";*/
/*import "../spoggy/my-element.js";*/


class SolidBrowser extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    </style>

    <div class="card">
    <div class="circle">SolidBrowser</div>
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
      store: Object,
      fetcher: Object,
      me: Object
    }
  }

  connectedCallback(){
    super.connectedCallback();
    var app = this;
    console.log(solid)
    console.log($rdf)

    solid.auth.trackSession(session => {
      if (!session){
        console.log('The user is not logged in')
        app.me = null;
      }
      else{
        console.log(`The user is ${session.webId}`)
        app.me = $rdf.sym(session.webId)
        app.store = $rdf.graph() // Make a Quad store
        app.fetcher = $rdf.fetcher(this.store) // Attach a web I/O module, store.fetcher
        app.store.updater = new $rdf.UpdateManager(this.store) // Add real-time live updates store.updater
        console.log(app.me)
        console.log(app.fetcher)
        console.log(app.store)
      }

    })
  }
}

window.customElements.define('solid-browser', SolidBrowser);
