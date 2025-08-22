import { createStore } from "redux";
import cartReducer from "./cartReducer";

function storeInLocalStorage() {
    try {
        const state = localStorage.getItem("cartState");
        if (state === null) return undefined;
        return JSON.parse(state);
    } catch (err) {
        return undefined;
    }
}

// Save data in LocalStorage
function saveToLocalStorage(state) {
    try {
        localStorage.setItem("cartState", JSON.stringify(state));
    } catch (err) {
        console.error("Could not save state", err);
    }
}

const persistedState = typeof window !== "undefined" ? storeInLocalStorage() : undefined;

const store = createStore(cartReducer, persistedState);

if (typeof window !== "undefined") {
    store.subscribe(() => {
        saveToLocalStorage(store.getState());
    });
}

export default store;
