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

  static get properties() {
    return {
      store: Object,
      fetcher: Object,
      context: {type: Object, value: {}},
      webId: Object
    }
  }

  connectedCallback(){
    super.connectedCallback();
    var app = this;
    console.log(solid)
    console.log($rdf)
    this.VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
    this.SPACE = $rdf.Namespace('http://www.w3.org/ns/pim/space#');
    this.SOLID = $rdf.Namespace('http://www.w3.org/ns/solid/terms#');
    this.LDP = $rdf.Namespace('http://www.w3.org/ns/ldp#');

    solid.auth.trackSession(session => {
      if (!session){
        console.log('The user is not logged in')
        app.context = null;
        app.$.podInput.value = ""
      }
      else{
        console.log(`The user is ${session.webId}`)
        app.context = {}
        app.context.wedId = session.webId;
        app.$.podInput.value = app.context.wedId;
        app.context.me = $rdf.sym(session.webId)
        app.store = $rdf.graph() // Make a Quad store
        app.fetcher = $rdf.fetcher(app.store) // Attach a web I/O module, store.fetcher
        app.store.updater = new $rdf.UpdateManager(app.store) // Add real-time live updates store.updater
        app.context.profileDocument = app.context.me.doc()
        console.log(app.context.me)
        console.log(app.fetcher)
        console.log(app.store)
        console.log("PROFILEDOC ",app.context.profileDocument)
        this.loadProfileDocument();
      }

    })
  }

  loadProfileDocument(){
    var app = this;
    console.log("LOADING ProfileDocument : ",app.context.profileDocument)
    // Load the profile into the knowledge base (fetcher.store)
    //   withCredentials: Web arch should let us just load by turning off creds helps CORS
    //   reload: Gets around a specifc old Chrome bug caching/origin/cors
    app.fetcher.load(app.context.profileDocument, {withCredentials: false, cache: 'reload'}).then(response => {
      console.log("ok")
      //app.context.publicProfile = profileDocument
      //app.resolve(app.context)
      console.log(response.responseText)
      app.loadPreferences()
    }, err => {
      console.log("erreur")
      let message = 'Logged in but cannot load profile ' + app.context.profileDocument + ' : ' + err
      console.log(message)
      //  context.div.appendChild(error.errorMessageBlock(context.dom, message))
      //app.reject(message)
    })
  }

  /** Checks syncronously whether user is logged in
  *
  * @returns Named Node or null
  */


  currentUser () {
    let str = localStorage['solid-auth-client']
    if (str) {
      let da = JSON.parse(str)
      if (da.session && da.session.webId) {
        // @@ check has not expired
        return $rdf.sym(da.session.webId)
      }
    }
    return null
    // JSON.parse(localStorage['solid-auth-client']).session.webId
  }

  newAppInstance (dom, appDetails, callback) {
  var gotWS = function (ws, base) {
    // $rdf.log.debug("newAppInstance: Selected workspace = " + (ws? ws.uri : 'none'))
    callback(ws, base)
  }
  var div = dom.createElement('div')
  var b = dom.createElement('button')
  b.setAttribute('type', 'button')
  div.appendChild(b)
  b.innerHTML = 'Make new ' + appDetails.noun
  // b.setAttribute('style', 'float: right; margin: 0.5em 1em;'); // Caller should set
  b.addEventListener('click', (e) => {
    div.appendChild(selectWorkspace(dom, appDetails, gotWS))
  }, false)
  div.appendChild(b)
  return div
}

  loadPreferences(){
    var app = this;
    console.log("LOADING Preferences : ")
    let preferencesFile = app.store.any(app.context.me, app.SPACE('preferencesFile'))
    console.log("PREFERNCES FILE :",preferencesFile)

    /*if (!preferencesFile) {
    let message = "Can't find a preferences file pointer in profile "// + app.context.publicProfile
    return reject(new Error(message))
  }*/

  // //// Load preferences file
  app.fetcher.load(preferencesFile, {withCredentials: true})
  .then(function () {
    var me = app.context.me
    app.context.index = app.context.index || {}
    app.context.preferencesFile = preferencesFile
    console.log("AVANT IX FETCH")
    app.context.index.private = app.store.each(me, app.SOLID('privateTypeIndex'), undefined, app.context.preferencesFile)
    app.context.index.public = app.store.each(me, app.SOLID('publicTypeIndex'), undefined, app.context.publicProfile)
    var ix = app.context.index.private.concat(app.context.index.public)
    console.log("IX FETCH : ",ix)
    app.fetcher.load(ix).then(responses => {
      console.log("IX : ",responses)
      responses.forEach(function(r){
        console.log(r.responseText)
      })
      //resolve(context)
      console.log("CONTEXT : ",app.context)
      app.findAppInstances(app.context, 'spoggy')
    }, err => {
      //reject(new Error('Error loading type indexes: ' + err))
      console.log("error : Error loading type indexes: " + err)
    })
    //return resolve(context)
    console.log("CONTEXT FILE FOLDERS ",context)
  },
  function (err) { // Really important to look at why
    let status = err.status
    let message = err.message
    console.log('HTTP status ' + status + ' for pref file ' + preferencesFile)
    let m2
    if (status === 401) {
      m2 = 'Strange - you are not authenticated (properly logged on) to read preferences file.'
    } else if (status === 403) {
      if (differentOrigin()) {
        m2 = 'Unauthorized: Assuming prefs file blocked for origin ' + window.location.origin
        // context.preferencesFileError = m2
        //return resolve(context)
      }
      m2 = 'Strange - you are not authorized to read your preferences file.'
    } else if (status === 404) {
      if (confirm('You do not currently have a Preferences file. Ok for me to create an empty one? ' + preferencesFile)) {
        // @@@ code me  ... weird to have a name o fthe file but no file
        //return complain(new Error('Sorry No code yet to craete a preferences fille at '))
        console.log(new Error('Sorry No code yet to craete a preferences fille at '))
      } else {
        reject(new Error('User declined to craete a preferences fille at '))
        console.log(new Error('User declined to craete a preferences fille at '))
      }
    } else {
      m2 = 'Strange: Error ' + status + ' trying to read your preferences file.' + message
    }
    // alert(m2)
    console.log(m2)
  }) // load prefs file then
  /*}, err => { // Fail initial login load prefs
  reject(new Error('(via loadPrefs) ' + err))
}, err => reject(err))
})*/




}//



findAppInstances (context, klass) {
  var app = this;
  var kb = app.store
  //var ns = UI.ns
  var fetcher = app.fetcher
  //var context = app.context
console.log("find app : ",klass)
  //  return new Promise(function (resolve, reject) {
  //  loadTypeIndexes(context).then(context => {
  var test = kb.each(undefined, undefined, undefined, context.index.public)
  console.log("TEST APP : ", test)
  var registrations = []
  if (context.index.public) {
    registrations = kb.each(undefined, app.SOLID('forClass'), klass, context.index.public)
  }
  if (context.index.private) {
    registrations = registrations.concat(kb.each(undefined, app.SOLID('forClass'), klass, context.index.private))
  }
  console.log("REGISTRATIONS : ",registrations)
  var instances = []
  var containers = []
  for (var r = 0; r < registrations.length; r++) {
    instances = instances.concat(kb.each(klass, app.SOLID('instance')))
    containers = containers.concat(kb.each(klass, app.SOLID('instanceContainer')))
  }
  if (!containers.length) {
    context.instances = instances
    context.containers = []
    //  resolve(context)
    console.log(context)
  }
  fetcher.load(containers)
  .then(responses => {
    for (var i = 0; i < containers.length; i++) {
      var cont = containers[i]
      instances = instances.concat(kb.each(cont, app.LDP('contains')))
    }
    context.instances = instances
    context.containers = containers
    resolve(context)
  }, err => {
    reject(new Error('[FAI] Unable to load containers' + err))
  })
  //  }, err => reject(new Error('Error looking for instances of ' + klass + ': ' + err)))
  //  })
}

resolve(context){
  console.log(context)
}
reject(message){
  console.log(message)
}



}

window.customElements.define('solid-profile', SolidProfile);
