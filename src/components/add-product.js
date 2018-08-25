
import {LitElement,html} from '@polymer/lit-element';
import {connect} from 'pwa-helpers/connect-mixin.js';

import {store} from '../store.js';
import {addProduct,setAddProductSuccess} from '../actions/shop.js';

class AddProduct extends connect(store)(LitElement){
    _render(props){
        return html `
            <form on-submit="${this._formSubmit.bind(this)}">
                title : <input type="text" value=${this.title} on-keyup="${(e) => this.title = e.target.value}" required/>
                price : <input type="number" value=${this.price} min="0" step=".01" on-keyup="${(e) => this.price = parseFloat(e.target.value)}" required/>
                inventory : <input type="number" value=${this.inventory} min="0" on-keyup="${(e) => this.inventory = parseInt(e.target.value)}" required/>                
                <button type="submit">Add</button>
            </form>
        `;
    }

    static get properties(){
        return{
            id:{
                type:Number,
                value : 0
            },
            title :{
                type:String,
                value: ""
            },
            price : {
                type:Number,
                value: 0
            },
            inventory : {
                type : Number,
                value: 0
            }
        }
    }

    _formSubmit(e){     
        let product = {};
        e.preventDefault();
        product = {
            id  : 0,
            title:  this.title,
            price : this.price,
            inventory : this.inventory
        }

        addProduct(product)(store.dispatch,store.getState);
    }

    _stateChanged(state){
        if(state.shop.addProductSuccess === true){
            this.title = "";
            this.price = 0;
            this.inventory = 0;
            this.requestRender();
            store.dispatch(setAddProductSuccess(false));
        }
    }
}

window.customElements.define("add-product",AddProduct);