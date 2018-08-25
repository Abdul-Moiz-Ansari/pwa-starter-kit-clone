

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import {store} from '../../store.js';

import {addInventory} from '../../actions/inventory.js';

class AddInventory extends connect(store)(LitElement) {
   
    _render() {
        return html`
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" 
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

        <form on-submit=${this._formSubmit.bind(this)}>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" on-keyup=${(e) => {this.name = e.target.value}} 
                     class="form-control" id="name" placeholder="Name">    
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" on-keyup=${(e) => {this.price = parseFloat(e.target.value)}} 
                    step=".01" class="form-control" placeholder="Price" required>
            </div>  
               
            <button type="submit" class="btn btn-primary">Add</button>
        </form>
        `;
    }

    static get properties(){
        return {
            name:String,
            price : Number
        }
    }

    _formSubmit(e){
        let item = {};
        e.preventDefault();

        item = {
            id : 0,
            name : this.name,
            price : this.price
        }

        store.dispatch(addInventory(item));
    }

    _stateChanged(state){

    }   
}

window.customElements.define('add-inventory', AddInventory);