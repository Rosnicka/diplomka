import {combineReducers} from 'redux'
import {RECEIVE_FIELD_LOCATIONS} from "../../constants/FieldLocationActionTypes";
import {RECEIVE_FIELDS} from "../../constants/FieldActionTypes";

const fields = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_FIELDS:
            return action.fields;
        default:
            return state;
    }
};

const fieldLocations = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_FIELD_LOCATIONS:
            return action.fieldLocations;
        default:
            return state;
    }
}

const dataReducer = combineReducers({
    fields,
    fieldLocations
});

export default dataReducer;