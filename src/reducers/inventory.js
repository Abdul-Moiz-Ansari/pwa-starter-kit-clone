
import { ADD_INVENTORY } from '../actions/inventory.js';

const initState = {
    items: [
        {id : 1,name : "Tuna Fish",price: 11.99 },
        {id : 2,name : "Samba Fish",price: 12.99 }
    ]
}

export const inventoryReducer = (state = initState, action) => {
    
    switch (action.type) {
        case ADD_INVENTORY:
            return addInventory(state,action);

        default:
            return state;
    }

}

const addInventory = (state = initState, action) => {
    let item, arrIDs,items = [];
    switch (action.type) {
        case ADD_INVENTORY:
            //only covering ADD case right now.
            item = action.payload;

            //make id max + 1            
            arrIDs = state.items.map(item => item.id);
            if (arrIDs.length === 0) { arrIDs = [0] }
            item.id = Math.max.apply(this, arrIDs) + 1;

            //manually deep cloning array here, can use lodash or any other utility to deep clone, or simply Immutable.js
            items = state.items.map(item => item);
            items.push(item);

            return {...state,items};
        default:
            return state;
    }
}