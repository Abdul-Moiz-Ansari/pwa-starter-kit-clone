
import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import {store} from '../store.js';
//need to import actions here
import {inventoryReducer} from '../reducers/inventory.js';
import {InventoryCartReducer} from '../reducers/inventoryCart';

store.addReducers({
    inventory : inventoryReducer,
    inventoryCart : InventoryCartReducer
});

//need to import child elements here.
import './Inventory/add-inventory.js';
import './Inventory/inventory-list.js';
import './Inventory/inventory-cart.js';
import './Inventory/inventory-cart-list.js';

//need to import reducer and lazy load reducer

class InventoryView extends PageViewElement{
    _render(){
        return html`
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" 
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <div class="container">
            <div class="row">    
            
                <div class="col-md-4">
                    <h3>Inventory</h3>
                    <add-inventory></add-inventory>                        
                </div>
                <div class="col-md-4">
                    <h3>List</h3>
                    <inventory-list></inventory-list>    
                </div>
                <div class="col-md-4">
                    <h3>Order</h3>
                    <inventory-cart></inventory-cart>       
                    <hr/>         
                    <inventory-cart-list></inventory-cart-list>                
                </div>
            </div>
        </div>
        `;
    }

}

window.customElements.define('inventory-view',InventoryView);