import React from 'react';
import {connect} from 'react-redux';
import TeamRegistrationForm from "../../forms/TeamRegistrationForm";
import {createTeam} from "../../actions/my-team/MyTeamActions";
import LoadingSpinner from "../../components/utils/LoadingSpinner";

const mapStateToProps = (state) => {
    return {
        myTeam: state.myTeam.myTeam,
        isFetchingTeam: state.myTeam.isFetchingTeam
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        onSubmitTeamRegistrationForm: values => {
            dispatch(createTeam(values))
        },
    };
};

const MyTeamHomePage = (props) => {
    const {myTeam, onSubmitTeamRegistrationForm, isFetchingTeam} = props;

    const getTeamInfo = () => {
        if (myTeam.id === undefined) {
            return ''
        } else {
            return (
                <div>
                    <h1>Team info</h1>
                    <div>Název týmu: <b>{myTeam.name}</b></div>
                    <div>Aktuální pozice v tabulce: 1.</div>
                </div>
            )
        }
    }

    const getTeamRegistration = () => {
        if (myTeam.id === undefined) {
            return (
                <div>
                    Ještě nemáš tým?
                    <TeamRegistrationForm onSubmit={onSubmitTeamRegistrationForm}/>
                </div>
            )
        } else {
            return ''
        }
    }

    const getTeamSeasonInfo = () => {
        if (myTeam.activeSeason === null) {
            return ''
        } else {
            return (
                <div>
                    Team season info
                </div>
            )
        }
    }

    const getTeamSeasonRegistration = () => {
        if (myTeam.activeSeason === null) {
            return (
                <div>Team season registration</div>
            )
        } else {
            return ''
        }
    }

    const getContent = () => {
        if (isFetchingTeam) {
            return (
                <div>
                    <LoadingSpinner text="Načítám informace o tvém týmu"/>
                </div>)
        } else {
            return (
                <div>
                    {getTeamInfo()}
                    {getTeamRegistration()}
                    {getTeamSeasonInfo()}
                    {getTeamSeasonRegistration()}
                </div>
            )
        }
    }

    return (
        <div>
            Můj tým
            {getContent()}
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyTeamHomePage)