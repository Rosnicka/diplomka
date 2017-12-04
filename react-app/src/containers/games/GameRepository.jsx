import React, {Component} from 'react';
import GameList from "../../components/game/GameList";

class GameRepository extends Component {
    constructor() {
        super();
        this.state = {
            games: [],
            gamesPiskani: []
        }
    }

    componentDidMount() {
        this.setState({
            games: [
                {
                    home : 'Dynamo R.U.M. B',
                    host: 'AC Sparta',
                    date: '12.11.2017 19:30',
                    state: 'Uzavřený',
                    field: 'Děkanka',
                    result: {
                        home: 5,
                        host: 1
                    }
                },
                {
                    home : 'Dynamo R.U.M. B',
                    host: 'FC Tempo',
                    date: '19.11.2017 21:30',
                    state: 'Uzavřený',
                    field: 'Děkanka',
                    result: {
                        home: 2,
                        host: 3
                    }
                },
                {
                    home : 'SK Slavia',
                    host: 'Dynamo R.U.M. B',
                    date: '25.11.2017 18:30',
                    state: 'Uzavřený',
                    field: 'Pražačka',
                    result: {
                        home: 3,
                        host: 3
                    }
                },
                {
                    home : 'Dynamo R.U.M. B',
                    host: 'Pardálové z Jablonce',
                    date: '07.12.2017 19:15',
                    state: 'Nevyplněná soupiska',
                    field: 'Mikulova',
                    result: null
                },
                {
                    home : 'Dynamo R.U.M. B',
                    host: 'AC Sparta',
                    date: '12.01.2018 20:30',
                    state: 'Nevyplněná soupiska',
                    field: 'Mikulova',
                    result: null
                }
            ],
            gamesPiskani: [
                {
                    home : 'SK Žabáci',
                    host: 'AS Řím',
                    date: '22.10.2017 20:30',
                    state: 'Uzavřený',
                    field: 'Mikulova',
                    result: null
                },
                {
                    home : 'AC Kopyta',
                    host: 'FC Dřevona',
                    date: '09.12.2017 19:15',
                    state: 'Čeká na čas zahájení',
                    field: 'Petrovice',
                    result: null
                },
                {
                    home : 'Čutálisti',
                    host: 'FC Beton',
                    date: '13.01.2018 20:30',
                    state: 'Čeká na čas zahájení',
                    field: 'Záběhlice',
                    result: null
                }
            ]
        })
    }


    render() {
        return (
            <div>
                <h1>Zápasy</h1>
                <GameList games={this.state.games}/>

                <h1>Pískání</h1>
                <GameList games={this.state.gamesPiskani}/>
            </div>
        );
    }
}

export default GameRepository;
