import React, {Component} from 'react';

// VARS TODO DELETE
import {fetchGet} from "../utils/FetchMethods";
import {PLAYERS_URL} from "../constants/Routes";

// Pages/Repositories
import TeamRepository from "./teams/TeamRepository";
import PlayerRepository from "./players/PlayerRepository";
import FieldRepository from "./fields/FieldRepository";
import GameRepository from "./games/GameRepository";
import GameDetailRepository from "./game-detail/GameDetailRepository";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            homeTeam: {},
            visitorsTeam: {},
            homePlayers: [],
            visitorsPlayers: []
        }
    }

    componentDidMount() {
        fetchGet(PLAYERS_URL).then((response) => {
            response.json().then((data) => {
                this.setState({homePlayers: data.data});
            });
        }).catch(function (error) {
            console.log(error);
        });

        fetchGet(PLAYERS_URL).then((response) => {
            response.json().then((data) => {
                this.setState({visitorsPlayers: data.data});
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const forms = (
            <div>
                <h1>Formuláře</h1>
                <TeamRepository/>
                <PlayerRepository/>
                <FieldRepository/>
                <GameRepository/>
            </div>
        )

        return (
            <div>
                <GameDetailRepository homeTeam={this.state.homeTeam}
                                      visitorsTeam={this.state.visitorsTeam}
                                      homePlayers={this.state.homePlayers}
                                      visitorsPlayers={this.state.visitorsPlayers}
                />
            </div>
        );
    }
}

export default App;
