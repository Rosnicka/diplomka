import {RECEIVE_GROUP_RESULTS, RESET_GROUP_RESULTS} from "../../constants/GroupActionTypes";
import {getGroupResultsByGroupId} from "../../constants/Routes";
import {fetchGet} from "../../utils/FetchMethods";

export const resetGroupResults = () => {
    return {
        type: RESET_GROUP_RESULTS,
        results: []
    }
}

const receiveGroupResults = (results) => {
    return {
        type: RECEIVE_GROUP_RESULTS,
        results: results
    }
}

export const loadGroupResults = (groupId) => dispatch => {
    fetchGet(getGroupResultsByGroupId(groupId)).then((response) => {
        response.json().then((data) => {
            let results = [];
            if (data.data !== false) {
                results = data.data;
            }
            dispatch(receiveGroupResults(results));

        });
    }).catch(function (error) {
        console.log(error);
    });
}