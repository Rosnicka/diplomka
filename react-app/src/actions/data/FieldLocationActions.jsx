import {FIELD_LOCATIONS_URL} from "../../constants/Routes";
import {fetchGet} from "../../utils/FetchMethods";
import {RECEIVE_FIELD_LOCATIONS} from "../../constants/FieldLocationActionTypes";

const receiveFieldLocations = fieldLocations => {
    return {
        type: RECEIVE_FIELD_LOCATIONS,
        fieldLocations: fieldLocations
    }
}

export const getFieldLocations = () => dispatch => {
    fetchGet(FIELD_LOCATIONS_URL).then((response) => {
        response.json().then((data) => {
            let fieldLocations = [];
            if (data.data !== false) {
                fieldLocations = data.data
            }
            dispatch(receiveFieldLocations(fieldLocations))
        });
    }).catch(function (error) {
        console.log(error);
    });
}