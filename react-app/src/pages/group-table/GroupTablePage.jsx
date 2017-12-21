import React, {Component} from 'react';
import {store} from "../../containers/DispatchingApp";
import GroupRepository from "../../containers/group/GroupRepository";

class GroupTablePage extends Component {
    componentDidMount() {

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
