import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../src/shared-styles.js';
//import "./solid-ide-editor.js";
import  '/node_modules/solid-file-client/solid-file-client.js';
import '@polymer/paper-button/paper-button.js';
import '@granite-elements/ace-widget/ace-widget.js';
import { SolidTools } from "./solid-tools.js"
//import 'ace-builds/src-noconflict/mode-turtle.js';
/*import "../spoggy/spoggy-input.js";
import "../spoggy/spoggy-vis.js";*/
/*import "../spoggy/my-element.js";*/


class IdeFileeditor extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
    </style>

    <div class="card">
    <div class="circle">IdeFileeditor</div>
    <div>
    Current : {{file.url}}
    </div>
    <!--
    ***
    <ace-widget placeholder="Write something... Anything..." initial-focus>
    </ace-widget>***
    <ace-widget theme="ace/theme/eclipse" softtabs="true" wrap="true" value="This is a nice widget">
    </ace-widget>
    <ace-widget id="aceone" theme="ace/theme/ambiance" softtabs="true" wrap="true">
    This is a nice widget... and we are writing a long text here to show the effets of the \`wrap\` attribute.
    </ace-widget>-->

    <ace-widget
    id="acetwo"
    theme="ace/theme/monokai"
    mode="ace/mode/turtle"
    softtabs="true"
    value="{{contenu::input}}"
    wrap="true">

    </ace-widget>
    <paper-button id="save"  on-tap="save" raised>Save Edits / Enregistrer</paper-button>
    <paper-button id="undo"  on-tap="undo" raised>Undo / Annuler</paper-button>

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
      contenu: {type: String, value: "contenu de l'éditeur"}
    }
  }

  connectedCallback(){
    super.connectedCallback();
    //  console.log("ACE ",ace)
    /*  var div = document.createElement('div');
    div.id="blop"
    var shadowRoot = div.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>';
    this.$.editor.appendChild(div)*/
    this.fileclient = new SolidFileClient();
    console.log("FILE CLIENT ", this.fileclient )

  }

  currentChanged(newValue, oldValue){
    console.log(newValue)
    console.log(oldValue)
    console.log("CURRENT FILE :",this.current)

    this.file = this.current.value

    if(newValue.key == "file"){
      this.$.acetwo.editorValue = this.file.content;
    }
  }

  save(){
    var url = this.file.url;
    var newContent = this.$.acetwo.editorValue;
    console.log("V",newContent)
    console.log(url)
    this.fileclient.updateFile( url, newContent ).then( success => {
      if(!success) console.log(this.fileclient.err)
      else console.log( `Updated ${url}.`)
    })

  }

  undo(){
    console.log("UNDO nothing for the moment")
    console.log(this.file.content)
    //this.$.acetwo.value = this.file.content;
    this.$.acetwo.editorValue = this.file.content
  }








}

window.customElements.define('ide-fileeditor', IdeFileeditor);
