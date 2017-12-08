import React from 'react';
import {connect} from 'react-redux';
import GameList from "../../components/game/GameList";
import LoadingSpinner from "../../components/utils/LoadingSpinner";

const mapStateToProps = (state) => {
    return {
        gamesAsReferee: state.myTeam.myGamesAsReferee,
        gamesToPlay: state.myTeam.myGamesToPlay
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const GameRepository = (props) => {
    const {gamesAsReferee, gamesToPlay} = props;

    const renderSpinnerBeforeGamesLoad = (games) => {
        if (games === false) {
            return <LoadingSpinner text="Načítám zápasy" />
        }
        return <GameList games={games} />
    }

    return (
        <div>
            <h1>Zápasy</h1>
            {renderSpinnerBeforeGamesLoad(gamesToPlay)}
            <h1>Pískání</h1>
            {renderSpinnerBeforeGamesLoad(gamesAsReferee)}
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameRepository)