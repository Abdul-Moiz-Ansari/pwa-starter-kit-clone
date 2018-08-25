
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store.js';

import { getCartItems } from '../../actions/inventoryCart.js';

import { _toPrecision } from '../../helper.js';

class InventoryCartList extends connect(store)(LitElement) {

    _render() {
        return html`
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" 
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          
          <tbody>
              ${this.cartItems.map(item => {
                return html`
                  <tr>
                    <td>${item.itemName}</td>
                    <td>${item.quantity}</td>
                    <td>${item.total}</td>
                  </tr>
                `;
            })}
          </tbody>

          <tfoot>
            <tr>
                <td><b>Grand Total</b></td>
                <td></td>
                <td>${_toPrecision(this.total)}</td>
            </tr>
          </tfoot>
        </table>
        `;
    }

    _firstRendered() {
        store.dispatch(getCartItems());
    }

    static get properties() {
        return {
            cartItems: [],
            total : 0
        }
    }

    

    _stateChanged(state) {
        const { cartItems,total } = state.inventoryCart;
        this.cartItems = cartItems;
        this.total = total;
    }

}

window.customElements.define('inventory-cart-list', InventoryCartList);