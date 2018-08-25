
import { ADD_TO_CART } from '../actions/inventoryCart.js';

const initState = {
    cartItems: [],
    total: 0
}

export const InventoryCartReducer = (state = initState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            return addCartItem(state, action);

        default:
            return state;
    }
}

const addCartItem = (state = initState, action) => {
    let cartItem,
        cartItems = [],
        arrCurrentCartItem,
        currentCartItem,
        total;
    switch (action.type) {
        case ADD_TO_CART:
            cartItem = action.payload;

            //manually deep cloning array here, can use lodash or any other utility to deep clone, or simply Immutable.js
            cartItems = state.cartItems.map(item => item);

            arrCurrentCartItem = cartItems.filter(item => item.itemID === cartItem.itemID);

            //Only handling add case here.
            if (arrCurrentCartItem.length > 0) {
                currentCartItem = cartItems[cartItems.indexOf(arrCurrentCartItem[0])];
                currentCartItem.quantity += cartItem.quantity;
                currentCartItem.total += cartItem.total;
            }
            else {
                cartItems.push(cartItem);
            }

            total = getTotal(state,action);

            return { ...state, cartItems,total };

        default:
            return state;
    }
}

const getTotal = (state = initState, action) => {
    let cartItem,total = 0;
    switch (action.type) {
        case ADD_TO_CART:
            cartItem = action.payload;
            total = state.cartItems.reduce((a, item) => a + item.total, 0);
            total += cartItem.total;
            return total;

        default:
            return 0;
    }
}