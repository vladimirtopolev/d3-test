import {FETCH_CATALOG_SETS_SUCCESS} from '../actions/typeActions';
import {combineReducers} from 'redux';

const byIds =  (state = {}, action) => {
    switch (action.type) {
        case FETCH_CATALOG_SETS_SUCCESS: {
            console.log('--->', action.payload.entities.catalogSets);
            return Object.assign({}, state, action.payload.entities.catalogSets);
        }
        default: return state;
    }
};


export default combineReducers({
    byIds
})

