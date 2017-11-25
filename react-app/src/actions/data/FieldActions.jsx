import {RECEIVE_FIELDS} from "../../constants/FieldActionTypes";
import {FIELDS_URL} from "../../constants/Routes";
import {fetchGet} from "../../utils/FetchMethods";

const receiveFields = fields => {
    return {
        type: RECEIVE_FIELDS,
        fields: fields
    }
}

export const getFields = () => dispatch => {
    fetchGet(FIELDS_URL).then((response) => {
        response.json().then((data) => {
            let fields = [];
            if (data.data !== false) {
                fields = data.data
            }
            dispatch(receiveFields(fields))
        });
    }).catch(function (error) {
        console.log(error);
    });
}