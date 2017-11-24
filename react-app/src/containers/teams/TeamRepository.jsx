import React, {Component} from 'react';
import TeamForm from "../../forms/TeamRegistrationForm";
import {TEAMS_URL} from "../../constants/Routes";
import {fetchPost} from "../../utils/FetchMethods";

class TeamRepository extends Component {
    onSubmitTeamForm = (values) => {
        createTeam(values);
    }

    render() {
        return (
            <div>
                <h2>Nový tým</h2>
                <TeamForm onSubmitTeamForm={this.onSubmitTeamForm}/>
            </div>
        );
    }
}

const createTeam = (values) => {
    fetchPost(TEAMS_URL, values).then((response) => {
        response.json().then((data) => {
            console.log(data);
        });
    }).catch(function (error) {
        console.log(error);
    });
}

export default TeamRepository;
