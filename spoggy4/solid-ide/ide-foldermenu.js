//https://github.com/jeff-zucker/solid-file-client
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-item/paper-item.js';
import '../src/shared-styles.js';
import "./solid-tools.js"
/*import "../spoggy/spoggy-input.js";
import "../spoggy/spoggy-vis.js";*/
/*import "../spoggy/my-element.js";*/


class IdeFoldermenu extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    /* WIDTH */
    body                            { margin:1vw; padding:0; }
    #folderMenu                     { width:19vw; }
    #dataBrowser, #editor, iframe   { left:20vw; width:80vw;}
    .formArea                       { left:20vw; max-width:80vw;}
    /* HEIGHT */
    body                { margin-top:2vh; margin-bottom:2vh; overflow:hidden; }
    .topRow             { height:6vh; }
    #folderMenu,.rightCol  { height:90vh; }
    .formArea           { top: 8vh; max-height:89vh; }

    .edOnly #editor     { top: 8vh; height:89vh; }
    .both   #editor     { top: 53vh; height:44vh; }
    .dataOnly #dataBrowser { top: 8vh; height:89vh; }
    .both   #dataBrowser   { top: 8vh; height:43vh; }

    #manageDisabled, #editDisabled {
      color:#888;
      cursor:text;
    }
    #saveEdits, #manageResource { display:none; }
    #folderMenu *, #opt *, .formArea * {
      font-family:sans-serif;
      font-size:100%
    }
    #folderMenu.large *, #opt.large *, .formArea.large * {
      font-size:1.1em;
    }
    #folderMenu.small *, #opt.small *, .formArea.small * {
      font-size:0.8em;
    }
    select {
      padding:0.25em;
    }
    #optionsManager select, #filterManager select {
      overflow:hidden;
    }
    #optionsManager td {
      padding-left:2em;
      vertical-align:top;
    }
    label {
      display:inline-block;
      text-align:right;
      width:8em;
    }
    em {
      font-weight:bold;
    }
    .cancel-icon {
      text-align:right;
      margin-right:-1em;
      margin-top:-1em;
    }
    .right-justify {
      text-align:right;
    }
    span.right-justify {
      display:inline-block;
    }
    .formArea {
      text-align:right;
      display:none;
      line-height:2em;
      margin-top:1em;
      margin-left:1em;
      border-radius:5px;
      padding:1em;
      background-color:rgba(125,180,200,2);
      border:1px solid rgba(50,75,90,10);
      height:auto;
    }
    .formButtons {
      margin-top:1em;
      text-align:center;
    }
    .formButtons button {
      margin-right:1em;
    }
    .flex-item { flex: 0 1 auto; }
    .flex-container { display:flex; height:100%;}
    #editor, #dataBrowser, iframe,.formArea { position: absolute; }
    iframe {  border:none; }

    /* VIEW STATES */
    .both #editor, .both #dataBrowser {  display:block; }
    .edOnly #dataBrowser, .dataOnly #editor { display:none; }
    .edOnly #editor, .dataOnly #dataBrowser { display:block; }
    /* END VIEWSTATES */

    #folderMenu {
      overflow-y:auto;
      overflow-x:hidden;
    }
    #folderMenu li {
      white-space:nowrap;
      text-overflow:ellipsis;
    }

    .currentThing {
      display:inline-block;
      margin-right:2em;
    }
    #opt {
      color:#888;
      text-align:right;
    }

    /* INPUT
    */
    input {
      padding:0.25em;
      border:1px solid turquoise;
      border-radius:5px;
      width:30em;
    }
    input.short{
      width:15em;
    }

    /* BUTTON
    */
    button {
      border-radius:5px;
    }
    button:hover {
      cursor:pointer;
    }
    #folderMenu button {
      overflow:hidden;
      padding:0.25em;
      margin-left:0;
      padding-left:0;
      margin-right:0;
      border:none;
      background-color:transparent;
    }
    /* END OF BUTTON */

    .fileName {
      padding-left:0.5em !important;
    }
    .docIcon {
      width:1em;
      cursor:text !important;
      background:transparent;
    }
    .docIcon.canControl {
      cursor:pointer !important;
      background-color:#99dddd !important;
      padding:0 !important;
    }
    img {
      height:1em !important;
      width:1em !impoortant;
      margin-right:0.1em;
    }

    a img.icon {
      height:1em !important;
      width:1em !important;
      text-decoration:none;
    }
    .xIcon {
      font-weight:900;
      color:red;
      border:none;
      margin-left:0;
    }
    #folderMenu .xIcon {
      color:green;
    }
    .table {
      display:table;
      border-collapse: separate;
      border-spacing: 0.75em;
    }
    .tr { display:table-row;  text-align:right;  }
    .td { display:table-cell; text-align:right;  }
    .td.left { text-align:left; }
    .td.center { text-align:left;  }

    .topRow.table {
      border-spacing:0;
      width:100%;
    }


    ul {display:table; width:100%;}
    li { display:table-row; width:100%;}
    li button { display:table-cell; width:18vw; text-align:left; }
    li button.xIcon { width:2vw;}
    ul {
      margin-top:0.5em;
      margin-bottom:0.5em;
    }
    ul,li {
      padding-left:0;
      list-style:none;
    }
    #currentFolder {
      font-weight:bold;
    }
    </style>

    <div class="card">
    <div class="circle">IdeFoldermenu</div>
    <div>  Current : {{folder.name}}
    <paper-input id="nameInput" label="name of folder or file / nom du dossier ou du fichier"></paper-input>
    <paper-button raised on-tap="createFolder">Create Folder / creer un dossier</paper-button>
    <paper-button raised on-tap="createFile">Create File / creer un fichier</paper-button>
    </div>

    <button on-tap="manageResource({{folder}})" class="docIcon" v-bind:class="canControl()">
    <img src="./assets/folder.png">
    </button>
    <button class="fileName" v-on:click="get(folder)">
    <span id="currentFolder">{{folder.name}}</span>
    </button>
    <hr>

    <template is="dom-repeat" items="[[folder.folders]]">
    <paper-item raised on-tap="get"> <img src="./assets/folder.png" />[[item.name]]</paper-item>
    </template>

    <!--<ul>
    <li v-for="subFolder in folder.folders">
    <button class="docIcon">
    <img src="./assets/folder.png" />
    </button>
    <button class="fileName" v-on:click="get(subFolder)">
    <img src="./assets/folder.png" />
    {{subFolder.name}}
    </button>
    </li>
    </ul>-->
    <hr>

    <template is="dom-repeat" items="[[folder.files]]">
    <paper-item raised on-tap="get" title="[[item.type]]"><img src="./assets/document.png"> [[item.label]] </paper-item>
    </template>
    <!--[download]-->
    <!--<ul>
    <li v-for="f in folder.files">
    <button v-on:click="rm(f)" class="docIcon" v-bind:class="canControl()">
    <img src="./assets/document.png">
    </button>
    <button class="fileName" v-on:click.right="download(f)" v-on:click="get([[f]])" v-bind:title="f.label+' '+f.type">
    {{f.label}}
    </button>
    </li>
    </ul>-->
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
      current: {type: Object, notify: true, observer: "currentChanged"},
    }
  }

  connectedCallback(){
    super.connectedCallback();
    this.st = new SolidTools();
    this.st.fileclient = new SolidFileClient();
    console.log("FILE CLIENT ", this.fileclient )
  }
  currentChanged(newValue, oldValue){
    console.log(newValue)
    console.log(oldValue)
    console.log(this.current)
    if(newValue.key == "folder"){
      this.folder = newValue.value
    }
  }

  async get(e){
    console.log("GET,", e.model.item)
    /*console.log(this.public)
    this.thing.url = this.public;*/
    var thing = e.model.item
    var res = await this.st.get(thing);
    console.log("RESULT : ",res)
    if (res.key == "folder"){
      this.folder = res.value;
    }else{
      console.log("traitement d'un fichier")
      this.current = res;
    }

  }

  createFile(){
    var newFile = this.folder.url+this.$.nameInput.value;
    console.log(newFile)
    this.st.fileclient.createFile( newFile ).then( success => {
      if(!success) console.log(this.st.fileclient.err)
      else console.log( `Created file ${newFile}.`)
    })
  }

  createFolder(){
    var url = this.folder.url+this.$.nameInput.value;
    console.log(url)
    this.st.fileclient.createFolder( url ).then( success => {
      if(!success) console.log(this.st.fileclient.err)
      else console.log( `Created folder ${url}.`)
    })
  }

}

window.customElements.define('ide-foldermenu', IdeFoldermenu);
