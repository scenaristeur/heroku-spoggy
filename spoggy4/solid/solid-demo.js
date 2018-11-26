import { LitElement, html } from '@polymer/lit-element';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import "./spoggy-solid.js";
import  '/node_modules/solid-auth-client/dist-lib/solid-auth-client.bundle.js';

//import  { traiteMessage} from './lib/inputBehavior.js';
/*
import  '/node_modules/evejs/dist/eve.custom.js';
import "../spoggy-graph.js";*/
//import { InputAgent } from './agents/InputAgent.js'

class SpoggySoliddemo extends LitElement {
  render() {
    return html`

    <spoggy-solid></spoggy-solid>

    `;
  }

  static get properties() { return {

  }};

  constructor() {
    super();
    //  this.destinataire = "test"
    //  console.log("DESTINATAIRE1:",this.destinataire)

  }
  firstUpdated() {
    console.log(solid)
    /*  this.name = this.destinataire+"_Input"
    this.agentInput = new InputAgent(this.name, this);
    console.log(this.agentInput);
    this.agentInput.send('agentApp', {type: 'dispo', name: 'agentInput' });
    console.log("DESTINATAIRE2:",this.destinataire);
    this._input = this.shadowRoot.getElementById('input');*/
  }

  _inputed(e){
    //    @input="${(e) =>  this._inputed(e)}"
    console.log(e)
  }

  _changed(e){
    console.log(e)
    /*  console.log(this._input.value , "vers ", this.destinataire)
    var retour = traiteMessage(this._input.value);
    this._input.value =  retour.inputNew;
    console.log(retour.message);
    this.agentInput.send(this.destinataire, {type: "catchTriplet", triplet:retour.message});
    */
  }



}
customElements.define('spoggy-soliddemo', SpoggySoliddemo);
