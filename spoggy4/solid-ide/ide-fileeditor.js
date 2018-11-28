import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../src/shared-styles.js';
//import "./solid-ide-editor.js";
import '@granite-elements/ace-widget/ace-widget.js';
import 'ace-builds/src-noconflict/mode-turtle.js';
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
                <ace-widget id="acetwo" theme="ace/theme/ambiance" softtabs="true" wrap="true">
                  TURTLE This is a nice widget... and we are writing a long text here to show the effets of the \`wrap\` attribute.
                 </ace-widget>


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
  //  console.log("ACE ",ace)
  /*  var div = document.createElement('div');
    div.id="blop"
    var shadowRoot = div.attachShadow({mode: 'open'});
shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>';
    this.$.editor.appendChild(div)*/

  }

  currentChanged(newValue, oldValue){
    console.log(newValue)
    console.log(oldValue)
    console.log("CURRENT FILE :",this.current)

    this.file = this.current.value

    if(newValue.key == "file"){
      //this.initEditor()
    //  this.setContent(this.file.content)
    //this.$.aceone.value = this.file.content;
    this.$.acetwo.value = this.file.content;
    this.$.acetwo.mode = this.file.type;
    }
  }




  initEditor(){
    var app = this;
    //this.displayState = "both";
    console.log(this.$.editor)


    this.zed = new SolidIdeEditor("blop");
  //  this.zed.ed.container = this.$.editor;
    console.log("################# ZED", this.zed)
    var keys  = app.editKeys  || "emacs"
    var theme = app.editTheme || "dark theme"
    //  this.setEditKeys(keys);
    //  this.setEditTheme(theme);
    var size=14; //1260x720 iH = 581px; 1366x768 = 618px
    if(window.innerHeight>600) size = 18
    if(window.innerHeight>900) size = 22
    if(this.displayState==="edOnly") size = size*2;
    this.zed.setSize(size);
  }
  setEditKeys(keys){
    var newKey ="zemacs";
    if(keys==='vim') newKey ="vim"
    this.zed.setKeys(newKey)
    this.keys = newKey;
  }
  setEditTheme(theme){
    var newTheme = "github"
    if(theme.match("dark")){
      newTheme = "monokai"
    }
    this.zed.setTheme(newTheme)
    this.theme=newTheme
  }
  setContent(content){
    var app = this;
    //  if(!this.zed) this.initEditor()
    console.log("############ setContent\n ", content)
    /*this.initEditor()
    this.file = app.currentThing;
    this.file.content = content;*/
    if(!this.file.type && this.file.url)
    this.file.type = sol.guessFileType(this.file.url)
    this.zed.setModeFromType(this.file.type)
    this.zed.setContents(content)
    console.log("## ZED IS DED\n\n",this.zed)
    console.log("-------------CONTENT-------------\n\n", this.zed.getContents())
    this.zed.ed.clearSelection() // remove blue overlay*/
  }
  saveEdits(){
    sol.replace(
      this.file.url,
      this.zed.getContents()
    ).then( success => {
      if(success){
        alert("Resource saved: " + this.file.url)
        view.refresh(this.file.url)
      }
      else alert("Couldn't save "+sol.err)
    })
  }
  togglePanes(){
    if(this.displayState==='edOnly'){
      this.displayState="dataOnly";
      this.initEditor()
      return;
    }
    if(this.displayState==='dataOnly'){
      this.displayState="both";
      this.initEditor()
      return;
    }
    if(this.displayState==='both'){
      this.displayState="edOnly";
      this.initEditor()
      return;
    }
  }







}

window.customElements.define('ide-fileeditor', IdeFileeditor);
