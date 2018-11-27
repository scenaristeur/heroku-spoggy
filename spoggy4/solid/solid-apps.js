import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
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
    <paper-input id="podInput" label="POD" type="text" size="100"></paper-input>

    <paper-input id="appCreateInput" label="Name of the App / Nom de l'appli"></paper-input>
    <paper-button raised on-tap="createApp">Create / Créer App</paper-button>
    <paper-button raised on-tap="listRegistration">list registered App / lister les applis enregistrees</paper-button>

    <div id="box">box</div>
    <div id="dom">dom</div>

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
    var app = this;
    console.log(solid)
    console.log($rdf)
    // NAMESPACES : https://github.com/solid/solid-namespace/blob/master/index.js
    this.VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
    this.SPACE = $rdf.Namespace('http://www.w3.org/ns/pim/space#');
    this.SOLID = $rdf.Namespace('http://www.w3.org/ns/solid/terms#');
    this.LDP = $rdf.Namespace('http://www.w3.org/ns/ldp#');
    this.RDFS = $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#');
    this.OWL = $rdf.Namespace('http://www.w3.org/2002/07/owl#');
    this.HOLDS = $rdf.Namespace('')

    solid.auth.trackSession(session => {
      if (!session){
        console.log('The user is not logged in')
        app.context = null;
        app.$.podInput.value = ""
      }
      else{
        console.log(`The user is ${session.webId}`)
        app.context = {}
        app.session = session;
        app.context.dom = "";
        app.context.div="";
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
        //  this.loadProfileDocument();
      }

    })
  }

  selectApp(e){
    console.log(e)

  }

  createApp(){
    var name = this.$.appCreateInput.value;
    console.log(name)
    var instance = "testInstance"
    var klass = "testKlass"
    this.registrationControl(this.context, instance, klass).then(function(){console.log("CONTEXTE ",this.context)})
    console.log("CONTEXTE ",this.context)
  }

  listRegistration(){
    var options = {}
    this.registrationList(this.context, options)
  }


  /**
  * UI to control registration of instance
  *
  * @param context
  * @param instance
  * @param klass
  *
  * @returns {Promise}
  */
  registrationControl (context, instance, klass) {
    console.log("registration control")
    var app = this;
    var kb = this.store; //UI.store
    //var ns = UI.ns
    //var dom = context.dom

    var box = this.$.box; //dom.createElement('div')
    //context.div.appendChild(box)

    return app.ensureTypeIndexes(context)
    .then(function (context) {
      box.innerHTML = '<table><tbody><tr></tr><tr></tr></tbody></table>' // tbody will be inserted anyway
      box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;')
      var tbody = box.children[0].children[0]
      var form = kb.bnode()// @@ say for now

      var registrationStatements = function (index) {
        var registrations = kb.each(undefined, app.SOLID('instance'), instance)
        .filter(function (r) { return kb.holds(r, app.SOLID('forClass'), klass) })
        var reg = registrations.length ? registrations[0] : widgets.newThing(index)
        return [ $rdf.st(reg, app.SOLID('instance'), instance, index),
        $rdf.st(reg, app.SOLID('forClass'), klass, index) ]
      }

      var index, statements

      if (context.index.public && context.index.public.length > 0) {
        index = context.index.public[0]
        statements = registrationStatements(index)
        tbody.children[0].appendChild(widgets.buildCheckboxForm(
          context.dom, app.store, 'Public link to this ' + context.noun, null, statements, form, index))
        }

        if (context.index.private && context.index.private.length > 0) {
          index = context.index.private[0]
          statements = registrationStatements(index)
          tbody.children[1].appendChild(widgets.buildCheckboxForm(
            context.dom, app.store, 'Personal note of this ' + context.noun, null, statements, form, index))
          }
          console.log(context)
          return context
        },
        function (e) {
          var msg
          if (context.preferencesFileError) {
            msg = '(Preferences not available)'
            //context.div.appendChild(dom.createElement('p')).textContent = msg
          } else {
            msg = 'registrationControl: Type indexes not available: ' + e
          //  context.div.appendChild(UI.error.errorMessageBlock(context.dom, e))
          }
          console.log(msg)
        })
        .catch(function (e) {
          var msg = 'registrationControl: Error making panel:' + e
        //  context.div.appendChild(UI.error.errorMessageBlock(context.dom, e))
          console.log(msg)
        })

      }

      /**
      * UI to List at all registered things
      * @param context
      * @param options
      *
      * @returns {Promise}
      */
      registrationList (context, options) {
        var app = this;
        const kb = app.store
      //  const ns = UI.ns
      //  const dom = context.dom

        var box = this.$.box;
        //context.div.appendChild(box)

        return app.ensureTypeIndexes(context)
        .then((indexes) => {
          box.innerHTML = '<table><tbody></tbody></table>' // tbody will be inserted anyway
          box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;')
          var table = box.firstChild

          var ix = []
          var sts = []
          var vs = ['private', 'public']
          vs.forEach(function (visibility) {
            if (options[visibility]) {
              ix = ix.concat(context.index[visibility][0])
              sts = sts.concat(kb.statementsMatching(
                undefined,app.SOLID('instance'), undefined, context.index[visibility][0]))
              }
            })

            for (var i = 0; i < sts.length; i++) {
              var statement = sts[i]
              // var cla = statement.subject
              var inst = statement.object
              // if (false) {
              //   var tr = table.appendChild(dom.createElement('tr'))
              //   var anchor = tr.appendChild(dom.createElement('a'))
              //   anchor.setAttribute('href', inst.uri)
              //   anchor.textContent = utils.label(inst)
              // } else {
              // }

              var deleteInstance = function (x) {
                kb.updater.update([statement], [], function (uri, ok, errorBody) {
                  if (ok) {
                    console.log('Removed from index: ' + statement.subject)
                  } else {
                    console.log('Error: Cannot delete ' + statement + ': ' + errorBody)
                  }
                })
              }
              var opts = { deleteFunction: deleteInstance }
              var tr = widgets.personTR(dom, app.SOLID('instance'), inst, opts)
              table.appendChild(tr)
            }

            /*
            //var containers = kb.each(klass, ns.solid('instanceContainer'));
            if (containers.length) {
            fetcher.load(containers).then(function(xhrs){
            for (var i=0; i<containers.length; i++) {
            var cont = containers[i];
            instances = instances.concat(kb.each(cont, ns.ldp('contains')));
          }
        });
      }
      */

      return context
    })
  }



  /**
   * @returns {NamedNode|null}
   */
  defaultTestUser () {
    var app = this;
    // Check for offline override
    let offlineId = app.offlineTestID()

    if (offlineId) {
      return offlineId
    }

    return null
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

  /**
 * @returns {NamedNode|null}
 */
offlineTestID () {
  if (typeof $SolidTestEnvironment !== 'undefined' && $SolidTestEnvironment.username) { // Test setup
    console.log('Assuming the user is ' + $SolidTestEnvironment.username)
    return $rdf.sym($SolidTestEnvironment.username)
  }

  if (typeof document !== 'undefined' &&
    document.location && ('' + document.location).slice(0, 16) === 'http://localhost') {
    var div = document.getElementById('appTarget')
    if (!div) return null
    var id = div.getAttribute('testID')
    if (!id) return null
    /* me = kb.any(subject, UI.ns.acl('owner')); // when testing on plane with no webid
    */
    console.log('Assuming user is ' + id)
    return $rdf.sym(id)
  }
  return null
}

  /**
  * Resolves with the same context, outputting
  * @see https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
  *
  * @private
  *
  * @param context {Object}
  * @param context.me
  * @param context.preferencesFile
  * @param context.preferencesFileError - Set if preferences file is blocked at theis origin so don't use it
  * @param context.publicProfile
  * @param context.index
  *
  * @returns {Promise}
  */
  ensureTypeIndexes (context) {
      console.log("ensureTypeIndexes")
    var app = this;
    return new Promise(function (resolve, reject) {
      return app.loadTypeIndexes(context)
      .then(function (context) {
        console.log('ensureTypeIndexes: Type indexes exist already')
        resolve(context)
      }, function (error) {
        if (confirm('You don\'t have, or you couldn\'t acess,  type indexes --lists of things of different types. Create new empty ones? ' + error)) {
        //  var ns = UI.ns
          var kb = app.store
          var me = app.context.me
          var newIndex

          var makeIndexIfNecesary = function (context, visibility) {
            return new Promise(function (resolve, reject) {
              var relevant = {'private': context.preferencesFile, 'public': context.publicProfile}[visibility]

              function putIndex (newIndex) {
                kb.fetcher.webOperation('PUT', newIndex.uri, {
                  data: '# ' + new Date() + ' Blank initial Type index\n',
                  contentType: 'text/turtle'})
                  .then(function (xhr) {
                    resolve(context)
                  }, function (e) {
                    let msg = 'Error creating new index ' + e
                    widgets.complain(context, msg)
                    reject(new Error(msg))
                  })
                }

                context.index = context.index || {}
                context.index[visibility] = context.index[visibility] || []
                if (context.index[visibility].length === 0) {
                  newIndex = $rdf.sym(relevant.dir().uri + visibility + 'TypeIndex.ttl')
                  console.log('Linking to new fresh type index ' + newIndex)
                  if (!confirm('Ok to create a new empty index file at ' + newIndex + ', overwriting anything that was there?')) {
                    reject(new Error('cancelled by user'))
                  }
                  var addMe = [ $rdf.st(me, app.SOLID(visibility + 'TypeIndex'), newIndex, relevant) ]

                  app.store.updater.update([], addMe, function (uri, ok, body) {
                    if (!ok) {
                      return reject(new Error('Error saving type index link saving back ' + uri + ': ' + body))
                    } else {
                      context.index[visibility].push(newIndex)
                      console.log('Creating new fresh type index ' + newIndex)
                      putIndex(newIndex)
                    }
                  })
                } else {  // officially exists
                  var ix = context.index[visibility][0]
                  kb.fetcher.load(ix).then(response => { //  physically exists
                    resolve(context)
                  }, err => {
                    if (err.status === 404) {
                      if (!confirm('Ok to create a new empty index file at ' + ix + ', overwriting anything that was there?')) {
                        reject(new Error('cancelled by user'))
                      }
                      putIndex(ix)
                    } else {
                      reject(new Error('You should have a type index file ' + ix + ', but ' + err))
                    }
                  })
                }
              }) // promise
            } // makeIndexIfNecesary

            var ps = [ makeIndexIfNecesary(context, 'private'), makeIndexIfNecesary(context, 'public') ]

            return Promise.all(ps)
            .then(() => {
              resolve(context)
            })
          } else { // user cancel
            // @@ code me
          }
        }
      )
    }) // Promise
  }

  /**
   * Resolves with the same context, outputting
   * output: index.public, index.private
   *
   * @see https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
   *
   * @param context
   * @param context.div - place to put UI
   *
   * @returns {Promise<context>}
   */
loadTypeIndexes (context) {
    console.log("loadTypeIndexes")
  //  var ns = UI.ns
  var app = this;
    var kb = app.store; //UI.store

    return new Promise(function (resolve, reject) {
      app.logInLoadPreferences(context).then(context => {
        var me = context.me
        context.index = context.index || {}
        if (!context.preferencesFileError) {
          context.index.private = kb.each(me, app.SOLID('privateTypeIndex'), undefined, context.preferencesFile)
          if (context.index.private.length === 0) {
            return reject(new Error('Your preference file ' + context.preferencesFile + ' does not point to a private type index.'))
          }
        }
        context.index.public = kb.each(me, app.SOLID('publicTypeIndex'), undefined, context.publicProfile)
        if (context.index.public.length === 0) {
          return reject(new Error('Your profile ' + context.publicProfile + ' does not point to a public type index.'))
        }
        var ix = context.index.private.concat(context.index.public)
        kb.fetcher.load(ix).then(responses => {
          resolve(context)
        }, err => {
          reject(new Error('Error loading type indexes: ' + err))
        })
      }, err => {
        reject(new Error('[LTI] ' + err))
      })
    })
  }


   logInLoadProfile (context) {
         console.log("logInLoadProfile")
     var app = this;
    if (context.publicProfile) { return Promise.resolve(context) } // already done
    const fetcher = app.store.fetcher
    var profileDocument
    return new Promise(function (resolve, reject) {
      app.logIn(context)
      .then(context => {
        let webID = context.me
        if (!webID) {
          throw new Error('Could not log in')
        }
        profileDocument = webID.doc()
        // Load the profile into the knowledge base (fetcher.store)
        //   withCredentials: Web arch should let us just load by turning off creds helps CORS
        //   reload: Gets around a specifc old Chrome bug caching/origin/cors
        fetcher.load(profileDocument, {withCredentials: false, cache: 'reload'}).then(response => {
          context.publicProfile = profileDocument
          resolve(context)
        }, err => {
          let message = 'Logged in but cannot load profile ' + profileDocument + ' : ' + err
          context.div.appendChild(error.errorMessageBlock(context.dom, message))
          reject(message)
        })
      },
      err => { reject(new Error("Can't log in: " + err)) })
    })
  }

  /**
 * Resolves with the logged in user's Web ID
 *
 * @param context
 *
 * @returns {Promise<context>}
 */
logIn (context) {
   console.log("logIn")
  var app = this;
  let me = app.defaultTestUser()  // me is a NamedNode or null

  if (me) {
    context.me = me
    return Promise.resolve(context)
  }

  return new Promise((resolve) => {
    app.checkUser().then(webId => { // Already logged in?
      if (webId) {
        context.me = $rdf.sym(webId)
        console.log('logIn: Already logged in as ' + context.me)
        resolve(context)
        return
      }
      let box = app.loginStatusBox(context.dom, (webIdUri) => {
        app.saveUser(webIdUri, context)
        resolve(context) // always pass growing context
      })
      context.div.appendChild(box)
    })
  })
}


/**
 * @returns {Promise<string|null>} Resolves with WebID URI or null
 */
webIdFromSession (session) {
  console.log("webIdFromSession")
  var webId = session ? app.session.webId : null
  if (webId) {
    app.saveUser(webId)
  }
  return webId
}

/**
 * @param [setUserCallback] {Function} Optional callback, `setUserCallback(webId|null)`
 *
 * @returns {Promise<string|null>} Resolves with web id uri, if no callback provided
 */
checkUser (setUserCallback) {
  console.log("checkUser")
  var app = this;
  // Check to see if already logged in / have the WebID
  var me = app.defaultTestUser()
  if (me) {
    return Promise.resolve(setUserCallback ? app.setUserCallback(me) : me)
  }

  // doc = kb.any(doc, UI.ns.link('userMirror')) || doc

  return solid.auth.currentSession()

    .then(app.webIdFromSession,
      err => {
        console.log('Error fetching currentSession:', err)
        return null
      })

    .then(webId => {
      // if (webId.startsWith('dns:')) {  // legacy rww.io pseudo-users
      //   webId = null
      // }
      var me = app.saveUser(webId)

      if (me) {
        console.log('(Logged in as ' + me + ' by authentication)')
      }

      return setUserCallback ? app.setUserCallback(me) : me
    })
}
  /**
   * Loads preferences file
   * Do this after having done log in and load profile
   *
   * @private
   *
   * @param context
   *
   * @returns {Promise<context>}
   */
logInLoadPreferences (context) {
  console.log("logInLoadPreferences")
  var app = this;
    if (context.preferencesFile) return Promise.resolve(context) // already done

    const kb = app.store
    const statusArea = context.statusArea || context.div || null
    var progressDisplay
    return new Promise(function (resolve, reject) {
      app.logInLoadProfile(context).then(context => {
        let preferencesFile = kb.any(context.me, app.SPACE('preferencesFile'))
        function complain (message) {
          message = 'logInLoadPreferences: ' + message
          if (statusArea) {
            // statusArea.innerHTML = ''
            statusArea.appendChild(error.errorMessageBlock(context.dom, message))
          }
          console.log(message)
          reject(new Error(message))
        }

        /** Are we working cross-origin?
        *
        * @returns {Boolean} True if we are in a webapp at an origin, and the file origin is different
        */
        function differentOrigin () {
          return window.location && (window.location.origin + '/' !== preferencesFile.site().uri)
        }

        if (!preferencesFile) {
          let message = "Can't find a preferences file pointer in profile " + context.publicProfile
          return reject(new Error(message))
        }

        // //// Load preferences file
        kb.fetcher.load(preferencesFile, {withCredentials: true})
        .then(function () {
          if (progressDisplay) {
            progressDisplay.parentNode.removeChild(progressDisplay)
          }
          context.preferencesFile = preferencesFile
          return resolve(context)
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
              context.preferencesFileError = m2
              return resolve(context)
            }
            m2 = 'Strange - you are not authorized to read your preferences file.'
          } else if (status === 404) {
            if (confirm('You do not currently have a Preferences file. Ok for me to create an empty one? ' + preferencesFile)) {
              // @@@ code me  ... weird to have a name o fthe file but no file
              return complain(new Error('Sorry No code yet to craete a preferences fille at '))
            } else {
              reject(new Error('User declined to craete a preferences fille at '))
            }
          } else {
            m2 = 'Strange: Error ' + status + ' trying to read your preferences file.' + message
          }
          alert(m2)
        }) // load prefs file then
      }, err => { // Fail initial login load prefs
        reject(new Error('(via loadPrefs) ' + err))
      }, err => reject(err))
    })
  }


  /**
  * Simple Access Control
  *
  * This function sets up a simple default ACL for a resource, with
  * RWC for the owner, and a specified access (default none) for the public.
  * In all cases owner has read write control.
  * Parameter lists modes allowed to public
  *
  * @param docURI
  * @param me {NamedNode} WebID of user
  * @param options
  * @param options.public {Array<string>} eg ['Read', 'Write']
  *
  * @returns {Promise<NamedNode>} Resolves with aclDoc uri on successful write
  */
  setACLUserPublic (docURI, me, options) {
      console.log("setACLUserPublic")
    var app = this;
    const kb = UI.store
    let aclDoc = kb.any(kb.sym(docURI),
    kb.sym('http://www.iana.org/assignments/link-relations/acl'))

    return Promise.resolve()
    .then(() => {
      if (aclDoc) { return aclDoc }

      return fetchACLRel(docURI)
      .catch(err => {
        throw new Error(`Error fetching rel=ACL header for ${docURI}: ${err}`)
      })
    })
    .then(aclDoc => {
      let aclText = genACLText(docURI, me, aclDoc.uri, options)

      return kb.fetcher.webOperation('PUT', aclDoc.uri,
      { data: aclText, contentType: 'text/turtle' })
      .then(result => {
        if (!result.ok) {
          throw new Error('Error writing ACL text: ' + result.error)
        }

        return aclDoc
      })
    })
  }

  /**
  * @param docURI {string}
  * @returns {Promise<NamedNode|null>}
  */
  fetchACLRel (docURI) {
        console.log("fetchACLRel")
    const kb = UI.store
    const fetcher = kb.fetcher

    return fetcher.load(docURI)
    .then(result => {
      if (!result.ok) {
        throw new Error('fetchACLRel: While loading:' + result.error)
      }

      let aclDoc = kb.any(kb.sym(docURI),
      kb.sym('http://www.iana.org/assignments/link-relations/acl'))

      if (!aclDoc) {
        throw new Error('fetchACLRel: No Link rel=ACL header for ' + docURI)
      }

      return aclDoc
    })
  }

  /**
  * @param docURI {string}
  * @param me {NamedNode}
  * @param aclURI {string}
  * @param options {Object}
  *
  * @returns {string} Serialized ACL
  */
  genACLText (docURI, me, aclURI, options = {}) {
      console.log("genACLText")
    var app = this;
    var optPublic = options.public || []
    var g = $rdf.graph()
    var auth = $rdf.Namespace('http://www.w3.org/ns/auth/acl#')
    var a = g.sym(aclURI + '#a1')
    var acl = g.sym(aclURI)
    var doc = g.sym(docURI)
    g.add(a, UI.ns.rdf('type'), auth('Authorization'), acl)
    g.add(a, auth('accessTo'), doc, acl)
    if (options.defaultForNew) {
      g.add(a, auth('defaultForNew'), doc, acl)
    }
    g.add(a, auth('agent'), me, acl)
    g.add(a, auth('mode'), auth('Read'), acl)
    g.add(a, auth('mode'), auth('Write'), acl)
    g.add(a, auth('mode'), auth('Control'), acl)

    if (optPublic.length) {
      a = g.sym(aclURI + '#a2')
      g.add(a, UI.ns.rdf('type'), auth('Authorization'), acl)
      g.add(a, auth('accessTo'), doc, acl)
      g.add(a, auth('agentClass'), UI.ns.foaf('Agent'), acl)
      for (let p = 0; p < optPublic.length; p++) {
        g.add(a, auth('mode'), auth(optPublic[p]), acl) // Like 'Read' etc
      }
    }
    return $rdf.serialize(acl, g, aclURI, 'text/turtle')
  }


  /**
  * Returns a UI object which, if it selects a workspace,
  * will callback(workspace, newBase).
  *
  * If necessary, will get an account, preferences file, etc. In sequence:
  *
  *   - If not logged in, log in.
  *   - Load preferences file
  *   - Prompt user for workspaces
  *   - Allows the user to just type in a URI by hand
  *
  * Calls back with the ws and the base URI
  *
  * @param dom
  * @param appDetails
  * @param callbackWS
  * @returns {Element}
  */
  selectWorkspace (dom, appDetails, callbackWS) {
        console.log("selectWorkspace")
    var app = this;
    var noun = appDetails.noun
    var appPathSegment = appDetails.appPathSegment

    var me = defaultTestUser()
    var kb = UI.store
    var box = dom.createElement('div')
    var context = { me: me, dom: dom, div: box }

    var say = function (s) { box.appendChild(error.errorMessageBlock(dom, s)) }

    var figureOutBase = function (ws) {
      var newBase = kb.any(ws, UI.ns.space('uriPrefix'))
      if (!newBase) {
        newBase = ws.uri.split('#')[0]
      } else {
        newBase = newBase.value
      }
      if (newBase.slice(-1) !== '/') {
        console.log(appPathSegment + ': No / at end of uriPrefix ' + newBase) // @@ paramater?
        newBase = newBase + '/'
      }
      var now = new Date()
      newBase += appPathSegment + '/id' + now.getTime() + '/' // unique id
      return newBase
    }

    var displayOptions = function (context) {
      // var status = ''
      var id = context.me
      var preferencesFile = context.preferencesFile
      var newBase = null

      // A workspace specifically defined in the private preferences file:
      var w = kb.statementsMatching(id, UI.ns.space('workspace'), // Only trust prefs file here
      undefined, preferencesFile).map(function (st) { return st.object })

      // A workspace in a storage in the public profile:
      var storages = kb.each(id, UI.ns.space('storage'))  // @@ No provenance requirement at the moment
      storages.map(function (s) {
        w = w.concat(kb.each(s, UI.ns.ldp('contains')))
      })

      if (w.length === 1) {
        say('Workspace used: ' + w[0].uri)  // @@ allow user to see URI
        newBase = figureOutBase(w[0])
        // callbackWS(w[0], newBase)
      } else if (w.length === 0) {
        say("You don't seem to have any workspaces. You have " + storages.length + ' storages.')
      }

      // Prompt for ws selection or creation
      // say( w.length + " workspaces for " + id + "Chose one.");
      var table = dom.createElement('table')
      table.setAttribute('style', 'border-collapse:separate; border-spacing: 0.5em;')

      // var popup = window.open(undefined, '_blank', { height: 300, width:400 }, false)
      box.appendChild(table)

      //  Add a field for directly adding the URI yourself

      // var hr = box.appendChild(dom.createElement('hr')) // @@
      box.appendChild(dom.createElement('hr')) // @@

      var p = box.appendChild(dom.createElement('p'))
      p.textContent = 'Where would you like to store the data for the ' + noun + '?  ' +
      'Give the URL of the directory where you would like the data stored.'
      var baseField = box.appendChild(dom.createElement('input'))
      baseField.setAttribute('type', 'text')
      baseField.size = 80 // really a string
      baseField.label = 'base URL'
      baseField.autocomplete = 'on'
      if (newBase) { // set to default
        baseField.value = newBase
      }

      context.baseField = baseField

      box.appendChild(dom.createElement('br')) // @@

      var button = box.appendChild(dom.createElement('button'))
      button.textContent = 'Start new ' + noun + ' at this URI'
      button.addEventListener('click', function (e) {
        var newBase = baseField.value
        if (newBase.slice(-1) !== '/') {
          newBase += '/'
        }
        callbackWS(null, newBase)
      })

      // Now go set up the table of spaces

      // var row = 0
      w = w.filter(function (x) {
        return !(kb.holds(x, UI.ns.rdf('type'), // Ignore master workspaces
        UI.ns.space('MasterWorkspace')))
      })
      var col1, col2, col3, tr, ws, style, comment
      var cellStyle = 'height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;'
      var deselectedStyle = cellStyle + 'border: 0px;'
      // var selectedStyle = cellStyle + 'border: 1px solid black;'
      for (var i = 0; i < w.length; i++) {
        ws = w[i]
        tr = dom.createElement('tr')
        if (i === 0) {
          col1 = dom.createElement('td')
          col1.setAttribute('rowspan', '' + w.length + 1)
          col1.textContent = 'Chose a workspace for this:'
          col1.setAttribute('style', 'vertical-align:middle;')
          tr.appendChild(col1)
        }
        col2 = dom.createElement('td')
        style = kb.any(ws, UI.ns.ui('style'))
        if (style) {
          style = style.value
        } else { // Otherise make up arbitrary colour
          var hash = function (x) { return x.split('').reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0) }
          var bgcolor = '#' + ((hash(ws.uri) & 0xffffff) | 0xc0c0c0).toString(16) // c0c0c0  forces pale
          style = 'color: black ; background-color: ' + bgcolor + ';'
        }
        col2.setAttribute('style', deselectedStyle + style)
        tr.target = ws.uri
        var label = kb.any(ws, UI.ns.rdfs('label'))
        if (!label) {
          label = ws.uri.split('/').slice(-1)[0] || ws.uri.split('/').slice(-2)[0]
        }
        col2.textContent = label || '???'
        tr.appendChild(col2)
        if (i === 0) {
          col3 = dom.createElement('td')
          col3.setAttribute('rowspan', '' + w.length + 1)
          // col3.textContent = '@@@@@ remove';
          col3.setAttribute('style', 'width:50%;')
          tr.appendChild(col3)
        }
        table.appendChild(tr)

        var addMyListener = function (container, detail, style, ws1) {
          container.addEventListener('click', function (e) {
            col3.textContent = detail
            col3.setAttribute('style', style)
            col3.appendChild(addContinueButton(ws1))
          }, true) // capture vs bubble
        }

        var addContinueButton = function (selectedWorkspace) {
          var button = dom.createElement('button')
          button.textContent = 'Continue'
          // button.setAttribute('style', style);
          var newBase = figureOutBase(selectedWorkspace)
          baseField.value = newBase // show user proposed URI

          button.addEventListener('click', function (e) {
            button.disabled = true
            callbackWS(selectedWorkspace, newBase)
            button.textContent = '---->'
          }, true) // capture vs bubble
          return button
        }

        comment = kb.any(ws, UI.ns.rdfs('comment'))
        comment = comment ? comment.value : 'Use this workspace'
        addMyListener(col2, comment ? comment.value : '', deselectedStyle + style, ws)
      }

      // last line with "Make new workspace"
      var trLast = dom.createElement('tr')
      col2 = dom.createElement('td')
      col2.setAttribute('style', cellStyle)
      col2.textContent = '+ Make a new workspace'
      // addMyListener(col2, 'Set up a new workspace', '') // @@ TBD
      trLast.appendChild(col2)
      table.appendChild(trLast)
    } // displayOptions

    app.logInLoadPreferences(context)  // kick off async operation
    .then(displayOptions, err => {
      box.appendChild(UI.widgets.errorMessageBlock(err))
    })

    return box  // return the box element, while login proceeds
  } // selectWorkspace

  /**
  * Creates a new instance of an app.
  *
  * An instance of an app could be e.g. an issue tracker for a given project,
  * or a chess game, or calendar, or a health/fitness record for a person.
  *
  * @param dom
  * @param appDetails
  * @param callback
  *
  * @returns {Element} A div with a button in it for making a new app instance
  */
  newAppInstance (dom, appDetails, callback) {
    console.log("newAppInstance")
    var app = this;
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


}

window.customElements.define('solid-apps', SolidApps);
