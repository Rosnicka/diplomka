import React from 'react';
import {connect} from 'react-redux';
import GroupResults from "../../components/group/GroupResults";
import LoadingSpinner from "../../components/utils/LoadingSpinner";

const mapStateToProps = (state) => {
    return {
        myTeam: state.myTeam.myTeam,
        results: state.group.results
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

const GroupRepository = (props) => {
    const {myTeam, results} = props;

    if (myTeam.group === undefined || results === undefined || results.length === 0) {
        return (
            <LoadingSpinner text="Načítám tabulku výsledků"/>
        )
    }

    return (
        <div>
            <h1>Tabulka - {myTeam.competition.name}, {myTeam.league.level}{myTeam.group.letter}</h1>
            <GroupResults teamsResults={results}/>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupRepository)