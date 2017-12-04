import React, {Component} from 'react';
import {fetchGet, fetchPost} from "../../utils/FetchMethods";
import {PLAYERS_URL, TEAMS_URL} from "../../constants/Routes";
import PlayerForm from "../../forms/PlayerForm";
import PlayerList from "../../components/player/PlayerList";

class PlayerRepository extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            players: []
        }
    }

    onSubmitPlayerForm = (values) => {
        createPlayer(values);
    }

    componentDidMount() {
        fetchGet(TEAMS_URL).then((response) => {
            response.json().then((data) => {
                this.setState({teams: data.data});
            });
        }).catch(function (error) {
            console.log(error);
        });

        fetchGet(PLAYERS_URL).then((response) => {
            response.json().then((data) => {
                this.setState({players: data.data});
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h2>Seznam hráčů</h2>
                {/*<PlayerForm onSubmitPlayerForm={this.onSubmitPlayerForm} teams={this.state.teams}/>*/}
                <PlayerList players={this.state.players}/>
            </div>
        );
    }
}

const createPlayer = (values) => {
    fetchPost(PLAYERS_URL, values).then((response) => {
        response.json().then((data) => {
            console.log(data);
        });
    }).catch(function (error) {
        console.log(error);
    });
}

export default PlayerRepository;
