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

    const teamSeason = () => {
        if (myTeam.competition === null || myTeam.league === null || myTeam.group === null) {
            if (myTeam.application !== null) {
                return (
                    <div>
                        Váš tým čeká na vyhodnocení registrací a zařazení do sezóny.
                    </div>
                )
            } else {
                return (
                    <div>
                        Váš tým se zatím neúčastní aktuální sezóny.
                        {getTeamSeasonRegistration()}
                    </div>
                );
            }
        }
        return (
            <strong>
                Sezóna {myTeam.competition.name}, {myTeam.league.level}{myTeam.group.letter}
            </strong>
        )
    }

    const getTeamInfo = () => {
        if (myTeam.id === undefined) {
            return ''
        } else {
            return (
                <div>
                    <Col xs={12}>
                        <h2>{myTeam.name}</h2>
                        {teamSeason()}
                        <br/>
                    </Col>
                </div>
            )
        }
    }

    const getTeamRegistration = () => {
        if (myTeam.id === undefined) {
            return (
                <div>
                    <Col xs={12}>
                        <h1>Ještě nemáš tým?</h1>
                    </Col>
                    <TeamRegistrationForm onSubmit={onSubmitTeamRegistrationForm}/>
                </div>
            )
        } else {
            return ''
        }
    }

    const getTeamSeasonRegistration = () => {
        return (
            <div>
                <h2>Registrace týmu do sezóny</h2>
                <TeamApplicationForm onSubmit={onSubmitTeamApplicationForm} fields={fields}
                                     fieldLocations={fieldLocations} myTeamId={myTeam.id}/>
            </div>
        )
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