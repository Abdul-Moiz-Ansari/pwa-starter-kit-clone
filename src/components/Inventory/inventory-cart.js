
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store.js';

import { getInventoryItems } from '../../actions/inventory.js';
import { addToCart} from '../../actions/inventoryCart';
import { _toPrecision } from '../../helper.js';


class InventoryCart extends connect(store)(LitElement) {

    _render() {
        return html`
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" 
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

        <form on-submit=${this._formSubmit.bind(this)}>
            <div class="form-group">
                <label for="fish">Fish</label>
                <select id="fish" class="form-control" 
                on-change=${(e) => this.itemID = e.target.value}
                id="name" placeholder="Fish" required>  
                    <option>Select</option>
                    ${this.items.map(item => html`<option value=${item.id}>${item.name}</option>`)}
                </select>
            </div>
            <div class="form-group">
                <label for="quantity">Quantity</label>
                <input id="quantity" type="number" class="form-control"  placeholder="Quantity"
                    on-keyup=${(e) => this.quantity = parseInt(e.target.value)} required>
            </div>     
            <button type="submit" class="btn btn-primary">Add</button>
            
        </form>
        `;
        //<button type="button" class="btn btn-primary">Checkout</button>
    }

    _firstRendered() {
        store.dispatch(getInventoryItems());
    }

    _formSubmit(e) {
        let cartItem = {},
            items,
            itemID,
            arrSelectedItem,
            selectedItem,
            quantity,
            total;
        e.preventDefault();
        //console.log('form submnitted')
        itemID = parseInt(this.itemID);
        quantity = this.quantity;
        items = this.items;
        
        arrSelectedItem = this.items.filter(item => item.id === itemID);
        
        if(arrSelectedItem.length > 0){
            selectedItem = arrSelectedItem[0];
            total = selectedItem.price * quantity;
            total = parseFloat(_toPrecision(total));
            cartItem = {
                itemID: itemID,
                itemName : selectedItem.name,
                itemPrice : selectedItem.price,
                quantity : this.quantity,
                total : total
            }

            store.dispatch(addToCart(cartItem));
        }
        else{
            alert('Invalid fish');
        }
    }

    static get properties() {
        return {
            items: Array,
            itemID: Number,
            quantity: Number
        }
    }

    _stateChanged(state) {
        const { items } = state.inventory;
        this.items = items;
    }
}

window.customElements.define('inventory-cart', InventoryCart);