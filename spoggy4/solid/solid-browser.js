/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/*
Module pour attrapper les parametres d'url :
//http://127.0.0.1:8081/?endpoint=http://127.0.0.1:3030&dataset=test&query=SELECT * WHERE {?s ?p ?o}&source=http://test.json&graph=plop

*/

import { LitElement, html } from '@polymer/lit-element';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
// These are the elements needed by this element.
//import { plusIcon, minusIcon } from './../my-icons.js';

// These are the shared styles needed by this element.
//import { ButtonSharedStyles } from './../button-shared-styles.js';
//import  '/node_modules/evejs/dist/eve.custom.js';
//import { CatchurlAgent } from './agents/CatchurlAgent.js'
// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SolidBrowser extends LitElement {
  render() {

    const helloTemplate = (names) => html`<div>Hello ${names.join(' and ')}!</div>`;

    const { folders, files, historique, folder} = this;
    //  const { _test } = this;
    return html`

    <style>
    span { width: 20px; display: inline-block; text-align: center; font-weight: bold;}
    </style>
    <style>
    #filesList {
      background: #ff9999;
      padding: 20px;
    }

    ul {
      background: #3399ff;
      padding: 20px;
    }

    #filesList li {
      background: #ffe5e5;
      padding: 5px;
      margin-left: 35px;
    }

    ul li {
      list-style-type: none;
      background: #cce5ff;
      margin: 5px;
    }

    /*li:nth-child(even) {
    background: #FF0;
  }
  li:nth-child(odd) {
  background: #CCC;
  }*/
  </style>
  <!--<paper-card heading="Browser" image="http://placehold.it/350x150/FFC107/000000" alt="Browser">-->
  <paper-card heading="Browser" >
  <div class="card-content">





  <div id="card">

  <table border="1" width="90%">
  <tr>
  <td >
  <paper-input id="podInput" label="POD" type="text" size="100"></paper-input>
  <paper-input id="nameInput" label="Name / Nom" type="text" size="100"></paper-input>
  </td>
  <td align="right">
  History / Historique
  <ul id="historiqueUl"></ul>
  </td>
  </tr>
  </table>

  <paper-button
  id="updatePublicFolderBtn"
  @click="${() =>  this.updatePublicFolder(null)}">update Public Folder / Actualiser le dossier public
  </paper-button>

  <table border="1" width="90%">
  <tr>
  <th >
  Public Folders / Dossiers Publics <br>
  <paper-input id="newFolderInput" type="text" >
  </paper-input>
  <paper-button id="addFolderBtn"  onclick="addFolder()">add Folder / Ajouter un dossier</paper-button>
  </th>
  <th>
  Files / Fichiers <br>
  <paper-input id="newFileInput" type="text"></paper-input>
  <paper-button id="addFileBtn"  onclick="addFile()">add File / Ajouter un fichier</paper-button>
  </th>
  </tr>
  <tr>
  <td>
  f long ${folders.length} ..
  <paper-listbox  selected="${folder}">
  ${folders.map((i) => html `
    <paper-item raised @click="${(e) =>  this.updatePublicFolder(i)}">
    ${i}
    </paper-item>
    `)}
    </paper-listbox>
    <!--  <ul id="foldersList"></ul>-->
    </td>
    <td>
    <ul id="filesList"></ul>
    </td>
    </tr>
    </table>
    </div>

    </div>

    <div class="card-actions">
    <paper-button>Share</paper-button>
    <paper-button>Explore!</paper-button>
    </div>


    </paper-card>



    `;
  }


  /*
  <!--${this._test}-->

  <!--
  <br>
  items2 = ${Object.entries(this.items2)}
  items = ${this.names.map((i) => `item: ${i}`)}
  <br>
  items2 = ${Object.entries(this.names)}
  <paper-button id="up"  raised @click="${() =>  this.up()}" >up</paper-button>
  <paper-button id="clear"  raised @click="${() =>  this.clear()}" >clear</paper-button>

  <div>
  <paper-button id="solidLogin"  raised @click="${() =>  this.login()}" >Login</paper-button>
  <paper-button id="solidLogout"  raised @click="${() =>  this.logout()}">Logout</paper-button>
  <br>

  <!--${this.folders.map((i) => html `
  <paper-item raised @click="${(e) =>  this.updatePublicFolder(i)}">
  item: ${i}
  </paper-item>
  `)}-->

  -->

  <!--</div>-->
  */
  static get properties() { return {
    _test: String,
    folders: {type: Array},
    //  items : {type: Array},
    //  items2: {type: Object},
    //  names: {type: Array},
    folder: String
  }};

  constructor() {
    super();
    this.folders = new Array();
    this.files = new Array();
    this.historique = new Array();
    this._test = "Login to browse your 'Public' Folder / Connectez-vous pour parcourir votre dossier public";
    /*  this.items = [1, 2, 3];
    this.items2 = {
    a: 1,
    b: 23,
    c: 456,
  };*/
  //  this.names = [],


  //  this.render(this.helloTemplate(this.names), document.body);
  //  this.names.push('Steve');
  //  this.render(this.helloTemplate(this.names), document.body);
  //  this.names.push('Kevin');
  //  this.render(this.helloTemplate(this.names), document.body);
}

/*  clear(){
this.items = []
this.items2 = {}
this.names = []
}*/
/*up(){

var id = Date.now();
this.items.push('bob1')
this.items2.id = 'bob2'
this.names.push('bob3')
this.requestUpdate()
}*/
firstUpdated(){

  this._podInput = this.shadowRoot.getElementById('podInput');
  this._nameInput = this.shadowRoot.getElementById('nameInput');
  //  this._solidLoginBtn = this.shadowRoot.getElementById('solidLogin');
  //  this._solidLogoutBtn = this.shadowRoot.getElementById('solidLogout');
  this._card = this.shadowRoot.getElementById('card');


  //namespaces
  this.FOAF = new $rdf.Namespace('http://xmlns.com/foaf/0.1/');
  this.LDP = new $rdf.Namespace('http://www.w3.org/ns/ldp#>');
  this.VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
  this.STAT = new $rdf.Namespace('http://www.w3.org/ns/posix/stat#')


  //var sess, webIdRoot, currentFolder, fetcher, updater;

  //  console.log("update");
  //  console.log("eve",eve);
  //  this.agentCatchurl = new CatchurlAgent('agentCatchurl', this);
  //  console.log(this.agentCatchurl);
  //  this.agentCatchurl.send('agentApp', {type: 'dispo', name: 'agentCatchurl' });
  //  console.log("catchurl");

  solid.auth.trackSession(session => {
    this._loggedIn = !!session;


    if (this._loggedIn){
      console.log("LOGGED : ",session.webId)
      //  this._solidLoginBtn.style.visibility="hidden";
      //  this._solidLogoutBtn.style.visibility="visible";
      this._card.style.visibility="visible";
      this._podInput.value = session.webId;
      console.log(session.webId)
      this._session = session;
      // Update components to match the user's login status


      // Set up a local data store and associated data fetcher
      this._store = $rdf.graph();
      this._me = this._store.sym(this._session.webId);
      this._profile = this._me.doc() //    i.e. store.sym(''https://example.com/alice/card#me');
      this._fetcher = new $rdf.Fetcher(this._store);
      this._updateManager = new $rdf.UpdateManager(this._store);




      var wedIdSpilt = this._session.webId.split("/");
      this._webIdRoot = wedIdSpilt[0]+"//"+wedIdSpilt[2]+"/";
      console.log(this._webIdRoot);
      this._publicFolder = this._webIdRoot+"public/";
      this._test = this._publicFolder;
      this._updateProfile();
      this.updatePublicFolder(this._publicFolder)
    }else{
      //  this._solidLoginBtn.style.visibility="visible";
      //  this._solidLogoutBtn.style.visibility="hidden";
      this._card.style.visibility="hidden";
      this._podInput.value = "";
      this._nameInput.value = "";
    }
  });

}

login(){
  console.log("login")
  console.log(solid);
  // Log the user in and out on click
  const popupUri = 'popup.html';
  solid.auth.popupLogin({ popupUri });
}

logout(){
  console.log("logout")
  solid.auth.logout();
  //  this._clearSolidResults();
}

_updateProfile(){
  console.log("PROFILE UPDATE")
  var app = this;
  this._fetcher.load(this._profile).then(response => {
    //  console.log(response.responseText)
    let name = app._store.any(app._me, this.VCARD('fn'));
    app._nameInput.value = name;
  }, err => {
    console.log("Load failed" +  err);
  });
}



async updatePublicFolder(folder){
  var app = this;
  if (folder == undefined){
    folder = this._publicFolder;
  }

  app.folders = [];
  //this.files = [];
  //await app.requestUpdate();
  //  var myArray = [];
  //  this.folders = Object.assign([], ...myArray);;
  //Object.assign([], ...myArray);


  console.log(app.folders )
  //  app.shadowRoot.getElementById("foldersList").innerHTML = ""
  //  console.log(app.shadowRoot.getElementById("foldersList").innerHTML )
  app.shadowRoot.getElementById("filesList").innerHTML = ""
  app.shadowRoot.getElementById("historiqueUl").innerHTML = ""
  /*var histfolder = folder.replace(webIdRoot, '');
  console.log("HISTORY : "+histfolder)*/
  if (this.historique.length>3){this.historique.shift();}
  this.historique.push(folder);
  this.historique = [...this.historique, folder]
  console.log("WEBIDROOT "+this._webIdRoot)
  if (parent != this._webIdRoot){
    partemp =folder;
    var  partemp = partemp.split('/');
    partemp.pop();
    partemp.pop();
    parent = partemp.join("/")+"/";
  }
  /*  console.log("PARENT : "+parent)
  var liParent = document.createElement("li");
  liParent.addEventListener("click", function(){updatePublicFolder(parent)});
  var text = document.createTextNode(". . /  " +parent);
  liParent.appendChild(text);
  app.shadowRoot.getElementById("foldersList").appendChild(liParent);*/

  console.log("FOLDERS SEARCH ",folder, "WEBIDROOT "+this._webIdRoot )
  console.log("update "+folder)
  console.log(this._loggedIn)
  console.log(this._session.webId)
  await app._fetcher.load(folder).then(response => {
    //  console.log(response.responseText)
    //console.log(fetcher)
    let all = app._store.match(null, null, null, null);
    console.log("ALL ",all)

    let sizes = app._store.match(null, app.STAT('size'), null, null);
    console.log(sizes);

    //  parent = folder.split('/').pop().join("/");
    //  console.log(parent)
    /*  var liParent = document.createElement("li");
    li.addEventListener("click", function(){updatePublicFolder(parent)});
    var text = document.createTextNode("../ : " +parent);
    li.appendChild(text);
    document.getElementById("foldersList").appendChild(liParent);*/
    //  var foldersTemp = app.folders;
    //  var filesTemp = app.files;
    var dossiers = [];
    sizes.forEach(function(s){
      if (s.object.value == '4096'){
        //  console.log('folder '+s.subject.value);
        //app.folders.push(s.subject.value);
      //  app.folders = [...app.folders, s.subject.value]
      dossiers.push(s.subject.value)
        /*  var li = document.createElement("li");
        li.addEventListener("click", function(){app.updatePublicFolder(s.subject.value)});
        var text = document.createTextNode(s.subject.value.replace(app._webIdRoot, ''));
        li.appendChild(text);
        app.shadowRoot.getElementById("foldersList").appendChild(li);*/

      }else{
        //  console.log('file '+s.subject.value);
        //app.files.push(s.subject.value);
        app.files = [...app.files, s.subject.value]
        var li = document.createElement("li");
        var text = document.createTextNode(s.subject.value);
        li.appendChild(text);
        app.shadowRoot.getElementById("filesList").appendChild(li);
      }
    });
    //  app.folders = foldersTemp;
    //app.files = filesTemp;
    //  console.log("Folders: "+folders);
    //  console.log("Files: "+files);
    app.historique.forEach(function(h){
      var li = document.createElement("li");
      li.addEventListener("click", function(){app.updatePublicFolder(h)});
      var text = document.createTextNode(h.replace(app._webIdRoot, ''));
      li.appendChild(text);
      app.shadowRoot.getElementById("historiqueUl").appendChild(li);
    });
    app.folders = dossiers;
    console.log(app.folders)
       app.requestUpdate();
    //  var slides = ["slide 1", "slide 2", "slide 3", "slide 4", "slide 5"]
    /*  var foList = '<ul>';
    folders.forEach(function(f) {
    foList += '<li>'+ f + '</li>';
  });
  foList += '</ul>';
  document.getElementById("foldersList").innerHTML = foList;

  var fiList = '<ul>';
  files.forEach(function(f) {
  fiList += '<li>'+ f + '</li>';
});
fiList += '</ul>';
document.getElementById("filesList").innerHTML = fiList;*/

/*let m = store.match(null, RDF('type'), null, null);
console.log(m)
let f = store.any(null, LDP('contains'));
console.log("Loaded M "+f);*/
//  nameInput.value = name;
}, err => {
  console.log("Load failed" +  err);
});





}
update(folders){
  super.update()
  console.log("3UPDATE" )
  console.log(folders)
}

updated(folders){
  super.update()
  console.log("3UPDATED 3" )
  console.log(folders)
}

}

window.customElements.define('solid-browser', SolidBrowser);
