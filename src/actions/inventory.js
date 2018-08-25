

export const ADD_INVENTORY= "ADD_INVENTORY";
export const GET_INVENTORY_ITEMS = "GET_INVENTORY_ITEMS";

export const addInventory = (payload) =>{
    return{
        type : ADD_INVENTORY,
        payload
    }
}

export const getInventoryItems = (payload) =>{
    return{
        type : GET_INVENTORY_ITEMS,
        payload
    }
}

