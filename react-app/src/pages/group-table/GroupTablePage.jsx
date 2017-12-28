import React, {Component} from 'react';
import {store} from "../../containers/DispatchingApp";
import GroupRepository from "../../containers/group/GroupRepository";
import {loadGroupResults} from "../../actions/group/GroupActions";

class GroupTablePage extends Component {
    componentDidMount() {
        // store.dispatch(loadGroupResults())
    }

    render() {
        return (
            <div>
                <GroupRepository/>
            </div>
        );
    }
}

export default GroupTablePage;
