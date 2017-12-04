import React from 'react';
import {connect} from 'react-redux';
import TeamRegistrationForm from "../../forms/TeamRegistrationForm";
import {createTeam, createTeamApplication} from "../../actions/my-team/MyTeamActions";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import {Jumbotron, Col, Row} from 'react-bootstrap'
import TeamApplicationForm from "../../forms/TeamApplicationForm";

const mapStateToProps = (state) => {
    return {
        myTeam: state.myTeam.myTeam,
        isFetchingTeam: state.myTeam.isFetchingTeam,
        fields: state.data.fields,
        fieldLocations: state.data.fieldLocations
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitTeamRegistrationForm: values => {
            dispatch(createTeam(values))
        },
        onSubmitTeamApplicationForm: values => {
            dispatch(createTeamApplication(values))
        }
    };
};

const MyTeamHomePage = (props) => {
    const {myTeam, onSubmitTeamRegistrationForm, onSubmitTeamApplicationForm, isFetchingTeam, fields, fieldLocations} = props;

    const getTeamInfo = () => {
        if (myTeam.id === undefined) {
            return ''
        } else {
            return (
                <div>
                    <Col xs={12}>
                        <h2>{myTeam.name}</h2>
                        <strong>Sezóna Podzim 2017, 8F</strong>
                        <br/>
                    </Col>
                    <Col xs={12}>
                        Umístění v tabulkce: 2<br/>
                        Odehrané zápasy: 5<br/>
                        Nadcházející zápas: <a href="">{myTeam.name} : SK Slavia</a><br/>
                        Nadcházející pískání: -
                    </Col>

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
        // if (myTeam.activeSeason === null) {
        if (true) {
            return (
                <div>
                    <TeamApplicationForm onSubmit={onSubmitTeamApplicationForm} fields={fields}
                                         fieldLocations={fieldLocations} myTeamId={myTeam.id}/>
                </div>
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
                    {/*{getTeamRegistration()}*/}
                    {/*{getTeamSeasonInfo()}*/}
                    {/*{getTeamSeasonRegistration()}*/}
                </div>
            )
        }
    }

    return (
        <div>
            {getContent()}
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyTeamHomePage)