import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@next/polymer-element.js?module';
//import '../src/shared-styles.js';
import 'https://cdn.jsdelivr.net/gh/scenaristeur/heroku-spoggy/gui/src/shared-styles.js';
/*import '@polymer/paper-card/paper-card.js';*/
//import '@polymer/paper-button/paper-button.js';
//import '@polymer/paper-input/paper-input.js';
import "https://unpkg.com/@polymer/paper-input@next/paper-input.js?module";
import "https://unpkg.com/@polymer/paper-button@next/paper-button.js?module";
//https://jeff-zucker.github.io/solid-file-client/
//import  '/node_modules/solid-file-client/solid-file-client.js';
import { SolidTools } from "https://cdn.jsdelivr.net/gh/scenaristeur/heroku-spoggy/spoggy4/solid-ide/solid-tools.js"

class IdeCurrent extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    </style>

    <div class="card">
    <div class="circle">IdeCurrent</div>
    <paper-input id="currentInput" label="Current Folder / Dossier Courant" value="{{public}}"></paper-input>
    <paper-button id="goBtn" raised on-tap="go">Go</paper-button>
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
      context: {type: Object, value: {}},
      webId: Object,
      public: {type: String, notify: true},
      current: {type: Object, notify: true},
      thing: {type: Object, value: {}}
    }
  }

  connectedCallback(){
    super.connectedCallback();
    var app = this;

    console.log(solid)
    console.log($rdf)
  //  this.fileclient = new SolidFileClient();
    this.st = new SolidTools();
    this.st.fileclient = new SolidFileClient();
    console.log("FILE CLIENT ", this.fileclient )
    // NAMESPACES : https://github.com/solid/solid-namespace/blob/master/index.js
    this.VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
    this.SPACE = $rdf.Namespace('http://www.w3.org/ns/pim/space#');
    this.SOLID = $rdf.Namespace('http://www.w3.org/ns/solid/terms#');
    this.LDP = $rdf.Namespace('http://www.w3.org/ns/ldp#');
    this.RDFS = $rdf .Namespace('http://www.w3.org/2000/01/rdf-schema#');
    this.OWL = $rdf .Namespace('http://www.w3.org/2002/07/owl#');

    solid.auth.trackSession(session => {
      if (!session){
        console.log('The user is not logged in')
        app.context = null;
        //app.$.podInput.value = ""
        app.current = {}
        app.thing = {}
      }
      else{
        console.log(`The user is ${session.webId}`)
        app.context = {}
        app.context.wedId = session.webId;

        app.context.me = $rdf.sym(session.webId)
        app.store = $rdf.graph() // Make a Quad store
        app.fetcher = $rdf.fetcher(app.store) // Attach a web I/O module, store.fetcher
        app.store.updater = new $rdf.UpdateManager(app.store) // Add real-time live updates store.updater
        app.context.profileDocument = app.context.me.doc()
        console.log(app.context.me)
        console.log(app.fetcher)
        console.log(app.store)
        console.log("PROFILEDOC ",app.context.profileDocument)
        var wedIdSpilt = session.webId.split("/");
        this._webIdRoot = wedIdSpilt[0]+"//"+wedIdSpilt[2]+"/";
        console.log(this._webIdRoot);
        app.public = this._webIdRoot+"public/";

        //  this.loadProfileDocument();
      }

    })
  }

  async go(){
    console.log(this.public)
    this.thing.url = this.public;
    var thing = this.thing;
    this.current = await this.st.get(thing);
    console.log("RESULT : ",this.current)
  }



}

//window.customElements.define('ide-current', IdeCurrent);


customElements.define('ide-current', IdeCurrent);
