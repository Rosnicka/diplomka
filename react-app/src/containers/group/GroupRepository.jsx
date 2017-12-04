import React, {Component} from 'react';
import GroupResults from "../../components/group/GroupResults";

class GroupRepository extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                groupResults:
                    [
                        {
                            rank: 1,
                            teamName: 'Demínka B',
                            played: 10,
                            wins: 9,
                            ties: 1,
                            loses: 0,
                            score: '47:15',
                            points: 16,
                        },
                        {
                            rank: 2,
                            teamName: 'The Hamptons',
                            played: 10,
                            wins: 8,
                            ties: 0,
                            loses: 2,
                            score: '40:11',
                            points: 16,
                        },
                        {
                            rank: 3,
                            teamName: 'Prosím, nesmějte se',
                            played: 10,
                            wins: 7,
                            ties: 2,
                            loses: 1,
                            score: '44:17',
                            points: 16,
                        },
                        {
                            rank: 4,
                            teamName: 'Midget',
                            played: 10,
                            wins: 6,
                            ties: 0,
                            loses: 4,
                            score: '30:21',
                            points: 12,
                        },
                        {
                            rank: 5,
                            teamName: 'DHL Bad Diablos',
                            played: 10,
                            wins: 5,
                            ties: 1,
                            loses: 4,
                            score: '30:18',
                            points: 11,
                        },
                        {
                            rank: 6,
                            teamName: 'Gekad',
                            played: 10,
                            wins: 5,
                            ties: 1,
                            loses: 4,
                            score: '28:30',
                            points: 11,
                        },
                        {
                            rank: 7,
                            teamName: 'Hell Avalanche',
                            played: 10,
                            wins: 4,
                            ties: 2,
                            loses: 4,
                            score: '30:36',
                            points: 10,
                        },
                        {
                            rank: 8,
                            teamName: 'Strahovská 10',
                            played: 10,
                            wins: 4,
                            ties: 1,
                            loses: 5,
                            score: '25:36',
                            points: 9,
                        },
                        {
                            rank: 9,
                            teamName: 'Rošťáci',
                            played: 10,
                            wins: 3,
                            ties: 0,
                            loses: 7,
                            score: '23:32',
                            points: 6,
                        },
                        {
                            rank: 10,
                            teamName: 'Dynamo R.U.M. B',
                            played: 10,
                            wins: 2,
                            ties: 1,
                            loses: 7,
                            score: '20:42',
                            points: 5,
                        },
                        {
                            rank: 11,
                            teamName: 'Gobi dezert',
                            played: 10,
                            wins: 1,
                            ties: 2,
                            loses: 7,
                            score: '13:41',
                            points: 4,
                        },
                        {
                            rank: 12,
                            teamName: 'Playboy team AC',
                            played: 10,
                            wins: 0,
                            ties: 1,
                            loses: 9,
                            score: '14:45',
                            points: 1,
                        },

                    ]
            }
    }

    render() {
        return (
            <div>
                <h1>Tabulka - Podzim 2017, 8F</h1>
                <GroupResults teamsResults={this.state.groupResults}/>
            </div>
        );
    }
}

export default GroupRepository;