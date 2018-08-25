
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store.js';

import { getInventoryItems } from '../../actions/inventory.js';

class InventoryList extends connect(store)(LitElement) {
  _render() {
    return html`
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" 
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          
          <tbody>
              ${this.items.map(item => {
                return html  `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                  </tr>
                `;
              })}
          </tbody>
        </table>
        `;
  }

  _firstRendered(){
    store.dispatch(getInventoryItems());
  }

  static get properties() {
    return {
      items: Array
    }
  }

  _stateChanged(state) {
    const { items } = state.inventory;    
    this.items = items;
  }
}

window.customElements.define('inventory-list', InventoryList);