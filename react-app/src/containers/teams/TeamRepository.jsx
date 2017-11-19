import React, {Component} from 'react';
import TeamForm from "../../forms/TeamForm";

const TEAMS_URL = ''

class TeamRepository extends Component {
    render() {
        return (
            <div>
                <h1>Nový tým</h1>
                <TeamForm />
            </div>
        );
    }
}

const createTeam = () => {
    fetch(URL)
}

export default TeamRepository;
