//import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { LitElement, html } from '@polymer/lit-element';
import '../src/shared-styles.js';
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-button/paper-button.js";
/*import "../spoggy/spoggy-vis.js";*/
/*import "../spoggy/my-element.js";*/


//class UserProfile extends PolymerElement {
class UserProfile extends LitElement {
  render() {
    const { fn, phone, role, email, company, address, profile } = this;
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    .profile-container {
      font-family: 'Roboto', sans-serif;
    }

    .profile-container h1 {
      font-size: 24px;
      color: #7C55FB;
      font-weight: bold;
      line-height: 32px;
      letter-spacing: 1.2px;
      text-align: center;
      margin-top: 82px;
      text-transform: uppercase;
    }

    .profile-fields-container {
      max-width: 740px;
      min-height: 500px;
      margin: 0 auto;
      border: 1px solid #ccc;
      box-shadow: #ccc 1px 1px 4px;
      position: relative;
    }

    .profile-fields-container .profile-image-container {
      height: 200px;
      width: 100%;
      background-size: cover !important;
      background: url('/assets/images/Solid_Pattern.png');
    }

    .profile-fields-container .profile-image-container img {
      height: 128px;
      border-radius: 50%;
      margin-left: auto;
      margin-right:auto;
      position: relative;
      top:40px;
      display: block;
    }

    .profile-fields-container i {
      font-size: 14px;
      color: #89969F;
      padding-left: 26px;
      padding-right: 10px;
      margin-top: 24px;
    }

    .profile-fields-container input[type=text].field-text {
      height: 12px;
      width: 280px;
      border: 1px solid #89969F;
      border-radius: 4px;
      padding: 10px;
    }

    .profile-fields-container input[type=text].field-text::placeholder {
      color: rgba(102,102,102,0.2);
    }

    .profile-save-button-container {
      display: flex;
      align-items: center;
      margin-bottom: auto;
      height: 100px;
      flex-direction: column;
      justify-content: flex-end;
    }

    .profile-save-button {
      background-color: #7C55FB;
      margin-left: auto;
      margin-right: auto;
      width: 280px;
    }

    .profile-save-button:disabled {
      background-color: #F0EEEB;
      border-color: #F0EEEB;
      cursor: not-allowed;
    }

    .topnav {
      position:absolute;
      top:0;
      left:0;
      width: 100%;
      background-color: #7C4DFF;
      height: 50px;
      color: #fff;
    }

    .topnav .logo {
      display: inline-block;
      font-family: 'Roboto Slab', serif;
      font-size: 24px;
      font-weight: bold;
      text-transform: uppercase;
      line-height: 32px;
      padding-right: 80px;
      position: relative;
      top: -8px;
      left: 28px;
    }

    .topnav .menu-item {
      display: inline-block;
      font-size: 10px;
      line-height: 13px;
      width: 100px;
      height: 100%;
      text-align: center;
    }

    .topnav .menu-item i {
      font-size: 24px;
      margin-top:8px;
      margin-bottom: 2px;
    }

    .topnav .profile-menu {
      float: right;
      display: inline-block;
      width: 50px;
      height: 50px;
      background-color: rgba(0,0,0,0.25);
    }

    .topnav .profile-menu img {
      display: block;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin: 0 auto;
      margin-top:10px;
      cursor: pointer;
    }

    .loading-image {
      text-align: center;
      margin-top: 50px;
    }
    </style>


    <div class="profile-container">
    <!-- EXAMPLE TOP NAV -->
    <div class="topnav">
    <div class="logo">Solid</div>
    <div class="menu-item">
    <div>
    <i class="far fa-compass"></i>
    </div>
    Menu Item 1
    </div>
    <div class="menu-item">
    <div>
    <i class="far fa-comment"></i>
    </div>
    Menu Item 2
    </div>
    <div class="menu-item">
    <div>
    <i class="fas fa-sliders-h"></i>
    </div>
    Menu Item 3
    </div>

    <div class="profile-menu" (click)="logout()">
    <img [src]="profileImage" />
    </div>
    </div>


    <h1>Profile</h1>
    <div>
    <p>
    <paper-button id="solidLogin" raised @click="${(e) =>  this._solid_login(e)}">Login</paper-button>
    </p>
    <p>
    <paper-button id="solidLogout" raised @click="${(e) =>  this._solid_logout(e)}">Logout</paper-button>
    </p>
    </div>
    <!-- LOADING IMAGE -->
    <div class="loading-image" *ngIf="loadingProfile">
    <i class="fas fa-circle-notch fa-4x fa-spin"></i>
    </div>

    <!-- MAIN PROFILE -->
    <div id="card" class="profile-fields-container" *ngIf="!loadingProfile">
    <div class="profile-image-container">
    <img [src]="profileImage" />
    </div>
    <paper-input
    id="inputSolid"
    label="Solid Profil :"
    value="https://smag0.solid.community/">
    </paper-input>
    <table border="1" width="100%">
    <tr>
    <td>
    <paper-input id="fn" label="NAME" value="${profile.fn}"></paper-input>
    </td>
    <td>
    <paper-input id="phone" label="PHONE" value="${profile.phone}"></paper-input>
    </td>
    </tr>
    <tr>
    <td>
    <paper-input id="role" label="ROLE" value="${profile.role}"></paper-input>
    </td>
    <td>
    <paper-input id="email" label="EMAIL" value="${profile.email}"></paper-input>
    </td>
    </tr>
    <tr>
    <td>
    <paper-input id="company" label="ORGANIZATION" value="${profile.company}"></paper-input>
    </td>
    <td>
    <fieldset>
    <legend>Address</legend>
    <paper-input id="locality" label="LOCALITY" value="${profile.address.locality}"></paper-input>
    <paper-input id="country_name" label="COUNTRY_NAME" value="${profile.address.country_name}"></paper-input>
    <paper-input id="region" label="REGION" value="${profile.address.region}"></paper-input>
    <paper-input id="street" label="STREET" value="${profile.address.street}"></paper-input>
    </fieldset>

    </td>
    </tr>
    </table>
    <paper-button class="wide-button profile-save-button" @click="${(e) =>  this._solid_submit(e)}">Submit</paper-button>
    </div>


    <solid-browser>test browser</solid-browser>


    <table border="1">

    <tr>
    <td>
    Interaction avec un serveur <a href="https://solid.mit.edu/" target="_blank">Solid</a> <br>
    récupération des infos de https://smag0.solid.community/<br>
    <small> doc http://linkeddata.github.io/rdflib.js/doc/UpdateManager.html</small>
    <br> https://solid.inrupt.com/docs/manipulating-ld-with-rdflib
    <br>
    https://smag0.solid.community/profile/card#me<paper-button raised @click="${(e) =>  this._default_solid(e)}">set Smag0 as default</paper-button>
    <br>



    <paper-button raised @click="${(e) =>  this._getinfos_solid(e)}">Get infos</paper-button>
    <paper-button raised @click="${(e) =>  this._load_solid(e)}">View Friends</paper-button>
    <paper-button raised @click="${(e) =>  this._update_solid(e)}">test update</paper-button>

    <dl id="viewer">
    <dt>Full name</dt>
    <dd id="fullName"></dd>
    Role : ${role}
    <dt>Friends</dt>
    <dd>
    <ul id="friendsLi"></ul>
    </dd>
    <dt>Friends Error</dt>
    <dd>
    <ul id="friendsError"></ul>
    </dd>


    </dl>

    </td>
    <td>
    <spoggy-graph id="solidgraph" name="solidgraph" source="https://smag0.solid.community/profile/card#me" >
    Chargement du graphe
    </spoggy-graph>
    </td>
    </tr>

    </table>

    `;
  }

  static get properties() { return {
    role: String,
    fn: String,
    phone: String,
    role: String,
    email: String,
    company: String,
    address: String,
    profile: Object

  }};

  constructor() {
    super();
    this.profile = {}
    this.profile.fn = "";
    this.profile.phone = "";
    this.profile.role = "";
    this.profile.email = "";
    this.profile.company = "";
    this.profile.address = "";
  }

  firstUpdated() {
    this.name = this.destinataire+"_Solid"
  //  this.agentSolid = new SolidAgent(this.name, this);
  //  console.log(this.agentSolid);
  //  this.agentSolid.send('agentApp', {type: 'dispo', name: 'agentSolid' });
    //  console.log("DESTINATAIRE2:",this.destinataire);
    //  this._input = this.shadowRoot.getElementById('input');

    //SOLID
    //  this.FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

    this._solidLoginBtn = this.shadowRoot.getElementById('solidLogin');
    this._solidLogoutBtn = this.shadowRoot.getElementById('solidLogout');
    this._card = this.shadowRoot.getElementById('card');
    this._inputSolid = this.shadowRoot.getElementById('inputSolid');
    this._fullName = this.shadowRoot.getElementById('fullName');
    this._friends = this.shadowRoot.getElementById('friendsLi');
    this._friendsError = this.shadowRoot.getElementById('friendsError');

    //  console.log(solid)
    solid.auth.trackSession(session => {
      const loggedIn = !!session;


      if (loggedIn){
        this._solidLoginBtn.style.visibility="hidden";
        this._solidLogoutBtn.style.visibility="visible";
        this._card.style.visibility="visible";
        this._inputSolid.value = session.webId;
        console.log(session.webId)
        this.session = session;
        // Update components to match the user's login status
        //  this.FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

        // Set up a local data store and associated data fetcher
        this.store = $rdf.graph();
        this.fetcher = new $rdf.Fetcher(this.store);
        this.updateManager = new $rdf.UpdateManager(this.store);
        this.loadProfile();
      }else{
        this._solidLoginBtn.style.visibility="visible";
        this._solidLogoutBtn.style.visibility="hidden";
        this._card.style.visibility="hidden";
        this._inputSolid.value = "";
      }
    });
  }



  _solid_submit(e){
    var app = this;
    this.profile.fn = this.shadowRoot.getElementById('fn').value;
    this.profile.phone = this.shadowRoot.getElementById('phone').value;
    this.profile.role = this.shadowRoot.getElementById('role').value;
    this.profile.email = this.shadowRoot.getElementById('email').value;
    this.profile.company = this.shadowRoot.getElementById('company').value;
    this.profile.address.locality = this.shadowRoot.getElementById('locality').value;
    this.profile.address.country_name = this.shadowRoot.getElementById('country_name').value;
    this.profile.address.region = this.shadowRoot.getElementById('region').value;
    this.profile.address.street = this.shadowRoot.getElementById('street').value;

    console.log(this.profile)
    //  if (!this.cardForm.invalid) {
    try {
      this.updateProfile(this.profile);
      //  localStorage.setItem('oldProfileData', JSON.stringify(this.profile));
    } catch (err) {
      console.log(`Error: ${err}`);
    }
    //}
  }

  async updateProfile (profile){
    console.log(profile)
    //  updateProfile = async (form: NgForm) => {
    const me = $rdf.sym(this.session.webId);
    const doc = $rdf.NamedNode.fromValue(this.session.webId.split('#')[0]);
    console.log(me)
    console.log(doc)
    const data = this.transformDataForm(profile, me, doc);

    console.log(data)



    //Update existing values
    if(data.insertions.length > 0 || data.deletions.length > 0) {
      console.log(this.updateManager)
      console.log(this.session)
      this.updateManager.update(data.deletions, data.insertions, (response, success, message) => {
        if(success) {
          console.log("Your Solid profile has been successfully updated");
          //this.toastr.success('Your Solid profile has been successfully updated', 'Success!');
          //form.form.markAsPristine();
          //  form.form.markAsTouched();
        } else {
          //  this.toastr.error('Message: '+ message, 'An error has occurred');
          console.log('Message: '+ message, 'An error has occurred');
          console.log(response)
        }
      });
    }

  }

  transformDataForm  (form, me, doc) {
    //var app = this;
    const insertions = [];
    const deletions = [];
    const fields = Object.keys(form);
    const oldProfileData = JSON.parse(localStorage.getItem('oldProfileData')) || {};
    console.log("#{#{#{#{#{#{#{#{#{#{#{TRANSFORM}}}}}}}}}}}")
    console.log(fields)
    // We need to split out into three code paths here:
    // 1. There is an old value and a new value. This is the update path
    // 2. There is no old value and a new value. This is the insert path
    // 3. There is an old value and no new value. Ths is the delete path
    // These are separate codepaths because the system needs to know what to do in each case
    fields.map(field => {

      let predicate = this.VCARD(this.getFieldName(field));
      let subject = this.getUriForField(field, me);
      let why = doc;

      let fieldValue = this.getFieldValue(form, field);
      let oldFieldValue = this.getOldFieldValue(field, oldProfileData);
      console.log("COMPARAISON : ",field, fieldValue, oldFieldValue)
      // if there's no existing home phone number or email address, we need to add one, then add the link for hasTelephone or hasEmail
      if (field == "address" || field == "phone" || field == "image"){
        console.log (field," non traitée")
        //  break;
      }else


      if(!oldFieldValue && fieldValue && (field === 'phone' || field==='email')) {
        console.log("ADD ", field, fieldValue)
        this.addNewLinkedField(field, insertions, predicate, fieldValue, why, me);
      } else {

        //Add a value to be updated
        if (oldProfileData[field] && form[field] && oldFieldValue != fieldValue){// && !form.controls[field].pristine) {
          console.log("UPDATE : ",form[field], oldFieldValue, fieldValue)
          deletions.push($rdf.st(subject, predicate, oldFieldValue, why));
          insertions.push($rdf.st(subject, predicate, fieldValue, why));
        }

        //Add a value to be deleted
        else if (oldProfileData[field] && !form[field]){// && !form.controls[field].pristine) {
          console.log("DELETE : ",oldProfileData[field], oldFieldValue)
          deletions.push($rdf.st(subject, predicate, oldFieldValue, why));
        }

        //Add a value to be inserted
        else if (!oldProfileData[field] && form[field]){// && !form.controls[field].pristine) {
          console.log("INSERT : ",form[field], fieldValue)
          insertions.push($rdf.st(subject, predicate, fieldValue, why));
        }
      }
    });

    return {
      insertions: insertions,
      deletions: deletions
    };
  };

  addNewLinkedField(field, insertions, predicate, fieldValue, why, me) {
    //Generate a new ID. This id can be anything but needs to be unique.
    let newId = field + ':' + Date.now();

    //Get a new subject, using the new ID
    let newSubject = $rdf.sym(this.session.webId.split('#')[0] + '#' + newId);

    //Set new predicate, based on email or phone fields
    let newPredicate = field === 'phone' ? $rdf.sym(this.VCARD('hasTelephone')) : $rdf.sym(this.VCARD('hasEmail'));

    //Add new phone or email to the pod
    insertions.push($rdf.st(newSubject, predicate, fieldValue, why));

    //Set the type (defaults to Home/Personal for now) and insert it into the pod as well
    //Todo: Make this dynamic
    let type = field === 'phone' ? $rdf.literal('Home') : $rdf.literal('Personal');
    insertions.push($rdf.st(newSubject, this.VCARD('type'), type, why));

    //Add a link in #me to the email/phone number (by id)
    insertions.push($rdf.st(me, newPredicate, newSubject, why));
  }

  getUriForField(field, me) {
    let uriString;
    let uri;

    switch(field) {
      case 'phone':
      uriString = this.getValueFromVcard('hasTelephone');
      if(uriString) {
        uri = $rdf.sym(uriString);
      }
      break;
      case 'email':
      uriString = this.getValueFromVcard('hasEmail');
      if(uriString) {
        uri = $rdf.sym(uriString);
      }
      break;
      default:
      uri = me;
      break;
    }

    return uri;
  }

  /**
  * Extracts the value of a field of a NgForm and converts it to a $rdf.NamedNode
  * @param {NgForm} form
  * @param {string} field The name of the field that is going to be extracted from the form
  * @return {RdfNamedNode}
  */
  getFieldValue(form, field) {
    let fieldValue;

    if(!form[field]) {
      return;
    }

    switch(field) {
      case 'phone':
      fieldValue = $rdf.sym('tel:+'+form[field]);
      break;
      case 'email':
      fieldValue = $rdf.sym('mailto:'+form[field]);
      break;
      default:
      fieldValue = form[field];
      break;
    }

    return fieldValue;
  }

  getOldFieldValue(field, oldProfile){
    let oldValue;

    if(!oldProfile || !oldProfile[field]) {
      return;
    }

    switch(field) {
      case 'phone':
      oldValue = $rdf.sym('tel:+'+oldProfile[field]);
      break;
      case 'email':
      oldValue = $rdf.sym('mailto:'+oldProfile[field]);
      break;
      default:
      oldValue = oldProfile[field];
      break;
    }

    return oldValue;
  }

  getFieldName(field) {
    switch (field) {
      case 'company':
      return 'organization-name';
      case 'phone':
      case 'email':
      return 'value';
      default:
      return field;
    }
  }



  // Loads the profile from the rdf service and handles the response
  async loadProfile() {
    var app = this;

    await console.log("------------------------loadProfile")
    try {
      //  this.loadingProfile = true;
      //  const profile = await this.rdf.getProfile();
      this.profile = await app.getProfile();
      if (this.profile) {
        console.log(this.profile)
        //  app.profile = profile;
        app.saveOldUserData(this.profile);
      }

      //  this.loadingProfile = false;
      //  this.setupProfileData();
    } catch (error) {
      console.log(`Error: ${error}`);
    }

  }
  saveOldUserData(profile) {
    if (!localStorage.getItem('oldProfileData')) {
      localStorage.setItem('oldProfileData', JSON.stringify(profile));
    }
  }

  getOldUserData() {
    return JSON.parse(localStorage.getItem('oldProfileData'));
  }

  async getProfile () {

    /*if (!this.session) {
    await this.getSession();
  }*/
  this.VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
  try {
    await this.fetcher.load(this.session.webId);

    return {
      fn : this.getValueFromVcard('fn'),
      company : this.getValueFromVcard('organization-name'),
      phone: this.getPhone(),
      role: this.getValueFromVcard('role'),
      image: this.getValueFromVcard('hasPhoto'),
      address: this.getAddress(),
      email: this.getEmail(),
    };
  } catch (error) {
    console.log(`Error fetching data: ${error}`);
  }
};

getValueFromVcard(node, webId) {
  return this.getValueFromNamespace(node, this.VCARD, webId);
};

getValueFromNamespace(node, namespace, webId) {
  const store = this.store.any($rdf.sym(webId || this.session.webId), namespace(node));
  if (store) {
    return store.value;
  }
  return '';
}

getAddress() {
  const linkedUri = this.getValueFromVcard('hasAddress');

  if (linkedUri) {
    return {
      locality: this.getValueFromVcard('locality', linkedUri),
      country_name: this.getValueFromVcard('country-name', linkedUri),
      region: this.getValueFromVcard('region', linkedUri),
      street: this.getValueFromVcard('street-address', linkedUri),
    };
  }

  return {};
};

//Function to get email. This returns only the first email, which is temporary
getEmail() {
  const linkedUri = this.getValueFromVcard('hasEmail');

  if (linkedUri) {
    return this.getValueFromVcard('value', linkedUri).split('mailto:')[1];
  }

  return '';
}

//Function to get phone number. This returns only the first phone number, which is temporary. It also ignores the type.
getPhone () {
  const linkedUri = this.getValueFromVcard('hasTelephone');

  if(linkedUri) {
    return this.getValueFromVcard('value', linkedUri).split('tel:+')[1];
  }else{
    return '';
  }
};

_update_solid(e){

}

_getinfos_solid(e){
  var app = this;
  //https://solid.inrupt.com/docs/writing-solid-apps-with-angular
  //https://github.com/Inrupt-inc/generator-solid-angular/blob/master/generators/app/templates/src/app/services/rdf.service.ts
  const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
  console.log(this.fetcher)
  console.log(this.session.webId)

  const person = this._inputSolid.value ;

  this.fetcher.load(person).then(function(result){
    console.log(result)
    console.log(result.responseText)
    // Display their details
    const fullName = app.store.any($rdf.sym(person), app.FOAF('name'));
    console.log(fullName)
    app._fullName.textContent  = fullName && fullName.value;
    //console.log(app._fullName)
    //  $('#fullName').text(fullName && fullName.value);
    // Display their friends

    const role = app.store.any($rdf.sym(person), app.VCARD('role'));
    console.log(role.value)
    app.role = role.value


    const friends = app.store.each($rdf.sym(person), app.FOAF('knows'));
    console.log(friends)
  })



  /*this.fetcher.load(this.session.webId).then(function(results){
  console.log("##########################",results);
  //  var role  = app.store.any($rdf.sym(this.session.webId), VCARD('role'));

  console.log(role)
})*/

//return {*/
/*  var infos = {
fn : this.getValueFromVcard('fn'),
company : this.getValueFromVcard('organization-name'),
//  phone: this.getPhone(),
role: this.getValueFromVcard('role'),
image: this.getValueFromVcard('hasPhoto'),
//  address: this.getAddress(),
//  email: this.getEmail(),
};*/


}

/*getValueFromNamespace(node: string, namespace: $rdf.Namespace, webId?: string): string | any {
const store = this.store.any($rdf.sym(webId || this.session.webId), namespace(node));
if (store) {
return store.value;
}
return '';
}*/
/**
* Gets a node that matches the specified pattern using the VCARD onthology
*
* any() can take a subject and a predicate to find Any one person identified by the webId
* that matches against the node/predicated
*
* @param {string} node VCARD predicate to apply to the $rdf.any()
* @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me)
* @return {string} The value of the fetched node or an emtpty string
* @see https://github.com/solid/solid-tutorial-rdflib.js
*/
/*getValueFromVcard (node: string, webId?: string): string | any => {
return this.getValueFromNamespace(node, VCARD, webId);
};*/


/**
* Gets any resource that matches the node, using the provided Namespace
* @param {string} node The name of the predicate to be applied using the provided Namespace
* @param {$rdf.namespace} namespace The RDF Namespace
* @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me)
*/
/*getValueFromNamespace(node: string, namespace: $rdf.Namespace, webId?: string): string | any {
const store = this.store.any($rdf.sym(webId || this.session.webId), namespace(node));
if (store) {
return store.value;
}
return '';
}*/


_solid_login(e){
  console.log(solid);
  // Log the user in and out on click
  const popupUri = 'popup.html';
  solid.auth.popupLogin({ popupUri });


}

_solid_logout(e){
  solid.auth.logout();
  this._clearSolidResults();
}

_clearSolidResults(){
  while( this._friends.firstChild ){
    this._friends.removeChild( this._friends.firstChild );
  }
  while( this._friendsError.firstChild ){
    this._friendsError.removeChild( this._friendsError.firstChild );
  }
}


_default_solid(e){
  this._inputSolid.value ="https://smag0.solid.community/profile/card#me";
}

_load_solid(e){
  var app = this;
  const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
  const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

  // Set up a local data store and associated data fetcher
  const store = $rdf.graph();
  // remplacer par la variable globale this.fetcher
  const fetcher = new $rdf.Fetcher(store);
  //  console.log(fetcher)
  // Load the person's data into the store
  const person = this._inputSolid.value ;

  fetcher.load(person).then(function(result){
    //  console.log(result)
    // Display their details
    // FEED FORM
    const fullName = store.any($rdf.sym(person), FOAF('name'));
    console.log(fullName)
    const role = store.each($rdf.sym(person), VCARD('role'));
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~",role)
    app.role = role;
    app.fn = fullName;




    app._fullName.textContent  = fullName && fullName.value;
    //console.log(app._fullName)
    //  $('#fullName').text(fullName && fullName.value);
    // Display their friends
    const friends = store.each($rdf.sym(person), FOAF('knows'));







    app._clearSolidResults();

    friends.forEach(async (friend) => {
      var node = document.createElement("LI");
      try{
        await fetcher.load(friend);
        const fullName = store.any(friend, FOAF('name'));
        console.log(fullName, friend.value)

        var createA = document.createElement('paper-button');
        createA.setAttribute("raised", "");
        var createAText = document.createTextNode(fullName && fullName.value || friend.value);
        //createA.setAttribute('href', '');
        createA.onclick = function() {
          app._inputSolid.value = friend.value;
          app._load_solid(this)
        };
        createA.appendChild(createAText);
        node.appendChild(createA);
        app._friends.appendChild(node)

      } catch (e) {
        //  console.log(e); // 30
        var createA = document.createElement('a');
        var createAText = document.createTextNode("error parsing : "+ friend.value);
        createA.appendChild(createAText);
        createA.setAttribute('href', friend.value);
        node.appendChild(createA);
        app._friendsError.appendChild(node)
      }

    });






  })

  /*



  // Display their friends
  const friends = store.each($rdf.sym(person), FOAF('knows'));
  $('#friends').empty();
  friends.forEach(async (friend) => {
  await fetcher.load(friend);
  const fullName = store.any(friend, FOAF('name'));
  $('#friends').append(
  $('<li>').append(
  $('<a>').text(fullName && fullName.value || friend.value)
  .click(() => $('#profile').val(friend.value))
  .click(loadProfile)));
});*/
}


_inputed(e){
  //    @input="${(e) =>  this._inputed(e)}"
  console.log(e)
}

_changed(e){
  console.log(e)
  console.log(this._input.value , "vers ", this.destinataire)
  var retour = traiteMessage(this._input.value);
  this._input.value =  retour.inputNew;
  console.log(retour.message);
//  this.agentSolid.send(this.destinataire, {type: "catchTriplet", triplet:retour.message});
}

}

window.customElements.define('user-profile', UserProfile);
