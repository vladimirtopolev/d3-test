import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

function loadState() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState)
    } catch (e) {

    }

}

export default function configStore() {
    const persistedData = loadState();
    const store = createStore(
        rootReducer,
        persistedData,
        composeWithDevTools(applyMiddleware(thunk, logger)),
    );

    store.subscribe(() => {
        saveState(store.getState());
    });

    return store;
}
