
export const ADD_TO_CART = "ADD_TO_INVENTORY_CART";
export const GET_CART_ITEMS = "GET_INVENTORY_CART_ITEMS";

export const addToCart = (payload) => {
    return{
        type : ADD_TO_CART,
        payload
    }
}

export const getCartItems = (payload) => {
    return{
        type : GET_CART_ITEMS,
        payload
    }
}